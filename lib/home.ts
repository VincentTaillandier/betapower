import { IconType } from "react-icons"
import { PiChartBar, PiEngine, PiFileText, PiChalkboardTeacher, PiBriefcase } from "react-icons/pi"

export const proofPoints = [
  "Ancien dispatcher RTE — conduite temps réel du réseau THT, du régime normal aux situations dégradées.",
  "En mission pour un gestionnaire de réseau de transport européen — 100 scénarios OTS livrés (migration et création), automatisation Python incluse.",
  "Référentiels ENTSO-E & CIM/CGMES — codes SOGL, E&R, RfG ; modèles réseau fiabilisés.",
]

export interface PillarHome {
  title: string
  description: string[]
  href: string
  icon: IconType
  secondary?: boolean
}

export const pillars: PillarHome[] = [
  {
    title: "Études & analyses de réseau",
    description: ["Load flow, sécurité N-1, calcul de capacité, stabilité — sur modèles CGMES, automatisées et reproductibles."],
    href: "/offres/etudes-analyses-reseau/",
    icon: PiChartBar,
  },
  {
    title: "Exploitation, procédures & audit",
    description: ["Procédures de conduite, schémas d'exploitation, audit de maturité."],
    href: "/offres/exploitation-procedures-audit/",
    icon: PiEngine,
  },
  {
    title: "Codes de réseau & conformité ENTSO-E",
    description: ["Gap analysis, implémentation des codes, traduction opérationnelle."],
    href: "/offres/codes-reseau-conformite/",
    icon: PiFileText,
  },
  {
    title: "Formation & simulateurs",
    description: ["Opérateurs en salle et sur OTS, ingénierie des scénarios."],
    href: "/offres/formation-simulateurs/",
    icon: PiChalkboardTeacher,
  },
]

export const pillarSecondaire: PillarHome = {
  title: "Appui investisseurs & bailleurs",
  description: ["Due diligence, PPA, recette SCADA/EMS."],
  href: "/offres/appui-investisseurs-bailleurs/",
  icon: PiBriefcase,
  secondary: true,
}
