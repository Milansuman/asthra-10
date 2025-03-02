import {
  eventZod,
  transactionsZod,
  userRegisteredEventZod,
  userZod,
} from '@/lib/validator';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import MailAPI from './mail';

export const generateMailRouter = createTRPCRouter({
  asthraPass: publicProcedure
    .input(
      z.object({
        user: userZod,
        userRegisteredEvent: userRegisteredEventZod,
        transactions: transactionsZod,
        to: z.string().email(),
      })
    )
    .query(async ({ input }) => {
      await MailAPI.asthraPass(input);
    }),

  eventConfirm: publicProcedure
    .input(
      z.object({
        event: eventZod,
        user: userZod,
        userRegisteredEvent: userRegisteredEventZod,
        to: z.string().email(),
      })
    )
    .query(async ({ input, ctx }) => {
      await MailAPI.EventConfirm(input);
    }),

  purchaseConfirm: publicProcedure
    .input(
      z.object({
        user: userZod,
        event: eventZod,
        userRegisteredEvent: userRegisteredEventZod,
        transactions: transactionsZod,
        to: z.string().email(),
      })
    )
    .query(async ({ input }) => {
      await MailAPI.purchaseConfirm(input);
    }),

  welcome: publicProcedure
    .input(
      userZod.pick({
        email: true,
        name: true,
      })
    )
    .query(async ({ input }) => {
      await MailAPI.welcome(input);
    }),

  certificateReady: publicProcedure
    .input(
      userZod.pick({
        asthraPass: true,
        email: true,
        name: true,
      })
    )
    .query(async ({ input }) => {
      await MailAPI.certificateReady(input);
    }),
});
