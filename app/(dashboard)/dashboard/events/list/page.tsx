"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

import { api } from "@/trpc/react"

import { columns, type TableType } from "./_components/columns";
import { ParticipantsTable } from "./_components/participants-table";

export default function ListPage() {
  return (
    <Suspense fallback={<></>}>
      <ParticipantsListPage />
    </Suspense>
  )
}

function ParticipantsListPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const { data, isPending } = api.event.getEventParticipants.useQuery({
    id: eventId!
  })

  return (
    <div className="p-6 flex flex-col gap-3">
      <h3>{isPending ? "Loading" : data?.[0]?.event?.name ?? "Unknown"}</h3>
      <h4>Department: {isPending ? "Loading" : data?.[0]?.event?.department ?? "unknown"}</h4>
      <ParticipantsTable columns={columns} data={(data ?? []) as TableType[]} isPending={isPending} />
    </div>
  )
}