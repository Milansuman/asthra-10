import { cache } from 'react';
import { type Metadata, type ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// import { auth } from '@/auth.config';
import { allDepartments } from '@/logic';
// import { api } from '@trpc/server';

import { isValidUserDetails } from '@/lib/validator';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// import { CursorContainer } from '@/components/madeup/cursor';
// import { EventTicket } from '@/components/madeup/event-ticket';
// import { PaymentButton } from '@/components/upload/payment-button';
import { api } from '@/trpc/server';

type Props = {
  params: { id: string };
};

// const getEventData = cache(async (id: string) => {
//   const event = await api.event.getSpecific.query({
//     id: id,
//   });
//   return event;
// });

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = params.id;
  // const event = await getEventData(id);
  const previousImages = (await parent).openGraph?.images ?? [];

  if (!event) return {};

  return {
    metadataBase: new URL('https://asthra.sjcetpalai.ac.in/'),
    title: event.name,
    description: event.description,
    category: event.eventType,
    authors: [{ name: event.department === 'NA' ? 'SJCET' : allDepartments[event.department], url: 'https://asthra.sjcetpalai.ac.in/' }],
    openGraph: {
      images: [event?.poster, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: event.name ?? 'Asthra 8.0',
      description: event.description ?? '',
      creator: event.department === 'NA' ? 'SJCET' : `${allDepartments[event.department]} SJCET, Palai`,
      images: {
        url: event.poster,
        alt: `Preview image for ${event.name}`,
        width: 1200,
        height: 630,
      },
    },
  };
}

export default async function Event({ params: { id } }: Props) {
  // const data = await auth();

  return <>
  </>
  // const user = data?.user;
  // const isUserValid = user ? isValidUserDetails(user) : false;

  // // const event = await getEventData(id);

  // const registeredEvents = user ? await api.user.getRegisteredEventList.query() : [];

  // if (!event) {
  //   return (
  //     <div className="w-screen h-screen flex flex-col justify-center items-center">
  //       <h2>This event does not exist!</h2>
  //       <CursorContainer varient="link">
  //         <Link href="/events">
  //           <Button>Choose another event</Button>
  //         </Link>
  //       </CursorContainer>
  //     </div>
  //   );
  // }

  // // diplay the event with nice ui
  // return (
  //   <div className="mt-14 w-full min-h-screen flex flex-col gap-4">
  //     <div className="flex flex-col gap-4 md:p-16">
  //       <div className="flex flex-col gap-4 md:flex-row md:m-auto w-full">
  //         <div className="border border-neutral-500/75 bg-black grid grid-cols-1 xl:grid-cols-2 rounded-md p-5 gap-4">
  //           <Image src={event.poster} width={400} height={400} alt={event.name!} className="aspect-square rounded-md w-full"  />
  //           <div className="flex flex-col gap-4 w-full">
  //             <h2 className="text-3xl p-0">{event.name}</h2>
  //             <Badge className="w-fit cal">Created by {event.department === 'NA' ? 'SJCET' : allDepartments[event.department]}</Badge>
  //             <p className="text-neutral-500 break-words">{event.description}</p>
  //             <div className="flex mt-auto w-fit">
  //               {event.eventStatus !== 'cancel' && (
  //                 <PaymentButton event={event} registeredEvents={registeredEvents} user={user} isUserValid={isUserValid} />
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //         <EventTicket event={event} />
  //       </div>
  //       <div className="p-5 border max-w-fit border-neutral-500/75 bg-black rounded-md flex items-center  flex-col">
  //         <div>
  //           <h2 className="text-3xl p-0">FAQ: How is the registration works?</h2>
  //           <p className="text-neutral-500">
  //             Payment mode of event depends on category. Some events are free with ASTHRA PASS, but required to register.
  //             <br />
  //             Sjcetians Don&apos;t need to buy ASTHRA PASS all Technical events are free for them, but WORKSHOP PASS should be purchased.
  //             <br />
  //             Sjcetians are not allowed to compete in any competitions.
  //             <br />
  //             <span className="font-bold text-lg text-neutral-300">
  //               Under any circumstances, If you buy any pass it won&apos;t be refunded.
  //             </span>
  //             <br />
  //             Before everything, you need to complete the{' '}
  //             <Link href={'/profile'} className="font-bold text-neutral-200">
  //               profile
  //             </Link>
  //             . Make sure to complete the transaction without closing the page
  //             <br />
  //             And finally you have to identify yourself once again to complete the transaction.
  //           </p>
  //         </div>
  //         <Image src={'/assets/payment_tutorial.svg'} alt=" " height={300} width={1000} className="h-auto my-10 w-full max-w-xl" />
  //       </div>
  //     </div>
  //     <Link href={`/events?department=${event.department}`}>
  //       <Button>More events from {event.department === 'NA' ? 'SJCET' : allDepartments[event.department]}</Button>
  //     </Link>
  //   </div>
  // );
}
