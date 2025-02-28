import { eventRouteRules, extractInput } from '@/logic/moods';
import { and, eq } from 'drizzle-orm';
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

import { eventEditAccessZod, eventZod } from '@/lib/validator';

export const eventRouter = createTRPCRouter({
  /**
   * user with role `USER` can't create events
   */
  createEvent: eventsManageProcedure
    .input(eventEditAccessZod.optional())
    .mutation(async ({ ctx, input }) => {
      eventRouteRules(ctx.role);

      await ctx.db.insert(eventsTable).values({
        department: ctx.user.department ?? 'NA',
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
      const newInput = extractInput(input);

      eventRouteRules(ctx.user.role);

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
      eventRouteRules(ctx.user.role);

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
      eventRouteRules(ctx.user.role);

      if (ctx.user.role === 'MANAGEMENT') {
        console.log(ctx.user);
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
    .query(({ ctx, input }) => {
      return ctx.db.query.eventsTable.findFirst({
        where: eq(eventsTable.id, input.id),
      });
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

  /**
   * Register non price events
   */
  registerEvent: validUserOnlyProcedure
    .input(eventZod.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
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

        await tx.insert(userRegisteredEventTable).values({
          registrationId: uuid(),
          eventId: input.id,
          userId: ctx.user.id,
          transactionId: ctx.user.transactionId ?? uuid(),
          remark: `Registered on ${new Date().toLocaleString()}`,
        });

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

        return {
          event: updatedEventData[0],
          transactionId: ctx.user.transactionId,
          status: 'success',
        };
      });
    }),
});
