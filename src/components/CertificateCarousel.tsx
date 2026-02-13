'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface CertificateItem {
    image: string;
    text: string;
}

interface CertificateCarouselProps {
    items: CertificateItem[];
}

export default function CertificateCarousel({ items }: CertificateCarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        // ⚡ Bolt: Store initial pageX directly to avoid offsetLeft calculation in move handler
        setStartX(e.pageX);
        setScrollLeft(carouselRef.current?.scrollLeft || 0);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        // ⚡ Bolt: Calculate delta from initial pageX to avoid layout thrashing (offsetLeft)
        const walk = (e.pageX - startX) * 2;
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        // ⚡ Bolt: Store initial pageX directly to avoid offsetLeft calculation in move handler
        setStartX(e.touches[0].pageX);
        setScrollLeft(carouselRef.current?.scrollLeft || 0);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        // ⚡ Bolt: Calculate delta from initial pageX to avoid layout thrashing (offsetLeft)
        const walk = (e.touches[0].pageX - startX) * 2;
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    return (
        <div className="relative">
            {/* Gradient fades */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10 pointer-events-none" />

            {/* Carousel */}
            <div
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing px-6 py-8 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleMouseUp}
                onTouchMove={handleTouchMove}
            >
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex-shrink-0 group"
                    >
                        <div className="relative w-[320px] md:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                            <Image
                                src={item.image}
                                alt={item.text}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 320px, 400px"
                                loading="lazy"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        {/* Title */}
                        <p className="mt-4 text-center text-sm font-medium text-gray-700 max-w-[320px] md:max-w-[400px]">
                            {item.text}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
