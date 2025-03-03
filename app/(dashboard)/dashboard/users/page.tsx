"use client";

import type { UserZodType } from "@/lib/validator";
import { columns } from "./_components/columns";
import { UsersTable } from "./_components/users-table";

import { api } from "@/trpc/react";

export default function Users() {
  const { data, isPending } = api.user.getUserList.useQuery();
  return (
    <div className="flex flex-col w-screen min-h-screen p-6">
      <UsersTable columns={columns} data={(data ?? []) as UserZodType[]} isPending={isPending} />
    </div>
  )
}