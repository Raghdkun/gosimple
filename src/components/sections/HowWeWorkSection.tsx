'use client';

import { Images } from '@/constants/Images';
import { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Clock, Users, Rocket, MessageCircle, FileText, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUpVariants, staggerContainerVariants, scaleInVariants } from '@/hooks/use-scroll-animation';

interface WorkStepProps {
  number: string;
  title: string;
  description: string;
  iconSrc?: string;
  index: number;
  isLast?: boolean;
  deliverables: string[];
  duration: string;
  highlights: string[];
}

function WorkStep({ number, title, description, iconSrc, index, isLast, deliverables, duration, highlights }: WorkStepProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      variants={scaleInVariants}
      className="relative flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    

      {/* Step Card - Fixed height structure */}
      <div 
        className={`relative flex flex-col h-full bg-gradient-to-br from-zinc-900/60 via-zinc-900/40 to-zinc-900/20 border rounded-2xl overflow-hidden transition-all duration-500 ${
          isHovered ? 'border-zinc-700 shadow-xl shadow-zinc-900/30' : 'border-zinc-800/50'
        }`}>
        {/* Top Gradient Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-zinc-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
        
        {/* Card Content - Flex column to push button to bottom */}
        <div className="flex flex-col h-full p-6 md:p-8">
          {/* Top Section - Fixed content */}
          <div className="flex-none space-y-6">
            {/* Header Section */}
            <div className="flex items-start gap-4 md:gap-6">
              {/* Icon Container */}
              <div className="relative flex-shrink-0">
                {/* Outer glow ring */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br from-zinc-600/40 via-zinc-500/30 to-zinc-600/40 rounded-2xl blur-xl transition-all duration-500 ${
                    isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
                  }`}
                  aria-hidden="true"
                />
                
                {/* Icon circle */}
                <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 flex items-center justify-center transition-all duration-500 ${
                  isHovered ? 'border-zinc-600 scale-105 rotate-3' : 'border-zinc-700/50 scale-100 rotate-0'
                }`}>
                  <div className="w-10 h-10 md:w-12 md:h-12">
                    {iconSrc && (
                      <img
                        alt=""
                        className="w-full h-full object-contain"
                        src={iconSrc}
                        loading="lazy"
                      />
                    )}
                  </div>
                  
                  {/* Step number overlay */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-white to-zinc-300 border-2 border-zinc-900 flex items-center justify-center shadow-lg">
                    <span className="text-xs font-bold text-black">{number}</span>
                  </div>
                </div>
              </div>

              {/* Title and Duration */}
              <div className="flex-1 min-w-0">
                <h3 className={`text-xl md:text-2xl font-bold text-white mb-2 leading-tight transition-colors ${
                  isHovered ? 'text-zinc-100' : 'text-white'
                }`}>
                  {title}
                </h3>
                
                {/* Duration badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-full">
                  <Clock className="w-3 h-3 text-zinc-400" />
                  <span className="text-xs text-zinc-400 font-medium">{duration}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
              {description}
            </p>

            {/* Key Highlights - Always visible, fixed height */}
            <div className="space-y-2 min-h-[84px]">
              {highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 group/item">
                  <CheckCircle2 className="w-4 h-4 text-zinc-600 group-hover/item:text-zinc-400 flex-shrink-0 mt-0.5 transition-colors" />
                  <span className="text-xs md:text-sm text-zinc-500 group-hover/item:text-zinc-300 transition-colors">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expandable Section - Grows dynamically */}
          <div className="flex-none">
            {/* Deliverables Section - always visible */}
            {deliverables.length > 0 && (
              <div className="pt-4 border-t border-zinc-800/50 mt-6">
                <h4 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  What You'll Get
                </h4>
                <ul className="space-y-2">
                  {deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                      <span className="text-zinc-600 flex-shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Button Section - Pushed to bottom with flex-grow spacer */}
          <div className="flex-grow" />
          
          {/* Expand button removed; deliverables are always visible */}
        </div>

        {/* Progress indicator on left edge */}
        <div 
          className={`absolute left-0 top-0 w-1 bg-gradient-to-b from-zinc-600 via-zinc-500 to-zinc-600 transition-all duration-500 ${
            isHovered ? 'h-full opacity-100' : 'h-0 opacity-0'
          }`}
          aria-hidden="true"
        />
      </div>

      {/* Mobile Connector */}
      {!isLast && (
        <div className="lg:hidden my-6 flex justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-1 h-8 bg-zinc-800/50 rounded-full" />
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-zinc-600" aria-hidden="true" />
            </div>
            <div className="w-1 h-8 bg-zinc-800/50 rounded-full" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function HowWeWorkSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });

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
      deliverables: [
        'Project requirements document',
        'Initial feasibility analysis',
        'Stakeholder interview notes',
        'Technical constraints overview',
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
      deliverables: [
        'Comprehensive project proposal',
        'Wireframes and mockups',
        'Technical architecture diagram',
        'Cost breakdown and timeline',
        'Milestone schedule',
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
      deliverables: [
        'Fully functional product',
        'Source code and documentation',
        'User training materials',
        'Post-launch support plan',
        'Performance optimization report',
      ],
    },
  ];

  const processFeatures = [
    {
      icon: MessageCircle,
      title: 'Clear Communication',
      description: 'Regular updates and transparent dialogue throughout the project',
    },
    {
      icon: Zap,
      title: 'Agile & Flexible',
      description: 'Adapt to changing requirements without derailing timelines',
    },
    {
      icon: Users,
      title: 'Collaborative Approach',
      description: 'Your input shapes the solution at every milestone',
    },
    {
      icon: Rocket,
      title: 'On-Time Delivery',
      description: 'Committed to meeting deadlines without compromising quality',
    },
  ];

  return (
    <section
      ref={ref}
      id="process"
      className="relative py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
      aria-labelledby="process-heading"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-transparent to-transparent" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16 lg:mb-20 space-y-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <motion.div variants={fadeInUpVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-zinc-400" />
            <span className="text-sm text-zinc-400 font-medium uppercase tracking-wide">
              Our Process
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUpVariants}
            id="process-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent leading-tight tracking-tight"
          >
            How We Work
          </motion.h2>

          <motion.p variants={fadeInUpVariants} className="text-zinc-400 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            A proven 3-step process that transforms your ideas into reality with transparency and precision
          </motion.p>

          <motion.div variants={fadeInUpVariants} className="flex justify-center pt-4">
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Work Steps Grid - Items stretch to equal height */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 lg:items-stretch"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
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
                deliverables={step.deliverables}
                index={index}
                isLast={index === steps.length - 1}
              />
            ))}
          </motion.div>
        </div>

        {/* Process Features Grid */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Why Our Process Works
            </h3>
            <p className="text-zinc-400 text-base max-w-2xl mx-auto">
              Built on years of experience and refined through tens of successful projects
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {processFeatures.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-xl hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-zinc-800/50 border border-zinc-700 flex items-center justify-center mb-4 group-hover:bg-zinc-800 group-hover:border-zinc-600 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                </div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2 group-hover:text-zinc-100 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-zinc-400 text-base md:text-lg">
              Ready to start your project? Let's discuss how we can help bring your vision to life.
            </p>
            <p className="text-sm text-zinc-500">
              Book a free consultation call to explore how our process can work for you
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" aria-hidden="true" />
              
              <span className="relative flex items-center gap-2">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a
              href="#work"
              className="px-8 py-4 bg-transparent border-2 border-zinc-700 hover:border-zinc-600 text-white rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:bg-zinc-900/30"
            >
              View Case Studies
            </a>
          </div>

        
        </div>
      </div>
    </section>
  );
}
