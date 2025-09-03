import { ASTHRA } from '@/logic';
import { api } from '@/trpc/vanila';
import { sentMail } from '@/lib/mail';
import { triedAsync } from '@/lib/utils';

// const { isSuccess } = await triedAsync(
//   sentMail({
//     to: 'rajatsandeepsen1839@gmail.com',
//     subject: 'Mark your attendance -  ASTHRA 10',
//     text: "We noticed that you haven't attended ASTHRA with your pass. It is time for the event. Please join us and mark your attendance. Attendence is mandatory to get the certificate. Just came to SJCET ASTHRA front desk and show your Pass. We are waiting for you.\n\n Link: https://asthra.sjcetpalai.ac.in/profile",
//   })
// );

// await Mail.Reminder({
//   user: user as UserZodType,
//   data,
// });

const allUSer = await api.management.getUsers.query();
console.log('Total users:', allUSer.length);

let count = 0;
let attended = 0;
let registered = 0;

for (const user of allUSer) {
  const { isSuccess, data: isAttented } = await triedAsync(
    api.management.isAttendedAny.query({
      id: user.id,
    })
  );

  if (isAttented && isAttented.length > 0) {
    sentMail({
      to: user.email,
      subject: 'Certificate Ready -  ASTHRA 10',
      text: 'Thank you for registering & attending ASTHRA 10. We appreciate your active participation. Also your certificate is ready. Please download from your profile. \n\n Link: https://asthra.sjcetpalai.ac.in/profile',
    });

    console.log('Attended:', user.email);
    registered++;
  } else {
    console.log('Not attended any:', user.email);
  }

  count++;

  // if (user.asthraPass === true) {
  //   const isAttented = await api.user.getAttendence.query({
  //     userId: user.id,
  //     eventId: ASTHRA.id,
  //   });

  //   if (isAttented?.status === 'attended') {
  //     console.log('Attended:', user.email);
  //     console.log(registered, user.email, 'Attended');
  //     attended++;
  //   } else {
  //     const { isSuccess } = await triedAsync(
  //       sentMail({
  //         to: user.email,
  //         subject: 'Certificate Ready -  ASTHRA 10',
  //         text: "We noticed that you haven't attended ASTHRA with your pass. It is time for the event. Please join us and mark your attendance. Attendence is mandatory to get the certificate. Just came to SJCET ASTHRA front desk and show your Pass. We are waiting for you.\n\n Link: https://asthra.sjcetpalai.ac.in/profile",
  //       })
  //     );
  //     console.log(
  //       registered,
  //       user.email,
  //       'Not attended',
  //       isSuccess ? 'Mail sent' : 'Mail failed'
  //     );
  //   }

  //   registered++;
  // }
  // count++;
}

console.log('Total users:', count);
console.log('Total registered:', registered);
console.log('Total attended:', attended);
