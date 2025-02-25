import { triedAsync } from '@/lib/utils';
import { eventZod } from '@/lib/validator';
import { createOrder, generatedSignature } from '@/logic/payment';
import { getTrpcError } from '@/server/db/utils';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const paymentRouter = createTRPCRouter({
  order: publicProcedure
    .input(
      eventZod.pick({
        id: true,
        amount: true,
      })
    )
    .query(async ({ input }) => {
      const { data: order, isSuccess, error } = await createOrder(input.amount);

      if (!isSuccess) {
        console.warn(error);
        throw getTrpcError('TRANSACTION_FAILED');
      }

      console.log(order);

      return order.id;
    }),

  verify: publicProcedure
    .input(
      z.object({
        orderCreationId: z.string(),
        razorpayPaymentId: z.string(),
        razorpaySignature: z.string(),
      })
    )
    .mutation(({ input }) => {
      const { orderCreationId, razorpayPaymentId, razorpaySignature } = input;
      console.log('Verifing', input);

      const signature = generatedSignature(orderCreationId, razorpayPaymentId);

      if (signature !== razorpaySignature) {
        throw getTrpcError('PAYMENT_VERIFICATION_FAILED');
      }

      return true;
    }),
});
