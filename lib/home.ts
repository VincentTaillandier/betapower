import { IconType } from 'react-icons'
import { PiEngine, PiChalkboardTeacher, PiCpu } from 'react-icons/pi'
import { pillarDescriptions } from '@/lib/offres'

export const proofPoints = [
  "3 ans de conduite opérationnelle du réseau THT en centre exploitation chez RTE",
  "Pilotage de projets pour des GRT, RCC, régulateurs et bailleurs de fonds internationaux",
  "Références : RTE, Rte International, ainsi que des gestionnaires de réseaux, centres de coordination",
  "10+ pays d'intervention — Europe, Afrique, Asie centrale, Moyen-Orient, Pacifique",
]

export interface PillarHome {
  title: string
  description: string[]
  href: string
  icon: IconType
}

export const pillars: PillarHome[] = [
  {
    title: "Opérer.",
    description: pillarDescriptions.operer,
    href: "/offres/#operer",
    icon: PiEngine,
  },
  {
    title: "Former.",
    description: pillarDescriptions.former,
    href: "/offres/#former",
    icon: PiChalkboardTeacher,
  },
  {
    title: "Digitaliser.",
    description: pillarDescriptions.digitaliser,
    href: "/offres/#digitaliser",
    icon: PiCpu,
  },
]
