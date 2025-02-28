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
  const latestEventsQuery = api.event.getLatest.useQuery();
  const [localData, setLocalData] = useState(data);

  // Filtering states
  const [department, setDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    setLocalData(latestEventsQuery.data ?? []);
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

  // Filter the events based on both department and search query
  const filteredEvents = localData.filter(
    (event) => isDepartment(event) && matchesSearchQuery(event)
  );

  return (
    <div className="flex flex-col gap-5 p-10 min-h-screen">
      <h4>Edit Events</h4>

      {/* Filtering UI */}
      <div className="flex flex-row gap-4 justify-center z-10 items-center">
        {/* Search input */}
        <Input
          type="text"
          placeholder="Search events by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-glass border border-glass w-72"
        />

        {/* Department filter */}
        <Select
          onValueChange={(value) => setDepartment(value)}
          defaultValue="all"
        >
          <SelectTrigger className="w-fit text-center bg-glass border border-glass">
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
      </div>

      <div className="flex flex-row gap-3 flex-wrap">
        <AddNewCard onChangeEvent={onChangeEvent} />
        {
          filteredEvents.map(event => (
            <AsthraCard key={event.id} data={event} onDelete={onDelete} onChangeEvent={onChangeEvent} />
          ))
        }
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
