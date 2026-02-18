'use client';

import { useScroll, useSpring, motion, useTransform } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useRef } from "react";

const experiences = [
    {
        role: "Head of Practicum Assistant Division",
        org: "Artificial Intelligence Laboratory",
        period: "Jan 2025 - Present",
        desc: "Coordinated practicum execution for 12 core courses including Machine Learning and Deep Learning. Led a team of assistants, managed teaching standards, and provided technical mentoring for new staff.",
        tags: ["Management", "Leadership", "Technical Mentoring"]
    },
    {
        role: "Head of Strategic Studies & Action",
        org: "Student Executive Board (BEM Fasilkom)",
        period: "Jan 2025 - Present",
        desc: "Led the division in formulating strategic issue studies and organizational stances. Managed staff performance to achieve effective work programs and advocated for student and social-political issues.",
        tags: ["Strategic Leadership", "Public Advocacy", "Team Management"]
    },
    {
        role: "Publication & Documentation Staff",
        org: "Artificial Intelligence Laboratory",
        period: "Jan 2024 - Dec 2024",
        desc: "Managed lab branding through social media and campus communication channels to increase student awareness. Provided creative visual and documentation support for workshops and seminars.",
        tags: ["Branding", "Social Media", "Event Support"]
    },
    {
        role: "Student Advocacy & Welfare Staff",
        org: "Student Executive Board (BEM Fasilkom)",
        period: "Jan 2024 - Dec 2024",
        desc: "Bridged communication between students and the dean's office regarding academic and facility issues. Handled student complaints responsively and provided tactical solutions for administrative problems.",
        tags: ["Student Advocacy", "Problem Solving", "Communication"]
    }
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll progress specifically for this container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scrollY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Vertical line fills up
    const lineHeight = useTransform(scrollY, [0, 1], ["0%", "100%"]);

    return (
        <section className="relative py-32 overflow-hidden" ref={containerRef}>
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent pointer-events-none" />

            <div className="container-width px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center gap-6 mb-24 md:mb-32"
                >
                    <div className="p-4 rounded-3xl bg-white shadow-lg shadow-orange-100/50 text-[#FFA239] ring-1 ring-orange-50 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-orange-100/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-3xl" />
                        <Briefcase size={32} strokeWidth={1.5} className="relative z-10" />
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-sm font-bold tracking-[0.2em] text-[#FFA239] uppercase mb-2">
                            My Journey
                        </h2>
                        <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111]">
                            Experience & <span className="text-gray-400">Growth</span>
                        </h3>
                    </div>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* ANIMATED TIMELINE TRACK */}
                    <div className="absolute left-[20px] md:left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-200 to-transparent md:-translate-x-1/2">
                        <motion.div
                            style={{ height: lineHeight }}
                            className="w-full bg-[#FFA239] origin-top shadow-[0_0_10px_rgba(255,162,57,0.5)]"
                        />
                    </div>

                    <div className="space-y-24">
                        {experiences.map((exp, idx) => (
                            <div key={idx} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-between group ${idx % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}>
                                {/* Timeline Node */}
                                <div className="absolute left-[20px] md:left-[50%] top-0 md:-translate-x-1/2 w-3 h-3 z-20">
                                    <div className="absolute inset-0 bg-white rounded-full ring-4 ring-gray-100 group-hover:ring-[#FFA239]/20 transition-all duration-500" />
                                    <div className="absolute inset-0 bg-[#FFA239] rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                                </div>

                                {/* Content Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                                    className={`
                                        w-full md:w-[45%] pl-12 md:pl-0
                                        ${idx % 2 === 0 ? "md:text-left" : "md:text-right"}
                                    `}
                                >
                                    <div className="
                                        relative overflow-hidden
                                        p-8 rounded-3xl
                                        bg-white/60 backdrop-blur-xl
                                        border border-white/60
                                        shadow-[0_4px_20px_-2px_rgba(0,0,0,0.02)]
                                        hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.05)]
                                        hover:-translate-y-1
                                        transition-all duration-500
                                    ">
                                        {/* Subtle Highlight */}
                                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />

                                        <div className={`flex flex-col gap-2 mb-4 ${idx % 2 === 0 ? "md:items-start" : "md:items-end"
                                            }`}>
                                            <span className="inline-block px-3 py-1 rounded-full bg-[#f4f4f5] text-xs font-semibold text-gray-500 tracking-wide uppercase">
                                                {exp.period}
                                            </span>
                                            <h4 className="text-xl font-bold text-gray-900 leading-tight">
                                                {exp.role}
                                            </h4>
                                            <div className="text-[#FFA239] font-medium tracking-tight">
                                                {exp.org}
                                            </div>
                                        </div>

                                        <p className="text-gray-500 leading-relaxed text-sm mb-6">
                                            {exp.desc}
                                        </p>

                                        {/* Tags */}
                                        <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? "md:justify-start" : "md:justify-end"
                                            }`}>
                                            {exp.tags?.map((tag, tIdx) => (
                                                <span key={tIdx} className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Empty Spacer for layout balance */}
                                <div className="hidden md:block w-[45%]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
