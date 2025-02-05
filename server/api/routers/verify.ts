import { ASTHRA } from '@/logic';
import { and, eq } from 'drizzle-orm';
import { v4 } from 'uuid';
import * as z from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import {
  eventsTable,
  transactionsTable,
  user,
  userRegisteredEventTable,
} from '@/server/db/schema';
import { Increment, getTrpcError } from '@/server/db/utils';

import { userZod } from '@/lib/validator';
import { verifyAsthraPayment } from '@/logic/payment';

export const verifyRouter = createTRPCRouter({
  registeredEvents: protectedProcedure
    .input(
      z.object({
        userRegisteredId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== 'DESK') {
        throw getTrpcError('NOT_AUTHORIZED');
      }

      return await ctx.db.transaction(async (tx) => {
        const registeredEventList = await tx
          .update(userRegisteredEventTable)
          .set({
            status: 'attended',
          })
          .where(
            eq(userRegisteredEventTable.registrationId, input.userRegisteredId)
          )
          .returning();

        if (registeredEventList.length === 0) {
          throw getTrpcError('TRANSACTION_NOT_FOUND');
        }

        const registeredEvents = registeredEventList[0];

        const userData = await tx
          .select()
          .from(user)
          .where(eq(user.id, registeredEvents?.userId ?? ''));

        if (userData.length === 0) {
          throw getTrpcError('USER_NOT_FOUND');
        }

        const event = await tx
          .select()
          .from(eventsTable)
          .where(eq(eventsTable.id, registeredEvents?.eventId ?? ''));

        if (event.length === 0) {
          throw getTrpcError('EVENT_NOT_FOUND');
        }

        return {
          userRegisteredEventTable: registeredEvents,
          user: userData[0],
          event: event[0],
        };
      });
    }),

  forceSuccess: protectedProcedure
    .input(
      userZod.pick({
        email: true,
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== 'ADMIN') {
        throw getTrpcError('NOT_AUTHORIZED');
      }

      return await ctx.db.transaction(async (tx) => {
        const userData = await tx.query.user.findFirst({
          where: eq(user.email, input.email),
        });

        if (!userData) {
          throw getTrpcError('USER_NOT_FOUND');
        }

        const transactionList = await tx.query.transactionsTable.findMany({
          where: and(
            eq(transactionsTable.userId, user.id),
            eq(transactionsTable.status, 'initiated')
          ),
        });

        const success = [];
        const failed = [];

        for (const transaction of transactionList) {
          const successOrNot = await verifyAsthraPayment(transaction.id);

          if (successOrNot.includes('success')) {
            success.push(transaction);
          } else {
            failed.push(transaction);
          }
        }

        console.log('success', success);
        console.log('failed', failed);

        if (success.length === 0) {
          throw getTrpcError('USER_HAS_NO_SUCCESSFUL_PAYMENTS');
        }

        const done =
          success.length !== 0
            ? await tx
                .update(transactionsTable)
                .set({
                  status: 'success',
                })
                .where(
                  and(...success.map((x) => eq(transactionsTable.id, x.id)))
                )
                .returning()
            : [];

        let asthraIncluding: string | false = false;

        const registerData = done.map((x) => {
          if (x.eventId === ASTHRA.id) {
            asthraIncluding = x.id;
          }

          return {
            eventId: x.eventId,
            transactionId: x.id,
            userId: x.userId ?? '',
            registrationId: v4(),
            remark: `Admin Success on ${new Date().toLocaleString()}`,
            status: 'registered' as const,
          };
        });

        if (asthraIncluding) {
          await tx
            .update(user)
            .set({
              asthraPass: true,
              transactionId: asthraIncluding,
            })
            .where(eq(user.id, user.id));
        }
        if (registerData.length) {
          await tx.insert(userRegisteredEventTable).values([...registerData]);

          await tx
            .update(eventsTable)
            .set({ regCount: Increment(eventsTable.regCount, 1) })
            .where(
              and(...registerData.map((x) => eq(eventsTable.id, x.eventId)))
            );
        }

        return { success: done, failed, asthraIncluding };
      });
    }),
});
