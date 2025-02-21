import crypto from 'node:crypto';
import { env } from '@/env';
import { triedAsync } from '@/lib/utils';
import Razorpay from 'razorpay';

export const razorpay = new Razorpay({
  key_id: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

export const generatedSignature = (
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

export const createOrder = async (amount: number) => {
  return await triedAsync(
    razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: 'rcp1',
    })
  );
};
