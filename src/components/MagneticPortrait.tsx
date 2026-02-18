"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code, Zap, Sparkles } from "lucide-react";

export default function MagneticPortrait() {
    const ref = useRef<HTMLDivElement>(null);
    const rectRef = useRef<{ width: number; height: number; left: number; top: number } | null>(null);

    // Motion values for mouse position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth tilt
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), springConfig);

    // Parallax for floating elements (move more than the card)
    const floatX = useSpring(useTransform(x, [-0.5, 0.5], [-30, 30]), springConfig);
    const floatY = useSpring(useTransform(y, [-0.5, 0.5], [-30, 30]), springConfig);

    // Background Parallax (moves opposite)
    const bgX = useSpring(useTransform(x, [-0.5, 0.5], [20, -20]), springConfig);
    const bgY = useSpring(useTransform(y, [-0.5, 0.5], [20, -20]), springConfig);

    // ⚡ Bolt: Invalidates cached rect on resize to ensure accuracy
    useEffect(() => {
        const handleResize = () => {
            rectRef.current = null;
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const updateRect = () => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        rectRef.current = {
            width: rect.width,
            height: rect.height,
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!rectRef.current) {
            updateRect();
        }

        const rect = rectRef.current;
        if (!rect) return;

        const width = rect.width;
        const height = rect.height;

        // Normalized coordinates (-0.5 to 0.5)
        // 0,0 is center
        // ⚡ Bolt: Use pageX/Y and cached rect to avoid getBoundingClientRect thrashing
        const mouseX = e.pageX - rect.left;
        const mouseY = e.pageY - rect.top;

        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseEnter = () => {
        updateRect();
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[4/5] cursor-none perspective-1000 group"
            style={{ perspective: 1000 }}
        >
            {/* 3D Container */}
            {/* ⚡ Bolt: pointer-events-none ensures mouse events always target the parent, making offsetX reliable */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full h-full rounded-2xl bg-gray-100 shadow-xl transition-shadow duration-500 hover:shadow-2xl hover:shadow-blue-500/20 pointer-events-none"
            >
                {/* Background Elements (Depth -50) */}
                <div
                    className="absolute inset-0 rounded-2xl overflow-visible"
                    style={{ transform: "translateZ(-50px)" }}
                >
                    <div className="absolute -inset-10 bg-gradient-to-tr from-blue-100/50 to-orange-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700" />
                    <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
                        {/* GeometricShards removed for performance - already in hero */}
                    </motion.div>
                </div>

                {/* Main Image (Depth 0) */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white border border-white/50" style={{ transform: "translateZ(0px)" }}>
                    <Image
                        src="/cartoon-pose.png"
                        alt="Raihan Rabbani"
                        fill
                        className="object-cover pointer-events-none filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                        priority
                    />
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
                </div>

                {/* Floating Sticker 1: Code (Depth 60) */}
                <motion.div
                    style={{ x: floatX, y: floatY, z: 60 }}
                    className="absolute -right-6 top-20 bg-white p-3 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-2"
                >
                    <div className="bg-[#111111] p-1.5 rounded-lg text-white">
                        <Code size={18} />
                    </div>
                    <span className="font-bold text-xs text-gray-800 pr-2">Developer</span>
                </motion.div>

                {/* Floating Sticker 2: Energy (Depth 80) */}
                <motion.div
                    style={{ x: floatX, y: floatY, z: 80 }}
                    className="absolute -left-6 bottom-32 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-100"
                >
                    <div className="bg-[#FFA239] p-2 rounded-full text-white animate-pulse">
                        <Zap size={20} fill="currentColor" />
                    </div>
                </motion.div>

                {/* Floating Sticker 3: Creative (Depth 40) */}
                <motion.div
                    style={{ x: floatX, y: floatY, z: 40 }}
                    className="absolute right-8 -bottom-6 bg-[#111111] text-white py-2 px-4 rounded-full shadow-xl flex items-center gap-2"
                >
                    <Sparkles size={14} className="text-[#FEEE91]" />
                    <span className="text-xs font-bold tracking-wider uppercase">Creative</span>
                </motion.div>

            </motion.div>
        </motion.div>
    );
}
