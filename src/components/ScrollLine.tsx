'use client';

import { motion, useScroll, useSpring, useTransform, UseScrollOptions } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ⚡ Bolt: Hoisted static Framer Motion configuration arrays outside the component body
// to prevent unnecessary array allocations during initial mount and non-scroll re-renders.
// Note: Framer Motion hooks return MotionValues, so this component does not re-render
// on every scroll tick. Hoisting saves allocations when the component is explicitly re-rendered (e.g., via state changes).
const SCROLL_OFFSET: UseScrollOptions["offset"] = ["start center", "end end"];
const TRANSFORM_INPUT = [0, 1];
const TRANSFORM_OUTPUT = ["0%", "100%"];

const SPRING_CONFIG = { stiffness: 400, damping: 90 };

export default function ScrollLine() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svgHeight, setSvgHeight] = useState(0);

    // Track scroll progress relative to this container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: SCROLL_OFFSET
    });

    const pathLength = useSpring(scrollYProgress, SPRING_CONFIG);

    // Hoist useTransform calls to top level — Rules of Hooks requirement
    const dotTop = useTransform(pathLength, TRANSFORM_INPUT, TRANSFORM_OUTPUT);

    useEffect(() => {
        if (containerRef.current) {
            setSvgHeight(containerRef.current.offsetHeight);
        }
    }, []);

    // Simple S-curve path generator based on height
    // Starts top-center, curves left, then right, then center

    return (
        <div
            ref={containerRef}
            className="absolute top-0 left-4 md:left-1/2 md:-ml-px w-10 md:w-px h-full pointer-events-none z-0 hidden md:block"
            aria-hidden="true"
        >
            <svg
                className="overflow-visible w-[40px] md:w-[200px] h-full -ml-[20px] md:-ml-[100px]"
                preserveAspectRatio="none"
            >
                {/* Background Trace (Gray) */}
                <path
                    d={`M 100 0 V ${svgHeight}`} // Vertical straight line down center
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                />

                {/* Animated Fill (Pop Orange) */}
                <motion.path
                    d={`M 100 0 V ${svgHeight}`}
                    fill="none"
                    stroke="#FFA239"
                    strokeWidth="4"
                    style={{ pathLength }}
                />
            </svg>

            {/* Moving Dot indicator */}
            <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FFA239] rounded-full shadow-lg shadow-orange-400/50"
                style={{
                    top: dotTop,
                    zIndex: 10
                }}
            />
        </div>
    );
}
