import { eq } from 'drizzle-orm';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import {
  transactionsTable,
  user,
  userRegisteredEventTable,
} from '@/server/db/schema';

import { verifyPassZod } from '@/lib/validator';

export const managementRouter = createTRPCRouter({
  verifyAsthraPass: protectedProcedure
    .input(verifyPassZod)
    .query(({ ctx, input }) => {
      return ctx.db.query.user.findFirst({
        where: eq(user.id, input.id),
      });
    }),

  verifyEventPass: protectedProcedure
    .input(verifyPassZod)
    .query(async ({ ctx, input }) => {
      const validTransaction = await ctx.db.query.transactionsTable.findFirst({
        where: eq(transactionsTable.id, input.id),
      });

      if (validTransaction) {
        await ctx.db
          .update(userRegisteredEventTable)
          .set({
            status: 'attended',
          })
          .where(eq(userRegisteredEventTable.userId, validTransaction.userId));
      }
    }),
});
