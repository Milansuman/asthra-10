'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { CheckCircle, Home, XCircleIcon } from 'lucide-react';
import { type z } from 'zod';


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
// import { CursorContainer } from './cursor';

import { api } from "trpc/react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { ScrollArea } from '../ui/scroll-area';
import { eventZod } from '@/lib/validator';
import { allDepartments } from '@/logic';
import EventCard from './event-card';
import Dock, { DockItemData } from './Dock';
import RotatingText from '../ui/rotatingText';

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
    departments,
    events,
    filterDepartment = 'all',
    filterCategory = 'ALL',
    eventStatus = 'all',
    dashboard = false,
}: Props) {
    const [filter, setFilter] = useState(eventStatus === 'cancel' ? 'CANCELLED' : filterCategory);
    const [department, setDepartment] = useState(filterDepartment);

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
        } else {
            return false;
        }
    };

    const isEventType = (event: Event) => {
        if ((filter === 'ALL' || event.eventType === filter) && event.eventStatus !== 'cancel') {
            return true;
        } else {
            return false;
        }
    };

    const isGeneralEvent = (event: Event) => {
        if (event.department === 'NA' && filter === 'GENERAL' && event.registrationType !== 'spot' && event.eventStatus !== 'cancel') {
            return true;
        } else {
            return false;
        }
    };

    const isSpotEvent = (event: Event) => {
        if (event.registrationType === 'spot' && filter === 'INFORMAL' && event.department === 'NA' && event.eventStatus !== 'cancel') {
            return true;
        } else {
            return false;
        }
    };

    const isEventStatus = (event: Event) => {
        if (eventStatus === 'all' || event.eventStatus === eventStatus) {
            return true;
        } else {
            return false;
        }
    };

    const isCancelled = (event: Event) => {
        if (filter === 'CANCELLED' && event.eventStatus === 'cancel') {
            return true;
        } else {
            return false;
        }
    };

    const isUploaded = (event: Event) => {
        if (event.eventStatus === 'uploaded') {
            return true;
        } else {
            return false;
        }
    };

    const isSoldOut = (event: Event) => {
        if (event.regCount >= event.regLimit) {
            return true
        } else {
            return false
        }
    }

    const Items: DockItemData[] = [
        {
            icon: <Home />,
            label: "Home",
            onClick: () => { },
            className: ''
        },
        {
            icon: <Home />,
            label: "WorkShops",
            onClick: () => { },
            className: ''
        },
        {
            icon: <Home />,
            label: "Asthra Pass",
            onClick: () => { },
            className: ''
        }
    ]
    return (
        <div className="w-full min-h-screen ambit p-2 flex flex-col gap-4 relative ">
            <div className='p-3 w-full gap-3 flex justify-center items-center'>
                <p className='p-0 m-0 text-3xl'>Asthra</p>
                <RotatingText
                    texts={['Events', 'Workshops', 'Games']}
                    mainClassName="px-2 sm:px-2 text-4xl items-center md:px-5 font-bold flex glass text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pt-2"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                />
            </div>
            <Dock items={Items} />
            {/* <div className="w-full flex flex-row gap-2 justify-center absolute bottom-0 left-0 right-0">
                <Select onValueChange={(value) => handleSelect(value)} defaultValue={filterDepartment}>
                    <SelectTrigger className="w-40 text-center rounded-full">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {Object.entries(allDepartments)
                            .filter(([key, _]) => key !== 'es')
                            .map(([dep, full]) => (
                                <SelectItem key={dep} value={dep}>
                                    {full}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
                <div className="max-w-2/3 h-full rounded-full flex flex-row gap-2  border border-neutral-600 overflow-auto scrollbar-none">
                    {categories.map((category) => (
                        <div key={category + '.div'} className="flex p-2" onClick={() => handleFilter(category)}>
                            <motion.div
                                key={category}
                                initial={false}
                                animate={{
                                    color: filter === category ? '#111111' : '#ffffff',
                                }}
                                className="relative py-2 px-6"
                            >
                                {filter === category && (
                                    <motion.div
                                        layoutId="pill_event"
                                        style={{ borderRadius: 500 }}
                                        transition={{
                                            duration: 0.75,
                                            type: 'tween',
                                            ease: [0.76, 0, 0.24, 1],
                                            delay: 0.2,
                                        }}
                                        className="absolute inset-0 bg-neutral-50"
                                    />
                                )}
                                <span className="relative whitespace-nowrap">{category.replaceAll('_', ' ')}</span>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
                {events
                    .filter(
                        (event: Event) =>
                            ((isDepartment(event) && isEventType(event)) || isGeneralEvent(event) || isSpotEvent(event) || isCancelled(event)) &&
                            isEventStatus(event) &&
                            !isUploaded(event),
                    )
                    .map((event) => (
                        <motion.div layout key={event.id} className="w-full">
                            {dashboard ? <EventCard data={event} /> : <Link href={'/events/' + event.id}><EventCard data={event} /></Link>}
                        </motion.div>
                    ))}
            </div>
        </div>
    );
}