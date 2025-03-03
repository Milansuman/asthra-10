"use client"

import { Markdown } from "@/app/_components/md";
import { ButtonText, PaymentButton } from "@/app/_components/pay";
import { ShareButton } from "@/app/_components/share";
import Plusbox from "@/components/madeup/box";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { EventZodType } from "@/lib/validator";
import { type AllDepartments, allDepartments, ASTHRA, getTimeUtils } from "@/logic";
import { getActivityPoints } from "@/logic/points";
import { api } from "@/trpc/react"
import { AlertCircle, ExternalLinkIcon, InfoIcon, LoaderIcon } from "lucide-react";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import LoginButton from "../../../_components/login";


export const EventParent = ({ id }: { id: string }) => {
    const { data: event, isLoading, isError } = api.event.getSpecificCached.useQuery({
        id: id,
    });

    if (isLoading) {
        return (
            <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
                <LoaderIcon size={50} className="animate-spin" />
            </div>
        );
    }

    if (!event || !event.data || isError) {
        if (isError) {
            return (
                <div className="flex flex-col justify-center items-center">
                    <h2>{event?.error?.message}</h2>
                    <LoginButton />
                </div>
            )
        }

        return (
            <div className="flex flex-col justify-center items-center">
                <h2>This event does not exist!</h2>
                <Link href="/events">
                    <Button variant={"glass"} size={"glass"}>Choose another event</Button>
                </Link>
            </div>
        );
    }

    return (
        <EventClient shortUrl={""} event={event.data} />
    )
}


const EventClient = ({ event, shortUrl }: { event: EventZodType, shortUrl: string }) => {
    const department = event.department === 'NA' ? "General SJCET Events" : allDepartments[event.department as AllDepartments];
    return (
        <>
            <Plusbox className="flex-1 p-2">
                <img src={event.poster} width={400} height={500} alt={event.name ?? ""} className="w-full h-auto" />
            </Plusbox>
            <div className='flex-1 flex flex-col gap-4 w-full'>
                <Card className='relative'>
                    <ShareButton shortUrl={shortUrl} />
                    <CardHeader>
                        <Badge variant={"glass"} className="w-fit relative mb-3">
                            Created by {department}
                            <div className="bg-glass-top absolute top-0 left-0 right-0 h-full" />
                        </Badge>
                        <CardTitle>
                            {event.name ?? "Event"}
                        </CardTitle>
                        <br />
                        <Markdown full>
                            {event.description}
                        </Markdown>
                    </CardHeader>
                    <CardContent className='flex flex-row gap-3 flex-wrap font-bold capitalize'>
                        <div className='relative bg-glass py-2 px-3 border-glass border'>
                            <p className='opacity-70 text-sm font-normal'>Venue</p>
                            {event.venue}
                        </div>

                        <div className='relative bg-glass py-2 px-3 border-glass border'>
                            <p className='opacity-70 text-sm font-normal'>Registration Type</p>
                            {event.registrationType === 'both' ? 'Both Spot & Online' : `${event.registrationType} only`}
                        </div>

                        {event.eventType !== "ASTHRA_PASS" && <div className='relative bg-glass py-2 px-3 border-glass border'>
                            <p className='opacity-70 text-sm font-normal'>Registration Limit</p>
                            approx. {event.regLimit} Seats
                        </div>}

                        {event.dateTimeStarts && (
                            <div className='relative bg-glass py-2 px-3 border-glass border'>
                                <p className='opacity-70 text-sm font-normal'>Event starts at</p>
                                {getTimeUtils(event.dateTimeStarts)}
                            </div>
                        )}

                        <div className='relative bg-glass py-2 px-3 border-glass border'>
                            <p className='opacity-70 text-sm font-normal'>Duration of event</p>
                            {event.dateTimeEnd}
                        </div>

                        <div className='relative bg-glass py-2 px-3 border-glass border'>
                            <p className='opacity-70 text-sm font-normal'>{event.eventType === "ASTHRA_PASS_EVENT" ? "Asthra Credit" : "Fee"}</p>
                            {event.eventType === "ASTHRA_PASS_EVENT" ? "" : "₹"}
                            {!event.amount || event.amount === 0 ? 'FREE' : `${event.amount}`}
                            {event.eventType === "ASTHRA_PASS_EVENT" ? " Required" : ""}
                        </div>

                        {event.eventType === "ASTHRA_PASS" && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className='relative bg-glass py-2 px-3 border-glass border'>
                                            <p className='opacity-70 text-sm font-normal'>Asthra Credits</p>
                                            {ASTHRA.credit} <InfoIcon className="w-4 ms-1 inline-block" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-64">
                                        Common limit given to all ASTHRA Pass users, which can be used to register for events. Each event has a different credit value. If your credit limit is exhausted, you have to pay extra for refilling the credits.
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                        )}

                        {event.eventType !== "ASTHRA_PASS_EVENT" && (<div className='lowercase relative bg-glass py-2 px-3 border-glass border'>
                            <p className='opacity-70 text-sm font-normal capitalize'>KTU Activity Points</p>
                            {getActivityPoints(event.eventType)}
                        </div>)}

                    </CardContent>
                    <CardFooter className='justify-between gap-4 flex-wrap'>
                        <PaymentButton event={event} />
                    </CardFooter>

                    {event.eventType !== "WORKSHOP" && <Button disabled size={"thin"} variant={"glass"} className="w-full overflow-hidden text-wrap min-h-10 h-fit border-x-0 border-b-0">
                        NB: This event is strictly for outside SJCET campus students <InfoIcon />
                    </Button>}
                </Card>

                {(!event.secret || event.secret !== "") && <Button disabled size={"thin"} variant={"glass"} className="w-full overflow-hidden text-wrap min-h-10 h-fit">
                    Complete details now, then come back to see special message for participants.
                    <AlertCircle />
                </Button>}
                <Button size={"thin"} variant={"glass"} link={`/events?department=${event.department}`} className="w-full overflow-hidden text-wrap min-h-10 h-fit">
                    Show more events from {department}
                    <ExternalLinkIcon />
                </Button>
            </div>
        </>
    );
}