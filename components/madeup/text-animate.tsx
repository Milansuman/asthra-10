"use client";

import RotatingText from '@/components/ui/rotatingText';

export const TextRotatingAnimation = ({ text }: { text: string[] }) => {
    return (
        <RotatingText
            texts={text}
            mainClassName="px-2 sm:px-2 text-6xl text-black items-center md:px-5 font-bold flex bg- overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-none"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pt-2"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
        />
    );
}
