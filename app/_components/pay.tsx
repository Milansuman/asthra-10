"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/session";
import type { EventZodType } from "@/lib/validator";
import { api } from "@/trpc/react";

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
            <ButtonText keyType={"Buy ASTHRA Pass"} />
        </Button>
    );
};

import { AlertOctagon, AlertTriangle, FileLock, LoaderIcon, Lock, ShieldAlert, Ticket, TicketCheck, UserRoundCog, X } from 'lucide-react';
import type { FunctionComponent } from "react";

const ButtonMessages = {
    'Buy ASTHRA Pass': Ticket,
    'Buy ASTHRA Pass to Unlock': Lock,
    'Complete your Profile Data before Registration': UserRoundCog,
    'Register Now': Ticket,
    'Purchase Successfull': TicketCheck,
    'Sorry, Sold Out': AlertOctagon,
    'Required ASTHRA Pass': FileLock,
    'Registration Closed': AlertOctagon,
    'Login to Register': ShieldAlert,
    'Error Fetching': AlertTriangle,
    'Only for Spot Registration': X,
    'Loading': LoaderIcon,
} as const;

const ButtonText: FunctionComponent<{ keyType: keyof typeof ButtonMessages }> = ({ keyType }) => {
    const Logo = ButtonMessages[keyType];
    return (
        <>
            {keyType} <Logo />
        </>
    );
};

export const PaymentButton = ({ event }: { event: EventZodType }) => {
    const { status, valid, data } = useSession()
    const { data: isRegisteredThisEvent } = api.user.isRegisteredThisEvent.useQuery({ eventId: event.id })
    const { mutateAsync, isPending, isSuccess } = api.event.registerEvent.useMutation()

    const { id, amount, eventType, eventStatus, registrationType, regLimit, regCount } = event

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
        return (
            <Button disabled size={"glass"} variant={"glass"}>
                <ButtonText keyType={"Purchase Successfull"} />
            </Button>
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
            <Button link={"/asthra"} size={"glass"} variant={"glass"}>
                <ButtonText keyType={"Buy ASTHRA Pass"} />
            </Button>
        );
    }

    if (eventType === "ASTHRA_PASS_EVENT") {
        if (!data?.user.asthraPass) {
            return (
                <Button link="/asthra" size={"glass"} variant={"glass"}>
                    <ButtonText keyType={"Buy ASTHRA Pass to Unlock"} />
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