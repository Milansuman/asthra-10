"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import { getQrFromId } from "@/logic/qr";
import type { EventZodType } from "@/lib/validator";
import { env } from "@/env";

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
  const eventId = searchParams.get("eventId");

  return <>{eventId && <PreCheckOut eventId={eventId} />}</>;
}

function PreCheckOut({ eventId }: { eventId: string }) {
  const { data, error, isLoading } = api.sjcetPay.initiatePurchase.useQuery(
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
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const { transaction, event } = data;

  return (
    <CheckOut
      eventType={event.eventType}
      transactionId={transaction.id}
      amount={transaction.amount}
    />
  );
}

function CheckOut({
  transactionId,
  eventType,
  amount,
}: {
  transactionId: string;
  eventType: EventZodType["eventType"];
  amount: number;
}) {

  const getPaymentURL = (transactionId: string) => {
    const redirectUrl = new URL(`/payment/success/${transactionId}`, window.location.origin)

    const url = new URL("/asthra", env.NEXT_PUBLIC_SJCET_PAYMENT_LINK)

    url.searchParams.append(
      "amount",
      (amount * 100).toString()
    );

    url.searchParams.append(
      "redirect",
      redirectUrl.toString()
    );

    return url.toString();
  }

  return (
    <div className="w-full min-h-screen ambit p-2 flex flex-col gap-4  z-50">
      <Button link={getPaymentURL(transactionId)}>Pay</Button>
      <Dialog>
        <DialogTrigger>Pay at Front Desk</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan this QR at Front Desk</DialogTitle>
            <DialogDescription>
              Pay them with your preferred payment method. And scan the QR code
              at the Front Desk.
            </DialogDescription>
          </DialogHeader>
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 64,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              // need proper eventType here
              value={getQrFromId(transactionId, eventType)}
              viewBox={"0 0 256 256"}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
