import { Tailwind } from '@react-email/components';
import '../md.css';
import type { eventZod, transactionsZod, userZod } from '@/lib/validator';
import type { z } from 'zod';

type EventTicket = Partial<z.infer<typeof eventZod>>;
type TransactionCard = Partial<z.infer<typeof transactionsZod>>;
type UserData = Partial<z.infer<typeof userZod>>;

type Props = {
  user: UserData;
  eventName: string | null;
  eventSecret: string | null;
  transactions: TransactionCard;
};

const EventConfirmation = (data: Props) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: '#007291',
            },
          },
        },
      }}
    >
      {JSON.stringify(data)}
    </Tailwind>
  );
};

export default EventConfirmation;
