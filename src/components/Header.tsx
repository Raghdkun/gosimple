'use client';

import { Images } from '@/constants/Images';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header({ onNavigate }: { onNavigate?: (href: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(Math.max(0, Math.min(100, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(Math.max(0, Math.min(100, progress)));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

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
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    try {
      const isHome = window.location.pathname === '/';
      if (onNavigate && !isHome) {
        onNavigate(href);
        return;
      }
    } catch (e) {}

    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[72px]" role="banner">
        <div className="px-2 sm:px-4 md:px-8 max-w-[1920px] mx-auto">
          <div
            className={`mt-2 h-[70px] relative flex items-center justify-between bg-black/95 border border-zinc-700 rounded-full px-3 sm:px-6 md:px-8 max-w-[1100px] mx-auto`}
          >
            <a
              href="#"
              className="flex items-center gap-2 shrink-0"
              aria-label="GoSimple Home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-[36px] h-[36px] md:w-[40px] md:h-[40px]">
                <img src={Images.logoWhite} alt="GoSimple Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-white text-lg md:text-xl font-light">GoSimple</span>
            </a>

            <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
              <ul className="flex items-center gap-14">
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
                        className={`text-base font-medium ${
                          isActive ? 'text-white' : 'text-white/90 hover:text-white'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden lg:flex">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-zinc-200 text-black hover:bg-zinc-300 px-5 h-9 border-transparent"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
              >
                Contact Us
              </Button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900/60 border border-zinc-700 hover:bg-zinc-800/60 transition-all"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        id="mobile-menu"
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} aria-hidden="true" />
        <nav
          className={`relative h-full flex flex-col justify-center items-center transition-all duration-500 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          aria-label="Mobile navigation"
        >
          <ul className="space-y-3 text-center">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <li key={index} className="opacity-100">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`block px-8 py-3 text-xl font-medium rounded-full ${
                      isActive ? 'text-white bg-zinc-800/50' : 'text-zinc-300 hover:text-white hover:bg-zinc-800/30'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-8">
            <Button
              variant="outline"
              className="rounded-full bg-zinc-200 text-black hover:bg-zinc-300 px-8 h-12 border-transparent"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
            >
              Contact Us
            </Button>
          </div>
        </nav>
      </div>

      <div className="fixed top-[72px] left-0 right-0 h-0 bg-transparent z-40">
        <div className="h-0" style={{ width: `${scrollProgress}%` }} />
      </div>
    </>
  );
}
