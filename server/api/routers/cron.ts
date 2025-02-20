import { ASTHRA } from '@/logic';
import { verifyAsthraPayment } from '@/logic/payment';
import { eq, or } from 'drizzle-orm';
import { v4 } from 'uuid';

import { createTRPCRouter, managementProcedure } from '@/server/api/trpc';
import {
  eventsTable,
  transactionsTable,
  user,
  userRegisteredEventTable,
} from '@/server/db/schema';
import { Increment } from '@/server/db/utils';

export const cronRouter = createTRPCRouter({
  runCron: managementProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.transaction(async (tx) => {
      const transactionList = await tx.query.transactionsTable.findMany({
        where: eq(transactionsTable.status, 'initiated'),
        limit: 10,
      });

      const success = [];
      const failed = [];

      for (const transaction of transactionList) {
        const successOrNot = await verifyAsthraPayment(transaction.id);

        if (successOrNot.includes('success')) {
          success.push(transaction);
        } else {
          failed.push(transaction);
        }
      }

      console.log('success', success);
      console.log('failed', failed);

      const failedCron =
        failed.length !== 0
          ? await tx
              .update(transactionsTable)
              .set({
                status: 'failed',
                remark: `Cron Failed on ${new Date().toLocaleString()}`,
              })
              .where(or(...failed.map((x) => eq(transactionsTable.id, x.id))))
              .returning()
          : [];

      const successCron =
        success.length !== 0
          ? await tx
              .update(transactionsTable)
              .set({
                status: 'success',
                remark: `Cron Success on ${new Date().toLocaleString()}`,
              })
              .where(or(...success.map((x) => eq(transactionsTable.id, x.id))))
              .returning()
          : [];

      const asthraIncluding: {
        transactionId: string;
        userId: string;
      }[] = [];

      console.log('done', successCron);
      console.log('notdone', failedCron);

      const registerData = successCron.map((eachTask) => {
        if (eachTask.eventId === ASTHRA.id) {
          asthraIncluding.push({
            userId: eachTask.userId,
            transactionId: eachTask.id,
          } as const);
        }

        return {
          eventId: eachTask.eventId,
          transactionId: eachTask.id,
          userId: eachTask.userId ?? '',
          registrationId: v4(),
          remark: `Cron Success on ${new Date().toLocaleString()}`,
          status: 'registered' as const,
        };
      });

      if (asthraIncluding.length) {
        await Promise.all(
          asthraIncluding.map(async (asthraTask) => {
            await tx
              .update(user)
              .set({
                asthraPass: true,
                transactionId: asthraTask.transactionId,
              })
              .where(eq(user.id, asthraTask.userId));
          })
        );
      }

      if (registerData.length) {
        await tx.insert(userRegisteredEventTable).values([...registerData]);

        await tx
          .update(eventsTable)
          .set({ regCount: Increment(eventsTable.regCount, 1) })
          .where(or(...registerData.map((x) => eq(eventsTable.id, x.eventId))));
      }

      return { success: successCron, failed: failedCron, asthraIncluding };
    });
  }),
});
