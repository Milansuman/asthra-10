"use client"

import { CopyIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";

export const ShareButton = ({ id }: { id?: string }) => {
    const url = id ? `https://asthra.sjcetpalai.ac.in/events/${id}` : window.location.href;
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={"glass"} size={"icon"} className="top-0 right-0 cursor-pointer absolute">
                        <CopyIcon className="w-6 h-6" onClick={() => navigator.clipboard.writeText(url)} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Click to Copy Link</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
