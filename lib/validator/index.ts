import type { AllRoles } from '@/logic';
import {
  eventsTable,
  roleEnum,
  transactionsTable,
  user,
  userRegisteredEventTable,
} from '@/server/db/schema';
import { createSelectSchema } from 'drizzle-zod';
import type { User } from 'next-auth';
import { type ZodEnum, z } from 'zod';

const roleEnumZod = createSelectSchema(roleEnum) as unknown as ZodEnum<
  [AllRoles]
>;

export const eventZod = createSelectSchema(eventsTable);
export const eventAccessZod = eventZod
  .omit({
    createdAt: true,
    createdById: true,
    id: true,
    regCount: true,
    regLimit: true,
    updatedAt: true,
    secret: true,
  })
  .merge(
    z.object({
      poster: z.string().optional(),
    })
  );

export const eventEditAccessZod = eventZod
  .omit({
    regCount: true,
    createdAt: true,
    createdById: true,
    id: true,
    updatedAt: true,
  })
  .merge(
    z.object({
      poster: z.string().optional(),
    })
  );
export const eventAccessAfterLastDate = eventAccessZod.omit({
  amount: true,
  dateTimeEnd: true,
  dateTimeStarts: true,
  // regLimit: true,
  eventType: true,
});

export type EventType = z.infer<typeof eventZod>['eventType'];

export const userZod = createSelectSchema(user)
  .omit({
    role: true,
  })
  .merge(
    z.object({
      role: roleEnumZod,
    })
  );
export const userAccessZod = userZod.omit({
  createdAt: true,
  id: true,
  emailVerified: true,
  email: true,
  role: true,
  updatedAt: true,
  transactionId: true,
  asthraPass: true,
  image: true,
});
export const userRegisteredEventZod = createSelectSchema(
  userRegisteredEventTable
);
export const transactionsZod = createSelectSchema(transactionsTable);

export const userCreateMailZod = z.object({
  templateName: z.enum(['invitation']),
  data: z.object({
    toMail: z.string(),
    personName: z.string(),
  }),
});

export const generatePassMailZod = z.object({
  templateName: z.enum(['asthraPass']),
  data: z.object({
    toMail: z.string(),
    eventId: z.string(),
    eventName: z.string(),
    personName: z.string(),
  }),
});
export const userDataFillZod = userZod.refine((user) => {
  if (user.college === null || user.name === null || user.number === null) {
    // || user.image === null
    return {
      message: 'fields cannot be null',
    };
  }
  return true;
});

export const isValidUserDetails = (
  user: User | undefined | z.infer<typeof userZod>
) => userDataFillZod.safeParse(user).success;

export const verifyPassZod = z.object({
  id: z.string(),
});

export const eventMailZod = eventZod.omit({
  createdAt: true,
  createdById: true,
  id: true,
  regCount: true,
  regLimit: true,
  updatedAt: true,
  eventStatus: true,
});

export const userMailZod = userZod.omit({
  id: true,
  emailVerified: true,
  role: true,
  transactionId: true,
  asthraCredit: true,
});

export const transactionsMailZod = transactionsZod.omit({
  id: true,
  userId: true,
  userName: true,
  eventId: true,
  eventName: true,
});

export const EventConfirmationZod = z.object({
  templateName: z.string(),
  data: z.object({
    user: userZod,
    event: eventZod,
    transactions: transactionsZod,
  }),
});

export type UserZodType = z.infer<typeof userZod>;

export type EntireZodType = {
  user: UserZodType;
  event: z.infer<typeof eventZod>;
  transactions: z.infer<typeof transactionsZod>;
};
