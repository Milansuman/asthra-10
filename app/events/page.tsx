// 'use client'
import { EventPage } from '@/components/madeup/events-page';
import { SplineViewer } from '@/components/madeup/spline-viewer';
import { eventZod } from '@/lib/validator';
import { Button } from '@heroui/button';
import Link from 'next/link';
import { z } from 'zod';

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
export default async function Page({ searchParams }: { searchParams?: { [key in keyof FilterQueries]: string | string[] | undefined } }) {

  // const events = await api.event.getLatest.query();
  const demoEvents: z.infer<typeof eventZod>[] = [
    {
      id: '1',
      name: 'Event 1',
      description: 'Description for Event 1',
      secret: 'Secret 1',
      poster: 'https://tricera.cubes.host/v1/storage/buckets/nk25-site-cdn/files/67b34203003942c5a5af/view?project=nakshatra-25&project=nakshatra-25&mode=admin',
      createdAt: new Date('2025-02-20T00:00:00.000Z'),
      updatedAt: null,
      createdById: 'user-1',
      department: 'NA',
      venue: 'Venue 1',
      dateTimeStarts: new Date('2025-03-06T03:30:00.000Z'),
      dateTimeEnd: 'ALL DAY',
      eventStatus: 'uploaded',
      eventType: 'ASTHRA_PASS_EVENT',
      amount: 0,
      registrationType: 'both',
      regLimit: 10,
      regCount: 0,
    },
    {
      id: '2',
      name: 'Event 2',
      description: 'Description for Event 2',
      secret: 'Secret 2',
      poster: 'https://tricera.cubes.host/v1/storage/buckets/nk25-site-cdn/files/67b34203003942c5a5af/view?project=nakshatra-25&project=nakshatra-25&mode=admin',
      createdAt: new Date('2025-02-21T00:00:00.000Z'),
      updatedAt: null,
      createdById: 'user-2',
      department: 'CS',
      venue: 'Venue 2',
      dateTimeStarts: new Date('2025-03-07T03:30:00.000Z'),
      dateTimeEnd: 'ALL DAY',
      eventStatus: 'approved',
      eventType: 'WORKSHOP',
      amount: 100,
      registrationType: 'online',
      regLimit: 50,
      regCount: 10,
    },
    // Add more events as needed
  ];
  // const events = await api.event.getLatest.query();
  const events = demoEvents
  // console.log(events)


  if (events.length === 0) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h2>No Events Found!</h2>
        <p className="mb-2">Check back later</p>
        {/* <CursorContainer varient="link"> */}
        <Link href="/home">
          <Button>Go Home</Button>
        </Link>
        {/* </CursorContainer> */}
      </div>
    );
  }

  const additionalCategories = ['GENERAL'];

  const approvedEvents = events.filter((event) => event.eventStatus === 'approved');
  // const cancel = events.filter((event) => event.eventStatus === "cancel")

  const departments = [...new Set(events.map((event) => event.department))];
  const filterDepartment = searchParams?.department as string;
  const eventStatus = searchParams?.status as string;
  const eventCategory = searchParams?.category as string;
  ;
  if (departments.includes('NA') && events.filter((event) => event.registrationType === 'spot').length > 0) {
    additionalCategories.push('INFORMAL');
  }

  if (events.filter((event) => event.eventStatus === 'cancel').length > 0) {
    additionalCategories.push('CANCELLED');
  }

  const categories = ['ALL'].concat(
    [...new Set(events.map((event) => event.eventType as string))].concat(additionalCategories).filter((et) => et !== 'ASTHRA_PASS'),
  );
  return (
    <>
      {/* <SplineViewer
              url="https://prod.spline.design/2GLk35LgytPBcf1w/scene.splinecode"
              className="fixed w-screen h-screen -z-10"
            /> */}
      <EventPage
        events={events}
        categories={categories}
        departments={departments}
        // events={approvedEvents}
        filterDepartment={filterDepartment ?? 'all'}
        eventStatus={eventStatus ?? 'all'}
        filterCategory={eventCategory ?? 'ALL'}
        dashboard={false}
      />

    </>
  );
}
