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

interface PurchaseCardPreviewProps {
  data: Partial<z.infer<typeof eventZod>>;
  features: string[];
  onView: () => void;
  onBuy: () => void; 
}

export const AsthraCard: FC<AsthraCardProps> = ({ data }) => (
  <Card className="m-2 flex flex-col">
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
        <AlertDialogContent className="sm:max-w-[900px] p-0 border-none">
          <Card className="p-5">
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
      <Button link={`/uploads/${data.id}`} className="flex-1 rounded-s">
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
  <Card className="m-2">
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <CardContent className="h-full w-full flex flex-col justify-center m-auto">
          <p className="text-[5rem] leading-20 w-fit mx-auto">+</p>
          <p className="w-fit mx-auto">Add new</p>
        </CardContent>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[900px] p-0 border-none">
        <Card className="p-5">
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



export const PurchaseCardPreview: FC<PurchaseCardPreviewProps> = ({ data, features, onView, onBuy }) => (
  <Card className="m-2 max-w-sm bg-white  rounded-lg shadow-lg">
    <CardHeader>
      <CardTitle className="text-2xl font-semibold text-black">
        {data.name}
      </CardTitle>
      <CardDescription className="text-neutral-700">{data.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col items-center space-y-6">
      <Image
        src="/asthra glass.png"
        alt="Asthra Logo"
        width={300}
        height={200}
        className="my-4"
      />
      <ul className="space-y-2 w-full text-black list-disc">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter className="flex gap-4 justify-between">
      <Button
        variant="outline"
        className="flex-1 rounded-lg bg-button-secondary text-button-primary border-2 border-gray-300 "
        onClick={onView}
      >
        View
      </Button>
      <Button
        className="flex-1 rounded-lg bg-button-primary hover:bg-blue-700"
        onClick={onBuy}
      >
        Buy Ticket
      </Button>
    </CardFooter>
  </Card>
);
