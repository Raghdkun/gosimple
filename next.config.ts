import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports if needed
  // output: 'export',
  
  // Allow cross-origin requests from specific IPs during development
  allowedDevOrigins: ['10.11.11.10'],
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable compression
  compress: true,
  
  // Generate sitemap during build
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  
  // Headers for better SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
