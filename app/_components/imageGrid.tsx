"use client"; // masonic is a client-side library

import React from 'react';
import Image from 'next/image';
import { Masonry } from 'masonic';

// --- Your Image Data ---
const imageData = [
    { id: 1, src: "/assets/image_placeholder.webp", width: 800, height: 1200, alt: "placeholder image." },
    { id: 2, src: "/assets/image_placeholder.webp", width: 1000, height: 800, alt: "placeholder image." },
    { id: 3, src: "/assets/image_placeholder.webp", width: 800, height: 800, alt: "placeholder image." },
    { id: 4, src: "/assets/image_placeholder.webp", width: 800, height: 1100, alt: "placeholder image." },
    { id: 5, src: "/assets/image_placeholder.webp", width: 1200, height: 800, alt: "placeholder image." },
    { id: 6, src: "/assets/image_placeholder.webp", width: 800, height: 1000, alt: "placeholder image." },
    { id: 7, src: "/assets/image_placeholder.webp", width: 1000, height: 700, alt: "placeholder image." },
    { id: 8, src: "/assets/image_placeholder.webp", width: 800, height: 900, alt: "placeholder image." },
    { id: 9, src: "/assets/image_placeholder.webp", width: 900, height: 900, alt: "placeholder image." },
    { id: 10, src: "/assets/image_placeholder.webp", width: 700, height: 1000, alt: "placeholder image." },
    { id: 11, src: "/assets/image_placeholder.webp", width: 1100, height: 800, alt: "placeholder image." },
    { id: 12, src: "/assets/image_placeholder.webp", width: 800, height: 1200, alt: "placeholder image." },
];

// masonic requires a component to render each item.
// The 'data' prop here contains one item from the 'imageData' array.
const MasonryCard = ({ data }: { data: typeof imageData[0] }) => {
    return (
        <div className="rounded-xl overflow-hidden group">
            <Image
                src={data.src}
                alt={data.alt}
                width={data.width}
                height={data.height}
                className="w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
                priority={data.id <= 4} // Prioritize the first few images
            />
        </div>
    );
};

export default function ImageGrid() {
    return (
        <div className="p-4 w-full max-w-5xl mx-auto">
            <Masonry
                // Provides the data to the grid
                items={imageData}
                // The component to render for each item
                render={MasonryCard}
                // This tells masonic how wide each column should be.
                // It will automatically calculate how many columns can fit.
                columnWidth={230}
                // The space between columns
                columnGutter={16}
                // How many items to render off-screen for smoother scrolling
                overscanBy={5}
            />
        </div>
    );
}