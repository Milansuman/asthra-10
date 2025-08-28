"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

import { userZod } from "@/lib/validator"
import { z } from "zod"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<z.infer<typeof userZod>>[]
  data: z.infer<typeof userZod>[],
  isPending: boolean
}

export function UsersTable<TData, TValue>({
  columns,
  data,
  isPending
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState<any>("")
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    state: {
      globalFilter,
    },
  })

  return (
    <div className="w-full">
      {/*WHY TF WON"T THIS WORK AHHHHHHHHHHH */}
      {/* <div className="flex items-center py-4">
        <Input
          value={globalFilter}
          onChange={e => {
            setGlobalFilter(String(e.target.value));
            table.setGlobalFilter(String(e.target.value))
          }}
          placeholder="Search..."
          className="max-w-sm"
        />
      </div> */}
      <div className="border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {
                    isPending ? "Loading..." : "No results."
                  }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
