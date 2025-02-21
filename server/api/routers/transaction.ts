import { ASTHRA } from '@/logic';
import { generateHash } from '@/logic/payment';
import { and, eq, or } from 'drizzle-orm';
import { v4 as uuid, v4 } from 'uuid';
import * as z from 'zod';

import { env } from '@/env';

import {
  createTRPCRouter,
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

import { eventZod, isValidUserDetails, transactionsZod } from '@/lib/validator';
import { paymentClientSide, type paymentZod } from '@/lib/validator/payment';

export const transactionRouter = createTRPCRouter({
  initiatePurchase: validUserOnlyProcedure
    .input(
      z.object({
        id: eventZod.shape.id,
        referral: z.string().max(50).optional(),
      })
    )

    .mutation(async ({ ctx, input }) => {
      const isAsthra = input.id === ASTHRA.id;
      const userData = ctx.user;

      return await ctx.db.transaction(async (tx) => {
        if (isAsthra && userData.asthraPass) {
          throw getTrpcError('ALREADY_PURCHASED');
        }

        const transactionId = uuid();
        let data: z.infer<typeof paymentZod>;
        let insertTransaction: Omit<z.infer<typeof transactionsZod>, 'hash'>;

        if (isAsthra) {
          data = {
            amount: ASTHRA.amount,
            email: userData.email ?? 'NA',
            firstname: userData.name ?? 'NA',
            phone: Number.parseInt(userData.number ?? '000'),
            productinfo: ASTHRA.id,
            txnid: transactionId,
            furl: `${env.NEXTAUTH_URL}/payment/failed/${transactionId}`,
            surl: `${env.NEXTAUTH_URL}/payment/asthra/success/${transactionId}`,
            salt: env.NEXT_PUBLIC_HDFC_SALT,
            key: env.NEXT_PUBLIC_HDFC_KEY,
          };

          insertTransaction = {
            eventId: ASTHRA.id,
            eventName: ASTHRA.name,
            id: transactionId,
            userId: userData.id,
            userName: userData.name ?? 'NA',
            status: 'initiated',
            amount: ASTHRA.amount,
            remark: `Initiated Asthra Pass on ${new Date().toLocaleString()}`,
          };
        } else {
          const workshop = await tx.query.eventsTable.findFirst({
            where: eq(eventsTable.id, input.id),
          });

          if (!workshop) {
            throw getTrpcError('EVENT_NOT_FOUND');
          }

          const alreadyRegisteredData =
            await tx.query.userRegisteredEventTable.findFirst({
              where: and(
                eq(userRegisteredEventTable.eventId, workshop.id),
                eq(userRegisteredEventTable.userId, user.id)
              ),
            });

          if (alreadyRegisteredData) {
            throw getTrpcError('ALREADY_PURCHASED');
          }

          if (
            workshop?.eventType === 'ASTHRA_PASS_EVENT' ||
            workshop?.eventType === 'ASTHRA_PASS'
          ) {
            return getTrpcError('WRONG_PARAMETERS');
          }

          insertTransaction = {
            eventId: workshop.id,
            eventName: workshop.name ?? 'Unknown Workshop/Competiton Name',
            id: transactionId,
            userId: userData.id,
            userName: userData.name ?? 'NA',
            status: 'initiated',
            amount: workshop.amount,
            remark: `Initiated ${workshop.eventType} purchase on ${new Date().toLocaleString()}`,
          };

          data = {
            amount: workshop.amount,
            email: userData.email ?? 'NA',
            firstname: userData.name ?? 'NA',
            phone: Number.parseInt(userData.number ?? '000'),
            productinfo: workshop.id,
            txnid: transactionId,
            furl: `${env.NEXTAUTH_URL}/payment/failed/${transactionId}`,
            surl: `${env.NEXTAUTH_URL}/payment/success/${transactionId}`,
            salt: env.NEXT_PUBLIC_HDFC_SALT,
            key: env.NEXT_PUBLIC_HDFC_KEY,
          };
        }

        const hash = generateHash(data);
        const newData = paymentClientSide.parse({ ...data, hash });
        await tx
          .insert(transactionsTable)
          .values({ ...insertTransaction, hash });
        if (input.referral) {
          await tx.insert(referalsTable).values({
            id: uuid(),
            referralCode: input.referral,
            transactionId: transactionId,
          });
        }

        return newData;
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
        /**
         * Do something to verify the request is a valid transation from HDFC
         */

        const currentTransation = await tx.query.transactionsTable.findFirst({
          where: eq(transactionsTable.id, input.id),
        });

        if (!currentTransation) {
          throw getTrpcError('TRANSACTION_NOT_FOUND');
        }

        const eventData = await tx.query.eventsTable.findFirst({
          where: eq(eventsTable.id, currentTransation.eventId),
        });

        if (!eventData) {
          throw getTrpcError('EVENT_NOT_FOUND');
        }

        if (
          eventData.eventType === 'ASTHRA_PASS' ||
          eventData.eventType === 'ASTHRA_PASS_EVENT'
        ) {
          throw getTrpcError('WRONG_PARAMETERS');
        }

        if (eventData.regCount >= eventData.regLimit) {
          throw getTrpcError('REGISTRATION_LIMIT_EXCEDED');
        }

        if (currentTransation.status !== 'initiated') {
          return {
            event: eventData,
            transaction: currentTransation,
            status: currentTransation.status,
          };
        }

        const transactiondata = await tx
          .update(transactionsTable)
          .set({ status: 'success' })
          .where(
            and(
              eq(transactionsTable.id, currentTransation.id),
              eq(transactionsTable.status, 'initiated')
            )
          )
          .returning();
        await tx
          .update(referalsTable)
          .set({ status: true })
          .where(eq(referalsTable.transactionId, currentTransation.id))
          .returning();

        await tx.insert(userRegisteredEventTable).values({
          registrationId: v4(),
          eventId: currentTransation.eventId,
          transactionId: currentTransation.id,
          userId: ctx.user.id,
          remark: `Success on ${new Date().toLocaleString()}`,
        });

        const eventData2 = await tx
          .update(eventsTable)
          .set({ regCount: Increment(eventsTable.regCount, 1) })
          .where(eq(eventsTable.id, currentTransation.eventId))
          .returning();

        return {
          event: eventData2[0],
          transaction: transactiondata[0],
          status: transactiondata[0]?.status,
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
        /**
         * Do something to verify the request is a valid transation from HDFC
         */

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

        if (currentTransation.length === 0) {
          throw getTrpcError('TRANSACTION_NOT_FOUND');
        }

        const eventData = await tx
          .select()
          .from(eventsTable)
          .where(eq(eventsTable.id, currentTransation[0]?.eventId ?? ''));

        return {
          transaction: currentTransation[0],
          event: eventData[0],
          status: currentTransation[0]?.status,
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
