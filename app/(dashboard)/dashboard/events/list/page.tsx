"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

import { api } from "@/trpc/react"

import { columns, type TableType } from "./_components/columns";
import { ParticipantsTable } from "./_components/participants-table";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";

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
  const [csvData, setCsvData] = useState("");
  const { data, isPending } = api.event.getEventParticipants.useQuery({
    id: eventId!
  })

  // Helper function to properly format CSV fields
  const formatCSVField = (value: any): string => {
    if (value === null || value === undefined) {
      return "";
    }

    const stringValue = String(value);

    // If the value contains commas, quotes, or newlines, wrap it in quotes
    if (stringValue.includes(",") || stringValue.includes("\"") || stringValue.includes("\n")) {
      // Escape any quotes by doubling them
      return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
  };

  useEffect(() => {
    if (!isPending && data) {
      let newCsvData = "Name,Email,Phone,AsthraPass,College,Status,Event,Department\n";

      for (const participant of data) {
        const rowData = [
          formatCSVField(participant.user?.name),
          formatCSVField(participant.user?.email),
          formatCSVField(participant.user?.number),
          formatCSVField(participant.user?.asthraPass),
          formatCSVField(participant.user?.college),
          formatCSVField(participant.userRegisteredEvent.status),
          formatCSVField(participant.event?.name),
          formatCSVField(participant.event?.department)
        ].join(",");

        newCsvData += rowData + "\n";
      }

      setCsvData(newCsvData);
    }
  }, [isPending, data]);

  return (
    <div className="p-6 flex flex-col gap-3">
      <h3>{isPending ? "Loading" : data?.[0]?.event?.name ?? "Unknown"}</h3>
      <h4>Department: {isPending ? "Loading" : data?.[0]?.event?.department ?? "unknown"}</h4>
      <Button className="w-fit" link={csvData ?
        `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}` :
        "#"} disabled={isPending}>
        Download Participants (CSV)
      </Button>
      <ParticipantsTable columns={columns} data={(data ?? []) as TableType[]} isPending={isPending} />
    </div>
  )
}