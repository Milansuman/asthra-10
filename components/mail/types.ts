import type {
  UserZodType,
  EventZodType,
  UserRegisteredEventZod,
  TransactionZodType,
} from '@/lib/validator';

export type WelcomeEmailProps = {
  personName: string;
};

export type AsthraPassProps = {
  user: UserZodType;
  userRegisteredEvent: UserRegisteredEventZod;
  transactions: TransactionZodType;
};

export type CertificateReadyProps = {
  personName: string;
};

export type PaymentConfirmationProps = {
  user: UserZodType;
  event: EventZodType;
  userRegisteredEvent: UserRegisteredEventZod;
  transactions: TransactionZodType;
};

export type EventConfirmationProps = {
  user: UserZodType;
  event: EventZodType;
};
