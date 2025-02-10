'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, EyeIcon } from 'lucide-react';

import type { EventListType } from '@/server/db/schema';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { DeleteEvent, EditEvent } from './edit-event';

// import { DeleteUser } from './delete-user';
// import { EditUser } from './edit-user';

export const event_columns: ColumnDef<EventListType>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center gap-3 capitalize">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <span className="line-clamp-1">{row.getValue('name')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'department',
    header: () => {
      return <div>Department</div>;
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('department')}</div>
    ),
  },
  {
    accessorKey: 'venue',
    header: () => {
      return <div>Venue</div>;
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('venue')}</div>,
  },
  {
    accessorKey: 'regCount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Count
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue('regCount')}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original;
      return (
        <div className="flex gap-3 justify-end items-center">
          <Dialog>
            <DialogTrigger>
              <EyeIcon />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Details</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <pre>{JSON.stringify(event, null, 2)}</pre>
            </DialogContent>
          </Dialog>
          <EditEvent />
          <DeleteEvent />
        </div>
      );
    },
  },
];
