"use client";

import { ColumnDef } from "@tanstack/react-table";
import { eventZod, userRegisteredEventZod, userZod } from "@/lib/validator";
import { z } from "zod";
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { QrCode as QrCodeIcon } from "lucide-react";
import QRCode from "react-qr-code";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type TableType = {
  event: z.infer<typeof eventZod> | null,
  userRegisteredEvent: z.infer<typeof userRegisteredEventZod>,
  user: z.infer<typeof userZod> | null
}

export const columns: ColumnDef<TableType>[] = [
  {
    header: "Name",
    cell: ({ row }) => {
      const userId = row.original.user?.id || "";
      const userName = row.original.user?.name || "Unknown";

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="p-0 h-auto flex items-center gap-2 text-white">
              {userName} <QrCodeIcon size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-glass">
            <DialogHeader>
              <DialogTitle>{userName}'s QR Code</DialogTitle>
              <DialogDescription className="text-white">
                Use this QR code to verify the user's identity or track attendance.
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 rounded-md bg-white">
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={userId}
                viewBox={"0 0 256 256"}
              />
            </div>
          </DialogContent>
        </Dialog>
      );
    }
  },
  {
    header: "Email",
    accessorFn: row => `${row.user?.email}`
  },
  {
    header: "Phone",
    accessorFn: row => `${row.user?.number}`
  },
  {
    header: "Has AsthraPass",
    accessorFn: row => `${row.user?.asthraPass}`
  },
  {
    header: "College",
    accessorFn: row => `${row.user?.college}`
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const [status, setStatus] = useState(row.original.userRegisteredEvent.status || "registered");

      const handleStatusChange = async (value: "registered" | "attended" | "certified") => {
        setStatus(value);
        try {
          // Here you would typically make an API call to update the status
          // Example:
          // await fetch(`/api/events/${row.original.event?.id}/registrations/${row.original.userRegisteredEvent.id}`, {
          //   method: 'PATCH',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ status: value }),
          // });

          console.log(`Updated status to ${value} for user ${row.original.user?.id} in event ${row.original.event?.id}`);
        } catch (error) {
          console.error("Failed to update status:", error);
          // Optionally revert the status on error
          setStatus(row.original.userRegisteredEvent.status || "registered");
        }
      };

      return (
        <Select
          defaultValue={status}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="registered">Registered</SelectItem>
            <SelectItem value="attended">Attended</SelectItem>
          </SelectContent>
        </Select>
      )
    }
  }
]