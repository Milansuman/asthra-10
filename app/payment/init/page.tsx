"use client";

import Plusbox from "@/components/madeup/box";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { env } from "@/env";
import { asthraNotStarted } from "@/logic/moods";
import { api } from "@/trpc/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import QRCode from "react-qr-code";

// ?eventId=""
export default function Home() {
  return (
    <div className="container min-h-screen flex flex-col justify-center items-center">
      <Card>
        <PDFDialog />
        <Suspense fallback={
          <CardHeader>
            <CardTitle>
              Loading...
            </CardTitle>
          </CardHeader>
        }>
          <Page />
        </Suspense>
      </Card>
    </div>
  );
}

function Page() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return <CardHeader>
      <CardTitle>
        No Event ID
      </CardTitle>
    </CardHeader>;
  }

  return <PreCheckOut eventId={eventId} />;
}

function PreCheckOut({ eventId }: { eventId: string }) {
  const { data, error, isLoading } = api.sjcetPay.initiatePurchase.useQuery(
    {
      id: eventId,
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
    return <CardHeader>
      <CardTitle>
        Loading...
      </CardTitle>
    </CardHeader>;
  }

  if (error) {
    return <CardHeader>
      <CardTitle>
        Error: {error.message}
      </CardTitle>
    </CardHeader>;
  }

  if (!data) {
    return <CardHeader>
      <CardTitle>
        No data
      </CardTitle>
    </CardHeader>;
  }

  const { transaction, event, orderId } = data;


  const getPaymentURL = (orderId: string, amount: number) => {

    if (amount === 0) {
      return `/payment/success/${orderId}`
    }

    const redirectUrl = new URL(`/payment/success/${orderId}`, window.location.origin)

    const url = new URL("/asthra", env.NEXT_PUBLIC_SJCET_PAYMENT_LINK)

    url.searchParams.append(
      "amount",
      (event.amount * 100).toString()
    );

    url.searchParams.append(
      "redirect",
      redirectUrl.toString()
    );

    return url.toString();
  }

  const notSpot = event.registrationType === "online"
  const paymentLink = getPaymentURL(orderId, event.amount);

  return (

    <>
      <CardHeader>
        <CardTitle>
          Confirm Payment?
        </CardTitle>
        <CardDescription>
          Pay ₹{event.amount} INR for the {event.eventType}.
        </CardDescription>
        <CardDescription>
          Order ID: {transaction.orderId}
        </CardDescription>
        <CardDescription>
          User ID: {transaction.userId}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Plusbox className="p-2">
          <div className="flex gap-2 flex-row">
            <Image width={80} height={100} src={event.poster} alt={event.name ?? ""} />
            <div>
              <h4>{event.name}</h4>
              <p>{event.id}</p>
            </div>
          </div>
        </Plusbox>
      </CardContent>
      <PDFDialog />
      <CardFooter className="justify-between gap-4 flex-row-reverse">
        <Button   link={paymentLink}>Pay ₹{event.amount} Now</Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={notSpot}  >Pay at Venue</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pay and Scan this QR at Front Desk</DialogTitle>
              <DialogDescription>
                Pay them with your preferred payment method. And scan the QR code
                at the Front Desk.
              </DialogDescription>
            </DialogHeader>
            <div className="p-1 md:p-4 bg-white">
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={transaction.id}
                viewBox={"0 0 256 256"}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button  >Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </>
  );
}

const PDFDialog = () => {
  return (
    <p className="p-4 text-sm text-center">
      By completing this purchase, you agree to our{" "}
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className=" underline"
          >
            Privacy Policy
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl w-full h-[80vh] flex flex-col">
          <iframe
            src={"/Mandatory_policy_sjcet.pdf"}
            className="w-full h-full p-4"
            title="pdf-viewer"
          />

        </DialogContent>
      </Dialog>{" "}
      and{" "}
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="underline"
          >
            Refund Policy
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl w-full h-[80vh] flex flex-col">
          <iframe
            src={"/REFUND_POLICY_SJCET.pdf"}
            className="w-full h-full p-4"
            title="pdf-viewer"
          />
        </DialogContent>
      </Dialog>
    </p>
  )
}
