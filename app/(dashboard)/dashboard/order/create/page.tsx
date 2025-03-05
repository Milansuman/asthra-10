"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

import type { EventZodType, TransactionZodType } from '@/lib/validator';
import { ASTHRA } from '@/logic';

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { api } from '@/trpc/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from 'sonner';



export default function Page() {
  const { data: events, isLoading } = api.event.getAll.useQuery()
  const [email, setEmail] = useState('')
  const [orderId, setOrderId] = useState('')
  const [event, setEvent] = useState<string>("")
  const [open, setOpen] = useState(false)
  const { data: transactions, mutateAsync, error } = api.management.initiateStatic.useMutation({
    onSuccess: () => {
      toast('Payment Initiated')
    },
    onError: (error) => {
      toast.error(`Payment Init Failed - ${error.data?.code}`, {
        description: error.message
      })
    }
  })

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
          <CardDescription>
            {error?.message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder='Email ID'
            value={email}
            required
            className='h-16 md:text-xl'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder='Order ID'
            value={orderId}
            className='h-16 md:text-xl'
            onChange={(e) => setOrderId(e.target.value)}
          />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                disabled={isLoading}
                variant="glass"
                aria-expanded={open}
                className="h-16 w-full"
              >
                {event && events
                  ? events.find((e) => e.id === event)?.name
                  : "Select Event..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command className='text-glass'>
                <CommandInput required placeholder="Search Events..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No event found.</CommandEmpty>
                  {events && <CommandGroup>
                    {events.map((e) => (
                      <CommandItem
                        className='text-glass'
                        key={e.id}
                        value={e.name ?? e.description ?? e.department}
                        onSelect={(currentEvent) => {
                          setEvent(e.id)
                          setOpen(false)
                        }}
                      >
                        {e.name} <br />
                        <span className='text-xs text-gray-400'>
                          {e.department} (${e.amount})
                        </span>
                        <Check
                          className={cn(
                            "ml-auto",
                            event === e.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </CardContent>
        <Dialog open={!!transactions}>
          <DialogContent className='max-w-screen max-h-screen overflow-scroll'>
            {transactions?.transaction && <DialogCard transaction={transactions?.transaction} />}
          </DialogContent>
        </Dialog>
        <CardFooter>
          <Button variant={"glass"} onClick={() => mutateAsync({
            email, id: event
          })}>
            Create Transactions
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

const DialogCard = ({ transaction }: { transaction: TransactionZodType }) => {
  const { isPending, mutateAsync, data } = api.sjcetPay.forceSuccessPurchase.useMutation({
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
    <>
      <DialogHeader>
        <DialogTitle>Transactions Initializer</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        {JSON.stringify(transaction, null, 2)}
      </DialogDescription>
      <DialogDescription>
        {data && JSON.stringify(data, null, 2)}
      </DialogDescription>
      <DialogFooter>
        <Button
          onClick={() => {
            mutateAsync({
              orderId: transaction.orderId
            })
          }}
        >
          Complete Transactions
        </Button>
      </DialogFooter>
    </>
  );
}