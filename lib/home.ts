import { IconType } from 'react-icons'
import { PiEngine, PiChalkboardTeacher, PiCpu } from 'react-icons/pi'

export const proofPoints = [
  "Conduite opérationnelle du réseau THT en centre exploitation chez RTE",
  "Pilotage de projets pour des GRT, RCC, régulateurs et bailleurs de fonds internationaux",
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
    description: ["Études de réseau", "Procédures opérationnelles", "Audits de l'exploitation"],
    href: "/offres/#operer",
    icon: PiEngine,
  },
  {
    title: "Former.",
    description: ["Formation", "Conduite en régime normal et dégradé", "Reconstitution du réseau", "Codes de réseau"],
    href: "/offres/#former",
    icon: PiChalkboardTeacher,
  },
  {
    title: "Digitaliser.",
    description: ["Configuration OTS", "Automatisation", "Modélisation CIM/CGMES"],
    href: "/offres/#digitaliser",
    icon: PiCpu,
  },
]
