'use client';

import type { AllDepartments } from '@/logic';
import { api } from '@/trpc/react';
import { EventEditPage } from '../_components/edit-event';

export default function Home() {
  const { data, isLoading } = api.event.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-white"></div>
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const departments = [
    ...new Set(data.map((e) => e.department)),
  ] as AllDepartments[];

  return (
    <>
      <EventEditPage departments={departments} data={data} />
    </>
  );
}