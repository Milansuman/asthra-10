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

export type DockItemData = {
    icon?: React.ReactNode;
    label: React.ReactNode;
    link?: string;
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
        <div className="fixed z-40 sm:left-auto left-0 sm:overflow-x-auto p-2 no-scrollbar overflow-y-hidden overflow-x-scroll bottom-[6px] right-[6px] w-auto">
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
                    className={`${className} bg-glass text-glass-foreground flex items-end w-max gap-4  py-0 px-3`}
                    role="toolbar"
                    aria-label="Application dock"
                >
                    {items.map((item, index) => {
                        const Wrapper = item.link ? Link : "div";
                        const props = item.link ? { href: item.link } : { onClick: item.onClick };
                        if (item.link === path) return <></>;
                        return (
                            <Wrapper {...(props as any)} key={index}>
                                <div key={index} className="hover:scale-105 transition-all cursor-pointer">
                                    <p className="text-xl m-0 px-3 py-3 ">{item.label}</p>
                                </div>
                            </Wrapper>
                        )
                    })}
                </motion.div>
            </Plusbox>
        </div>
    );
}
