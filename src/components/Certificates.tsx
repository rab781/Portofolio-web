'use client';

import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, BadgeCheck } from "lucide-react";

// Mock Data
const certificates = [
    {
        name: "TensorFlow Developer",
        issuer: "Google",
        date: "2023",
        // Using distinct gradients for variety while keeping it subtle
        gradient: "from-orange-50 to-orange-100/50",
        iconColor: "text-orange-600",
        url: "#"
    },
    {
        name: "AWS Certified ML",
        issuer: "Amazon Web Services",
        date: "2023",
        gradient: "from-slate-50 to-slate-100/50",
        iconColor: "text-[#232F3E]", // AWS color
        url: "#"
    },
    {
        name: "Deep Learning Specialization",
        issuer: "DeepLearning.AI",
        date: "2022",
        gradient: "from-yellow-50 to-yellow-100/50",
        iconColor: "text-yellow-600",
        url: "#"
    },
    {
        name: "Data Scientist Associate",
        issuer: "DataCamp",
        date: "2021",
        gradient: "from-green-50 to-green-100/50",
        iconColor: "text-green-600",
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
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {certificates.map((cert, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                            whileHover={{ y: -8 }}
                            className="group relative h-full"
                        >
                            <div className={`
                                h-full p-8 rounded-[2rem]
                                bg-white/60 backdrop-blur-xl
                                border border-white/60
                                shadow-[0_4px_20px_-2px_rgba(0,0,0,0.02)]
                                hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.05)]
                                transition-all duration-500
                                flex flex-col justify-between
                                overflow-hidden
                           `}>
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className={`p-3 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 ${cert.iconColor}`}>
                                            <BadgeCheck size={24} />
                                        </div>
                                        {/* External Link Icon (Implied Action) */}
                                        <div className="text-gray-300 group-hover:text-gray-600 transition-colors">
                                            <ExternalLink size={20} />
                                        </div>
                                    </div>

                                    <div className="mb-2">
                                        <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                            {cert.issuer}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-black transition-colors">
                                            {cert.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="relative z-10 pt-6 mt-6 border-t border-gray-100 group-hover:border-gray-200 transition-colors">
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                        <Calendar size={14} className="text-gray-400" />
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
