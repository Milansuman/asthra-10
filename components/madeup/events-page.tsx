'use client';

import Link from 'next/link';
import { useState } from 'react';

import { motion } from 'framer-motion';
import type { z } from 'zod';


import type { eventZod } from '@/lib/validator';
import { allDepartments } from '@/logic';
import RotatingText from '../ui/rotatingText';

import Plusbox from './box';
import EventCard from './event-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Image from 'next/image';

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
    const [value, setValue] = useState(0)
    const handleSelect = (dep: string) => {
        setDepartment(dep);
    };

    const handleFilter = (category: string) => {
        setFilter(category);
    };

    //Filter Functions for readability
    const isDepartment = (event: Event) => {
        if ((department === 'all' || event.department === department) && event.eventStatus !== 'cancel') {
            return true;
        } return false;
    };

    const isEventType = (event: Event) => {
        if ((filter === 'ALL' || event.eventType === filter) && event.eventStatus !== 'cancel') {
            return true;
        } return false;
    };

    const isGeneralEvent = (event: Event) => {
        if (event.department === 'NA' && filter === 'GENERAL' && event.registrationType !== 'spot' && event.eventStatus !== 'cancel') {
            return true;
        } return false;
    };

    const isSpotEvent = (event: Event) => {
        if (event.registrationType === 'spot' && filter === 'INFORMAL' && event.department === 'NA' && event.eventStatus !== 'cancel') {
            return true;
        } return false;
    };

    const isEventStatus = (event: Event) => {
        if (eventStatus === 'all' || event.eventStatus === eventStatus) {
            return true;
        } return false;
    };

    const isCancelled = (event: Event) => {
        if (filter === 'CANCELLED' && event.eventStatus === 'cancel') {
            return true;
        } return false;
    };

    const isUploaded = (event: Event) => {
        if (event.eventStatus === 'uploaded') {
            return true;
        } return false;
    };

    const isSoldOut = (event: Event) => {
        if (event.regCount >= event.regLimit) {
            return true;
        } return false;
    }

    return (
        <div className="w-full min-h-screen ambit p-2 flex flex-col gap-4 ">
            <div className='mt-20 w-full gap-3 flex flex-col justify-center items-center'>
                <img src='/asthra.svg' className='w-64' />
                <Plusbox className='relative p-2 border  border-white/20'>
                    <RotatingText
                        texts={['Events', 'Workshops', 'Games', "Competitions", "Cultural"]}
                        mainClassName="px-2 sm:px-2 text-6xl text-white items-center md:px-5 font-bold flex bg-glass text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-none"
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pt-2"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2000}
                    />
                </Plusbox>
            </div>
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
        </div>
    );
}