// import { sql } from "drizzle-orm";
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { allRoles, getTimeUtils } from '@/logic';

import {
  eventsTable,
  user,
  userRegisteredEventTable,
} from '@/server/db/schema';

import {
  isValidUserDetails,
  userAccessZod,
  userCreateMailZod,
  userZod,
} from '@/lib/validator';

import {
  coordinatorProcedure,
  createTRPCRouter,
  frontDeskProcedure,
  managementProcedure,
  protectedProcedure,
  publicProcedure,
  validUserOnlyProcedure,
} from '../trpc';
import { ASTHRA } from '@/logic';

export const userRouter = createTRPCRouter({
  /**
   * user with role USER can't access other user list
   */
  getUserList: frontDeskProcedure
    .input(
      userZod
        .pick({
          role: true,
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.user.findMany({
        where: input?.role ? eq(user.role, input.role) : undefined,
      });
    }),

  /**
   * user with role USER can't access other user
   */
  getUser: frontDeskProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.select().from(user).where(eq(user.id, input.id));
    }),

  /**
   * user can edit/update his own data
   */
  updateUser: protectedProcedure
    .input(userAccessZod)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(user)
        .set({
          ...input,
        })
        .where(eq(user.id, ctx.session.user.id))
        .returning();
    }),

  editUserRole: managementProcedure
    .input(
      z.object({
        role: z.enum([
          'USER',
          'STUDENT_COORDINATOR',
          'FACULTY_COORDINATOR',
          'MANAGEMENT',
          'ADMIN',
          'DESK',
        ]),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(user)
        .set({
          role: input.role,
        })
        .where(eq(user.id, input.userId))
        .returning();
    }),

  removeAttendance: coordinatorProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        eventId: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(userRegisteredEventTable)
        .set({
          status: 'registered',
        })
        .where(
          and(
            eq(userRegisteredEventTable.eventId, input.eventId),
            eq(userRegisteredEventTable.userId, input.userId)
          )
        );
    }),

  entryCheck: frontDeskProcedure
    .input(
      z.object({
        userId: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(userRegisteredEventTable)
        .set({
          status: 'attended',
        })
        .where(
          and(
            eq(userRegisteredEventTable.eventId, ASTHRA.id),
            eq(userRegisteredEventTable.userId, input.userId)
          )
        );
    }),

  addAttendance: coordinatorProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        eventId: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(userRegisteredEventTable)
        .set({
          status: 'attended',
          remark: `Attended at ${getTimeUtils(new Date())}`,
        })
        .where(
          and(
            eq(userRegisteredEventTable.eventId, input.eventId),
            eq(userRegisteredEventTable.userId, input.userId)
          )
        );
    }),

  addAttendanceWithURE: coordinatorProcedure
    .input(
      z.object({
        registrationId: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(userRegisteredEventTable)
        .set({
          status: 'attended',
          remark: `Attended at ${getTimeUtils(new Date())}`,
        })
        .where(
          eq(userRegisteredEventTable.registrationId, input.registrationId)
        );
    }),

  /**
   * only the user with role MANAGEMENT can delete user
   */
  deleteUser: managementProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role === 'MANAGEMENT') {
        return await ctx.db
          .delete(user)
          .where(eq(user.id, input.id))
          .returning({ deletedId: user.id });
      }
    }),

  /**
   * See your session keys (for testing)
   */
  showMySecrets: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.user.findFirst({
      where: eq(user.id, ctx.session.user.id),
    });
  }),

  getRegisteredEventList: validUserOnlyProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(userRegisteredEventTable)
      .leftJoin(
        eventsTable,
        eq(userRegisteredEventTable.eventId, eventsTable.id)
      )
      .where(eq(userRegisteredEventTable.userId, ctx.session.user.id));

    // return await ctx.db.query.userRegisteredEventTable.findMany({
    //   where: eq(userRegisteredEventTable.userId, ctx.session.user.id),
    //   // with: {
    //   //   event: {
    //   //     columns: {
    //   //       name: true,
    //   //     },
    //   //   },
    //   // },
    // });
  }),

  getUserRegisteredEvents: frontDeskProcedure
    .input(z.object({
      userId: z.string()
    }))
    .query(async ({ctx, input}) => {
      return await ctx.db
      .select()
      .from(userRegisteredEventTable)
      .leftJoin(
        eventsTable,
        eq(userRegisteredEventTable.eventId, eventsTable.id)
      )
      .where(eq(userRegisteredEventTable.userId, input.userId));
    }),

  isRegisteredThisEvent: validUserOnlyProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.query.userRegisteredEventTable.findFirst({
        where: and(
          eq(userRegisteredEventTable.userId, ctx.session.user.id),
          eq(userRegisteredEventTable.eventId, input.eventId)
        ),
      });

      return data;
    }),

  getRegisterationId: validUserOnlyProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.userRegisteredEventTable.findFirst({
        where: eq(userRegisteredEventTable.transactionId, input.id),
      });
    }),

  getUserDataValidity: protectedProcedure.query(({ ctx }) => {
    return ctx.user ? isValidUserDetails(ctx.user) : false;
  }),
});
