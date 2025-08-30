"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { api } from "@/trpc/react";

import { columns, type TableType } from "./_components/columns";
import { ParticipantsTable } from "./_components/participants-table";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FancyMultiSelect } from "@/components/ui/multi-select";
import type { UserZodType } from "@/lib/validator";

export default function ListPage() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <ParticipantsListPage />
    </Suspense>
  );
}

function ParticipantsListPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return (
      <div className="p-6 flex flex-col gap-4 items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-semibold text-gray-900">Event Participants</h2>
          <p className="text-gray-600 max-w-md">
            To view event participants, please select an event from the events list or navigate to this page from an event's details.
          </p>
          <div className="flex gap-3 mt-4">
            <Button link="/dashboard/events" variant="outline">
              View All Events
            </Button>
            <Button link="/dashboard" variant="outline">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const [csvData, setCsvData] = useState("");
  const { data, isPending, refetch, error } = api.event.getEventParticipants.useQuery({
    id: eventId,
  });

  // Log for debugging
  console.log('Event ID:', eventId);
  console.log('Query result:', { data, isPending, error });

  // Helper function to properly format CSV fields
  const formatCSVField = (value: any): string => {
    if (value === null || value === undefined) {
      return "";
    }

    const stringValue = String(value);

    // If the value contains commas, quotes, or newlines, wrap it in quotes
    if (
      stringValue.includes(",") ||
      stringValue.includes('"') ||
      stringValue.includes("\n")
    ) {
      // Escape any quotes by doubling them
      return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
  };

  useEffect(() => {
    if (!isPending && data) {
      let newCsvData =
        "Name,Email,Phone,AsthraPass,College,Status,Event,Department\n";

      for (const participant of data) {
        const rowData = [
          formatCSVField(participant.user?.name),
          formatCSVField(participant.user?.email),
          formatCSVField(participant.user?.number),
          formatCSVField(participant.user?.asthraPass),
          formatCSVField(participant.user?.college),
          formatCSVField(participant.userRegisteredEvent.status),
          formatCSVField(participant.event?.name),
          formatCSVField(participant.event?.department),
        ].join(",");

        newCsvData += rowData + "\n";
      }

      setCsvData(newCsvData);
    }
  }, [isPending, data]);

  return (
    <div className="p-6 flex flex-col gap-3">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <h3 className="text-red-800 font-medium">Error Loading Participants</h3>
          <p className="text-red-600 text-sm mt-1">{error.message}</p>
          <p className="text-red-600 text-sm mt-1">Event ID: {eventId}</p>
        </div>
      )}
      <h3>{isPending ? "Loading" : (data?.[0]?.event?.name ?? "Unknown")}</h3>
      <h4>
        Department:{" "}
        {isPending ? "Loading" : (data?.[0]?.event?.department ?? "unknown")}
      </h4>
      <div className="flex gap-2">
        <Button
          className="w-fit"
          link={
            csvData
              ? `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`
              : "#"
          }
          disabled={isPending}
        >
          Download Participants (CSV)
        </Button>

        <Button onClick={() => refetch()} disabled={isPending}>
          {isPending ? "Loading" : "Refresh"}
        </Button>

        {data && (
          <Dialog>
            <DialogTrigger asChild>
              <Button disabled={isPending}>
                Add Participants
              </Button>
            </DialogTrigger>
            <DialogContent className="top-40 max-w-screen-md">
              <DialogParent
                eventId={eventId}
                alreadyUsers={data
                  .map((e) => e.user?.id ?? null)
                  .filter((e) => e !== null)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
      <ParticipantsTable
        columns={columns}
        data={(data ?? []) as TableType[]}
        isPending={isPending}
      />
    </div>
  );
}

const DialogParent = ({
  eventId,
  alreadyUsers,
}: {
  eventId: string;
  alreadyUsers: string[];
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Search & Add users</DialogTitle>
        <DialogDescription>
          But only works for ASTHRA PASS Events. Not paid events.
        </DialogDescription>
      </DialogHeader>
      <ListOfUsers
        eventId={eventId}
        alreadyUsers={alreadyUsers}
      />
    </>
  );
}


const ListOfUsers = ({
  eventId,
  alreadyUsers,
}: {
  eventId: string;
  alreadyUsers: string[];
}) => {
  const { data, isLoading } = api.management.getUsers.useQuery();
  const state = useState<(UserZodType & { value: string, label: string })[]>([])

  const { mutateAsync, isPending, isSuccess } =
    api.event.addParticipants.useMutation({
      onError: (error) =>
        toast.error("An error occurred", {
          description: error.message,
        }),
      onSuccess: () => toast("Status changed successfully"),
    });

  if (isLoading || isPending) return <div>Loading...</div>;
  if (!data) return <div>No Users data</div>;

  console.log(state[0])

  return (
    <>
      <FancyMultiSelect
        state={state}
        data={data.filter(e => !alreadyUsers.includes(e.id)).map((d) => ({
          ...d,
          value: d.email,
          label: `${d.name}`,
        }))}
        itemUI={(d) => (
          <div className="flex gap-2 w-full">
            <img src={d.image ?? ""} alt="hi" className="w-4 h-4" />
            {d.name} - {d.email}

            <span className="ms-auto">
              {d.asthraPass ? "(Asthra Pass)" : ""}
            </span>
          </div>
        )}
        badgeUI={(d) => (
          <div className="flex gap-2">
            {d.name}
          </div>
        )}
      />
      <DialogFooter>
        <Button onClick={() => mutateAsync({
          eventId,
          usersEmails: state[0].map(e => e.email)
        })} disabled={isPending}>
          {isSuccess ? "Done" : isPending ? "Saving.." : "Add Participants"}
        </Button>
      </DialogFooter>
    </>
  );
};
