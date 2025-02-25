import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { asthraRouter } from "./routers/asthraRouter";
import { cronRouter } from "./routers/cron";
import { dashboardRouter } from "./routers/dashboard";
import { eventRouter } from "./routers/eventRoute";
import { generateMailRouter } from "./routers/mailRoute";
import { paymentRouter } from "./routers/payment";
import { spotRegister } from "./routers/spot";
import { transactionRouter } from "./routers/transaction";
import { transactionRouter as sjcetPay } from "./routers/sjcet-pay";
import { userRouter } from "./routers/userRoute";
import { verifyRouter } from "./routers/verify";

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
  sjcetPay: sjcetPay,
  mail: generateMailRouter,
  verify: verifyRouter,
  dashboard: dashboardRouter,
  cron: cronRouter,
  spot: spotRegister,
  payment: paymentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
