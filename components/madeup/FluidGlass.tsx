"use client";
import React, { useEffect, useState } from "react";

interface FluidGlassProps {
    mobileSize?: number; // size on small screens
    desktopSize?: number; // size on larger screens
}

const FluidGlass: React.FC<FluidGlassProps> = ({
    mobileSize = 100,
    desktopSize = 200,
}) => {
    const [size, setSize] = useState(desktopSize);

    useEffect(() => {
        const updateSize = () => {
            const w = window.innerWidth;
            if (w < 768) {
                setSize(mobileSize);
            } else {
                setSize(desktopSize);
            }
        };

        updateSize(); // initial
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, [mobileSize, desktopSize]);

    return (
        <div className="flex items-center justify-center min-h-screen p-8">
            {/* Glass Lens */}
            <div
                className="relative group cursor-pointer"
                style={{ width: `${size}px`, height: `${size}px` }}
            >
                {/* Main glass sphere */}
                <div
                    className="w-full h-full rounded-full relative overflow-hidden transition-transform duration-300 hover:scale-105"
                    style={{
                        background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.05) 70%, transparent 100%),
              radial-gradient(circle at 70% 70%, rgba(255,255,255,0.08) 0%, transparent 50%),
              linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)
            `,
                        backdropFilter: "blur(12px)",
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTop: "2px solid rgba(255,255,255,0.6)",
                        borderLeft: "2px solid rgba(255,255,255,0.4)",
                        boxShadow: `
              0 20px 60px rgba(0,0,0,0.3),
              0 8px 25px rgba(0,0,0,0.2),
              inset 0 2px 0 rgba(255,255,255,0.5),
              inset 2px 2px 4px rgba(255,255,255,0.3),
              inset -2px -2px 4px rgba(0,0,0,0.1)
            `,
                    }}
                >
                    {/* Highlights */}
                    <div
                        className="absolute top-6 left-6 w-20 h-20 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.2) 60%, transparent 80%)",
                            filter: "blur(10px)",
                            transform: "rotate(-15deg)",
                        }}
                    ></div>

                    <div
                        className="absolute top-12 right-16 w-12 h-12 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 40%, transparent 70%)",
                            filter: "blur(6px)",
                        }}
                    ></div>

                    <div
                        className="absolute top-20 left-20 w-6 h-6 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 60%)",
                            filter: "blur(3px)",
                        }}
                    ></div>

                    <div
                        className="absolute inset-4 rounded-full opacity-40"
                        style={{
                            background: `
                radial-gradient(ellipse 80% 60% at 40% 30%, rgba(255,255,255,0.3) 0%, transparent 60%),
                radial-gradient(ellipse 60% 80% at 60% 70%, rgba(255,255,255,0.2) 0%, transparent 50%),
                conic-gradient(from 45deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.15) 90deg, transparent 180deg, rgba(255,255,255,0.1) 270deg, transparent 360deg)
              `,
                            filter: "blur(8px)",
                            animation: "causticShimmer 6s ease-in-out infinite",
                        }}
                    ></div>

                    <div
                        className="absolute inset-0 rounded-full opacity-30"
                        style={{
                            background: `
                radial-gradient(circle at 50% 50%, transparent 30%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.1) 100%)
              `,
                            mixBlendMode: "overlay",
                        }}
                    ></div>

                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, transparent 85%, rgba(255,255,255,0.4) 90%, rgba(255,255,255,0.2) 95%, transparent 100%)",
                            filter: "blur(1px)",
                        }}
                    ></div>
                </div>

                {/* Shadow */}
                <div
                    className="absolute inset-0 rounded-full -z-10"
                    style={{
                        background:
                            "radial-gradient(ellipse 70% 30% at 50% 80%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)",
                        transform: "translateY(20px) scaleY(0.3)",
                        filter: "blur(20px)",
                    }}
                ></div>

                <div
                    className="absolute -inset-8 rounded-full opacity-20 -z-10"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)",
                        filter: "blur(40px)",
                    }}
                ></div>
            </div>

            <style jsx>{`
        @keyframes causticShimmer {
          0%,
          100% {
            transform: rotate(0deg);
            opacity: 0.4;
          }
          25% {
            transform: rotate(90deg);
            opacity: 0.6;
          }
          50% {
            transform: rotate(180deg);
            opacity: 0.3;
          }
          75% {
            transform: rotate(270deg);
            opacity: 0.5;
          }
        }
      `}</style>
        </div>
    );
};

export default FluidGlass;
