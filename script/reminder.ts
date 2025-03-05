import { api } from '@/trpc/vanila';
import Mail from '@/server/api/routers/mail';
import type { UserZodType } from '@/lib/validator';
import { triedAsync } from '@/lib/utils';

// await Mail.Reminder({
//   user: user as UserZodType,
//   data,
// });

const allUSer = await api.management.getUsers.query();
console.log('Total users:', allUSer.length);

let count = 0;
let successCount = 0;
let failedCount = 0;

for (const user of allUSer) {
  const { isSuccess, data: fetchedData } = await triedAsync(
    api.management.getRegisteredEventListofUser.query({
      id: user.id,
    })
  );

  if (isSuccess) {
    const { data: eventsData } = fetchedData;
    await Mail.Reminder({
      user: user as UserZodType,
      data: eventsData,
    });

    console.log(count, user.email, eventsData.length);
    successCount++;
  } else {
    await Mail.Reminder({
      user: user as UserZodType,
      data: [],
    });
    console.warn(count, user.email);
    failedCount++;
  }
  count++;
}

console.log('Total:', count, 'Success:', successCount, 'Failed:', failedCount);
