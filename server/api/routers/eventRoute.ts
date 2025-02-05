import { eventRouteRules, extractInput } from '@/logic/moods';
import { and, eq } from 'drizzle-orm';
import { v4 as uuidv4, v4 } from 'uuid';
import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
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
  createEvent: protectedProcedure
    .input(eventEditAccessZod.optional())
    .mutation(async ({ ctx, input }) => {
      eventRouteRules(ctx.session.user.role);

      await ctx.db.insert(eventsTable).values({
        department: ctx.session.user.department ?? 'NA',
        createdById: ctx.session.user.id,
        ...input,
        id: uuidv4(),
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
  updateEvent: protectedProcedure
    .input(eventEditAccessZod.merge(z.object({ id: z.string() })))
    .mutation(async ({ ctx, input }) => {
      const newInput = extractInput(input);

      eventRouteRules(ctx.session.user.role);

      if (ctx.session.user.role === 'MANAGEMENT') {
        return await ctx.db
          .update(eventsTable)
          .set({
            ...newInput,
          })
          .where(eq(eventsTable.id, input.id));
      }

      return await ctx.db
        .update(eventsTable)
        .set({
          ...newInput,
        })
        .where(
          and(
            eq(eventsTable.id, input.id),
            eq(eventsTable.department, ctx.session.user.department)
          )
        );
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
  uploadEventImage: protectedProcedure
    .input(
      eventZod.pick({
        poster: true,
        id: true,
      })
    )
    .mutation(async ({ ctx, input }) => {
      eventRouteRules(ctx.session.user.role);

      if (ctx.session.user.role === 'MANAGEMENT') {
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
          and(
            eq(eventsTable.id, input.id),
            eq(eventsTable.department, ctx.session.user.department)
          )
        )
        .returning();
    }),

  /**
   * only the user with role MANAGEMENT can delete events
   */
  deleteEvent: protectedProcedure
    .input(
      eventZod.pick({
        id: true,
      })
    )
    .mutation(async ({ ctx, input }) => {
      eventRouteRules(ctx.session.user.role);

      if (ctx.session.user.role === 'MANAGEMENT') {
        return await ctx.db
          .delete(eventsTable)
          .where(
            and(
              eq(eventsTable.id, input.id),
              eq(eventsTable.department, ctx.session.user.department)
            )
          )
          .returning({ deletedId: eventsTable.id });
      }
      return await ctx.db
        .delete(eventsTable)
        .where(eq(eventsTable.id, input.id))
        .returning({ deletedId: eventsTable.id });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.eventsTable.findMany({
      orderBy: (events, { desc }) => [desc(events.createdAt)],
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

  getRoleSpecific: protectedProcedure.query(({ ctx }) => {
    return ctx.db.transaction(async (tx) => {
      const userData = await tx.query.user.findFirst({
        where: eq(user.id, ctx.session.user.id),
      });

      if (!userData) {
        throw getTrpcError('NOT_AUTHORIZED');
      }

      if (userData.role === 'MANAGEMENT') {
        return await tx.query.eventsTable.findMany();
      }
      if (userData.department === 'NA') {
        return [];
      }

      return await tx.query.eventsTable.findMany({
        where: eq(eventsTable.department, user.department ?? 'NA'),
      });
    });
  }),

  getParticipants: protectedProcedure
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
  registerEvent: protectedProcedure
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

        const userData = await tx.query.user.findFirst({
          where: eq(user.id, ctx.session.user.id),
        });

        if (!userData) {
          throw getTrpcError('NOT_AUTHORIZED');
        }
        if (!userData.asthraPass || !userData.transactionId) {
          throw getTrpcError('NEED_ASTHRA_PASS');
        }

        const userRegistered =
          await tx.query.userRegisteredEventTable.findFirst({
            where: and(
              eq(userRegisteredEventTable.eventId, input.id),
              eq(userRegisteredEventTable.userId, userData.id)
            ),
          });

        if (userRegistered) {
          throw getTrpcError('ALREADY_PURCHASED');
        }

        if (eventData.regCount >= eventData.regLimit) {
          throw getTrpcError('REGISTRATION_LIMIT_EXCEDED');
        }

        if (eventData.amount > userData.asthraCredit) {
          throw getTrpcError('YOUR_ASTHRA_CREDIT_EXECEDED');
        }

        await tx.insert(userRegisteredEventTable).values({
          registrationId: v4(),
          eventId: input.id,
          userId: userData.id,
          transactionId: userData.transactionId ?? v4(),
          remark: `Registered on ${new Date().toLocaleString()}`,
        });

        await tx
          .update(user)
          .set({
            asthraCredit: Decrement(user.asthraCredit, eventData.amount),
          })
          .where(eq(user.id, userData.id));

        const updatedEventData = await tx
          .update(eventsTable)
          .set({
            regCount: Increment(eventsTable.regCount, 1),
          })
          .where(eq(eventsTable.id, eventData.id))
          .returning();

        return {
          event: updatedEventData[0],
          transactionId: userData.transactionId,
          status: 'success',
        };
      });
    }),
});
