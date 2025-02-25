import { createOrder, generatedSignature } from '@/logic/payment';
import { and, eq, ne, or } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import * as z from 'zod';

import {
  createTRPCRouter,
  frontDeskProcedure,
  protectedProcedure,
  validUserOnlyProcedure,
} from '@/server/api/trpc';
import {
  eventsTable,
  referalsTable,
  transactionsTable,
  userRegisteredEventTable,
} from '@/server/db/schema';
import { Increment, getTrpcError } from '@/server/db/utils';

import {
  type TransactionZodType,
  eventZod,
  transactionsZod,
} from '@/lib/validator';

export const transactionRouter = createTRPCRouter({
  initiatePurchase: validUserOnlyProcedure
    .input(
      z.object({
        eventId: eventZod.shape.id,
        referral: z.string().max(50).optional(),
      })
    )

    .query(async ({ ctx, input }) => {
      const userData = ctx.user;

      const workshop = await ctx.db.query.eventsTable.findFirst({
        where: and(
          eq(eventsTable.id, input.eventId),
          ne(eventsTable.eventType, 'ASTHRA_PASS_EVENT'),
          ne(eventsTable.eventType, 'ASTHRA_PASS')
        ),
      });

      if (!workshop) {
        throw getTrpcError('EVENT_NOT_FOUND');
      }

      if (workshop.regCount >= workshop.regLimit) {
        throw getTrpcError('REGISTRATION_LIMIT_EXCEDED');
      }

      const alreadyRegisteredData =
        await ctx.db.query.userRegisteredEventTable.findFirst({
          where: and(
            eq(userRegisteredEventTable.eventId, workshop.id),
            eq(userRegisteredEventTable.userId, userData.id)
          ),
        });

      if (alreadyRegisteredData) {
        throw getTrpcError('ALREADY_PURCHASED');
      }

      const transactionId = uuid();

      const insertTransaction: Omit<TransactionZodType, 'orderId'> = {
        eventId: workshop.id,
        eventName: workshop.name ?? 'Unknown Workshop/Competiton Name',
        id: transactionId,
        userId: userData.id,
        userName: userData.name ?? 'NA',
        status: 'initiated',
        amount: workshop.amount,
        remark: `Initiated ${workshop.eventType} purchase on ${new Date().toLocaleString()}`,
      };

      const {
        data: order,
        error,
        isSuccess,
      } = await createOrder(insertTransaction.amount);

      if (!isSuccess) {
        console.error(error);
        throw getTrpcError('PAYMENT_INITIALISATION_FAILED');
      }

      return await ctx.db.transaction(async (tx) => {
        const finalData = await tx
          .insert(transactionsTable)
          .values({ ...insertTransaction, orderId: order.id })
          .returning();

        if (input.referral) {
          tx.insert(referalsTable).values({
            id: uuid(),
            referralCode: input.referral,
            transactionId: transactionId,
          });
        }

        return finalData[0];
      });
    }),

  successPurchase: validUserOnlyProcedure
    .input(
      transactionsZod
        .pick({
          id: true,
          orderId: true,
        })
        .merge(
          z.object({
            razorpayPaymentId: z.string(),
            razorpaySignature: z.string(),
            orderCreationId: z.string(),
          })
        )
    )
    .mutation(async ({ ctx, input }) => {
      const { orderCreationId, razorpayPaymentId, razorpaySignature } = input;
      console.log('Verifing', input);

      const signature = generatedSignature(orderCreationId, razorpayPaymentId);

      if (signature !== razorpaySignature) {
        throw getTrpcError('PAYMENT_VERIFICATION_FAILED');
      }

      return await ctx.db.transaction(async (tx) => {
        const transactiondata = await tx
          .update(transactionsTable)
          .set({ status: 'success' })
          .where(
            and(
              eq(transactionsTable.id, input.id),
              eq(transactionsTable.status, 'initiated')
            )
          )
          .returning();

        if (transactiondata.length === 0 || !transactiondata[0]) {
          throw getTrpcError('TRANSACTION_NOT_FOUND');
        }

        const currentTransation = transactiondata[0];

        tx.update(referalsTable)
          .set({ status: true })
          .where(eq(referalsTable.transactionId, currentTransation.id));

        await tx.insert(userRegisteredEventTable).values({
          eventId: currentTransation.eventId,
          transactionId: currentTransation.id,
          userId: ctx.user.id,
          remark: `Success on ${new Date().toLocaleString()}`,
        });

        const eventData = await tx
          .update(eventsTable)
          .set({ regCount: Increment(eventsTable.regCount, 1) })
          .where(eq(eventsTable.id, currentTransation.eventId))
          .returning();

        return {
          event: eventData[0],
          transaction: currentTransation,
          status: currentTransation.status,
        };
      });
    }),

  failedPurchase: protectedProcedure
    .input(
      transactionsZod.pick({
        id: true,
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const currentTransation = await tx
          .update(transactionsTable)
          .set({
            status: 'failed',
          })
          .where(
            and(
              eq(transactionsTable.id, input.id),
              eq(transactionsTable.status, 'initiated'),
              eq(transactionsTable.userId, ctx.user.id)
            )
          )
          .returning();

        if (currentTransation.length === 0 || !currentTransation[0]) {
          throw getTrpcError('TRANSACTION_NOT_FOUND');
        }

        const eventData = await tx
          .select()
          .from(eventsTable)
          .where(eq(eventsTable.id, currentTransation[0]?.eventId ?? ''));

        return {
          transaction: currentTransation[0],
          event: eventData[0],
          status: currentTransation[0].status,
        };
      });
    }),

  forceSuccessPurchase: frontDeskProcedure
    .input(
      transactionsZod.pick({
        id: true,
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const currentTransation = await tx
          .update(transactionsTable)
          .set({
            status: 'success',
          })
          .where(
            and(
              eq(transactionsTable.id, input.id),
              eq(transactionsTable.status, 'initiated')
            )
          )
          .returning();

        if (currentTransation.length === 0 || !currentTransation[0]) {
          throw getTrpcError('TRANSACTION_NOT_FOUND');
        }

        const transactionData = currentTransation[0];

        await tx
          .update(eventsTable)
          .set({
            regCount: Increment(eventsTable.regCount, 1),
          })
          .where(eq(eventsTable.id, transactionData.eventId));

        await tx.insert(userRegisteredEventTable).values({
          eventId: transactionData.eventId,
          transactionId: transactionData.id,
          userId: transactionData.userId,
          remark: `Forced Success on ${new Date().toLocaleString()}`,
        });

        return {
          transaction: transactionData,
          status: transactionData.status,
        };
      });
    }),

  getAllTransactions: validUserOnlyProcedure.query(async ({ ctx }) => {
    return await ctx.db.transaction(async (tx) => {
      const transations = await tx
        .select()
        .from(transactionsTable)
        .where(eq(transactionsTable.userId, ctx.user.id));

      if (transations.length === 0) {
        throw getTrpcError('TRANSACTION_NOT_FOUND');
      }

      const eventIds = transations.map((e) => e.eventId);
      const eventData = await tx
        .select()
        .from(eventsTable)
        .where(or(...eventIds.map((e) => eq(eventsTable.id, e))));

      return { transations, events: eventData };
    });
  }),
});
