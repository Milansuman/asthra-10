"use client"

import { api } from "@/trpc/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function Page() {
    const { data: events, isLoading } = api.event.getAll.useQuery()

    if (isLoading) {
        return (
            <div className="container min-h-screen flex flex-col justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading events...</p>
                </div>
            </div>
        )
    }

    if (!events || events.length === 0) {
        return (
            <div className="container min-h-screen flex flex-col justify-center items-center">
                <Card>
                    <CardHeader>
                        <CardTitle>No Events Found</CardTitle>
                        <CardDescription>
                            There are no events available for attendance tracking.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    return (
        <div className="container min-h-screen py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-foreground">Event Attendance Selection</h1>
                <p className="text-muted-foreground">
                    Choose an event to take attendance for. Select the event where students will be participating.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <Card key={event.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <CardTitle className="text-lg mb-2">{event.name}</CardTitle>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant={event.eventStatus === 'approved' ? 'default' : 'secondary'}>
                                            {event.eventStatus}
                                        </Badge>
                                        <Badge variant="outline">{event.eventType}</Badge>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin size={16} />
                                <span>{event.venue || 'Venue TBD'}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users size={16} />
                                <span>{event.regCount || 0} / {event.regLimit === Number.POSITIVE_INFINITY ? '∞' : event.regLimit} registered</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar size={16} />
                                <span>{event.dateTimeStarts ? new Date(event.dateTimeStarts).toLocaleDateString() : 'Date TBD'}</span>
                            </div>

                            <div className="pt-3">
                                <Button
                                    asChild
                                    className="w-full"
                                    disabled={event.eventStatus !== 'approved'}
                                >
                                    <Link href={`/dashboard/attendence/${event.id}`}>
                                        Take Attendance
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
