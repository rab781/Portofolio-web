'use client';

import { useInView } from "framer-motion";
import { useRef } from "react";

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
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "0px 0px -50px 0px" });

    return (
        <div
            ref={ref}
            className={`relative flex items-center justify-center ${isInView ? 'circular-spin' : ''} ${className}`}
            style={{ width: radius * 2, height: radius * 2 }}
        >
            <div className="absolute inset-0 w-full h-full">
                {/*
                  Performance Optimization:
                  Replaced legacy DOM-heavy implementation (30+ span elements) with a single SVG <textPath>.
                  This reduces DOM node count, improves rendering performance, and prevents layout thrashing.
                */}
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
        </div>
    );
}
