import { sendMail } from '@/lib/sendMail';
import { generatePassMailZod } from '@/lib/validator';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const generatePassRouter = createTRPCRouter({
  generatePass: publicProcedure
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
});
