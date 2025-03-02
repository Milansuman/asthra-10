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
  user,
  userRegisteredEventTable,
} from '@/server/db/schema';
import { Increment, getTrpcError } from '@/server/db/utils';

import {
  type TransactionZodType,
  eventZod,
  transactionsZod,
} from '@/lib/validator';
import { ASTHRA } from '@/logic';
import { api } from '@/trpc/vanila';

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

      if (userData.asthraPass && input.eventId === ASTHRA.id) {
        throw getTrpcError('ALREADY_PURCHASED');
      }

      const workshop = await ctx.db.query.eventsTable.findFirst({
        where: and(
          eq(eventsTable.id, input.eventId),
          ne(eventsTable.eventType, 'ASTHRA_PASS_EVENT')
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

      return await ctx.db.transaction(async (tx) => {
        const finalData = await tx
          .insert(transactionsTable)
          .values({ ...insertTransaction, orderId: transactionId })
          .returning();

        if (input.referral) {
          tx.insert(referalsTable).values({
            id: uuid(),
            referralCode: input.referral,
            transactionId: transactionId,
          });
        }

        if (!finalData.length || !finalData[0]) {
          throw getTrpcError('TRANSACTION_NOT_FOUND');
        }

        return {
          transaction: finalData[0],
          event: workshop,
        };
      });
    }),

  successPurchase: validUserOnlyProcedure
    .input(
      transactionsZod.pick({
        id: true,
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const transactiondata = await tx
          .update(transactionsTable)
          .set({ status: 'success' })
          .where(
            and(
              eq(transactionsTable.id, input.id),
              eq(transactionsTable.status, 'initiated'),
              eq(transactionsTable.userId, ctx.user.id)
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

        const ure = await tx
          .insert(userRegisteredEventTable)
          .values({
            eventId: currentTransation.eventId,
            transactionId: currentTransation.id,
            userId: ctx.user.id,
            remark: `Success on ${new Date().toLocaleString()}`,
          })
          .returning();

        const eventData = await tx
          .update(eventsTable)
          .set({ regCount: Increment(eventsTable.regCount, 1) })
          .where(eq(eventsTable.id, currentTransation.eventId))
          .returning();

        if (eventData.length === 0 || !eventData[0]) {
          throw getTrpcError('EVENT_NOT_FOUND');
        }

        if (ure.length === 0 || !ure[0]) {
          throw getTrpcError('EVENT_NOT_FOUND');
        }

        if (currentTransation.eventId === ASTHRA.id) {
          await tx
            .update(user)
            .set({
              asthraPass: true,
              asthraCredit: ASTHRA.credit,
              transactionId: currentTransation.id,
            })
            .where(and(eq(user.id, ctx.user.id), eq(user.asthraPass, false)));

          api.mail.asthraPass.query({
            // event: eventData[0],
            // transactions: currentTransation,
            user: ctx.user,
            userRegisteredEvent: ure[0],
            to: ctx.user.email,
          });
        }

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
        orderId: true,
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const currentTransation = await tx
          .update(transactionsTable)
          .set({
            status: 'success',
            orderId: input.orderId,
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

        if (transactionData.eventId === ASTHRA.id) {
          await tx
            .update(user)
            .set({
              asthraPass: true,
              asthraCredit: ASTHRA.credit,
              transactionId: transactionData.id,
            })
            .where(and(eq(user.id, ctx.user.id), eq(user.asthraPass, false)));
        }

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
