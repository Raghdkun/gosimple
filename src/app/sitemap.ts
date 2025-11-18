import { MetadataRoute } from 'next'
import { getAllServiceSlugs } from '@/constants/servicesData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gosimple.io'
  
  // Main pages - removed hash-based URLs as they shouldn't be in sitemap
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]

  // Service detail pages
  const serviceSlugs = getAllServiceSlugs()
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map(slug => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  return [...mainPages, ...servicePages]
}