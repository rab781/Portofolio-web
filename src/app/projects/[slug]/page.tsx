// src/app/projects/[slug]/page.tsx

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink, Database, Brain, CheckCircle } from "lucide-react";
import { projects } from "@/data/projects"; // Import data yang tadi dibuat

// Fungsi ini diperlukan untuk generate static pages saat build (SEO Bagus)
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  // Await params di Next.js 15
  const { slug } = await params;
  
  // Cari proyek berdasarkan slug di URL
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound(); // Tampilkan halaman 404 jika proyek tidak ada
  }

  return (
    <article className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tombol Kembali */}
        <Link 
          href="/#projects" 
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Portfolio
        </Link>

        {/* Header Proyek */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
              {project.category}
            </span>
            <span className="text-gray-500 text-sm">Case Study</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {project.subtitle}
          </p>
        </header>

        {/* Gambar Utama / Visualisasi */}
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-16 shadow-2xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Konten Utama: 2 Kolom */}
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Kolom Kiri: Detail Analisis (Lebih Lebar) */}
          <div className="md:col-span-2 space-y-12">
            
            {/* 1. Masalah Bisnis */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Brain className="mr-3 text-blue-600" />
                The Problem
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.problem}
              </p>
            </section>

            {/* 2. Metodologi */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Database className="mr-3 text-blue-600" />
                Data & Methodology
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {project.dataOverview}
              </p>
              <ul className="space-y-3">
                {project.methodology.map((step, idx) => (
                  <li key={idx} className="flex items-start bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-600 text-white text-xs font-bold rounded-full mr-4 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{step}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 3. Hasil & Temuan */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <CheckCircle className="mr-3 text-green-600" />
                Key Results
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <ul className="space-y-3">
                  {project.results.map((res, idx) => (
                    <li key={idx} className="flex items-start text-gray-800 dark:text-gray-200">
                      <span className="mr-2 text-blue-600">•</span>
                      {res}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

          </div>

          {/* Kolom Kanan: Info Teknis & Link (Sticky) */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 font-medium rounded-lg transition-all"
                >
                  <Github size={18} className="mr-2" />
                  View Notebook
                </a>
                
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
                  >
                    <ExternalLink size={18} className="mr-2" />
                    Live Dashboard
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