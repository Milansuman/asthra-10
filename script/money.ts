import { api } from '@/trpc/vanila';
import { z } from 'zod';
import { json2csv } from 'json-2-csv';

const allEvents = await api.event.getLatest.query();
console.log('Total events:', allEvents.length);
const uuid = z.string().uuid();

for (const event of allEvents) {
  const online = [];
  const offline = [];

  const eventPart = await api.sjcetPay.getTransactionEventParticipants.query({
    id: event.id,
  });

  for (const trans of eventPart) {
    const safe = uuid.safeParse(trans.orderId);
    if (safe.success) {
      online.push({
        ...trans,
        mode: 'online',
      });
    } else {
      if (trans.orderId.includes('order')) {
        online.push({
          ...trans,
          mode: 'razorpay',
        });
      } else {
        offline.push({
          ...trans,
          mode: 'offline',
        });
      }
    }
  }

  const fileName = event.name?.replace(/[^a-zA-Z0-9]/g, '_') ?? event.id;
  const offlineOutputCsv = `./script/transactions/${event.eventType}/${fileName}-offline.csv`;
  const onlineOutputCsv = `./script/transactions/${event.eventType}/${fileName}-online.csv`;

  offline.length > 0 && (await Bun.write(offlineOutputCsv, json2csv(offline)));
  online.length > 0 && (await Bun.write(onlineOutputCsv, json2csv(online)));
}
