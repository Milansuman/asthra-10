'use client';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { api } from '@/trpc/react';
import { ChevronRight, Loader } from 'lucide-react';

export default function Page() {
  const {
    mutateAsync: cronRun,
    data,
    isPending,
    error,
  } = api.cron.runCron.useMutation();
  return (
    <>
      <div className="flex w-screen flex-col items-center justify-center gap-20 py-44 align-middle">
        <Card>
          <Button onClick={() => cronRun()}>
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                Run Cron Job <ChevronRight />
              </>
            )}
          </Button>
        </Card>

        <Card>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Event Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead className="text-right">Remark</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                [...data.success, ...data.failed].map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.eventName}</TableCell>
                    <TableCell>{e.amount}</TableCell>
                    <TableCell>{e.status}</TableCell>
                    <TableCell>{e.userName}</TableCell>
                    <TableCell className="text-right">{e.remark}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <CardFooter>
            <CardDescription>
              {error && <p className="text-red-500">{error.message}</p>}
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
