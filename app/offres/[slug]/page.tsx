import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { offresData, Offre, Pillar } from '@/lib/offres'
import { getProjects } from '@/lib/projects'
import OffreDetailClient from './OffreDetailClient'
import { canonical, SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/seo'

interface OffreDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: OffreDetailPageProps): Promise<Metadata> {
  const { slug } = await params

  let offreFound: Offre | null = null
  for (const pillar of Object.values(offresData) as Pillar[]) {
    const offre = pillar.offres.find((o) => o.id === slug)
    if (offre) { offreFound = offre; break }
  }

  if (!offreFound) {
    return { title: 'Offre non trouvée', description: "Cette offre n'existe pas." }
  }

  const pageCanonical = canonical(`/offres/${slug}`)
  return {
    title: offreFound.versionDetaillee.titre,
    description: offreFound.versionDetaillee.sousTitre,
    alternates: { canonical: pageCanonical },
    openGraph: {
      title: `${offreFound.versionDetaillee.titre} — ${SITE_NAME}`,
      description: offreFound.versionDetaillee.sousTitre,
      url: pageCanonical,
      images: [{ url: DEFAULT_OG_IMAGE, alt: offreFound.versionDetaillee.titre }],
    },
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  const params: { slug: string }[] = []
  Object.values(offresData).forEach((pillar: Pillar) => {
    pillar.offres.forEach((offre: Offre) => {
      params.push({ slug: offre.id })
    })
  })
  return params
}

export default async function OffreDetailPage({ params }: OffreDetailPageProps) {
  const { slug } = await params

  let offreFound: Offre | null = null
  let pillarName = ''
  for (const pillar of Object.values(offresData) as Pillar[]) {
    const offre = pillar.offres.find((o) => o.id === slug)
    if (offre) { offreFound = offre; pillarName = pillar.pillarTitle; break }
  }

  if (!offreFound) notFound()

  // Note: route param is named [slug] but is fed by offre.id (source of truth in offresData)
  const relatedProjects = getProjects()
    .filter(p => p.offresLiees?.some(o => o.offreId === slug))
    .map(p => ({ slug: p.slug, title: p.title }))

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: offreFound.versionDetaillee.titre,
    description: offreFound.versionDetaillee.sousTitre,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    url: canonical(`/offres/${offreFound.id}`),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <OffreDetailClient offre={offreFound} pillarName={pillarName} relatedProjects={relatedProjects} />
    </>
  )
}
