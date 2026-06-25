export interface VersionDetaillee {
  titre: string
  sousTitre: string
  audienceNote?: string
  enBref: string
  ceQueCouvreOffre: string[]
  livrablesTypes: string
  exemplesMissions: string[]
}

export interface Offre {
  id: string
  title: string
  eyebrow: string
  versionCourte: string
  versionDetaillee: VersionDetaillee
}

export interface OffresData {
  domaines: Offre[]
  secondaire: Offre
}

export const offresData: OffresData = {
  domaines: [
    {
      id: "etudes-analyses-reseau",
      title: "Études & analyses de réseau",
      eyebrow: "OFFRE",
      versionCourte: "Load flow, sécurité N-1, calcul de capacité, stabilité — sur modèles CGMES, automatisées et reproductibles.",
      versionDetaillee: {
        titre: "Études & analyses de réseau",
        sousTitre: "Des études opérationnelles, reproductibles, fondées sur des modèles de réseau de qualité.",
        enBref: "Les processus européens — calcul de capacité coordonné, analyse de sécurité, échange de modèles CGMES — et la multiplication des analyses rendent les approches manuelles intenables. BetaPower industrialise les études sur des modèles fiabilisés : automatisation Python, chaînes reproductibles et auditables, avec la lecture métier d'un ancien exploitant. Rares sont les profils qui maîtrisent à la fois le métier — qu'est-ce qu'un load flow plausible ? — et la donnée. Cadre de départ, mission dimensionnée au cadrage.",
        ceQueCouvreOffre: [
          "Construction, fiabilisation et contrôle qualité du modèle de réseau (lignes, transformateurs, groupes, BESS) au format CIM/CGMES.",
          "Calculs de répartition (load flow) et analyses de sécurité N-1 / contingences.",
          "Calcul de capacité d'échange transfrontalier (NTC, flow-based) et analyse des processus de capacité.",
          "Études de tension, court-circuit et stabilité de premier niveau (dynamique lourde avec experts partenaires).",
          "Études d'intégration : raccordement de production, EnR et stockage, impact sur l'exploitation.",
          "Automatisation Python des études et des analyses a posteriori, bases de données de situations et de résultats, tableaux de bord — chaînes rejouables, extraction automatisée depuis les outils d'études.",
        ],
        livrablesTypes: "rapport d'étude argumenté · modèles CGMES documentés et validés · scripts et pipelines Python livrés (le client reste propriétaire et autonome) · base de données structurée et tableaux de bord · restitution aux équipes et à la direction.",
        exemplesMissions: [
          "Un centre de coordination régional européen objective statistiquement les écarts entre capacités calculées et réalité temps réel sur sa zone (analyses, qualité des modèles CGMES).",
          "Un GRT prépare des arrêts critiques d'ouvrages (interconnexions, centrales) et doit en valider la faisabilité.",
          "Un opérateur confronté à des problèmes de tension en faible charge avec forte pénétration photovoltaïque.",
          "Une équipe d'études passe d'études manuelles ponctuelles à des chaînes rejouables et auditables.",
        ],
      },
    },
    {
      id: "exploitation-procedures-audit",
      title: "Exploitation, procédures & audit",
      eyebrow: "OFFRE",
      versionCourte: "Procédures de conduite, schémas d'exploitation, audit de maturité.",
      versionDetaillee: {
        titre: "Exploitation, procédures & audit",
        sousTitre: "L'expérience de la salle de conduite, au service de vos procédures, de vos équipes et de votre résilience.",
        enBref: "Les procédures opérationnelles sont l'ossature de la sûreté du système : justes, à jour, appropriées par les opérateurs. BetaPower les rédige, optimise les schémas d'exploitation, et audite la maturité de l'exploitation — avec le regard de quelqu'un qui a conduit le réseau en temps réel. Des procédures réalistes et manœuvrables ; un diagnostic factuel, opposable en interne et au régulateur. Chaque mission est un cadre de départ, dimensionnée au cadrage.",
        ceQueCouvreOffre: [
          "Rédaction, refonte et harmonisation de procédures et consignes (normal, dégradé, reprise de service).",
          "Préparation et validation des séquences d'essais de mise en service d'ouvrages HT.",
          "Optimisation des schémas d'exploitation (pertes techniques, contraintes, qualité d'alimentation).",
          "Audit de l'exploitation : organisation du centre de conduite, plans de défense et de reconstitution, conformité aux référentiels, entraînement des équipes — restitué en grille de maturité.",
          "Appui à la supervision des actifs critiques (contrôle-commande, télécoms, comptage).",
          "Automatisation des analyses a posteriori (retours d'expérience, incidents) et tableaux de bord d'exploitation — scripts Python livrés, équipes autonomes.",
        ],
        livrablesTypes: "procédures et consignes livrées · rapport d'audit avec grille de maturité · recommandations hiérarchisées (quick wins / structurel) et plan d'action · scripts d'analyse et tableaux de bord livrés · restitution à la direction.",
        exemplesMissions: [
          "Procédure nationale harmonisée de remise en tension automatique après coupure, intégrant stabilité, tension et contraintes de groupes.",
          "Méthodologie de réduction des pertes techniques : ~15 GWh économisés par an sur une région.",
          "Audit de la gestion des situations d'urgence et du plan de reconstitution d'un centre de conduite.",
          "Analyse d'écarts des politiques opérationnelles ENTSO-E pour un GRT en cours de synchronisation avec le réseau continental européen.",
        ],
      },
    },
    {
      id: "codes-reseau-conformite",
      title: "Codes de réseau & conformité ENTSO-E",
      eyebrow: "OFFRE",
      versionCourte: "Gap analysis, implémentation des codes, traduction opérationnelle.",
      versionDetaillee: {
        titre: "Codes de réseau & conformité ENTSO-E",
        sousTitre: "Du texte réglementaire à la procédure de conduite.",
        enBref: "Les cadres évoluent vite : SOGL, Emergency & Restoration, RfG, règlements marchés, synchronisations avec le réseau continental. L'enjeu n'est pas d'être conforme sur le papier, c'est que les exigences se traduisent en pratiques de conduite, procédures, formation et outils. BetaPower fait ce pont, depuis l'applicabilité opérationnelle. Cadre de départ, mission dimensionnée au cadrage.",
        ceQueCouvreOffre: [
          "Analyse d'écarts (gap analysis) entre pratiques existantes et exigences ENTSO-E ou codes nationaux.",
          "Appui à l'implémentation : code d'exploitation, code de raccordement, articulation avec le code de marché.",
          "Traduction des exigences en procédures, plans de formation et spécifications d'outils.",
          "Analyse de cadres législatifs, description des processus réglementaires (licences, autorisations) en vue de leur digitalisation.",
          "Appui aux échanges avec le régulateur et les parties prenantes.",
        ],
        livrablesTypes: "rapport de gap analysis · projets de codes et procédures · spécifications fonctionnelles · supports d'échange avec le régulateur.",
        exemplesMissions: [
          "Analyse d'écarts ENTSO-E (urgence et reconstitution, sécurité opérationnelle coordonnée, formation) pour un GRT en cours de synchronisation avec le réseau continental européen.",
          "Rédaction d'un code d'exploitation et formation associée (réglage tension/fréquence) pour un gestionnaire de réseau national.",
          "Spécification de processus réglementaires pour la plateforme digitale d'un régulateur.",
        ],
      },
    },
    {
      id: "formation-simulateurs",
      title: "Formation & simulateurs",
      eyebrow: "OFFRE",
      versionCourte: "Opérateurs en salle et sur OTS, ingénierie des scénarios.",
      versionDetaillee: {
        titre: "Formation & simulateurs",
        sousTitre: "La conduite des réseaux s'apprend avec ceux qui l'ont pratiquée — sur un simulateur qui sonne juste.",
        enBref: "Former les opérateurs aux situations qu'ils ne rencontreront (espérons-le) jamais en réel, voilà l'enjeu. BetaPower conçoit et anime ces formations, et ingénie le simulateur OTS qui les porte : scénarios réalistes, situations de réseau cohérentes, données fiables. Un simulateur ne vaut que par ses scénarios et la qualité de ses données. Cadre de départ, mission dimensionnée au cadrage.",
        ceQueCouvreOffre: [
          "Formation des dispatchers et ingénieurs : conduite normale et dégradée, gestion d'incident, reconstitution après blackout, régulation tension/fréquence, marchés de l'électricité.",
          "Formats : intra-entreprise, sur simulateur (OTS/DTS), coaching individuel, parcours pour équipes non opérationnelles. En français et en anglais, supports en espagnol.",
          "Paramétrage et configuration de simulateurs OTS, transfert et création de scénarios (incidents, dégradés, blackout, reconstitution).",
          "Construction des situations de réseau au format CGMES, validées en load flow ; ingénierie des données (extraction automatisée, Python).",
          "Rédaction des manuels et formation des formateurs internes.",
        ],
        livrablesTypes: "programme et supports réutilisables · scénarios OTS documentés et rejouables · situations CGMES validées en load flow · scripts d'alimentation livrés · manuel formateur.",
        exemplesMissions: [
          "Migration et création de 100 scénarios de formation lors du renouvellement du simulateur d'un GRT, automatisation Python incluse.",
          "Formation de deux semaines de dispatchers (équilibrage, échanges transfrontaliers, urgence et reconstitution) sur simulateur.",
          "Coaching individuel de dispatchers sur la régulation de tension.",
          "Un GRT industrialise la production de situations de réseau pour la formation, à partir de ses outils d'études (automatisation Python).",
        ],
      },
    },
  ],
  secondaire: {
    id: "appui-investisseurs-bailleurs",
    title: "Appui investisseurs & bailleurs",
    eyebrow: "OFFRE — INVESTISSEURS & BAILLEURS",
    versionCourte: "Due diligence, PPA, recette SCADA/EMS.",
    versionDetaillee: {
      titre: "Appui investisseurs & bailleurs",
      audienceNote: "Pour les porteurs de projet, investisseurs, bailleurs et gouvernements — offre distincte de l'accompagnement des gestionnaires de réseau.",
      sousTitre: "Sécuriser les décisions d'investissement par l'analyse réseau, réglementaire et opérationnelle.",
      enBref: "Un projet de production peut-il évacuer son énergie ? Les échanges transfrontaliers sont-ils réalistes ? Le système SCADA/EMS livré est-il conforme au cahier des charges ? BetaPower apporte une évaluation indépendante qui croise les trois dimensions qui font échouer les projets : réseau, réglementation, exploitation.",
      ceQueCouvreOffre: [
        "Due diligence technique et réglementaire de projets de production et d'export (évacuation, renforcements, équilibre offre-demande, tarifs).",
        "Rédaction et revue de clauses techniques de PPA (énergie non fournie / non utilisée).",
        "Assistance technique à des GRT pour le compte de bailleurs internationaux.",
        "Supervision et évaluation de recettes (SAT) de systèmes SCADA/EMS.",
        "Réponses techniques à appels d'offres et pilotage de lots en consortium.",
      ],
      livrablesTypes: "rapport de due diligence · clauses techniques de PPA · rapports de recette SAT · réponses techniques d'appel d'offres.",
      exemplesMissions: [
        "Due diligence technique et réglementaire des PPA (domestiques et export) d'un projet hydroélectrique de plusieurs gigawatts, pour le compte d'un gouvernement.",
        "Évaluation de la conformité des essais de recette (SAT) d'un système SCADA/EMS, pour le compte d'une banque multilatérale de développement.",
        "Analyse réglementaire et spécifications d'une plateforme digitale du secteur électrique.",
      ],
    },
  },
}
