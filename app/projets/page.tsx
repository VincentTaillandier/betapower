import type { Metadata } from 'next'
import ProjetsContent from '@/components/ProjetsContent'
import { getProjects } from '@/lib/projects'
import { canonical, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    absolute: `Projets & réalisations — ${SITE_NAME} | Déploiement de simulateurs OTS et ingénierie de scénarios de formation`,
  },
  description:
    "Projets de référence en exploitation de réseaux électriques : déploiement de simulateur OTS, migration et création de scénarios de formation, ingénierie des données réseau.",
  alternates: { canonical: canonical('/projets') },
  openGraph: {
    title: `Projets & réalisations — ${SITE_NAME}`,
    description:
      "Projets de référence en exploitation de réseaux électriques : déploiement de simulateur OTS, migration et création de scénarios de formation, ingénierie des données réseau.",
    url: canonical('/projets'),
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },
}

export default function ProjetsPage() {
  const projects = getProjects()
  return <ProjetsContent projects={projects} />
}
