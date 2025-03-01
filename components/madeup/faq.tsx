import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQItem {
    title: string;
    content: string | string[]; // Allow content to be a string or array of strings
}

type FAQItems = FAQItem[];

export const faqItems: FAQItems = [
    {
        title: "When is Asthra 9.0?",
        content: "Asthra 9.0 will be held on March 6th and 7th, 2025, from 9:00 AM to 4:00 PM.",
    },
    {
        title: "What is the Asthra Pass?",
        content: "The Asthra Pass grants access to exclusive events and exhibitions. Make sure to scan your Asthra Pass to generate certificates for these events. You can purchase the Asthra pass for ₹250 from the website.",
    },
    {
        title: "Im an SJCET Student, Can I purchase the PASS?",
        content: "NO, ASTHRA is strictly for outside SJCET campus students. But you can participate workshops and view exibitions.",
    },
    {
        title: "Can I register for any events on the spot?",
        content: "Some events allow spot registration, but availability is not guaranteed. To secure your spot, we recommend registering in advance before the event begins.",
    },
    {
        title: "Will food and accommodation be provided to the participants?",
        content: "Food and accommodation would not be provided for the participants. However, food stalls and canteen are available on campus.",
    },
    {
        title: "Will transportation be provided?",
        content: "A bus will be available from Kottaramattom at 8:30 AM and back to Kottaramattom at 4:30 PM.",
    },
    {
        title: "How do I reach college?",
        content: [
            "From Kottayam: Pala - Bharanganam - Choondacherry",
            "From Erattupetta: Bharanganam - Choondacherry",
            "From Thodupuzha: Pravithanam - Choondacherry",
            "Nearest Railway Stations: Kottayam, Ettumanoor",
            "Nearest Bus Stations: KSRTC Bus Station Pala, Kottaramattom Private Bus Terminal, KSRTC Bus Station Erattupetta, Erattupetta Private Bus Terminal",
        ],
    },
    {
        title: "What should I bring?",
        content: [
            "Institution-issued ID card",
            "Asthra pass",
            "A valid government-issued ID",
            "Laptops or other internet-enabled devices (if required for your event)",
        ],
    },
    {
        title: "Can I transfer my Asthra pass or get a refund?",
        content: "Asthra passes are non-transferable, and refunds will not be provided.",
    },
];

export function FAQ() {
    return (
        <div className="w-full max-w-6xl mx-auto p-8 my-8 bg-glass rounded-2xl border border-glass">
            <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Left Section */}
                <div className="flex-1 space-y-4">
                    <h2 className="text-4xl font-bold">
                        Any questions?<br />
                        We got you.
                    </h2>
                    <p className="max-w-md">
                        Really excited to have you all on board! In case you've got any common questions, just check this out and in case of other doubts, contact the coordinators given below :)
                    </p>
                </div>

                {/* Right Section */}
                <div className="flex-1 w-full">
                    <Accordion type="single" collapsible className="space-y-4 ambit w-full">
                        {faqItems.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="ambit">{faq.title}</AccordionTrigger>
                                <AccordionContent className="ambit">
                                    {Array.isArray(faq.content) ? (
                                        <ul className="list-disc pl-5 space-y-2">
                                            {faq.content.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        faq.content
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}