"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";



export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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
          setTimeout(() => setIsDeleting(true), 1000);
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
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            Hello, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Mohammad Raihan Rabbani
            </span>
          </h1>
          <div className="text-xl sm:text-2xl lg:text-3xl text-gray-400 mb-8 h-12">
            I&apos;m a{" "}
            <span className="text-yellow-400 font-semibold">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </div>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Passionate about creating beautiful, functional, and user-centered digital experiences.
            I bring ideas to life through code and design.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#contact"
            className="bg-yellow-600 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Get In Touch
          </a>
          <a
            href="#projects"
            className="border-2 border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-black px-8 py-3 rounded-full font-semibold transition-all duration-300"
          >
            View My Work
          </a>
        </div>

        <div className="flex items-center justify-center space-x-6 mb-12">
          <a
            href="https://github.com/rab781"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
          >
            <Github size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/mohammadraihanrabbani/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
          >
            <Linkedin size={28} />
          </a>
          <a
            href="mailto:raihanrabani199@gmail.com"
            className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
          >
            <Mail size={28} />
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <a
            href="#about"
            className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 animate-bounce"
          >
            <ChevronDown size={32} />
          </a>
        </div>
      </div>
    </section>
  );
}