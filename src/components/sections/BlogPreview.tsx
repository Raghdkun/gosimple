'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUpVariants, staggerContainerVariants, scaleInVariants } from '@/hooks/use-scroll-animation';
import { ArrowRight, Clock, Calendar, User, Tag, BookOpen, TrendingUp } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Web Design Trends That Will Dominate 2025",
    excerpt: "Discover the latest web design trends that are shaping the digital landscape. From immersive 3D experiences to AI-powered interfaces, learn what's hot in modern web development.",
    author: "Sarah Mitchell",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    date: "Nov 1, 2025",
    readTime: "8 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    featured: true
  },
  {
    id: 2,
    title: "How AI is Revolutionizing Business Automation",
    excerpt: "Explore how artificial intelligence is transforming business processes. Learn practical ways to implement AI automation in your organization and boost productivity.",
    author: "Marcus Chen",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    date: "Oct 28, 2025",
    readTime: "10 min read",
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    featured: true
  },
  {
    id: 3,
    title: "Building Scalable SaaS: A Complete Guide",
    excerpt: "Learn the essential strategies for building a SaaS platform that scales. From architecture decisions to deployment best practices, we cover everything you need to know.",
    author: "Emily Rodriguez",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    date: "Oct 25, 2025",
    readTime: "12 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    featured: false
  },
  {
    id: 4,
    title: "Mobile App Development: iOS vs Android in 2025",
    excerpt: "A comprehensive comparison of iOS and Android development. Discover which platform is right for your business and learn about cross-platform alternatives.",
    author: "James Anderson",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    date: "Oct 22, 2025",
    readTime: "7 min read",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    featured: false
  },
  {
    id: 5,
    title: "Data Analytics: Turning Insights into Action",
    excerpt: "Master the art of data analytics and learn how to make data-driven decisions. Explore powerful tools and techniques for extracting meaningful insights from your data.",
    author: "Olivia Thompson",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    date: "Oct 20, 2025",
    readTime: "9 min read",
    category: "Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    featured: false
  },
  {
    id: 6,
    title: "Cybersecurity Best Practices for Modern Businesses",
    excerpt: "Protect your business from cyber threats with these essential security practices. Learn about the latest security technologies and how to implement them effectively.",
    author: "David Park",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    date: "Oct 18, 2025",
    readTime: "11 min read",
    category: "Security",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    featured: false
  }
];

const categories = [
  'All',
  'Design',
  'Development',
  'AI & Automation',
  'Mobile',
  'Analytics',
  'Security'
];

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

function BlogCard({ post, featured = false }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      variants={scaleInVariants}
      className={`group relative h-full ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-900/30 border border-zinc-800/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/50 flex flex-col">
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? 'h-80 md:h-96' : 'h-56'}`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-black text-xs font-semibold rounded-full">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
          </div>

          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold rounded-full">
                <TrendingUp className="w-3 h-3" />
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6 md:p-8">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className={`font-bold text-white mb-3 line-clamp-2 transition-colors group-hover:text-zinc-100 ${
            featured ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'
          }`}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className={`text-zinc-400 mb-6 flex-1 leading-relaxed ${
            featured ? 'text-base md:text-lg line-clamp-3' : 'text-sm md:text-base line-clamp-2'
          }`}>
            {post.excerpt}
          </p>

          {/* Author & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 border-2 border-zinc-700">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{post.author}</p>
                <p className="text-xs text-zinc-500">Author</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white font-medium transition-all duration-300">
              <span className="text-sm">Read More</span>
              <ArrowRight
                className={`w-5 h-5 transition-transform duration-300 ${
                  isHovered ? 'translate-x-1' : 'translate-x-0'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Bottom Border Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-zinc-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.article>
  );
}

export default function BlogPreview() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-black overflow-hidden"
      aria-label="Blog & Insights"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />

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
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-zinc-400">Insights & Updates</span>
          </motion.div>

          <motion.h2
            variants={fadeInUpVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mb-6 tracking-tight leading-tight"
          >
            Latest From Our Blog
          </motion.h2>

          <motion.p
            variants={fadeInUpVariants}
            className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            Stay updated with the latest trends, insights, and best practices in technology and digital innovation.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full border transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="space-y-8">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <motion.div
                variants={staggerContainerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
              >
                {featuredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} featured />
                ))}
              </motion.div>
            )}

            {/* Regular Posts */}
            {regularPosts.length > 0 && (
              <motion.div
                variants={staggerContainerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {regularPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            variants={scaleInVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center py-16 px-6 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl"
          >
            <BookOpen className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400 text-lg mb-4">
              No posts found in this category.
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="px-6 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
            >
              View All Posts
            </button>
          </motion.div>
        )}

        {/* View All CTA */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-12 md:mt-16"
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all duration-300 hover:scale-105 group"
          >
            View All Articles
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
