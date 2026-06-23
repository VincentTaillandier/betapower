import type { MetadataRoute } from 'next'
import { execSync } from 'child_process'
import { offresData } from '@/lib/offres'
import { getProjects } from '@/lib/projects'
import { SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static'

function gitDate(relativePath: string): Date {
  try {
    const iso = execSync(
      `git log -1 --format="%cI" -- "${relativePath}"`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }
    ).trim()
    if (iso) return new Date(iso)
  } catch {}
  return new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const offresLastModified = gitDate('lib/offres.ts')

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: gitDate('app/page.tsx'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/offres/`,
      lastModified: offresLastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projets/`,
      lastModified: gitDate('app/projets/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/a-propos/`,
      lastModified: gitDate('app/a-propos/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact/`,
      lastModified: gitDate('app/contact/page.tsx'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]

  const offerPages: MetadataRoute.Sitemap = []
  Object.values(offresData).forEach((pillar) => {
    pillar.offres.forEach((offre: { id: string }) => {
      offerPages.push({
        url: `${SITE_URL}/offres/${offre.id}/`,
        lastModified: offresLastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    })
  })

  const projectPages: MetadataRoute.Sitemap = getProjects().map((project) => ({
    url: `${SITE_URL}/projets/${project.slug}/`,
    lastModified: project.date ? new Date(project.date) : gitDate(`content/projects/${project.slug}.md`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...offerPages, ...projectPages]
}
