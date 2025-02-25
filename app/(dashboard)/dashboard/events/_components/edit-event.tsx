'use client';
import { AddNewCard, AsthraCard } from '@/components/madeup/card';
// import { TabSwitcher } from '@/components/madeup/tab-switcher';
import { useState } from 'react';
import type { z } from 'zod';

import type { eventZod } from '@/lib/validator';
import type { allDepartments } from '@/logic';

import { api } from '@/trpc/react';

type Department = keyof typeof allDepartments;

type Props = {
  data: z.infer<typeof eventZod>[];
  departments: Department[];
};

export function EventEditPage({ data, departments }: Props) {
  const deleteEventMutation = api.event.deleteEvent.useMutation();
  const latestEventsQuery = api.event.getLatest.useQuery();
  const [localData, setLocalData] = useState(data);
  const [filter, setFilter] = useState(departments[0]);

  const onDelete = (id: string) => {
    deleteEventMutation.mutate({ id }, {
      onSuccess: (data) => {
        if (!data) return;
        setLocalData(prevData => prevData.filter(event => event.id !== data[0]?.deletedId))
      }
    })
  }

  const onChangeEvent = async () => {
    const data = await latestEventsQuery.refetch()
    setLocalData(latestEventsQuery.data ?? []);
  }

  return (
    <div className="flex flex-col gap-5 p-10 h-screen">
      {/* <TabSwitcher
        keys={departments as string[]}
        filter={filter!}
        setFilter={setFilter}
        className="mx-auto"
      /> */}
      <h4>Edit Events</h4>
      <div className="flex flex-row gap-3 flex-wrap">
        <AddNewCard onChangeEvent={onChangeEvent} />
        {
          localData.map(event => (
            <AsthraCard key={event.id} data={event} onDelete={onDelete} onChangeEvent={onChangeEvent} />
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
