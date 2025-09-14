import { cdn } from "@/lib/cdn";
import { Instagram, Youtube, Facebook, Github } from "lucide-react";
import Image from "next/image";

export default function ComprehensiveFooter() {
    return (
        <footer className="w-full  text-black">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-6">

                    {/* Left Section - College Info */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="mb-6">
                            <h3 className="text-4xl font-dimension mb-2 tracking-wide">
                                ST. JOSEPH'S<br />
                                COLLEGE OF ENGINEERING<br />
                                AND TECHNOLOGY,<br />
                                PALAI
                            </h3>
                            <p className="text-black text-sm leading-relaxed">
                                St Joseph's College of Engineering and Technology,<br />
                                Palai, Choondacherry P.O, Palai, Kottayam 686 579, Kerala, India.
                            </p>
                        </div>


                    </div>

                    {/* Center Section - Registration & Social */}
                    <div className="flex flex-col items-center text-center">
                        {/* Social Media Icons */}
                        <div className="flex gap-6 mb-8">
                            <a
                                href="https://instagram.com/asthra_sjcet"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.youtube.com/@sjcetpalai/videos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                aria-label="YouTube"
                            >
                                <Youtube className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.facebook.com/asthra.sjcet/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a
                                href="https://github.com/AsthraSJCET/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="w-6 h-6" />
                            </a>
                        </div>

                        {/* Made with Love */}
                        <div className="mb-2 md:mb-8">
                            <p className="text-black text-sm">
                                Made with <span className="text-red-500">♥</span> by team asthra
                            </p>
                        </div>

                        {/* Registration Helpline */}
                        <div className="mb-6">
                            <h4 className="text-base font-semibold mb-4">Student Coordinators</h4>
                            <div className="space-y-2 text-sm text-black">
                                <p>Ajaykrishnan B : +91 8590284832
                                </p>
                                <p>Annu Jaison : +91 6282271359</p>
                                <p></p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-base font-semibold mb-4">Faculty Coordinators</h4>
                            <div className="space-y-2 text-sm text-black">
                                <p>Dr.Anuja George : +91 7356110541
                                </p>
                                <p>Prof.Ashly Thomas : +91 9446803437
                                </p>
                                <p>Prof.Manish Jose : +91 9447764273</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Asthra Logo & Faculty */}
                    <div className="flex flex-col items-center lg:items-end text-center lg:text-right ">
                        {/* Asthra Logo */}
                        <div className="md:mb-8 mb-3 h-full w-full text-center">
                            <img
                                src={cdn("/asthra.svg")}
                                alt="Asthra 10.0"
                                width={200}
                                height={120}
                                className="w-full"
                            />
                            <div>
                                <h2 className="italic">Envisioned to explore the possibilities of tomorrow</h2>
                            </div>

                        </div>


                    </div>
                </div>

                {/* Bottom Border Line */}
                <div className="border-t border-gray-700 pt-3">
                    <div className="text-center">
                        <p className="text-gray-400 text-sm">
                            © 2025 Asthra 10.0, SJCET Palai. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
