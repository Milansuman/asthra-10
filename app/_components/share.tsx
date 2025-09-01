"use client"

import { CheckCircle, CopyIcon } from "lucide-react";
import { useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";

export const ShareButton = ({ id, shortUrl }: { id?: string, shortUrl?: string }) => {
    const [copied, setCopied] = useState(false);
    let url = id ? `https://asthra.sjcetpalai.ac.in/events/${id}` : window.location.href;
    url = shortUrl ? shortUrl : url;

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button  size={"icon"} className="top-0 right-0 cursor-pointer absolute" onClick={handleCopy}>
                        {copied ? <CheckCircle className="w-6 h-6" /> : <CopyIcon className="w-6 h-6" />}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{copied ? "Link Copied!" : "Click to Copy Link"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export const ShareButtonFunc = ({ func }: { func: () => string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(func());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button  size={"icon"} className="top-0 right-0 cursor-pointer absolute" onClick={handleCopy}>
                        {copied ? <CheckCircle className="w-6 h-6" /> : <CopyIcon className="w-6 h-6" />}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{copied ? "Link Copied!" : "Click to Copy Link"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
