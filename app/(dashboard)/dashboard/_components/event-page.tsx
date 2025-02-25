'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { allDepartments } from '@/logic';
import { motion } from 'framer-motion';
import { CheckCircle, XCircleIcon } from 'lucide-react';
import type { z } from 'zod';

import type { eventZod } from '@/lib/validator';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { api } from 'trpc/react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { ScrollArea } from '@/components/ui/scroll-area';

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
  const [filter, setFilter] = useState(
    eventStatus === 'cancel' ? 'CANCELLED' : filterCategory
  );
  const [department, setDepartment] = useState(filterDepartment);

  const handleSelect = (dep: string) => {
    setDepartment(dep);
  };

  const handleFilter = (category: string) => {
    setFilter(category);
  };

  //Filter Functions for readability
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
    if (
      event.department === 'NA' &&
      filter === 'GENERAL' &&
      event.registrationType !== 'spot' &&
      event.eventStatus !== 'cancel'
    ) {
      return true;
    }
    return false;
  };

  const isSpotEvent = (event: Event) => {
    if (
      event.registrationType === 'spot' &&
      filter === 'INFORMAL' &&
      event.department === 'NA' &&
      event.eventStatus !== 'cancel'
    ) {
      return true;
    }
    return false;
  };

  const isEventStatus = (event: Event) => {
    if (eventStatus === 'all' || event.eventStatus === eventStatus) {
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

  const isUploaded = (event: Event) => {
    if (event.eventStatus === 'uploaded') {
      return true;
    }
    return false;
  };

  const isSoldOut = (event: Event) => {
    if (event.regCount >= event.regLimit) {
      return true;
    }
    return false;
  };

  return (
    <div className="w-full min-h-screen p-2 flex flex-col gap-4">
      <div className="w-full flex flex-row gap-2 justify-center z-10 items-center">
        <Select
          onValueChange={(value) => handleSelect(value)}
          defaultValue={filterDepartment}
        >
          <SelectTrigger className="w-40 text-center rounded-full text-white border-neutral-50 backdrop-blur-lg">
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
        <div className="max-w-2/3 h-full rounded-full flex flex-row gap-2 bg-neutral-900/10 backdrop-blur-lg border border-neutral-100 overflow-auto scrollbar-none">
          {categories.map((category) => (
            <div
              key={category + '.div'}
              className="flex p-2"
              onClick={() => handleFilter(category)}
            >
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
                <span className="relative whitespace-nowrap">
                  {category.replaceAll('_', ' ')}
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
        {events
          .filter(
            (event: Event) =>
              ((isDepartment(event) && isEventType(event)) ||
                isGeneralEvent(event) ||
                isSpotEvent(event) ||
                isCancelled(event)) &&
              isEventStatus(event) &&
              !isUploaded(event)
          )
          .map((event) => (
            <motion.div layout key={event.id} className="w-full">
              {dashboard ? (
                <EventCard event={event} dashboard={dashboard} />
              ) : (
                <Link href={'/events/' + event.id}>
                  <EventCard event={event} dashboard={dashboard} />
                </Link>
              )}
            </motion.div>
          ))}
      </div>
    </div>
  );
}
function EventCard({
  event,
  dashboard,
}: {
  event: z.infer<typeof eventZod>;
  dashboard: boolean;
}) {
  const { data: registeredUsers } = api.event.getParticipants.useQuery({
    id: event.id,
  });

  const { mutate: removeAttendance } = api.user.removeAttendance.useMutation();
  const { mutate: addAttendance } = api.user.addAttendance.useMutation();

  const handleAttendance = (
    userId: string,
    eventId: string,
    status: boolean
  ) => {
    status
      ? addAttendance({
        userId: userId,
        eventId: eventId,
      })
      : removeAttendance({
        userId: userId,
        eventId: eventId,
      });
  };

  return (
    <Card className="relative">
      <Image
        src={event.poster ?? '/sjcet/1.jpeg'}
        width={400}
        height={400}
        alt={event.name!}
        className="w-full aspect-square rounded-t-md"
      />
      <CardContent>
        <div className="px-1 pt-3 pb-0 flex flex-col gap-2">
          <h3 className="p-0 overflow-hidden overflow-ellipsis whitespace-nowrap w-full">
            {event.name}
          </h3>

          <div className="flex justify-between align-bottom">
            <div className="flex flex-col">
              <h4 className="tracking-wider">
                {' '}
                {!dashboard
                  ? event.regCount < event.regLimit
                    ? event.eventType === 'ASTHRA_PASS_EVENT'
                      ? 'Free with asthra pass'
                      : event.amount === 0
                        ? 'FREE'
                        : `₹${event.amount}`
                    : 'Sold Out'
                  : `${event.regCount} / ${event.regLimit} Registered`}
              </h4>

              <p>{event.dateTimeStarts.toLocaleDateString()}</p>
              <p>{event.dateTimeStarts.toLocaleTimeString()}</p>
            </div>
            {dashboard && (
              <div className="self-end max-h-80 overflow-auto">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button className="h-[30px] uppercase font-black self-end">
                      Participants
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full bg-glow rounded-none">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Participants for {event.name}
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <ScrollArea className="max-h-80 w-full">
                      <Table>
                        <TableHeader>
                          <TableHead className="w-[100px]">Name</TableHead>
                          {/* <TableHead>Department</TableHead> */}
                          <TableHead>College</TableHead>
                          <TableHead>Status</TableHead>
                        </TableHeader>
                        <TableBody className="max-h-20 overflow-auto">
                          {registeredUsers?.map((participant) => (
                            <TableRow key={participant.email}>
                              <TableCell>{participant.name}</TableCell>
                              {/* <TableCell>{participant.department}</TableCell> */}
                              <TableCell>{participant.college}</TableCell>
                              <TableCell className="flex flex-row gap-2">
                                {participant.status}
                                {participant.status === 'attended' ? (
                                  <XCircleIcon
                                    onClick={() =>
                                      handleAttendance(
                                        participant.userId,
                                        participant.eventId,
                                        false
                                      )
                                    }
                                  />
                                ) : (
                                  <CheckCircle
                                    onClick={() =>
                                      handleAttendance(
                                        participant.userId,
                                        participant.eventId,
                                        true
                                      )
                                    }
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
            <Button className="h-[30px] uppercase font-black self-end">
              {event.department}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
