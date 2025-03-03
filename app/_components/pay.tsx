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
import { AlertOctagon, AlertTriangle, FileLock, InfoIcon, LoaderIcon, Lock, QrCode, ShieldAlert, Ticket, TicketCheck, UserRoundCog, X } from 'lucide-react';
import type { FunctionComponent } from "react";
import { toast } from "sonner";
import { Markdown } from "./md";
import { CardHeader } from "@/components/ui/card";

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
    'This is strictly for students from outside SJCET campus': InfoIcon,
    'A simplified credit instead of money': InfoIcon
} as const;

export const ButtonText: FunctionComponent<{ keyType: keyof typeof ButtonMessages, text?: boolean }> = ({ keyType, text = true }) => {
    const Logo = ButtonMessages[keyType];
    return (
        <>
            {text ? keyType : ""} <Logo className="scale-125" />
        </>
    );
};

const customEvents = {
    "65d0e575-aa0a-4671-b2fa-828e6d98b99a": "https://docs.google.com/forms/d/e/1FAIpQLSdYnWmLVJ6_MCvH1tf8ByaBHf9fvPrmXcIgiP-WbqRbQXgDOQ/viewform?usp=header",
    "15749c9e-2022-43aa-91f6-ab3f375b3a88": "https://docs.google.com/forms/d/e/1FAIpQLScssYLhhOvfvUKuplDNV9A8wniJkPXQx0uRfTKiCIVRAMGx_g/viewform?usp=sharing",
    "12c94cc5-9096-492c-8611-5c2824f93931": "https://forms.gle/3d228KJaee3aYzcS6",
    "51aaa8a0-6393-4124-a02a-3f4650e6f0a5": "https://makemypass.com/sdr-workshop"
} as const

export const PaymentButton = ({ event }: { event: EventZodType }) => {
    const { status, valid, data } = useSession()
    const { data: isRegisteredThisEvent } = api.user.isRegisteredThisEvent.useQuery({
        eventId: event.id
    }, {
        enabled: status === "authenticated" && valid,
    })
    const { mutateAsync, isPending, isSuccess } = api.event.registerEvent.useMutation({
        onError: (error) => {
            toast.error(error.data?.code, {
                description: error.message,
            })
        }
    })

    const { id, eventType, eventStatus, registrationType, regLimit, regCount, secret } = event

    if (id in customEvents) {
        return (<Button link={customEvents[id as keyof typeof customEvents]} size={"glass"} variant={"glass"}>
            Register Now
        </Button>)
    }

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
            <Dialog>
                <DialogTrigger asChild>
                    <Button size={"glass"} variant={"glass"}>
                        Show Secret Message
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <CardHeader>
                        Secret Message to Participant
                    </CardHeader>
                    <Markdown full>
                        {secret ?? "Thanks for participating in this event. We hope you'll enjoy the event."}
                    </Markdown>
                </DialogContent>
            </Dialog>
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