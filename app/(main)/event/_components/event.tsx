'use client';

import Image from 'next/image';

import type { inferRouterOutputs } from '@trpc/server';
import { ASTHRA } from '@/logic';
import { X } from 'lucide-react';
import type { User } from 'next-auth';
import QRCode from 'react-qr-code';
import type { z } from 'zod';

import type { AppRouter } from '@/server/api/root';

import type { eventZod } from '@/lib/validator';

import { AlertDialogCancel } from '@/components/ui/alert-dialog';


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

export function RegistrationSummery({
    reg,
    ASTHRA_PASS_EVENT,
    user,
}: {
    reg: inferRouterOutputs<AppRouter>['user']['getRegisteredEventList'][0];
    ASTHRA_PASS_EVENT?: boolean;
    user?: User;
}) {
    return (
        <div className="bg-neutral-100 rounded-md p-5 min-w-80 max-w-96 my-10">
            <div className="text-neutral-900 w-full flex flex-col pb-6 border-b-2 border-dotted">
                {ASTHRA_PASS_EVENT && <Image src="/" width={100} height={100} alt="logo" className="mx-auto" />}
                <h2 className="text-neutral-900 mt-6 w-2/3 text-4xl">{reg.registrationId}</h2>
                <p className="text-neutral-900 text-2xl">{reg.remark}</p>
                <p>Event ID</p>
                <p className="text-neutral-900 text-2xl">{reg.eventId}</p>
            </div>
            <div className="text-neutral-900 w-full flex flex-row justify-between pt-12 items-end">
                <div>
                    <p>Event Status</p>
                    <h3 className="text-neutral-900">{reg.status}</h3>
                </div>
                <div>
                    <QRCode value={reg.registrationId} size={100} />
                </div>
            </div>
            <AlertDialogCancel>
                Close <X className="ms-4 w-4" />
            </AlertDialogCancel>
        </div>
    );
}