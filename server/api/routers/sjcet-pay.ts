import { and, eq, ne, or } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import * as z from 'zod';

import {
  createTRPCRouter,
  frontDeskProcedure,
  protectedProcedure,
  publicProcedure,
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
  type UserZodType,
  eventZod,
  transactionsZod,
} from '@/lib/validator';
import { ASTHRA, getTimeUtils } from '@/logic';
import MailAPI from './mail';
import { createOrder } from '@/logic/payment';

export const sjcetPaymentRouter = createTRPCRouter({
  initiatePurchase: validUserOnlyProcedure
    .input(
      eventZod.pick({
        id: true,
      })
    )

    .query(async ({ ctx, input }) => {
      const userData = ctx.user;

      if (userData.asthraPass && input.id === ASTHRA.id) {
        throw getTrpcError('ALREADY_PURCHASED');
      }

      const workshop = await ctx.db.query.eventsTable.findFirst({
        where: and(
          eq(eventsTable.id, input.id),
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
      let orderId: string;

      if (workshop.amount !== 0) {
        const { data, error, isSuccess } = await createOrder(workshop.amount);

        if (!isSuccess) {
          console.error('Error in creating order', error);
          throw getTrpcError('PAYMENT_INITIALISATION_FAILED');
        }

        orderId = data.id;
      } else {
        orderId = transactionId;
      }

      const insertTransaction: TransactionZodType = {
        eventId: workshop.id,
        eventName: workshop.name ?? 'Unknown Workshop/Competiton Name',
        id: transactionId,
        orderId,
        userId: userData.id,
        userName: userData.name ?? 'NA',
        status: 'initiated',
        amount: workshop.amount,
        remark: `${userData.email}, ${userData.number}, Initiated ${workshop.eventType} purchase on ${getTimeUtils(new Date())}`,
      };

      return await ctx.db.transaction(async (tx) => {
        const finalData = await tx
          .insert(transactionsTable)
          .values({ ...insertTransaction })
          .returning();

        if (!finalData.length || !finalData[0]) {
          throw getTrpcError('TRANSACTION_NOT_FOUND');
        }

        return {
          transaction: finalData[0],
          event: workshop,
          orderId,
        };
      });
    }),

  successPurchase: validUserOnlyProcedure
    .input(
      transactionsZod.pick({
        orderId: true,
      })
    )
    .mutation(async ({ ctx, input }) => {
      let isASTHRA = false;
      const returnData = await ctx.db.transaction(async (tx) => {
        const transactionData = await tx
          .update(transactionsTable)
          .set({ status: 'success' })
          .where(
            and(
              eq(transactionsTable.orderId, input.orderId),
              eq(transactionsTable.status, 'initiated'),
              eq(transactionsTable.userId, ctx.user.id)
            )
          )
          .returning();

        if (transactionData.length === 0 || !transactionData[0]) {
          const newTransaction = await tx.query.transactionsTable.findFirst({
            where: and(
              eq(transactionsTable.orderId, input.orderId),
              eq(transactionsTable.userId, ctx.user.id)
            ),
          });

          if (newTransaction) {
            if (newTransaction.status === 'success')
              throw getTrpcError('ALREADY_PURCHASED');

            if (newTransaction.status === 'failed')
              throw getTrpcError('TRANSACTION_FAILED');
          }

          throw getTrpcError('TRANSACTION_NOT_FOUND');
        }

        const currentTransation = transactionData[0];

        const ure = await tx
          .insert(userRegisteredEventTable)
          .values({
            eventId: currentTransation.eventId,
            transactionId: currentTransation.id,
            userId: ctx.user.id,
            remark: `Success on ${getTimeUtils(new Date())}`,
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

          isASTHRA = true;
        } else {
          isASTHRA = false;
        }

        return {
          event: eventData[0],
          transaction: currentTransation,
          status: currentTransation.status,
          userRegisteredEvent: ure[0],
        };
      });

      if (isASTHRA) {
        await MailAPI.asthraPass({
          transactions: returnData.transaction,
          user: ctx.user,
          userRegisteredEvent: returnData.userRegisteredEvent,
          to: ctx.user.email,
        });
      } else {
        await MailAPI.purchaseConfirm({
          event: returnData.event,
          user: ctx.user,
          transactions: returnData.transaction,
          to: ctx.user.email,
          userRegisteredEvent: returnData.userRegisteredEvent,
        });
      }

      return returnData;
    }),

  failedPurchase: protectedProcedure
    .input(
      transactionsZod.pick({
        orderId: true,
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
              eq(transactionsTable.orderId, input.orderId),
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
        orderId: true,
      })
    )
    .mutation(async ({ ctx, input }) => {
      let isASTHRA = false;

      const returnData = await ctx.db.transaction(async (tx) => {
        const currentTransation = await tx
          .update(transactionsTable)
          .set({
            status: 'success',
          })
          .where(
            eq(transactionsTable.orderId, input.orderId)
            // eq(transactionsTable.status, 'initiated')
          )
          .returning();

        if (currentTransation.length === 0 || !currentTransation[0]) {
          throw getTrpcError('TRANSACTION_NOT_FOUND');
        }

        const transactionData = currentTransation[0];

        const eventData = await tx
          .update(eventsTable)
          .set({
            regCount: Increment(eventsTable.regCount, 1),
          })
          .where(eq(eventsTable.id, transactionData.eventId))
          .returning();

        const ure = await tx
          .insert(userRegisteredEventTable)
          .values({
            eventId: transactionData.eventId,
            transactionId: transactionData.id,
            userId: transactionData.userId,
            remark: `Forced Success on ${getTimeUtils(new Date())}`,
          })
          .returning();

        const userData = await tx.query.user.findFirst({
          where: eq(user.id, transactionData.userId),
        });

        if (eventData.length === 0 || !eventData[0]) {
          throw getTrpcError('EVENT_NOT_FOUND');
        }

        if (ure.length === 0 || !ure[0]) {
          throw getTrpcError('EVENT_NOT_FOUND');
        }

        if (!userData) {
          throw getTrpcError('USER_NOT_FOUND');
        }

        if (transactionData.eventId === ASTHRA.id) {
          await tx
            .update(user)
            .set({
              asthraPass: true,
              asthraCredit: ASTHRA.credit,
              transactionId: transactionData.id,
            })
            .where(and(eq(user.id, userData.id), eq(user.asthraPass, false)));

          isASTHRA = true;
        } else {
          isASTHRA = false;
        }

        return {
          transaction: transactionData,
          status: transactionData.status,
          event: eventData[0],
          userRegisteredEvent: ure[0],
          user: userData,
        };
      });

      if (isASTHRA) {
        await MailAPI.asthraPass({
          user: returnData.user as UserZodType,
          transactions: returnData.transaction,
          to: returnData.user.email,
          userRegisteredEvent: returnData.userRegisteredEvent,
        });
      } else {
        await MailAPI.purchaseConfirm({
          user: returnData.user as UserZodType,
          transactions: returnData.transaction,
          to: returnData.user.email,
          userRegisteredEvent: returnData.userRegisteredEvent,
          event: returnData.event,
        });
      }

      return returnData;
    }),
  spotForceSuccess: frontDeskProcedure
    .input(
      transactionsZod.pick({
        id: true,
        orderId: true,
      })
    )
    .mutation(async ({ ctx, input }) => {
      let isASTHRA = false;

      const returnData = await ctx.db.transaction(async (tx) => {
        const currentTransation = await tx
          .update(transactionsTable)
          .set({
            status: 'success',
            orderId: input.orderId,
          })
          .where(
            eq(transactionsTable.id, input.id)
            // eq(transactionsTable.status, 'initiated')
          )
          .returning();

        if (currentTransation.length === 0 || !currentTransation[0]) {
          throw getTrpcError('TRANSACTION_NOT_FOUND');
        }

        const transactionData = currentTransation[0];

        const eventData = await tx
          .update(eventsTable)
          .set({
            regCount: Increment(eventsTable.regCount, 1),
          })
          .where(eq(eventsTable.id, transactionData.eventId))
          .returning();

        const ure = await tx
          .insert(userRegisteredEventTable)
          .values({
            eventId: transactionData.eventId,
            transactionId: transactionData.id,
            userId: transactionData.userId,
            remark: `Forced Success on ${getTimeUtils(new Date())}`,
          })
          .returning();

        const userData = await tx.query.user.findFirst({
          where: eq(user.id, transactionData.userId),
        });

        if (eventData.length === 0 || !eventData[0]) {
          throw getTrpcError('EVENT_NOT_FOUND');
        }

        if (ure.length === 0 || !ure[0]) {
          throw getTrpcError('EVENT_NOT_FOUND');
        }

        if (!userData) {
          throw getTrpcError('USER_NOT_FOUND');
        }

        if (transactionData.eventId === ASTHRA.id) {
          await tx
            .update(user)
            .set({
              asthraPass: true,
              asthraCredit: ASTHRA.credit,
              transactionId: transactionData.id,
            })
            .where(and(eq(user.id, userData.id), eq(user.asthraPass, false)));

          isASTHRA = true;
        } else {
          isASTHRA = false;
        }

        return {
          transaction: transactionData,
          status: transactionData.status,
          event: eventData[0],
          userRegisteredEvent: ure[0],
          user: userData,
        };
      });

      if (isASTHRA) {
        await MailAPI.asthraPass({
          user: returnData.user as UserZodType,
          transactions: returnData.transaction,
          to: returnData.user.email,
          userRegisteredEvent: returnData.userRegisteredEvent,
        });
      } else {
        await MailAPI.purchaseConfirm({
          user: returnData.user as UserZodType,
          transactions: returnData.transaction,
          to: returnData.user.email,
          userRegisteredEvent: returnData.userRegisteredEvent,
          event: returnData.event,
        });
      }

      return returnData;
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
