"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue, MotionValue } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

/**
 * @property {React.ReactNode} children - The child elements to be wrapped
 */
interface PointerWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * A component that wraps content and adds a custom pointer animation when hovering
 * over the wrapped area. The pointer follows the mouse movement within the wrapped area.
 *
 * @component
 * @param {PointerWrapperProps} props - The component props
 */
export function PointerWrapper({
  children,
  className,
  ...props
}: PointerWrapperProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isInside, setIsInside] = useState<boolean>(false);

  useEffect(() => {
    function updateRect() {
      if (ref.current) {
        setRect(ref.current.getBoundingClientRect());
      }
    }

    // Initial rect calculation
    updateRect();

    // Update rect on window resize
    window.addEventListener("resize", updateRect);

    return () => {
      window.removeEventListener("resize", updateRect);
    };
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (rect) {
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    }
  }

  function handleMouseLeave() {
    setIsInside(false);
  }

  function handleMouseEnter() {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
      setIsInside(true);
    }
  }

  return (
    <div
      ref={ref}
      className={cn("relative cursor-none", className)}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <AnimatePresence>{isInside && <Pointer x={x} y={y} />}</AnimatePresence>
      {children}
    </div>
  );
}

/**
 * @property {MotionValue<number>} x - The x-coordinate position of the pointer
 * @property {MotionValue<number>} y - The y-coordinate position of the pointer
 */
interface PointerProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * A custom pointer component that displays an animated arrow cursor
 *
 * @description Used internally by PointerWrapper to show the custom cursor
 *
 * @component
 * @param {PointerProps} props - The component props
 */
function Pointer({ x, y }: PointerProps) {
  return (
    <motion.div
      className="pointer-events-none absolute z-50"
      style={{
        top: y,
        left: x,
      }}
      initial={{
        scale: 0,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        width="37"
        height="37"
        viewBox="0 0 74 74"
        className="translate-x-[-18.5px] translate-y-[-18.5px] rotate-[0deg]"
      >
        <defs>
          <linearGradient id="cursorGradient" x1="1.84011" y1="-3.15993" x2="53.1388" y2="48.1388">
            <stop offset="0%" stopColor="#9EF1FD" />
            <stop offset="100%" stopColor="#1FC9FF" />
          </linearGradient>
          <filter id="cursorShadow" x="0.42" y="0.79" width="73" height="72.33" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="4" stdDeviation="2" floodOpacity="0.25"/>
            <feDropShadow dx="0" dy="4" stdDeviation="2" floodOpacity="0.1"/>
          </filter>
        </defs>
        <path
          d="M4.75615 6.0681C12.5923 23.5452 24.0154 49.2279 29.7566 62.8144C30.8938 65.5057 34.5727 65.9755 36.1677 63.5276C40.2291 57.2946 42.5104 51.2695 41.534 42.199C41.2744 39.787 43.1349 37.591 45.5604 37.5508C55.078 37.3927 61.1261 35.2549 68.0784 29.858C70.2637 28.1617 69.6481 24.7901 67.0748 23.7743L9.54168 1.06387C6.42436 -0.166655 3.38501 3.01003 4.75615 6.0681Z"
          fill="url(#cursorGradient)"
          filter="url(#cursorShadow)"
        />
      </svg>
    </motion.div>
  );
}
