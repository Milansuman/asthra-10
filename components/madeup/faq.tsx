import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";

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
        title: "What is this Credit System? is this KTU points?",
        content: "NO, that a common limit given to all ASTHRA Pass users, which can be used to register for events. Each event has a different credit value. If your credit limit is exhausted, you have to pay extra for refilling the credits.",
    },
    {
        title: "Im an SJCET Student, Can I purchase the PASS?",
        content: "NO, ASTHRA is strictly for outside SJCET campus students. But you can participate workshops and view exibitions.",
    },
    {
        title: "What about KTU points?",
        content: "Anyone who registered for ASTHRA PASS will get 40 KTU points. Make sure participate some workshops and competitions to get extra points.",
    },
    {
        title: "Can I register for any events on the spot?",
        content: "Some events allow spot registration, but availability is not guaranteed. To secure your spot, we recommend registering in advance before the event begins.",
    },
    {
        title: "Is ASTHRA Pass mandatory for Team Events? Everyone in the team should have ASTHRA Pass?",
        content: "Yes, ASTHRA Pass is mandatory for all participants in team events. Then team leader should update the team name & member details at venue coordinator.",
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
                    <div className="flex gap-4">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" id="gmail">
                            <path d="M6 6.998c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h1.424a.5.5 0 0 0 .152 0h16.848a.5.5 0 0 0 .152 0H26c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2H6zm0 1h1.322l8.36 6.885a.5.5 0 0 0 .636 0l8.36-6.885H26c.563 0 1 .437 1 1v14c0 .563-.437 1-1 1h-1v-13a.5.5 0 0 0-.818-.387L16 17.35 7.818 10.61a.5.5 0 0 0-.324-.113.5.5 0 0 0-.494.5v13H6c-.563 0-1-.437-1-1v-14c0-.563.437-1 1-1zm2.895 0h14.21L16 13.85 8.895 7.998zM8 12.057l7.682 6.326a.5.5 0 0 0 .636 0L24 12.057v11.941H8V12.057z" color="#000" font-family="sans-serif" fontWeight="400" overflow="visible" style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;white-space:normal;isolation:auto;mix-blend-mode:normal;solid-color:#000;solid-opacity:1"></path>
                        </svg> */}
                        <Image src="/images/gmail.svg" width={25} height={25} alt="gmail" />

                        <a href="mailto:asthra@sjcetpalai.ac.in">asthra@sjcetpalai.ac.in</a>
                    </div>
                    <div className="flex gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256"><path fill="#fff" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z" /></svg>
                        <a href="https://www.instagram.com/asthra_sjcet?igsh=MWM3YWhwcjRhNXhpOQ==">@asthra_sject</a>
                    </div>
                    <div className="flex gap-4">
                        <Image src={'/images/linkedin.svg'} width={25} height={25} />

                        <a href="https://www.linkedin.com/showcase/asthra-sjcet">asthra-sjcet</a>
                    </div>
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