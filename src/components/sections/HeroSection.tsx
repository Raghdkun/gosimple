'use client';

import { Images } from '@/constants/Images';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUpVariants, staggerContainerVariants } from '@/hooks/use-scroll-animation';

export default function HeroSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="relative pt-24 md:pt-36 lg:pt-44 pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 bg-black text-white overflow-hidden flex items-center justify-center min-h-[80vh]">
      <motion.div 
        className="max-w-7xl mx-auto text-center space-y-8 md:space-y-10 lg:space-y-12 flex flex-col items-center"
        variants={staggerContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h1 
          variants={fadeInUpVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] font-bold leading-[1.3] md:leading-[1.35] lg:leading-[1.4] tracking-[-0.02em] font-poppins bg-gradient-to-b from-white via-white to-[#71717A] text-transparent bg-clip-text"
        >
          Simplify Tech. Amplify Growth.
        </motion.h1>
        <motion.p 
          variants={fadeInUpVariants}
          className="text-lg sm:text-xl md:text-2xl lg:text-[28px] xl:text-[32px] font-medium leading-[1.5] tracking-[-0.01em] font-poppins text-[#A1A1AA] max-w-4xl mx-auto px-2 md:px-0"
        >
          We help businesses and entrepreneurs turn ideas into powerful websites, apps, and smart systems that simplify work and drive growth.
        </motion.p>
      </motion.div>
      
      {/* Hero Image - Centered and responsive note: this is just an arrow assigned to the bottom and it's small and placed after the texts */}
      <motion.div 
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
      </motion.div>
      
      {/* Background decoration - Optimized for all screens note: this background grid placed under the text as bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute inset-0 h-full w-full md:h-[793px] md:right-[-603px] md:top-1/2 md:-translate-y-1/2 md:w-[1440px]">
          <img 
            alt="Background pattern" 
            className="block w-full h-full object-cover md:max-w-none md:size-full" 
            src={Images.workSectionBg} 
          />
        </div>
      </div>
    </section>
  );
}
