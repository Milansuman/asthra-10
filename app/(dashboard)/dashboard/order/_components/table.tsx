"use client"

import type {
    ColumnDef
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import type { TransactionZodType } from "@/lib/validator"

export type Payment = TransactionZodType

export const columns = (forceSuccess: (orderId: string) => void): ColumnDef<Payment>[] => [
    {
        accessorKey: "id",
        header: "Trnx Id",
        cell: ({ row }) => (
            <div>{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "orderId",
        header: "Order ID",
        cell: ({ row }) => (
            <div>{row.getValue("orderId")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "remark",
        cell: ({ row }) => (
            <div>{row.getValue("remark")}</div>
        ),
        enableSorting: true,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Remark
                    <ArrowUpDown />
                </Button>
            )
        },
    },
    {
        accessorKey: "eventName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Event Name
                    <ArrowUpDown />
                </Button>
            )
        },
        enableSorting: true,
        cell: ({ row }) => <div className="lowercase">{row.getValue("eventName")}</div>,
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Amount
                    <ArrowUpDown />
                </Button>
            )
        },
        enableSorting: true,
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("amount"))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "IND",
            }).format(amount)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.orderId)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => forceSuccess(payment.orderId)}
                        >
                            Success
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
] satisfies ColumnDef<Payment>[]