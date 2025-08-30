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
  const [orderId, setOrderId] = useState('')
  return (
    <div className="container h-screen flex flex-col justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Management - SJCET Pay
          </CardTitle>
          <CardDescription>
            Check Payments & Force Success
          </CardDescription>
          <Button variant={"ghost"} link="/dashboard/order/create">
            Initiate Transactions &gt;
          </Button>
        </CardHeader>
        <CardContent>
          <Input
            placeholder='Email ID'
            value={email}
            className='h-16 md:text-xl'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder='OrderId ID'
            value={orderId}
            className='h-16 md:text-xl'
            onChange={(e) => setOrderId(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger>
              <Button>Search</Button>
            </DialogTrigger>
            <DialogContent className='max-w-screen max-h-screen overflow-scroll'>
              <DialogCard orderId={orderId} email={email} />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}

const DialogCard = ({ email, orderId }: { email: string, orderId: string }) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Transactions</DialogTitle>
      </DialogHeader>
      {email && email.length > 0 && <SuccessCardEmail email={email} />}
      {orderId && orderId.length > 0 && <SuccessCardOrder orderId={orderId} />}
    </>
  );
}

function SuccessCardOrder({ orderId }: { orderId: string }) {
  const { data, isLoading, error, refetch } = api.management.getOrderAndUser.useQuery({
    orderId
  })

  const { isPending, mutateAsync, data: paymentSuccess } = api.sjcetPay.forceSuccessPurchase.useMutation({
    onSuccess: () => {
      toast.success('Payment Success', {
        style: {
          background: '#10b981',
          color: 'white',
          border: '1px solid #059669',
        },
      })
      refetch()
    },
    onError: (error) => {
      toast.error(`Payment Failed - ${error.data?.code}`, {
        description: error.message,
        style: {
          background: '#ef4444',
          color: 'white',
          border: '1px solid #dc2626',
        },
      })
    }
  });

  if (isLoading) return ("loading")
  if (isPending) return ("force successing")

  if (!data || error) return error?.message ?? "Not Found"

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
          columns((id) => mutateAsync({ orderId: id }))
        } />
      </CardContent>
    </>
  )
}
function SuccessCardEmail({ email }: { email: string }) {
  const { data, isLoading, error, refetch } = api.management.getUserAndOrders.useQuery({
    email
  })

  const { isPending, mutateAsync, data: paymentSuccess } = api.sjcetPay.forceSuccessPurchase.useMutation({
    onSuccess: () => {
      toast.success('Payment Success', {
        style: {
          background: '#10b981',
          color: 'white',
          border: '1px solid #059669',
        },
      })
      refetch()
    },
    onError: (error) => {
      toast.error(`Payment Failed - ${error.data?.code}`, {
        description: error.message,
        style: {
          background: '#ef4444',
          color: 'white',
          border: '1px solid #dc2626',
        },
      })
    }
  });

  if (isLoading) return ("loading")
  if (isPending) return ("force successing")

  if (!data || error) return error?.message ?? "Not Found"

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
          columns((id) => mutateAsync({ orderId: id }))
        } />
      </CardContent>
    </>
  )
}
