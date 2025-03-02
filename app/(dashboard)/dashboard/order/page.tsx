"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { api } from '@/trpc/react';
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
import { columns } from './_components/table';
import { DataTable } from '@/components/madeup/table';

export default function Page() {
  const [email, setEmail] = useState('')
  return (
    <div className="container min-h-screen flex flex-col justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Management - SJCET Pay
          </CardTitle>
          <CardDescription>
            Check Payments & Force Success
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder='Email ID'
            value={email}
            className='h-16 md:text-xl'
            onChange={(e) => setEmail(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger>
              <Button>Search</Button>
            </DialogTrigger>
            <DialogContent className='max-w-screen'>
              <DialogCard email={email} />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}

const DialogCard = ({ email }: { email: string }) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Transactions</DialogTitle>
      </DialogHeader>
      <SuccessCard email={email} />
    </>
  );
}

function SuccessCard({ email }: { email: string }) {
  const { data, isLoading, error, refetch } = api.management.getUserAndOrders.useQuery({
    email
  })

  const { isPending, mutateAsync, data: paymentSuccess } = api.sjcetPay.forceSuccessPurchase.useMutation({
    onSuccess: () => {
      toast('Payment Success')
      refetch()
    },
    onError: (error) => {
      toast.error(`Payment Failed - ${error.data?.code}`, {
        description: error.message
      })
    }
  });

  if (isLoading) return ("loading")
  if (isPending) return ("force successing")

  if (!data || error) return "Not Found"

  return (
    <>
      <CardDescription>
        {JSON.stringify(data.user, null, 2)}
      </CardDescription>
      {paymentSuccess && <CardDescription>
        {JSON.stringify(paymentSuccess, null, 2)}
      </CardDescription>}
      <CardContent className='max-h-screen overflow-y-scroll'>
        <DataTable data={data.transactions} columns={
          columns((id) => mutateAsync({ id, orderId: id }))
        } />
      </CardContent>
    </>
  )
}
