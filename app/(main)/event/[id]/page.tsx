import type { Metadata, ResolvingMetadata } from 'next';
import { cache as reactCache } from 'react';


import { allDepartments } from '@/logic';
import { api } from '@/trpc/server';
import { EventParent } from '../_components/event';

type Props = {
  params: Promise<{ id: string }>;
};

const getEventData = reactCache(async (id: string) => {
  const event = await api.event.getSpecificCached({
    id: id,
  });
  return event;
});

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = (await params).id;
  const { data: event, error, isSuccess } = await getEventData(id);

  const previousImages = (await parent).openGraph?.images ?? [];

  if (!isSuccess || !event) {
    console.error(error);
    return {}
  };

  const department = event.department === 'NA' ? "General SJCET Events" : allDepartments[event.department as keyof typeof allDepartments];

  return {
    metadataBase: new URL('https://asthra.sjcetpalai.ac.in/'),
    title: event.name,
    description: event.description,
    category: event.eventType,
    authors: [{ name: department, url: 'https://asthra.sjcetpalai.ac.in/' }],
    openGraph: {
      images: [event.poster, ...previousImages],
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

  console.log('id', id);

  return <EventParent id={id} />
}