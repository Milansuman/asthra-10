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
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col sm:flex-row gap-4 p-6 border-b border-slate-200 flex-shrink-0">
        <Select
          onValueChange={(value) => handleSelect(value)}
          defaultValue={filterDepartment}
        >
          <SelectTrigger className="w-full sm:w-[280px] bg-white border-slate-300">
            <SelectValue placeholder="Filter by Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
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
            <SelectTrigger className="w-full sm:w-[280px] bg-white border-slate-300">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
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
          <div className="flex flex-wrap gap-2 flex-1">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleFilter(category)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${filter === category
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category.replaceAll('_', ' ')}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
  const { mutate: shortenUrl } = api.shortner.shorten.useMutation();
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  return (
    <Card className="group overflow-hidden bg-white border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="aspect-[4/3] overflow-hidden flex-shrink-0">
        <Image
          src={event.poster ?? '/sjcet/1.jpeg'}
          width={400}
          height={300}
          alt={event.name ?? "poster"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4 flex flex-col flex-1">
        <div className="flex flex-col space-y-3 flex-1">
          <h3 className="font-semibold text-lg text-slate-900 line-clamp-2 leading-tight">
            {event.name}
          </h3>

          <div className="flex flex-col space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                {!dashboard
                  ? event.regCount < event.regLimit
                    ? event.eventType === 'ASTHRA_PASS_EVENT'
                      ? 'Free with asthra pass'
                      : event.amount === 0
                        ? 'FREE'
                        : `₹${event.amount}`
                    : 'Sold Out'
                  : `${event.regCount}/${event.regLimit} Registered`}
              </span>
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                {event.department}
              </span>
            </div>

            <p className="text-sm text-slate-600">{getTimeUtils(event.dateTimeStarts)}</p>
          </div>

          {dashboard && (
            <div className="flex flex-wrap gap-2 pt-2 mt-auto">
              <Button
                size="sm"
                variant="outline"
                link={`/dashboard/events/list?eventId=${event.id}`}
                className="text-xs"
              >
                Participants
              </Button>
              <Button
                size="sm"
                variant="outline"
                link={event.id === ASTHRA.id ? "/dashboard/attendence/asthra" : `/dashboard/attendence/${event.id}`}
                className="text-xs"
              >
                Attendance
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
                  <Button size="sm" variant="outline" className="text-xs p-2">
                    <LinkIcon className="w-3 h-3" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Share Event</AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="flex gap-2">
                    <div className="flex-1 p-3 border rounded-lg bg-slate-50 text-sm font-mono">
                      {shortUrl ?? "Loading..."}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        await navigator.clipboard.writeText(shortUrl ?? "https://example.com")
                      }}
                    >
                      <Copy className="w-4 h-4" />
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
          )}
        </div>
      </CardContent>
    </Card>
  );
}
