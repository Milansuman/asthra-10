'use client'

import {
    motion,
    MotionValue,
    useMotionValue,
    useSpring,
    useTransform,
    type SpringOptions,
    AnimatePresence,
} from "motion/react";
import React, {
    Children,
    cloneElement,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Plusbox from "./box";

export type DockItemData = {
    icon: React.ReactNode;
    label: React.ReactNode;
    onClick: () => void;
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
    const mouseX = useMotionValue(Infinity);
    const isHovered = useMotionValue(0);

    const maxHeight = useMemo(
        () => Math.max(dockHeight, magnification + magnification / 2 + 4),
        [magnification]
    );
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
    const height = useSpring(heightRow, spring);

    return (
        <Plusbox className="fixed z-[999] bottom-[30px] left-1/2 -translate-x-1/2 p-2 border border-white/[0.2]">
            <motion.div
                // onMouseMove={({ pageX }) => {
                //     isHovered.set(1);
                //     mouseX.set(pageX);
                // }}
                // onMouseLeave={() => {
                //     isHovered.set(0);
                //     mouseX.set(Infinity);
                // }}
                className={`${className}  glass   flex items-end w-max gap-4  py-0 px-3`}
                role="toolbar"
                aria-label="Application dock"
            >
                {items.map((item, index) => (
                    <div key={index} className="hover:scale-105 transition-all cursor-pointer">
                        <p className="text-2xl m-0 px-3 py-3 ">{item.label}</p>
                    </div>
                ))}
            </motion.div>
        </Plusbox>
    );
}
