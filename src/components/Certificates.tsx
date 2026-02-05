'use client';

import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, BadgeCheck } from "lucide-react";
import Image from "next/image";

// Real Data from Resume
const certificates = [
    {
        name: "Belajar Dasar Data Science",
        issuer: "Dicoding Indonesia",
        date: "2023",
        gradient: "from-blue-50 to-blue-100/50",
        iconColor: "text-blue-600",
        image: "/certificates/dicoding-placeholder.svg",
        url: "#"
    },
    {
        name: "Belajar Dasar AI (Artificial Intelligence)",
        issuer: "Dicoding Indonesia",
        date: "2023",
        gradient: "from-purple-50 to-purple-100/50",
        iconColor: "text-purple-600",
        image: "/certificates/dicoding-placeholder.svg",
        url: "#"
    },
    {
        name: "Belajar Dasar Visualisasi Data",
        issuer: "Dicoding Indonesia",
        date: "2023",
        gradient: "from-teal-50 to-teal-100/50",
        iconColor: "text-teal-600",
        image: "/certificates/dicoding-placeholder.svg",
        url: "#"
    },
    {
        name: "Belajar Dasar Structured Query Language (SQL)",
        issuer: "Dicoding Indonesia",
        date: "2023",
        gradient: "from-indigo-50 to-indigo-100/50",
        iconColor: "text-indigo-600",
        image: "/certificates/dicoding-placeholder.svg",
        url: "#"
    },
    {
        name: "Belajar Pemrograman Prosedural dengan Python",
        issuer: "Dicoding Indonesia",
        date: "2023",
        gradient: "from-yellow-50 to-yellow-100/50",
        iconColor: "text-yellow-600",
        image: "/certificates/dicoding-placeholder.svg",
        url: "#"
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Certificates() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            <div className="container-width px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16"
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="p-4 rounded-3xl bg-white shadow-lg shadow-teal-100/50 text-teal-600 ring-1 ring-teal-50 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-teal-100/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-3xl" />
                            <Award size={32} strokeWidth={1.5} className="relative z-10" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold tracking-[0.2em] text-[#0D9488] uppercase mb-2">
                                Achievements
                            </h2>
                            <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111]">
                                Licenses & <span className="text-gray-400">Certifications</span>
                            </h3>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ margin: "-50px" }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {certificates.map((cert, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                            whileHover={{ y: -8 }}
                            className="group relative h-full"
                        >
                            <div className="
                                h-full rounded-[2rem]
                                bg-white
                                border border-gray-100
                                shadow-sm
                                hover:shadow-xl hover:shadow-gray-200/50
                                transition-all duration-500
                                flex flex-col
                                overflow-hidden
                           ">
                                {/* Image Section */}
                                <div className="relative h-48 w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} opacity-20`} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Image
                                            src={cert.image}
                                            alt={cert.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <ExternalLink size={18} className="text-gray-600" />
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between relative">
                                    {/* Subtle Gradient background on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />

                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-1.5 rounded-lg bg-gray-50 ring-1 ring-gray-100 ${cert.iconColor}`}>
                                                <BadgeCheck size={18} />
                                            </div>
                                            <div className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                                {cert.issuer}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-[#0D9488] transition-colors">
                                            {cert.name}
                                        </h3>
                                    </div>

                                    <div className="pt-6 mt-6 border-t border-gray-50 flex items-center gap-2 text-sm font-medium text-gray-400">
                                        <Calendar size={14} />
                                        <span>Issued {cert.date}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </section>
    );
}
