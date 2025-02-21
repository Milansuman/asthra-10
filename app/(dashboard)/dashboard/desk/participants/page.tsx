"use client"

import { api } from "@/trpc/react"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { z } from "zod"
import { userRegisteredEventZod } from "@/lib/validator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function ParticipantsPage() {
  const searchParams = useSearchParams()
  const eventId = searchParams.get("id") || ""

  const { data: participants, isLoading: isLoadingParticipants } = api.event.getParticipants.useQuery({ id: eventId })

  if (isLoadingParticipants) {
    return <p>Loading...</p>
  }

  return (
    <Tabs defaultValue="participants" className="h-screen p-6">
      <TabsList>
        <TabsTrigger value="participants">Participants</TabsTrigger>
        <TabsTrigger value="attendees">Attendees</TabsTrigger>
      </TabsList>
      <TabsContent value="participants">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants?.map((participant) => (
              <TableRow key={participant.userId}>
                <TableCell>{participant.name}</TableCell>
                <TableCell>{participant.email}</TableCell>
                <TableCell>{participant.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="attendees">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants?.filter(participant => participant.status === "attended").map((attendee) => (
              <TableRow key={attendee.userId}>
                <TableCell>{attendee.name}</TableCell>
                <TableCell>{attendee.email}</TableCell>
                <TableCell>{attendee.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  )
}

export default function ParticipantsList() {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <ParticipantsPage />
    </Suspense>
  )
}