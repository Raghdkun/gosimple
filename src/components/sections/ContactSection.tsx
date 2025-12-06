'use client';

import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, Phone, Send, CheckCircle2, Loader2, 
  Globe, Smartphone, Database, Zap, 
  TrendingUp, Code, User, MessageSquare
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const serviceOptions: ServiceOption[] = [
  { id: 'website', name: 'Website Development', icon: <Globe className="w-full h-full" /> },
  { id: 'app', name: 'App Development', icon: <Smartphone className="w-full h-full" /> },
  { id: 'saas', name: 'SaaS Platform', icon: <Database className="w-full h-full" /> },
  { id: 'automation', name: 'Automation & AI', icon: <Zap className="w-full h-full" /> },
  { id: 'analytics', name: 'Data Analytics', icon: <TrendingUp className="w-full h-full" /> },
  { id: 'custom', name: 'Custom System', icon: <Code className="w-full h-full" /> },
];

// budgetRanges removed per request

interface FormData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // GSAP Animations
  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(headerRef.current, { opacity: 0, y: 40 });
      gsap.set(videoContainerRef.current, { opacity: 0, x: -60, scale: 0.95 });
      gsap.set(formContainerRef.current, { opacity: 0, x: 60 });

      // Form elements
      const formElements = formContainerRef.current?.querySelectorAll('.form-element');
      if (formElements) {
        gsap.set(formElements, { opacity: 0, y: 30 });
      }

      // Service buttons
      const serviceButtons = formContainerRef.current?.querySelectorAll('.service-btn');
      if (serviceButtons) {
        gsap.set(serviceButtons, { opacity: 0, scale: 0.8 });
      }

      // Create scroll-triggered timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none reverse",
        }
      });

      // Header reveal
      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      });

      // Video container slides in from left
      tl.to(videoContainerRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.3");

      // Form container slides in from right
      tl.to(formContainerRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.5");

      // Service buttons pop in
      if (serviceButtons) {
        tl.to(serviceButtons, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "back.out(1.5)"
        }, "-=0.3");
      }

      // Form elements stagger in
      if (formElements) {
        tl.to(formElements, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out"
        }, "-=0.2");
      }

    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({ ...prev, service: serviceId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-black overflow-hidden"
      aria-label="Contact Us"
    >
      {/* Background Gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 pointer-events-none" /> */}

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-transparent border border-zinc-800 rounded-full mb-3 sm:mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-[10px] sm:text-xs font-medium text-zinc-400">Let&apos;s Talk</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-2 sm:mb-3 tracking-tight leading-tight">
            Start Your Project
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Tell us about your vision, and let&apos;s build something amazing together.
          </p>
        </div>

        {/* Main Content Grid - Video Left, Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-stretch px-2 sm:px-4 md:px-6 lg:px-8">
          
          {/* Left Side - Video */}
          <div 
            ref={videoContainerRef}
            className="relative  order-2 lg:order-1 flex items-center justify-center"
          >
            <div className="relative bg-white w-full aspect-video lg:aspect-auto lg:h-full lg:min-h-[450px] rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800">
              {/* Video Element */}
              <video
                ref={videoRef}
                className="w-full h-full object-contain lg:object-cover"
                loop
                muted
                playsInline
                autoPlay
              >
                <source src="/contact.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

              {/* Decorative Corner Elements */}
              <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-white/20 rounded-tl-md" />
              <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-white/20 rounded-tr-md" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-white/20 rounded-bl-md" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-white/20 rounded-br-md" />
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div 
            ref={formContainerRef}
            className="order-1 lg:order-2"
          >
            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3 md:space-y-4 border border-zinc-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5">
              {/* Service Selection */}
              <div className="form-element">
                <label className="block text-[10px] sm:text-xs font-medium text-zinc-300 mb-1.5 sm:mb-2">
                  What service do you need? *
                </label>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  {serviceOptions.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceSelect(service.id)}
                      className={`service-btn flex items-center justify-start gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-md sm:rounded-lg border transition-all duration-300 ${
                        formData.service === service.id
                          ? 'bg-white text-black border-white'
                          : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      <span className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">{service.icon}</span>
                      <span className="text-[10px] sm:text-xs font-medium text-left leading-tight">{service.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name Input */}
              <div className="form-element">
                <label htmlFor="name" className="block text-[10px] sm:text-xs font-medium text-zinc-300 mb-1 sm:mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 bg-transparent border border-zinc-800 rounded-md sm:rounded-lg text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div className="form-element">
                  <label htmlFor="email" className="block text-[10px] sm:text-xs font-medium text-zinc-300 mb-1 sm:mb-1.5">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 bg-transparent border border-zinc-800 rounded-md sm:rounded-lg text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="form-element">
                  <label htmlFor="phone" className="block text-[10px] sm:text-xs font-medium text-zinc-300 mb-1 sm:mb-1.5">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 bg-transparent border border-zinc-800 rounded-md sm:rounded-lg text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="form-element">
                <label htmlFor="message" className="block text-[10px] sm:text-xs font-medium text-zinc-300 mb-1 sm:mb-1.5">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 bg-transparent border border-zinc-800 rounded-md sm:rounded-lg text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <div className="form-element pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-black text-xs sm:text-sm font-semibold rounded-md sm:rounded-lg hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
