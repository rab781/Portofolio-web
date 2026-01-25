'use client';

import { useState, useEffect, useMemo } from "react";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import NeuralHero from "@/components/NeuralHero";
import TerminalCard from "@/components/ui/TerminalCard";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect logic
  const texts = useMemo(() => [
    "Data Scientist",
    "Machine Learning Engineer",
    "Deep Learning Researcher",
    "Data Analyst",
    "AI Enthusiast",
  ], []);

  useEffect(() => {
    const currentText = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts]);

  return (
    <div className="min-h-screen bg-[#050A14] overflow-x-hidden selection:bg-[#FFD700] selection:text-black">
      <ParticleBackground />
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">

        {/* HERO SECTION */}
        <section className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-float">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
                <span className="text-[#00F0FF] font-mono text-sm tracking-widest">SYSTEM_ONLINE</span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight">
                Hello, I&apos;m <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C5A000] text-glow-gold">
                  Raihan Rabbani
                </span>
              </h1>
            </div>

            <div className="text-xl sm:text-2xl text-gray-400 font-mono h-8">
              &gt; <span className="text-[#00F0FF]">{displayText}</span>
              <span className="animate-pulse">_</span>
            </div>

            <p className="text-gray-400 max-w-lg text-lg leading-relaxed">
              Building the bridge between complex data and actionable intelligence.
              Specialized in <span className="text-[#FFD700]">Deep Learning</span> and <span className="text-[#FFD700]">Predictive Analytics</span>.
            </p>

            <div className="flex items-center gap-6">
              <a href="https://github.com/rab781" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#FFD700] transition-colors"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/mohammadraihanrabbani/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#FFD700] transition-colors"><Linkedin size={24} /></a>
              <a href="mailto:raihanrabani199@gmail.com" className="text-gray-400 hover:text-[#FFD700] transition-colors"><Mail size={24} /></a>
            </div>

            <div className="flex gap-4">
              <a href="#projects" className="px-8 py-3 bg-[#FFD700] text-black font-bold rounded hover:bg-[#D4AF37] transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                VIEW DATA
              </a>
              <a href="#contact" className="px-8 py-3 border border-[#00F0FF] text-[#00F0FF] font-bold rounded hover:bg-[#00F0FF]/10 transition-all">
                INITIATE_CONTACT
              </a>
            </div>
          </div>

          {/* Right Content - 3D Neural Hero */}
          <div className="hidden lg:block h-[600px] w-full relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] to-transparent z-10 opacity-50"></div>
            <NeuralHero />
          </div>

          {/* Mobile Neural Hero Placeholder or smaller version */}
          <div className="lg:hidden h-[300px] w-full block">
            <NeuralHero />
          </div>
        </section>


        {/* SECTIONS WRAPPED IN TERMINAL CARDS */}
        <div className="space-y-24 pb-24">
          <TerminalCard title="ABOUT_MODULE.exe">
            <About />
          </TerminalCard>

          <TerminalCard title="SKILLS_MATRIX.json">
            <Skills />
          </TerminalCard>

          <TerminalCard title="PROJECT_DATABASE.db">
            <Projects />
          </TerminalCard>

          <TerminalCard title="COMMUNICATION_LINK">
            <Contact />
          </TerminalCard>
        </div>

      </main>
    </div>
  );
}
