import { MetadataRoute } from 'next'
import { positions } from '@/data/positions'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mindandmetricsbranding.com'
  const currentDate = new Date()

  const routes = [
    { path: '', priority: 1 },
    { path: 'get-started', priority: 0.9 },
    { path: 'about', priority: 0.8 },
    { path: 'services', priority: 0.8 },
    { path: 'careers', priority: 0.8 },
    { path: 'contact', priority: 0.8 },
    { path: 'privacy-policy', priority: 0.5 },
  ]

  const staticRoutes = routes.map(({ path, priority }) => ({
    url: `${baseUrl}/${path}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority,
  }))

  const dynamicRoutes = positions.map((position) => ({
    url: `${baseUrl}/careers/${position.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }))

  return [...staticRoutes, ...dynamicRoutes]
} 