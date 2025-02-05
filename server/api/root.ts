import { createTRPCRouter } from '@/server/api/trpc';
import { asthraRouter } from './routers/asthraRouter';
import { cronRouter } from './routers/cron';
import { dashboardRouter } from './routers/dashboard';
import { eventRouter } from './routers/eventRoute';
import { generatePassRouter } from './routers/generatePassRoutes';
import { spotRegister } from './routers/spot';
import { transactionRouter } from './routers/transaction';
import { userRouter } from './routers/userRoute';
import { verifyRouter } from './routers/verify';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter, // put procedures under "user" namespace
  event: eventRouter,
  asthra: asthraRouter,
  transaction: transactionRouter,
  pass: generatePassRouter,
  verify: verifyRouter,
  dashboard: dashboardRouter,
  cron: cronRouter,
  spot: spotRegister,
});

// export type definition of API
export type AppRouter = typeof appRouter;
