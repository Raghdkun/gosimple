'use client';

import { Images } from '@/constants/Images';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { ArrowUp, Mail, Phone, Send, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your newsletter submission logic here
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    'Website Development',
    'App Development',
    'SaaS Platforms',
    'Automation & AI Assistants',
    'Data Analytics & Insights',
    'Custom System Development',
  ];

  // socialLinks removed - keep only direct contact methods

  return (
    <footer className="relative bg-black px-4 sm:px-6 md:px-12 lg:px-20 pt-16 md:pt-20 lg:pt-24 pb-8" role="contentinfo">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black pointer-events-none" />
      
      {/* Main Footer Content */}
      <div className="relative max-w-[1920px] mx-auto">
        {/* Top Section with Newsletter */}
        <div className="mb-16 md:mb-20 pb-12 md:pb-16 border-b border-zinc-800/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Newsletter (keeps first column occupied) */}
            <div className="space-y-6">
              {/* ...existing code... */}
            </div>

         
          </div>
        </div>

        {/* Main Links Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-12 md:mb-16">
          {/* Services */}
          <div className="space-y-5">
            <h4 className="text-zinc-400 uppercase text-xs md:text-sm font-semibold tracking-wider mb-6">
              Services
            </h4>
            <ul className="space-y-3.5">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className="group text-zinc-300 text-sm md:text-base hover:text-white transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-white group-hover:w-4 transition-all duration-300" />
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h4 className="text-zinc-400 uppercase text-xs md:text-sm font-semibold tracking-wider mb-6">
              Company
            </h4>
            <ul className="space-y-3.5">
              {['About Us', 'Our Work', 'Our Team', 'Careers', 'Blog'].map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group text-zinc-300 text-sm md:text-base hover:text-white transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-white group-hover:w-4 transition-all duration-300" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources column removed per request */}

          {/* Contact Info */}
          <div className="space-y-5">
            <h4 className="text-zinc-400 uppercase text-xs md:text-sm font-semibold tracking-wider mb-6">
              Contact Us
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+963998150256"
                className="group flex items-start gap-3 text-zinc-300 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-900/50 border border-zinc-800 group-hover:border-zinc-700 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Call</p>
                  <p className="text-sm md:text-base">+963 998 150 256</p>
                </div>
              </a>

              <a
                href="https://wa.me/963998150256"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-zinc-300 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-900/50 border border-zinc-800 group-hover:border-zinc-700 flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">WhatsApp</p>
                  <p className="text-sm md:text-base">+963 998 150 256</p>
                </div>
              </a>

              <a
                href="mailto:Contact@gosimple.com"
                className="group flex items-start gap-3 text-zinc-300 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-900/50 border border-zinc-800 group-hover:border-zinc-700 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Email</p>
                  <p className="text-sm md:text-base break-all">Contact@gosimple.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left: Branding + Copyright (desktop) */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1"
                aria-label="GoSimple Home"
              >
                <div className="relative w-[44px] h-[44px] md:w-[48px] md:h-[48px] lg:w-[52px] lg:h-[52px] shrink-0">
                  <img src={Images.logoWhite} alt="GoSimple Logo" className="w-full h-full object-contain" />
                </div>
              </a>

              <p className="text-zinc-500 text-xs sm:text-sm hidden md:block">
                © 2025 GoSimple. All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="#privacy"
                className="text-zinc-500 hover:text-zinc-300 text-xs sm:text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-zinc-700">•</span>
              <a
                href="#terms"
                className="text-zinc-500 hover:text-zinc-300 text-xs sm:text-sm transition-colors"
              >
                Terms of Service
              </a>
              <span className="text-zinc-700">•</span>
              <a
                href="#cookies"
                className="text-zinc-500 hover:text-zinc-300 text-xs sm:text-sm transition-colors"
              >
                Cookie Policy
              </a>
            </div>

            {/* Right: Back to Top + copyright for mobile */}
            <div className="flex items-center gap-4">
              <p className="text-zinc-500 text-xs sm:text-sm text-center md:hidden">
                © 2025 GoSimple. All rights reserved.
              </p>
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 px-4 py-2 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-zinc-900/50"
                aria-label="Back to top"
              >
                <span className="text-zinc-400 group-hover:text-white text-xs sm:text-sm font-medium transition-colors">
                  Back to Top
                </span>
                <ArrowUp className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:-translate-y-0.5 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </footer>
  );
}
