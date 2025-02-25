import { cache } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { allDepartments } from '@/logic';
import { api } from '@/trpc/server';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PaymentButton } from '@/app/_components/pay';
import { EventTicket } from '../_components/event';

type Props = {
  params: Promise<{ id: string }>;
};

const getEventData = cache(async (id: string) => {
  const event = await api.event.getSpecific({
    id: id,
  });
  return event;
});

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = (await params).id;
  const event = await getEventData(id);
  const previousImages = (await parent).openGraph?.images ?? [];

  if (!event) return {};

  const department = event.department === 'NA' ? "" : allDepartments[event.department as keyof typeof allDepartments];

  return {
    metadataBase: new URL('https://asthra.sjcetpalai.ac.in/'),
    title: event.name,
    description: event.description,
    category: event.eventType,
    authors: [{ name: department, url: 'https://asthra.sjcetpalai.ac.in/' }],
    openGraph: {
      images: [event?.poster, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: event.name ?? 'Asthra 8.0',
      description: event.description ?? '',
      creator: `${department} SJCET, Palai`,
      images: {
        url: event.poster,
        alt: `Preview image for ${event.name}`,
        width: 1200,
        height: 630,
      },
    },
  };
}

export default async function Event({ params }: Props) {
  const { id } = await params;
  const event = await getEventData(id);

  if (!event) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h2>This event does not exist!</h2>
        <Link href="/events">
          <Button>Choose another event</Button>
        </Link>
      </div>
    );
  }

  const department = event.department === 'NA' ? "" : allDepartments[event.department as keyof typeof allDepartments];

  // diplay the event with nice ui
  return (
    <div className="mt-14 w-full min-h-screen flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:p-16">
        <div className="flex flex-col gap-4 md:flex-row md:m-auto w-full">
          <div className="border border-neutral-500/75 bg-black grid grid-cols-1 xl:grid-cols-2 rounded-md p-5 gap-4">
            <Image src={event.poster} width={400} height={400} alt={event.name ?? ""} className="aspect-square rounded-md w-full" />
            <div className="flex flex-col gap-4 w-full">
              <h2 className="text-3xl p-0">{event.name}</h2>
              <Badge className="w-fit cal">Created by {department}</Badge>
              <p className="text-neutral-500 break-words">{event.description}</p>
              <div className="flex mt-auto w-fit">
                <PaymentButton event={event} />
              </div>
            </div>
          </div>
          <EventTicket event={event} />
        </div>
      </div>
      <Link href={`/events?department=${event.department}`}>
        <Button>More events from {department}</Button>
      </Link>
    </div>
  );
}