"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useSession } from "@/hooks/session";
import type { EventZodType } from "@/lib/validator";
import { api } from "@/trpc/react";
import ReactMarkdown from 'react-markdown';
import QRCode from "react-qr-code";

export const AsthraPaymentButton = () => {
    const { status, valid } = useSession()

    if (status === "unauthenticated") {
        return (
            <Button link={"/api/auth/signin"} size={"glass"} variant={"glass"}>
                <ButtonText keyType={"Login to Register"} />
            </Button>
        );
    }

    if (!valid) {
        return (
            <Button link={"/profile"} size={"glass"} variant={"glass"}>
                <ButtonText keyType={"Complete your Profile Data before Registration"} />
            </Button>
        );
    }

    return (
        <Button link={"/asthra"} size={"glass"} variant={"glass"}>
            <ButtonText keyType={"Buy ASTHRA PASS"} />
        </Button>
    );
};

import { ASTHRA } from "@/logic";
import { AlertOctagon, AlertTriangle, FileLock, LoaderIcon, Lock, QrCode, ShieldAlert, Ticket, TicketCheck, UserRoundCog, X } from 'lucide-react';
import type { FunctionComponent } from "react";
import { toast } from "sonner";

const ButtonMessages = {
    'Buy ASTHRA PASS': Ticket,
    'Buy ASTHRA PASS to Unlock': Lock,
    'Complete your Profile Data before Registration': UserRoundCog,
    'Register Now': Ticket,
    'Purchase Successfull': TicketCheck,
    'Sorry, Sold Out': AlertOctagon,
    'Required ASTHRA PASS': FileLock,
    'Registration Closed': AlertOctagon,
    'Login to Register': ShieldAlert,
    'Error Fetching': AlertTriangle,
    'Only for Spot Registration': X,
    'Loading': LoaderIcon,
} as const;

export const ButtonText: FunctionComponent<{ keyType: keyof typeof ButtonMessages, text?: boolean }> = ({ keyType, text = true }) => {
    const Logo = ButtonMessages[keyType];
    return (
        <>
            {text ? keyType : ""} <Logo className="scale-125" />
        </>
    );
};

export const PaymentButton = ({ event }: { event: EventZodType }) => {
    const { status, valid, data } = useSession()
    const { data: isRegisteredThisEvent } = api.user.isRegisteredThisEvent.useQuery({ eventId: event.id })
    const { mutateAsync, isPending, isSuccess } = api.event.registerEvent.useMutation({
        onError: (error) => {
            toast.error(error.data?.code, {
                description: error.message,
            })
        }
    })

    const { id, eventType, eventStatus, registrationType, regLimit, regCount, secret } = event

    if (status === "unauthenticated") {
        return (
            <Button link={"/api/auth/signin"} size={"glass"} variant={"glass"}>
                <ButtonText keyType={"Login to Register"} />
            </Button>
        );
    }

    if (!valid) {
        return (
            <Button link={"/profile"} size={"glass"} variant={"glass"}>
                <ButtonText keyType={"Complete your Profile Data before Registration"} />
            </Button>
        );
    }


    if (isRegisteredThisEvent) {
        return (<>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button size={"glass"} variant={"glass"}>
                        Show Secret Message
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                    <ReactMarkdown>
                        {secret}
                    </ReactMarkdown>
                </HoverCardContent>
            </HoverCard>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size={"glass"} variant={"glass"}>
                        Open QR <QrCode />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Scan this QR to get Attendence</DialogTitle>
                        <DialogDescription>
                            Show this QR code to the venue staff or student coordinator to get your attendence for your participation.
                        </DialogDescription>
                        <DialogDescription>
                            Certificate will be issued based on this attendence.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-4 bg-white">
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={isRegisteredThisEvent.registrationId}
                            viewBox={"0 0 256 256"}
                        />
                    </div>
                </DialogContent>
            </Dialog>

            <Button disabled size={"glass"} variant={"glass"}>
                <ButtonText keyType={"Purchase Successfull"} />
            </Button>
        </>
        );
    }

    if (eventStatus === "cancel") {
        return (
            <Button disabled size={"glass"} variant={"glass"}>
                <ButtonText keyType={"Registration Closed"} />
            </Button>
        );
    }

    if (registrationType === "spot") {
        return (
            <Button disabled size={"glass"} variant={"glass"}>
                <ButtonText keyType={"Only for Spot Registration"} />
            </Button>
        );
    }


    if (regCount >= regLimit) {
        return (
            <Button disabled size={"glass"} variant={"glass"}>
                <ButtonText keyType={"Sorry, Sold Out"} />
            </Button>
        );
    }

    if (eventType === "ASTHRA_PASS") {
        return (
            <Button link={`/payment/init?eventId=${ASTHRA.id}`} size={"glass"} variant={"glass"}>
                <ButtonText keyType={"Buy ASTHRA PASS"} />
            </Button>
        );
    }

    if (eventType === "ASTHRA_PASS_EVENT") {
        if (!data?.user.asthraPass) {
            return (
                <Button link={`/event/${ASTHRA.id}`} size={"glass"} variant={"glass"}>
                    <ButtonText keyType={"Buy ASTHRA PASS to Unlock"} />
                </Button>
            );
        }

        return (
            <Button onClick={() => mutateAsync({
                id,
            })} size={"glass"} variant={"glass"}>
                {isPending ?
                    <ButtonText keyType={"Loading"} />
                    : isSuccess ? <ButtonText keyType={"Purchase Successfull"} />
                        : <ButtonText keyType={"Register Now"} />}
            </Button>
        );
    }

    return (
        <Button link={`/payment/init?eventId=${id}`} size={"glass"} variant={"glass"}>
            Purchase Ticket
        </Button>
    );
}