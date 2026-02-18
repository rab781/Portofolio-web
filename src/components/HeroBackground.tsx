"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Use CSS variables for high-performance mouse tracking
        // No React re-renders, no batched updates, just direct DOM manipulation
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            container.style.setProperty("--mouse-x", `${x}px`);
            container.style.setProperty("--mouse-y", `${y}px`);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Grid configuration
    const gridSize = 40;

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
            style={{ "--mouse-x": "-1000px", "--mouse-y": "-1000px" } as React.CSSProperties}
        >
            {/* Base Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: `${gridSize}px ${gridSize}px`
                }}
            />

            {/* Flashlight Effect - Single Composite Layer */}
            {/* Instead of 40 individual cells checking distance, we use one mask */}
            <div
                className="absolute inset-0 bg-accent-blue/5"
                style={{
                    maskImage: "radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), black, transparent)",
                    WebkitMaskImage: "radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), black, transparent)",
                }}
            />

            {/* Active Grid Cells Highlight */}
            {/* Uses a second pattern layer that is revealed by the mask */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)`,
                    backgroundSize: `${gridSize}px ${gridSize}px`,
                    maskImage: "radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), black, transparent)",
                    WebkitMaskImage: "radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), black, transparent)",
                }}
            />

            {/* Radial Fade Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#8CE4FF] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#8CE4FF_100%)] opacity-60" />
        </div>
    );
}
