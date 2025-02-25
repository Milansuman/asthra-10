import AsthraPass from '@/components/mail/_templates/asthraPass';
import EventConfirmation from '@/components/mail/_templates/eventConfirmation';
import WelcomeTemplate from '@/components/mail/_templates/welcome';
import { getHTML, sentMail } from '@/lib/mail';
import { generatePassMailZod, userZod } from '@/lib/validator';
import { currentAsthraCount } from '@/logic';
import {
  createTRPCRouter,
  managementProcedure,
  publicProcedure,
  validUserOnlyProcedure,
} from '../trpc';

export const generateMailRouter = createTRPCRouter({
  asthraPass: validUserOnlyProcedure
    .input(
      generatePassMailZod.pick({
        data: true,
      })
    )
    .query(async ({ input }) => {
      const { personName, toMail, eventId, eventName } = input.data;
      const { isSuccess, error } = await sentMail({
        to: toMail,
        html: await getHTML(AsthraPass, {
          eventId,
          eventName,
          personName,
        }),
        subject: 'Your Asthra Pass',
        text: `Welcome to ASTHRA ${currentAsthraCount} on SJCET.`,
      });

      if (!isSuccess) console.error(error);
    }),

  purchased: validUserOnlyProcedure
    .input(
      generatePassMailZod.pick({
        data: true,
      })
    )
    .query(async ({ input, ctx }) => {
      const { personName, toMail, eventId, eventName } = input.data;

      const { isSuccess, error } = await sentMail({
        to: toMail,
        html: await getHTML(EventConfirmation, {
          user: ctx.user,
          eventName,
          eventSecret: '',
          transactions: {},
        }),
        subject: 'Your Asthra Pass',
        text: `Welcome to ASTHRA ${currentAsthraCount} on SJCET.`,
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
          personName: name ?? 'User',
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
        subject: 'Your Certificate is Ready',
        text: 'Your certificate is ready for download. Please visit the profile section to download it.',
      });

      if (!isSuccess) console.error(error);
    }),
});
