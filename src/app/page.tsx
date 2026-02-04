'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const maxScroll = 500;
  const scrollProgress = Math.min(scrollY / maxScroll, 1);

  // Calculate image position and scale based on scroll
  const imageMaxScroll = typeof window !== 'undefined' ? window.innerHeight * 0.8 : 800;
  const imageProgress = Math.min(scrollY / imageMaxScroll, 1);

  // Image transforms
  const imageScale = 0.3 + (imageProgress * 0.7); // From 30% to 100%
  const imageTranslateY = scrollY * 0.5; // Move down slower than scroll
  const imageOpacity = 0.3 + (imageProgress * 0.7); // Fade in as it grows

  // Calculate if image should stick to About section
  const aboutOffset = aboutRef.current?.offsetTop || 1000;
  const shouldStick = scrollY >= aboutOffset - 400;

  const bgDarkness = scrollProgress * 0.1;
  const backgroundColor = `rgba(140, 228, 255, ${1 - bgDarkness})`;
  const overlayOpacity = scrollProgress * 0.6;

  // Font scaling (100% to 70%)
  const fontScale = 1 - (scrollProgress * 0.1);

  return (
    <div className="relative min-h-screen bg-[#8CE4FF] text-[#18181B] selection:bg-blue-100 selection:text-blue-900">
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
            className="text-center max-w-6xl mx-auto transition-all duration-300 relative z-10 -mt-80"
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
            className="absolute bottom-20 left-1/2 -translate-x-1/2 transition-opacity duration-300 z-10"
            style={{
              opacity: 1 - scrollProgress,
              animation: scrollProgress < 0.5 ? 'bounce 2s infinite' : 'none'
            }}
          >
          </div>
        </section>

        {/* Animated Profile Image */}
        <div
          ref={imageRef}
          className="fixed z-40 left-1/2 pointer-events-none will-change-transform"
          style={{
            top: '50%',
            transform: `translate(-50%, -50%) translateY(${shouldStick
              ? (aboutOffset - 400) * 0.5 - (scrollY - (aboutOffset - 400))
              : 280 + scrollY * (0.5 - 280 / (aboutOffset - 400 || 1))
              }px)`,
            opacity: 1,
          }}
        >
          <div className="relative w-[280px] h-[450px] md:w-[400px] md:h-[650px]">
            <Image
              src="/cartoon-pose.png"
              alt="Raihan Rabbani"
              fill
              className="object-cover filter hover:grayscale-0 transition-all duration-700"
              priority
            />
            {/* Removed 3D Effect Shadow (Blur) */}
          </div>
        </div>

        {/* Spacer */}
        <div className="h-screen" />

        {/* SECTIONS */}
        <div className="relative z-20">
          <div
            ref={aboutRef}
            id="about"
            className="section-padding bg-white border-t border-gray-100 rounded-t-[40px] pt-[400px] md:pt-[450px]"
          >
            <About hideImage={true} />
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
