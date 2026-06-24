import { IconType } from 'react-icons'
import { PiEngine, PiChalkboardTeacher, PiCpu } from 'react-icons/pi'

export interface VersionDetaillee {
  titre: string
  sousTitre: string
  contexte?: string
  objectif?: string
  ceQueNousFaisons?: string[]
  expertiseApportee?: string[]
  domainesCouverts?: string
  secteursConcernes?: string
  formats?: string[]
  themes?: string[]
  publicsCibles?: string
  derouleType?: string[]
  livrablesTypes?: string | string[]
  plusValueClient?: string
  beneficesClient?: string[]
  resultatsAttendus?: string[]
  casDusage?: string[]
  exempleMissions?: string[]
  references?: string[]
}

export interface Offre {
  id: string
  title: string
  badge?: string
  versionCourte: string
  versionDetaillee: VersionDetaillee
}

export interface Pillar {
  pillarTitle: string
  pillarDescription: string[]
  icon: IconType
  offres: Offre[]
}

export interface OffresData {
  operer: Pillar
  former: Pillar
  digitaliser: Pillar
}

// Descriptions des piliers — source unique partagée avec la home (string[] pour bullet list)
export const pillarDescriptions = {
  operer: [
    "Études de réseau",
    "Procédures opérationnelles",
    "Appui aux centres de conduite",
    "Audits d'exploitation",
  ],
  former: [
    "Formation en salle et sur simulateur",
    "Situations normales et dégradées",
    "Reconstitution du réseau",
    "Codes de réseau",
  ],
  digitaliser: [
    "Configuration d'outils",
    "Automatisation de processus",
    "Modélisation CIM/CGMES",
    "Gestion des bases de données",
  ],
}

