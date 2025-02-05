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
import { getTrpcError } from '@/server/db/utils';

export const spotRegister = createTRPCRouter({
  registerEventOffline: protectedProcedure
    .input(
      z.object({
        userEmail: z.string(),
        eventId: z.string(),
        spotReciptId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (
        ctx.session.user.role !== 'DESK' &&
        ctx.session.user.role !== 'MANAGEMENT' &&
        ctx.session.user.role !== 'STUDENT_COORDINATOR'
      ) {
        throw getTrpcError('NOT_AUTHORIZED');
      }

      return await ctx.db.transaction(async (tx) => {
        const userData = await tx.query.user.findFirst({
          where: eq(user.email, input.userEmail),
        });

        if (!userData) {
          throw getTrpcError('USER_NOT_FOUND');
        }

        const event = await tx.query.eventsTable.findFirst({
          where: eq(eventsTable.id, input.eventId),
        });

        if (!event) {
          throw getTrpcError('EVENT_NOT_FOUND');
        }

        const alreadyRegisteredData =
          await tx.query.userRegisteredEventTable.findFirst({
            where: and(
              eq(userRegisteredEventTable.eventId, event.id),
              eq(userRegisteredEventTable.userId, user.id)
            ),
          });

        if (event.eventType === 'ASTHRA_PASS_EVENT') {
          throw getTrpcError('WRONG_PARAMETERS');
        }

        if (alreadyRegisteredData) {
          throw getTrpcError('ALREADY_PURCHASED');
        }

        if (event.regCount >= event.regLimit) {
          throw getTrpcError('REGISTRATION_LIMIT_EXCEDED');
        }

        const isAsthraPass = event.id === ASTHRA.id;

        const transactionId = v4();

        const transaction = await tx
          .insert(transactionsTable)
          .values({
            id: transactionId,
            eventId: input.eventId,
            userId: user.id,
            eventName: event.name ?? 'Unknown Workshop/Competiton Name',
            userName: user.name ?? 'NA',
            amount: event.amount,
            hash: input.spotReciptId ?? transactionId,
            remark: `Spot ${isAsthraPass ? 'ASTHRA PASS' : ''} registraion on ${new Date().toLocaleString()}`,
            status: 'initiated',
          })
          .returning();

        if (event.id === ASTHRA.id && user.asthraPass) {
          throw getTrpcError('ALREADY_PURCHASED');
        }

        return {
          transaction,
          isAsthraPass,
        };
      });
    }),
});
