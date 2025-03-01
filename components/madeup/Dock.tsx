"use client";

import {
    type MotionValue,
    type SpringOptions,
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import type React from "react";
import { useMemo, useState } from "react";
import Plusbox from "./box";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UrlObject } from "node:url";
import { Menu, X } from "lucide-react";

export type DockItemData = {
    icon?: React.ReactNode;
    label: React.ReactNode;
    link: string;
    onClick?: () => void;
    className?: string;
};

export type DockProps = {
    items: DockItemData[];
    className?: string;
    distance?: number;
    panelHeight?: number;
    baseItemSize?: number;
    dockHeight?: number;
    magnification?: number;
    spring?: SpringOptions;
};
type DockItemProps = {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    mouseX: MotionValue;
    spring: SpringOptions;
    distance: number;
    baseItemSize: number;
    magnification: number;
};

export default function Dock({
    items,
    className = "",
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 70,
    distance = 200,
    panelHeight = 64,
    dockHeight = 256,
    baseItemSize = 50,
}: DockProps) {
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname();

    const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
    const isHovered = useMotionValue(0);
    const maxHeight = useMemo(
        () => Math.max(dockHeight, magnification + magnification / 2 + 4),
        [magnification]
    );
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
    const height = useSpring(heightRow, spring);

    return (
        <>
            <button
                type="button"
                className="md:hidden fixed bottom-4 right-4 z-30 bg-glass p-2 rounded-full"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Menu size={36} className="text-glass-foreground" />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-glass text-glass-foreground flex flex-col items-center min-h-[50vh] p-4 border border-gray-300"
                    >
                        <button
                            type="button"
                            className="absolute top-4 right-4 text-glass-foreground "
                            onClick={() => setIsOpen(false)}
                        >
                            <X size={24} />
                        </button>
                        <div className="flex flex-col items-center gap-4 mt-8">
                            {items.map((item, index) => {
                                if (item.link === path) return null;
                                return (
                                    <Link
                                        key={index}
                                        href={item.link as unknown as UrlObject}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="hover:scale-105 transition-all cursor-pointer px-3 py-3">
                                            <p className="text-xl m-0">{item.label}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="hidden md:block fixed z-20 sm:left-auto left-0 sm:overflow-x-auto p-2 no-scrollbar overflow-y-hidden overflow-x-scroll bottom-[6px] right-[6px] w-auto">
                <Plusbox className="w-max">
                    <motion.div
                        className={`${className} bg-glass text-glass-foreground flex items-end w-max gap-4 py-0 px-3`}
                        role="toolbar"
                        aria-label="Application dock"
                    >
                        {items.map((item, index) => {
                            if (item.link === path) return null;
                            return (
                                <Link href={item.link as unknown as UrlObject} key={item.link}>
                                    <div className="hover:scale-105 transition-all cursor-pointer">
                                        <p className="text-xl m-0 px-3 py-3">{item.label}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </motion.div>
                </Plusbox>
            </div>
        </>
    );
}