import { count, eq } from 'drizzle-orm';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import {
  eventsTable,
  transactionsTable,
  user,
  userRegisteredEventTable,
} from '@/server/db/schema';
import { getTrpcError } from '@/server/db/utils';

import { eventAccessZod } from '@/lib/validator';

export const dashboardRouter = createTRPCRouter({
  allManagementCounts: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.role !== 'MANAGEMENT') {
      throw getTrpcError('NOT_AUTHORIZED');
    }

    return await ctx.db.transaction(async (tx) => {
      const totalRegistedAndAttended = await tx
        .select({
          value: count(),
        })
        .from(userRegisteredEventTable)
        .where(eq(userRegisteredEventTable.status, 'attended'));

      const totalRegistered = await tx
        .select({
          value: count(),
        })
        .from(userRegisteredEventTable);

      const totalTransactions = await tx
        .select({
          value: count(),
        })
        .from(transactionsTable);

      const totalAsthraPass = await tx
        .select({
          value: count(),
        })
        .from(user)
        .where(eq(user.asthraPass, true));

      return {
        totalRegistedAndAttended,
        totalRegistered,
        totalTransactions,
        totalAsthraPass,
      };
    });
  }),

  departmentWiseData: protectedProcedure
    .input(
      eventAccessZod
        .pick({
          department: true,
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      if (
        ctx.session.user.role !== 'MANAGEMENT' &&
        ctx.session.user.role !== 'STUDENT_COORDINATOR'
      ) {
        throw getTrpcError('NOT_AUTHORIZED');
      }

      return await ctx.db.transaction(async (tx) => {
        const equcation =
          ctx.session.user.role === 'STUDENT_COORDINATOR'
            ? eq(eventsTable.department, ctx.session.user.department)
            : eq(eventsTable.department, input?.department ?? 'NA');

        const registrationList = await tx
          .select()
          .from(eventsTable)
          .where(equcation)
          .leftJoin(
            userRegisteredEventTable,
            eq(eventsTable.id, userRegisteredEventTable.eventId)
          )
          .leftJoin(user, eq(userRegisteredEventTable.userId, user.id));

        return {
          registrationList,
        };
      });
    }),
});
