import type { MetadataRoute } from 'next'
import { collections } from '@/content/collections'
import { site } from '@/content/site'
import { spaces } from '@/content/story'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1, changeFrequency: 'monthly' },
    { path: '/collections', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/projects', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/the-craft', priority: 0.8, changeFrequency: 'yearly' },
    { path: '/our-story', priority: 0.8, changeFrequency: 'yearly' },
    { path: '/clients', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/contact', priority: 0.9, changeFrequency: 'yearly' },
  ]

  return [
    ...pages.map((page) => ({
      url: `${site.url}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...spaces.map((space) => ({
      url: `${site.url}/projects/${space.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...collections.map((collection) => ({
      url: `${site.url}/collections/${collection.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
