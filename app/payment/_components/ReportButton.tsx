"use client";
import { useSession } from "@/hooks/session";
import { Button } from "@/components/ui/button";
import type React from "react";

interface TransactionData {
    transaction: {
        id: string;
        eventName: string;
        eventId: string;
        userName: string;
        amount: number;
        orderId: string;
    };
}

const ReportButton: React.FC<{ data: TransactionData }> = ({ data }) => {
    const { data: session } = useSession();
    const userEmail = session?.user?.email || "Not Available";

    return (
        <Button
            link={`https://api.whatsapp.com/send?phone=+919846101882&text=${encodeURIComponent(
                `Hi,
I recently attempted to book my pass for ${data.transaction.eventName}, but unfortunately, the payment didn’t go through.
I’d really appreciate your assistance in resolving this issue. Here are my transaction details:
---

📌 Event Name:       ${data.transaction.eventName}

📌 Event ID:           ${data.transaction.eventId}

📌 Transaction ID:  ${data.transaction.id}

📌 Username:         ${data.transaction.userName}

📌 Email:                ${userEmail}

📌 Amount:            ₹${data.transaction.amount}

📌 Order ID:          ${data.transaction.orderId}

---
Thanks in advance! `
            )}`}

        >
            Report Payment Issue
        </Button>
    );
};

export default ReportButton;
