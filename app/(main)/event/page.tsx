"use client"

import { useSearchParams, useRouter } from "next/navigation";
import { EventParent } from "./_components/event";

export default function Event() {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const eventId = searchParams.get("id")

  if (!eventId) {
    push("/events")
    return null
  }

  return <EventParent id={eventId} />
}