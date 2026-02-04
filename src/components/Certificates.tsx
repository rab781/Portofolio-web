'use client';

import { motion } from "framer-motion";
import { Award, Calendar, BadgeCheck } from "lucide-react";

// Mock Data - User can update this
const certificates = [
    {
        name: "TensorFlow Developer Certificate",
        issuer: "Google",
        date: "2023",
        color: "bg-orange-100 text-orange-700 border-orange-200"
    },
    {
        name: "AWS Certified Machine Learning",
        issuer: "Amazon Web Services",
        date: "2023",
        color: "bg-blue-100 text-blue-700 border-blue-200"
    },
    {
        name: "Deep Learning Specialization",
        issuer: "Coursera / DeepLearning.AI",
        date: "2022",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200"
    },
    {
        name: "Data Scientist Associate",
        issuer: "DataCamp",
        date: "2021",
        color: "bg-green-100 text-green-700 border-green-200"
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
        <div className="max-w-7xl mx-auto p-6 md:p-12">
            <div className="flex items-center gap-4 mb-12">
                <span className="p-3 rounded-2xl bg-[#E0F7FA] text-[#00bcd4]">
                    <Award size={28} />
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#111111]">
                    Licenses & <span className="text-gray-400">Certifications</span>
                </h2>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {certificates.map((cert, idx) => (
                    <motion.div
                        key={idx}
                        variants={item}
                        whileHover={{ y: -5 }}
                        className={`p-8 rounded-[2rem] border ${cert.color} border-opacity-50 relative group cursor-default bg-white hover:shadow-lg transition-all`}
                    >
                        <div className="absolute top-6 right-6 text-current opacity-20 group-hover:opacity-100 transition-opacity">
                            <BadgeCheck size={28} />
                        </div>

                        <div className="text-xs font-bold uppercase tracking-widest opacity-60 mb-12">{cert.issuer}</div>

                        <h3 className="text-xl font-bold leading-tight mb-4 min-h-[3rem]">
                            {cert.name}
                        </h3>

                        <div className="text-sm font-medium flex items-center gap-2 opacity-80 pt-4 border-t border-black/5">
                            <Calendar size={14} />
                            Issued {cert.date}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
