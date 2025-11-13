'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation, fadeInUpVariants, staggerContainerVariants, scaleInVariants } from '@/hooks/use-scroll-animation';
import { ChevronDown, Search, HelpCircle, Code, DollarSign, Clock, Shield } from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of digital services including website development, mobile app development, SaaS platforms, automation & AI assistants, data analytics & insights, and custom system development. Each service is tailored to meet your specific business needs and goals.",
    category: "General"
  },
  {
    id: 2,
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity and scope. A basic website might take 4-6 weeks, while a custom SaaS platform could take 3-6 months. We provide detailed timeline estimates during our initial consultation and keep you updated throughout the development process.",
    category: "Process"
  },
  // {
  //   id: 3,
  //   question: "What is your pricing structure?",
  //   answer: "Our pricing is project-based and depends on the scope, complexity, and specific requirements. We offer flexible payment plans and provide detailed quotes after understanding your needs. Typical projects range from $5,000 to $100,000+. We ensure transparent pricing with no hidden costs.",
  //   category: "Pricing"
  // },
  {
    id: 4,
    question: "Do you provide ongoing support after launch?",
    answer: "Yes! We offer comprehensive post-launch support including bug fixes, updates, and maintenance. We provide 30 days of free support after launch, and offer various ongoing support packages to ensure your solution continues to perform optimally.",
    category: "Support"
  },
  {
    id: 5,
    question: "What technologies do you work with?",
    answer: "We work with modern, industry-standard technologies including React, Next.js, Node.js, Python, TypeScript, AWS, and more. We choose the best tech stack based on your project requirements, scalability needs, and long-term goals.",
    category: "Technical"
  },
  {
    id: 6,
    question: "Can you help with an existing project?",
    answer: "Absolutely! We can audit, improve, or continue development on existing projects. Whether you need to fix issues, add features, or completely rebuild, we have experience taking over and enhancing existing codebases.",
    category: "General"
  },
  {
    id: 7,
    question: "How do you handle project communication?",
    answer: "We believe in transparent, regular communication. You'll have a dedicated project manager, weekly progress updates, and access to project management tools. We're available via email, phone, video calls, and use Slack or your preferred communication platform.",
    category: "Process"
  },
  {
    id: 8,
    question: "What's your payment schedule?",
    answer: "Typically, we require 30% upfront to begin work, 40% at the midpoint milestone, and 30% upon project completion. For larger projects, we can arrange monthly payment schedules. All payment terms are clearly outlined in our contract.",
    category: "Pricing"
  },
  {
    id: 9,
    question: "Do you sign NDAs?",
    answer: "Yes, we understand the importance of confidentiality. We're happy to sign NDAs and ensure all your proprietary information, business logic, and data remain completely secure throughout and after the project.",
    category: "Security"
  },
  {
    id: 10,
    question: "Can you scale my solution as my business grows?",
    answer: "Definitely! We build with scalability in mind from day one. Our solutions are designed to handle growth in users, data, and functionality. We can also provide ongoing development services to add features as your needs evolve.",
    category: "Technical"
  },
  {
    id: 11,
    question: "What if I'm not satisfied with the result?",
    answer: "Your satisfaction is our priority. We work in sprints with regular reviews, so you can provide feedback throughout development. If there are issues, we'll work diligently to resolve them. We offer revision rounds to ensure the final product meets your expectations.",
    category: "Process"
  },
  {
    id: 12,
    question: "Do you provide training on the systems you build?",
    answer: "Yes! We provide comprehensive training for your team, including video tutorials, documentation, and live training sessions. We ensure you're completely comfortable using and managing your new system before we hand it over.",
    category: "Support"
  }
];

const categories = [
  { id: 'all', name: 'All Questions', icon: <HelpCircle className="w-4 h-4" /> },
  { id: 'General', name: 'General', icon: <HelpCircle className="w-4 h-4" /> },
  { id: 'Process', name: 'Process', icon: <Clock className="w-4 h-4" /> },
  { id: 'Pricing', name: 'Pricing', icon: <DollarSign className="w-4 h-4" /> },
  { id: 'Technical', name: 'Technical', icon: <Code className="w-4 h-4" /> },
  { id: 'Support', name: 'Support', icon: <Shield className="w-4 h-4" /> },
];

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      variants={scaleInVariants}
      className="group"
    >
      <div
        className={`bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-900/30 border rounded-2xl overflow-hidden transition-all duration-300 ${
          isOpen ? 'border-zinc-600 shadow-xl shadow-black/30' : 'border-zinc-800/50 hover:border-zinc-700'
        }`}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-start justify-between gap-4 p-6 md:p-8 text-left transition-all duration-300"
          aria-expanded={isOpen}
        >
          <div className="flex-1">
            <h3 className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
              isOpen ? 'text-white' : 'text-zinc-300 group-hover:text-white'
            }`}>
              {faq.question}
            </h3>
          </div>
          <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'bg-white border-white rotate-180' 
              : 'bg-zinc-800/50 border-zinc-700 group-hover:bg-zinc-800 group-hover:border-zinc-600'
          }`}>
            <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${
              isOpen ? 'text-black' : 'text-zinc-400 group-hover:text-white'
            }`} />
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <div className="pt-4 border-t border-zinc-800/50">
                  <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFAQId, setOpenFAQId] = useState<number | null>(null);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    setOpenFAQId(openFAQId === id ? null : id);
  };

  return (
    <section
      ref={ref}
      id="faq"
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-black overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
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
            <HelpCircle className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-zinc-400">Got Questions?</span>
          </motion.div>

          <motion.h2
            variants={fadeInUpVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-6 tracking-tight leading-tight"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            variants={fadeInUpVariants}
            className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            Find answers to common questions about our services, process, and pricing.
          </motion.p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:bg-zinc-900 transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-white text-black border-white'
                    : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                {category.icon}
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-4"
        >
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openFAQId === faq.id}
                onToggle={() => toggleFAQ(faq.id)}
              />
            ))
          ) : (
            <motion.div
              variants={scaleInVariants}
              className="text-center py-12 px-6 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl"
            >
              <HelpCircle className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">
                No questions found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-6 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Still Have Questions CTA */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 text-center p-8 md:p-12 bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 rounded-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-lg text-zinc-400 mb-6">
            Can't find the answer you're looking for? Our team is here to help.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all duration-300 hover:scale-105"
          >
            Contact Us
            <HelpCircle className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
