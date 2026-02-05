"use client";

import { useEffect, useState, useMemo, memo } from "react";
import { motion } from "framer-motion";

function HeroBackground() {
    const [mounted, setMounted] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Grid configuration
    const gridSize = 40;
    const numRows = 20;
    const numCols = 30;

    // Generate random blinking cells
    // Optimized: Memoized to prevent regeneration on every render/mouse move
    // This stops the cells from jumping around chaotically when the mouse moves
    const blinkingCells = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        row: Math.floor(Math.random() * numRows),
        col: Math.floor(Math.random() * numCols),
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 5,
    })), [numRows, numCols]);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Base Grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: `${gridSize}px ${gridSize}px`
                }}
            />

            {/* Blinking & Interactive Data Points */}
            {blinkingCells.map((cell) => {
                const x = cell.col * gridSize;
                const y = cell.row * gridSize;
                const dx = mousePosition.x - x;
                const dy = mousePosition.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const isNear = distance < 250;

                return (
                    <motion.div
                        key={cell.id}
                        className="absolute bg-accent-blue/20"
                        style={{
                            width: gridSize - 1,
                            height: gridSize - 1,
                            top: y + 1,
                            left: x + 1,
                        }}
                        animate={{
                            opacity: isNear ? 0.6 : [0, 0.4, 0],
                            scale: isNear ? 1.1 : 1,
                            backgroundColor: isNear ? "#2563EB" : "rgba(0, 0, 0, 0.1)"
                        }}
                        transition={{
                            duration: isNear ? 0.3 : cell.duration,
                            repeat: isNear ? 0 : Infinity,
                            delay: isNear ? 0 : cell.delay,
                            ease: "easeInOut",
                        }}
                    />
                );
            })}

            {/* Radial Fade Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#8CE4FF] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#8CE4FF_100%)] opacity-60" />
        </div>
    );
}

export default memo(HeroBackground);
