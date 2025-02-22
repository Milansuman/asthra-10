"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { FAQItem } from "@/lib/types";

export const faqItems: FAQItem[] = [
    {
        title: 'How this work?',
        content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    },
    {
        title: 'Are there any additional fee?',
        content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    },
    {
        title: 'How can I get the app?',
        content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    },
    {
        title: 'What features do you offer and other not?',
        content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    },
];

export function FAQ() {
    return (
        <div className="w-full max-w-6xl mx-auto p-8 my-8 backdrop-blur-md bg-white/60 rounded-2xl border border-white/20">
            <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Left Section */}
                <div className="flex-1 space-y-4">
                    <h2 className="text-4xl font-bold text-black">
                        Any questions?<br />
                        We got you.
                    </h2>
                    <p className="text-gray-800 max-w-md">
                        Yet bed any for assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.
                    </p>
                    {/* <a href="/" className="text-purple-600 hover:text-purple-700 inline-flex items-center">
                        More FAQs →
                    </a> */}
                </div>

                {/* Right Section */}
                <div className="flex-1">
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqItems.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{faq.title}</AccordionTrigger>
                                <AccordionContent>{faq.content}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
