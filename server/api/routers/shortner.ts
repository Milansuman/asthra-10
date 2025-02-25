import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { getTrpcError } from '@/server/db/utils';

export const shortnerRouter = createTRPCRouter({
  shorten: publicProcedure
    .input(
      z.object({
        url: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const response = await fetch('https://sjcet.in/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: input.url,
          name: input.name,
        }),
      });

      if (!response.ok) {
        console.log(await response.text());
        return getTrpcError('SHORT_URL_NOT_FOUND');
      }

      const { url }: { url: string } = await response.json();
      console.log(url);
      return { url };
    }),
});
