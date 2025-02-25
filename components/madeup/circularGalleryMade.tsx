'use client'
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const images = [
    // "/assets/Ref1.webp",
    "/assets/Ref2.webp",
    // "/assets/Ref3.webp",
    "/assets/Ref4.webp",
    "/assets/Ref5.webp",
    "/assets/Ref6.webp",
];

const CircularGalleryMade: React.FC = () => {
    const x = useMotionValue(0);
    const [isDragging, setIsDragging] = useState(false);
    const itemWidth = 280; // Adjusted for better responsiveness
    const gap = 16; // Space between items
    const galleryWidth = images.length * (itemWidth + gap);
    const containerPadding = 32;

    useEffect(() => {
        if (!isDragging) {
            const snappedValue = Math.round(x.get() / itemWidth) * itemWidth;
            animate(x, snappedValue, { type: "spring", stiffness: 80, damping: 15 });
        }
    }, [isDragging, x]);

    return (
        <div className="relative w-full mx-auto py-10 flex items-start md:justify-center justify-center overflow-hidden select-none pe-[-100px] md:pe-[100px] md:ps-[100px]">
            <motion.div
                className="flex space-x-4 cursor-grab"
                style={{ width: galleryWidth }}
                drag="x"
                dragConstraints={{ left: -(galleryWidth - window.innerWidth + 300), right: 0 }}
                dragElastic={0.1}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
            >
                {images.map((src, index) => (
                    <motion.div
                        key={index}
                        className="w-[350px] pb-5 h-80 rounded-xl  pointer-events-none flex flex-col items-center p-4"
                    >
                        <Image src={src} alt={`event ${index}`} width={180} height={100} className="w-full h-[280px] object-cover rounded-lg" />
                        <h2 className="text-center text-lg font-semibold mt-2">Event {index + 1}</h2>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};


export default CircularGalleryMade;