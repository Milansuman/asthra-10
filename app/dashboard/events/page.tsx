import Link from 'next/link';

import { api } from '@/trpc/server';

import { Button } from '@/components/ui/button';
import { EventPage } from '../_components/event-page';

export interface Main {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const dynamic = 'force-dynamic';

type FilterQueries = {
  department: string;
  status: string;
  category: string;
};

// export default function Page({ searchParams, }: {
//   searchParams?: { [key in keyof FilterQueries]: string | string[] | undefined };
// }) {
export default async function Page({
  searchParams: sParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | FilterQueries | undefined;
  }>;
}) {
  // we can use this for filtering the events eg: /events?asthraEvents=true
  // console.log(searchParams?.asthraEvents)

  const events = await api.event.getLatest();
  const searchParams = await sParams;

  // console.log(events)

  // need ui for this
  if (events.length === 0) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <h2>No Events Found!</h2>
        <p className="mb-2">Check back later</p>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    );
  }

  const additionalCategories = ['GENERAL'];

  const approvedEvents = events.filter(
    (event) => event.eventStatus === 'approved'
  );
  // const cancel = events.filter((event) => event.eventStatus === "cancel")

  const departments = [...new Set(events.map((event) => event.department))];
  const filterDepartment = searchParams?.department as string;
  const eventStatus = searchParams?.status as string;
  const eventCategory = searchParams?.category as string;

  if (
    departments.includes('NA') &&
    events.filter((event) => event.registrationType === 'spot').length > 0
  ) {
    additionalCategories.push('INFORMAL');
  }

  if (events.filter((event) => event.eventStatus === 'cancel').length > 0) {
    additionalCategories.push('CANCELLED');
  }

  const categories = ['ALL'].concat(
    [...new Set(events.map((event) => event.eventType as string))]
      .concat(additionalCategories)
      .filter((et) => et !== 'ASTHRA_PASS')
  );
  return (
    <>
      <EventPage
        categories={categories}
        departments={departments}
        events={approvedEvents}
        filterDepartment={filterDepartment ?? 'all'}
        eventStatus={eventStatus ?? 'all'}
        filterCategory={eventCategory ?? 'ALL'}
        dashboard={true}
      />
    </>
  );
}
