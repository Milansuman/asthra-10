// import { sql } from "drizzle-orm";
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { user, userRegisteredEventTable } from '@/server/db/schema';

import {
  isValidUserDetails,
  userAccessZod,
  userCreateMailZod,
} from '@/lib/validator';

import { sendMail } from '@/lib/sendMail';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  /**
   * user with role USER & STUDENT_COORDINATOR can't access other user list
   */
  getUserList: publicProcedure.query(async ({ ctx }) => {
    if (
      ctx.session?.user.role !== 'USER' &&
      ctx.session?.user.role !== 'STUDENT_COORDINATOR'
    ) {
      return await ctx.db.query.user.findMany();
    }
  }),

  /**
   * user with role USER can't access other user
   */
  getUser: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      if (
        ctx.session.user.role !== 'USER' &&
        ctx.session.user.role !== 'STUDENT_COORDINATOR'
      ) {
        return await ctx.db.select().from(user).where(eq(user.id, input.id));
      }
    }),

  sentWelcomeMailUser: publicProcedure
    .input(
      userCreateMailZod.pick({
        data: true,
      })
    )
    .query(async ({ input }) => {
      const { personName, toMail } = input.data;
      await sendMail({
        templateName: 'invitation',
        data: { toMail, personName },
      });
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

  removeAttendance: protectedProcedure
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

  addAttendance: protectedProcedure
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
        })
        .where(
          and(
            eq(userRegisteredEventTable.eventId, input.eventId),
            eq(userRegisteredEventTable.userId, input.userId)
          )
        );
    }),

  /**
   * only the user with role MANAGEMENT can delete user
   */
  deleteUser: protectedProcedure
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

  getRegisteredEventList: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.transaction(async (trx) => {
      return await trx.query.userRegisteredEventTable.findMany({
        where: eq(userRegisteredEventTable.userId, ctx.session.user.id),
      });
    });
  }),

  getRegisterationId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (trx) => {
        return await trx.query.userRegisteredEventTable.findFirst({
          where: eq(userRegisteredEventTable.transactionId, input.id),
        });
      });
    }),

  getUserDataValidity: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.user.findFirst({
      where: eq(user.id, ctx.session.user.id),
    });

    return data ? isValidUserDetails(data) : false;
  }),
});
