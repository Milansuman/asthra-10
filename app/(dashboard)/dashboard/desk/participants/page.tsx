"use client"

import { api } from "@/trpc/react"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Users, UserCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

function ParticipantsPage() {
  const searchParams = useSearchParams()
  const eventId = searchParams.get("id") || ""

  const {
    data: participants,
    isLoading: isLoadingParticipants,
    refetch,
    isFetching,
  } = api.event.getParticipants.useQuery({ id: eventId })

  const attendeesCount = participants?.filter((p) => p.status === "attended").length || 0
  const totalParticipants = participants?.length || 0

  if (isLoadingParticipants) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
          <Skeleton className="h-96" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Event Participants</h1>
          <p className="text-muted-foreground">Manage participants and track attendance</p><br></br>
        </div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/desk">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Desk
              </Button>
            </Link>
          </div>
          <Button onClick={() => refetch()} disabled={isFetching} variant="outline" className="gap-2">
            <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalParticipants}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendees</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendeesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalParticipants > 0 ? Math.round((attendeesCount / totalParticipants) * 100) : 0}%
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <Tabs defaultValue="participants" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="participants" className="gap-2">
                  <Users className="h-4 w-4" />
                  All Participants ({totalParticipants})
                </TabsTrigger>
                <TabsTrigger value="attendees" className="gap-2">
                  <UserCheck className="h-4 w-4" />
                  Attendees ({attendeesCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="participants" className="mt-6">
                <div className="rounded-md border">
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
                          <TableCell className="font-medium">{participant.name}</TableCell>
                          <TableCell className="text-muted-foreground">{participant.email}</TableCell>
                          <TableCell>
                            <Badge variant={participant.status === "attended" ? "default" : "secondary"}>
                              {participant.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="attendees" className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {participants
                        ?.filter((participant) => participant.status === "attended")
                        .map((attendee) => (
                          <TableRow key={attendee.userId}>
                            <TableCell className="font-medium">{attendee.name}</TableCell>
                            <TableCell className="text-muted-foreground">{attendee.email}</TableCell>
                            <TableCell>
                              <Badge variant="default">{attendee.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        {!isLoadingParticipants && (!participants || participants.length === 0) && (
          <Card className="text-center py-12 mt-8">
            <CardContent>
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No participants found</h3>
              <p className="text-muted-foreground">There are no participants registered for this event yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default function ParticipantsList() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading participants...</p>
          </div>
        </div>
      }
    >
      <ParticipantsPage />
    </Suspense>
  )
}