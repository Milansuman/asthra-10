import { count, eq } from 'drizzle-orm';

import {
  coordinatorProcedure,
  createTRPCRouter,
  managementProcedure,
  protectedProcedure,
} from '@/server/api/trpc';
import {
  eventsTable,
  transactionsTable,
  user,
  userRegisteredEventTable,
} from '@/server/db/schema';
import { getTrpcError } from '@/server/db/utils';

import { eventAccessZod } from '@/lib/validator';

export const dashboardRouter = createTRPCRouter({
  allManagementCounts: managementProcedure.query(async ({ ctx }) => {
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

  departmentWiseData: coordinatorProcedure
    .input(
      eventAccessZod
        .pick({
          department: true,
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const equcation =
          ctx.role === 'STUDENT_COORDINATOR'
            ? eq(eventsTable.department, ctx.user.department)
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
