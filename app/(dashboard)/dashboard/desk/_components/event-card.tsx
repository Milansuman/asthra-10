"use client"
import Image from 'next/image';
import { z } from 'zod';
import { eventZod } from '@/lib/validator';
import { Markdown } from '@/app/_components/md';

interface EventCardProps {
  event: z.infer<typeof eventZod>
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="rounded-lg p-4 border border-neutral-300 bg-white text-black shadow-sm" key={event.id}>
      <Image
        className="rounded-lg w-full h-auto object-cover"
        src={event.poster}
        alt={event.name ?? "event poster"}
        width={300}
        height={300} />
      <h4 className="mt-2 text-lg font-semibold text-black">{event.name}</h4>
      <div className="prose max-w-none text-black">
        <Markdown>{event.description}</Markdown>
      </div>
    </div>
  )
}