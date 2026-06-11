import type { Metadata } from 'next'
import ProjetsContent from '@/components/ProjetsContent'
import { getProjects } from '@/lib/projects-data'

export const metadata: Metadata = {
  title: 'Références BetaPower — Simulateur OTS RTE, calcul de capacité RCC, codes de réseau, formations internationales',
  description: 'Projets de référence : scénarios de formation sur le simulateur de conduite de RTE, analyse d\'un calcul de capacité pour un RCC européen, due diligence hydroélectrique, codes de réseau et formations dans plus de 10 pays.',
}

export default function ProjetsPage() {
  const projects = getProjects()
  return <ProjetsContent projects={projects} />
}
