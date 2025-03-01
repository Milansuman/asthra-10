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

export default function Page({ eventData }: { eventData: EventZodType }) {
    const { isPending, mutateAsync: addAttendance } = api.user.addAttendance.useMutation({
        onSuccess: () => {
            toast('Payment Success')
        },
        onError: (error) => {
            toast.error(`Payment Failed - ${error.data?.code}`, {
                description: error.message
            })
        }
    });
    return (
        <div className="container min-h-screen flex flex-col justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Coordinators - Attendence Tool
                    </CardTitle>
                    <CardDescription>
                        When students came to participate at venue, scan their profile QR
                    </CardDescription>
                    <CardDescription>
                        Each scan atleast required 2sec gap
                    </CardDescription>
                </CardHeader>
                <CardContent className='flex flex-row flex-wrap gap-4'>
                    <div className='relative bg-glass py-2 px-4 border-glass border'>
                        <p className='opacity-70 text-sm font-normal'>Event Name</p>
                        {eventData.name}
                    </div>

                    <div className='relative bg-glass py-2 px-4 border-glass border'>
                        <p className='opacity-70 text-sm font-normal'>Department</p>
                        {eventData.department}
                    </div>

                    <div className='relative bg-glass py-2 px-4 border-glass border'>
                        <p className='opacity-70 text-sm font-normal'>Event Type</p>
                        {eventData.eventType}
                    </div>

                    <div className='relative bg-glass py-2 px-4 border-glass border'>
                        <p className='opacity-70 text-sm font-normal'>Event Venue</p>
                        {eventData.venue}
                    </div>
                </CardContent>
                <CardFooter>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='glass' size={"glass"}>
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
                                            toast.error("Invalid Profile ID", {
                                                description: "Make sure the QR code is from profile a valid user"
                                            })
                                            return
                                        }

                                        addAttendance({
                                            userId: data,
                                            eventId: eventData.id
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