import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQItem {
    title: string;
    content: string;
}
type FAQItems = FAQItem[];


export const faqItems: FAQItem[] = [
    {
        title: 'How to register?',
        content: "Registration hasn't been started yet, but you can login with your Google account.",
    },
    {
        title: 'Are events free?',
        content: 'Asthra Events are free to enter if you have ASTHRA PASS. But Workshops and competitions may have a seperate fee.',
    },
    {
        title: 'How to get ASTHRA PASS?',
        content: 'Login, fill your profile, and purchase the ASTHRA PASS.',
    },
    {
        title: 'Is college bus facility available?',
        content: 'No, but you can book a cab or use public transport.',
    },
    {
        title: 'Can i purchase tickets at the venue?',
        content: 'Yes, you can. But it is recommended to purchase online to avoid long queues. Also some events may have limited seats.',
    },
    {
        title: 'What are the payment methods?',
        content: 'You can pay using UPI, Debit/Credit cards, and Netbanking.',
    }
];

export function FAQ() {
    return (
        <div className="w-full max-w-6xl mx-auto p-8 my-8 bg-glass rounded-2xl border border-glass">
            <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Left Section */}
                <div className="flex-1 space-y-4">
                    <h2 className="text-4xl font-bold ">
                        Any questions?<br />
                        We got you.
                    </h2>
                    <p className="max-w-md">
                        Really excited to have you all on board!
                        In case you've got any common questions, Just check this out and in case of other doubts, contact the coordinators given below :)
                    </p>
                </div>

                {/* Right Section */}
                <div className="flex-1 w-full">
                    <Accordion type="single" collapsible className="space-y-4 ambit w-full">
                        {faqItems.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="ambit">{faq.title}</AccordionTrigger>
                                <AccordionContent className="ambit">{faq.content}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
