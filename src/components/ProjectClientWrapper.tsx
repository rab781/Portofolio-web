"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Github, ExternalLink, Brain, CheckCircle } from "lucide-react";
import type { Project } from "@/types/project";
import MaskedReveal from "@/components/MaskedReveal";
import GeometricShards from "@/components/GeometricShards";

export default function ProjectClientWrapper({ project }: { project: Project }) {
    return (
        <article className="min-h-screen bg-[#8CE4FF] text-[#111111] selection:bg-orange-100 selection:text-orange-900 overflow-hidden relative">

            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#8CE4FF] to-[#F9FAFB] h-[100vh]" />
                <div className="absolute inset-0 bg-noise opacity-30" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 pt-12 pb-24">

                {/* Navigation */}
                <Link
                    href="/#projects"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white/50 backdrop-blur-md border border-white/40 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-white hover:border-[#FFA239] hover:text-[#FFA239] transition-all shadow-sm mb-12"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Works
                </Link>

                {/* Header Section */}
                <header className="mb-20 relative">

                    <GeometricShards />

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <MaskedReveal delay={0.1}>
                            <span className="px-4 py-1.5 rounded-full border border-gray-900/5 bg-white text-xs font-bold tracking-widest text-[#FF5656] uppercase shadow-sm">
                                {project.category}
                            </span>
                        </MaskedReveal>
                        <span className="h-px w-8 bg-gray-600/30"></span>
                        <MaskedReveal delay={0.2}>
                            <span className="text-gray-700 font-serif italic text-lg opacity-80">Case Study</span>
                        </MaskedReveal>
                    </div>

                    <MaskedReveal delay={0.3} className="mb-8">
                        <h1 className="text-6xl md:text-8xl font-bold text-[#111111] leading-[0.95] tracking-tight">
                            {project.title}
                        </h1>
                    </MaskedReveal>

                    <MaskedReveal delay={0.5}>
                        <p className="text-2xl md:text-3xl text-gray-700 font-light max-w-3xl leading-relaxed">
                            {project.subtitle}
                        </p>
                    </MaskedReveal>
                </header>

                {/* Featured Image - Floating Card */}
                <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                    className="relative w-full aspect-video rounded-[3rem] overflow-hidden mb-24 shadow-2xl border-4 border-white"
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-12 gap-12 lg:gap-24">

                    {/* Left Column: Narrative (8 cols) */}
                    <div className="md:col-span-8 space-y-20">

                        {/* The Problem */}
                        <section className="bg-white/80 backdrop-blur-sm p-10 md:p-12 rounded-[2.5rem] border border-white shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Brain size={150} />
                            </div>

                            <h2 className="text-3xl font-bold text-[#111111] mb-8 flex items-center gap-4 relative z-10">
                                <span className="w-10 h-10 rounded-full bg-[#8CE4FF] flex items-center justify-center text-sm border border-gray-900">01</span>
                                The Challenge
                            </h2>
                            <p className="text-xl text-gray-700 leading-relaxed relative z-10 font-normal">
                                {project.problem}
                            </p>
                        </section>

                        {/* Methodology */}
                        <section>
                            <h2 className="text-3xl font-bold text-[#111111] mb-10 flex items-center gap-4">
                                <span className="w-10 h-10 rounded-full bg-[#FEEE91] flex items-center justify-center text-sm border border-gray-900">02</span>
                                Approach & Methodology
                            </h2>

                            <div className="space-y-8">
                                <p className="text-2xl font-serif italic text-gray-800 border-l-4 border-[#FFA239] pl-8 py-4">
                                    &quot;{project.dataOverview}&quot;
                                </p>

                                <div className="grid gap-6">
                                    {project.methodology.map((step: string, idx: number) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            key={idx}
                                            className="flex items-start p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#111111] text-white text-xs font-bold rounded-full mr-6 mt-1">
                                                {idx + 1}
                                            </span>
                                            <span className="text-gray-800 text-lg font-medium leading-relaxed">{step}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Results */}
                        <section>
                            <h2 className="text-3xl font-bold text-[#111111] mb-10 flex items-center gap-4">
                                <span className="w-10 h-10 rounded-full bg-[#FF5656] flex items-center justify-center text-sm text-white border border-gray-900">03</span>
                                Key Outcomes
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {project.results.map((res: string, idx: number) => (
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        key={idx}
                                        className="bg-[#111111] text-white p-8 rounded-[2rem] flex flex-col justify-between h-full shadow-2xl shadow-gray-900/20"
                                    >
                                        <CheckCircle className="text-[#8CE4FF] mb-6 w-8 h-8" />
                                        <p className="font-medium text-xl leading-relaxed opacity-90">{res}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Meta (4 cols) - Sticky */}
                    <div className="md:col-span-4">
                        <div className="sticky top-12 space-y-8">

                            {/* Tech Stack Card */}
                            <div className="bg-white/80 backdrop-blur  p-8 rounded-[2rem] border border-white shadow-xl">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech: string) => (
                                        <span key={tech} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-[#FEEE91] hover:border-[#FEEE91] transition-colors cursor-default">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Links Card */}
                            <div className="bg-white/80 backdrop-blur p-8 rounded-[2rem] border border-white shadow-xl space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Links & Resources</h3>

                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center w-full py-5 px-6 bg-[#111111] text-white font-bold rounded-2xl hover:scale-[1.02] transition-transform shadow-lg group"
                                >
                                    <Github size={20} className="mr-3 group-hover:rotate-12 transition-transform" />
                                    View Codebase
                                </a>

                                {project.demoUrl && (
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center w-full py-5 px-6 bg-[#2563EB] text-white font-bold rounded-2xl hover:bg-blue-600 hover:scale-[1.02] transition-all shadow-lg shadow-blue-200 group"
                                    >
                                        <ExternalLink size={20} className="mr-3 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                        Live Demo
                                    </a>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </article>
    );
}
