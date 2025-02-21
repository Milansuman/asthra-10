import crypto from 'node:crypto';
import { env } from '@/env';
import { triedAsync } from '@/lib/utils';
import { eventZod } from '@/lib/validator';
import { getTrpcError } from '@/server/db/utils';
import Razorpay from 'razorpay';
import { z } from 'zod';
import {
  createTRPCRouter,
  publicProcedure,
  validUserOnlyProcedure,
} from '../trpc';

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = env.RAZORPAY_KEY_SECRET;

  const sig = crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  return sig;
};

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

type Options = Parameters<typeof razorpay.orders.create>[0];

export const paymentRouter = createTRPCRouter({
  order: publicProcedure
    .input(
      eventZod.pick({
        id: true,
        amount: true,
      })
    )
    .query(async ({ input }) => {
      const options: Options = {
        amount: input.amount,
        currency: 'INR',
        receipt: 'rcp1',
      };

      const {
        data: order,
        isSuccess,
        error,
      } = await triedAsync(razorpay.orders.create(options));

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
    .mutation(
      ({
        input: { orderCreationId, razorpayPaymentId, razorpaySignature },
      }) => {
        const signature = generatedSignature(
          orderCreationId,
          razorpayPaymentId
        );

        if (signature !== razorpaySignature) {
          throw getTrpcError('PAYMENT_VERIFICATION_FAILED');
        }

        return true;
      }
    ),
});
