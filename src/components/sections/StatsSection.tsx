'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useScrollAnimation, fadeInUpVariants, staggerContainerVariants, scaleInVariants } from '@/hooks/use-scroll-animation';
import { TrendingUp, Users, Briefcase, Award, Clock, Zap, Target, Heart } from 'lucide-react';

interface Stat {
  id: number;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const stats: Stat[] = [
  {
    id: 1,
    value: 150,
    suffix: '+',
    label: 'Projects Completed',
    description: 'Successfully delivered across various industries',
    icon: <Briefcase className="w-full h-full" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    value: 85,
    suffix: '+',
    label: 'Happy Clients',
    description: 'Building lasting relationships worldwide',
    icon: <Users className="w-full h-full" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    value: 99,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Consistently exceeding expectations',
    icon: <Heart className="w-full h-full" />,
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 4,
    value: 7,
    suffix: '+',
    label: 'Years Experience',
    description: 'Industry expertise and innovation',
    icon: <Award className="w-full h-full" />,
    color: 'from-yellow-500 to-amber-500'
  },
  {
    id: 5,
    value: 24,
    suffix: '/7',
    label: 'Support Available',
    description: 'Always here when you need us',
    icon: <Clock className="w-full h-full" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 6,
    value: 95,
    suffix: '%',
    label: 'On-Time Delivery',
    description: 'Meeting deadlines consistently',
    icon: <Target className="w-full h-full" />,
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 7,
    value: 40,
    suffix: '%',
    label: 'Faster Time-to-Market',
    description: 'Accelerating your business growth',
    icon: <Zap className="w-full h-full" />,
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    id: 8,
    value: 200,
    suffix: '%',
    label: 'Average ROI',
    description: 'Maximizing your investment value',
    icon: <TrendingUp className="w-full h-full" />,
    color: 'from-green-400 to-green-600'
  }
];

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  duration?: number;
}

function AnimatedCounter({ value, suffix, duration = 2 }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
}

interface StatCardProps {
  stat: Stat;
  index: number;
}

function StatCard({ stat, index }: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={scaleInVariants}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/50">
        {/* Gradient Glow Effect */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
          aria-hidden="true"
        />

        {/* Top Corner Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-zinc-700/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          {/* Icon with Glow */}
          <div className="relative">
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${stat.color} p-3 md:p-3.5 transition-all duration-500 ${
                isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
              }`}
            >
              <div className="text-white">{stat.icon}</div>
            </div>
            
            {/* Icon Glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${stat.color} blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10`}
              aria-hidden="true"
            />
          </div>

          {/* Number */}
          <div className="space-y-2">
            <div className="text-5xl md:text-6xl font-bold text-white leading-none">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
          </div>

          {/* Label */}
          <h3 className="text-lg md:text-xl font-semibold text-white">
            {stat.label}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
            {stat.description}
          </p>
        </div>

        {/* Bottom Border Accent */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-black overflow-hidden"
      aria-label="Company Statistics"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />

      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 lg:mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <motion.div
            variants={fadeInUpVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full mb-6"
          >
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-zinc-400">Our Impact in Numbers</span>
          </motion.div>

          <motion.h2
            variants={fadeInUpVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-6 tracking-tight leading-tight"
          >
            Results That Speak
          </motion.h2>

          <motion.p
            variants={fadeInUpVariants}
            className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            Numbers tell the story of our commitment to excellence and the value we bring to every project.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-zinc-400 text-base md:text-lg mb-6">
            Ready to be part of these success stories?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all duration-300 hover:scale-105"
          >
            Start Your Project
            <TrendingUp className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
