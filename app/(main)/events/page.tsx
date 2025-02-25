"use client";

import { EventPage } from "@/components/madeup/events-page";
import type { eventZod } from "@/lib/validator";
import { Button } from "@heroui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { z } from "zod";

export interface Main {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Home() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Page />
    </Suspense>
  );
}

function Page() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const department = searchParams.get("department");
  const status = searchParams.get("status");

  const demoEvent: z.infer<typeof eventZod> = {
    id: "1",
    name: "Comming Soon",
    description: "Comming Soon",
    secret: "Secret 1",
    poster: "/public/assets/Ref1.webp",
    createdAt: new Date("2025-02-20T00:00:00.000Z"),
    updatedAt: null,
    createdById: "user-1",
    department: "NA",
    venue: "Venue 1",
    dateTimeStarts: new Date("2025-03-06T03:30:00.000Z"),
    dateTimeEnd: "ALL DAY",
    eventStatus: "uploaded",
    eventType: "ASTHRA_PASS_EVENT",
    amount: 0,
    registrationType: "both",
    regLimit: 10,
    regCount: 0,
  };

  // const events = await api.event.getLatest.query();
  const events = [
    "/assets/Ref1.webp",
    "/assets/Ref2.webp",
    // "/assets/Ref3.webp",
    "/assets/Ref4.webp",
    "/assets/Ref5.webp",
    "/assets/Ref6.webp",
  ].map((poster, index) => ({ ...demoEvent, id: index.toString(), poster }));
  // console.log(events)

  if (events.length === 0) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h2>No Events Found!</h2>
        <p className="mb-2">Check back later</p>
        {/* <CursorContainer varient="link"> */}
        <Link href="/home">
          <Button>Go Home</Button>
        </Link>
        {/* </CursorContainer> */}
      </div>
    );
  }

  const additionalCategories = ["GENERAL"];

  const approvedEvents = events.filter(
    (event) => event.eventStatus === "approved",
  );
  // const cancel = events.filter((event) => event.eventStatus === "cancel")

  const departments = [...new Set(events.map((event) => event.department))];
  const filterDepartment = department as string;
  const eventStatus = status as string;
  const eventCategory = category as string;
  if (
    departments.includes("NA") &&
    events.filter((event) => event.registrationType === "spot").length > 0
  ) {
    additionalCategories.push("INFORMAL");
  }

  if (events.filter((event) => event.eventStatus === "cancel").length > 0) {
    additionalCategories.push("CANCELLED");
  }

  const categories = ["ALL"].concat(
    [...new Set(events.map((event) => event.eventType as string))]
      .concat(additionalCategories)
      .filter((et) => et !== "ASTHRA_PASS"),
  );
  return (
    <>
      <EventPage
        events={events}
        categories={categories}
        departments={departments}
        // events={approvedEvents}
        filterDepartment={filterDepartment ?? "all"}
        eventStatus={eventStatus ?? "all"}
        filterCategory={eventCategory ?? "ALL"}
        dashboard={false}
      />
    </>
  );
}
