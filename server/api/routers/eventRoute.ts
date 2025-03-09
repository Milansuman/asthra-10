import { eventRouteRules } from '@/logic/moods';
import { and, eq, inArray, sql } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import {
  coordinatorProcedure,
  createTRPCRouter,
  eventsManageProcedure,
  protectedProcedure,
  publicProcedure,
  validUserOnlyProcedure,
} from '@/server/api/trpc';
import {
  eventsTable,
  user,
  userRegisteredEventTable,
} from '@/server/db/schema';
import { Decrement, Increment, getTrpcError } from '@/server/db/utils';

import {
  eventEditAccessZod,
  eventZod,
  type UserZodType,
} from '@/lib/validator';
import { api } from '@/trpc/vanila';
import { cache } from '@/server/cache';
import { getTimeUtils } from '@/logic';
import MailAPI from './mail';

export const eventRouter = createTRPCRouter({
  /**
   * user with role `USER` can't create events
   */
  createEvent: eventsManageProcedure
    .input(eventEditAccessZod.optional())
    .mutation(async ({ ctx, input }) => {
      eventRouteRules(ctx.role);

      await ctx.db.insert(eventsTable).values({
        // department: ctx.user.department ?? 'NA',
        createdById: ctx.user.id,
        ...input,
      });
    }),

  /**
   * user with role `USER` can't edit events
   *
   * also some attributes of events can't be edit after last date
   *
   * `AsthraLastEditDay`
   *
   * edit more attributes of events are restriced after asthra started
   *
   * `AsthraStartsAt`
   */
  updateEvent: eventsManageProcedure
    .input(eventEditAccessZod.merge(z.object({ id: z.string() })))
    .mutation(async ({ ctx, input }) => {
      const newInput = input;

      if (ctx.user.role === 'MANAGEMENT') {
        return await ctx.db
          .update(eventsTable)
          .set({
            ...newInput,
          })
          .where(eq(eventsTable.id, input.id))
          .returning();
      }

      return await ctx.db
        .update(eventsTable)
        .set({
          ...newInput,
        })
        .where(
          eq(eventsTable.id, input.id)
          // and(
          //   eq(eventsTable.id, input.id),
          //   eq(eventsTable.department, ctx.user.department)
          // )
        )
        .returning();
    }),

  /**
   * user with role `USER` can't edit events
   *
   * also some attributes of events can't be edit after last date
   *
   * `AsthraLastEditDay`
   *
   * edit more attributes of events are restriced after asthra started
   *
   * `AsthraStartsAt`
   */
  uploadEventImage: eventsManageProcedure
    .input(
      eventZod.pick({
        poster: true,
        id: true,
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role === 'MANAGEMENT') {
        return await ctx.db
          .update(eventsTable)
          .set({
            ...input,
          })
          .where(eq(eventsTable.id, input.id))
          .returning();
      }

      return await ctx.db
        .update(eventsTable)
        .set({
          ...input,
        })
        .where(
          eq(eventsTable.id, input.id)
          // and(
          //   eq(eventsTable.id, input.id),
          //   eq(eventsTable.department, ctx.user.department)
          // )
        )
        .returning();
    }),

  /**
   * only the user with role MANAGEMENT can delete events
   */
  deleteEvent: eventsManageProcedure
    .input(
      eventZod.pick({
        id: true,
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role === 'MANAGEMENT') {
        return await ctx.db
          .delete(eventsTable)
          .where(
            eq(eventsTable.id, input.id)
            // and(
            //   eq(eventsTable.id, input.id),
            //   eq(eventsTable.department, ctx.user.department)
            // )
          )
          .returning({ deletedId: eventsTable.id });
      }
      return await ctx.db
        .delete(eventsTable)
        .where(eq(eventsTable.id, input.id))
        .returning({ deletedId: eventsTable.id });
    }),

  getLatest: publicProcedure
    .input(z.number().optional())
    .query(({ ctx, input }) => {
      return ctx.db.query.eventsTable.findMany({
        where: eq(eventsTable.eventStatus, 'approved'),
        orderBy: (events, { desc }) => [desc(events.createdAt)],
        limit: input,
      });
    }),

  getLatestCached: publicProcedure
    .input(z.number().optional())
    .query(async ({ ctx, input }) => {
      return await cache.run('events', () =>
        ctx.db.query.eventsTable.findMany({
          where: eq(eventsTable.eventStatus, 'approved'),
          orderBy: (events, { desc }) => [desc(events.createdAt)],
          limit: input,
        })
      );
    }),

  getGeneral: publicProcedure
    .input(z.number().optional())
    .query(({ ctx, input }) => {
      return ctx.db.query.eventsTable.findMany({
        where: and(
          eq(eventsTable.eventStatus, 'approved'),
          eq(eventsTable.department, 'NA')
        ),
        limit: input,
      });
    }),

  getAll: coordinatorProcedure
    .input(z.number().optional())
    .query(({ ctx, input }) => {
      return ctx.db.query.eventsTable.findMany({
        orderBy: (events, { desc }) => [desc(events.createdAt)],
        limit: input,
      });
    }),

  getSpecific: publicProcedure
    .input(
      eventZod.pick({
        id: true,
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.eventsTable.findFirst({
        where: eq(eventsTable.id, input.id),
      });
    }),

  getSpecificWithName: publicProcedure
    .input(
      eventZod.pick({
        name: true,
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.execute(
        sql`select * from ${eventsTable} where ${eventsTable.name} LIKE '%${input.name}%'`
      );
    }),

  getSpecificCached: publicProcedure
    .input(
      eventZod.pick({
        id: true,
      })
    )
    .query(async ({ ctx, input }) => {
      return await cache.run(`event:${input.id}`, () =>
        ctx.db.query.eventsTable.findFirst({
          where: eq(eventsTable.id, input.id),
        })
      );
    }),

  getRoleSpecific: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.role === 'MANAGEMENT') {
      return await ctx.db.query.eventsTable.findMany();
    }
    if (ctx.user.department === 'NA') {
      return [];
    }
    return ctx.db.query.eventsTable.findMany({
      where: eq(eventsTable.department, user.department ?? 'NA'),
    });
  }),

  getParticipants: coordinatorProcedure
    .input(
      eventZod.pick({
        id: true,
      })
    )
    .query(({ ctx, input }) => {
      return ctx.db
        .select({
          status: userRegisteredEventTable.status,
          name: user.name,
          email: user.email,
          department: user.department,
          college: user.college,
          eventId: userRegisteredEventTable.eventId,
          userId: userRegisteredEventTable.userId,
        })
        .from(userRegisteredEventTable)
        .leftJoin(user, eq(userRegisteredEventTable.userId, user.id))
        .where(eq(userRegisteredEventTable.eventId, input.id))
        .orderBy(user.name);
    }),

  getEventParticipants: coordinatorProcedure
    .input(eventZod.pick({ id: true }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(userRegisteredEventTable)
        .leftJoin(user, eq(userRegisteredEventTable.userId, user.id))
        .leftJoin(
          eventsTable,
          eq(userRegisteredEventTable.eventId, eventsTable.id)
        )
        .where(eq(userRegisteredEventTable.eventId, input.id))
        .orderBy(user.name);
    }),

  addParticipants: coordinatorProcedure
    .input(
      z.object({
        eventId: z.string(),
        usersEmails: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const eventData = await ctx.db.query.eventsTable.findFirst({
        where: eq(eventsTable.id, input.eventId),
      });

      if (!eventData) {
        throw getTrpcError('EVENT_NOT_FOUND');
      }
      if (eventData.eventType !== 'ASTHRA_PASS_EVENT') {
        throw getTrpcError('UPDATE_ATTRIBUTE_FAILED');
      }

      const userData = await ctx.db.query.user.findMany({
        where: inArray(user.email, input.usersEmails),
      });

      console.log(userData);

      if (userData.length === 0) {
        throw getTrpcError('USER_NOT_FOUND');
      }

      for (const u of userData) {
        const isRegistered =
          await ctx.db.query.userRegisteredEventTable.findFirst({
            where: and(
              eq(userRegisteredEventTable.eventId, input.eventId),
              eq(userRegisteredEventTable.userId, u.id)
            ),
          });

        if (isRegistered) {
          continue;
        }

        await ctx.db.insert(userRegisteredEventTable).values({
          eventId: input.eventId,
          userId: u.id,
          transactionId: u.transactionId ?? uuid(),
          status: 'attended',
          remark: 'Spot registration',
        });
      }
    }),
  /**
   * Register non price events
   */
  registerEvent: validUserOnlyProcedure
    .input(eventZod.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const returnData = await ctx.db.transaction(async (tx) => {
        const eventData = await tx.query.eventsTable.findFirst({
          where: eq(eventsTable.id, input.id),
        });

        if (!eventData) {
          throw getTrpcError('EVENT_NOT_FOUND');
        }
        if (eventData.eventType !== 'ASTHRA_PASS_EVENT') {
          throw getTrpcError('WRONG_PARAMETERS');
        }

        if (!ctx.user.asthraPass || !ctx.user.transactionId) {
          throw getTrpcError('NEED_ASTHRA_PASS');
        }

        const userRegistered =
          await tx.query.userRegisteredEventTable.findFirst({
            where: and(
              eq(userRegisteredEventTable.eventId, input.id),
              eq(userRegisteredEventTable.userId, ctx.user.id)
            ),
          });

        if (userRegistered) {
          throw getTrpcError('ALREADY_PURCHASED');
        }

        if (eventData.regCount >= eventData.regLimit) {
          throw getTrpcError('REGISTRATION_LIMIT_EXCEDED');
        }

        if (eventData.amount > ctx.user.asthraCredit) {
          throw getTrpcError('YOUR_ASTHRA_CREDIT_EXECEDED');
        }

        const ure = await tx
          .insert(userRegisteredEventTable)
          .values({
            registrationId: uuid(),
            eventId: input.id,
            userId: ctx.user.id,
            transactionId: ctx.user.transactionId ?? uuid(),
            remark: `Registered on ${getTimeUtils(new Date())}`,
          })
          .returning();

        await tx
          .update(user)
          .set({
            asthraCredit: Decrement(user.asthraCredit, eventData.amount),
          })
          .where(eq(user.id, ctx.user.id));

        const updatedEventData = await tx
          .update(eventsTable)
          .set({
            regCount: Increment(eventsTable.regCount, 1),
          })
          .where(eq(eventsTable.id, eventData.id))
          .returning();

        if (updatedEventData.length === 0 || !updatedEventData[0]) {
          throw getTrpcError('EVENT_NOT_FOUND');
        }

        if (ure.length === 0 || !ure[0]) {
          throw getTrpcError('EVENT_NOT_FOUND');
        }

        await tx.execute(sql`commit`);

        return {
          event: updatedEventData[0],
          transactionId: ctx.user.transactionId,
          status: 'success',
          user: ctx.user,
          userRegisteredEvent: ure[0],
        };
      });

      await MailAPI.EventConfirm({
        event: returnData.event,
        user: returnData.user as UserZodType,
        to: returnData.user.email,
        userRegisteredEvent: returnData.userRegisteredEvent,
      });

      return returnData;
    }),
});
