import type { AllDepartments } from '@/logic';
import { api } from '@/trpc/server';
import { EventEditPage } from '../_components/edit-event';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await api.event.getLatest();
  const departments = [
    ...new Set(data.map((e) => e.department)),
  ] as AllDepartments[];
  console.log(data);
  return (
    <>
      <EventEditPage departments={departments} data={data} />
    </>
  );
}