// Structure complète des 8 offres avec contenu court ET détaillé
export const offresData: OffresData = {
  operer: {
    pillarTitle: "Opérer.",
    pillarDescription: pillarDescriptions.operer,
    icon: PiEngine,
    offres: [
      {
        id: "etudes-reseau",
        title: "Études de réseau",
        versionCourte: "Comprendre le comportement de votre réseau avant qu'il ne vous surprenne. Calculs de répartition (load flow), courts-circuits, tenue de tension, stabilité, analyses de sécurité N-1, calcul de capacité d'échange. Études menées sur des modèles CIM/CGMES, automatisables et reproductibles.",
        versionDetaillee: {
          titre: "Études de réseau et analyses de sécurité",
          sousTitre: "Des études opérationnelles, reproductibles, fondées sur des modèles de réseau de qualité.",
          ceQueNousFaisons: [
            "Construction et fiabilisation du modèle de réseau (lignes, transformateurs, groupes, BESS) au format CIM/CGMES.",
            "Calculs de répartition (load flow) et analyses de sécurité N-1 / contingences.",
            "Études de tension (plans de tension, réglage, comportement en faible charge / forte pénétration PV).",
            "Calculs de court-circuit, vérification des tenues matérielles.",
            "Études de stabilité statique et dynamique de premier niveau (études dynamiques lourdes avec experts partenaires).",
            "Calcul de capacité d'échange transfrontalier et analyse des processus de capacité (NTC, flow-based).",
            "Études d'intégration : raccordement de production, EnR, stockage ; impact sur l'exploitation.",
          ],
          domainesCouverts: "Réseaux de transport HTB/THT · réseaux de distribution HTA · réseaux insulaires et isolés · interconnexions et échanges transfrontaliers · réseaux industriels raccordés au transport.",
          livrablesTypes: [
            "Rapport d'étude argumenté (hypothèses, scénarios, résultats, recommandations)",
            "Modèles CGMES livrés et documentés",
            "Scripts d'automatisation livrés (Python) lorsque l'étude a vocation à être rejouée",
            "Restitution orale aux équipes techniques et à la direction",
          ],
          casDusage: [
            "Un centre de coordination régional européen veut objectiver les causes d'écarts entre capacités calculées et réalité du temps réel sur sa zone.",
            "Un gouvernement évalue la capacité d'un projet hydroélectrique de plusieurs gigawatts à évacuer et exporter sa production.",
            "Un opérateur insulaire fait face à des problèmes de tension en creux de charge avec forte pénétration photovoltaïque.",
            "Un GRT prépare des arrêts critiques d'ouvrages (interconnexions, centrales) et doit en valider la faisabilité.",
          ],
        },
      },
      {
        id: "conseil-operationnel",
        title: "Conseil opérationnel et appui à l'exploitation",
        versionCourte: "Renforcer vos opérations là où elles se jouent : procédures, conduite, mise en service. Rédaction et harmonisation de procédures opérationnelles, préparation et validation des essais de mise en service, appui aux centres de conduite, optimisation de schémas d'exploitation. Une expertise issue du terrain, directement applicable.",
        versionDetaillee: {
          titre: "Conseil opérationnel et appui à l'exploitation",
          sousTitre: "L'expérience de la salle de conduite, mise au service de vos procédures et de vos équipes.",
          contexte: "Les centres de conduite font face à une complexité croissante : intégration massive d'EnR et de stockage, exigences réglementaires, renouvellement des équipes, multiplication des mises en service. Les procédures opérationnelles sont l'ossature de la sûreté du système — elles doivent être justes, à jour, harmonisées et appropriées par les opérateurs.",
          expertiseApportee: [
            "Rédaction, refonte et harmonisation de procédures et consignes opérationnelles (normal, dégradé, reprise de service).",
            "Préparation, rédaction et validation des séquences d'essais de mise en service d'ouvrages HT neufs ou rénovés.",
            "Optimisation des schémas d'exploitation (pertes techniques, contraintes, qualité d'alimentation).",
            "Appui à la supervision des actifs critiques (contrôle-commande, télécoms, comptage) en lien avec l'exploitation.",
            "Revue technique d'accords d'accès au réseau.",
          ],
          plusValueClient: "Des procédures écrites par quelqu'un qui les a appliquées en temps réel — donc réalistes, manœuvrables et acceptées par les opérateurs. Un regard extérieur structuré, sans les angles morts internes.",
          exempleMissions: [
            "Rédaction et déploiement d'une procédure nationale harmonisée de remise en tension automatique après coupure, intégrant stabilité, tension et contraintes des groupes.",
            "Rédaction et validation des procédures d'essais de mise en service d'installations HT.",
            "Méthodologie de réduction des pertes techniques : ~15 GWh économisés par an sur une région.",
            "Document opérationnel unique de supervision des liaisons de télécommunication d'interconnexions transfrontalières.",
            "Rédaction d'un accord de réseau de transport pour une centrale hydroélectrique au fil de l'eau de 250 MW.",
          ],
        },
      },
      {
        id: "audit-exploitation",
        title: "Audit de l'exploitation et préparation aux situations d'urgence",
        versionCourte: "Améliorer votre résilience face aux risques d'incidents de grande ampleur. Audit des pratiques de conduite, des procédures, de l'organisation des centres de contrôle et de la préparation aux situations d'urgence et à la reconstitution. Constats factuels, recommandations hiérarchisées, plan d'action réaliste.",
        versionDetaillee: {
          titre: "Audit de l'exploitation et préparation à la reconstitution du réseau",
          sousTitre: "Un diagnostic indépendant de vos pratiques de conduite et de votre résilience opérationnelle.",
          objectif: "Donner à la direction technique une vision objective de la maturité de son exploitation : organisation du centre de conduite, qualité et couverture des procédures, gestion des situations d'urgence (plan de défense, reconstitution), conformité aux référentiels (codes ENTSO-E, bonnes pratiques GRT), compétences et entraînement des équipes.",
          derouleType: [
            "**Cadrage** : périmètre, référentiels applicables, accès documentaire.",
            "**Analyse documentaire** : procédures, consignes, organisation, retours d'expérience d'incidents.",
            "**Immersion terrain** : observation en centre de conduite, entretiens opérateurs et encadrement.",
            "**Évaluation** : grille de maturité par domaine (surveillance, congestions, urgence, reconstitution, formation, outils).",
            "**Restitution** : rapport de constats, recommandations hiérarchisées (quick wins / structurel), plan d'action, présentation à la direction.",
          ],
          secteursConcernes: "GRT et GRD · opérateurs de réseaux insulaires · grands sites industriels disposant d'un poste de conduite · producteurs · institutions et bailleurs (évaluation de GRT bénéficiaires).",
          beneficesClient: [
            "Vision factuelle et hiérarchisée des écarts, opposable en interne et vis-à-vis du régulateur.",
            "Réduction du risque d'incident majeur et amélioration du temps de rétablissement.",
            "Feuille de route exploitable immédiatement, dimensionnée aux moyens réels du client.",
            "Mise en conformité progressive avec les exigences européennes (SOGL, E&R) ou les codes nationaux.",
          ],
          references: [
            "Audit de la gestion des situations d'urgence du centre de contrôle de l'opérateur national d'un pays d'Afrique de l'Ouest",
            "Audit des pratiques de régulation de tension du GRT d'un territoire insulaire du Pacifique (filiale de RTE International)",
            "Analyse d'écarts des politiques opérationnelles ENTSO-E pour le GRT d'un pays d'Europe de l'Est en cours de synchronisation avec le réseau continental européen",
          ],
        },
      },
    ],
  },
  former: {
    pillarTitle: "Former.",
    pillarDescription: pillarDescriptions.former,
    icon: PiChalkboardTeacher,
    offres: [
      {
        id: "formation-operateurs",
        title: "Formation des opérateurs et des équipes",
        versionCourte: "Former ceux qui exploitent le réseau. Formations conçues et animées par un ancien dispatcher : conduite en régime normal et dégradé, gestion des incidents, reconstitution du réseau, codes de réseau ENTSO-E, marchés de l'électricité. En salle, sur site ou sur simulateur de conduite (OTS/DTS). Du dispatcher junior à l'équipe de direction technique — en France et à l'international.",
        versionDetaillee: {
          titre: "Formation des opérateurs de réseau et des équipes techniques",
          sousTitre: "La conduite des réseaux s'apprend avec ceux qui l'ont pratiquée.",
          formats: [
            "Sessions intra-entreprise (1 jour à 2 semaines), sur site client ou en France.",
            "Formation sur simulateur de conduite (OTS/DTS) : scénarios normaux, dégradés, blackout et reconstitution.",
            "Coaching individuel de dispatchers (sessions courtes ciblées, ex. régulation de tension).",
            "Parcours sur mesure pour équipes non opérationnelles (ingénierie, régulation, recherche, finance de l'énergie).",
            "Interventions en français et en anglais ; supports disponibles en espagnol.",
          ],
          themes: [
            "Fondamentaux du système électrique : production, consommation, fréquence, tension, stabilité.",
            "Conduite de réseau : surveillance, analyse de sécurité N-1, gestion des congestions, manœuvres.",
            "Régimes dégradés : plan de défense, gestion d'incident, reconstitution après blackout.",
            "Régulation de tension et de fréquence, y compris avec EnR et stockage (BESS).",
            "Codes de réseau ENTSO-E (SOGL, Emergency & Restoration, RfG) et leur traduction opérationnelle.",
            "Marchés de l'électricité : modèles de marché, horizons de temps (long terme → intraday), ordre de mérite, formation des prix, couplage européen.",
          ],
          publicsCibles: "Dispatchers et opérateurs de centres de conduite (GRT, GRD, producteurs, grands sites industriels) · ingénieurs d'exploitation et de planification opérationnelle · régulateurs et institutions · équipes de développeurs et d'investisseurs.",
          resultatsAttendus: [
            "Opérateurs capables d'appliquer les procédures en situation normale et dégradée, évalués sur scénarios.",
            "Montée en autonomie mesurable sur les gestes critiques (reprise de service, gestion de tension).",
            "Compréhension partagée des exigences réglementaires — en Europe, SOGL fait de la formation des opérateurs une obligation, plus une option.",
            "Supports pédagogiques remis et réutilisables en interne.",
          ],
          references: [
            "Formation de deux semaines des dispatchers de la compagnie nationale d'électricité d'un pays d'Afrique de l'Ouest (équilibrage, échanges transfrontaliers, urgence et reconstitution, sur simulateur DTS)",
            "Formation de deux semaines « exploitation, régulation et marchés » pour un centre de recherche en énergie au Moyen-Orient",
            "Formation d'une équipe d'ingénierie d'un acteur international de l'énergie offshore",
            "Coaching individuel des dispatchers du GRT d'un territoire insulaire du Pacifique (filiale de RTE International)",
            "Scénarios de formation sur le simulateur de conduite de RTE",
          ],
        },
      },
      {
        id: "codes-reseau-conformite",
        title: "Codes de réseau et conformité réglementaire",
        versionCourte: "Traduction des règlements en procédures opérationnelles. Analyse d'écarts vis-à-vis des exigences ENTSO-E (SOGL, E&R, RfG…), traduction des exigences réglementaires en procédures opérationnelles, appui aux régulateurs et aux GRT.",
        versionDetaillee: {
          titre: "Codes de réseau, réglementation et conformité opérationnelle",
          sousTitre: "Du texte réglementaire à la procédure de conduite.",
          contexte: "Les cadres réglementaires évoluent vite : codes européens (SOGL, Emergency & Restoration, RfG, règlements marchés), synchronisations de nouveaux pays avec l'Europe continentale, refonte des lois électricité et codes de réseau dans de nombreux pays. L'enjeu n'est pas d'être conforme sur le papier : c'est que les exigences se traduisent en pratiques de conduite, en procédures, en formation et en outils.",
          expertiseApportee: [
            "Analyse d'écarts (gap analysis) entre pratiques existantes et exigences ENTSO-E ou codes nationaux.",
            "Appui à l'implémentation des codes de réseau : code d'exploitation, code de raccordement, articulation avec le code de marché.",
            "Traduction des exigences en procédures opérationnelles, plans de formation et spécifications d'outils.",
            "Analyse de cadres législatifs nationaux ; description de processus réglementaires (licences, autorisations) et spécifications pour leur digitalisation.",
            "Appui aux échanges avec le régulateur et les parties prenantes.",
          ],
          plusValueClient: "Un expert qui a appliqué ces codes en conduite réelle et les a enseignés : l'analyse ne s'arrête pas à la conformité documentaire, elle anticipe l'applicabilité opérationnelle.",
          exempleMissions: [
            "Analyse d'écarts vis-à-vis des exigences ENTSO-E (urgence et reconstitution, sécurité opérationnelle coordonnée, formation) pour le GRT d'un pays d'Europe de l'Est en cours de synchronisation avec le réseau continental européen.",
            "Rédaction du code d'exploitation et formation associée (réglage tension/fréquence) pour la compagnie nationale d'électricité d'un pays d'Afrique de l'Ouest.",
            "Analyse d'une nouvelle loi électricité et spécification de dix processus réglementaires pour la plateforme digitale d'une agence gouvernementale ouest-africaine.",
            "Revue du code de réseau d'un État d'Asie centrale et rédaction de clauses techniques de PPA transfrontaliers.",
          ],
        },
      },
      {
        id: "projets-internationaux-due-diligence",
        title: "Appui aux projets internationaux et due diligence technique",
        versionCourte: "L'expertise réseau au service de vos projets. Due diligence technique de projets de production et d'interconnexion, analyses offre-demande, faisabilité d'évacuation et d'export, clauses techniques de PPA, assistance technique aux GRT pour le compte de bailleurs, supervision de recettes SCADA/EMS.",
        versionDetaillee: {
          titre: "Appui aux projets internationaux et due diligence technique",
          sousTitre: "Sécuriser les décisions d'investissement par l'analyse réseau, réglementaire et opérationnelle.",
          contexte: "Bailleurs, gouvernements, investisseurs et développeurs ont besoin d'évaluations techniques indépendantes : un projet de production peut-il évacuer son énergie ? Les échanges transfrontaliers envisagés sont-ils techniquement et juridiquement réalistes ? Le système SCADA/EMS livré est-il conforme au cahier des charges ?",
          expertiseApportee: [
            "Due diligence technique et réglementaire de projets de production et d'export (capacités d'évacuation, renforcements réseau, équilibre offre-demande, tarifs).",
            "Rédaction et revue de clauses techniques de contrats d'achat d'électricité (PPA), y compris formules d'énergie non fournie / non utilisée.",
            "Assistance technique à des GRT pour le compte de bailleurs internationaux : évaluation, renforcement de capacités, accompagnement.",
            "Supervision et évaluation de recettes (SAT) de systèmes SCADA/EMS vis-à-vis du cahier des charges.",
            "Réponses techniques à appels d'offres et pilotage de lots dans des consortiums internationaux.",
          ],
          plusValueClient: "Une analyse qui croise les trois dimensions qui font échouer les projets : le réseau (physique), la réglementation (codes, PPA) et l'exploitation (ce qui se passera réellement en conduite). Habitué des consortiums, des bailleurs et des contextes multi-pays.",
          exempleMissions: [
            "Due diligence commerciale, technique et réglementaire des PPA domestiques et export d'un projet hydroélectrique de plusieurs gigawatts, pour le gouvernement d'un État d'Asie centrale — pilotage du lot confié à RTE International.",
            "Évaluation de la conformité des essais de recette site (SAT) d'un système SCADA/EMS pour le centre de coordination des échanges d'électricité d'Asie centrale, pour le compte d'une banque multilatérale de développement.",
            "Analyse réglementaire et spécifications d'une plateforme digitale du secteur électrique pour une agence gouvernementale ouest-africaine.",
          ],
        },
      },
    ],
  },
  digitaliser: {
    pillarTitle: "Digitaliser.",
    pillarDescription: pillarDescriptions.digitaliser,
    icon: PiCpu,
    offres: [
      {
        id: "ots-ingenierie-scenarios",
        title: "Simulateurs de conduite (OTS) : ingénierie et scénarios",
        versionCourte: "Faire de votre simulateur un véritable outil d'entraînement. Paramétrage et configuration d'OTS, création de scénarios de formation (du régime normal au blackout et à la reconstitution), construction des situations de réseau associées (CGMES), ingénierie des données pour alimenter le simulateur.",
        versionDetaillee: {
          titre: "Ingénierie de simulateurs de conduite (OTS/DTS) et scénarios de formation",
          sousTitre: "Un simulateur ne vaut que par ses scénarios et la qualité de ses données.",
          contexte: "Les GRT investissent dans des simulateurs de conduite pour répondre aux exigences de formation et préparer leurs équipes aux situations extrêmes. Mais entre la livraison du logiciel et un programme d'entraînement opérationnel, l'essentiel reste à faire : modéliser les situations de réseau, construire des scénarios pédagogiques réalistes, alimenter et maintenir les bases de données.",
          ceQueNousFaisons: [
            "Paramétrage et configuration de simulateurs de réseau (expérience sur l'OTS d'un éditeur majeur du marché, pour RTE).",
            "Transfert de scénarios existants vers un nouveau simulateur.",
            "Création de scénarios nouveaux : incidents, régimes dégradés, blackout généralisé, reconstitution du réseau.",
            "Construction des situations de réseau correspondantes (charge, production, topologie) au format CGMES, cohérentes en calcul de répartition.",
            "Ingénierie des données : alimentation de la base OTS, extraction automatisée de topologies/charges/productions depuis les outils d'études (Python, framework CGMES).",
            "Rédaction de manuels d'utilisation et formation des formateurs internes.",
          ],
          livrablesTypes: "Scénarios opérationnels documentés et rejouables · situations de réseau CGMES validées en load flow · scripts d'extraction et d'alimentation livrés · manuel formateur.",
          casDusage: [
            "Un GRT remplace son simulateur et doit migrer puis enrichir son patrimoine de scénarios (référence : RTE, 2025–2026).",
            "Un GRT veut entraîner ses équipes à la reconstitution après blackout avec des situations réseau réalistes.",
            "Un centre de formation veut industrialiser la production de scénarios à partir de situations réelles archivées.",
          ],
        },
      },
      {
        id: "donnees-cgmes-automatisation",
        title: "Données réseau et automatisation (CIM/CGMES, Python)",
        versionCourte: "Appui à vos processus d'études de réseaux. Modélisation CIM/CGMES, fiabilisation de la qualité des modèles, automatisation des études, du calcul de capacité et des analyses a posteriori en Python, bases de données de situations réseau, tableaux de bord. Le pont entre vos ingénieurs réseau et vos données.",
        versionDetaillee: {
          titre: "Données de réseau, CGMES et automatisation des processus d'études",
          sousTitre: "Industrialiser les études de réseau : modèles fiables, calculs reproductibles, analyses automatisées.",
          contexte: "Les processus européens (calcul de capacité, échanges de modèles CGMES, analyses coordonnées) et la multiplication des études rendent intenables les approches manuelles. GRT et RCC ont besoin de modèles de qualité, de chaînes de calcul automatisées et d'analyses statistiques sur de grands volumes de situations réseau. Rares sont les profils qui maîtrisent à la fois le métier (qu'est-ce qu'un résultat de load flow plausible ?) et la digitalisation(Python, bases de données, CGMES).",
          ceQueNousFaisons: [
            "Modélisation de réseaux au format CIM/CGMES (lignes, transformateurs, groupes, BESS) et contrôle qualité des modèles.",
            "Automatisation en Python d'études de réseau, de calculs de capacité et d'analyses a posteriori, dans des frameworks CGMES (dont écosystème open source).",
            "Création et alimentation de bases de données de situations et de résultats ; analyses statistiques ; visualisation.",
            "Extraction automatisée de topologies, charges et productions depuis les outils d'études des GRT.",
            "Spécifications techniques à destination d'équipes de développement ; collaboration en mode agile.",
          ],
          livrablesTypes: "Scripts et pipelines documentés et livrés (le client reste propriétaire et autonome) · modèles CGMES validés · base de données structurée · rapport d'analyse et tableaux de bord · spécifications techniques.",
          casDusage: [
            "Un centre de coordination régional européen veut comprendre statistiquement les dérives d'un processus de calcul de capacité (base de données de résultats, analyses statistiques et financières, qualité des modèles CGMES).",
            "Un GRT veut générer automatiquement des situations de réseau pour la formation ou les études (référence : RTE).",
            "Une équipe d'études veut passer d'études manuelles ponctuelles à des chaînes rejouables et auditables.",
          ],
        },
      },
    ],
  },
}
