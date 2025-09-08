import { Instagram, Youtube, Facebook, Github } from "lucide-react";
import Image from "next/image";

export default function ComprehensiveFooter() {
    return (
        <footer className="w-full bg-black text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">

                    {/* Left Section - College Info */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 tracking-wide">
                                ST. JOSEPH'S<br />
                                COLLEGE OF ENGINEERING<br />
                                AND TECHNOLOGY,<br />
                                PALAI
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                St Joseph's College of Engineering and Technology,<br />
                                Palai, Choondacherry P.O, Palai, Kottayam 686 579, Kerala, India.
                            </p>
                        </div>

                        {/* Student Coordinators */}
                        <div className="mb-8">
                            <h4 className="text-base font-semibold mb-4">Student Coordinators</h4>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>Ajil pavithran - +919747781189</p>
                                <p>Jesvin C Jess - +918590396453</p>
                                <p>Shalon Mary Michael - +918589809771</p>
                            </div>
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
                                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.youtube.com/@sjcetpalai/videos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                aria-label="YouTube"
                            >
                                <Youtube className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.facebook.com/asthra.sjcet/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a
                                href="https://github.com/AsthraSJCET/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="w-6 h-6" />
                            </a>
                        </div>

                        {/* Made with Love */}
                        <div className="mb-8">
                            <p className="text-gray-300 text-sm">
                                Made with <span className="text-red-500">♥</span> by team asthra
                            </p>
                        </div>

                        {/* Registration Helpline */}
                        <div>
                            <h4 className="text-base font-semibold mb-4">Registration HelpLine</h4>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>Tomin Joy - 9400836474</p>
                                <p>Reenphy George - 9074539693</p>
                                <p>Rajat Sandeep - 9846101882</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Asthra Logo & Faculty */}
                    <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
                        {/* Asthra Logo */}
                        <div className="mb-8">
                            <img
                                src="/asthra.svg"
                                alt="Asthra 10.0"
                                width={200}
                                height={120}
                                className="object-contain"
                            />
                            <div className="text-center mt-4">
                                <h4 className="text-lg font-bold">10.0</h4>
                                <p className="text-gray-300 text-sm max-w-xs">
                                    Envisioned to explore the possibilities of tomorrow
                                </p>
                            </div>
                        </div>

                        {/* Faculty Coordinators */}
                        <div>
                            <h4 className="text-base font-semibold mb-4">Faculty Coordinators</h4>
                            <div className="space-y-2 text-sm text-gray-300">
                                <p>Dr. Nidhish M Nidhiry - +919447227844</p>
                                <p>Dr. Arun P - +91 98958 52842</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Border Line */}
                <div className="border-t border-gray-700 pt-8">
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
