"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const mousePosRef = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Use CSS variables for high-performance mouse tracking
        // No React re-renders, no batched updates, just direct DOM manipulation
        const handleMouseMove = (e: MouseEvent) => {
            // Store the latest mouse coordinates (trailing edge)
            mousePosRef.current = { x: e.clientX, y: e.clientY };

            // If a frame is already scheduled, we don't need to do anything
            if (rafRef.current) return;

            rafRef.current = requestAnimationFrame(() => {
                if (!mousePosRef.current) return;

                // Read the latest mouse position
                const { x: clientX, y: clientY } = mousePosRef.current;

                // Get the bounding rect relative to the viewport at the moment of the paint
                // This ensures we account for scroll position correctly
                const rect = container.getBoundingClientRect();

                const x = clientX - rect.left;
                const y = clientY - rect.top;

                container.style.setProperty("--mouse-x", `${x}px`);
                container.style.setProperty("--mouse-y", `${y}px`);

                rafRef.current = null;
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
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
