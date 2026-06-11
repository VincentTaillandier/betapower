import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { offresData, Offre, Pillar } from '@/lib/offres'
import OffreDetailClient from './OffreDetailClient'

interface OffreDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: OffreDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  
  // Find the offer across all pillars
  let offreFound: Offre | null = null
  
  for (const pillar of Object.values(offresData) as Pillar[]) {
    const offre = pillar.offres.find((o) => o.id === slug)
    if (offre) {
      offreFound = offre
      break
    }
  }
  
  if (!offreFound || !offreFound.versionDetaillee) {
    return {
      title: 'Offre non trouvée',
      description: 'Cette offre n\'existe pas.',
    }
  }
  
  return {
    title: offreFound.versionDetaillee.titre,
    description: offreFound.versionDetaillee.sousTitre,
  }
}

export function generateStaticParams() {
  const params: { slug: string }[] = []
  
  // Collect all offer slugs from all pillars
  Object.values(offresData).forEach((pillar: Pillar) => {
    pillar.offres.forEach((offre: Offre) => {
      params.push({ slug: offre.id })
    })
  })
  
  return params
}

export default async function OffreDetailPage({ params }: OffreDetailPageProps) {
  const { slug } = await params
  
  // Find the offer across all pillars
  let offreFound: Offre | null = null
  let pillarName = ''
  
  for (const pillar of Object.values(offresData) as Pillar[]) {
    const offre = pillar.offres.find((o) => o.id === slug)
    if (offre) {
      offreFound = offre
      pillarName = pillar.pillarTitle
      break
    }
  }
  
  if (!offreFound || !offreFound.versionDetaillee) {
    notFound()
  }
  
  return <OffreDetailClient offre={offreFound} pillarName={pillarName} />
}
