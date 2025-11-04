'use client';

import { Images } from '@/constants/Images';
import { ourWork } from '@/constants';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUpVariants, staggerContainerVariants } from '@/hooks/use-scroll-animation';

export default function WorkSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    duration: 20,
    skipSnaps: false 
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Enhanced autoplay with pause functionality
  useEffect(() => {
    if (!emblaApi || isAutoplayPaused) return;
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(autoplay);
  }, [emblaApi, isAutoplayPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollPrev();
      if (e.key === 'ArrowRight') scrollNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollPrev, scrollNext]);

  const toggleAutoplay = () => {
    setIsAutoplayPaused(!isAutoplayPaused);
  };

  return (
    <section 
      ref={ref}
      id="work" 
      className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12"
      aria-label="Our Work Portfolio"
    >
      {/* Hero Section with Enhanced Animations */}
      <motion.div 
        className="relative max-w-5xl mx-auto mb-12 md:mb-20"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainerVariants}
      >
        {/* Background Image with Blur Effect */}
        <div className="hidden lg:block absolute h-[502px] left-[-336px] top-[-163px] w-[1440px] opacity-60 blur-[1px]">
          <img alt="" className="block max-w-none size-full" src={Images.workSectionBg} />
        </div>
        
        {/* Explore Our Work Button with Animation */}
        <motion.div variants={fadeInUpVariants} className="flex justify-center items-center gap-3 md:gap-4 mb-8 md:mb-10">
          <span className="text-base md:text-lg font-light text-[rgba(255,255,255,0.5)] tracking-wide uppercase">
            Explore Our Work
          </span>
          <div className="w-5 h-6 md:w-6 md:h-7 animate-bounce-slow">
            <img alt="Arrow down" className="block max-w-none size-full opacity-60" src={Images.arrowBottom} />
          </div>
        </motion.div>
        
        {/* Main Heading with Enhanced Typography */}
        <div className="text-center space-y-6 md:space-y-8">
          <motion.h2 variants={fadeInUpVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-4 tracking-tight leading-tight">
            Our Work
          </motion.h2>
          <div className="space-y-3 md:space-y-4 max-w-3xl mx-auto">
            <motion.p variants={fadeInUpVariants} className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90 leading-snug">
              Why Businesses Choose GoSimple
            </motion.p>
            <motion.div variants={fadeInUpVariants} className="w-20 h-1 bg-gradient-to-r from-transparent via-zinc-500 to-transparent mx-auto" />
            <motion.p variants={fadeInUpVariants} className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              You're Building a Business. We Build What Keeps It Moving
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Carousel Container */}
      <div className="relative w-full max-w-7xl mx-auto">
       

        <div className="embla overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="embla__container flex">
            {ourWork.map((work, index) => (
              <div 
                key={index} 
                className="embla__slide"
                role="group"
                aria-label={`Slide ${index + 1} of ${ourWork.length}`}
                aria-roledescription="slide"
              >
                {/* Enhanced Case Study Card */}
                <div className="group relative bg-gradient-to-br from-[rgba(40,40,40,0.4)] via-[rgba(32,32,32,0.3)] to-[rgba(24,24,24,0.2)] border border-[#333] hover:border-[#444] rounded-2xl p-6 md:p-8 lg:p-10 mx-2 transition-all duration-500 hover:shadow-2xl hover:shadow-black/50 backdrop-blur-sm">
                  {/* Decorative Corner Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-zinc-700/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Slide Counter */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs md:text-sm text-zinc-500 font-mono tracking-wider">
                      {String(index + 1).padStart(2, '0')} / {String(ourWork.length).padStart(2, '0')}
                    </span>
               
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 md:mb-10 text-white leading-tight tracking-tight">
                    {work.title}
                  </h3>

                  {/* Responsive Grid Layout */}
                  <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12">
                    {/* Text Content with Enhanced Styling */}
                    <div className="lg:col-span-7 space-y-6 md:space-y-8">
                      <div className="space-y-3 md:space-y-4 group/section">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-1 h-6 bg-gradient-to-b from-zinc-500 to-transparent rounded-full" />
                          <h4 className="text-lg md:text-2xl font-bold text-white tracking-tight">
                            The Challenge
                          </h4>
                        </div>
                        <p className="text-zinc-300 text-sm md:text-lg leading-relaxed pl-4 border-l-2 border-[#2a2a2a] group-hover/section:border-[#3a3a3a] transition-colors">
                          {work.theChallenges}
                        </p>
                      </div>

                      <div className="space-y-3 md:space-y-4 group/section">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-1 h-6 bg-gradient-to-b from-zinc-400 to-transparent rounded-full" />
                          <h4 className="text-lg md:text-2xl font-bold text-white tracking-tight">
                            Our Solution
                          </h4>
                        </div>
                        <p className="text-zinc-300 text-sm md:text-lg leading-relaxed pl-4 border-l-2 border-[#2a2a2a] group-hover/section:border-[#3a3a3a] transition-colors">
                          {work.ourSolution}
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Dashboard Preview */}
                    <div className="mt-8 md:mt-10 lg:mt-0 lg:col-span-5">
                      <div className="relative group/image">
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-zinc-600/20 to-zinc-800/20 rounded-2xl blur-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative rounded-xl overflow-hidden border border-[#2a2a2a] group-hover/image:border-[#3a3a3a] transition-colors bg-[#1a1a1a] p-4">
                          <div className="w-full aspect-[4/3] relative overflow-hidden rounded-lg">
                            <img
                              alt={`${work.title} dashboard preview`}
                              className="w-full h-full object-contain transform group-hover/image:scale-105 transition-transform duration-700"
                              src={work.imageLink}
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Navigation Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-10">
          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="group relative w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#444] bg-[#1a1a1a] hover:bg-[#252525] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:border-[#555] hover:shadow-lg hover:shadow-black/50"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 mx-auto text-zinc-400 group-hover:text-white transition-colors" />
            </button>

            {/* Dot Navigation with Enhanced Styling */}
            <div className="flex items-center gap-3 px-6 py-3 bg-[#1a1a1a] border border-[#333] rounded-full">
              {ourWork.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`relative transition-all duration-300 ${
                    index === selectedIndex 
                      ? 'w-10 h-3 bg-gradient-to-r from-zinc-500 to-zinc-400 rounded-full' 
                      : 'w-3 h-3 bg-[#444] hover:bg-[#555] rounded-full'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === selectedIndex ? 'true' : 'false'}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="group relative w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#444] bg-[#1a1a1a] hover:bg-[#252525] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:border-[#555] hover:shadow-lg hover:shadow-black/50"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 mx-auto text-zinc-400 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Autoplay Control */}
          <button
            onClick={toggleAutoplay}
            className="flex items-center gap-3 px-5 py-3 rounded-full border border-[#444] bg-[#1a1a1a] hover:bg-[#252525] transition-all duration-300 hover:border-[#555] group"
            aria-label={isAutoplayPaused ? 'Resume autoplay' : 'Pause autoplay'}
          >
            {isAutoplayPaused ? (
              <Play className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            ) : (
              <Pause className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            )}
            <span className="text-sm text-zinc-400 group-hover:text-white transition-colors font-medium">
              {isAutoplayPaused ? 'Play' : 'Pause'}
            </span>
          </button>
        </div>
      </div>

      {/* Enhanced Styles with Animations */}
      <style jsx>{`
        .embla {
          overflow: hidden;
        }
        .embla__container {
          display: flex;
          touch-action: pan-y pinch-zoom;
        }
        .embla__slide {
          flex: 0 0 100%;
          min-width: 0;
        }
        @media (min-width: 768px) {
          .embla__slide {
            flex: 0 0 calc(100% - 2rem);
          }
        }
        @media (min-width: 1024px) {
          .embla__slide {
            flex: 0 0 calc(100% - 4rem);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(5px);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
