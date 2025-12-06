'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HelpCircle, ChevronDown } from 'lucide-react';
import RippleGrid from '../RippleGrid';

gsap.registerPlugin(ScrollTrigger);

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of digital services including website development, mobile app development, SaaS platforms, automation & AI assistants, data analytics & insights, and custom system development. Each service is tailored to meet your specific business needs and goals.",
    category: "General"
  },
  {
    id: 2,
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity and scope. A basic website might take 4-6 weeks, while a custom SaaS platform could take 3-6 months. We provide detailed timeline estimates during our initial consultation and keep you updated throughout the development process.",
    category: "Process"
  },
  {
    id: 3,
    question: "Do you provide ongoing support after launch?",
    answer: "Yes! We offer comprehensive post-launch support including bug fixes, updates, and maintenance. We provide 30 days of free support after launch, and offer various ongoing support packages to ensure your solution continues to perform optimally.",
    category: "Support"
  },
  {
    id: 4,
    question: "What technologies do you work with?",
    answer: "We work with modern, industry-standard technologies including React, Next.js, Node.js, Python, TypeScript, AWS, and more. We choose the best tech stack based on your project requirements, scalability needs, and long-term goals.",
    category: "Technical"
  },
  {
    id: 5,
    question: "Can you help with an existing project?",
    answer: "Absolutely! We can audit, improve, or continue development on existing projects. Whether you need to fix issues, add features, or completely rebuild, we have experience taking over and enhancing existing codebases.",
    category: "General"
  },
  {
    id: 6,
    question: "How do you handle project communication?",
    answer: "We believe in transparent, regular communication. You'll have a dedicated project manager, weekly progress updates, and access to project management tools. We're available via email, phone, video calls, and use Slack or your preferred communication platform.",
    category: "Process"
  },
];

interface FAQCardProps {
  faq: FAQ;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function FAQCard({ faq, index, isExpanded, onToggle }: FAQCardProps) {
  const isEven = index % 2 === 0;
  
  return (
    <div
      className={`faq-card faq-card-${index} relative w-full md:w-[85%] lg:w-[75%] ${
        isEven ? 'md:mr-auto' : 'md:ml-auto'
      }`}
    >
      {/* Large Number Indicator */}
      <div 
        className={`absolute -top-4 md:-top-8 ${isEven ? '-left-2 md:-left-8' : '-right-2 md:-right-8'} z-0`}
      >
        <span className="text-[80px] md:text-[120px] lg:text-[150px] font-bold text-zinc-900/50 select-none leading-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Card Content */}
      <div 
        className={`relative z-10 group border border-zinc-800/50 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 hover:border-zinc-600 hover:shadow-[0_0_60px_rgba(255,255,255,0.05)] ${
          isExpanded ? 'border-zinc-600 shadow-xl shadow-black/40' : ''
        }`}
      >
        {/* Gradient Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Question Button */}
        <button
          onClick={onToggle}
          className="w-full flex items-start justify-between gap-4 md:gap-6 p-6 md:p-8 lg:p-10 text-left"
          aria-expanded={isExpanded}
        >
          <div className="flex-1 space-y-2">
            <span className="inline-block text-xs md:text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">
              {faq.category}
            </span>
            <h3 className={`text-lg md:text-xl lg:text-2xl font-semibold transition-colors duration-300 ${
              isExpanded ? 'text-white' : 'text-zinc-200 group-hover:text-white'
            }`}>
              {faq.question}
            </h3>
          </div>
          
          <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
            isExpanded 
              ? 'bg-white border-white rotate-180' 
              : 'bg-zinc-800/50 border-zinc-700 group-hover:bg-zinc-800 group-hover:border-zinc-500'
          }`}>
            <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${
              isExpanded ? 'text-black' : 'text-zinc-400 group-hover:text-white'
            }`} />
          </div>
        </button>

