'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';

import { api } from '@/trpc/react';
import { eventZod } from '@/lib/validator';
import { z } from 'zod';

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

type Event = z.infer<typeof eventZod>;
export default function Page() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventContent />
    </Suspense>
  );
}

function EventContent() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const eventsQuery = api.event.getLatest.useQuery()

  useEffect(() => {
    (async () => {
      const { data } = await eventsQuery.refetch();
      setEvents((data ?? []) as unknown[] as Event[]);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div className='h-screen w-screen flex justify-center items-center font-bold text-white'>
      Loading...
    </div>;
  }

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

  const additionalCategories: string[] = ['GENERAL'];

  const approvedEvents = events.filter(
    (event) => event.eventStatus === 'approved'
  );

  const departments: string[] = [...new Set(events.map((event) => event.department))];
  const filterDepartment = searchParams.get('department') || 'all';
  const eventStatus = searchParams.get('status') || 'all';
  const eventCategory = searchParams.get('category') || 'ALL';

  if (
    departments.includes('NA') &&
    events.filter((event) => event.registrationType === 'spot').length > 0
  ) {
    additionalCategories.push('INFORMAL');
  }

  if (events.filter((event) => event.eventStatus === 'cancel').length > 0) {
    additionalCategories.push('CANCELLED');
  }

  const categories: string[] = ['ALL'].concat(
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
        filterDepartment={filterDepartment}
        eventStatus={eventStatus}
        filterCategory={eventCategory}
        dashboard={true}
      />
    </>
  );
}
