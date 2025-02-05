import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { transactionsTable } from '@/server/db/schema';

export const transactionsZod = createSelectSchema(transactionsTable);
export type transactions = z.infer<typeof transactionsZod>;

export const command = 'verify_payment';

export const paymentZod = z.object({
  key: z.string().min(6), // 'XvYBqp',
  txnid: z.string(), //'qsesdnfkjsdfjkhsdfksckdsbfvhjd1',
  amount: z.number().nonnegative(), // 1.00,
  firstname: z.string(), // 'Pay U user',
  lastname: z.string().optional(), // 'Pay U user',
  email: z.string().email(), //'test@gmail.com',
  phone: z
    .number()
    .min(
      999999999,
      'Your Mobile number must be valid and 10 digit long. Go to /profile to edit'
    ), // 9876543210,
  productinfo: z.string(), // 'ASTHRA PASS',
  surl: z.string(), // 'https://webhook.site/bcf5448f-2241-4a35-bf5b-31abdeb94d9a',
  furl: z.string(), // 'https://webhook.site/bcf5448f-2241-4a35-bf5b-31abdeb94d9a',
  salt: z.string(), // 'dHRxKBe0'
});
export type Payment = z.infer<typeof paymentZod>;

export const verifyPaymentZod = z.object({
  key: z.string().min(6), // 'XvYBqp',
  txnid: z.string(), //'qsesdnfkjsdfjkhsdfksckdsbfvhjd1',
  command: z.string(), // 'verify_payment'
  salt: z.string(), // 'dHRxKBe0'
});
export type VerifyPayment = z.infer<typeof verifyPaymentZod>;

export const paymentClientSide = paymentZod
  .omit({
    salt: true,
  })
  .merge(
    z.object({
      hash: z.string(),
    })
  );
