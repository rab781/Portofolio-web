"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // ⚡ Bolt: Cache layout measurements and throttle updates to prevent layout thrashing
        let rect = container.getBoundingClientRect();
        let mouseX = 0;
        let mouseY = 0;
        let ticking = false;

        const updatePosition = () => {
            // Calculate relative to the cached rect
            // Since HeroBackground is fixed/absolute in a non-scrolling context, this is performant.
            const x = mouseX - rect.left;
            const y = mouseY - rect.top;

            container.style.setProperty("--mouse-x", `${x}px`);
            container.style.setProperty("--mouse-y", `${y}px`);
            ticking = false;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!ticking) {
                window.requestAnimationFrame(updatePosition);
                ticking = true;
            }
        };

        const handleResize = () => {
            rect = container.getBoundingClientRect();
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
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
