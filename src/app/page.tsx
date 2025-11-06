 'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import StatsSection from '@/components/sections/StatsSection';
import WorkSection from '@/components/sections/WorkSection';
import HowWeWorkSection from '@/components/sections/HowWeWorkSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import BlogPreview from '@/components/sections/BlogPreview';
import ContactSection from '@/components/sections/ContactSection';
import { motion } from 'framer-motion';

export default function Home() {
  // On-mount, if there's a hash in the URL (e.g. /#services), scroll to it with offset
  React.useEffect(() => {
    try {
      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          const offset = 100;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <motion.main 
      className="min-h-screen bg-black text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <HeroSection />
      <ServicesSection />
      {/* <StatsSection /> */}
      <WorkSection />
      <HowWeWorkSection />
      {/* <TestimonialsSection /> */}
      <FAQSection />
      {/* <BlogPreview /> */}
      <ContactSection />
      <Footer />
    </motion.main>
  );
}
