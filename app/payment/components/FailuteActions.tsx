"use client";

import { Button } from "@/components/ui/button";

type FailureActionsProps = {
    eventName: string;
};

export default function FailureActions({ eventName }: FailureActionsProps) {
    return (
        <div className="justify-between flex flex-row-reverse p-6">
            {/* <Button
                variant="default"
                onClick={() => alert(`Retry payment for ${eventName}`)}
            >
                Retry Payment
            </Button> */}
            <Button variant="secondary">
                <a href="/profile">Back to Profile</a>
            </Button>
        </div>
    );
}