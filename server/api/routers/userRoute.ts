// import { sql } from "drizzle-orm";
import { and, eq, or, ilike, count, desc, sql } from 'drizzle-orm';
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

const roleEnumSchema = z.enum([
  'USER',
  'STUDENT_COORDINATOR',
  'FACULTY_COORDINATOR',
  'MANAGEMENT',
  'ADMIN',
  'DESK',
]);

export const userRouter = createTRPCRouter({
  /**
   * user with role USER can't access other user list
   */
  getUserList: coordinatorProcedure
    .input(
      z
        .object({
          role: roleEnumSchema.optional(),
          search: z.string().optional(),
          page: z.number().min(1).default(1),
          limit: z.number().min(1).max(100).default(10),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      try {
        const page = input?.page ?? 1;
        const limit = input?.limit ?? 10;
        const offset = (page - 1) * limit;
        const search = input?.search?.trim();
        const roleFilter = input?.role;

        // Build where conditions
        const conditions = [];

        if (roleFilter) {
          conditions.push(eq(user.role, roleFilter as any));
        }

        if (search) {
          // Log search parameters for debugging
          console.log('Search parameters:', { search, roleFilter });

          conditions.push(
            or(
              ilike(user.name, `%${search}%`),
              ilike(user.email, `%${search}%`),
              ilike(user.college, `%${search}%`),
              // Handle enum fields properly - convert to text for search
              sql`${user.department}::text ILIKE ${`%${search}%`}`,
              sql`${user.year}::text ILIKE ${`%${search}%`}`,
              // Search by role (convert enum to text)
              sql`${user.role}::text ILIKE ${`%${search}%`}`,
              // Search by KTU number if available
              sql`CASE WHEN ${user.KTU} IS NOT NULL AND ${user.KTU} != '' THEN ${ilike(user.KTU, `%${search}%`)} ELSE false END`,
              // Only search number if it's not null and not empty
              sql`CASE WHEN ${user.number} IS NOT NULL AND ${user.number} != '' THEN ${ilike(user.number, `%${search}%`)} ELSE false END`
            )
          );
        }

        const whereCondition =
          conditions.length > 0 ? and(...conditions) : undefined;

        // Get total count for pagination
        const [totalCountResult] = await ctx.db
          .select({ count: count() })
          .from(user)
          .where(whereCondition);

        const totalCount = totalCountResult?.count ?? 0;
        const totalPages = Math.ceil(totalCount / limit);

        // Get paginated users
        const users = await ctx.db
          .select()
          .from(user)
          .where(whereCondition)
          .orderBy(desc(user.createdAt))
          .limit(limit)
          .offset(offset);

        console.log('Pagination Debug:', {
          page,
          totalPages,
          hasPreviousPage: page > 1 && page <= totalPages,
          hasNextPage: page < totalPages,
        });

        return {
          users,
          pagination: {
            page,
            limit,
            totalCount,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1 && page <= totalPages,
          },
        };
      } catch (error) {
        console.error('Error in getUserList:', error);
        throw new Error(
          `Failed to fetch user list: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }),

  getUserForVerification: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.user.findFirst({
        where: eq(user.id, input.id),
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

  editUserRole: coordinatorProcedure
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

  getAttendence: publicProcedure
    .input(
      z.object({
        eventId: z.string().min(1),
        userId: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.userRegisteredEventTable.findFirst({
        where: and(
          eq(userRegisteredEventTable.eventId, ASTHRA.id),
          eq(userRegisteredEventTable.userId, input.userId)
        ),
      });
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

  getUserRegisteredEvents: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
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
