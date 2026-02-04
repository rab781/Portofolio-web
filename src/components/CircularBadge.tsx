'use client';

import { motion } from "framer-motion";

interface CircularTextProps {
    text: string;
    radius?: number;
    className?: string;
}

export default function CircularText({
    text = "CERTIFIED • CREATIVE • DEVELOPER • ",
    radius = 50,
    className = ""
}: CircularTextProps) {
    const characters = text.split("");
    const totalChars = characters.length;
    const degrees = 360 / totalChars;

    return (
        <motion.div
            className={`relative flex items-center justify-center ${className}`}
            style={{ width: radius * 2, height: radius * 2 }}
            animate={{ rotate: 360 }}
            transition={{ ease: "linear", duration: 10, repeat: Infinity }}
        >
            {characters.map((char, i) => (
                <span
                    key={i}
                    className="absolute text-xs font-bold uppercase tracking-widest text-slate-900"
                    style={{
                        transform: `rotate(${i * degrees}deg) translateY(-${radius}px)`,
                        transformOrigin: "center center", // This is redundant if origin is center, but explicit is good
                        height: `${radius}px`, // This trick aligns them from center
                        // actually standard way: absolute left-1/2 top-1/2, then rotate and translate Y
                    }}
                >
                    {/* We need better positioning logic for React. 
              Let's use a simpler known method: 
              Absolute center, then rotate(deg) translate(radius).
          */}
                </span>
            ))}

            {/* Redoing the logic cleanly below */}
            <div className="absolute inset-0 animate-spin-slow w-full h-full">
                {/* Using SVG is much safer for circular text than CSS rotation on spans for perfect alignment */}
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="none"
                    />
                    <text className="text-[11px] font-bold uppercase tracking-[0.15em]" fill="currentColor">
                        <textPath href="#circlePath" startOffset="0%">
                            {text}
                        </textPath>
                    </text>
                </svg>
            </div>
        </motion.div>
    );
}
