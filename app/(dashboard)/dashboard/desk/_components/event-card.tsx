"use client"
import Image from "next/image"
import type { z } from "zod"
import type { eventZod } from "@/lib/validator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Users } from "lucide-react"

interface EventCardProps {
  event: z.infer<typeof eventZod>
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white dark:bg-slate-800">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {event.name}
          </CardTitle>
          <Badge variant="secondary" className="shrink-0">
            Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0 space-y-4">
        <div className="relative overflow-hidden rounded-lg">
          <Image
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            src={event.poster || "/placeholder.svg"}
            alt={event.name ?? "event poster"}
            width={400}
            height={200}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>Event</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Participants</span>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-black line-clamp-3">
          <p>{event.description}</p>
        </div>

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
            Click to view participants →
          </p>
        </div>
      </CardContent>
    </Card>
  )
}