"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Sparkles, ArrowRight } from 'lucide-react';
import { ServiceDetail } from '@/constants/servicesData';
import { fadeInUpVariants, staggerContainerVariants, scaleInVariants } from '@/hooks/use-scroll-animation';

export default function ServiceDetailClient({ service }: { service: ServiceDetail }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black pointer-events-none" />
        
        <div className="relative max-w-[1920px] mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => router.push('/#services')}
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 md:mb-12"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Services</span>
          </motion.button>

          {/* Hero Content */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Icon & Badge */}
            <motion.div variants={fadeInUpVariants} className="flex items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
                <img src={service.icon} alt="" className="w-full h-full object-contain" />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-zinc-400" />
                <span className="text-sm text-zinc-400 font-medium uppercase tracking-wide">
                  {service.shortTitle}
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUpVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent leading-tight tracking-tight"
            >
              {service.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUpVariants}
              className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-4xl leading-relaxed"
            >
              {service.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/#contact');
                }}
                className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:scale-105 overflow-hidden inline-flex items-center justify-center gap-2"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative">Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#features"
                className="px-8 py-4 bg-transparent border-2 border-zinc-700 hover:border-zinc-600 text-white rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:bg-zinc-900/30 inline-flex items-center justify-center"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Overview
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
              {service.overview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Key Features
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
              Everything you need to succeed, built right in
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleInVariants}
                className="group relative border border-zinc-800 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-zinc-900/30 to-black/50 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/50"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-zinc-700/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Why Choose This Service
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
              Transform your business with proven results
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
          >
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className="flex gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-black/30 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Our Process
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
              A proven approach to deliver exceptional results
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-6 md:space-y-8"
          >
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className="relative flex gap-6 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-black/30 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-white font-bold text-xl md:text-2xl">
                  {step.step}
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
              Everything you need to know about {service.title}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-4 md:space-y-6"
          >
            {service.faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-zinc-900/50 to-black/30 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-8 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {service.cta.title}
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
              {service.cta.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/#contact');
                }}
                className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:scale-105 overflow-hidden inline-flex items-center justify-center gap-2"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative">Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => router.push('/#services')}
                className="px-8 py-4 bg-transparent border-2 border-zinc-700 hover:border-zinc-600 text-white rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:bg-zinc-900/30"
              >
                View All Services
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
