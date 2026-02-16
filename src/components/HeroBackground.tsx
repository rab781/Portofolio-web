"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useMotionValue, useTransform, MotionValue } from "framer-motion";

interface CellData {
    id: number;
    row: number;
    col: number;
    duration: number;
    delay: number;
}

interface CellProps {
    cell: CellData;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    gridSize: number;
}

function Cell({ cell, mouseX, mouseY, gridSize }: CellProps) {
    const x = cell.col * gridSize;
    const y = cell.row * gridSize;
    const [isNear, setIsNear] = useState(false);

    // ⚡ Bolt: Calculate distance using motion values to avoid React render loop
    const distance = useTransform([mouseX, mouseY], ([mx, my]) => {
        const dx = (mx as number) - x;
        const dy = (my as number) - y;
        return Math.sqrt(dx * dx + dy * dy);
    });

    useEffect(() => {
        const unsubscribe = distance.on("change", (d) => {
            const near = d < 250;
            // Only trigger re-render if state actually changes
            setIsNear(prev => {
                if (prev !== near) return near;
                return prev;
            });
        });
        return unsubscribe;
    }, [distance]);

    return (
        <motion.div
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
}

export default function HeroBackground({ paused = false }: { paused?: boolean }) {
    const [mounted, setMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        setMounted(true);

        if (paused) return;

        // ⚡ Bolt: Direct motion value update
        // Removes React re-renders completely on mouse move
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY, paused]);

    // Grid configuration
    const gridSize = 40;
    const numRows = 20;
    const numCols = 30;

    // Generate random blinking cells
    // ⚡ Bolt: Memoized to prevent regenerating 40 objects on every render
    const blinkingCells = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        row: Math.floor(Math.random() * numRows),
        col: Math.floor(Math.random() * numCols),
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 5,
    })), []);

    // Hooks must be called before conditional return
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
            {!paused && blinkingCells.map((cell) => (
                <Cell
                    key={cell.id}
                    cell={cell}
                    mouseX={mouseX}
                    mouseY={mouseY}
                    gridSize={gridSize}
                />
            ))}

            {/* Radial Fade Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#8CE4FF] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#8CE4FF_100%)] opacity-60" />
        </div>
    );
}
