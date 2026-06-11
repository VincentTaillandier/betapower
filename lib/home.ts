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
  description: string
  href: string
  icon: IconType
}

export const pillars: PillarHome[] = [
  {
    title: "Opérer.",
    description: "Études de réseau, procédures opérationnelles, appui aux centres de conduite, audits de l'exploitation.",
    href: "/offres#operer",
    icon: PiEngine,
  },
  {
    title: "Former.",
    description: "Formation des dispatchers et des ingénieurs : conduite en régime normal et dégradé, reconstitution du réseau, codes de réseau, marchés de l'électricité — en salle et sur simulateur.",
    href: "/offres#former",
    icon: PiChalkboardTeacher,
  },
  {
    title: "Digitaliser.",
    description: "Configuration de simulateurs de conduite (OTS), automatisation de processus, modélisation CIM/CGMES.",
    href: "/offres#digitaliser",
    icon: PiCpu,
  },
]
