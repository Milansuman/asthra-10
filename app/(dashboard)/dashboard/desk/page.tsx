"use client"

import { api } from "@/trpc/react"
import Link from "next/link"
import { EventCard } from "./_components/event-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Users, Search } from "lucide-react"
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"

export default function MainDesk() {
  const { data, isLoading } = api.event.getAll.useQuery()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEvents = useMemo(() => {
    if (!data) return []
    return data.filter(event =>
      event.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [data, searchTerm])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CalendarDays className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Front Desk</h1>
          </div>
          <p className="text-muted-foreground">Manage events and participants from your front desk</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border border-black/50"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-[400px] rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Link key={event.id} href={`/dashboard/desk/participants?id=${event.id}`} className="group">
                  <EventCard event={event} />
                </Link>
              ))}
            </div>

            {filteredEvents.length === 0 && searchTerm && (
              <Card className="text-center py-12 mt-8">
                <CardContent>
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No events found</h3>
                  <p className="text-muted-foreground">No events match your search "{searchTerm}"</p>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {!isLoading && (!data || data.length === 0) && !searchTerm && (
          <Card className="text-center py-12">
            <CardContent>
              <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground">There are no events to display at the moment.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}