'use client';
import { AddNewCard, AsthraCard } from '@/components/madeup/card';
import { useState } from 'react';
import type { z } from 'zod';
import { SearchIcon } from 'lucide-react';

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
    <div className="space-y-6 p-6 md:p-8 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Event Management</h1>
          <p className="text-slate-600 mt-1">Create and manage events for Asthra 9</p>
        </div>
      </div>

      {/* Filtering UI */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1 min-w-0">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search events by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-slate-300"
            />
          </div>

          <div className="flex gap-2 shrink-0">
            {/* Department filter */}
            <Select
              onValueChange={(value) => setDepartment(value)}
              defaultValue="all"
            >
              <SelectTrigger className="w-48 bg-white border-slate-300">
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
              <SelectTrigger className="w-32 bg-white border-slate-300">
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
        </div>

        {filteredEvents.length > 0 && (
          <div className="mt-4 text-sm text-slate-600">
            Showing {filteredEvents.length} of {localData.length} events
          </div>
        )}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AddNewCard onChangeEvent={onChangeEvent} />
        {
          filteredEvents.map(event => (
            <AsthraCard key={event.id} data={event} onDelete={onDelete} onChangeEvent={onChangeEvent} />
          ))
        }
      </div>

      {filteredEvents.length === 0 && searchQuery && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
          <p className="text-slate-500 text-lg">No events found matching "{searchQuery}"</p>
          <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

export const EditEvent = () => {
  return <div>EditEvent</div>;
};

export const DeleteEvent = () => {
  return <div>DeleteEvent</div>;
};
