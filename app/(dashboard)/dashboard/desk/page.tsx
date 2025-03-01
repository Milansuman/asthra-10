"use client"

import { api } from "@/trpc/react";
import { useState } from "react";

import type { eventZod } from "@/lib/validator";
import Link from "next/link";
import type { z } from "zod";
import { EventCard } from "./_components/event-card";

type Event = z.infer<typeof eventZod>

export default function MainDesk() {
  const [events, setEvents] = useState<Event[]>([]);
  const { data, isLoading } = api.event.getAll.useQuery();

  return (
    <main className="flex flex-col h-screen text-white p-6">
      <h3>Front Desk</h3>
      {
        isLoading ? <></> :
          <div className="flex flex-row flex-wrap gap-2 py-2">
            {
              data?.map(event => (
                <Link key={event.id} href={`/dashboard/desk/participants?id=${event.id}`}>
                  <EventCard event={event} key={event.id} />
                </Link>
              ))
            }
          </div>
      }
    </main>
  )
}