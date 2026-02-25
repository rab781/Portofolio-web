'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const { scrollY } = useScroll();

  // ⚡ Bolt: Use useTransform to control visibility directly via styles.
  // This avoids React re-renders on every scroll event (Zero-Runtime Overhead).
  const opacity = useTransform(scrollY, [400, 500], [0, 1]);
  const scale = useTransform(scrollY, [400, 500], [0.8, 1]);
  const pointerEvents = useTransform(scrollY, (y) => (y > 450 ? 'auto' : 'none'));
  const display = useTransform(scrollY, (y) => (y > 400 ? 'block' : 'none'));

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 p-3 bg-[var(--pop-orange)] text-brand-black rounded-full shadow-lg hover:bg-brand-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--pop-orange)] focus:ring-offset-2"
      aria-label="Scroll to top"
      style={{
        opacity,
        scale,
        pointerEvents,
        display,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowUp className="w-6 h-6" />
    </motion.button>
  );
}
