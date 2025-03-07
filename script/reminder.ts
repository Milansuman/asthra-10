import { ASTHRA } from '@/logic';
import { api } from '@/trpc/vanila';

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
  if (user.asthraPass === true) {
    const isAttented = await api.user.getAttendence.query({
      userId: user.id,
      eventId: ASTHRA.id,
    });

    if (isAttented) {
      console.log('Attended:', user.email);
      console.log(registered, user.email, 'Attended');
      attended++;
    } else {
      console.log(registered, user.email, 'Not attended');
    }

    registered++;
  }
  count++;
}

console.log('Total users:', count);
console.log('Total registered:', registered);
console.log('Total attended:', attended);
