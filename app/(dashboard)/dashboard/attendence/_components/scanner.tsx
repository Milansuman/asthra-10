"use client"

import { trys } from '@/lib/utils';
import type { EventZodType } from '@/lib/validator';
import { api } from '@/trpc/react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { toast } from 'sonner';
import { z } from 'zod';

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
        <main className="flex flex-col h-screen text-white p-6">
            <h3>Coordinators - Attendence Tool</h3>
            <p>When students came to participate at venue, scan their profile QR</p>
            <p>Each scan atleast required 2sec gap</p>
            {JSON.stringify(eventData)}
            <div className='w-96 aspect-square'>
                <Scanner
                    formats={
                        ["qr_code"]
                    }
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
        </main>
    )
}