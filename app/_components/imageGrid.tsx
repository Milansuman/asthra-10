import React from 'react';
import Image from 'next/image';

const gridItems = [
    { id: 1, imgSrc: "/assets/image_placeholder.webp", span: "row-span-1" }, // Short
    { id: 2, imgSrc: "/assets/image_placeholder.webp", span: "row-span-2" }, // Tall
    { id: 3, imgSrc: "/assets/image_placeholder.webp", span: "row-span-1" }, // Short
    { id: 4, imgSrc: "/assets/image_placeholder.webp", span: "row-span-2" }, // Tall
    { id: 5, imgSrc: "/assets/image_placeholder.webp", span: "row-span-2" }, // Tall
    { id: 6, imgSrc: "/assets/image_placeholder.webp", span: "row-span-2" }, // Short
    { id: 7, imgSrc: "/assets/image_placeholder.webp", span: "row-span-2" }, // Tall
    { id: 8, imgSrc: "/assets/image_placeholder.webp", span: "row-span-1" }, // Short
    { id: 9, imgSrc: "/assets/image_placeholder.webp", span: "row-span-1" }, // Short
    { id: 10, imgSrc: "/assets/image_placeholder.webp", span: "row-span-2" },// Tall
    { id: 11, imgSrc: "/assets/image_placeholder.webp", span: "row-span-1" },// Short
    { id: 12, imgSrc: "/assets/image_placeholder.webp", span: "row-span-2" },
    { id: 13, imgSrc: "/assets/image_placeholder.webp", span: "row-span-1" },

    { id: 14, imgSrc: "/assets/image_placeholder.webp", span: "row-span-2" },
    { id: 15, imgSrc: "/assets/image_placeholder.webp", span: "row-span-1" },
    { id: 15, imgSrc: "/assets/image_placeholder.webp", span: "row-span-1" },

    // Tall
];

// Define types for our component props for type safety (good practice in production)
interface GridCellProps {
    imgSrc: string;
    span: string;
}


const GridCell = ({ imgSrc, span }: GridCellProps) => {
    return (
        <div
            className={`${span} relative rounded-xl overflow-hidden border border-gray-300 shadow-sm`}
        >
            <Image
                src={imgSrc}
                alt="Wavy pattern background"
                fill // 'fill' makes the image fill its parent container
                className="object-cover" // Ensures the image covers the area without distortion
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Helps Next.js optimize image loading
            />
        </div>
    );
};

// Step 3: The main component now cleanly maps over the data.
export default function ImageGrid() {
    return (
        <div className="p-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[150px] gap-4 max-w-5xl mx-auto">
                {gridItems.map((item) => (
                    <GridCell key={item.id} imgSrc={item.imgSrc} span={item.span} />
                ))}
            </div>
        </div>
    );
}