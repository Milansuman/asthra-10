"use client";

import { columns } from "./_components/columns";
import { userZod } from "@/lib/validator";
import { UsersTable } from "./_components/users-table";
import { z } from "zod";

import { api } from "@/trpc/react";

export default function Users() {
  const { data, isPending } = api.user.getUserList.useQuery();
  return (
    <div className="flex flex-col w-screen min-h-screen p-6">
      <UsersTable columns={columns} data={(data ?? []) as z.infer<typeof userZod>[]} isPending={isPending} />
    </div>
  )
}