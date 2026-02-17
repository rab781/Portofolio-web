'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { Sparkles, Mouse, ChevronsDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Preloader from "@/components/Preloader";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import HeroBackground from "@/components/HeroBackground";
import MaskedReveal from "@/components/MaskedReveal";
import GeometricShards from "@/components/GeometricShards";


export default function Home() {
  const { scrollY } = useScroll();
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // ⚡ Bolt: Store layout params in ref to avoid re-renders
  const layoutParams = useRef({
    aboutOffset: 1000,
    vh: 900,
    stickyTargetY: 0,
    triggerScroll: 1
  });

  // ⚡ Bolt: Trigger motion value to force transform updates on resize
  const layoutTrigger = useMotionValue(0);

  useEffect(() => {
    const handleResize = () => {
      const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
      const aboutOffset = aboutRef.current?.offsetTop || 1000;

      // The exact Y position (relative to document) where we want the image CENTER to land
      const stickyTargetY = aboutOffset + (vh * 0.65);

      // The scroll position where stickyTargetY exactly hits the middle of the viewport
      const triggerScroll = stickyTargetY - (vh / 2);

      layoutParams.current = {
        aboutOffset,
        vh,
        stickyTargetY,
        triggerScroll
      };

      layoutTrigger.set(Date.now());
    };

    // Initial measure
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [layoutTrigger, isLoading]); // Re-measure when loading finishes too

  // ANIMATION LOGIC:
  const startY = 280;

  // ⚡ Bolt: Calculate Y position using motion values to avoid React render loop
  const yVal = useTransform([scrollY, layoutTrigger], ([y]) => {
      // Need to cast y to number because useTransform array input might be mixed types if not typed strictly
      const currentScroll = typeof y === 'number' ? y : 0;
      const { triggerScroll, stickyTargetY, vh } = layoutParams.current;
      const trigger = triggerScroll || 1;

      if (currentScroll >= trigger) {
          return stickyTargetY - (currentScroll + (vh / 2));
      } else {
          return startY * (1 - (currentScroll / trigger));
      }
  });

  const transformStyle = useMotionTemplate`translate(-50%, -50%) translateY(${yVal}px)`;

  const maxScroll = 500;
  const clampedScrollProgress = useTransform(scrollY, [0, maxScroll], [0, 1], { clamp: true });

  const bgDarkness = useTransform(clampedScrollProgress, [0, 1], [0, 0.1]);
  const backgroundColor = useTransform(bgDarkness, d => `rgba(140, 228, 255, ${1 - d})`);

  const overlayOpacity = useTransform(clampedScrollProgress, [0, 1], [0, 0.6]);
  const fontScale = useTransform(clampedScrollProgress, [0, 1], [1, 0.9]);

  const scrollIndicatorOpacity = useTransform(clampedScrollProgress, [0, 1], [1, 0]);
  // Use a simplified animation toggle or just always bounce but fade out
  // Switching animation string via motion value works but let's keep it simple:
  // If opacity is 0, animation doesn't matter much.

  // Hero Animation Variants
  const heroVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#8CE4FF] text-[#18181B] selection:bg-blue-100 selection:text-blue-900 bg-noise">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navigation />

          <main id="main-content" className="relative">

            {/* HERO SECTION - Fixed in center, will be covered by sections below */}
            <motion.section
              id="home"
              className="fixed top-0 left-0 w-full h-screen flex items-center justify-center px-6 transition-colors duration-300"
              style={{
                backgroundColor: backgroundColor,
              }}
            >
              <HeroBackground />

              {/* Dark overlay that appears on scroll */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900/50 to-gray-900/70 pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: overlayOpacity
                }}
              />

              <motion.div
                className="text-center max-w-6xl mx-auto transition-all duration-300 relative z-10 -mt-[15vh] pt-20"
                style={{
                  scale: fontScale
                }}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {/* Main Title with staggered animation */}
                <MaskedReveal delay={0.2} className="mb-4">
                  <h1 className="hero-title pt-4">
                    Mohammad Raihan Rabbani
                  </h1>
                </MaskedReveal>

                {/* Tagline */}
                <MaskedReveal delay={0.4}>
                  <h2 className="hero-tagline">
                    One Passionate Builder
                  </h2>
                </MaskedReveal>

                {/* CTA Buttons */}
                <motion.div className="flex flex-wrap gap-4 justify-center pt-12 hero-cta" variants={heroVariants}>
                  <a href="#projects" className="px-8 py-4 bg-[#18181B] text-white font-medium rounded-full hover:bg-black transition-all hover:scale-105 shadow-lg hover:shadow-xl">
                    View Selected Work
                  </a>
                  <a href="#contact" className="px-8 py-4 border-2 border-gray-800 text-[#18181B] font-medium rounded-full hover:bg-gray-50 transition-all hover:scale-105">
                    Get in Touch
                  </a>
                </motion.div>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1.5, duration: 1 } }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-300 z-10 flex flex-col items-center gap-2 cursor-pointer"
                style={{
                  opacity: scrollIndicatorOpacity
                }}
                aria-label="Scroll down"
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Mouse size={28} className="text-gray-800" aria-hidden="true" />
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronsDown size={24} className="text-gray-600" aria-hidden="true" />
                </motion.div>
              </motion.div>
            </motion.section>

            {/* Animated Profile Image */}
            <motion.div
              ref={imageRef}
              className="fixed z-40 left-1/2 pointer-events-none will-change-transform"
              style={{
                top: '50%',
                // ⚡ Bolt: Use motion template for performant transform
                transform: transformStyle,
                opacity: 1,
              }}
            >
              <div className="relative w-auto h-[55vh] md:h-[65vh] max-h-[650px] aspect-[400/650]">
                {/* Entrance Animation Wrapper */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, y: 100 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.6
                  }}
                  className="w-full h-full"
                >
                  {/* Floating Loop Wrapper */}
                  <motion.div
                    animate={{
                      y: [-12, 12, -12],
                      rotate: [-1, 1.5, -1]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src="/cartoon-pose.png"
                      alt="Raihan Rabbani"
                      fill
                      sizes="(max-width: 768px) 80vw, 400px"
                      className="object-contain filter hover:grayscale-0 transition-all duration-700 drop-shadow-2xl relative z-10"
                      priority
                    />

                    {/* Geometric Elements behind character */}
                    <GeometricShards />

                    {/* Floating Badge - Follows Image */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0, x: 20 }}
                      animate={{ scale: 1, opacity: 1, x: 0 }}
                      transition={{ delay: 1, type: "spring" }}
                      className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 z-20 hover:scale-105 transition-transform cursor-default"
                    >
                      <div className="bg-[#FFA239] p-2 rounded-full text-white shadow-sm">
                        <Sparkles size={20} fill="currentColor" />
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-1">Status</div>
                        <div className="text-sm font-bold text-[#111111] leading-none">Building & Scaling 🚀</div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Spacer */}
            <div className="h-screen" />

            {/* SECTIONS */}
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

              <div id="experience" className="section-padding bg-white bg-dot-pattern relative border-t border-gray-100">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-10" />
                <Experience />
              </div>

              <div id="certificates" className="section-padding bg-[#F9FAFB] relative border-t border-gray-100">
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

          </main>
        </>
      )}
    </div>
  );
}
