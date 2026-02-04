'use client';

import { useScroll, useSpring, motion, useTransform } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useRef } from "react";

// Mock Data - User can update this
const experiences = [
    {
        role: "Head of AI Research",
        org: "University Tech Club",
        period: "2023 - Present",
        desc: "Leading a team of 15 students in researching LLMs and Computer Vision methods for localized applications."
    },
    {
        role: "Full Stack Developer Intern",
        org: "Tech Solutions Inc.",
        period: "2022 - 2023",
        desc: "Developed scalable APIs and optimized database queries for high-volume traffic, reducing latency by 40%."
    },
    {
        role: "Junior Web Developer",
        org: "Creative Studio",
        period: "2021 - 2022",
        desc: "Built responsive frontend interfaces for 10+ client projects using React and Tailwind CSS."
    }
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll progress specifically for this container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const scrollY = useSpring(scrollYProgress, {
        stiffness: 100, // Smooth spring
        damping: 30,
        restDelta: 0.001
    });

    // Calculate height for SVG line
    // We want the line to fill as we scroll down
    const lineHeight = useTransform(scrollY, [0, 1], ["0%", "100%"]);

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-12 mb-32" ref={containerRef}>
            <div className="flex items-center gap-4 mb-12">
                <span className="p-3 rounded-2xl bg-[#FFE4E4] text-[#FF5656]">
                    <Briefcase size={28} />
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#111111]">
                    Organizational <span className="text-gray-400">Leadership</span>
                </h2>
            </div>

            <div className="relative ml-4 md:ml-8">

                {/* ANIMATED TIMELINE LINE */}
                <div className="absolute left-0 top-2 bottom-0 w-[2px] bg-gray-100/50">
                    <motion.div
                        style={{ height: lineHeight }}
                        className="w-full bg-[#FFA239] origin-top"
                    />
                </div>

                <div className="space-y-16">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative pl-8 md:pl-12 group"
                        >
                            {/* Timeline Dot - Becomes orange on hover or scroll? Let's just keep it simple white/orange border */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: idx * 0.2 + 0.2, type: 'spring' }}
                                className="absolute -left-[9px] top-2 w-[18px] h-[18px] rounded-full bg-white border-[4px] border-gray-200 group-hover:border-[#FFA239] transition-colors z-10"
                            />

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#111111] group-hover:text-[#FFA239] transition-colors">{exp.role}</h3>
                                    <div className="text-base font-semibold text-gray-500 mt-1">{exp.org}</div>
                                </div>
                                <span className="inline-block mt-2 md:mt-0 px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-500 text-sm font-medium w-fit">
                                    {exp.period}
                                </span>
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                                {exp.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
