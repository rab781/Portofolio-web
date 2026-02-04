'use client';

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ScrollLine() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svgHeight, setSvgHeight] = useState(0);

    // Track scroll progress relative to this container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end end"]
    });

    const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

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
                    top: useTransform(pathLength, [0, 1], ["0%", "100%"]),
                    zIndex: 10
                }}
            />
        </div>
    );
}
