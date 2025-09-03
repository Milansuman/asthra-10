'use client';

import Image from 'next/image';
import { useState, type FC, useEffect } from 'react';

import { z } from 'zod';

import type { eventZod } from '@/lib/validator';
import { allDepartments } from '@/logic';

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

import { Copy, Trash2, Plus } from 'lucide-react';

import { api } from '@/trpc/react';
import { TRPCError } from '@trpc/server';
import { Input } from '../ui/input';
import { Markdown } from '@/app/_components/md';
import { ASTHRA, AsthraStartsAt, getTimeUtils } from '@/logic';
import { toast } from 'sonner';

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
    <Card className="ambit w-full max-w-2xl  border border-gray-100 p-6 text-black">
      <div className="flex flex-col space-y-3">

        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4">
            <CardTitle className="text-4xl mb-3">{data.name}</CardTitle>
            <Markdown>
              {data.description}
            </Markdown>
          </div>
          {credits && (
            <div className="bg-white text-black px-4 py-2 rounded-lg flex-shrink-0">
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
<<<<<<< HEAD
                {String(data.eventType)}
=======
                {data.eventType ? String(data.eventType) : 'N/A'}
>>>>>>> 3d27362bb34f9d26f2589739d077aebf62c67936
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
            className="bg-white text-black border-2 border-gray-300 px-6 py-6 text-xl rounded-lg"
          >
            {data.eventType === "ASTHRA_PASS" && "Buy Ticket"}
            {data.eventType === "WORKSHOP" && `Purchase for ₹${data.amount}`}
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
  const { mutateAsync: uploadEventImage } = api.event.uploadEventImage.useMutation();
  const [shortUrl, setShortUrl] = useState<string | null>(null); //only shorten url when user presses the button. use state as a way to not use the mutation immediately.
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <Card className="flex flex-col text-black w-full min-w-80 max-w-96 p-6 shadow-lg border border-gray-200">
      {/* Header with Image and Title */}
      <CardHeader className="p-0 mb-6">
        {z.string().safeParse(data.poster).success && (
          <div className="relative mb-4">
            <Image
              className="w-full h-48 object-cover object-center rounded-lg"
              height="600"
              width="600"
              src={data.poster}
              alt={`${data.name} poster asthra 8`}
            />
          </div>
        )}
        <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
          {data.name}
        </CardTitle>
      </CardHeader>

      <div className="p-4 flex-1 flex flex-col">
        <CardTitle className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">{data.name}</CardTitle>

        <div className="space-y-1 text-sm text-slate-600 mb-4 flex-1">
          <p className="flex items-center gap-2">
            <span className="font-medium">Department:</span>
            <span>{allDepartments[data.department as keyof typeof allDepartments] || data.department}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="font-medium">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${data.eventStatus === 'approved' ? 'bg-green-100 text-green-800' :
<<<<<<< HEAD
              String(data.eventStatus) === 'pending' ? 'bg-yellow-100 text-yellow-800' :
=======
              data.eventStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
>>>>>>> 3d27362bb34f9d26f2589739d077aebf62c67936
                'bg-gray-100 text-gray-800'
              }`}>
              {String(data.eventStatus)}
            </span>   
          </p>
          <p className="flex items-center gap-2">
            <span className="font-medium">Type:</span>
            <span>{String(data.eventType)}</span>
          </p>
        </div>

        <CardFooter className="p-0 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2 w-full">
            <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-slate-700 border-slate-300 hover:bg-slate-50">
                  Edit
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-4xl max-h-[90vh] p-0 border-none bg-transparent">
                <Card className="bg-white text-slate-900 max-h-[90vh] flex flex-col">
                  <div className="p-6 border-b border-slate-200">
                    <AlertDialogTitle className="text-2xl font-bold text-slate-900">Edit Event</AlertDialogTitle>
                    <p className="text-slate-600 mt-1">
                      Update event details and settings
                    </p>
                  </div>

                  <ScrollArea className="flex-1 p-6">
                    <EventForm
                      data={data as EventEdit}
                      id={data.id}
                      onChangeEvent={onChangeEvent}
                      onClose={() => setIsEditDialogOpen(false)}
                    />
                  </ScrollArea>
                </Card>
              </AlertDialogContent>
            </AlertDialog>
            {/* <AlertDialog onOpenChange={(open) => {
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
                <Button variant="outline" size="sm" className="text-slate-700 border-slate-300 hover:bg-slate-50">
                  Share
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-md bg-white text-slate-900 border border-slate-200">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl font-semibold text-slate-900">Share Event</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="space-y-4">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-sm font-medium text-slate-700 mb-2">Short URL:</p>
                    <div className="flex gap-2">
                      <div className="flex-1 p-2 bg-white border border-slate-300 rounded text-sm font-mono text-slate-800">
                        {shortUrl ?? "Generating..."}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          await navigator.clipboard.writeText(shortUrl ?? "https://example.com")
                          toast.success("URL copied to clipboard!")
                        }}
                        disabled={!shortUrl}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel asChild>
                    <Button variant="outline">Close</Button>
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog> */}
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Event
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md bg-white text-slate-900 border border-slate-200">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-semibold text-slate-900">Confirm Deletion</AlertDialogTitle>
                <p className="text-slate-600 mt-2">
                  Are you sure you want to delete "{data.name}"? This action cannot be undone.
                </p>
              </AlertDialogHeader>
              <AlertDialogFooter className="gap-2">
                <AlertDialogCancel asChild>
                  <Button variant="outline">Cancel</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button variant="destructive" onClick={() => onDelete(data.id)}>
                    Delete Event
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </div>
    </Card>
  );
};
export const AsthraCardPreview: React.FC<AsthraCardPreviewProps> = ({
  data,
}) => (
  <div className="flex flex-col md:flex-row w-full gap-5 items-start min-h-0">
    <Card className="p-0 border-none flex-shrink-0">
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

    <Card className="p-5 relative flex-1 text-black border-neutral-300 min-h-0">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="mt-[20px]">{data.name}</CardTitle>
        <Markdown full>
          {data.description}
        </Markdown>
      </CardHeader>
<<<<<<< HEAD
      <CardContent className="flex-col gap-2 !justify-start items-start w-full text-black">
        <p>Department: {data.department}</p>
        <p>Event type: {String(data.eventType)}</p>
        <p>Event status: {String(data.eventStatus)}</p>
        <p>Venue: {data.venue}</p>
=======
      <CardContent className="flex-col gap-2 !justify-start items-start w-full text-black p-0 pb-4">
        <p>Department: {data.department ? String(data.department) : 'N/A'}</p>
        <p>Event type: {data.eventType ? String(data.eventType) : 'N/A'}</p>
        <p>Event status: {data.eventStatus ? String(data.eventStatus) : 'N/A'}</p>
        <p>Venue: {data.venue || 'N/A'}</p>
>>>>>>> 3d27362bb34f9d26f2589739d077aebf62c67936
        <p>Starts at: {getTimeUtils(data.dateTimeStarts ?? AsthraStartsAt)}</p>
        <p>Ends in: {data.dateTimeEnd ? String(data.dateTimeEnd) : 'N/A'}</p>
        <p>Secret Message:</p>
        <div className='max-h-32 overflow-y-auto border rounded p-2 bg-gray-50'>
          <div className="text-gray-800 [&_*]:text-gray-800 [&_p]:text-gray-800 [&_div]:text-gray-800">
            <Markdown>
              {data.secret}
            </Markdown>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-0 flex-col w-full items-start p-0">
        <div className="flex gap-[10px] p-0 mt-[20px] justify-between">
          <h3>{data.eventType !== "ASTHRA_PASS_EVENT" ? "₹" : ""}{data.amount}</h3>
          <h3>for {data.regLimit ?? 0}x users</h3>
        </div>
        <p className="text-sm text-gray-600">
          Registration available for{' '}
          {String(data.registrationType) === 'both'
            ? 'both online & offline (spot)'
<<<<<<< HEAD
            : String(data.registrationType)}
=======
            : data.registrationType ? String(data.registrationType) : 'N/A'}
>>>>>>> 3d27362bb34f9d26f2589739d077aebf62c67936
        </p>
        <div className="w-full mt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full">
                Change poster
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-[500px] p-5 border-none bg-white rounded-none text-black">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl text-black">Change Event Poster</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Poster Image URL
                  </label>
                  <Input
                    placeholder="Enter CDN link or file path (e.g., https://example.com/image.jpg)"
                    className="w-full"
                    id="previewPosterUrl"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <AlertDialogCancel asChild>
                    <Button variant="outline">Cancel</Button>
                  </AlertDialogCancel>
                  <Button
                    onClick={async () => {
                      const urlInput = document.getElementById('previewPosterUrl') as HTMLInputElement;
                      const newPosterUrl = urlInput.value.trim();

                      if (newPosterUrl) {
                        try {
                          // For preview cards, we might want to just update the local state
                          // or show a message that this is for preview only
                          alert('Poster URL updated! Note: This is a preview card. Use the main event management to make permanent changes.');
                        } catch (error) {
                          console.error('Error updating poster:', error);
                        }
                      } else {
                        alert('Please enter a valid URL');
                      }
                    }}
                  >
                    Update Poster
                  </Button>
                </div>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  </div>
);

export const AddNewCard: React.FC<{ onChangeEvent: () => void }> = ({ onChangeEvent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="flex flex-col text-slate-900 bg-white border-2 border-dashed border-slate-300 shadow-sm hover:shadow-md transition-all duration-200 hover:border-slate-400 cursor-pointer group min-w-80">
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <CardContent className="flex h-full w-full flex-col justify-center items-center p-8 min-h-[300px]">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-slate-200 transition-colors">
              <Plus className="w-8 h-8 text-slate-600 group-hover:text-slate-700" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Create New Event</h3>
            <p className="text-sm text-slate-600 text-center">Click to add a new event to Asthra 9</p>
          </CardContent>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-4xl max-h-[90vh] p-0 border-none bg-transparent">
          <Card className="bg-white text-slate-900 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-200">
              <AlertDialogTitle className="text-2xl font-bold text-slate-900">Create New Event</AlertDialogTitle>
              <p className="text-slate-600 mt-1">
                Fill in the details to create a new event for Asthra 9
              </p>
            </div>
            <ScrollArea className="flex-1 p-6">
              <EventForm
                data={null}
                onChangeEvent={onChangeEvent}
                onClose={() => setIsOpen(false)}
                isModal={true}
              />
            </ScrollArea>

          </Card>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

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
        src={data.poster ?? '/asthra .png'}
        alt="Asthra Logo"
        width={300}
        height={200}
        className="my-4"
      />
      <ul className="w-full list-disc space-y-2 pl-5 text-black">
        <li className="list-item items-center gap-2">
<<<<<<< HEAD
          <span className="text-sm">{String(data.eventType)}</span>
=======
          <span className="text-sm">{data.eventType ? String(data.eventType) : 'N/A'}</span>
>>>>>>> 3d27362bb34f9d26f2589739d077aebf62c67936
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
        className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white font-semibold text-black"
        onClick={onView}
      >
        <span>View</span>
      </Button>
      <Button
        className="flex-1 rounded-lg bg-button-primary font-bold text-black hover:bg-blue-700"
        onClick={onBuy}
      >
        {data.eventType === 'ASTHRA_PASS' && 'Buy Ticket'}
        {data.eventType === 'WORKSHOP' && `Purchase for ₹${data.amount}`}
      </Button>
    </CardFooter>
  </Card>
);