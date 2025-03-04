"use client";
import { useSession } from "@/hooks/session";
import { Button } from "@/components/ui/button";
import type React from "react";

interface TransactionData {
    transaction: {
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
                `Hi Team, I recently attempted to book my pass for ${data.transaction.eventName}, but my payment didn’t go through.  
        Here are my details for reference:  
        🔹 Event Name: ${data.transaction.eventName}  
        🔹 Event ID: ${data.transaction.eventId}  
        🔹 Username: ${data.transaction.userName}  
        🔹 Email ID: ${userEmail}  
        🔹 Amount: ₹${data.transaction.amount}  
        🔹 Transaction ID: ${data.transaction.orderId}  
        🔹 Order ID: ${data.transaction.orderId}  
        
        Could you please check this for me at the earliest? I’d love to be a part of the event. Looking forward to your support.  
        Thanks!`
            )}`}
            variant="glass"
        >
            Report Payment Issue
        </Button>
    );
};

export default ReportButton;
