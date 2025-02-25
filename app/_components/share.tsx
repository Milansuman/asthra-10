"use client"

import { CopyIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";

export const ShareButton = ({ id, shortUrl }: { id?: string, shortUrl?: string }) => {
    let url = id ? `https://asthra.sjcetpalai.ac.in/events/${id}` : window.location.href;
    url = shortUrl ? shortUrl : url;
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={"glass"} size={"icon"} className="top-0 right-0 cursor-pointer absolute" onClick={() => navigator.clipboard.writeText(url)}>
                        <CopyIcon className="w-6 h-6" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Click to Copy Link</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
