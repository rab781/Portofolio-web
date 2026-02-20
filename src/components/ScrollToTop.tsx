'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const { scrollY } = useScroll();

  // Opacity: 0 -> 1 between 400px and 500px
  const opacity = useTransform(scrollY, [400, 500], [0, 1]);
  // Scale: 0.8 -> 1 between 400px and 500px
  const scale = useTransform(scrollY, [400, 500], [0.8, 1]);
  // Pointer events: none below 400px, auto above
  const pointerEvents = useTransform(scrollY, (y) => (y > 400 ? 'auto' : 'none'));
  // Visibility: hidden below 400px, visible above
  // This helps with accessibility tools and ensures it's not interactive when hidden
  const visibility = useTransform(scrollY, (y) => (y > 400 ? 'visible' : 'hidden'));

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      style={{ opacity, scale, pointerEvents, visibility }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 p-3 bg-[var(--pop-orange)] text-brand-black rounded-full shadow-lg hover:bg-brand-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--pop-orange)] focus:ring-offset-2"
      aria-label="Scroll to top"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowUp className="w-6 h-6" />
    </motion.button>
  );
}
