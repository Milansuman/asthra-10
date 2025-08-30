"use client"

import { trys } from '@/lib/utils';
import type { EventZodType } from '@/lib/validator';
import { api } from '@/trpc/react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { toast } from 'sonner';
import { z } from 'zod';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Page() {
  const { isPending, mutateAsync: addAttendance } = api.user.addAttendanceWithURE.useMutation({
    onSuccess: () => {
      toast.success('Attendance Successfully Taken', {
        style: {
          background: '#10b981',
          color: 'white',
          border: '1px solid #059669',
        },
      })
    },
    onError: (error) => {
      toast.error(`Attendance Failed - ${error.data?.code}`, {
        description: error.message,
        style: {
          background: '#ef4444',
          color: 'white',
          border: '1px solid #dc2626',
        },
      })
    }
  });
  return (
    <div className="container min-h-screen flex flex-col justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Coordinators - Universal Attendance Tool
          </CardTitle>
          <CardDescription>
            When students came to participate at venue, scan their QR from mail
          </CardDescription>
          <CardDescription>
            Each scan atleast required 2sec gap
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button asChild>
            <Link href="/dashboard/attendence/asthra">
              Go to Asthra Only Attendance
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/attendence/events">
              Go to Event Attendance
            </Link>
          </Button>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Open Scanner
              </Button>
            </DialogTrigger>
            <DialogContent className='w-fit'>
              <DialogHeader>
                <DialogTitle>Scan the QR</DialogTitle>
              </DialogHeader>
              <div className='w-96 aspect-square'>
                <Scanner
                  formats={
                    ["qr_code"]
                  }
                  classNames={{
                    container: 'p-0 qr-container',
                    video: 'w-full h-full'
                  }}
                  paused={isPending}
                  allowMultiple={true}

                  scanDelay={2000}
                  onScan={(results) => {
                    const result = results[0]
                    if (!result) return

                    const { isSuccess, data } = trys(() => z.string().uuid().parse(result.rawValue))

                    if (!isSuccess) {
                      toast.error("Invalid Registration ID", {
                        description: "Make sure the QR code is from user's mail box"
                      })
                      return
                    }

                    addAttendance({
                      registrationId: data
                    })
                  }}
                  onError={(error) => {
                    console.error(
                      error
                    )
                  }}
                />
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}