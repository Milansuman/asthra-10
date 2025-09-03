"use client";

import { ColumnDef } from "@tanstack/react-table";
import { eventZod, userRegisteredEventZod, userZod } from "@/lib/validator";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
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

import { toast } from "sonner";

import { api } from "@/trpc/react";

export type TableType = {
  event: z.infer<typeof eventZod> | null;
  userRegisteredEvent: z.infer<typeof userRegisteredEventZod>;
  user: z.infer<typeof userZod> | null;
};

export const columns: ColumnDef<TableType>[] = [
  {
    header: "Name",
    cell: ({ row }) => {
      const userId = row.original.user?.id || "";
      const userName = row.original.user?.name || "Unknown";
      const user = row.original.user;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="p-0 h-auto flex items-center gap-2 text-white"
            >
              {userName} <QrCodeIcon size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{userName}'s Profile</DialogTitle>
              <DialogDescription className="text-white">
                User details and QR code for verification
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col md:flex-row gap-6 mt-4">
              {/* User Details Section */}
              <div className="flex-1 space-y-4 text-white">
                <h3 className="text-lg font-medium border-b pb-2">
                  User Information
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Name:</span>
                    <span>{user?.name || "Not provided"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span>{user?.email || "Not provided"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Phone:</span>
                    <span>{user?.number || "Not provided"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">College:</span>
                    <span>{user?.college || "Not provided"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Department:</span>
                    <span>{user?.department || "Not provided"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Year:</span>
                    <span>{user?.year || "Not provided"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">KTU ID:</span>
                    <span>{user?.KTU || "Not provided"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Available Credits:</span>
                    <span>{user?.asthraCredit ?? 0}</span>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="flex-1 flex flex-col items-center">
                <h3 className="text-lg font-medium text-white mb-4">QR Code</h3>
                <div className="p-4 rounded-md bg-white">
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={userId}
                    viewBox={"0 0 256 256"}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    header: "Email",
    accessorFn: (row) => `${row.user?.email}`,
  },
  {
    header: "Phone",
    accessorFn: (row) => `${row.user?.number}`,
  },
  {
    header: "Has AsthraPass",
    accessorFn: (row) => `${row.user?.asthraPass}`,
  },
  {
    header: "College",
    accessorFn: (row) => `${row.user?.college}`,
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const [status, setStatus] = useState<string>(
        (row.original.userRegisteredEvent.status as string) || "registered",
      );
      const { mutate } = api.spot.updateParticipantStatus.useMutation();

      const handleStatusChange = async (
        value: "registered" | "attended" | "certified",
      ) => {
        setStatus(value);

        try {
          mutate(
            {
              registrationId: row.original.userRegisteredEvent.registrationId,
              status: value,
            },
            {
              onError: (error) =>
                toast.error("An error occurred", {
                  description: error.message,
                }),
              onSuccess: () => toast("Status changed successfully"),
            },
          );
        } catch (error) {
          console.error("Failed to update status:", error);
          // Optionally revert the status on error
          setStatus((row.original.userRegisteredEvent.status as string) || "registered");
        }
      };

      return (
        <Select defaultValue={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="registered">Registered</SelectItem>
            <SelectItem value="attended">Attended</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
];
