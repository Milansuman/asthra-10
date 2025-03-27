import { and, eq } from 'drizzle-orm';

import {
  coordinatorProcedure,
  createTRPCRouter,
  publicProcedure,
} from '@/server/api/trpc';
import {
  eventsTable,
  transactionsTable,
  user,
  userRegisteredEventTable,
} from '@/server/db/schema';

import {
  eventZod,
  transactionsZod,
  type TransactionZodType,
  userZod,
  type UserZodType,
} from '@/lib/validator';
import { v4 as uuid } from 'uuid';
import { getTrpcError } from '@/server/db/utils';
import { getTimeUtils } from '@/logic';

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
  getOrderAndUser: coordinatorProcedure
    .input(
      transactionsZod.pick({
        orderId: true,
      })
    )
    .query(async ({ ctx, input }) => {
      const transactionsData = await ctx.db.query.transactionsTable.findFirst({
        where: eq(transactionsTable.orderId, input.orderId),
      });

      if (!transactionsData) throw getTrpcError('TRANSACTION_NOT_FOUND');

      const userData = await ctx.db.query.user.findFirst({
        where: eq(user.id, transactionsData.userId),
      });

      if (!userData) throw getTrpcError('USER_NOT_FOUND');

      return {
        user: userData,
        transactions: [transactionsData],
      };
    }),

  initiateStatic: coordinatorProcedure
    .input(userZod.pick({ email: true }).merge(eventZod.pick({ id: true })))
    .mutation(async ({ ctx, input }) => {
      const userData = await ctx.db.query.user.findFirst({
        where: eq(user.email, input.email),
      });

      if (!userData) throw getTrpcError('USER_NOT_FOUND');

      const event = await ctx.db.query.eventsTable.findFirst({
        where: eq(eventsTable.id, input.id),
      });

      if (!event) throw getTrpcError('EVENT_NOT_FOUND');

      const alreadyRegisteredData =
        await ctx.db.query.userRegisteredEventTable.findFirst({
          where: and(
            eq(userRegisteredEventTable.eventId, input.id),
            eq(userRegisteredEventTable.userId, userData.id)
          ),
        });

      if (alreadyRegisteredData) {
        throw getTrpcError('ALREADY_PURCHASED');
      }

      const transactionId = uuid();

      const insertTransaction: TransactionZodType = {
        eventId: event.id,
        eventName: event.name ?? 'Unknown Workshop/Competiton Name',
        id: transactionId,
        orderId: transactionId,
        userId: userData.id,
        userName: userData.name ?? 'NA',
        status: 'initiated',
        amount: event.amount,
        remark: `${userData.email}, ${userData.number}, Manual Initiated ${event.eventType} purchase on ${getTimeUtils(new Date())}`,
      };

      const finalData = await ctx.db
        .insert(transactionsTable)
        .values({ ...insertTransaction })
        .returning();

      if (!finalData.length || !finalData[0]) {
        throw getTrpcError('TRANSACTION_NOT_FOUND');
      }

      return {
        transaction: finalData[0],
      };
    }),

  getRegisteredEventList: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select()
      .from(userRegisteredEventTable)
      .leftJoin(
        eventsTable,
        eq(userRegisteredEventTable.eventId, eventsTable.id)
      )
      .leftJoin(user, eq(userRegisteredEventTable.userId, user.id));

    return data;
  }),

  getUsers: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.user.findMany();

    return data as UserZodType[];
  }),

  getRegisteredEventListofUser: publicProcedure
    .input(userZod.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      const userData = await ctx.db.query.user.findFirst({
        where: eq(user.id, input.id),
      });

      if (!userData) throw getTrpcError('USER_NOT_FOUND');

      const data = await ctx.db
        .select()
        .from(userRegisteredEventTable)
        .leftJoin(
          eventsTable,
          eq(userRegisteredEventTable.eventId, eventsTable.id)
        )
        .where(eq(userRegisteredEventTable.userId, input.id));

      return {
        user: userData,
        data,
      };
    }),

  isAttendedAny: publicProcedure
    .input(userZod.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      const userData = await ctx.db.query.user.findFirst({
        where: eq(user.id, input.id),
      });

      if (!userData) throw getTrpcError('USER_NOT_FOUND');

      const data = await ctx.db.query.userRegisteredEventTable.findMany({
        where: eq(userRegisteredEventTable.userId, input.id),
      });

      return data;
    }),
});
