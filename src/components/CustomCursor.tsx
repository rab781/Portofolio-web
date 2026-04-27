"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ⚡ Bolt: Hoist static springConfig object outside the component body
// to prevent unnecessary object allocation on every render.
const SPRING_CONFIG = { damping: 25, stiffness: 700 };

export default function CustomCursor() {
    // ⚡ Bolt: Use motion values for scale to avoid React re-renders on hover
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const scale = useMotionValue(1);

    const cursorXSpring = useSpring(cursorX, SPRING_CONFIG);
    const cursorYSpring = useSpring(cursorY, SPRING_CONFIG);
    const scaleSpring = useSpring(scale, SPRING_CONFIG);

    useEffect(() => {
        let ticking = false;
        let lastClientX = 0;
        let lastClientY = 0;

        const moveCursor = (e: MouseEvent) => {
            lastClientX = e.clientX;
            lastClientY = e.clientY;

            if (!ticking) {
                // ⚡ Bolt: Throttling high-frequency mousemove events with requestAnimationFrame.
                // This prevents updating the motion values more than once per frame,
                // significantly reducing main-thread CPU usage during fast mouse movements.
                window.requestAnimationFrame(() => {
                    cursorX.set(lastClientX - 16);
                    cursorY.set(lastClientY - 16);
                    ticking = false;
                });
                ticking = true;
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest(".hover-mark")) {
                scale.set(2.5);
            } else {
                scale.set(1);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY, scale]);

    return (
        <motion.div
            className="fixed left-0 top-0 w-8 h-8 bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                scale: scaleSpring,
            }}
        />
    );
}
