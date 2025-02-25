import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cache as reactCache } from 'react';

import { PaymentButton } from '@/app/_components/pay';
import { ShareButton } from '@/app/_components/share';
import Plusbox from '@/components/madeup/box';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { allDepartments, ASTHRA } from '@/logic';
import { cache } from '@/server/cache';
import { api } from '@/trpc/server';
import { ExternalLinkIcon } from 'lucide-react';

type Props = {
  params: Promise<{ id: string }>;
};

const getEventData = reactCache(async (id: string) => {
  const event = await api.event.getSpecific({
    id: id,
  });
  return event;
});

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = (await params).id;
  const { data: event, error, isSuccess } = await cache.run(`event:${id}`, () => getEventData(id));
  const previousImages = (await parent).openGraph?.images ?? [];

  if (!isSuccess || !event) {
    console.error(error);
    return {}
  };

  const department = event.department === 'NA' ? "" : allDepartments[event.department as keyof typeof allDepartments];

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
  const event = await getEventData(id);

  if (!event) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h2>This event does not exist!</h2>
        <Link href="/events">
          <Button variant={"glass"} size={"glass"}>Choose another event</Button>
        </Link>
      </div>
    );
  }

  const department = event.department === 'NA' ? "SJCET" : allDepartments[event.department as keyof typeof allDepartments];

  return (
    <div className="min-h-screen flex flex-col justify-center gap-4">
      <div className="flex flex-col md:flex-row gap-4 container items-start py-4">
        <Plusbox className="flex-1 p-2">
          <Image src={event.poster} width={400} height={500} alt={event.name ?? ""} className="w-full h-auto" />
        </Plusbox>
        <div className='flex-1 flex flex-col gap-4'>
          <Card className='relative'>
            <ShareButton />
            <CardHeader>
              <Badge variant={"glass"} className="w-fit relative text-black">
                Created by {department}
                <div className="bg-glass-top absolute top-0 left-0 right-0 h-full" />
              </Badge>
              <CardTitle>
                {event.name ?? "Event"}
              </CardTitle>
              <CardDescription>
                {event.description}
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-row gap-5 flex-wrap font-bold capitalize'>
              <div className='relative bg-glass py-2 px-4 border-glass border'>
                <p className='opacity-70 text-sm font-normal'>Venue</p>
                {event.venue}
              </div>

              <div className='relative bg-glass py-2 px-4 border-glass border'>
                <p className='opacity-70 text-sm font-normal'>Registration Type</p>
                {event.registrationType === 'both' ? 'Both Spot & Online' : `${event.registrationType} only`}
              </div>

              <div className='relative bg-glass py-2 px-4 border-glass border'>
                <p className='opacity-70 text-sm font-normal'>Registration Limit</p>
                approx. {event.regLimit} Seats
              </div>

              {event.dateTimeStarts && (
                <div className='relative bg-glass py-2 px-4 border-glass border'>
                  <p className='opacity-70 text-sm font-normal'>Event starts at</p>
                  {event.dateTimeStarts.toLocaleTimeString()}
                </div>
              )}

              <div className='relative bg-glass py-2 px-4 border-glass border'>
                <p className='opacity-70 text-sm font-normal'>Duration of event</p>
                {event.dateTimeEnd}
              </div>

              <div className='relative bg-glass py-2 px-4 border-glass border'>
                <p className='opacity-70 text-sm font-normal'>{event.eventType === "ASTHRA_PASS_EVENT" ? "Credit Required" : "Fee"}</p>
                {event.eventType === "ASTHRA_PASS_EVENT" ? "" : "₹"}{!event.amount || event.amount === 0 ? 'FREE' : `${event.amount}`}
              </div>

              {event.eventType === "ASTHRA_PASS" && (<div className='relative bg-glass py-2 px-4 border-glass border'>
                <p className='opacity-70 text-sm font-normal'>Credits</p>
                {ASTHRA.credit}
              </div>)}

            </CardContent>
            <CardFooter className='justify-between gap-4'>
              <PaymentButton event={event} />
            </CardFooter>
          </Card>

          <Button variant={"glass"} link={`/events?department=${event.department}`}>
            Show more events from {department}
            <ExternalLinkIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}