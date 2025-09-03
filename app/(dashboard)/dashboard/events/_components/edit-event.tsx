'use client';
import { AddNewCard, AsthraCard } from '@/components/madeup/card';
import { useState } from 'react';
import type { z } from 'zod';

import type { eventZod } from '@/lib/validator';
import { allDepartments } from '@/logic';

import { api } from '@/trpc/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

type Department = keyof typeof allDepartments;

type Props = {
  data: z.infer<typeof eventZod>[];
  departments: Department[];
  categories?: string[]; // We'll keep this for compatibility but no longer use it
};

export function EventEditPage({ data, departments }: Props) {
  const deleteEventMutation = api.event.deleteEvent.useMutation();
  const latestEventsQuery = api.event.getAll.useQuery();
  const [localData, setLocalData] = useState(data);

  // Filtering states
  const [department, setDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const onDelete = (id: string) => {
    deleteEventMutation.mutate({ id }, {
      onSuccess: (data) => {
        if (!data) return;
        setLocalData(prevData => prevData.filter(event => event.id !== data[0]?.deletedId))
      }
    })
  }

  const onChangeEvent = async () => {
    const data = await latestEventsQuery.refetch()
    setLocalData(data.data ?? []);
  }

  // Filter by department
  const isDepartment = (event: z.infer<typeof eventZod>) => {
    if (department === 'all' || event.department === department) {
      return true;
    }
    return false;
  };

  // Filter by search query
  const matchesSearchQuery = (event: z.infer<typeof eventZod>) => {
    if (!searchQuery.trim()) return true;

    return event.name?.toLowerCase().includes(searchQuery.toLowerCase());
  };

  // Filter by status
  const matchesStatusFilter = (event: z.infer<typeof eventZod>) => {
    if (statusFilter === 'all') return true;
    return event.eventStatus === statusFilter;
  };

  // Filter the events based on department, search query, and status
  const filteredEvents = localData.filter(
    (event) => isDepartment(event) && matchesSearchQuery(event) && matchesStatusFilter(event)
  );

  return (
    <div className="flex flex-col gap-8 p-8 min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Events</h1>
        <p className="text-gray-600">Manage and update your events</p>
      </div>

      {/* Filtering UI */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center bg-white p-6 rounded-lg shadow-sm border">
        {/* Search input */}
        <Input
          type="text"
          placeholder="Search events by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-72"
        />

        {/* Department filter */}
        <Select
          onValueChange={(value) => setDepartment(value)}
          defaultValue="all"
        >
          <SelectTrigger className="w-fit text-center">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {Object.entries(allDepartments)
              .map(([dep, full]) => (
                <SelectItem key={dep} value={dep}>
                  {full}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {/* Status filter */}
        <Select
          onValueChange={(value) => setStatusFilter(value)}
          defaultValue="all"
        >
          <SelectTrigger className="w-fit text-center">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Events ({filteredEvents.length + 1})
          </h2>
        </div>
        <div className="flex flex-row gap-2 flex-wrap">
          <AddNewCard onChangeEvent={onChangeEvent} />
          {filteredEvents.map(event => (
            <AsthraCard key={event.id} data={event} onDelete={onDelete} onChangeEvent={onChangeEvent} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const EditEvent = () => {
  return <div>EditEvent</div>;
};

export const DeleteEvent = () => {
  return <div>DeleteEvent</div>;
};