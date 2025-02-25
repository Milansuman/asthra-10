"use client";

import { EventPage } from "@/components/madeup/events-page";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import Plusbox from "@/components/madeup/box";
import { TextRotatingAnimation } from "@/components/madeup/text-animate";

export interface Main {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Home() {
  return (
    <div className="w-full min-h-screen ambit p-2 flex flex-col gap-4 ">
      <div className='mt-20 w-full gap-3 flex flex-col justify-center items-center'>
        <img src='/asthra.svg' alt="SJCET Logo" className='w-64' />
        <Plusbox className='relative p-2 border  border-white/20 w-auto'>
          <TextRotatingAnimation text={['Events', 'Workshops', 'Games', "Competitions", "Cultural"]} />
        </Plusbox>
      </div>
      <Suspense fallback={<Loader size={80} className="animate-spin" />}>
        <Page />
      </Suspense>
    </div>
  );
}

function Page() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const department = searchParams.get("department");
  const status = searchParams.get("status");

  const { data, isLoading, isPending, isError } =
    api.event.getLatest.useQuery();

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-3 justify-center items-center">
        <Loader size={80} className="animate-spin" />
        <h1 className="text-3xl">Loading</h1>
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <h2>No Events Found!</h2>
        <p className="mb-2">Check back later</p>
        <Button link="/home" variant={"glass"}>
          Go Home
        </Button>
      </div>
    );
  }

  const additionalCategories = ["GENERAL"];

  const approvedEvents = data.filter(
    (event) => event.eventStatus === "approved",
  );
  // const cancel = events.filter((event) => event.eventStatus === "cancel")

  const departments = [...new Set(data.map((event) => event.department))];
  const filterDepartment = department as string;
  const eventStatus = status as string;
  const eventCategory = category as string;
  if (
    departments.includes("NA") &&
    data.filter((event) => event.registrationType === "spot").length > 0
  ) {
    additionalCategories.push("INFORMAL");
  }

  if (data.filter((event) => event.eventStatus === "cancel").length > 0) {
    additionalCategories.push("CANCELLED");
  }

  const categories = ["ALL"].concat(
    [...new Set(data.map((event) => event.eventType as string))]
      .concat(additionalCategories)
      .filter((et) => et !== "ASTHRA_PASS"),
  );
  return (
    <>
      <EventPage
        events={data ?? []}
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
