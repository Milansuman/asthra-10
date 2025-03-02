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
    name: 'CipherX',
    description: 'Good challenge',
    secret: `## Here is your secret message
- Do something

*test*

**hello**

\`asdasd\`

\`\`\`
123123sadsa
\`\`\`

> asdsadasd

~~strikethrough~~

[Download](https://asthra.sjcetpalai.ac.in/images/asthra-glass.png)

![alt](https://asthra.sjcetpalai.ac.in/images/asthra-glass.png)
`,
    poster: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdById: 'c509deee-cf79-42f9-ad4e-7b47b85263e0',
    department: 'NA',
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
    number: 'adasd',
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
    amount: 0,
    status: 'success',
    orderId: 'c509deee-cf79-42f9-ad4e-7b47b85263e0',
    userName: 'aravindmanoj',
    userId: 'c509deee-cf79-42f9-ad4e-7b47b85263e0',
    eventId: 'c509deee-cf79-42f9-ad4e-7b47b85263e0',
    eventName: 'adasd',
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

await api.mail.purchased.query({
  // asthraPass: true,
  // email: '',
  // name: '',
  to: 'aravindmng47@gmail.com',
  user: data.user,
  event: data.event,
  userRegisteredEvent: data.userRegisteredEvent,
  transactions: data.transactions,
});

console.log('done');
