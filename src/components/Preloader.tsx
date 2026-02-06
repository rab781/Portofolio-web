'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import DecryptedText from './DecryptedText';


export default function Preloader({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        const duration = 1600; // Total loading time for the effect

        // Call onComplete after the duration
        const completeTimer = setTimeout(() => {
            onComplete();
        }, duration);

        return () => {
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

            <div className="relative z-10 flex flex-col items-center justify-center">
                <DecryptedText
                    text="Hello World !"
                    speed={30}
                    maxIterations={10}
                    sequential={true}
                    revealDirection="start"
                    useOriginalCharsOnly={false}
                    animateOn="auto"
                    className="text-7xl md:text-9xl font-bold tracking-tighter"
                    parentClassName="text-7xl md:text-9xl font-bold tracking-tighter"
                    encryptedClassName="text-gray-400"
                />
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
