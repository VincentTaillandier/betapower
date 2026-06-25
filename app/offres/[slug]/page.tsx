import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { offresData, Offre } from '@/lib/offres'
import { getProjects } from '@/lib/projects'
import OffreDetailClient from './OffreDetailClient'
import { canonical, SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/seo'

interface OffreDetailPageProps {
  params: Promise<{ slug: string }>
}

function getAllOffres(): Offre[] {
  return [...offresData.domaines, offresData.secondaire]
}

export async function generateMetadata({ params }: OffreDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const offre = getAllOffres().find((o) => o.id === slug)

  if (!offre) {
    return { title: 'Offre non trouvée', description: "Cette offre n'existe pas." }
  }

  const pageCanonical = canonical(`/offres/${slug}`)
  return {
    title: `${offre.versionDetaillee.titre} — ${SITE_NAME}`,
    description: offre.versionDetaillee.sousTitre,
    alternates: { canonical: pageCanonical },
    openGraph: {
      title: `${offre.versionDetaillee.titre} — ${SITE_NAME}`,
      description: offre.versionDetaillee.sousTitre,
      url: pageCanonical,
      images: [{ url: DEFAULT_OG_IMAGE, alt: offre.versionDetaillee.titre }],
    },
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  return getAllOffres().map((offre) => ({ slug: offre.id }))
}

export default async function OffreDetailPage({ params }: OffreDetailPageProps) {
  const { slug } = await params
  const offre = getAllOffres().find((o) => o.id === slug)

  if (!offre) notFound()

  const relatedProjects = getProjects()
    .filter(p => p.offresLiees?.some(o => o.offreId === slug))
    .map(p => ({ slug: p.slug, title: p.title }))

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: offre.versionDetaillee.titre,
    description: offre.versionDetaillee.sousTitre,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    url: canonical(`/offres/${offre.id}`),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <OffreDetailClient offre={offre} relatedProjects={relatedProjects} />
    </>
  )
}
