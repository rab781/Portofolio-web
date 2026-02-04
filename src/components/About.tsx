'use client';

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface AboutProps {
  hideImage?: boolean;
  triggerAnimation?: boolean;
}

function About({ hideImage = false, triggerAnimation = false }: AboutProps) {

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time between each child starting its animation
        delayChildren: 0.1,   // Initial delay
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      // If triggerAnimation is passed (from sticky parent), control state.
      // Otherwise (if used elsewhere without trigger), default to visible or check viewport
      animate={triggerAnimation ? "visible" : "hidden"}
      className="max-w-7xl mx-auto rounded-7xl bg-white/80 backdrop-blur-lg p-10 md:p-16 shadow-lg"
    >
      <div className={`grid ${hideImage ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-16 items-start`}>

        {/* Content Column */}
        <div className="space-y-8 pt-4">

          {/* Header & Title */}
          <motion.div variants={itemVariants}>
            <h2 className="text-sm font-bold tracking-widest text-[#2563EB] uppercase mb-4">About Me</h2>
            <h3 className="heading-lg mb-6">
              Bridging the gap between <br />
              <span className="text-gray-400">theory</span> and <span className="text-[#111111]">application</span>.
            </h3>
          </motion.div>

          {/* Spacer for Floating Image (Only when image column is hidden) */}
          {hideImage && <div className="h-[550px] w-full" aria-hidden="true" />}

          {/* Description Paragraphs */}
          <motion.div variants={itemVariants} className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              I am Mohammad Raihan Rabbani, an IT student dedicated to mastering the intersection of
              <strong className="text-[#111111]"> Artificial Intelligence</strong> and <strong className="text-[#111111]">Software Engineering</strong>.
            </p>
            <p>
              My passion lies in building intelligent systems—from Deep Learning models that restore historical images to predictive trading algorithms that analyze market sentiment.
              I don&apos;t just build models; I build <span className="italic text-[#111111]">products</span> that leverage data to solve real human problems.
            </p>
          </motion.div>

          {/* Stats Grid (The "Points") */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[#111111]">2+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">Years of AI Research</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-[#111111]">15+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">Projects Delivered</div>
            </div>
          </motion.div>

          {/* CTA Link */}
          <motion.div variants={itemVariants} className="pt-8">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#111111] font-bold hover:text-[#2563EB] transition-colors border-b-2 border-[#111111] hover:border-[#2563EB] pb-1"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        {/* Image Column - Hidden when hideImage is true */}
        {!hideImage && (
          <div className="relative group">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src="/cartoon-pose.png"
                alt="Raihan Rabbani"
                width={600}
                height={750}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[url('/dots.svg')] opacity-20"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default memo(About);
