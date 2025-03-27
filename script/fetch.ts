import { api } from '@/trpc/vanila';
import { json2csv, csv2json } from 'json-2-csv';

const allEvents = await api.event.getLatest.query();
console.log('Total events:', allEvents.length);

let eventWeNeed = [];

for (const event of allEvents) {
  if (event.regCount === 0) {
    console.log('No registration:', event.name);
    continue;
  }

  const eventData = {
    name: event.name,
    regCount: event.regCount,
    department: event.department,
    eventType: event.eventType,
    amount: event.eventType === 'ASTHRA_PASS_EVENT' ? 0 : event.amount,
  };

  const eventPart = await api.event.getEventParticipants.query({
    id: event.id,
  });

  const outputData = json2csv(
    eventPart
      .map((e) => ({
        name: e.user?.name,
        email: e.user?.email,
        department: e.user?.department,
        KTU: e.user?.KTU,
        year: e.user?.year,
        college: e.user?.college,
        asthraPass: e.user?.asthraPass,
        status: e.userRegisteredEvent.status,
      }))
      .filter((e) => e.status === 'attended')
  );
  const fileName = eventData?.name?.replace(/[^a-zA-Z0-9]/g, '_') ?? 'unknown';
  const outputCsv = `./script/event/${eventData.eventType}/${fileName}.csv`;

  await Bun.write(outputCsv, outputData);
}
