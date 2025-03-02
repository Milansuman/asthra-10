import AsthraPass from '@/components/mail/_templates/asthraPass';
import EventConfirmation from '@/components/mail/_templates/eventConfirmation';
import PaymentConfirmationEmail from '@/components/mail/_templates/paymentConfirmation';
import WelcomeTemplate from '@/components/mail/_templates/welcome';
import CertificateReadyEmail from '@/components/mail/_templates/certificateReady';
import { getHTML, sentMail } from '@/lib/mail';
import {
  eventZod,
  generatePassMailZod,
  userZod,
  userRegisteredEventZod,
  transactionsZod,
} from '@/lib/validator';
import { currentAsthraCount } from '@/logic';
import {
  createTRPCRouter,
  managementProcedure,
  publicProcedure,
  validUserOnlyProcedure,
} from '../trpc';
import { z } from 'zod';

export const generateMailRouter = createTRPCRouter({
  asthraPass: validUserOnlyProcedure
    .input(
      z.object({
        user: userZod,
        userRegisteredEvent: userRegisteredEventZod,
        transactions: transactionsZod,
        to: z.string().email(),
      })
    )
    .query(async ({ input }) => {
      const { to, user, userRegisteredEvent, transactions } = input;

      const { isSuccess, error } = await sentMail({
        to,
        html: await getHTML(AsthraPass, {
          user,
          userRegisteredEvent,
          transactions: transactions,
        }),
        subject: 'Your Asthra Pass',
        text: `Here is your Asthra Pass for ASTHRA ${currentAsthraCount}.`,
      });

      if (!isSuccess) console.error(error);
    }),

  eventConfirm: validUserOnlyProcedure
    .input(
      z.object({
        event: eventZod,
        user: userZod,
        userRegisteredEvent: userRegisteredEventZod,
        to: z.string().email(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { user, to, event, userRegisteredEvent } = input;

      const { isSuccess, error } = await sentMail({
        to,
        html: await getHTML(EventConfirmation, {
          user,
          event,
        }),
        subject: `Event Confirmation - ${event.name}`,
        text: `You have successfully registered for ${event.name} on ASTHRA ${currentAsthraCount}.`,
      });

      if (!isSuccess) console.error(error);
    }),

  purchaseConfirm: validUserOnlyProcedure
    .input(
      z.object({
        user: userZod,
        event: eventZod,
        userRegisteredEvent: userRegisteredEventZod,
        transactions: transactionsZod,
        to: z.string().email(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { to, user, event, userRegisteredEvent, transactions } = input;

      const { isSuccess, error } = await sentMail({
        to,
        html: await getHTML(PaymentConfirmationEmail, {
          user,
          event,
          userRegisteredEvent,
          transactions,
        }),
        subject: `Event Confirmation - ${event.name}`,
        text: `You have successfully registered for ${event.name} on ASTHRA ${currentAsthraCount}.`,
      });

      if (!isSuccess) console.error(error);
    }),

  welcome: publicProcedure
    .input(
      userZod.pick({
        email: true,
        name: true,
      })
    )
    .query(async ({ input }) => {
      const { name, email } = input;
      const { isSuccess, error } = await sentMail({
        to: email,
        html: await getHTML(WelcomeTemplate, {
          personName: name ?? email,
        }),
        subject: `Welcome to Asthra ${currentAsthraCount}`,
        text: `Welcome to ASTHRA ${currentAsthraCount} on SJCET.`,
      });

      if (!isSuccess) console.error(error);
    }),

  certificateReady: managementProcedure
    .input(
      userZod.pick({
        asthraPass: true,
        email: true,
        name: true,
      })
    )
    .query(async ({ input }) => {
      const { isSuccess, error } = await sentMail({
        to: input.email,
        html: await getHTML(CertificateReadyEmail, {
          personName: input.name ?? '',
        }),
        subject: 'Your Certificate is Ready',
        text: 'Your certificate is ready for download. Please visit the profile section to download it.',
      });

      if (!isSuccess) console.error(error);
    }),
});
