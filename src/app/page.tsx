'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { ArrowDown } from "lucide-react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const maxScroll = 500; 
  const scrollProgress = Math.min(scrollY / maxScroll, 1); 
  

  const bgDarkness = scrollProgress * 0.1; 
  const backgroundColor = `rgba(140, 228, 255, ${1 - bgDarkness})`;
  const overlayOpacity = scrollProgress * 0.6; 
  
  // Font scaling (100% to 70%)
  const fontScale = 1 - (scrollProgress * 0.1);
  const heroTranslateY = scrollY * 0.1;

  return (
    <div className="relative min-h-screen bg-[#18181B] text-[#18181B] selection:bg-blue-100 selection:text-blue-900">
      <Navigation />

      <main className="relative">

        {/* HERO SECTION - Fixed in center, will be covered by sections below */}
        <section 
          id="home" 
          className="fixed top-0 left-0 w-full h-screen flex items-center justify-center px-6 transition-colors duration-300"
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          {/* Dark overlay that appears on scroll */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900/50 to-gray-900/70 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: overlayOpacity
            }}
          />
          
          <div 
            className="text-center max-w-6xl mx-auto transition-all duration-300 relative z-10"
            style={{
              transform: `scale(${fontScale})`
            }}
          >
            {/* Main Title with staggered animation */}
            <div className="hero-title-wrapper overflow-hidden">
              <h1 className="hero-title">
                Mohammad Raihan Rabbani
              </h1>
            </div>
            
            {/* Tagline */}
            <div className="hero-tagline-wrapper overflow-hidden">
              <h2 className="hero-tagline">
                One Passionate Builder
              </h2>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-12 hero-cta">
              <a href="#projects" className="px-8 py-4 bg-[#18181B] text-white font-medium rounded-full hover:bg-black transition-all hover:scale-105 shadow-lg hover:shadow-xl">
                View Selected Work
              </a>
              <a href="#contact" className="px-8 py-4 border-2 border-gray-800 text-[#18181B] font-medium rounded-full hover:bg-gray-50 transition-all hover:scale-105">
                Get in Touch
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-300 z-10"
            style={{
              opacity: 1 - scrollProgress,
              animation: scrollProgress < 0.5 ? 'bounce 2s infinite' : 'none'
            }}
          >
            <Image 
              src="/cartoon-face.png" 
              alt="Scroll down" 
              width={64} 
              height={64}
              className="rounded-full"
            />
          </div>
        </section>

        {/* Spacer to push content down (height of hero section) */}
        <div className="h-screen" />

        {/* SECTIONS - Will overlay the hero section when scrolling */}
        <div className="relative z-20">
          <div id="about" className="section-padding bg-white border-t border-gray-100 rounded-t-[40px]">
            <About />
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

      </main>
    </div>
  );
}
