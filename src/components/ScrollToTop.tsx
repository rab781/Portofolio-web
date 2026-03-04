'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  // ⚡ Bolt: Bind to scroll value outside React render loop
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [400, 500], [0, 1]);
  const scale = useTransform(scrollY, [400, 500], [0.8, 1]);
  const pointerEvents = useTransform(scrollY, (v) => v > 500 ? "auto" : "none");
  const display = useTransform(scrollY, (v) => v > 400 ? "flex" : "none");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, display: 'none' }}
      style={{ opacity, scale, pointerEvents, display }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 p-3 bg-[var(--pop-orange)] text-brand-black rounded-full shadow-lg hover:bg-brand-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--pop-orange)] focus:ring-offset-2 flex items-center justify-center"
      aria-label="Scroll to top"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowUp className="w-6 h-6" />
    </motion.button>
  );
}
