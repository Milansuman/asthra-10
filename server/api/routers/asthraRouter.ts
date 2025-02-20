import { ASTHRA } from '@/logic';
import { generateHash } from '@/logic/payment';
import { and, eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import type { z } from 'zod';

import { env } from '@/env';

import {
  createTRPCRouter,
  managementProcedure,
  validUserOnlyProcedure,
} from '@/server/api/trpc';
import {
  eventsTable,
  transactionsTable,
  user,
  userRegisteredEventTable,
} from '@/server/db/schema';
import { Increment, getTrpcError } from '@/server/db/utils';

import { transactionsZod } from '@/lib/validator';
import { paymentClientSide, type paymentZod } from '@/lib/validator/payment';

export const asthraRouter = createTRPCRouter({
  createAsthraPass: managementProcedure.mutation(async ({ ctx }) => {
    await ctx.db.insert(eventsTable).values({
      createdById: ctx.session.user.id,
      ...ASTHRA,
    });

    console.log('ASTHRA PASS CREATED');
  }),
  initiatePurchaseAsthraPass: validUserOnlyProcedure.mutation(
    async ({ ctx }) => {
      const userData = ctx.session.user;

      if (userData.asthraPass) {
        throw getTrpcError('ALREADY_PURCHASED');
      }

      return await ctx.db.transaction(async (tx) => {
        const transactionId = uuid();

        const data: z.infer<typeof paymentZod> = {
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

        const hash = generateHash(data);

        const newData = paymentClientSide.parse({ ...data, hash });

        await tx.insert(transactionsTable).values({
          eventId: ASTHRA.id,
          eventName: ASTHRA.name,
          id: transactionId,
          userId: userData.id,
          userName: userData?.name ?? 'NA',
          status: 'initiated',
          amount: ASTHRA.amount,
          remark: `Initiated Asthra Pass on ${new Date().toLocaleString()}`,
        });

        return newData;
      });
    }
  ),

  successPurchaseAsthraPass: validUserOnlyProcedure
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
            status: 'success',
          })
          .where(
            and(
              eq(transactionsTable.id, input.id),
              eq(transactionsTable.status, 'initiated')
            )
          )
          .returning();

        if (currentTransation.length === 0) {
          throw getTrpcError('TRANSACTION_NOT_FOUND');
        }
        if (
          currentTransation[0] &&
          currentTransation[0].status !== 'initiated'
        ) {
          const asthraUser = await tx
            .update(user)
            .set({
              asthraPass: true,
              asthraCredit: ASTHRA.credit,
              transactionId: currentTransation[0].id,
            })
            .where(and(eq(user.id, ctx.user.id), eq(user.asthraPass, false)))
            .returning();

          await tx
            .update(eventsTable)
            .set({
              regCount: Increment(eventsTable.regCount, 1),
            })
            .where(eq(eventsTable.id, ASTHRA.id));

          await tx
            .insert(userRegisteredEventTable)
            .values({
              registrationId: uuid(),
              eventId: currentTransation[0].eventId,
              transactionId: currentTransation[0].id,
              userId: ctx.user.id,
              remark: `Success on ${new Date().toLocaleString()}`,
            })
            .returning();

          return asthraUser;
        }
      });
    }),

  getMyAsthraPass: validUserOnlyProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
});
