'use client';

import { Images } from '@/constants/Images';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUpVariants, staggerContainerVariants } from '@/hooks/use-scroll-animation';
import Orb from '@/components/Orb';
import { useGSAP } from '@gsap/react';
import { useRef, useEffect, useState } from 'react';
import gsap from "gsap";

interface HeroSectionProps {
  isIntroComplete?: boolean;
}

export default function HeroSection({ isIntroComplete = false }: HeroSectionProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  gsap.registerPlugin(useGSAP);

  // Set initial hidden state
  useEffect(() => {
    if (!isIntroComplete && !hasAnimated) {
      gsap.set(containerRef.current, { opacity: 0, y: 80, scale: 0.9 });
      gsap.set(headingRef.current, { opacity: 0, y: 50, scale: 0.95 });
      gsap.set(subheadingRef.current, { opacity: 0, y: 40, filter: 'blur(8px)' });
      gsap.set(bgRef.current, { opacity: 0, scale: 0.8 });
    }
  }, [isIntroComplete, hasAnimated]);

  // Main animation triggered when intro completes
  useEffect(() => {
    if (isIntroComplete && !hasAnimated) {
      setHasAnimated(true);
      
      const tl = gsap.timeline();

      // Phase 1: Background orb scales in with glow
      tl.to(bgRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
      });

      // Phase 2: Container pops up with elastic effect
      tl.to(containerRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.8");

      // Phase 3: Heading reveals with dramatic scale
      tl.to(headingRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "power4.out"
      }, "-=0.5");

      // Phase 4: Subheading fades in with blur removal
      tl.to(subheadingRef.current, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4");
    }
  }, [isIntroComplete, hasAnimated]);

  // Continuous floating animation for background
  useGSAP(() => {
    if (!bgRef.current) return;
    
    // Background animation - subtle floating effect
    gsap.to(bgRef.current, {
      y: "-=20",
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);


  return (
    <section ref={sectionRef} className="relative pt-24 md:pt-36 lg:pt-44 pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 bg-black text-white overflow-hidden flex items-center justify-center min-h-[80vh]">
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto text-center space-y-8 md:space-y-10 lg:space-y-12 flex flex-col items-center"
      >
        <h1
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] font-bold leading-[1.3] md:leading-[1.35] lg:leading-[1.4] tracking-[-0.02em] font-poppins bg-gradient-to-b from-white via-white to-[#71717A] text-transparent bg-clip-text"
        >
          Think big. Make it simple.
        </h1>
        <p
          ref={subheadingRef}
          className="text-lg sm:text-xl md:text-2xl lg:text-[28px] xl:text-[32px] font-medium leading-[1.5] tracking-[-0.01em] font-poppins text-[#A1A1AA] max-w-4xl mx-auto px-2 md:px-0"
        >
          Turn your ideas into websites, apps, and smart systems that make work easier and help your business grow.
        </p>
      </div>

      {/* Hero Image - Centered and responsive note: this is just an arrow assigned to the bottom and it's small and placed after the texts */}
      {/* <motion.div 
        variants={fadeInUpVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex justify-center mt-12 md:mt-16 lg:mt-20"
      >
        <motion.div 
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 opacity-60 hover:opacity-100 transition-opacity duration-300"
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src={Images.heroImage}
            alt="Hero illustration"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </motion.div> */}

      <div className="absolute inset-0 overflow-hidden opacity-60 mt-12 md:mt-16 lg:mt-12">
        <div className="absolute inset-0" ref={bgRef}>
          <Orb hue={355} hoverIntensity={0.25} rotateOnHover forceHoverState />
        </div>
      </div>
    </section>
  );
}
