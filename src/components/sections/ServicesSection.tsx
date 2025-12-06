'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { servicesData } from '@/constants/servicesData';
import RippleGrid from '../RippleGrid';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  slug: string;
  isActive: boolean;
}

function ServiceCard({ icon, title, description, index, slug, isActive }: ServiceCardProps) {
  return (
    <div
      className={`service-card group relative flex-shrink-0 w-[240px] sm:w-[260px] md:w-[300px] lg:w-[340px] xl:w-[380px] h-[280px] sm:h-[300px] md:h-[340px] lg:h-[360px] border border-zinc-800 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 bg-black/60 backdrop-blur-xl overflow-hidden transition-all duration-700 ${
        isActive ? 'border-zinc-500 scale-100' : 'border-zinc-800 scale-95 opacity-70'
      }`}
      role="article"
      aria-label={title}
    >
      {/* Number Badge */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-zinc-700 flex items-center justify-center">
        <span className="text-xs sm:text-sm font-light text-zinc-500">0{index + 1}</span>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className="relative mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 transition-transform duration-500 group-hover:scale-110">
            {icon}
          </div>
          {/* Icon Glow */}
          <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-zinc-100 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed group-hover:text-zinc-300 transition-colors flex-grow line-clamp-4">
          {description}
        </p>

        {/* CTA Link */}
        <Link 
          href={`/services/${slug}`}
          className="relative z-20 inline-flex items-center gap-2 text-white/80 hover:text-white mt-3 sm:mt-4 group/link transition-colors cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-xs sm:text-sm font-medium">Learn more</span>
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>

      {/* Animated Border Gradient on Hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)'
        }}
      />
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselInnerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    if (!carouselInnerRef.current || !sectionRef.current || !headerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>('.service-card');
    const totalCards = cards.length;
    
    // Initial states
    gsap.set(headerRef.current, { opacity: 0, y: 50 });
    gsap.set(carouselRef.current, { opacity: 0 });
    cards.forEach((card, i) => {
      gsap.set(card, { 
        opacity: 0.3, 
        scale: 0.9,
        x: 80 * (i + 1)
      });
    });

    // Calculate the total scroll distance for horizontal movement
    const cardWidth = window.innerWidth < 640 ? 256 : window.innerWidth < 768 ? 276 : window.innerWidth < 1024 ? 316 : window.innerWidth < 1280 ? 356 : 396;
    const gap = window.innerWidth < 640 ? 16 : 24;
    const totalScrollWidth = (cardWidth + gap) * (totalCards - 1);

    // Create the main timeline with ScrollTrigger for horizontal scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalScrollWidth + window.innerHeight * 0.8}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Calculate which card is active based on scroll progress
          // Adjust calculation to start from first card (index 0)
          const progress = self.progress;
          // Intro animation takes ~30% of scroll, remaining 70% is for card scrolling
          const cardProgress = Math.max(0, (progress - 0.3) / 0.7);
          const newIndex = Math.min(
            Math.floor(cardProgress * totalCards),
            totalCards - 1
          );
          // Ensure we always start at 0
          const finalIndex = progress < 0.3 ? 0 : newIndex;
          if (finalIndex !== activeIndex) {
            setActiveIndex(finalIndex);
          }
        }
      }
    });

    // Phase 1: Header fades in
    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power3.out"
    });

    // Phase 2: Carousel container fades in
    tl.to(carouselRef.current, {
      opacity: 1,
      duration: 0.2,
      ease: "power2.out"
    }, "<0.1");

    // Phase 3: Cards slide in and become visible
    tl.to(cards, {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power3.out"
    }, "<");

    // Phase 4: Horizontal scroll animation
    tl.to(carouselInnerRef.current, {
      x: -totalScrollWidth,
      duration: 1,
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative h-screen w-full overflow-hidden bg-black flex flex-col justify-center py-4 sm:py-6 md:py-8 px-4 sm:px-6"
      aria-labelledby="services-heading"
    >
   
      {/* Section Header */}
      <div
        ref={headerRef}
        className="relative z-10 text-center mb-3 sm:mb-4 md:mb-6 flex-shrink-0"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-zinc-800 rounded-full mb-3 sm:mb-4">
          <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
          <span className="text-[10px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide">
            What We Offer
          </span>
        </div>
        <h2
          id="services-heading"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-3 sm:mb-4 tracking-tight leading-tight"
        >
          Our Services
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Comprehensive digital solutions tailored to transform your business
        </p>
        
        {/* Progress Indicators */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
          {services.map((_, i) => (
            <div
              key={i}
              className={`w-6 sm:w-8 md:w-10 h-0.5 sm:h-1 rounded-full transition-all duration-500 ${
                i === activeIndex ? 'bg-white' : 'bg-zinc-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="relative z-10 flex items-center overflow-hidden flex-shrink-0 py-4 sm:py-6"
        style={{ minHeight: 'clamp(300px, 50vh, 400px)' }}
      >
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        
        {/* Scrollable Cards Container */}
        <div 
          ref={carouselInnerRef}
          className="flex gap-4 sm:gap-6 pl-[5%] sm:pl-[10%] md:pl-[15%] lg:pl-[20%] pr-[40%] sm:pr-[50%]"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              {...service}
              index={index}
              isActive={index === activeIndex}
            />
          ))}
        </div>
      </div>

      {/* Navigation Hints */}
      <div className="relative z-10 flex items-center justify-center gap-4 py-2 flex-shrink-0">
        <div className="flex items-center gap-2 text-zinc-500">
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-[10px] sm:text-xs">Scroll to explore</span>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
      </div>

      {/* Current Service Counter */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 right-4 sm:right-8 md:right-12 text-zinc-600 z-20">
        <span className="text-xl sm:text-2xl md:text-3xl font-light text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className="text-base sm:text-lg md:text-xl font-light text-zinc-500"> / {String(services.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
}
