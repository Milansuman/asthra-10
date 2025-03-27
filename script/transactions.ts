import { api } from '@/trpc/vanila';
import { z } from 'zod';
import { json2csv } from 'json-2-csv';

const transactionsData = await api.sjcetPay.getTransactionEventUser.query();

console.log('Total transactions:', transactionsData.length);

const uuid = z.string().uuid();

const data = [];

for (const transData of transactionsData) {
    const {event, transactions, user} = transData
    if (event?.eventType === 'ASTHRA_PASS_EVENT') {
        continue;
    }

    const safe = uuid.safeParse(transactions.orderId);
    let type
    if (safe.success) {
      type = 'online';
    } else {
      if (transactions.orderId.includes('order')) {
        type = 'razorpay';
      } else {
        type = 'offline';
      }
    }

    data.push({
        ...transactions,
        userEmail: user?.email ?? "Unknown",
        userCollege: user?.college ?? "Unknown",
        userPhone: user?.number ?? "Unknown",
        eventName: event?.name ?? "Unknown",
        eventType: event?.eventType ?? "Unknown",
        eventDepartment: event?.department ?? "NA",
        eventAmount: event?.amount ?? "Unknown",
        transactionType: type,
    })
}
const fileName = './script/all-transactions.csv';
await Bun.write(fileName, json2csv(data));
