'use client';

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import CertificateCarousel from "./CertificateCarousel";

// Real Data from Resume - Optimized WebP images
const certificates = [
    {
        image: "/certificates/optimized/Belajar_data_science.webp",
        text: "Belajar Dasar Data Science"
    },
    {
        image: "/certificates/optimized/Belajar_dasar_manajemen_projek.webp",
        text: "Belajar Dasar Manajemen Projek"
    },
    {
        image: "/certificates/optimized/Belajar_data_visualisasi.webp",
        text: "Belajar Visualisasi Data"
    },
    {
        image: "/certificates/optimized/Belajar_dasar_sql.webp",
        text: "Belajar Dasar SQL"
    },
    {
        image: "/certificates/optimized/Python.webp",
        text: "Python Programming"
    },
    {
        image: "/certificates/optimized/Memulai_python.webp",
        text: "Memulai Pemrograman Python"
    },
    {
        image: "/certificates/optimized/Belajar_dasar_ai.webp",
        text: "Belajar Dasar AI"
    }
];

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
                    className="flex flex-col md:flex-row items-end justify-between gap-6 mb-8"
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
            </div>

            {/* Certificate Carousel */}
            <CertificateCarousel items={certificates} />

            {/* Background Elements */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </section>
    );
}
