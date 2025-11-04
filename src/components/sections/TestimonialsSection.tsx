'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUpVariants, staggerContainerVariants, scaleInVariants } from '@/hooks/use-scroll-animation';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  projectType: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "CEO",
    company: "TechStart Inc",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content: "GoSimple transformed our outdated website into a modern, high-performing platform. The team's attention to detail and commitment to our vision was outstanding. Our conversion rate increased by 150% in just 3 months!",
    rating: 5,
    projectType: "Website Development"
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Founder",
    company: "DataFlow Solutions",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    content: "Working with GoSimple was a game-changer for our business. They built a custom SaaS platform that perfectly fits our needs. The automation features alone save us 20+ hours per week. Highly recommended!",
    rating: 5,
    projectType: "SaaS Platform"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "RetailNext",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    content: "The mobile app GoSimple developed exceeded all our expectations. It's fast, intuitive, and our customers love it. The team was responsive, professional, and delivered ahead of schedule.",
    rating: 5,
    projectType: "App Development"
  },
  {
    id: 4,
    name: "James Anderson",
    role: "Operations Director",
    company: "LogiTech Pro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    content: "The automation systems implemented by GoSimple have revolutionized our workflow. What used to take days now happens in minutes. Their technical expertise and problem-solving skills are unmatched.",
    rating: 5,
    projectType: "Automation & AI"
  },
  {
    id: 5,
    name: "Olivia Thompson",
    role: "Marketing Director",
    company: "BrandVision",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    content: "GoSimple's data analytics dashboard gives us insights we never had before. The custom reporting features help us make data-driven decisions quickly. Absolutely worth the investment!",
    rating: 5,
    projectType: "Data Analytics"
  },
  {
    id: 6,
    name: "David Park",
    role: "CTO",
    company: "FinanceHub",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    content: "Building our custom system with GoSimple was seamless. They understood our complex requirements and delivered a solution that scales perfectly with our growth. True professionals!",
    rating: 5,
    projectType: "Custom System"
  }
];

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

function TestimonialCard({ testimonial, isActive }: TestimonialCardProps) {
  return (
    <div className="relative flex-[0_0_100%] min-w-0 px-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
      <div
        className={`relative h-full bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-900/30 border rounded-2xl p-6 md:p-8 transition-all duration-500 ${
          isActive ? 'border-zinc-600 shadow-2xl shadow-zinc-900/50' : 'border-zinc-800/50'
        }`}
      >
        {/* Quote Icon */}
        <div className="absolute top-6 right-6 opacity-10">
          <Quote className="w-16 h-16 md:w-20 md:h-20 text-white" />
        </div>

        {/* Project Type Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/50 rounded-full mb-6">
          <span className="text-xs font-medium text-zinc-400">{testimonial.projectType}</span>
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < testimonial.rating
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-zinc-700'
              }`}
            />
          ))}
        </div>

        {/* Testimonial Content */}
        <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-8 relative z-10">
          "{testimonial.content}"
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-4 pt-6 border-t border-zinc-800/50">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-zinc-800 border-2 border-zinc-700 flex-shrink-0">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-white font-semibold text-base md:text-lg">
              {testimonial.name}
            </h4>
            <p className="text-zinc-400 text-sm">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>

        {/* Bottom Gradient Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-zinc-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-black overflow-hidden"
      aria-label="Client Testimonials"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />

      {/* Section Header */}
      <motion.div
        className="relative max-w-7xl mx-auto mb-12 md:mb-16 text-center"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainerVariants}
      >
        <motion.div variants={fadeInUpVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full mb-6">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-zinc-400">Client Success Stories</span>
        </motion.div>

        <motion.h2
          variants={fadeInUpVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-6 tracking-tight leading-tight"
        >
          What Our Clients Say
        </motion.h2>

        <motion.p
          variants={fadeInUpVariants}
          className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
        >
          Don't just take our word for it. Here's what our clients have to say about working with us.
        </motion.p>
      </motion.div>

      {/* Testimonials Carousel */}
      <div className="relative max-w-7xl mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -mx-4">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={index === selectedIndex}
              />
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8 md:mt-12">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 hover:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'w-8 bg-white'
                    : 'w-2 bg-zinc-700 hover:bg-zinc-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 hover:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Stats Summary */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 md:mt-16 max-w-4xl mx-auto"
        >
          {[
            { value: '50+', label: 'Happy Clients' },
            { value: '100+', label: 'Projects Delivered' },
            { value: '99%', label: 'Satisfaction Rate' },
            { value: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={scaleInVariants}
              className="text-center p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-zinc-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
