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
      toast('Attendence Succefully Taken')
    },
    onError: (error) => {
      toast.error(`Attendence Failed - ${error.data?.code}`, {
        description: error.message
      })
    }
  });
  return (
    <div className="container min-h-screen flex flex-col justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Coordinators - Universal Attendence Tool
          </CardTitle>
          <CardDescription>
            When students came to participate at venue, scan their QR from mail
          </CardDescription>
          <CardDescription>
            Each scan atleast required 2sec gap
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button link="/dashboard/attendence/asthra">
            Go to Asthra Only Attendence
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