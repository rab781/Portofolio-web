'use client';

import { memo, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import CircularBadge from "./CircularBadge";
import GeometricShards from "./GeometricShards";

interface AboutProps {
  hideImage?: boolean;
  triggerAnimation?: boolean;
}

// Helper for counting up numbers
function NumberCounter({ value, suffix = "+" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-10px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.floor(latest)}${suffix}`;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className="tabular-nums" />;
}

function About({ hideImage = false, triggerAnimation = false }: AboutProps) {

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } // Custom bezier for "premium" smoothness
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // Auto trigger if viewed normally
      animate={triggerAnimation ? "visible" : undefined} // Or trigger via prop
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-7xl mx-auto p-6 md:p-12 relative"
    >
      <div className={`grid ${hideImage ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-16 items-start`}>

        {/* Content Column */}
        <div className="space-y-12 pt-4 relative">

          {/* Header & Title - Editorial Style */}
          <motion.div variants={itemVariants} className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <span className="px-4 py-1.5 rounded-full border border-gray-900/10 bg-gray-50 text-xs font-bold tracking-widest text-[#FF5656] uppercase">
                Who am I?
              </span>

              {/* Floating Badge (only visible in this column context) */}
              <div className="hidden md:block">
                <CircularBadge text="AI ENGINEER • BUILDING FUTURE • " radius={45} className="opacity-80 text-[#FFA239]" />
              </div>
            </div>

            <h3 className="text-5xl md:text-7xl font-bold tracking-tight text-[#111111] leading-[1.1]">
              Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA239] to-[#FF5656]">Theory</span> <br />
              & <span className="italic font-normal font-serif">Application.</span>
            </h3>
          </motion.div>

          {/* Spacer for Floating Image (Only when image column is hidden) */}
          {hideImage && <div className="h-[550px] w-full" aria-hidden="true" />}

          {/* Description Paragraphs - Multi-column feel */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-[1fr] gap-8 text-xl text-gray-600 leading-relaxed font-light">
            <p>
              I am Mohammad Raihan Rabbani. I don&apos;t just write code; I orchestrate <strong className="text-[#111111] font-semibold">intelligence</strong>.
              Standing at the intersection of Artifical Intelligence and Software Engineering, I translate complex research papers into deployed products.
            </p>
            <p className="border-l-2 border-[#FFA239] pl-6 italic text-gray-800">
              &quot;Building systems that can see, learn, and trade—solving human problems with data-driven precision.&quot;
            </p>
          </motion.div>

          {/* Live Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-12 pt-8 border-t border-gray-100">
            <div className="space-y-1">
              <div className="text-6xl font-bold text-[#111111] tracking-tighter">
                <NumberCounter value={2} suffix="+" />
              </div>
              <p className="text-body text-base sm:text-lg">
                I&apos;m a <span className="font-bold text-brand-black">Data Scientist</span> & <span className="font-bold text-brand-black">AI Engineer</span> who loves turning messy data into clear, actionable insights.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-body text-base sm:text-lg">
                My approach is simple: <span className="italic text-brand-black">&quot;Build things that matter.&quot;</span> Whether it&apos;s a predictive model for finance or a computer vision system for historical archives, I focus on impact.
              </p>
              <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Projects Shipped</div>
            </div>
          </motion.div>

          {/* CTA Link - Magnetic Button Style */}
          <motion.div variants={itemVariants} className="pt-8">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-[#111111] font-bold text-lg hover:text-[#FFA239] transition-all"
            >
              <span className="border-b-2 border-[#111111] group-hover:border-[#FFA239] pb-0.5">Download Curriculum Vitae</span>
              <svg className="w-5 h-5 transform group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Image Column - Hidden when hideImage is true */}
        {!hideImage && (
          <div className="relative group pt-20">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src="/cartoon-pose.png"
                alt="Raihan Rabbani"
                width={600}
                height={750}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>

            {/* Badge overlap for desktop default view */}
            <div className="absolute -top-12 -right-12 hidden md:block z-10">
              <CircularBadge text="AVAILABLE FOR HIRE • NOW •" radius={60} className="text-[#111111]" />
            </div>

            {/* Geometric Elements */}
            <GeometricShards />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default memo(About);
