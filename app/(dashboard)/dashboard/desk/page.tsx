"use client"

import { api } from "@/trpc/react";

import Link from "next/link";
import type { z } from "zod";
import { EventCard } from "./_components/event-card";

export default function MainDesk() {
  const { data, isLoading } = api.event.getAll.useQuery();

  return (
    <main className="flex flex-col min-h-[calc(100vh-6rem)] text-foreground p-4 overflow-hidden">
      <h3>Front Desk</h3>
      {
        isLoading ? <></> :
          <div className="flex flex-row flex-wrap gap-4 py-4 overflow-x-hidden">
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