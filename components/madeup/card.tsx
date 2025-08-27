'use client';

import Image from 'next/image';
import { useState, type FC } from 'react';

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
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Copy, Trash2 } from 'lucide-react';

import { api } from '@/trpc/react';
import { TRPCError } from '@trpc/server';
import { Input } from '../ui/input';
import { Markdown } from '@/app/_components/md';
import { ASTHRA, AsthraStartsAt, getTimeUtils } from '@/logic';

interface AsthraCardProps {
  data: z.infer<typeof eventZod>;
  onDelete: (id: string) => void;
  onChangeEvent: () => void
}
interface AsthraCardPreviewProps {
  data: Partial<z.infer<typeof eventZod>>;
}
interface EventCardProps {
  data: z.infer<typeof eventZod>;
  credits?: string;
  footerNote?: string;
}

export const EventCard: React.FC<EventCardProps> = ({ data, credits, footerNote }) => {
  return (
    <Card className="ambit w-full max-w-2xl glass border border-gray-100 p-6 text-white">
      <div className="flex flex-col space-y-3">

        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4">
            <CardTitle className="text-4xl mb-3">{data.name}</CardTitle>
            <Markdown>
              {data.description}
            </Markdown>
          </div>
          {credits && (
            <div className="bg-white text-blue-600 px-4 py-2 rounded-lg flex-shrink-0">
              <span className="ambit">{credits}</span>
            </div>
          )}
        </div>

        <div className="flex mt-4">
          <Card className="bg-white w-52 h-64 flex justify-center items-center rounded-md overflow-hidden flex-shrink-0">
            <CardContent className="flex flex-col justify-center items-center p-0 w-full h-full">
              <img
                src={data.poster}
                alt="Event logo"
                className="w-full h-full object-cover"
              />
            </CardContent>
          </Card>

          <div className="ml-8 flex items-center">
            <ul className="list-disc space-y-1 pl-6">
              <li className="list-item text-xl">
                <span className="ambit">Amount:</span>
                {data.amount}
              </li>
              <li className="list-item text-xl">
                <span className="ambit">Venue:</span>
                {data.venue}
              </li>
              <li className="list-item text-xl">
                <span className="ambit">Event Type:</span>
                {data.eventType}
              </li>
              <li className="list-item text-xl">
                <span className="ambit">Only {data.regLimit} seats!</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          {footerNote && <p className="text-xl">{footerNote}</p>}
          <Button
            variant="outline"
            className="bg-white text-blue-500 border-2 border-gray-300 px-6 py-6 text-xl rounded-lg"
          >
            {data.eventType === "ASTHRA_PASS" && "Buy Ticket"}
            {data.eventType === "WORKSHOP" && `Purchase for ₹${data.amount}`}
            {data.eventType === "ASTHRA_PASS_EVENT" && "Buy Asthra Pass First"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

interface PurchaseCardPreviewProps {
  data: Partial<z.infer<typeof eventZod>>;
  onView: () => void;
  onBuy: () => void;
}

export const AsthraCard: FC<AsthraCardProps> = ({ data, onDelete, onChangeEvent }) => {
  const { mutate: shortenUrl } = api.shortner.shorten.useMutation();
  const [shortUrl, setShortUrl] = useState<string | null>(null); //only shorten url when user presses the button. use state as a way to not use the mutation immediately.

  return (
    <Card className="m-2 flex flex-col text-white aspect-square max-w-80 p-4">
      <CardHeader className="p-0">
        {z.string().safeParse(data.poster).success && (
          <Image
            className="h-[150px] w-full object-cover object-left-top"
            height="600"
            width="600"
            src={data.poster}
            alt={`${data.name} poster asthra 8`}
          />
        )}
      </CardHeader>
      <CardTitle className="mt-[20px]">{data.name}</CardTitle>
      <CardFooter className="flex gap-[10px] p-0 mt-auto flex-wrap">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary" className="flex-1">
              Edit
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="p-5 min-h-screen max-w-screen border-none bg-transparent">
            <Card className="p-5 text-white bg-glass">
              <AlertDialogTitle>Edit Event</AlertDialogTitle>
              <p>
                Keyboard accessible, Use up & down arrows to control counts &
                dates
              </p>

              <ScrollArea className="h-[80vh]">
                <EventForm data={data as EventEdit} id={data.id} onChangeEvent={onChangeEvent} />
              </ScrollArea>
            </Card>
          </AlertDialogContent>
        </AlertDialog>
        <Button  className="flex-1"> {/*link={`/dashboard/upload?id=${data.id}`}*/}
          Change poster
        </Button>
        <AlertDialog onOpenChange={(open) => {
          if (open && data.name !== null && shortUrl === null) {
            shortenUrl({
              name: data.name.replaceAll(" ", "_"),
              url: `https://asthra.sjcetpalai.ac.in/event/${data.id}`
            }, {
              onSuccess(data) {
                if (data instanceof TRPCError) return;
                setShortUrl(data.url);
              }
            })
          }
        }}>
          <AlertDialogTrigger asChild>
            <Button>Shorten Link</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='p-5 bg-glass rounded-none'>
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 size={20} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-[400px] p-5 border-none bg-glass rounded-none">
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            <p>Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="flex justify-end gap-4 mt-4">
              <AlertDialogCancel asChild>
                <Button variant="outline">Cancel</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button variant="destructive" onClick={() => onDelete(data.id)}>Delete</Button>
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
};
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

    <Card className="m-2 cal p-5 relative !h-auto cal text-white border-neutral-300 max-h-96 overflow-auto">
      <CardHeader>
        <CardTitle className="mt-[20px]">{data.name}</CardTitle>
        <Markdown full>
          {data.description}
        </Markdown>
      </CardHeader>
      <CardContent className="flex-col gap-2 !justify-start items-start w-full text-white">
        <p>Department: {data.department}</p>
        <p>Event type: {data.eventType}</p>
        <p>Event status: {data.eventStatus}</p>
        <p>Venue: {data.venue}</p>
        <p>Starts at: {getTimeUtils(data.dateTimeStarts ?? AsthraStartsAt)}</p>
        <p>Ends in: {data.dateTimeEnd}</p>
        <p>Secret Message:</p>
        <div className='max-h-96 overflow-auto'>
          <Markdown>
            {data.secret}
          </Markdown>
        </div>
      </CardContent>
      <CardFooter className="px-0 flex-col w-full items-start">
        <div className="flex gap-[10px] p-0 mt-[20px] justify-between">
          <h3>{data.eventType !== "ASTHRA_PASS_EVENT" ? "₹" : ""}{data.amount}</h3>
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

export const AddNewCard: React.FC<{ onChangeEvent: () => void }> = ({ onChangeEvent }) => (
  <Card className="m-2  w-52 aspect-square rounded-none border border-neutral-200">
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <CardContent className="m-auto flex h-full w-full flex-col justify-center text-white">
          <p className="mx-auto w-fit text-[5rem] leading-20">+</p>
          <p className="w-fit mx-auto">Add new</p>
        </CardContent>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[900px] p-0 border-none rounded-none bg-transparent">
        <Card className="p-5 text-white bg-glass rounded-none">
          <h3 className="cal">Create Event</h3>
          <p>
            Keyboard accessible, Use up & down arrows to control counts & dates
          </p>
          <ScrollArea className="h-[80vh] rounded-none p-4">
            <EventForm data={null} onChangeEvent={onChangeEvent} />
          </ScrollArea>
        </Card>
      </AlertDialogContent>
    </AlertDialog>
  </Card>
);

export const PurchaseCardPreview: FC<PurchaseCardPreviewProps> = ({
  data,
  onView,
  onBuy,
}) => (
  <Card className="ambit max-w-sm rounded-none bg-white shadow-lg">
    <CardHeader>
      <CardTitle className="font-semibold text-2xl text-black">
        {data.name}
      </CardTitle>
      <Markdown>
        {data.description}
      </Markdown>
    </CardHeader>
    <CardContent className="flex flex-col items-center space-y-6">
      <Image
        src={data.poster ?? '/asthra glass.png'}
        alt="Asthra Logo"
        width={300}
        height={200}
        className="my-4"
      />
      <ul className="w-full list-disc space-y-2 pl-5 text-black">
        <li className="list-item items-center gap-2">
          <span className="text-sm">{data.eventType}</span>
        </li>
        <li className="list-item items-center gap-2">
          <span className="text-sm">Just ₹{data.amount} per head</span>
        </li>
        <li className="list-item items-center gap-2">
          <span className="text-sm">Event Venue: {data.venue}</span>
        </li>
        <li className="list-item items-center gap-2">
          <span className="text-sm">
            Limited Spots: Only {data.regLimit} seats available!
          </span>
        </li>
      </ul>
    </CardContent>
    <CardFooter className="flex justify-between gap-4">
      <Button
        variant="outline"
        className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white font-semibold text-button-primary"
        onClick={onView}
      >
        <span>View</span>
      </Button>
      <Button
        className="flex-1 rounded-lg bg-button-primary font-bold text-white hover:bg-blue-700"
        onClick={onBuy}
      >
        {data.eventType === 'ASTHRA_PASS' && 'Buy Ticket'}
        {data.eventType === 'WORKSHOP' && `Purchase for ₹${data.amount}`}
        {data.eventType === 'ASTHRA_PASS_EVENT' && 'Buy Asthra Pass First'}
      </Button>
    </CardFooter>
  </Card>
);
