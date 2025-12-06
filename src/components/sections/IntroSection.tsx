'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Images } from '@/constants/Images';
import { ArrowDown } from 'lucide-react';

interface IntroSectionProps {
  onComplete: () => void;
}

export default function IntroSection({ onComplete }: IntroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Disable scroll on mount, re-enable on exit
  useEffect(() => {
    // Prevent scrolling while intro is active
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Exit animation function
  const exitIntro = useCallback(() => {
    if (isExiting || !sectionRef.current) return;
    setIsExiting(true);
    setHasStarted(true);

    // Re-enable scrolling before exit animation completes
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // Phase 1: Elements scale down and fade
    tl.to([taglineRef.current, buttonRef.current, scrollIndicatorRef.current], {
      opacity: 0,
      y: -30,
      scale: 0.9,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.in"
    });

    // Phase 2: Logo and text move up and shrink
    tl.to(containerRef.current, {
      y: -100,
      scale: 0.6,
      opacity: 0,
      duration: 0.6,
      ease: "power3.in"
    }, "-=0.2");

    // Phase 3: Glow expands and fades
    tl.to(glowRef.current, {
      scale: 5,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.4");

    // Phase 4: Section slides up and disappears
    tl.to(sectionRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut"
    }, "-=0.3");
  }, [isExiting, onComplete]);

  // Initial intro animation timeline
  useGSAP(() => {
    if (!sectionRef.current || hasStarted) return;

    const tl = gsap.timeline({
      onComplete: () => setIsAnimationComplete(true)
    });

    // Set initial states
    gsap.set(logoRef.current, { 
      scale: 0, 
      opacity: 0, 
      rotation: -180,
      filter: 'blur(20px)'
    });
    gsap.set(textRef.current, { 
      opacity: 0, 
      x: -50,
      filter: 'blur(10px)'
    });
    gsap.set(taglineRef.current, { 
      opacity: 0, 
      y: 30,
      filter: 'blur(5px)'
    });
    gsap.set(buttonRef.current, { 
      opacity: 0, 
      y: 50, 
      scale: 0.8 
    });
    gsap.set(glowRef.current, { 
      scale: 0, 
      opacity: 0 
    });
    gsap.set(scrollIndicatorRef.current, {
      opacity: 0,
      y: 20
    });

    // Create floating particles (reduced for mobile performance)
    if (particlesRef.current) {
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 10 : 20;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 md:w-2 md:h-2 bg-white/20 rounded-full';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particlesRef.current.appendChild(particle);
        
        gsap.set(particle, { scale: 0, opacity: 0 });
        
        tl.to(particle, {
          scale: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          duration: 0.5,
          ease: "power2.out"
        }, Math.random() * 1.5);
        
        // Floating animation
        gsap.to(particle, {
          y: `${Math.random() * 40 - 20}`,
          x: `${Math.random() * 40 - 20}`,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }

    // Phase 1: Glow pulse appears
    tl.to(glowRef.current, {
      scale: 1.5,
      opacity: 0.6,
      duration: 0.5,
      ease: "power2.out"
    });

    // Phase 2: Logo spins in with dramatic reveal
    tl.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.3");

    // Pulse the glow
    tl.to(glowRef.current, {
      scale: 2,
      opacity: 0.3,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.4");

    // Phase 3: Text slides in from left
    tl.to(textRef.current, {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 0.4,
      ease: "power3.out"
    }, "-=0.2");

    // Phase 4: Tagline fades up
    tl.to(taglineRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.3,
      ease: "power2.out"
    }, "-=0.15");

    // Phase 5: Button bounces in
    tl.to(buttonRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.5)"
    }, "-=0.1");

    // Phase 6: Scroll indicator appears
    tl.to(scrollIndicatorRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.25,
      ease: "power2.out"
    }, "-=0.05");

    // Continuous glow animation
    gsap.to(glowRef.current, {
      scale: 2.5,
      opacity: 0.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5
    });

  }, { scope: sectionRef, dependencies: [hasStarted] });

  // Handle the "Get Started" button click
  const handleGetStarted = () => {
    exitIntro();
  };

  return (
    <section
      ref={sectionRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden touch-none"
      aria-label="Welcome to GoSimple"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Floating Particles Container */}
      <div 
        ref={particlesRef} 
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Radial Glow Effect */}
      <div
        ref={glowRef}
        className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none opacity-0 scale-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)'
        }}
      />

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 w-full max-w-4xl"
      >
        {/* Logo and Brand Name - Stacked on mobile, row on larger screens */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
          {/* Logo */}
          <div
            ref={logoRef}
            className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 opacity-0 scale-0"
          >
            {/* Logo Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-white/10 blur-xl animate-pulse" />
            <img
              src={Images.logoWhite}
              alt="GoSimple Logo"
              className="relative w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            />
          </div>

          {/* Brand Name */}
          <span
            ref={textRef}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white tracking-tight opacity-0"
          >
            GoSimple
          </span>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-sm sm:text-base md:text-xl lg:text-2xl text-zinc-400 font-light max-w-xs sm:max-w-md md:max-w-xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed px-2 opacity-0"
        >
          Transforming ideas into exceptional digital experiences
        </p>

        {/* Get Started Button */}
        <button
          ref={buttonRef}
          onClick={handleGetStarted}
          disabled={!isAnimationComplete}
          className={`group relative flex flex-col items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-white text-black font-semibold text-base sm:text-lg md:text-xl rounded-full transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] active:scale-95 opacity-0 scale-0 ${
            !isAnimationComplete ? 'cursor-wait' : 'cursor-pointer'
          }`}
        >
          <span className="flex items-center gap-2 sm:gap-3">
            Get Started
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-bounce" />
          </span>
        </button>
      </div>

      {/* Scroll Indicator - Shows after animation */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 opacity-0"
      >
        <span className="text-xs sm:text-sm tracking-widest uppercase">Scroll to explore</span>
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-zinc-600 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-zinc-400 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-gradient-to-tl from-white/5 to-transparent pointer-events-none" />

      {/* Animated Border Lines */}
      <div className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50" />
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50" />

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(40px, 40px);
          }
        }
      `}</style>
    </section>
  );
}
