import { FAQ } from "@/components/madeup/faq"
import { Footer2 } from "@/components/madeup/footer2"
import { NoiseTexture } from '@/components/noise-texture';
import Header from '../../_components/header';
import Image from "next/image";
export default function FAQPage() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: 'black' }}>
            <Header />
            <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
                <Image
                    src="/assets/side.png"
                    alt="Left navigation"
                    width={30}
                    height={500}
                    className="h-[95vh] w-auto"
                />
            </div>

            {/* Right vertical navbar */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
                <Image
                    src="/assets/side.png"
                    alt="Right navigation"
                    width={30}
                    height={500}
                    className="h-[95vh] w-auto"
                />
            </div>



            <div className="container mx-auto  pt-16 z-10 absolute top-0 right-0 left-0 bottom-0 overflow-y-auto w-full md:w-[calc(100%-150px)]  scroll-smooth  ">
                {/* Header Section */}
                <div className="fixed inset-0 pointer-events-none ">
                    <NoiseTexture />
                </div>
                <div className="px-4 bg-[#E8EEED] rounded-[2rem]">
                    <div className="text-center my-12 pt-10 ">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: '#3795AA' }}>
                            Frequently Asked Questions
                        </h1>
                        <p className="text-lg max-w-2xl mx-auto" style={{ color: '#3795AA' }}>
                            Find answers to common questions about Asthra. Can't find what you're looking for?
                            Don't hesitate to reach out to our support team.
                        </p>
                    </div>

                    {/* FAQ Component */}
                    <FAQ />

                </div>
                {/* Footer */}
                <div className="  ">
                    <Footer2
                        logo={{
                            title: "Asthra 10.0",
                            url: "/"
                        }}
                        tagline="Premier Technical & Cultural Fest"
                        menuItems={[
                            {
                                title: "Events",
                                links: [
                                    { text: "Browse Events", url: "/events" },
                                    { text: "Register", url: "/events" },
                                    { text: "Schedule", url: "#" },
                                    { text: "Results", url: "#" }
                                ]
                            },
                            {
                                title: "Information",
                                links: [
                                    { text: "About Asthra", url: "#" },
                                    { text: "Venue", url: "#" },
                                    { text: "Accommodation", url: "#" },
                                    { text: "Contact", url: "#" }
                                ]
                            },
                            {
                                title: "Support",
                                links: [
                                    { text: "FAQ", url: "/faq" },
                                    { text: "Help Center", url: "#" },
                                    { text: "Guidelines", url: "#" }
                                ]
                            },
                            {
                                title: "Connect",
                                links: [
                                    { text: "Facebook", url: "https://www.facebook.com/asthra.sjcet/" },
                                    { text: "Instagram", url: "https://instagram.com/asthra_sjcet" },
                                    { text: "YouTube", url: "https://www.youtube.com/@sjcetpalai/videos" },
                                    { text: "GitHub", url: "https://github.com/AsthraSJCET/" }
                                ]
                            }
                        ]}
                        copyright="© 2025 Asthra 10.0, SJCET Palai. All rights reserved."
                        bottomLinks={[
                            { text: "Terms & Conditions", url: "#" },
                            { text: "Privacy Policy", url: "#" },
                            { text: "Refund Policy", url: "#" }
                        ]}
                    />
                </div >
            </div>
        </div >
    );
}
