'use client'

import {
    type MotionValue,
    type SpringOptions,
    motion,
    useMotionValue,
    useSpring,
    useTransform
} from "motion/react";
import type React from "react";
import {
    useMemo
} from "react";
import Plusbox from "./box";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UrlObject } from "node:url";

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
    const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
    const isHovered = useMotionValue(0);
    const path = usePathname();

    const maxHeight = useMemo(
        () => Math.max(dockHeight, magnification + magnification / 2 + 4),
        [magnification]
    );
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
    const height = useSpring(heightRow, spring);

    return (
        <div className="fixed z-20 left-1/2 -translate-x-1/2 overflow-hidden p-2 no-scrollbar bottom-[6px] w-auto">
            <Plusbox className="w-max">
                <motion.div
                    // onMouseMove={({ pageX }) => {
                    //     isHovered.set(1);
                    //     mouseX.set(pageX);
                    // }}
                    // onMouseLeave={() => {
                    //     isHovered.set(0);
                    //     mouseX.set(Infinity);
                    // }}
                    key={"dock"}
                    className={`${className} bg-glass text-glass-foreground flex items-end w-max gap-4  py-0 px-3`}
                    role="toolbar"
                    aria-label="Application dock"
                >
                    {items.map((item, index) => {
                        if (item.link === path) return null;

                        return (
                            <Link href={item.link as unknown as UrlObject} key={item.link}>
                                <div className="hover:scale-105 transition-all cursor-pointer">
                                    <p className="text-xl m-0 px-3 py-3 ">{item.label}</p>
                                </div>
                            </Link>
                        )
                    })}
                </motion.div>
            </Plusbox>
        </div>
    );
}
