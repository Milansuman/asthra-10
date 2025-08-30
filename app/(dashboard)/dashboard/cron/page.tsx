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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Cron Jobs</h1>
          <p className="text-slate-600 mt-1">Manage and execute scheduled tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-slate-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Execute Cron Job</h3>
            <p className="text-slate-600 mb-4">Run scheduled maintenance and data processing tasks</p>

            <Button
              onClick={() => cronRun()}
              disabled={isPending}
              className="w-full"
            >
              {isPending ? (
                <>
                  <Loader className="animate-spin w-4 h-4 mr-2" />
                  Running...
                </>
              ) : (
                <>
                  Run Cron Job
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error.message}</p>
              </div>
            )}
          </div>
        </Card>

        <Card className="bg-white border-slate-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Job Results</h3>

            <div className="overflow-x-auto">
              <Table>
                <TableCaption className="text-slate-600">
                  {data ? "Recent cron job execution results" : "No recent executions"}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead className="text-right">Remark</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data && (data.success || data.failed) ? (
                    [...(data.success || []), ...(data.failed || [])].map((e: any) => (
                      <TableRow key={e.id}>
                        <TableCell className="font-medium">{e.eventName}</TableCell>
                        <TableCell>{e.amount}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${e.status === 'success'
                              ? 'bg-green-100 text-green-800'
                              : e.status === 'failed'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {e.status}
                          </span>
                        </TableCell>
                        <TableCell>{e.userName}</TableCell>
                        <TableCell className="text-right">{e.remark}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-slate-500 py-8">
                        {isPending ? "Loading..." : "No data available"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
