'use client';

import { Button } from '@/components/ui/button';
import { defaultRazorpayOptions } from '@/logic';
import { api } from '@/trpc/react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import QRCode from "react-qr-code";
import { getQrFromId } from '@/logic/qr';

// ?eventId=""
export default function Home() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}

function Page() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');

  return <>{eventId && <PreCheckOut eventId={eventId} />}</>;
}

function PreCheckOut({ eventId }: { eventId: string }) {
  const {
    data: transaction,
    error,
    isLoading,
  } = api.transaction.initiatePurchase.useQuery(
    {
      eventId,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      staleTime: Number.POSITIVE_INFINITY,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!transaction) {
    return <div>No data</div>;
  }

  return (
    <CheckOut
      transactionId={transaction.id}
      orderId={transaction.orderId}
      amount={transaction.amount}
    />
  );
}

function CheckOut({
  transactionId,
  orderId,
  amount,
}: {
  transactionId: string;
  orderId: string;
  amount: number;
}) {
  const { data: successData, mutateAsync: successFunction } =
    api.transaction.successPurchase.useMutation();
  const { data: failedData, mutateAsync: failedFunction } =
    api.transaction.failedPurchase.useMutation();

  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const paymentObject = new window.Razorpay({
        ...defaultRazorpayOptions,

        amount: amount * 100,
        order_id: orderId,

        handler: (response) => {
          console.log(response);
          successFunction({
            id: transactionId,
            orderId: orderId,
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });
        },
      });
      paymentObject.on('payment.failed', (response) => {
        console.log(response);
        // @ts-ignore
        console.log(response?.error?.description);
        failedFunction({
          id: transactionId,
        });
      });
      paymentObject.open();
    } catch (error) {
      console.error(error);
      failedFunction({
        id: transactionId,
      });
    }
  };

  return (
    <>
      {JSON.stringify(successData)}
      {JSON.stringify(failedData)}

      <form onSubmit={processPayment}>
        <Button type="submit">Pay</Button>
      </form>
      <Dialog>
        <DialogTrigger>Pay at Front Desk</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan this QR at Front Desk</DialogTitle>
            <DialogDescription>
              Pay them with your preferred payment method. And scan the QR code at the Front Desk.
            </DialogDescription>
          </DialogHeader>
          <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}

              // need proper eventType here
              value={getQrFromId(transactionId, "ASTHRA_PASS")}
              viewBox={"0 0 256 256"}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
