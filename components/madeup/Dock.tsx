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
        <motion.div
            style={{ height, scrollbarWidth: "none" }}
            className="mx-2 flex max-w-full items-center"
        >
            <motion.div
                // onMouseMove={({ pageX }) => {
                //     isHovered.set(1);
                //     mouseX.set(pageX);
                // }}
                // onMouseLeave={() => {
                //     isHovered.set(0);
                //     mouseX.set(Infinity);
                // }}
                className={`${className} absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-4 rounded-md border-white/40 border-2 pb-2 px-4`}
                style={{ height: panelHeight }}
                role="toolbar"
                aria-label="Application dock"
            >
                {items.map((item, index) => (
                    <div key={index} className="">
                        <p className="text-[10px]">{item.label}</p>
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
}
