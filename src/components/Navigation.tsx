"use client";

import { useState, useEffect, memo } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // ⚡ Bolt: Throttled scroll handler for navbar background
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    // ⚡ Bolt: IntersectionObserver for active section detection
    // Removes O(N) getBoundingClientRect calls during scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-150px 0px -50% 0px", // Approximate 'top 150px' logic
      }
    );

    const sections = navLinks.map((link) => link.href.substring(1));
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <nav
        className={`max-w-7xl mx-auto transition-all duration-300 rounded-full border bg-white/80 backdrop-blur-lg shadow-sm ${scrolled ? "py-3" : "py-4"
          }`}
      >
        <div className="relative px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#home" className="flex items-center space-x-2 group z-10">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 group-hover:to-[#FFA239] transition-all">
                RAB.
              </span>
            </a>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
                      ? "bg-[#111111] text-white shadow-md transform scale-105"
                      : "text-gray-600 hover:text-[#FFA239] hover:bg-gray-50"
                      }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-gray-100 mt-2">
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${isActive
                      ? "bg-[#FEEE91] text-[#111111]" // Active mobile style (Pop Yellow)
                      : "text-gray-600 hover:text-[#FFA239] hover:bg-gray-50"
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default memo(Navigation);