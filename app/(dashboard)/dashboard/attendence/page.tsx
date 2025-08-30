"use client"

import { trys } from '@/lib/utils';
import type { EventZodType } from '@/lib/validator';
import { api } from '@/trpc/react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { toast } from 'sonner';
import { z } from 'zod';
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
      toast('Attendance Successfully Recorded')
    },
    onError: (error) => {
      toast.error(`Attendance Failed - ${error.data?.code}`, {
        description: error.message
      })
    }
  });

  return (
    <div className="flex flex-col space-y-6 flex-1">
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Attendance Scanner</h1>
          <p className="text-slate-600 mt-1">Universal attendance tool for event participation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <Card className="bg-white border-slate-200 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="text-slate-900">Universal Attendance Tool</CardTitle>
            <CardDescription className="text-slate-600">
              When students come to participate at the venue, scan their QR code from email confirmation
            </CardDescription>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
              <p className="text-yellow-800 text-sm font-medium">
                ⚠️ Each scan requires at least 2 seconds gap between scans
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              link="/dashboard/attendence/asthra"
              className="w-full"
              variant="outline"
            >
              Go to Asthra-Only Attendance
            </Button>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  Start QR Scanner
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-slate-900">QR Code Scanner</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-slate-600 text-sm">
                      Position the QR code within the scanner frame. The scanner will automatically detect and process valid registration codes.
                    </p>
                  </div>

                  <div className="w-96 aspect-square mx-auto bg-black rounded-lg overflow-hidden">
                    <Scanner
                      formats={["qr_code"]}
                      classNames={{
                        container: 'p-0 qr-container',
                        video: 'w-full h-full object-cover'
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
                            description: "Make sure the QR code is from user's mailbox"
                          })
                          return
                        }

                        addAttendance({
                          registrationId: data
                        })
                      }}
                      onError={(error) => {
                        console.error(error)
                        toast.error("Scanner Error", {
                          description: "Unable to access camera. Please check permissions."
                        })
                      }}
                    />
                  </div>

                  {isPending && (
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 text-slate-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900"></div>
                        Processing attendance...
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Quick Actions</CardTitle>
            <CardDescription className="text-slate-600">
              Common attendance management tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" link="/dashboard/attendence/asthra">
              Asthra Attendance
            </Button>
            <Button variant="outline" className="w-full justify-start">
              View Attendance Reports
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Export Attendance Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}