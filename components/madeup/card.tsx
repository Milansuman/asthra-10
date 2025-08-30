'use client';

import Image from 'next/image';
import { useState, type FC, useEffect } from 'react';

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
    <Card className="ambit w-full max-w-2xl glass border border-gray-100 p-6 text-black">
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
                {data.eventType ? String(data.eventType) : 'N/A'}
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
  const { mutateAsync: uploadEventImage } = api.event.uploadEventImage.useMutation();
  const [shortUrl, setShortUrl] = useState<string | null>(null); //only shorten url when user presses the button. use state as a way to not use the mutation immediately.

  return (
    <Card className="flex flex-col text-black w-full max-w-96 p-6 shadow-lg border border-gray-200">
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

      {/* Content Area */}
      <div className="flex-1 mb-6">
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">Department:</span>
            <span className="capitalize">{data.department === "NA" ? "General" : data.department}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Type:</span>
            <span className="capitalize">{data.eventType ? String(data.eventType).replace(/_/g, ' ') : 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Venue:</span>
            <span>{data.venue || 'TBD'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Amount:</span>
            <span className="font-semibold text-gray-900">₹{data.amount}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <CardFooter className="p-0">
        <div className="w-full space-y-3">
          {/* First row: Edit and Change Poster */}
          <div className="grid grid-cols-2 gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="secondary" className="w-full h-12 text-xs font-medium px-2 min-w-0">
                  Edit
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="p-0 h-screen max-w-screen border-none bg-white/95 backdrop-blur-sm overflow-hidden">
                <EventForm data={data as EventEdit} id={data.id} onChangeEvent={onChangeEvent} isModal={true} />
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full h-12 text-xs font-medium px-2 min-w-0">
                  Change Poster
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
                      id="posterUrl"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <AlertDialogCancel asChild>
                      <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                    <Button
                      onClick={async () => {
                        const urlInput = document.getElementById('posterUrl') as HTMLInputElement;
                        const newPosterUrl = urlInput.value.trim();

                        if (newPosterUrl) {
                          try {
                            await uploadEventImage({
                              id: data.id,
                              poster: newPosterUrl
                            });
                            onChangeEvent(); // Refresh the events list
                            // Close the dialog
                            const dialog = document.querySelector('[role="dialog"]');
                            if (dialog) {
                              (dialog as any).close();
                            }
                          } catch (error) {
                            console.error('Error updating poster:', error);
                            alert('Failed to update poster. Please try again.');
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

          {/* Second row: Shorten Link and Delete */}
          <div className="grid grid-cols-2 gap-2">
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
                <Button variant="outline" className="w-full h-12 text-xs font-medium px-2 min-w-0 border-gray-300">
                  Shorten Link
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className='p-5 bg-white rounded-none text-black'>
                <AlertDialogHeader>
                  <AlertDialogTitle className='text-2xl text-black'>Copy Short URL</AlertDialogTitle>
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
                <Button variant="destructive" className="w-full h-12 text-xs font-medium px-2 min-w-0">
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-[400px] p-5 border-none bg-white rounded-none text-black">
                <h3 className="text-lg font-semibold text-black">Confirm Deletion</h3>
                <p className="text-black">Are you sure you want to delete this event? This action cannot be undone.</p>
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
          </div>
        </div>
      </CardFooter>
    </Card>
  )
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
      <CardContent className="flex-col gap-2 !justify-start items-start w-full text-black p-0 pb-4">
        <p>Department: {data.department ? String(data.department) : 'N/A'}</p>
        <p>Event type: {data.eventType ? String(data.eventType) : 'N/A'}</p>
        <p>Event status: {data.eventStatus ? String(data.eventStatus) : 'N/A'}</p>
        <p>Venue: {data.venue || 'N/A'}</p>
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
          {data.registrationType === 'both'
            ? 'both online & offline (spot)'
            : data.registrationType ? String(data.registrationType) : 'N/A'}
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

// Global scroll restoration utility
export const restoreGlobalScroll = () => {
  // Remove all scroll-locking styles that might be applied by dialogs
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.height = '';
  document.body.style.paddingRight = '';

  // Also clean up html element styles
  document.documentElement.style.overflow = '';
  document.documentElement.style.position = '';
  document.documentElement.style.top = '';
  document.documentElement.style.left = '';
  document.documentElement.style.right = '';
  document.documentElement.style.bottom = '';

  // Force scroll restoration and ensure the page is scrollable
  window.scrollTo(0, window.scrollY);

  // Additional cleanup: remove any inline styles that might interfere
  const body = document.body;
  body.removeAttribute('style');

  // Ensure the page can scroll
  document.documentElement.style.overflow = 'auto';
  document.body.style.overflow = 'auto';
};

export const AddNewCard: React.FC<{ onChangeEvent: () => void }> = ({ onChangeEvent }) => {
  // Function to restore scroll
  const restoreScroll = () => {
    restoreGlobalScroll();
  };

  // Cleanup effect to ensure scroll is restored
  useEffect(() => {
    return () => {
      // Restore scroll when component unmounts
      restoreScroll();
    };
  }, []);

  const handleChangeEvent = () => {
    // Restore scroll after event change
    setTimeout(() => {
      restoreScroll();
    }, 100);

    onChangeEvent();
  };

  // Enhanced event handler that ensures scroll restoration
  const handleEventChangeWithScrollRestore = () => {
    handleChangeEvent();
    // Double-check scroll restoration with multiple attempts
    setTimeout(() => {
      restoreScroll();
    }, 200);
    setTimeout(() => {
      restoreScroll();
    }, 500);
  };

  return (
    <Card className="w-full max-w-80 aspect-square rounded-none border border-neutral-200">
      <AlertDialog onOpenChange={(open) => {
        if (!open) {
          // Restore scroll when dialog closes
          setTimeout(() => {
            restoreScroll();
          }, 50);
          // Additional restoration attempts
          setTimeout(() => {
            restoreScroll();
          }, 150);
        }
      }}>
        <AlertDialogTrigger asChild>
          <CardContent className="m-auto flex h-full w-full flex-col justify-center text-black">
            <p className="mx-auto w-fit text-[5rem] leading-20">+</p>
            <p className="w-fit mx-auto">Add new</p>
          </CardContent>
        </AlertDialogTrigger>
        <AlertDialogContent
          className="w-[95vw] max-w-[900px] max-h-[95vh] p-0 border-none mx-4"
          onEscapeKeyDown={() => {
            setTimeout(() => restoreScroll(), 50);
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="sr-only">Create Event</AlertDialogTitle>
          </AlertDialogHeader>
          <Card className="p-3 md:p-5 text-black bg-glass rounded-none">
            <div className="mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-semibold mb-2">Create Event</h3>
              <p className="text-sm md:text-base text-gray-600">
                Keyboard accessible, Use up & down arrows to control counts & dates
              </p>
            </div>
            <ScrollArea className="h-[70vh] md:h-[80vh] rounded-none p-2 md:p-4">
              <EventForm data={null} onChangeEvent={handleEventChangeWithScrollRestore} isModal={true} />
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
        src={data.poster ?? '/asthra glass.png'}
        alt="Asthra Logo"
        width={300}
        height={200}
        className="my-4"
      />
      <ul className="w-full list-disc space-y-2 pl-5 text-black">
        <li className="list-item items-center gap-2">
          <span className="text-sm">{data.eventType ? String(data.eventType) : 'N/A'}</span>
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
        {data.eventType === 'ASTHRA_PASS_EVENT' && 'Buy Asthra Pass First'}
      </Button>
    </CardFooter>
  </Card>
);
