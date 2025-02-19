'use client';
import { AddNewCard, AsthraCard } from '@/components/madeup/card';
// import { TabSwitcher } from '@/components/madeup/tab-switcher';
import { useState } from 'react';
import type { z } from 'zod';

import type { eventZod } from '@/lib/validator';
import type { allDepartments } from '@/logic';

type Department = keyof typeof allDepartments;

type Props = {
  data: z.infer<typeof eventZod>[];
  departments: Department[];
};

export function EventEditPage({ data, departments }: Props) {
  const [filter, setFilter] = useState(departments[0]);
  return (
    <div className="flex flex-col gap-5 p-10">
      {/* <TabSwitcher
        keys={departments as string[]}
        filter={filter!}
        setFilter={setFilter}
        className="mx-auto"
      /> */}
      <h4>Edit Events</h4>
      <div className="flex flex-row gap-3">
        <AddNewCard/>
        {
          data.map(event => (
            <AsthraCard key={event.id} data={event}/>
          ))
        }
      </div>
    </div>
  );
}

export const EditEvent = () => {
  return <div>EditEvent</div>;
};

export const DeleteEvent = () => {
  return <div>DeleteEvent</div>;
};
