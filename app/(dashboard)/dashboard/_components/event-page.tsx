'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { ASTHRA, allDepartments, getTimeUtils } from '@/logic';
import { motion } from 'framer-motion';
import { Copy, LinkIcon } from 'lucide-react';
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


import { TRPCError } from '@trpc/server';
import { isMobileDevice } from '@/hooks/mobile';

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

  const isGeneralEvent = (event: Event) => {
    console.log(event.id)
    if (
      // event.department === 'NA' &&
      // filter === 'GENERAL' &&
      // event.registrationType !== 'spot' &&
      event.eventStatus !== 'cancel' &&
      ["043f6971-14f7-40db-81ed-3fd2c8e7c0c5", "536526b7-1883-43b3-99f1-932ba52b0253", "7797da37-e74a-428a-8c2d-25217fdcf23c", "8bd2123d-e8ab-4462-8563-60e6111673d4"].includes(event.id) &&
      filter === "GENERAL"
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

  const isOtherEvent = (event: Event) => {
    if (
      event.department === 'NA' &&
      event.registrationType !== 'spot' &&
      event.eventStatus !== 'cancel' &&
      !(["043f6971-14f7-40db-81ed-3fd2c8e7c0c5", "536526b7-1883-43b3-99f1-932ba52b0253", "7797da37-e74a-428a-8c2d-25217fdcf23c", "8bd2123d-e8ab-4462-8563-60e6111673d4", "95cea129-1752-4ddc-ab9a-d609e625b4cc"].includes(event.id)) &&
      filter === "OTHER"
    ) {
      return true;
    }
    return false;
  }

  return (
    <div className="w-full min-h-screen p-2 flex flex-col gap-4">
      <div className="w-full flex flex-col-reverse gap-2 justify-center z-10 items-center">
        <Select
          onValueChange={(value) => handleSelect(value)}
          defaultValue={filterDepartment}
        >
          <SelectTrigger className="w-[380px] self-center text-left">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className="w-[380px]">
            <SelectItem value="all">All</SelectItem>
            {Object.entries(allDepartments)
              .map(([dep, full]) => (
                <SelectItem key={dep} value={dep}>
                  {full}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {isMobileDevice() ? (
          <Select onValueChange={(selectedCategory) => handleFilter(selectedCategory)}>
            <SelectTrigger className="w-[380px] self-center text-left">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="w-[380px]">
              {categories.map((category) => (
                <SelectItem value={category} key={category}>
                  {category.replaceAll('_', ' ').split(' ').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  ).join(' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="max-w-2/3 h-full rounded-none flex flex-row gap-2 overflow-auto text-foreground">
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
                    color: filter === category ? '#111111' : '#111111',
                  }}
                  className="relative py-1 px-4"
                >
                  {filter === category && (
                    <motion.div
                      layoutId="pill_event"
                      // style={{ borderRadius: 500 }}
                      transition={{
                        duration: 0.75,
                        type: 'tween',
                        ease: [0.76, 0, 0.24, 1],
                        delay: 0.2,
                      }}
                      className="absolute inset-0 bg-neutral-200"
                    />
                  )}
                  <span className="relative whitespace-nowrap">
                    {category.replaceAll('_', ' ')}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
        {events
          .filter(
            (event: Event) =>
              ((isDepartment(event) && isEventType(event)) ||
                isGeneralEvent(event) ||
                isSpotEvent(event) ||
                isCancelled(event) ||
                isOtherEvent(event)
              ) &&
              isEventStatus(event) &&
              !isUploaded(event)
          )
          .map((event) => (
            <motion.div layout key={event.id} className="w-full">
              {dashboard ? (
                <EventCard event={event} dashboard={dashboard} />
              ) : (
                <Link href={`/event/${event.id}`}>
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
  console.log(event);
  const { mutate: shortenUrl } = api.shortner.shorten.useMutation();
  const [shortUrl, setShortUrl] = useState<string | null>(null);

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
        height={600}
        alt={event.name ?? "poster"}
        className="w-full"
      />
      <CardContent>
        <div className="px-1 pt-3 pb-0 flex flex-col gap-2">
          <h3 className="p-0 overflow-hidden overflow-ellipsis whitespace-nowrap w-full">
            {event.name}
          </h3>

          <div className="flex flex-col justify-between align-bottom">
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

              <p>{getTimeUtils(event.dateTimeStarts)}</p>
            </div>
            <div className="overflow-auto flex flex-wrap mt-5 gap-1">
              <Button link={`/dashboard/events/list?eventId=${event.id}`} className="h-[30px] uppercase font-black self-end">
                Participants
              </Button>
              <Button link={event.id === ASTHRA.id ? "/dashboard/attendence/asthra" : `/dashboard/attendence/${event.id}`} className="h-[30px] uppercase font-black self-end">
                Take Attendence
              </Button>
              <Button className="h-[30px] uppercase font-black self-end">
                {event.department}
              </Button>
              <AlertDialog onOpenChange={(open) => {
                if (open && event.name !== null && shortUrl === null) {
                  shortenUrl({
                    name: event.name.replaceAll(" ", "_"),
                    url: `https://asthra.sjcetpalai.ac.in/event/${event.id}`
                  }, {
                    onSuccess(data) {
                      if (data instanceof TRPCError) return;
                      setShortUrl(data.url);
                    }
                  })
                }
              }}>
                <AlertDialogTrigger asChild>
                  <Button className='self-end h-[30px]'>
                    <LinkIcon />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className='p-5 rounded-none'>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='text-2xl'>Copy Short URL</AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className='flex flex-row gap-2'>
                    <div className="p-2 border border-neutral-400 bg-neutral-50/20 flex-1">
                      {shortUrl ?? "Loading..."}
                    </div>
                    <Button variant="outline" onClick={async () => {
                      await navigator.clipboard.writeText(shortUrl ?? "https://example.com")
                    }}>
                      <Copy />
                    </Button>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
