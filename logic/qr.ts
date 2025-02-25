import { DefinedError } from '@/lib/error';
import { type EventZodType, eventZod } from '@/lib/validator';

type EventType = EventZodType['eventType'];
const checkZod = eventZod.pick({
  id: true,
  eventType: true,
});

export const getQrFromId = (uuid: string, eventType: EventType) => {
  return `${eventType}|${uuid}`;
};

export const getIdFromQr = (qrID: string) => {
  const splited = qrID.split('|');
  if (splited.length !== 2) {
    throw new DefinedError({
      title: 'Invalid QR Data',
      description: 'Try again or make sure you are scanning the correct QR',
    });
  }
  const { success, data } = checkZod.safeParse({
    id: splited[1],
    eventType: splited[0],
  });

  if (!success) {
    throw new DefinedError({
      title: 'Invalid QR Data',
      description: 'Try again or make sure you are scanning the correct QR',
    });
  }

  return data;
};

// example usage
// import { ASTHRA } from '.';
// const qrID = getQRID(ASTHRA.id, 'ASTHRA_PASS');
// console.log(qrID);

// const { id, eventType } = getIDFromQR(qrID);
// console.log(id, eventType);
