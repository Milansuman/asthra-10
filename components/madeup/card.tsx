'use client';

import Image from 'next/image';
import type { FC } from 'react';

import { z } from 'zod';

import type { eventZod } from '@/lib/validator';

import { type EventEdit, EventForm } from '@/components/madeup/eventform';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

interface AsthraCardProps {
  data: z.infer<typeof eventZod>;
}
interface AsthraCardPreviewProps {
  data: Partial<z.infer<typeof eventZod>>;
}

export const AsthraCard: FC<AsthraCardProps> = ({ data }) => (
  <Card className="m-2 flex flex-col text-black">
    <CardHeader className="p-0">
      {z.string().safeParse(data.poster).success && (
        <Image
          className="h-[150px] w-full object-cover object-left-top rounded-[10px]"
          height="600"
          width="600"
          src={data.poster}
          alt={`${data.name} poster asthra 8`}
        />
      )}
    </CardHeader>
    <CardTitle className="mt-[20px]">{data.name}</CardTitle>
    <CardDescription className="line-clamp-6 mb-2">
      {data.description}
    </CardDescription>
    <CardFooter className="flex gap-[10px] p-0 mt-[20px] mt-auto">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary" className="flex-1 rounded-s">
            Edit
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[900px] p-0 border-none bg-white text-black">
          <Card className="p-5 text-black">
            <h3 className="cal">Edit Event</h3>
            <p>
              Keyboard accessible, Use up & down arrows to control counts &
              dates
            </p>

            <ScrollArea className="h-[80vh]">
              <EventForm data={data as EventEdit} id={data.id} />
            </ScrollArea>
          </Card>
        </AlertDialogContent>
      </AlertDialog>
      <Button link={`/dashboard/upload/${data.id}`} className="flex-1 rounded-s">
        Change poster
      </Button>
    </CardFooter>
  </Card>
);
export const AsthraCardPreview: React.FC<AsthraCardPreviewProps> = ({
  data,
}) => (
  <div className="flex flex-col md:flex-row w-full gap-5 items-center">
    <Card className="p-0 border-none">
      {z.string().safeParse(data.poster).success && (
        <Image
          className="h-auto w-full object-cover rounded-[10px] border"
          height="600"
          width="600"
          src={data.poster ?? ''}
          alt={`${data.name} poster asthra 8`}
        />
      )}
    </Card>

    <Card className="m-2 rounded-sm cal p-5 relative !h-auto cal">
      <CardHeader>
        <CardTitle className="mt-[20px]">{data.eventType}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-col gap-2 !justify-start items-start w-full">
        <p>Department: {data.department}</p>
        <p>Event type: {data.eventType}</p>
        <p>Event status: {data.eventStatus}</p>
        <p>Venue: {data.venue}</p>
        <p>Starts at: {data.dateTimeStarts?.toLocaleString()}</p>
        <p>Ends in: {data.dateTimeEnd}</p>
        <p>Secret Message: {data.secret}</p>
      </CardContent>
      <CardFooter className="px-0 flex-col w-full items-start">
        <div className="flex gap-[10px] p-0 mt-[20px] justify-between">
          <h3>₹{data.amount}</h3>
          <h3>for {data.regLimit ?? 0}x users</h3>
        </div>
        <p className="cal">
          Registration available for{' '}
          {data.registrationType === 'both'
            ? 'both online & offline (spot)'
            : data.registrationType}
        </p>
      </CardFooter>
    </Card>
  </div>
);

export const AddNewCard: React.FC = () => (
  <Card className="m-2 aspect-square">
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <CardContent className="h-full w-full flex flex-col justify-center m-auto text-black cursor-pointer border-neutral-700 border rounded-xl">
          <p className="text-[5rem] leading-20 w-fit mx-auto">+</p>
          <p className="w-fit mx-auto">Add new</p>
        </CardContent>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[900px] p-0 border-none">
        <Card className="p-5 text-black bg-neutral-100">
          <h3 className="cal">Create Event</h3>
          <p>
            Keyboard accessible, Use up & down arrows to control counts & dates
          </p>
          <ScrollArea className="h-[80vh]">
            <EventForm data={null} />
          </ScrollArea>
        </Card>
      </AlertDialogContent>
    </AlertDialog>
  </Card>
);
