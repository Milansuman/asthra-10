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
    <div className=" mx-auto py-28">
      {/* <TabSwitcher
        keys={departments as string[]}
        filter={filter!}
        setFilter={setFilter}
        className="mx-auto"
      /> */}
      <div className="mx-auto">
        <div className="py-10 grid lg:grid-cols-5 grid-cols-1 md:grid-cols-3 gap-5 p-4">
          <AddNewCard />
          {data
            .filter((e) => e.department === filter)
            .map((e) => (
              <AsthraCard key={e.id} data={e} />
            ))}
        </div>
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
