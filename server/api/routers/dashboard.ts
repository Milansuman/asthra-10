import { and, count, eq, ne, sql } from 'drizzle-orm';

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
import { ASTHRA } from '@/logic';

export const dashboardRouter = createTRPCRouter({
  asthraCount: coordinatorProcedure.query(async ({ ctx }) => {
    const totalRegistedAndAttended = await ctx.db
      .select({
        value: count(),
      })
      .from(userRegisteredEventTable)
      .where(
        and(
          eq(userRegisteredEventTable.status, 'attended'),
          eq(userRegisteredEventTable.eventId, ASTHRA.id)
        )
      );

    const totalRegistered = await ctx.db
      .select({
        value: count(),
      })
      .from(userRegisteredEventTable)
      .where(
        and(
          eq(userRegisteredEventTable.status, 'registered'),
          eq(userRegisteredEventTable.eventId, ASTHRA.id)
        )
      );

    const totalTransactions = await ctx.db
      .select({
        value: count(),
      })
      .from(transactionsTable)
      .where(eq(transactionsTable.eventId, ASTHRA.id));

    const totalAsthraPass = await ctx.db
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
  }),

  workshopCount: coordinatorProcedure.query(async ({ ctx }) => {
    const totalRegistedAndAttended = await ctx.db
      .select({
        value: count(),
      })
      .from(userRegisteredEventTable)
      .where(
        and(
          eq(userRegisteredEventTable.status, 'attended'),
          ne(userRegisteredEventTable.eventId, ASTHRA.id)
        )
      );

    const totalRegistered = await ctx.db
      .select({
        value: count(),
      })
      .from(userRegisteredEventTable)
      .where(
        and(
          eq(userRegisteredEventTable.status, 'registered'),
          ne(userRegisteredEventTable.eventId, ASTHRA.id)
        )
      );

    const totalTransactions = await ctx.db
      .select({
        value: count(),
      })
      .from(transactionsTable)
      .where(ne(transactionsTable.eventId, ASTHRA.id));

    return {
      totalRegistedAndAttended,
      totalRegistered,
      totalTransactions,
    };
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

        await tx.execute(sql`commit`);
        return {
          registrationList,
        };
      });
    }),
});
