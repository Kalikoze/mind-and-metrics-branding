import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://mindandmetricsbranding.com/sitemap.xml',
    host: 'https://mindandmetricsbranding.com',
  }
} 