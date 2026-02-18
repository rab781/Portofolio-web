'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Preloader from "@/components/Preloader";
import HeroBackground from "@/components/HeroBackground";
import MaskedReveal from "@/components/MaskedReveal";
import GeometricShards from "@/components/GeometricShards";
import ScrollToTop from "@/components/ScrollToTop";

interface HeroClientProps {
  aboutRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

export default function HeroClient({ aboutRef, children }: HeroClientProps) {
  const { scrollY } = useScroll();
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef<HTMLDivElement>(null);

  // Store layout params in ref to avoid re-renders
  const layoutParams = useRef({
    aboutOffset: 1000,
    vh: 900,
    stickyTargetY: 0,
    triggerScroll: 1,
  });

  const layoutTrigger = useMotionValue(0);

  useEffect(() => {
    const handleResize = () => {
      const vh = typeof window !== "undefined" ? window.innerHeight : 900;
      const aboutOffset = aboutRef.current?.offsetTop || 1000;
      const stickyTargetY = aboutOffset + vh * 0.65;
      const triggerScroll = stickyTargetY - vh / 2;

      layoutParams.current = { aboutOffset, vh, stickyTargetY, triggerScroll };
      layoutTrigger.set(Date.now());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [layoutTrigger, isLoading, aboutRef]);

  const yVal = useTransform([scrollY, layoutTrigger], ([y]) => {
    const currentScroll = typeof y === "number" ? y : 0;
    const { triggerScroll, stickyTargetY, vh } = layoutParams.current;
    const trigger = triggerScroll || 1;
    const startY = vh * 0.3;

    if (currentScroll >= trigger) {
      return stickyTargetY - (currentScroll + vh / 2);
    } else {
      return startY * (1 - currentScroll / trigger);
    }
  });

  const transformStyle = useMotionTemplate`translate(-50%, -50%) translateY(${yVal}px)`;

  const maxScroll = 500;
  const clampedScrollProgress = useTransform(scrollY, [0, maxScroll], [0, 1], {
    clamp: true,
  });

  // Use opacity-only for the background colour shift — compositor safe, no repaint
  const overlayOpacity = useTransform(clampedScrollProgress, [0, 1], [0, 0.6]);
  const fontScale = useTransform(clampedScrollProgress, [0, 1], [1, 0.9]);
  const scrollIndicatorOpacity = useTransform(clampedScrollProgress, [0, 1], [1, 0]);

  const heroVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const containerVariants = {
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.5 },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#8CE4FF] text-[#18181B] selection:bg-blue-100 selection:text-blue-900 bg-noise">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navigation />
          <ScrollToTop />

          <main id="main-content" className="relative">
            {/* HERO SECTION — background colour via tinted overlay (compositor-only opacity, no repaint) */}
            <section
              id="home"
              className="fixed top-0 left-0 w-full h-screen flex items-center justify-center px-4 sm:px-6 bg-[#8CE4FF]"
            >
              <HeroBackground />

              {/* Dark overlay that appears on scroll — opacity only, GPU composited */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900/50 to-gray-900/70 pointer-events-none"
                style={{ opacity: overlayOpacity }}
              />

              <motion.div
                className="text-center w-full max-w-6xl mx-auto relative z-10 pt-[10vh]"
                style={{ scale: fontScale }}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <MaskedReveal delay={0.2} className="mb-2 sm:mb-4">
                  <h1 className="hero-title pt-4">Mohammad Raihan Rabbani</h1>
                </MaskedReveal>

                <MaskedReveal delay={0.4}>
                  <h2 className="hero-tagline px-4 break-words">
                    One Passionate Builder
                  </h2>
                </MaskedReveal>

                <motion.div
                  className="flex flex-wrap gap-3 sm:gap-4 justify-center pt-8 sm:pt-12 hero-cta"
                  variants={heroVariants}
                >
                  <a
                    href="#projects"
                    className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-[#18181B] text-white font-medium rounded-full hover:bg-black transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    View Selected Work
                  </a>
                  <a
                    href="#contact"
                    className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base border-2 border-gray-800 text-[#18181B] font-medium rounded-full hover:bg-gray-50 transition-all hover:scale-105"
                  >
                    Get in Touch
                  </a>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1.5, duration: 1 } }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                style={{ opacity: scrollIndicatorOpacity }}
              />
            </section>

            {/* Animated Profile Image */}
            <motion.div
              ref={imageRef}
              className="fixed z-40 left-1/2 pointer-events-none will-change-transform"
              style={{
                top: "50%",
                transform: transformStyle,
                opacity: 1,
              }}
            >
              <div className="relative w-auto h-[45vh] sm:h-[55vh] md:h-[65vh] max-h-[650px] aspect-[400/650]">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, y: 100 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.6,
                  }}
                  className="w-full h-full"
                >
                  {/* Floating Loop — uses CSS animation via GeometricShards' parent */}
                  <motion.div
                    animate={{ y: [-12, 12, -12], rotate: [-1, 1.5, -1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src="/cartoon-pose.png"
                      alt="Raihan Rabbani"
                      fill
                      sizes="(max-width: 768px) 80vw, 400px"
                      className="object-contain transition-all duration-700 drop-shadow-2xl relative z-10"
                      priority
                    />

                    <GeometricShards />

                    {/* Floating Badge */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0, x: 20 }}
                      animate={{ scale: 1, opacity: 1, x: 0 }}
                      transition={{ delay: 1, type: "spring" }}
                      className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 z-20 hover:scale-105 transition-transform cursor-default scale-75 sm:scale-100 origin-bottom-right"
                    >
                      <div className="bg-[#FFA239] p-2 rounded-full text-white shadow-sm">
                        <Sparkles size={20} fill="currentColor" />
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-1">
                          Status
                        </div>
                        <div className="text-sm font-bold text-[#111111] leading-none">
                          Building & Scaling 🚀
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Spacer */}
            <div className="h-screen" />

            {/* SECTIONS — passed as children (server-rendered) */}
            {children}
          </main>
        </>
      )}
    </div>
  );
}
