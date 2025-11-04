'use client';

import { Images } from '@/constants/Images';
import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUpVariants, staggerContainerVariants, scaleInVariants } from '@/hooks/use-scroll-animation';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function ServiceCard({ icon, title, description, index }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={scaleInVariants}
      className="group relative border border-[#2a2a2a] rounded-2xl p-6 md:p-8 lg:p-10 bg-gradient-to-br from-[rgba(40,40,40,0.3)] via-[rgba(32,32,32,0.2)] to-[rgba(24,24,24,0.1)] overflow-hidden transition-all duration-500 hover:border-[#3a3a3a] hover:shadow-2xl hover:shadow-black/50 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={title}
    >
      {/* Gradient Overlay Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      >
        <div className="absolute bg-gradient-to-br from-[rgba(60,60,60,0.3)] via-transparent to-transparent inset-0 rounded-2xl" />
      </div>

      {/* Glow Effect on Hover */}
      <div
        className="absolute -inset-1 bg-gradient-to-r from-zinc-600/20 via-zinc-500/10 to-zinc-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        aria-hidden="true"
      />

      {/* Decorative Corner Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-zinc-700/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon Container with Animation */}
        <div className="relative mb-6 md:mb-8 lg:mb-10 w-fit">
          <div
            className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-all duration-500 ${
              isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
            }`}
          >
            {icon}
          </div>
          
          {/* Glow behind icon */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-600/30 to-zinc-700/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" aria-hidden="true" />
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-5 text-white leading-tight tracking-tight group-hover:text-zinc-100 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-sm md:text-base lg:text-lg leading-relaxed mb-6 group-hover:text-zinc-300 transition-colors">
          {description}
        </p>

        {/* Learn More Link */}
        <div className="flex items-center gap-2 text-zinc-500 group-hover:text-white transition-all duration-300">
          <span className="text-sm md:text-base font-medium">Learn more</span>
          <ArrowRight
            className={`w-4 h-4 transition-transform duration-300 ${
              isHovered ? 'translate-x-1' : 'translate-x-0'
            }`}
          />
        </div>
      </div>

      {/* Bottom Border Accent */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-zinc-500 to-transparent transition-all duration-500 group-hover:w-full w-0"
        aria-hidden="true"
      />
    </motion.div>
  );
}

export default function ServicesSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });

  const services = [
    {
      icon: (
        <div className="relative w-full h-full">
          <img
            src={Images.webDevIcon}
            alt=""
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      ),
      title: 'Website & App Development',
      description:
        'We design and develop high-performing websites and mobile apps that build trust and help you grow your customer base.',
    },
    {
      icon: (
        <div className="relative w-full h-full">
          <img
            src={Images.automationIcon}
            alt=""
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      ),
      title: 'Automation & AI Assistants',
      description:
        'Simplify your operations with smart automation and AI tools that handle the repetitive tasks, so you and your team can focus on the work that actually grows your business.',
    },
    {
      icon: (
        <div className="relative w-full h-full">
          <img
            src={Images.saasIcon}
            alt=""
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      ),
      title: 'SaaS Platform Development',
      description:
        'We turn your software idea into a powerful, scalable product, ready for users, growth, and launch.',
    },
    {
      icon: (
        <div className="relative w-full h-full">
          <img
            src={Images.analyticsIcon}
            alt=""
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      ),
      title: 'Data Analytics & Insights',
      description:
        'We help you choose the right tools, map better workflows, and scale smarter, with clarity and confidence.',
    },
  ];

  return (
    <section
      ref={ref}
      id="services"
      className="relative px-4 sm:px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24"
      aria-labelledby="services-heading"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-[1920px] mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16 lg:mb-20 space-y-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          {/* Badge */}
          <motion.div variants={fadeInUpVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-zinc-400" />
            <span className="text-sm text-zinc-400 font-medium uppercase tracking-wide">
              Our Services
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeInUpVariants}
            id="services-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent leading-tight tracking-tight"
          >
            What We Do Best
          </motion.h2>

          {/* Subheading */}
          <motion.p variants={fadeInUpVariants} className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            From concept to launch, we provide comprehensive solutions that drive results and help your business thrive in the digital world.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </motion.div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          {/* Main CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:scale-105 overflow-hidden"
            >
              {/* Shine Effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" aria-hidden="true" />
              
              <span className="relative flex items-center gap-2">
                Get in Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            {/* Secondary CTA */}
            <a
              href="#work"
              className="group px-8 py-4 bg-transparent border-2 border-zinc-700 hover:border-zinc-600 text-white rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:bg-zinc-900/30"
            >
              View Our Work
            </a>
          </div>

          {/* Trust Indicator */}
          {/* <div className="flex items-center justify-center gap-8 pt-6 md:pt-8 border-t border-zinc-800/50 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">50+</p>
              <p className="text-xs md:text-sm text-zinc-500">Projects Delivered</p>
            </div>
            <div className="w-px h-12 bg-zinc-800" aria-hidden="true" />
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">100%</p>
              <p className="text-xs md:text-sm text-zinc-500">Client Satisfaction</p>
            </div>
            <div className="w-px h-12 bg-zinc-800" aria-hidden="true" />
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">24/7</p>
              <p className="text-xs md:text-sm text-zinc-500">Support Available</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Enhanced Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        section > div > div:last-child > div {
          animation: fade-in-up 0.6s ease-out forwards;
          animation-play-state: running;
        }
      `}</style>
    </section>
  );
}
