'use client';

import { Images } from '@/constants/Images';
import { useRef } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Clock } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WorkStepProps {
  number: string;
  title: string;
  description: string;
  iconSrc?: string;
  duration: string;
  highlights: string[];
}

function WorkStep({ number, title, description, iconSrc, duration, highlights }: WorkStepProps) {
  return (
    <div
      className="work-card group relative flex-shrink-0 w-full h-auto min-h-[320px] sm:min-h-[340px] md:min-h-[360px] border border-zinc-800 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 bg-black/60 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-zinc-600"
      role="article"
      aria-label={title}
    >
      {/* Number Badge */}
      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-zinc-700 flex items-center justify-center bg-black/50">
        <span className="text-sm sm:text-base font-bold text-white">{number}</span>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className="relative mb-4 sm:mb-5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-transform duration-500 group-hover:scale-110">
            {iconSrc && (
              <img
                src={iconSrc}
                alt=""
                className="w-full h-full object-contain"
                loading="lazy"
              />
            )}
          </div>
          {/* Icon Glow */}
          <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
        </div>

        {/* Duration Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-zinc-700/50 rounded-full mb-3 w-fit">
          <Clock className="w-3 h-3 text-zinc-400" />
          <span className="text-[10px] sm:text-xs text-zinc-400 font-medium">{duration}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-zinc-100 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed group-hover:text-zinc-300 transition-colors mb-4">
          {description}
        </p>

        {/* Highlights */}
        <div className="space-y-2 flex-grow">
          {highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 flex-shrink-0 mt-0.5 transition-colors" />
              <span className="text-[10px] sm:text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                {highlight}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Border Gradient on Hover */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)'
        }}
      />
    </div>
  );
}

export default function HowWeWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: '01',
      title: 'Talk & Understand',
      description: "We start by listening to your needs, understanding your business goals, and identifying the challenges you're facing.",
      iconSrc: Images.talkIcon,
      duration: '1-2 days',
      highlights: [
        'Free initial consultation call',
        'In-depth needs assessment',
        'Goal alignment workshop',
      ],
    },
    {
      number: '02',
      title: 'Scope & Plan',
      description: 'We create a detailed project roadmap, define clear milestones, and establish timelines that work for your business.',
      iconSrc: Images.planIcon,
      duration: '3-5 days',
      highlights: [
        'Detailed project timeline',
        'Resource allocation plan',
        'Risk assessment & mitigation',
      ],
    },
    {
      number: '03',
      title: 'Build & Deliver',
      description: 'Our team gets to work, keeping you updated every step of the way, and delivers a solution that exceeds your expectations.',
      iconSrc: Images.buildIcon,
      duration: '2-8 weeks',
      highlights: [
        'Agile development sprints',
        'Regular progress updates',
        'Quality assurance testing',
      ],
    },
  ];

  // GSAP scroll-triggered animations
  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>('.work-card');

    // Initial states
    gsap.set(headerRef.current, { opacity: 0, y: 50 });
    gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });
    gsap.set(ctaRef.current, { opacity: 0, y: 40 });

    // Header animation
    gsap.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Cards stagger animation - each card animates as it comes into view
    cards.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // CTA animation
    gsap.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden bg-black"
      aria-labelledby="process-heading"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-zinc-800 rounded-full mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-[10px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide">
              Our Process
            </span>
          </div>

          <h2
            id="process-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-3 sm:mb-4 tracking-tight leading-tight"
          >
            How We Work
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            A proven 3-step process that transforms your ideas into reality with transparency and precision
          </p>

          {/* Progress Line */}
          <div className="flex justify-center pt-6 sm:pt-8">
            <div className="w-24 sm:w-32 h-0.5 bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
          </div>
        </div>

        {/* Cards Grid */}
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 justify-items-center mb-12 sm:mb-16"
        >
          {steps.map((step, index) => (
            <WorkStep
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              iconSrc={step.iconSrc}
              duration={step.duration}
              highlights={step.highlights}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div ref={ctaRef} className="text-center space-y-4 sm:space-y-6">
          <div className="max-w-xl mx-auto space-y-2 sm:space-y-3">
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base">
              Ready to start your project? Let&apos;s discuss how we can help bring your vision to life.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="#contact"
              className="group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-black rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-xl hover:shadow-white/10 hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" aria-hidden="true" />
              
              <span className="relative flex items-center gap-2">
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a
              href="#work"
              className="px-6 sm:px-8 py-3 sm:py-3.5 bg-transparent border border-zinc-700 hover:border-zinc-500 text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-zinc-900/30"
            >
              View Case Studies
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
