import { api } from './vanila';
import type {
  UserZodType,
  EventZodType,
  UserRegisteredEventZod,
  TransactionZodType,
} from '@/lib/validator';

export const data: {
  user: UserZodType;
  event: EventZodType;
  userRegisteredEvent: UserRegisteredEventZod;
  transactions: TransactionZodType;
} = {
  event: {
    id: 'c509deee-cf79-42f9-ad4e-7b47b85263e0',
    name: 'CipheriX GRAND CHALLENGE',
    description: 'Good challenge',
    secret: `secret message
*hey world*`,
    poster:
      'https://res.cloudinary.com/db2u2juse/image/upload/v1740819840/9/elysium_vcxhu9.webp',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdById: 'c509deee-cf79-42f9-ad4e-7b47b85263e0',
    department: 'mba',
    venue: 'SJCET',
    dateTimeStarts: new Date(),
    dateTimeEnd: 'ALL DAY',
    eventStatus: 'uploaded',
    eventType: 'ASTHRA_PASS_EVENT',
    amount: 0,
    registrationType: 'both',
    regLimit: 70,
    regCount: 0,
  },
  user: {
    id: 'c509deee-cf79-42f9-ad4e-7b47b85263e0',
    name: 'Aravind Manoj',
    email: 'aravindmanoj2027@cy.sjcetpalai.ac.in',
    image: 'imagelink',
    number: '+918921964557',
    KTU: 'adasd',
    role: 'USER',
    department: 'ce',
    year: '2025',
    college: 'asd',
    emailVerified: new Date(),
    asthraCredit: 123,
    asthraPass: true,
    transactionId: 'asd',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  transactions: {
    id: 'c509deee-cf79-42f9-ad4e-7b47b85263e0',
    amount: 200,
    status: 'success',
    orderId: 'c509deee-cf79-42f9-ad4e-7b47b85263e0',
    userName: 'aravindmanoj',
    userId: 'c509deee-cf79-42f9-ad4e-7b47b85263e0',
    eventId: 'c509deee-cf79-42f9-ad4e-7b47b85263e0',
    eventName: 'ECU Tuning',
    remark: 'adasd',
  },
  userRegisteredEvent: {
    status: 'registered',
    transactionId: 'c509deee-cf79-42f9-ad4e-7b47b85263e0',
    userId: 'c509deee-cf79-42f9-ad4e-7b47b85263e0',
    eventId: 'c509deee-cf79-42f9-ad4e-7b47b85263e0',
    remark: 'asdasd',
    registrationId: 'c509deee-cf79-42f9-ad4e-7b47b85263e0',
  },
};

await api.mail.asthraPass.query({
  // asthraPass: true,
  // email: '',
  // name: '',
  to: 'aravindmng47@gmail.com',
  user: data.user,
  // event: data.event,
  userRegisteredEvent: data.userRegisteredEvent,
  transactions: data.transactions,
});

console.log('done');
