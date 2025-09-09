"use client"; // masonic is a client-side library

import React from 'react';
import Image from 'next/image';
import { Masonry } from 'masonic';
import { cdn } from '@/lib/cdn';

// --- Your Image Data ---
const imageData = [
    { id: 1, src: cdn("/assets/grid/img1.webp"), width: 800, height: 1200, alt: "image1" },
    { id: 2, src: cdn("/assets/grid/img2.webp"), width: 1000, height: 800, alt: "image2" },

    { id: 4, src: cdn("/assets/grid/img4.webp"), width: 800, height: 1100, alt: "image4" },
    { id: 5, src: cdn("/assets/grid/img5.webp"), width: 1200, height: 800, alt: "image5" },
    { id: 6, src: cdn("/assets/grid/img6.webp"), width: 800, height: 1000, alt: "image6" },
    { id: 7, src: cdn("/assets/grid/img7.webp"), width: 1000, height: 700, alt: "image7" },
    { id: 8, src: cdn("/assets/grid/img8.webp"), width: 800, height: 900, alt: "image8" },

    { id: 9, src: cdn("/assets/grid/img9.webp"), width: 700, height: 1000, alt: "image9" },
    { id: 10, src: cdn("/assets/grid/img10.webp"), width: 1100, height: 800, alt: "image10" },
    { id: 11, src: cdn("/assets/grid/img11.webp"), width: 800, height: 1200, alt: "image11" },
    { id: 11, src: cdn("/assets/grid/img12.webp"), width: 800, height: 1200, alt: "image12" },
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