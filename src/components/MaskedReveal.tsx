"use client";

import { motion } from "framer-motion";

interface MaskedRevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export default function MaskedReveal({ children, delay = 0, className = "" }: MaskedRevealProps) {
    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: delay,
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
