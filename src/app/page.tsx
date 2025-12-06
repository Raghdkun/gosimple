 'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IntroSection from '@/components/sections/IntroSection';
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
  const [showIntro, setShowIntro] = useState(true);

  // On-mount, if there's a hash in the URL (e.g. /#services), skip intro and scroll to it
  React.useEffect(() => {
    try {
      const hash = window.location.hash;
      if (hash) {
        setShowIntro(false);
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            const offset = 100;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 100);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {/* Intro Section - Fixed overlay */}
      {showIntro && (
        <IntroSection onComplete={handleIntroComplete} />
      )}

      {/* Main Content */}
      <motion.main 
        className="min-h-screen bg-black text-white overflow-hidden"
        initial={{ opacity: showIntro ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: showIntro ? 0 : 0 }}
      >
        <Header isVisible={!showIntro} />
        <HeroSection isIntroComplete={!showIntro} />
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
    </>
  );
}
