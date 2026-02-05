"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GradientMesh() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    // Animation variants for floating orbs
    const floatAnimation = (delay: number) => ({
        y: ["0%", "-20%", "0%"],
        x: ["0%", "10%", "0%"],
        scale: [1, 1.1, 1],
        rotate: [0, 45, 0],
        opacity: [0.3, 0.6, 0.3],
        transition: {
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror" as const,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ease: [0.4, 0.0, 0.2, 1] as any,
            delay: delay,
        },
    });

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#F9FAFB]">
            <div className="absolute inset-0 bg-noise opacity-[0.03]" />

            {/* Orb 1: Soft Blue - Top Left */}
            <motion.div
                animate={floatAnimation(0)}
                className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#8CE4FF] opacity-20 blur-[120px] mix-blend-multiply"
            />

            {/* Orb 2: Warm Orange - Center Right */}
            <motion.div
                animate={floatAnimation(5)}
                className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#FFA239] opacity-15 blur-[100px] mix-blend-multiply"
            />

            {/* Orb 3: Accent Red - Bottom Left */}
            <motion.div
                animate={floatAnimation(2)}
                className="absolute bottom-[10%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-[#FF5656] opacity-10 blur-[130px] mix-blend-multiply"
            />

            {/* Orb 4: Pale Yellow - Bottom Right */}
            <motion.div
                animate={floatAnimation(8)}
                className="absolute -bottom-[20%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-[#FEEE91] opacity-20 blur-[110px] mix-blend-multiply"
            />
        </div>
    );
}
