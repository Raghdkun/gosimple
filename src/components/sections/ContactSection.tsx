'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUpVariants, staggerContainerVariants, scaleInVariants } from '@/hooks/use-scroll-animation';
import { 
  Mail, Phone, Send, CheckCircle2, Loader2, 
  Globe, Smartphone, Database, Zap, 
  TrendingUp, Code, User, MessageSquare
} from 'lucide-react';

interface ServiceOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const serviceOptions: ServiceOption[] = [
  { id: 'website', name: 'Website Development', icon: <Globe className="w-5 h-5" /> },
  { id: 'app', name: 'App Development', icon: <Smartphone className="w-5 h-5" /> },
  { id: 'saas', name: 'SaaS Platform', icon: <Database className="w-5 h-5" /> },
  { id: 'automation', name: 'Automation & AI', icon: <Zap className="w-5 h-5" /> },
  { id: 'analytics', name: 'Data Analytics', icon: <TrendingUp className="w-5 h-5" /> },
  { id: 'custom', name: 'Custom System', icon: <Code className="w-5 h-5" /> },
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
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({ ...prev, service: serviceId }));
  };

  // file upload removed per request

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

  // contact cards removed per request (Email Us / Call Us)

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-black overflow-hidden"
      aria-label="Contact Us"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 pointer-events-none" />

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <motion.div
            variants={fadeInUpVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full mb-6"
          >
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-zinc-400">Let's Talk</span>
          </motion.div>

          <motion.h2
            variants={fadeInUpVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-6 tracking-tight leading-tight"
          >
            Start Your Project
          </motion.h2>

          <motion.p
            variants={fadeInUpVariants}
            className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            Tell us about your vision, and let's build something amazing together.
          </motion.p>
        </motion.div>

  <div className="max-w-3xl mx-auto px-4">
          {/* Contact Form */}
          <motion.div
            variants={scaleInVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-2 lg:order-1"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">
                  What service do you need? *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {serviceOptions.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceSelect(service.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl border transition-all duration-300 ${
                        formData.service === service.id
                          ? 'bg-white text-black border-white'
                          : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                      }`}
                    >
                      {service.icon}
                      <span className="text-sm font-medium">{service.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:bg-zinc-900 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Details Grid */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:bg-zinc-900 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:bg-zinc-900 transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Budget & Timeline removed per request */}

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:bg-zinc-900 transition-all duration-300 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* File upload removed per request */}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
