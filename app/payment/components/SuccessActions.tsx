"use client";

import { Button } from "@/components/ui/button";

type SuccessActionsProps = {
    eventName: string;
};

export default function SuccessActions({ eventName }: SuccessActionsProps) {
    return (
        <div className="justify-between flex flex-row-reverse p-6">
            <Button
                variant="default" // Changed from "glass" to a standard variant
                onClick={() => {
                    const qrElement = document.querySelector("svg");
                    if (qrElement) {
                        const svgData = new XMLSerializer().serializeToString(qrElement);
                        const svgBlob = new Blob([svgData], {
                            type: "image/svg+xml;charset=utf-8",
                        });
                        const url = window.URL.createObjectURL(svgBlob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = `${eventName}-pass.svg`; // Changed to .svg since it's an SVG blob
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                    }
                }}
            >
                Download Your Pass
            </Button>
            <Button variant="secondary">
                <a href="/">Back to Home</a>
            </Button>
        </div>
    );
}