'use client';

import { Images } from '@/constants/Images';
import { useRef } from 'react';
import { ArrowUp, Mail, Phone } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ onNavigate }: { onNavigate?: (href: string) => void } = {}) {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const decorativeLineRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useGSAP(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(logoRef.current, { opacity: 0, y: 30 });
      gsap.set(servicesRef.current, { opacity: 0, y: 40 });
      gsap.set(contactRef.current, { opacity: 0, y: 40 });
      gsap.set(bottomRef.current, { opacity: 0, y: 20 });
      gsap.set(decorativeLineRef.current, { scaleX: 0 });

      // Animate service items
      const serviceItems = servicesRef.current?.querySelectorAll('.service-item');
      if (serviceItems) {
        gsap.set(serviceItems, { opacity: 0, x: -20 });
      }

      // Animate contact items
      const contactItems = contactRef.current?.querySelectorAll('.contact-item');
      if (contactItems) {
        gsap.set(contactItems, { opacity: 0, x: 20 });
      }

      // Create scroll-triggered timeline - faster start
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        }
      });

      // Decorative line animation - faster
      tl.to(decorativeLineRef.current, {
        scaleX: 1,
        duration: 0.5,
        ease: "power3.inOut"
      });

      // Logo reveal with bounce - faster
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.5)"
      }, "-=0.3");

      // Services section reveal - faster
      tl.to(servicesRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power3.out"
      }, "-=0.2");

      // Service items stagger - faster
      if (serviceItems) {
        tl.to(serviceItems, {
          opacity: 1,
          x: 0,
          duration: 0.2,
          stagger: 0.04,
          ease: "power2.out"
        }, "-=0.15");
      }

      // Contact section reveal - faster
      tl.to(contactRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power3.out"
      }, "-=0.3");

      // Contact items stagger - faster
      if (contactItems) {
        tl.to(contactItems, {
          opacity: 1,
          x: 0,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.out"
        }, "-=0.15");
      }

      // Bottom bar reveal - faster
      tl.to(bottomRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: "power2.out"
      }, "-=0.1");

    }, footerRef);

    return () => ctx.revert();
  }, { scope: footerRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFooterNav = (href: string) => {
    try {
      const isHome = window.location.pathname === '/';
      if (onNavigate && !isHome) {
        onNavigate(href);
        return;
      }
    } catch (e) {
      // ignore
    }

    const el = document.querySelector(href);
    if (el) {
      const offset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const services = [
    'Website Development',
    'App Development',
    'SaaS Platforms',
    'Automation & AI',
    'Data Analytics',
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative bg-black px-4 sm:px-6 md:px-12 lg:px-20 pt-16 md:pt-20 lg:pt-24 pb-8 overflow-hidden" 
      role="contentinfo"
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black pointer-events-none" />
      
      {/* Decorative Animated Line */}
      <div 
        ref={decorativeLineRef}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent origin-center"
      />
      
      {/* Main Footer Content */}
      <div className="relative max-w-[1920px] mx-auto">
        
        {/* Main Links Grid - 2 Columns: Services & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 mb-16 md:mb-20">
          
          {/* Services */}
          <div ref={servicesRef} className="space-y-6">
            <h4 className="text-zinc-400 uppercase text-xs md:text-sm font-semibold tracking-wider">
              Services
            </h4>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index} className="service-item">
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFooterNav('#services');
                    }}
                    className="group text-zinc-300 text-sm sm:text-base hover:text-white transition-all duration-300 flex items-center gap-3"
                  >
                    <span className="w-0 h-px bg-white group-hover:w-6 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div ref={contactRef} className="space-y-6">
            <h4 className="text-zinc-400 uppercase text-xs md:text-sm font-semibold tracking-wider">
              Get In Touch
            </h4>
            <div className="space-y-5">
              <a
                href="tel:+963998150256"
                className="contact-item group flex items-center gap-4 text-zinc-300 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-zinc-800 group-hover:border-zinc-600 group-hover:bg-zinc-800/50 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Phone</p>
                  <p className="text-sm sm:text-base font-medium">+963 998 150 256</p>
                </div>
              </a>

              <a
                href="https://wa.me/963998150256"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item group flex items-center gap-4 text-zinc-300 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-zinc-800 group-hover:border-zinc-600 group-hover:bg-zinc-800/50 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">WhatsApp</p>
                  <p className="text-sm sm:text-base font-medium">+963 998 150 256</p>
                </div>
              </a>

              <a
                href="mailto:Contact@gosimple.com"
                className="contact-item group flex items-center gap-4 text-zinc-300 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-zinc-800 group-hover:border-zinc-600 group-hover:bg-zinc-800/50 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Email</p>
                  <p className="text-sm sm:text-base font-medium">Contact@gosimple.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div ref={bottomRef} className="pt-8 border-t border-zinc-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left: Branding */}
            <div ref={logoRef} className="flex items-center gap-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 group"
                aria-label="GoSimple Home"
              >
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <img src={Images.logoWhite} alt="GoSimple Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-white text-lg sm:text-xl font-light">GoSimple</span>
              </a>
              <span className="hidden md:block text-zinc-600 mx-4">|</span>
              <p className="text-zinc-500 text-xs sm:text-sm hidden md:block">
                © 2025 All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a
                href="#privacy"
                onClick={(e) => {
                  e.preventDefault();
                  handleFooterNav('#privacy');
                }}
                className="text-zinc-500 hover:text-zinc-300 text-xs sm:text-sm transition-colors"
              >
                Privacy
              </a>
              <span className="text-zinc-700 hidden sm:inline">•</span>
              <a
                href="#terms"
                onClick={(e) => {
                  e.preventDefault();
                  handleFooterNav('#terms');
                }}
                className="text-zinc-500 hover:text-zinc-300 text-xs sm:text-sm transition-colors"
              >
                Terms
              </a>
              <span className="text-zinc-700 hidden sm:inline">•</span>
              <a
                href="#cookies"
                onClick={(e) => {
                  e.preventDefault();
                  handleFooterNav('#cookies');
                }}
                className="text-zinc-500 hover:text-zinc-300 text-xs sm:text-sm transition-colors"
              >
                Cookies
              </a>
            </div>

            {/* Right: Back to Top */}
            <div className="flex items-center gap-4">
              <p className="text-zinc-500 text-xs text-center md:hidden">
                © 2025 GoSimple
              </p>
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 px-4 py-2.5 bg-zinc-900/50 hover:bg-white border border-zinc-800 hover:border-white rounded-full transition-all duration-500 hover:shadow-lg hover:shadow-white/10"
                aria-label="Back to top"
              >
                <span className="text-zinc-400 group-hover:text-black text-xs sm:text-sm font-medium transition-colors duration-300">
                  Top
                </span>
                <ArrowUp className="w-4 h-4 text-zinc-400 group-hover:text-black group-hover:-translate-y-0.5 transition-all duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </footer>
  );
}
