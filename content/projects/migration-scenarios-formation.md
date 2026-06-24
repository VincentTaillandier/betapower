---
slug: "migration-scenarios-formation"
title: "Migration de scénarios de formation"
description: "Migration et création de 100 scénarios de formation sur un nouveau simulateur de conduite, pour l'entraînement des opérateurs d'un gestionnaire de réseau de transport."
client: "Rte international"
date: "2025"
skills: ["Python", "CIM/CGMES", "Automatisation", "Formation"]
contexteSummary: "Création et migration de 100 scénarios de formation sur simulateur OTS pour entraîner les dispatchers d'un gestionnaire de réseau."
offresLiees:
  - offreId: "ots-ingenierie-scenarios"
    label: "Voir l'offre « Simulateurs de conduite (OTS) »"
  - offreId: "formation-operateurs"
    label: "Voir l'offre « Formation des opérateurs »"
---

## Contexte

Un grand gestionnaire de réseau de transport européen renouvelle le simulateur de conduite utilisé pour l'entraînement de ses dispatchers. Ce simulateur — un Operator Training System (OTS) — reproduit l'environnement temps réel d'un centre de conduite : écrans de supervision, alarmes, manœuvres sur le réseau. Il met les opérateurs en situation sur des incidents, des régimes dégradés et des scénarios de reconstitution après blackout. Mandatée par RTE International, BetaPower prend en charge la migration et la création des scénarios de formation.

## Enjeux

- Continuité de la formation pendant la transition : les opérateurs doivent continuer à s'entraîner, même lorsque l'ancien simulateur arrive en fin de vie.
- Scénarios extrêmes réalistes : blackout généralisé et reconstitution du réseau — des situations que les opérateurs ne rencontreront (espérons-le) jamais en réel, mais auxquelles ils doivent être préparés.
- Qualité et cohérence des données réseau : un scénario n'a de valeur que si la physique du réseau simulé est réaliste (calculs de répartition, tensions, stabilité).
- Documentation et maintenabilité : les scénarios doivent pouvoir être rejoués, adaptés et enrichis par les équipes internes dans la durée.

## Notre intervention

- **Transfert et réimplémentation** : reprise des scénarios existants depuis l'ancien simulateur vers le nouveau, avec adaptation aux nouvelles interfaces et au nouveau moteur de calcul.
- **Création de scénarios nouveaux** : blackout généralisé sur plusieurs régions, reconstitution progressive du réseau, incidents en cascade, défaillances d'interconnexions.
- **Construction des situations de réseau** : topologies, productions et charges au format CIM/CGMES, validées en calcul de répartition pour garantir la cohérence électrique.
- **Automatisation** : développement de scripts Python pour extraire, transformer et injecter les situations de réseau dans la base de données du simulateur — suppression de la saisie manuelle et des erreurs associées.
- **Documentation** : scénarios documentés (objectifs pédagogiques, déroulement, points d'attention pour le formateur) et livraison des scripts d'automatisation au client.

## Résultats

- Un patrimoine de scénarios opérationnel sur le nouveau simulateur, assurant la continuité de la formation sans interruption.
- Des situations de blackout et de reconstitution réalistes, permettant d'entraîner les équipes à des gestes critiques jamais pratiqués en conduite normale.
- Des scénarios documentés, maintenables et évolutifs : le client dispose des scripts et de la méthodologie pour créer de nouveaux scénarios en autonomie.
- Un gain de temps significatif sur la production de scénarios futurs grâce à l'automatisation de l'ingénierie des données.

## Défis techniques

**Cohérence électrique des situations simulées.** Le principal défi tenait à la cohérence électrique des situations simulées. Un scénario n'a de valeur que si le réseau se comporte de manière réaliste : tensions dans les plages attendues, flux de puissance cohérents avec les lois physiques, bilans production-consommation équilibrés. Chaque situation est donc construite à partir d'un calcul de répartition validé (load flow), puis les événements (déclenchements, manœuvres) sont modélisés pour que le simulateur les rejoue fidèlement.

**Industrialisation de la création.** Le second défi était opérationnel : industrialiser la création de ces situations, alors que le processus historique reposait sur une saisie manuelle, longue et source d'erreurs. La réponse a été de développer des chaînes d'automatisation en Python, s'appuyant sur des frameworks open source de manipulation de modèles CGMES et sur les API du simulateur. Résultat : ce qui prenait plusieurs jours de travail fastidieux se fait désormais en quelques heures, de manière reproductible et traçable.

**Dimension pédagogique.** Enfin, un bon scénario n'est pas seulement techniquement correct : il doit raconter une histoire cohérente, mettre l'opérateur en difficulté de manière progressive, et permettre au formateur de débriefer efficacement. C'est cette combinaison — rigueur technique, industrialisation et sens pédagogique forgé en salle de conduite — qui permet de livrer des scénarios à la fois réalistes, jouables et documentés.
