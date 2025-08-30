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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Payment Management</h1>
          <p className="text-slate-600 mt-1">Check payments and manage transactions</p>
        </div>
        <Button link="/dashboard/order/create">
          Create Order
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">SJCET Pay Management</CardTitle>
            <CardDescription className="text-slate-600">
              Check payment status and force success for failed transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder='Enter Email ID'
              value={email}
              className='bg-white border-slate-300'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='Enter Order ID'
              value={orderId}
              className='bg-white border-slate-300'
              onChange={(e) => setOrderId(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Search Transactions</Button>
              </DialogTrigger>
              <DialogContent className='max-w-4xl max-h-[80vh] overflow-hidden'>
                <DialogCard orderId={orderId} email={email} />
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Quick Actions</CardTitle>
            <CardDescription className="text-slate-600">
              Common payment management tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" link="/dashboard/order/create">
              Create New Order
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Export Transactions
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Payment Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const DialogCard = ({ email, orderId }: { email: string, orderId: string }) => {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-slate-900">Transaction Details</DialogTitle>
        <DialogDescription className="text-slate-600">
          View and manage payment transactions
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        {email && email.length > 0 && <SuccessCardEmail email={email} />}
        {orderId && orderId.length > 0 && <SuccessCardOrder orderId={orderId} />}

        {(!email || email.length === 0) && (!orderId || orderId.length === 0) && (
          <div className="text-center py-8">
            <p className="text-slate-500">Please enter an email or order ID to search</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SuccessCardOrder({ orderId }: { orderId: string }) {
  const { data, isLoading, error, refetch } = api.management.getOrderAndUser.useQuery({
    orderId
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

  if (isLoading) return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-900"></div>
      <span className="ml-2 text-slate-600">Loading...</span>
    </div>
  )

  if (isPending) return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-900"></div>
      <span className="ml-2 text-slate-600">Processing payment...</span>
    </div>
  )

  if (!data || error) return (
    <div className="text-center py-8">
      <p className="text-red-600">{error?.message ?? "Order not found"}</p>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 p-4 rounded-lg">
        <h3 className="font-medium text-slate-900 mb-2">User Details</h3>
        <pre className="text-sm text-slate-600 whitespace-pre-wrap">
          {JSON.stringify(data.user, null, 2)}
        </pre>
      </div>

      {paymentSuccess && (
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-medium text-green-900 mb-2">Payment Success</h3>
          <pre className="text-sm text-green-600 whitespace-pre-wrap">
            {JSON.stringify(paymentSuccess, null, 2)}
          </pre>
        </div>
      )}

      <div className="max-h-96 overflow-y-auto">
        <DataTable
          data={data.transactions}
          columns={columns((id) => mutateAsync({ orderId: id }))}
        />
      </div>
    </div>
  )
}
function SuccessCardEmail({ email }: { email: string }) {
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

  if (isLoading) return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-900"></div>
      <span className="ml-2 text-slate-600">Loading...</span>
    </div>
  )

  if (isPending) return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-900"></div>
      <span className="ml-2 text-slate-600">Processing payment...</span>
    </div>
  )

  if (!data || error) return (
    <div className="text-center py-8">
      <p className="text-red-600">{error?.message ?? "User not found"}</p>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 p-4 rounded-lg">
        <h3 className="font-medium text-slate-900 mb-2">User Details</h3>
        <pre className="text-sm text-slate-600 whitespace-pre-wrap">
          {JSON.stringify(data.user, null, 2)}
        </pre>
      </div>

      {paymentSuccess && (
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-medium text-green-900 mb-2">Payment Success</h3>
          <pre className="text-sm text-green-600 whitespace-pre-wrap">
            {JSON.stringify(paymentSuccess, null, 2)}
          </pre>
        </div>
      )}

      <div className="max-h-96 overflow-y-auto">
        <DataTable
          data={data.transactions}
          columns={columns((id) => mutateAsync({ orderId: id }))}
        />
      </div>
    </div>
  )
}
