'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import type { z } from 'zod';


import type { eventZod } from '@/lib/validator';
import { allDepartments } from '@/logic';

import EventCard from '@/components/madeup/event-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

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
    const [filter, setFilter] = useState(
        eventStatus === 'cancel' ? 'CANCELLED' : filterCategory
    );
    const [department, setDepartment] = useState(filterDepartment);

    const handleFilter = (category: string) => {
        setFilter(category);
    };

    // Filter Functions for readability
    const isDepartment = (event: Event) => {
        if (
            (department === 'all' || event.department === department) &&
            event.eventStatus !== 'cancel'
        ) {
            return true;
        }
        return false;
    };

    const isEventType = (event: Event) => {
        if (
            (filter === 'ALL' || event.eventType === filter) &&
            event.eventStatus !== 'cancel'
        ) {
            return true;
        }
        return false;
    };

    const isGeneralEvent = (event: Event) => {
        console.log(event.id)
        if (
            // event.department === 'NA' &&
            // filter === 'GENERAL' &&
            // event.registrationType !== 'spot' &&
            event.eventStatus !== 'cancel' &&
            ["043f6971-14f7-40db-81ed-3fd2c8e7c0c5", "536526b7-1883-43b3-99f1-932ba52b0253", "7797da37-e74a-428a-8c2d-25217fdcf23c", "8bd2123d-e8ab-4462-8563-60e6111673d4"].includes(event.id) &&
            filter == "GENERAL"
        ) {
            return true;
        }
        return false;
    };

    const isSpotEvent = (event: Event) => {
        if (
            ((event.registrationType === 'spot' ||
                event.id === "95cea129-1752-4ddc-ab9a-d609e625b4cc"
            ) &&
                filter === 'INFORMAL' &&
                event.department === 'NA' &&
                event.eventStatus !== 'cancel')
        ) {
            return true;
        }
        return false;
    };

    const isCancelled = (event: Event) => {
        if (filter === 'CANCELLED' && event.eventStatus === 'cancel') {
            return true;
        }
        return false;
    };

    const isOtherEvent = (event: Event) => {
        if (
            event.department === 'NA' &&
            event.registrationType !== 'spot' &&
            event.eventStatus !== 'cancel' &&
            !(["043f6971-14f7-40db-81ed-3fd2c8e7c0c5", "536526b7-1883-43b3-99f1-932ba52b0253", "7797da37-e74a-428a-8c2d-25217fdcf23c", "8bd2123d-e8ab-4462-8563-60e6111673d4", "95cea129-1752-4ddc-ab9a-d609e625b4cc"].includes(event.id)) &&
            filter == "OTHER"
        ) {
            return true;
        }
        return false;
    }

    return (
        <>
            <div className="w-full flex flex-col gap-4 justify-center">
                <div className="max-w-2/3 h-full rounded-none flex flex-row gap-2 bg-glass border border-glass overflow-auto scrollbar-none self-center">
                    {categories.map((category) => (
                        <div
                            key={`${category}.div`}
                            className="flex p-1"
                            onClick={() => handleFilter(category)}
                        >
                            <motion.div
                                key={category}
                                initial={false}
                                animate={{
                                    color: filter === category ? '#111111' : '#ffffff',
                                }}
                                className="relative py-1 px-4"
                            >
                                {filter === category && (
                                    <motion.div
                                        layoutId="pill_event"
                                        transition={{
                                            duration: 0.75,
                                            type: 'tween',
                                            ease: [0.76, 0, 0.24, 1],
                                            delay: 0.2,
                                        }}
                                        className="absolute inset-0 bg-white"
                                    />
                                )}
                                <span className="relative whitespace-nowrap">
                                    {category.replaceAll('_', ' ')}
                                </span>
                            </motion.div>
                        </div>
                    ))}
                </div>

                <Select onValueChange={(selectedDepartment) => setDepartment(selectedDepartment)}>
                    <SelectTrigger className="w-[380px] self-center">
                        <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent className="w-[380px]">
                        <SelectItem value="all">All</SelectItem>
                        {departments.map((dprt, index) => (
                            <SelectItem value={dprt} key={index}>
                                {dprt === "NA" ? "General Events" : allDepartments[dprt as keyof typeof allDepartments]}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {events
                    .filter(
                        (event: Event) =>
                        ((isDepartment(event) && isEventType(event)) ||
                            isGeneralEvent(event) ||
                            isSpotEvent(event) ||
                            isCancelled(event) ||
                            isOtherEvent(event))
                    )
                    .map((event) => (
                        <motion.div key={event.id}>
                            <Link href={`/event/${event.id}`}>
                                <EventCard data={event} />
                            </Link>
                        </motion.div>
                    ))}
            </div>
        </>
    );
}
