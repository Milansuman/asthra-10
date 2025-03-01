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
import { toast } from "sonner";

import { api } from "@/trpc/react";

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