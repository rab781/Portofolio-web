'use client';

import { useRef } from "react";
import dynamic from "next/dynamic";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";

// Only HeroClient (scroll logic, framer-motion, preloader) is a client boundary.
// All content sections are rendered server-side and passed as children.
const HeroClient = dynamic(() => import("@/components/HeroClient"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white" />
  ),
});

export default function PageShell() {
  const aboutRef = useRef<HTMLDivElement>(null);

  return (
    <HeroClient aboutRef={aboutRef}>
      <div className="relative z-20">
        <div
          ref={aboutRef}
          id="about"
          className="section-padding bg-white bg-dot-pattern border-t border-gray-100 rounded-t-[40px] pt-32 relative overflow-hidden"
        >
          {/* Decorative Gradient Blob */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FEEE91] rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <About hideImage={true} />
        </div>

        <div
          id="experience"
          className="section-padding bg-white bg-dot-pattern relative border-t border-gray-100"
        >
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-10" />
          <Experience />
        </div>

        <div
          id="certificates"
          className="section-padding bg-[#F9FAFB] relative border-t border-gray-100"
        >
          <Certificates />
        </div>

        <div id="skills" className="section-padding bg-[#F9FAFB]">
          <Skills />
        </div>

        <div id="projects" className="section-padding bg-white">
          <Projects />
        </div>

        <div id="contact" className="bg-[#111111] text-white">
          <Contact />
        </div>
      </div>
    </HeroClient>
  );
}
