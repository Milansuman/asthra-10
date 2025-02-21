import { sendMail } from '@/lib/sendMail';
import { generatePassMailZod, userCreateMailZod } from '@/lib/validator';
import {
  createTRPCRouter,
  publicProcedure,
  validUserOnlyProcedure,
} from '../trpc';

export const generateMailRouter = createTRPCRouter({
  asthraPassPass: validUserOnlyProcedure
    .input(
      generatePassMailZod.pick({
        data: true,
      })
    )
    .mutation(async ({ input }) => {
      const { personName, toMail, eventId, eventName } = input.data;
      await sendMail({
        templateName: 'asthraPass',
        data: { toMail, personName, eventId, eventName },
      });
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
});
