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

type FilterQueries = {
  department: string;
  status: string;
  category: string;
};

type Event = z.infer<typeof eventZod>;
export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading events...</p>
          </div>
        </div>
      }>
        <EventContent />
      </Suspense>
    </div>
  );
}

function EventContent() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const eventsQuery = api.event.getAll.useQuery()

  useEffect(() => {
    (async () => {
      const { data } = await eventsQuery.refetch();
      setEvents((data ?? []) as unknown[] as Event[]);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">No Events Found</h2>
          <p className="text-slate-600 mb-6">Check back later for upcoming events</p>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
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

  additionalCategories.push("OTHER");

  const categories: string[] = ['ALL'].concat(
    [...new Set(events.map((event) => event.eventType as string))]
      .concat(additionalCategories)
      .filter((et) => et !== 'ASTHRA_PASS')
  );

  return (
    <div className="flex flex-col space-y-6 flex-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Events Management</h1>
          <p className="text-slate-600 mt-1">Manage and monitor all technical fest events</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-1 overflow-hidden">
        <EventPage
          categories={categories}
          departments={departments}
          events={approvedEvents}
          filterDepartment={filterDepartment}
          eventStatus={eventStatus}
          filterCategory={eventCategory}
          dashboard={true}
        />
      </div>
    </div>
  );
}
