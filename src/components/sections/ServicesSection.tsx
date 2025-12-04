'use client';

import { Images } from '@/constants/Images';
import { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { servicesData } from '@/constants/servicesData';
import RippleGrid from '../RippleGrid';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  slug: string;
}

function ServiceCard({ icon, title, description, index, slug }: ServiceCardProps) {
  return (
    <Link href={`/services/${slug}`} className="h-full block">
      <div
        className="group relative h-full border border-zinc-800 rounded-2xl p-8 md:p-10 bg-black/40 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-zinc-600 flex flex-col items-center justify-center text-center hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
        role="article"
        aria-label={title}
      >
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Content - Wrapped in a div that we will animate */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full space-y-8 card-content">
          {/* Icon Container */}
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
              {icon}
            </div>
             {/* Icon Glow */}
             <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
          </div>

          {/* Text Content */}
          <div className="space-y-4 max-w-sm">
            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-zinc-100 transition-colors">
              {title}
            </h3>

            {/* Description */}
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed group-hover:text-zinc-300 transition-colors">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const services = servicesData.map(service => ({
    slug: service.slug,
    icon: (
      <div className="relative w-full h-full">
        <img
          src={service.icon}
          alt=""
          className="w-full h-full object-contain invert brightness-0 filter"
          loading="lazy"
        />
      </div>
    ),
    title: service.title,
    description: service.description,
  }));

  useGSAP(() => {
    if (containerRef.current) {
      const cardSlot1 = containerRef.current.querySelector('.card-slot-1');
      const cardSlot2 = containerRef.current.querySelector('.card-slot-2');
      const cardSlot3 = containerRef.current.querySelector('.card-slot-3');
      const cardSlot4 = containerRef.current.querySelector('.card-slot-4');
      
      // Get the content wrappers inside the cards
      const content1 = cardSlot1?.querySelector('.card-content');
      const content2 = cardSlot2?.querySelector('.card-content');
      const content3 = cardSlot3?.querySelector('.card-content');
      const content4 = cardSlot4?.querySelector('.card-content');

      // Initial states - Slots are visible, but content is hidden/scaled
      gsap.set(headerRef.current, { opacity: 0, y: 30 });
      
      // Ensure slots are visible so layout holds
      gsap.set([cardSlot1, cardSlot2, cardSlot3, cardSlot4], { opacity: 1, zIndex: 1 });
      
      // Set initial state for content
      gsap.set([content1, content2], { opacity: 0, scale: 0.8 });
      gsap.set([content3, content4], { opacity: 0, scale: 0.8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        }
      });

      // 1. Header Fade In
      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      });

      // 2. Show First Pair Content
      tl.to([content1, content2], {
        opacity: 1,
        scale: 1,
        duration: 2.5,
        stagger: 0.3,
        ease: "back.out(1.2)"
      });

      // Hold first pair briefly
      tl.to({}, { duration: 2 });

      // 3. Swap Pairs Content
      // Fade out first pair content
      tl.to([content1, content2], {
        opacity: 0,
        scale: 0.9,
        duration: 2.5,
        ease: "power2.in"
      }, "swap");

      // Fade in second pair content
      tl.to([content3, content4], {
        opacity: 1,
        scale: 1,
        duration: 2.5,
        stagger: 0.3,
        ease: "back.out(1.2)"
      }, "swap+=0.5");

      // 4. Final Hold
      tl.to({}, { duration: 3 });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative h-screen w-full overflow-hidden bg-black flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 lg:px-20"
      aria-labelledby="services-heading"
    >
      {/* Background RippleGrid - Pinned absolutely */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[60%]">
          <RippleGrid
            enableRainbow={true}
            gridColor="#ffffff"
            rippleIntensity={0.03}
            gridSize={14}
            gridThickness={12}
            mouseInteraction={true}
            mouseInteractionRadius={0.8}
            opacity={0.3}
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto flex flex-col items-center justify-center h-full">
        
        {/* Section Header */}
        <div
            ref={headerRef}
            className="text-center mb-16 md:mb-24 absolute top-[10%] md:top-[12%] w-full z-20"
        >
            <h2
                id="services-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight"
            >
                Our Services
            </h2>
        </div>

        {/* Unified Layout (Desktop style for all screens) */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-7xl w-full mx-auto h-[500px] items-center relative mt-24 md:mt-32">
            {/* Left Slot */}
            <div className="relative w-full h-full">
                 <div className="absolute inset-0 card-slot-1">
                    <ServiceCard {...services[0]} index={0} />
                 </div>
                 <div className="absolute inset-0 card-slot-3">
                    <ServiceCard {...services[2]} index={2} />
                 </div>
            </div>

            {/* Right Slot */}
            <div className="relative w-full h-full">
                 <div className="absolute inset-0 card-slot-2">
                    <ServiceCard {...services[1]} index={1} />
                 </div>
                 <div className="absolute inset-0 card-slot-4">
                    <ServiceCard {...services[3]} index={3} />
                 </div>
            </div>
        </div>

      </div>
    </section>
  );
}
