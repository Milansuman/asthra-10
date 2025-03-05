import { ASTHRA } from '@/logic';
import { createOrder, generatedSignature } from '@/logic/payment';
import { and, eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import {
  createTRPCRouter,
  frontDeskProcedure,
  managementProcedure,
  validUserOnlyProcedure,
} from '@/server/api/trpc';
import {
  eventsTable,
  referalsTable,
  transactionsTable,
  user,
  userRegisteredEventTable,
} from '@/server/db/schema';
import { Increment, getTrpcError } from '@/server/db/utils';

import { type TransactionZodType, transactionsZod } from '@/lib/validator';

export const asthraRouter = createTRPCRouter({
  createAsthraPass: managementProcedure.mutation(async ({ ctx }) => {
    await ctx.db.insert(eventsTable).values({
      createdById: ctx.session.user.id,
      ...ASTHRA,
    });

    console.log('ASTHRA PASS CREATED');
  }),
  initiatePurchaseAsthraPass: validUserOnlyProcedure
    .input(
      z.object({
        referral: z.string().max(50).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userData = ctx.user;

      if (userData.asthraPass) {
        throw getTrpcError('ALREADY_PURCHASED');
      }

      const transactionId = uuid();

      const insertTransaction: Omit<TransactionZodType, 'orderId'> = {
        eventId: ASTHRA.id,
        eventName: ASTHRA.name,
        id: transactionId,
        userId: userData.id,
        userName: userData.name ?? 'NA',
        status: 'initiated',
        amount: ASTHRA.amount,
        remark: `Initiated Asthra Pass on ${new Date().toLocaleString()}`,
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
      const finalData = await ctx.db
        .insert(transactionsTable)
        .values({ ...insertTransaction, orderId: order.id })
        .returning();

      return finalData[0];
    }),

  successPurchaseAsthraPass: validUserOnlyProcedure
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

        const asthraUser = await tx
          .update(user)
          .set({
            asthraPass: true,
            asthraCredit: ASTHRA.credit,
            transactionId: currentTransation.id,
          })
          .where(and(eq(user.id, ctx.user.id), eq(user.asthraPass, false)))
          .returning();

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
          user: asthraUser[0],
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
        const transactiondata = await tx
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

        if (transactiondata.length === 0 || !transactiondata[0]) {
          throw getTrpcError('TRANSACTION_NOT_FOUND');
        }

        const currentTransation = transactiondata[0];

        tx.update(referalsTable)
          .set({ status: true })
          .where(eq(referalsTable.transactionId, currentTransation.id));

        const asthraUser = await tx
          .update(user)
          .set({
            asthraPass: true,
            asthraCredit: ASTHRA.credit,
            transactionId: currentTransation.id,
          })
          .where(and(eq(user.id, ctx.user.id), eq(user.asthraPass, false)))
          .returning();

        await tx.insert(userRegisteredEventTable).values({
          eventId: currentTransation.eventId,
          transactionId: currentTransation.id,
          userId: ctx.user.id,
          remark: `Forced Success on ${new Date().toLocaleString()}`,
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
          user: asthraUser[0],
        };
      });
    }),

  getMyAsthraPass: validUserOnlyProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
  editAsthraCredits: managementProcedure
    .input(
      z.object({
        credits: z.number(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(user)
        .set({
          asthraCredit: input.credits,
        })
        .where(eq(user.id, input.userId));
    }),
});
