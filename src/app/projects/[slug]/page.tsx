
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink, Brain, CheckCircle } from "lucide-react";
import { projects } from "@/data/projects";

// Note: In a client component, we can't export async generateStaticParams directly in the same way if strictly strictly 'use client', 
// but for Next.js app router hybrid, we often keep the page server-side or mix. 
// However, to use Framer Motion, we need 'use client'. 
// A common pattern is to wrap the content or just make this page client. 
// Since generateStaticParams is a server feature, we'll assume this file was originally server.
// To use Motion, let's keep it simple: We will NOT animate the layout root to avoid hydration issues, 
// or we just animate the inner content.
// Actually, let's just use standard <img> tags or className animations if we want to keep it server-side, 
// OR we make it a client component and lose generateStaticParams export from *this* file (moved to layout or separate).
//
// BUT, to keep the user's existing build working:
// We will return a CLIENT component from a SERVER wrapper if needed, OR just use standard Next.js logic.
// The easiest refactor that maintains "Winner Awards" feel is to just use CSS animations + correct styling 
// without converting the whole page to client if we want to keep generateStaticParams here.
//
// Wait, the previous file had `export async function generateStaticParams`. 
// If I make this `use client`, that export breaks.
// SOLUTION: I will keep this component SERVER SIDE, but render the *content* using a new client component wrapper 
// or just use standard CSS classes. The user asked for "Seirama" (Matching). 
// The main page uses Framer Motion. I can import a Client Component for the content.

// Let's create `ProjectContent.tsx` first? No, that's too many files.
// I will keep it Server Side for SEO/Performance, and use the new CSS classes (`bg-noise`, etc).
// I will use `motion` via a small inline wrapper if needed, but standard CSS `animate-fade-in-up` is already global!

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-[#F9FAFB] bg-noise text-[#111111] pb-24 selection:bg-orange-100 selection:text-orange-900">

      {/* Top Decoration */}
      <div className="h-24 w-full bg-[#8CE4FF] absolute top-0 left-0 z-0" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 pt-12">

        {/* Navigation */}
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-bold uppercase tracking-wider hover:border-[#FFA239] hover:text-[#FFA239] transition-all shadow-sm mb-12"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Works
        </Link>

        {/* Header Section - Editorial Style */}
        <header className="mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="px-4 py-1.5 rounded-full border border-gray-900/5 bg-white text-xs font-bold tracking-widest text-[#FF5656] uppercase shadow-sm">
              {project.category}
            </span>
            <span className="h-px w-8 bg-gray-300"></span>
            <span className="text-gray-500 font-serif italic text-lg">Case Study</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#111111] mb-8 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {project.title}
          </h1>

          <p className="text-2xl text-gray-600 font-light max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {project.subtitle}
          </p>
        </header>

        {/* Featured Image - Floating Card */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-20 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20">

          {/* Left Column: Narrative (8 cols) */}
          <div className="md:col-span-8 space-y-16">

            {/* The Problem */}
            <section className="bg-white bg-dot-pattern p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Brain size={120} />
              </div>

              <h2 className="text-2xl font-bold text-[#111111] mb-6 flex items-center gap-3 relative z-10">
                <span className="w-8 h-8 rounded-full bg-[#8CE4FF] flex items-center justify-center text-xs border border-gray-900">01</span>
                The Problem
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed relative z-10">
                {project.problem}
              </p>
            </section>

            {/* Methodology */}
            <section>
              <h2 className="text-2xl font-bold text-[#111111] mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FEEE91] flex items-center justify-center text-xs border border-gray-900">02</span>
                Approach & Methodology
              </h2>

              <div className="space-y-6">
                <p className="text-lg text-gray-600 italic border-l-4 border-[#FFA239] pl-6 py-2 bg-orange-50/50 rounded-r-lg">
                  {project.dataOverview}
                </p>

                <div className="grid gap-4">
                  {project.methodology.map((step, idx) => (
                    <div key={idx} className="flex items-start p-4 bg-white rounded-xl border border-gray-100 hover:border-[#8CE4FF] transition-colors">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-[#111111] text-white text-[10px] font-bold rounded-full mr-4 mt-1">
                        {idx + 1}
                      </span>
                      <span className="text-gray-700 font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Results */}
            <section>
              <h2 className="text-2xl font-bold text-[#111111] mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FF5656] flex items-center justify-center text-xs text-white border border-gray-900">03</span>
                Key Outcomes
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.results.map((res, idx) => (
                  <div key={idx} className="bg-[#111111] text-white p-6 rounded-2xl flex flex-col justify-between">
                    <CheckCircle className="text-[#8CE4FF] mb-4" />
                    <p className="font-medium text-lg leading-snug">{res}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Meta (4 cols) - Sticky */}
          <div className="md:col-span-4">
            <div className="sticky top-12 space-y-8">

              {/* Tech Stack Card */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/50">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-[#FEEE91] hover:border-[#FEEE91] transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links Card */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/50 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Links & Resources</h3>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-full py-4 px-6 bg-[#111111] text-white font-bold rounded-xl hover:scale-[1.02] transition-transform shadow-md"
                >
                  <Github size={20} className="mr-3" />
                  View Codebase
                </a>

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-full py-4 px-6 bg-[#2563EB] text-white font-bold rounded-xl hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-md shadow-blue-200"
                  >
                    <ExternalLink size={20} className="mr-3" />
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