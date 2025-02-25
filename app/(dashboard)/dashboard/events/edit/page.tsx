'use client';

import type { AllDepartments } from '@/logic';
import { api } from '@/trpc/react';
import { EventEditPage } from '../_components/edit-event';

export default function Home() {
  const { data } = api.event.getAll.useQuery();

  if (!data) return null;

  const departments = [
    ...new Set(data.map((e) => e.department)),
  ] as AllDepartments[];

  return (
    <>
      <EventEditPage departments={departments} data={data} />
    </>
  );
}
