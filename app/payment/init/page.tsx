"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
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
import QRCode from "react-qr-code";
import { env } from "@/env";
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Plusbox from "@/components/madeup/box";
import Image from "next/image";
import { asthraNotStarted } from "@/logic/moods";

// ?eventId=""
export default function Home() {
  return (
    <div className="container min-h-screen flex flex-col justify-center items-center">
      <Card>
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

  return <>{eventId && <PreCheckOut eventId={eventId} />}</>;
}

function PreCheckOut({ eventId }: { eventId: string }) {
  const [pdfUrl, setPdfUrl] = useState("");
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

  const notSpot = asthraNotStarted() || event.registrationType === "online"
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
      <p className="p-4 text-sm text-center">
        By completing this purchase, you agree to our{" "}
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              onClick={() => setPdfUrl("/Mandatory_policy_sjcet.pdf")}
              className=" underline"
            >
              Privacy Policy
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl w-full h-[80vh] flex flex-col">
            <iframe
              src={`${pdfUrl}`}
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
              onClick={() => setPdfUrl("/REFUND_POLICY_SJCET.pdf")}
              className="underline"
            >
              Refund Policy
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl w-full h-[80vh] flex flex-col">
            <iframe
              src={`${pdfUrl}`}
              className="w-full h-full p-4"
              title="pdf-viewer"
            />
          </DialogContent>
        </Dialog>
      </p>
      <CardFooter className="justify-between gap-4 flex-row-reverse">

        <Button variant={"glass"} size={"glass"} link={paymentLink}>Pay ₹{event.amount} Now</Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={notSpot} variant={"glass"} size={"glass"}>Pay at Venue</Button>
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
                <Button variant={"glass"} size={"glass"}>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </>
  );
}