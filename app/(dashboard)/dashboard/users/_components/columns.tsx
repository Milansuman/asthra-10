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
import { Check } from "lucide-react";
import { toast } from "sonner";

import { api } from "@/trpc/react";
import { useState } from "react";

import { z } from "zod";

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
    header: "Has AsthraPass?",
    accessorFn: row => `${row.asthraPass ? "yes" : "no"}`
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
                <Input defaultValue={credits} type="number" className="min-w-28" onChange={(event) => {
                  setCredits(Number(event.target.value));
                }} />
                <Button onClick={() => {
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
    header: "Role",
    cell: ({ row }) => {
      const { mutate: editUser } = api.user.editUserRole.useMutation();
      return (
        <Select defaultValue={row.original.role} onValueChange={(value: "USER" | "STUDENT_COORDINATOR" | "FACULTY_COORDINATOR" | "MANAGEMENT" | "ADMIN" | "DESK") => {
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
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {
              [...Object.keys(allRoles)].map(role => (
                <SelectItem value={role} key={role}>{role}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      )
    }
  }
]