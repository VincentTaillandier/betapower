import { IconType } from 'react-icons'
import { PiEngine, PiChalkboardTeacher, PiCpu } from 'react-icons/pi'

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
    description: [
      "Études de réseau",
      "Procédures opérationnelles",
      "Appui aux centres de conduite",
      "Audits d'exploitation",
    ],
    href: "/offres/#operer",
    icon: PiEngine,
  },
  {
    title: "Former.",
    description: [
      "Formation en salle et sur simulateur",
      "Situations normales et dégradées",
      "Reconstitution du réseau",
      "Codes de réseau"
    ],
    href: "/offres/#former",
    icon: PiChalkboardTeacher,
  },
  {
    title: "Digitaliser.",
    description: [
      "Configuration d'outils",
      "Automatisation de processus",
      "Modélisation CIM/CGMES",
      "Gestion des bases de données"
    ],
    href: "/offres/#digitaliser",
    icon: PiCpu,
  },
]
