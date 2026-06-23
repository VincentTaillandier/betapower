---
slug: "migration-scenarios-formation"
title: "Migration de scénarios de formation"
description: "Création de 100 scénarios de formation sur le nouveau simulateur du réseau pour la formation des opérateurs d'un gestionnaire de réseau."
client: "Rte international"
date: "2025"
skills: ["Simulateur OTS", "Python", "CGMES/CIM", "Automatisation", "Formation"]
contexteSummary: "Création et migration de 100 scénarios de formation sur simulateur OTS pour entraîner les dispatchers d'un gestionnaire de réseau."
offresLiees:
  - slug: "ots-ingenierie-scenarios"
    label: "Voir l'offre \"Simulateurs de conduite\""
  - slug: "formation-operateurs"
    label: "Voir l'offre \"Formation\""
---

## Contexte

RTE, gestionnaire du réseau de transport français, renouvelle le simulateur de conduite utilisé pour l'entraînement de ses dispatchers. Ce simulateur — un Operator Training System (OTS) — reproduit l'environnement temps réel d'un centre de conduite : écrans de supervision, alarmes, manœuvres sur le réseau. Il permet de mettre les opérateurs en situation sur des incidents, régimes dégradés et scénarios de reconstitution du réseau après blackout.

## Enjeux

- Continuité de la formation des opérateurs pendant la transition : les dispatchers doivent continuer à s'entraîner, même si l'ancien simulateur est en fin de vie.
- Scénarios extrêmes réalistes : blackout généralisé et reconstitution du réseau français, situations que les opérateurs ne rencontreront (espérons-le) jamais en réel, mais pour lesquelles ils doivent être prêts.
- Qualité et cohérence des données réseau : un scénario n'est utile que si la physique du réseau simulé est réaliste (calculs de répartition, tensions, stabilité).
- Documentation et maintenabilité : les scénarios doivent pouvoir être rejoués, adaptés et enrichis par les équipes internes dans la durée.

## Notre intervention

- **Transfert et réimplémentation** : Transfert et réimplémentation de scénarios existants depuis l'ancien simulateur vers le nouveau, avec adaptation aux nouvelles interfaces et au nouveau moteur de calcul.
- **Création de scénarios nouveaux** : Blackout généralisé sur plusieurs régions, reconstitution progressive du réseau, gestion d'incidents en cascade, défaillances d'interconnexions.
- **Construction des situations de réseau** : Topologies, productions, charges au format CIM/CGMES, validées en calcul de répartition pour garantir la cohérence électrique.
- **Automatisation** : Développement de scripts Python pour extraire, transformer et injecter les situations de réseau dans la base de données du simulateur, évitant la saisie manuelle et les erreurs.
- **Documentation complète** : Des scénarios (objectifs pédagogiques, déroulement, points d'attention pour le formateur) et livraison des scripts d'automatisation à RTE.

## Résultats

- Un patrimoine de scénarios opérationnel sur le nouveau simulateur, permettant la continuité de la formation des dispatchers sans interruption.
- Des situations de blackout et de reconstitution réalistes, permettant d'entraîner les équipes à des gestes critiques qu'elles ne pratiquent jamais en conduite normale.
- Des scénarios documentés, maintenables et évolutifs : RTE dispose des scripts et de la méthodologie pour créer de nouveaux scénarios en autonomie.
- Un gain de temps significatif sur la production de futurs scénarios grâce à l'automatisation de l'ingénierie des données.

## Défis techniques

### Cohérence électrique des situations simulées

Le principal défi technique tenait à la cohérence électrique des situations simulées. Un scénario de formation n'a de valeur que si le réseau se comporte de manière réaliste : les tensions doivent être dans les plages attendues, les flux de puissance cohérents avec les lois physiques, les bilans production-consommation équilibrés. Cela impose de construire chaque situation en partant d'un calcul de répartition validé (load flow), puis de modéliser les événements (déclenchements, manœuvres) de manière à ce que le simulateur les rejoue fidèlement.

### Industrialisation de la création

Le second défi était d'ordre opérationnel : comment industrialiser la création de ces situations, alors que le processus historique reposait sur de la saisie manuelle, longue et source d'erreurs ? La réponse a été de développer des chaînes d'automatisation en Python, s'appuyant sur des frameworks open source de manipulation de modèles CGMES et sur les APIs du simulateur. Résultat : ce qui prenait plusieurs jours de travail fastidieux se fait désormais en quelques heures, de manière reproductible et traçable.

### Dimension pédagogique

Enfin, la dimension pédagogique : un bon scénario n'est pas seulement techniquement correct, il doit aussi raconter une histoire cohérente, mettre l'opérateur en difficulté de manière progressive, et permettre au formateur de débriefer efficacement. C'est cette combinaison — rigueur technique, industrialisation, et sens pédagogique forgé en salle de conduite — qui a permis de livrer des scénarios à la fois réalistes, jouables et documentés.
