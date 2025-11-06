"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ServiceDetail } from '@/constants/servicesData';

export default function ServiceDetailClient({ service }: { service: ServiceDetail }) {
  const router = useRouter();
  
  // When header/footer links are clicked while on this detail page, navigate to home with the hash
  const navigateToHomeWithHash = (href: string) => {
    const target = href.startsWith('#') ? href : `#${href}`;
    router.push(`/${target}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onNavigate={navigateToHomeWithHash} />
      
      {/* Article Container */}
      <article className="relative pt-32 pb-16 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => router.push('/#services')}
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Services</span>
          </motion.button>

          {/* Article Header */}
          <motion.header 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 space-y-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <img src={service.icon} alt="" className="w-16 h-16 object-contain" />
              <span className="px-3 py-1 text-xs text-zinc-400 uppercase tracking-wider bg-zinc-900/50 border border-zinc-800 rounded-full">
                {service.shortTitle}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {service.title}
            </h1>
            
            <p className="text-xl text-zinc-400 leading-relaxed">
              {service.description}
            </p>
          </motion.header>

          {/* Article Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Overview</h2>
              <p className="text-zinc-300 leading-relaxed">{service.overview}</p>
            </section>

            {/* Key Features */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Key Features</h2>
              <div className="space-y-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="border-l-2 border-zinc-700 pl-6 py-2">
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-zinc-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Why Choose This Service</h2>
              <div className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-zinc-400">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Our Process</h2>
              <div className="space-y-6">
                {service.process.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                      <p className="text-zinc-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {service.faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-zinc-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-12 border-t border-zinc-800 text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">{service.cta.title}</h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">{service.cta.description}</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/#contact');
                }}
                className="group px-8 py-4 bg-white text-black rounded-full font-semibold transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => router.push('/#services')}
                className="px-8 py-4 border-2 border-zinc-700 hover:border-zinc-600 text-white rounded-full font-semibold transition-all"
              >
                View All Services
              </button>
            </div>
          </motion.div>
        </div>
      </article>

      <Footer onNavigate={navigateToHomeWithHash} />
    </div>
  );
}
