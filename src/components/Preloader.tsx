'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Counter animation from 0 to 100
        const duration = 1000; // 2 seconds loading
        const steps = 20;
        const intervalTime = duration / steps;

        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 5;
            });
        }, intervalTime);

        // Call onComplete shortly after reaching 100
        const completeTimer = setTimeout(() => {
            onComplete();
        }, duration + 800); // Wait a bit after 100%

        return () => {
            clearInterval(timer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#ffffff] text-black"
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            {/* Decorative Lines */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-transparent opacity-20" />

            <div className="relative z-10 flex flex-col items-center">
                <div className="text-8xl md:text-9xl font-bold tracking-tighter tabular-nums">
                    {count}%
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-sm uppercase tracking-[0.3em] text-gray-400"
                >
                    Loading Experience
                </motion.div>
            </div>

            {/* Abstract Background Element */}
            <div className="absolute bottom-10 right-10 opacity-10">
                <svg width="200" height="200" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="2" />
                </svg>
            </div>
        </motion.div>
    );
}
