'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import type { z } from 'zod';


import type { eventZod } from '@/lib/validator';
import { allDepartments } from '@/logic';

import EventCard from './event-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Event = z.infer<typeof eventZod>;

type Props = {
    categories: string[];
    departments: string[];
    events: Event[];
    filterDepartment?: string;
    filterCategory?: string;
    eventStatus?: string;
    dashboard?: boolean;
};

export function EventPage({
    categories,
    departments = Object.values(allDepartments),
    events,
    filterDepartment = 'all',
    filterCategory = 'ALL',
    eventStatus = 'all',
    dashboard = false,
}: Props) {
    const [filter, setFilter] = useState(eventStatus === 'cancel' ? 'CANCELLED' : filterCategory);
    const [department, setDepartment] = useState(filterDepartment);

    return (
        <>
            <div className="w-full flex gap-2 justify-center">
                <Select>
                    <SelectTrigger className="w-[380px]">
                        <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent className="w-[380px]">
                        {departments.map((d, index) => (
                            <SelectItem value={d} key={index}>{d}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center mt-8 px-4">
                {events
                    // .filter(
                    //     (event: Event) =>
                    //         ((isDepartment(event) && isEventType(event)) || isGeneralEvent(event) || isSpotEvent(event) || isCancelled(event)) &&
                    //         isEventStatus(event) &&
                    //         !isUploaded(event),
                    // )
                    .map((event) => (
                        <motion.div key={event.id}>
                            {/* <Link href={`/events/${event.id}`}> */}
                            <EventCard data={event} />
                            {/* </Link> */}
                        </motion.div>
                    ))}
            </div>
        </>
    );
}
