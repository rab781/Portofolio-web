"use client";

import { motion } from "framer-motion";

export default function GeometricShards() {
    return (
        <div className="absolute inset-0 pointer-events-none z-[-1]" style={{ perspective: "1000px" }}>
            {/* White Triangles - 3D Float */}
            <motion.div
                className="absolute w-28 h-28 bg-white shadow-xl backdrop-blur-sm"
                style={{
                    top: "20%",
                    left: "-10%",
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    rotate: -15,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                animate={{
                    y: [-15, 15, -15],
                    rotate: [-15, -5, -15],
                    rotateX: [0, 10, 0],
                    rotateY: [0, 15, 0],
                    z: [0, 20, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute w-20 h-20 bg-white/90 shadow-lg backdrop-blur-md"
                style={{
                    top: "60%",
                    right: "-15%",
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    rotate: 45,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                animate={{
                    y: [15, -15, 15],
                    rotate: [45, 55, 45],
                    rotateX: [0, -10, 0],
                    z: [0, 30, 0]
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            {/* Yellow Accents - Pop */}
            <motion.div
                className="absolute w-14 h-14 bg-[#FFA239] shadow-orange-500/20 shadow-2xl"
                style={{
                    top: "10%",
                    right: "5%",
                    clipPath: "polygon(0 0, 0% 100%, 100% 50%)",
                    rotate: 15,
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [15, 25, 15],
                    z: [0, 40, 0]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Teal Accent */}
            <motion.div
                className="absolute w-8 h-8 bg-[#2563EB]"
                style={{
                    bottom: "20%",
                    left: "-5%",
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", // Diamond
                    rotate: -20,
                }}
                animate={{
                    rotate: [-20, 340],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    );
}
