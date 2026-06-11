import { IconType } from 'react-icons'
import { PiBroadcast, PiWaveform, PiHeadset, PiDesktop, PiDatabase, PiFileText } from 'react-icons/pi'

export interface Expertise {
  icon: IconType
  title: string
  desc: string
}

export const expertises: Expertise[] = [
  {
    icon: PiBroadcast,
    title: 'Exploitation et conduite des réseaux HTB / HTA',
    desc: "Analyse, exploitation et conduite des réseaux haute et très haute tension : surveillance temps réel, analyse de sécurité N-1, gestion des congestions et des incidents, reprise de service et reconstitution. Une expertise acquise au pupitre d'un réseau THT régional chez RTE, du régime normal aux situations les plus dégradées.",
  },
  {
    icon: PiWaveform,
    title: 'Études de réseau',
    desc: "Calculs de répartition (load flow), courts-circuits, plans de tension, stabilité, analyses de contingences et calcul de capacité d'échange. Des études menées sur des modèles CIM/CGMES fiabilisés, reproductibles et automatisables — du réseau interconnecté européen aux réseaux insulaires.",
  },
  {
    icon: PiHeadset,
    title: 'Formation des opérateurs',
    desc: "Conception et animation de formations pour dispatchers et ingénieurs : conduite en régime normal et dégradé, gestion d'incident, reconstitution après blackout, régulation de tension et de fréquence, marchés de l'électricité. En salle, sur site ou sur simulateur — en français et en anglais.",
  },
  {
    icon: PiDesktop,
    title: 'Simulateurs OTS',
    desc: "Déploiement, paramétrage et ingénierie pédagogique des simulateurs de conduite : création de scénarios de formation (jusqu'au blackout généralisé et à la reconstitution), construction des situations de réseau associées au format CGMES, alimentation et fiabilisation des bases de données du simulateur.",
  },
  {
    icon: PiDatabase,
    title: 'Données réseau et automatisation',
    desc: "Modélisation CIM/CGMES (lignes, transformateurs, groupes, BESS), contrôle qualité des modèles, automatisation en Python des études, des calculs de capacité et des analyses a posteriori. Le pont entre le métier de l'exploitation et l'ingénierie des données — scripts livrés, client autonome.",
  },
  {
    icon: PiFileText,
    title: 'Codes de réseau et réglementation',
    desc: "Maîtrise opérationnelle des codes ENTSO-E (SOGL, Emergency & Restoration, RfG) et des cadres nationaux : analyses d'écarts, rédaction de codes d'exploitation et de raccordement, traduction des exigences réglementaires en procédures de conduite, clauses techniques de PPA, pilotage de projets multi-acteurs.",
  },
]

export interface Valeur {
  titre: string
  texte: string
}

export const valeurs: Valeur[] = [
  {
    titre: 'Excellence',
    texte:
      "Chaque mission est abordée avec le même niveau d'exigence qu'un projet stratégique. Je m'appuie sur une veille technique permanente et une rigueur méthodologique issue du terrain pour produire des livrables qui tiennent à l'épreuve de l'opérationnel — pas seulement du bureau.",
  },
  {
    titre: 'Intégrité',
    texte:
      "Je ne prends que les missions pour lesquelles je peux apporter une valeur réelle. Quand une limite est atteinte, je le dis clairement. Cette transparence construit la confiance sur le long terme et évite les désillusions à mi-parcours, quand les enjeux sont les plus élevés.",
  },
  {
    titre: 'Partenariat',
    texte:
      "Je travaille aux côtés de vos équipes, pas au-dessus d'elles. Ma posture est celle d'un pair expert, capable de monter en compétence avec vous et de transférer les savoir-faire. Une mission réussie, c'est une équipe cliente plus forte à la fin qu'au début.",
  },
]
