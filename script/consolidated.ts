import { api } from '@/trpc/vanila';
import { z } from 'zod';
import { json2csv } from 'json-2-csv';

const allEvents = await api.event.getLatest.query();
console.log('Total events:', allEvents.length);
const uuid = z.string().uuid();

const data = [];

for (const event of allEvents) {
  if (event.eventType === 'ASTHRA_PASS_EVENT') {
    continue;
  }

  const eventPart = await api.sjcetPay.getTransactionEventParticipants.query({
    id: event.id,
  });

  let online = 0;
  let offline = 0;
  let razorpay = 0;
  let collectedAmount = 0;

  for (const trans of eventPart) {
    const safe = uuid.safeParse(trans.orderId);
    if (safe.success) {
      online++;
    } else {
      if (trans.orderId.includes('order')) {
        razorpay++;
      } else {
        offline++;
      }
    }

    collectedAmount += trans.amount;
  }

  data.push({
    name: event.name,
    fee: event.amount,
    eventType: event.eventType,
    department: event.department,
    regCount: event.regCount,
    totalTransactions: eventPart.length,
    online,
    razorpay,
    offline,
    collectedAmount,
    expectedAmount: eventPart.length * event.amount,
  });
}
const fileName = './script/consolidated.csv';
await Bun.write(fileName, json2csv(data));
