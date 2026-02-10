import React from 'react';

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed top-4 left-4 z-[100] -translate-y-[150%] rounded-lg bg-[#111111] px-4 py-3 text-sm font-bold text-white transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#FFA239] focus:ring-offset-2"
    >
      Skip to content
    </a>
  );
}
