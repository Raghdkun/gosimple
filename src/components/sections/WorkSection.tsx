'use client';

import { Images } from '@/constants/Images';
import { ourWork } from '@/constants';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const totalSlides = ourWork.length;
    
    // Horizontal scroll animation
    // We move the container to the left by (totalSlides - 1) viewports
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 2,
        // Adjust duration based on number of slides to feel natural
        end: () => `+=${sectionRef.current!.offsetWidth * (totalSlides - 1)}`,
        invalidateOnRefresh: true,
      }
    });

    tl.to(containerRef.current, {
      xPercent: -(100 * (totalSlides - 1)),
      ease: "none",
    });
    
    // Progress bar animation
    // We can sync it with the same ScrollTrigger logic
    gsap.fromTo(progressBarRef.current, 
        { width: "0%" },
        { 
            width: "100%", 
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${sectionRef.current!.offsetWidth * (totalSlides - 1)}`,
                scrub: 0.1
            }
        }
    );

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className="relative h-screen w-full overflow-hidden bg-black"
      aria-label="Our Work Portfolio"
    >
      {/* Horizontal Container */}
      <div 
        ref={containerRef} 
        className="flex h-full w-full" 
      >
        {ourWork.map((work, index) => (
          <div 
            key={index} 
            className="w-full h-full flex-shrink-0 flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20"
          >
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 lg:gap-16 items-center">
              
              {/* Text Content */}
              <div className="space-y-3 md:space-y-8 order-2 lg:order-1">
                <div className="space-y-1 md:space-y-2">
                  <span className="text-greenyellow font-mono text-[10px] md:text-base tracking-widest uppercase">
                    0{index + 1} / 0{ourWork.length}
                  </span>
                  <h2 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    {work.title}
                  </h2>
                </div>

                <div className="space-y-3 md:space-y-6">
                  <div className="space-y-0.5 md:space-y-2">
                    <h3 className="text-sm md:text-xl font-semibold text-zinc-200">The Challenge</h3>
                    <p className="text-zinc-400 text-xs md:text-lg leading-relaxed">
                      {work.theChallenges}
                    </p>
                  </div>

                  <div className="space-y-0.5 md:space-y-2">
                    <h3 className="text-sm md:text-xl font-semibold text-zinc-200">Our Solution</h3>
                    <p className="text-zinc-400 text-xs md:text-lg leading-relaxed">
                      {work.ourSolution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Image/Visual */}
              <div className="relative order-1 lg:order-2 w-full max-w-[280px] sm:max-w-sm lg:max-w-none mx-auto">
                 <div className="relative aspect-[4/3] w-full rounded-lg md:rounded-2xl overflow-hidden border group">
                    <div className="absolute inset-0 bg-gradient-to-br from-greenyellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                      src={work.imageLink}
                      alt={work.title}
                      className="w-full h-full object-contain p-3 md:p-8 transition-transform duration-700 group-hover:scale-105"
                    />
                 </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-4 md:bottom-12 left-0 w-full px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
            <div className="h-[2px] w-full bg-zinc-800 rounded-full overflow-hidden">
                <div 
                    ref={progressBarRef} 
                    className="h-full bg-background w-0 shadow-[0_0_10px_greenyellow]" 
                />
            </div>
        </div>
      </div>
    </section>
  );
}
