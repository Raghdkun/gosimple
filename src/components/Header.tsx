'use client';

import { Images } from '@/constants/Images';
import { useState, useEffect } from 'react';
import { Menu, X, Github, Mail, BookOpen } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['services', 'work', 'process', 'faq', 'team'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      setActiveSection(current || '');
      // Update scroll progress
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(Math.max(0, Math.min(100, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    // run once to initialize
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // also update on resize (so total height recalculates)
  useEffect(() => {
    const handleResize = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(Math.max(0, Math.min(100, progress)));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: '#services', label: 'Our Services' },
    { href: '#work', label: 'Our Work' },
    { href: '#process', label: 'How We Work' },
    { href: '#faq', label: 'FAQs' },
    // { href: '#team', label: 'Our Team' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    // Smooth scroll with offset for fixed header
    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 h-[80px] ${
          isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-zinc-800/50 shadow-black/50' : 'bg-black/80 backdrop-blur-sm'
        }`}
        role="banner"
      >
        <div className="h-full px-4 sm:px-6 md:px-12 lg:px-20 flex items-center justify-between max-w-[1920px] mx-auto">
          {/* Brand (logo and text) aligned to left */}
          <a
            href="#"
            className="relative group z-50 flex items-center gap-2"
            aria-label="GoSimple Home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative w-[44px] h-[44px] md:w-[48px] md:h-[48px] lg:w-[52px] lg:h-[52px] shrink-0">
              <img
                src={Images.logoWhite}
                alt="GoSimple Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Text right next to logo */}
            <span className="font-bold text-white text-lg md:text-xl lg:text-2xl whitespace-nowrap">
              GoSimple
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav 
            className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2"
            aria-label="Main navigation"
          >
            <ul className="flex items-center gap-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <li key={index}>
                    <a 
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`relative px-5 py-2 text-base font-medium transition-all duration-300 group ${
                        isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {/* Hover background */}
                      <span className="absolute inset-0 bg-zinc-800/0 group-hover:bg-zinc-800/50 rounded-lg transition-all duration-300" />
                      
                      {/* Text */}
                      <span className="relative font-bold">{item.label}</span>
                      
                      {/* Active indicator */}
                      <span 
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-300 ${
                          isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-50'
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop Links (icons) + CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Useful links: GitHub, Blog, Contact (icon buttons) */}
            {/* <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-10 h-10 flex items-center justify-center rounded-md bg-transparent border border-transparent hover:bg-zinc-900/50 transition-colors duration-200"
                aria-label="Go to GitHub repository (opens in new tab)"
                title="GitHub"
              >
                <Github className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />
              </a>

              <a
                href="/blog"
                className="group relative w-10 h-10 flex items-center justify-center rounded-md bg-transparent border border-transparent hover:bg-zinc-900/50 transition-colors duration-200"
                aria-label="Read our blog"
                title="Blog"
                onClick={(e) => {
                  // Let Next.js handle internal nav; but close mobile menu if any
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  // Smooth client navigation to /blog
                  window.location.href = '/blog';
                }}
              >
                <BookOpen className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="group relative w-10 h-10 flex items-center justify-center rounded-md bg-transparent border border-transparent hover:bg-zinc-900/50 transition-colors duration-200"
                aria-label="Contact us"
                title="Contact"
              >
                <Mail className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />
              </a>
            </div> */}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="group relative px-6 py-2.5 bg-gradient-to-r from-zinc-800 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 text-white font-medium rounded-lg transition-all duration-300 overflow-hidden border border-zinc-600 hover:border-zinc-500 hover:shadow-lg hover:shadow-zinc-900/50"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              
              <span className="relative">Get Started</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-900/50 border border-zinc-700 hover:bg-zinc-800/50 hover:border-zinc-600 transition-all duration-300"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        id="mobile-menu"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
        
        {/* Menu Content */}
        <nav 
          className={`relative h-full flex flex-col justify-center items-center transition-all duration-500 delay-100 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          aria-label="Mobile navigation"
        >
          <ul className="space-y-2 text-center">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <li 
                  key={index}
                  className={`transition-all duration-500 ${
                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`block px-8 py-4 text-2xl font-medium transition-all duration-300 rounded-lg ${
                      isActive 
                        ? 'text-white bg-zinc-800/50' 
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile CTA */}
          <div 
            className={`mt-12 transition-all duration-500 ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="inline-block px-10 py-4 bg-gradient-to-r from-zinc-800 to-zinc-700 text-white text-lg font-medium rounded-lg border border-zinc-600 hover:from-zinc-700 hover:to-zinc-600 hover:border-zinc-500 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-900/50"
            >
              Get Started
            </a>
          </div>

          {/* Social / Useful Links (Mobile) */}
          {/* <div 
            className={`mt-16 flex gap-6 transition-all duration-500 ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-md flex items-center justify-center bg-zinc-900/30 border border-zinc-800 hover:bg-zinc-900/50 transition-colors"
              aria-label="GitHub (opens in new tab)"
            >
              <Github className="w-5 h-5 text-zinc-200" />
            </a>

            <a
              href="/blog"
              className="w-12 h-12 rounded-md flex items-center justify-center bg-zinc-900/30 border border-zinc-800 hover:bg-zinc-900/50 transition-colors"
              aria-label="Blog"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                window.location.href = '/blog';
              }}
            >
              <BookOpen className="w-5 h-5 text-zinc-200" />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                handleNavClick('#contact');
              }}
              className="w-12 h-12 rounded-md flex items-center justify-center bg-zinc-900/30 border border-zinc-800 hover:bg-zinc-900/50 transition-colors"
              aria-label="Contact"
            >
              <Mail className="w-5 h-5 text-zinc-200" />
            </a>
          </div> */}
        </nav>
      </div>

      {/* Scroll Progress Indicator (client-only width via state) */}
      <div className="fixed top-[80px] left-0 right-0 h-0.5 bg-zinc-900 z-40">
        <div 
          className="h-full bg-gradient-to-r from-zinc-600 via-zinc-400 to-zinc-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </>
  );
}
