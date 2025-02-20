import { ASTHRA } from '@/logic';
import { and, eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import * as z from 'zod';

import { createTRPCRouter, frontDeskProcedure } from '@/server/api/trpc';
import {
  eventsTable,
  transactionsTable,
  user,
  userRegisteredEventTable,
} from '@/server/db/schema';
import { getTrpcError } from '@/server/db/utils';

export const spotRegister = createTRPCRouter({
  registerEventOffline: frontDeskProcedure
    .input(
      z.object({
        userEmail: z.string(),
        eventId: z.string(),
        spotReciptId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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

        if (isAsthraPass && userData.asthraPass) {
          throw getTrpcError('ALREADY_PURCHASED');
        }

        const transactionId = uuid();

        const transaction = await tx
          .insert(transactionsTable)
          .values({
            id: transactionId,
            eventId: input.eventId,
            userId: userData.id,
            eventName: event.name ?? 'Unknown Workshop/Competiton Name',
            userName: userData.name ?? 'NA',
            amount: event.amount,
            hash: input.spotReciptId ?? transactionId,
            remark: `Spot ${isAsthraPass ? 'ASTHRA PASS' : ''} registraion on ${new Date().toLocaleString()}`,
            status: 'initiated',
          })
          .returning();

        return {
          transaction,
          isAsthraPass,
        };
      });
    }),
});
