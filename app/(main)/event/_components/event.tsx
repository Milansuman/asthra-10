'use client';

import Image from 'next/image';

import type { z } from 'zod';


import type { eventZod } from '@/lib/validator';



export type EventTicketProps = Partial<z.infer<typeof eventZod>>;

export function ApprovalTicket({ event }: { event: EventTicketProps }) {
    return (

        <div className="bg-neutral-100 rounded-md p-5 w-80  m-7 ">
            <div className="text-neutral-900 w-full flex flex-col pb-6 border-b-2 border-dotted">
                <Image src="/assets/asthra_logo_black.svg" width={100} height={100} alt="logo" />
                <h2 className="text-neutral-900 mt-6 w-2/3 text-4xl">{event.name}</h2>
                <div>
                    <p>Event Name</p>
                    <p className="uppercase text-neutral-900 text-lg">{event?.venue}</p>
                </div>
            </div>
        </div>

    );
}

export function EventTicket({ event }: { event: EventTicketProps }) {
    return (
        <div className="bg-neutral-100 rounded-md p-5 min-w-80 m-7 ">
            <div className="text-neutral-900 w-full flex flex-col pb-6 border-b-2 border-dotted">
                <Image src="/assets/asthra_logo_black.svg" width={100} height={100} alt="logo" />
                <h2 className="text-neutral-900 mt-6 w-2/3 text-4xl">{event.name}</h2>
                <div>
                    <p>Venue</p>
                    <p className="uppercase text-neutral-900 text-lg">{event?.venue}</p>
                </div>
                {event?.dateTimeStarts && (
                    <div>
                        <p>Event starts at</p>
                        <p className="uppercase text-neutral-900 text-lg">{event?.dateTimeStarts.toLocaleTimeString()}</p>
                    </div>
                )}
                <div>
                    <p>Duration of event</p>
                    <p className="uppercase text-neutral-900 text-lg">{event?.dateTimeEnd}</p>
                </div>
            </div>
            <div className="text-neutral-900 w-full flex flex-row justify-between pt-12 items-end">
                <div>
                    <p>Amount</p>
                    <h3 className="text-neutral-900">{!event.amount || event.amount === 0 ? 'FREE' : '₹' + event.amount}</h3>
                </div>
            </div>
        </div>
    );
}