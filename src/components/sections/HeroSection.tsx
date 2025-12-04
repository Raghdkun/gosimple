'use client';

import { Images } from '@/constants/Images';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUpVariants, staggerContainerVariants } from '@/hooks/use-scroll-animation';
import Orb from '@/components/Orb';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from "gsap";



export default function HeroSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    // Create a GSAP timeline for sequenced animations
    const tl = gsap.timeline({ delay: 0.2 });
    
    // Background animation - subtle floating effect
    gsap.to(bgRef.current, {
      y: "-=20",
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    
    // Background opacity fade-in
    gsap.fromTo(bgRef.current, 
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, 
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
      }
    );

    // Container animation - slide up with fade
    tl.fromTo(containerRef.current,
      { y: 60, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power3.out"
      }
    );

    // Heading animation - slide up with stagger
    tl.fromTo(headingRef.current,
      { y: 40, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      },
      "-=0.6" // Start 0.6s before previous animation ends
    );

    // Subheading animation - slide up with blur effect
    tl.fromTo(subheadingRef.current,
      { y: 30, opacity: 0, filter: "blur(4px)" },
      { 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out"
      },
      "-=0.8" // Start 0.8s before previous animation ends
    );

    // Subtle parallax effect on scroll
    // const handleScroll = () => {
    //   const scrollY = window.scrollY;
    //   const parallaxSpeed = 0.5;
      
    //   gsap.to(bgRef.current, {
    //     y: scrollY * parallaxSpeed,
    //     duration: 0.5,
    //     ease: "power2.out"
    //   });
    // };

    // window.addEventListener('scroll', handleScroll);
    
    return () => {
      // window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <section ref={ref} className="relative pt-24 md:pt-36 lg:pt-44 pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 bg-black text-white overflow-hidden flex items-center justify-center min-h-[80vh]">
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
