import type { Metadata } from 'next'
import ProjetsContent from '@/components/ProjetsContent'
import { getProjects } from '@/lib/projects'
import { canonical, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    absolute: `Références ${SITE_NAME} — Simulateur OTS RTE, calcul de capacité RCC, codes de réseau, formations internationales`,
  },
  description:
    "Projets de référence : scénarios de formation sur le simulateur de conduite de RTE, analyse d'un calcul de capacité pour un RCC européen, due diligence hydroélectrique, codes de réseau et formations dans plus de 10 pays.",
  alternates: { canonical: canonical('/projets') },
  openGraph: {
    title: `Références ${SITE_NAME} — Projets réseau électrique et formations internationales`,
    description:
      "Projets de référence en exploitation de réseaux électriques : simulateur OTS RTE, calcul de capacité RCC européen, due diligence hydroélectrique, formations dans plus de 10 pays.",
    url: canonical('/projets'),
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },
}

export default function ProjetsPage() {
  const projects = getProjects()
  return <ProjetsContent projects={projects} />
}
