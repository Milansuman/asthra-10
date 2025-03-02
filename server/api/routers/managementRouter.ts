import { and, eq } from 'drizzle-orm';

import { coordinatorProcedure, createTRPCRouter } from '@/server/api/trpc';
import {
  transactionsTable,
  user,
  userRegisteredEventTable,
} from '@/server/db/schema';

import { userZod, verifyPassZod } from '@/lib/validator';
import { getTrpcError } from '@/server/db/utils';

export const managementRouter = createTRPCRouter({
  getUserAndOrders: coordinatorProcedure
    .input(
      userZod.pick({
        email: true,
      })
    )
    .query(async ({ ctx, input }) => {
      const userData = await ctx.db.query.user.findFirst({
        where: eq(user.email, input.email),
      });

      if (!userData) throw getTrpcError('USER_NOT_FOUND');

      const transactionsData = await ctx.db.query.transactionsTable.findMany({
        where: eq(transactionsTable.userId, userData.id),
      });

      if (transactionsData.length === 0)
        throw getTrpcError('TRANSACTION_NOT_FOUND');
      return {
        user: userData,
        transactions: transactionsData,
      };
    }),
});
