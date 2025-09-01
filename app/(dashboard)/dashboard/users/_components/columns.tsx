"use client";

import { ColumnDef } from "@tanstack/react-table";
import { userZod } from "@/lib/validator";
import { allRoles } from "@/logic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Plusbox from "@/components/madeup/box";

import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogClose, DialogTrigger, DialogDescription } from "@/components/ui/dialog";

import { Check, ChevronRight, QrCodeIcon } from "lucide-react";
import { toast } from "sonner";

import { api } from "@/trpc/react";
import { useState } from "react";

import { z } from "zod";
import QRCode from "react-qr-code";

const ROLE_OPTIONS = [
  'USER',
  'STUDENT_COORDINATOR',
  'FACULTY_COORDINATOR',
  'MANAGEMENT',
  'ADMIN',
  'DESK'
] as const;

type RoleType = typeof ROLE_OPTIONS[number];

export const columns: ColumnDef<z.infer<typeof userZod>>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email"
  },
  {
    header: "Phone",
    accessorKey: "number"
  },
  {
    header: "College",
    accessorKey: "college"
  },
  {
    header: "Department",
    accessorKey: "department"
  },
  {
    header: "Available Credits",
    cell: ({ row }) => {
      const { mutate: editAsthraCredits } = api.asthra.editAsthraCredits.useMutation();
      const [credits, setCredits] = useState(row.original.asthraCredit)

      return (
        <>
          {
            row.original.asthraPass ?
              <div className="flex flex-row gap-2">
                <Input defaultValue={credits} type="number" className="min-w-28 text-foreground" onChange={(event) => {
                  setCredits(Number(event.target.value));
                }} />
                <Button variant="outline" className="text-foreground" onClick={() => {
                  editAsthraCredits({
                    userId: row.original.id,
                    credits
                  }, {
                    onSuccess: () => {
                      toast("User credits edited successfully.")
                    }
                  })
                }}>
                  <Check />
                </Button>
              </div> :
              <p>{row.original.asthraCredit}</p>
          }
        </>
      )
    }
  },
  {
    header: "Registered Events",
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-foreground">View Events</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>View Registered Events</DialogTitle>
            </DialogHeader>
            <ListOfEvents userId={row.original.id} />
          </DialogContent>
        </Dialog>
      )
    }
  },
  {
    header: "Role",
    cell: ({ row }) => {
      const { mutate: editUser } = api.user.editUserRole.useMutation();
      return (
        <Select defaultValue={String(row.original.role)} onValueChange={(value: RoleType) => {
          editUser({
            role: value,
            userId: row.original.id
          }, {
            onError: (error) => toast("An error occurred", {
              description: error.message
            }),
            onSuccess: () => toast("Role changed successfully")
          })
        }}>
          <SelectTrigger className="text-foreground">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {
              ROLE_OPTIONS.map(role => (
                <SelectItem value={role} key={role}>{role}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      )
    }
  }
]

const ListOfEvents = ({ userId }: { userId: string }) => {
  const { data, isPending } = api.user.getUserRegisteredEvents.useQuery({
    userId
  });

  if (!data) return null

  const listOfEvents = data.map(e => ({
    ...e.userRegisteredEvent,
    name: e?.event?.name ?? "Unknown Event",
  }));

  return (
    <>
      {
        isPending ? <>
          {
            listOfEvents.length > 0 && (
              <CardContent>
                <CardTitle className="mb-3">Purchased Events</CardTitle>
                <Plusbox>
                  <Table>
                    <TableBody>
                      {listOfEvents.map((event, i) => (
                        <TableRow key={event.eventId}>
                          <TableCell>{event.name}</TableCell>
                          <TableCell>{event.status}</TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" className="text-foreground">
                                  View QR <QrCodeIcon />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Scan this QR to get Attendence</DialogTitle>
                                  <DialogDescription>
                                    Show this QR code to the venue staff or student coordinator to get your attendence for your participation.
                                  </DialogDescription>
                                  <DialogDescription>
                                    Certificate will be issued based on this attendence.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="p-4 bg-white">
                                  <QRCode
                                    size={256}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    value={event.registrationId}
                                    viewBox={"0 0 256 256"}
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" className="text-foreground">
                              Show Event <ChevronRight />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Plusbox>
              </CardContent>
            )
          }
        </> : <p>Loading...</p>
      }
    </>);
}