"use client";

import type { UserZodType } from "@/lib/validator";
import { columns } from "./_components/columns";
import { UsersTable } from "./_components/users-table";

import { api } from "@/trpc/react";

export default function Users() {
  const { data, isPending } = api.user.getUserList.useQuery();
  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-6rem)] p-6 overflow-hidden">
      <div className="-mx-6 px-6 overflow-x-auto">
        <UsersTable columns={columns} data={(data ?? []) as UserZodType[]} isPending={isPending} />
      </div>
    </div>
  )
}