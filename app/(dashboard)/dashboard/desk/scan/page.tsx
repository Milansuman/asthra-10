"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { trys } from '@/lib/utils';
import { api } from '@/trpc/react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Page() {
  const { isPending, mutateAsync } = api.sjcetPay.forceSuccessPurchase.useMutation({
    onSuccess: () => {
      toast('Payment Success')
    },
    onError: (error) => {
      toast.error(`Payment Failed - ${error.data?.code}`, {
        description: error.message
      })
    }
  });

  const [orderId, setOrderId] = useState('')

  return (
    <div className="container min-h-screen flex flex-col justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Front Desk - Force Payment Successor
          </CardTitle>
          <CardDescription>
            Let the user initiate purchase on their phone and scan their QR of 'Pay at Venue'
          </CardDescription>
          <CardDescription>
            Each scan atleast required 5sec gap
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder='Order ID'
            value={orderId}
            className='h-16 md:text-xl'
            onChange={(e) => setOrderId(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button disabled={orderId.length === 0} variant='glass' size={"glass"}>
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
                  scanDelay={5000}
                  onScan={(results) => {
                    const result = results[0]
                    if (!result) return

                    const { isSuccess, data, error } = trys(() => result.rawValue)

                    if (!isSuccess) {
                      toast.error(error.title, {
                        description: error.message
                      })
                      return
                    }

                    mutateAsync({
                      id: data,
                      orderId
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