        {/* Answer with Animated Height */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-out ${
            isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 md:px-8 lg:px-10 pb-6 md:pb-8 lg:pb-10">
            <div className="pt-4 md:pt-6 border-t border-zinc-800/50">
              <p className="text-base md:text-lg lg:text-xl text-zinc-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Line Connector */}
      {index < faqs.length - 1 && (
        <div 
          className={`hidden md:block absolute ${isEven ? 'right-0' : 'left-0'} bottom-0 translate-y-full h-16 lg:h-24`}
        >
          <div className={`w-px h-full bg-gradient-to-b from-zinc-700 to-transparent ${
            isEven ? 'ml-auto mr-8 lg:mr-16' : 'ml-8 lg:ml-16'
          }`} />
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useGSAP(() => {
    if (!sectionRef.current || !cardsContainerRef.current) return;

    const cards = gsap.utils.toArray('.faq-card');
    
    // Set initial states
    gsap.set(headerRef.current, { opacity: 0, y: 50 });
    gsap.set(cards, { opacity: 0, y: 100, scale: 0.9 });
    gsap.set(ctaRef.current, { opacity: 0, y: 50, scale: 0.95 });

    // Main timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "+=400%",
        // pin: true,
        scrub: 1,
        anticipatePin: 1,
      }
    });

    // Phase 1: Header animation
    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    });

    // Phase 2: Staggered cards reveal with alternating animations
    cards.forEach((card, i) => {
      const isEven = i % 2 === 0;
      
      tl.to(card as Element, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.4)",
      }, i === 0 ? "+=0.3" : "-=1");

      // Add a subtle x movement for alternating effect
      tl.fromTo(card as Element, 
        { x: isEven ? -50 : 50 },
        { x: 0, duration: 1.5, ease: "power3.out" },
        "<"
      );
    });

    // Phase 3: Hold to let user read
    tl.to({}, { duration: 2 });

    // Phase 4: CTA reveal
    tl.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.5,
      ease: "back.out(1.2)"
    });

    // Phase 5: Final hold
    tl.to({}, { duration: 1.5 });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { scope: sectionRef });

  const toggleFAQ = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative min-h-screen w-full overflow-hidden bg-black"
      aria-label="Frequently Asked Questions"
    >
      {/* Background RippleGrid */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[80%]">
          <RippleGrid
            enableRainbow={true}
            gridColor="#ffffff"
            rippleIntensity={0.02}
            gridSize={16}
            gridThickness={10}
            mouseInteraction={true}
            mouseInteractionRadius={0.6}
            opacity={0.15}
          />
        </div>
      </div> */}

      {/* Ambient Gradient Orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-start items-center px-4 sm:px-6 md:px-12 lg:px-20 py-16 md:py-24">
        
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center mb-12 md:mb-16 lg:mb-20 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-zinc-800 rounded-full mb-3 sm:mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-[10px] sm:text-xs font-medium text-zinc-400 uppercase tracking-wide">Got Questions?</span>
          </div>
          
          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-2 sm:mb-3 tracking-tight leading-tight"
          >
            Frequently Asked Questions
          </h2>
          
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our services, process, and how we can help bring your vision to life.
          </p>
        </div>

        {/* FAQ Cards Container */}
        <div 
          ref={cardsContainerRef}
          className="w-full max-w-5xl mx-auto space-y-8 md:space-y-12 lg:space-y-16"
        >
          {faqs.map((faq, index) => (
            <FAQCard
              key={faq.id}
              faq={faq}
              index={index}
              isExpanded={expandedId === faq.id}
              onToggle={() => toggleFAQ(faq.id)}
            />
          ))}
        </div>

        {/* CTA Section */}
        {/* <div
          ref={ctaRef}
          className="mt-16 md:mt-20 lg:mt-24 text-center max-w-2xl mx-auto"
        >
          <div className="p-8 md:p-12 bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-2xl md:rounded-3xl">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-base md:text-lg text-zinc-400 mb-6">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Contact Us
              <HelpCircle className="w-5 h-5" />
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
}
