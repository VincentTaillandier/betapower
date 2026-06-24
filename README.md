# BetaPower

Site vitrine B2B — expertise en exploitation des réseaux électriques (études de réseau, formation opérateurs, simulateurs OTS, codes ENTSO-E, automatisation CGMES).

**Stack:** Next.js 16 · React 19 · Tailwind 4 · TypeScript · App Router · Static Export  
**Hosting:** Netlify (SSG, `output: "export"`)

## Development

```bash
npm run dev          # dev server → http://localhost:3000
npm run build        # production build + link check + model validation
npm run lint         # eslint
ANALYZE=true npm run build   # bundle analysis
```

`npm run build` runs `next build` then automatically:
- `scripts/check-links.js` — verifies all internal links in `out/`
- `scripts/validate-model.js` — verifies `offresLiees[].offreId` references and slug consistency

## Project Structure

```
app/                    # Next.js App Router pages
components/             # React components (one per page + shared)
lib/                    # Data (offres.ts) and utilities (seo.ts, projects.ts, …)
content/projects/       # Project case studies in Markdown
netlify/functions/      # Serverless functions (contact form via Resend)
public/_headers         # Security headers (single source of truth)
scripts/                # Post-build validators
docs/                   # On-demand knowledge files (read triggers in AGENTS.md)
```

## Tweaking animations

All animations are driven by a single CSS class `.animate-fade-in-up` defined in `app/globals.css`. Stagger delays are inline `style` props scattered across component files.

### Keyframe parameters (`app/globals.css`)

```css
.animate-fade-in-up {
  animation: fadeInUp 1.1s cubic-bezier(0.33, 1, 0.68, 1) both;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(18px) scale(0.98); filter: blur(4px); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0);   }
}
```

| Parameter | Current value | Effect of increasing |
|---|---|---|
| Duration (`1.1s`) | — | Longer = slower overall feel |
| Easing (`cubic-bezier(0.33, 1, 0.68, 1)`) | cubic ease-out | Lower first two numbers = faster start (snappier); higher = more gradual |
| `translateY` (`18px`) | — | More px = larger upward travel |
| `blur` (`4px`) | — | More px = heavier optical effect on entry |
| `scale` (`0.98`) | — | Lower = more pronounced zoom-in on entry |

> **LCP rule:** never add `animate-fade-in-up` to `<h1>` or its direct wrapper. See `docs/animations-and-perf.md`.

### Stagger delays by component

| Context | Multiplier / fixed | File |
|---|---|---|
| Home hero — description | `120ms` | `components/HomeContent.tsx` |
| Home hero — CTA buttons | `240ms` | `components/HomeContent.tsx` |
| Home hero — proof points | `380ms` | `components/HomeContent.tsx` |
| Home — pillar cards | `× 150ms` per card | `components/HomeContent.tsx` |
| Offres — offre cards per pillar | `× 110ms` per card | `components/OffresContent.tsx` |
| À propos — valeurs grid | `× 120ms` per item | `components/AProposContent.tsx` |
| À propos — expertise grid | `× 120ms` per item | `components/AProposContent.tsx` |
| Contact — form reveal | `200ms` | `components/ContactContent.tsx` |
| Projets — project cards | `× 180ms` per card | `components/ProjetsContent.tsx` |

## Guide de modification du contenu

Les fichiers de données sont tous dans `lib/`. Pas de CMS : chaque modification est un commit. Après modification, lancer `npm run build` pour valider avant de pousser.

---

### Page Home — `lib/home.ts`

#### Bandeau de preuves (4 lignes sous le hero)

```ts
// lib/home.ts
export const proofPoints = [
  "3 ans de conduite opérationnelle du réseau THT en centre exploitation chez RTE",
  "Pilotage de projets pour des GRT, RCC, régulateurs et bailleurs de fonds internationaux",
  "...",
  "10+ pays d'intervention — Europe, Afrique, Asie centrale, Moyen-Orient, Pacifique",
]
```

Quatre chaînes simples, une par ligne. Texte court (une phrase max). Pas de mise en forme possible ici.

#### Cartes "Nos domaines d'expertise" (liens vers Offres)

```ts
export const pillars: PillarHome[] = [
  {
    title: "Opérer.",           // titre en gras de la carte
    description: "Études de réseau, procédures opérationnelles…",  // texte sous le titre
    href: "/offres/#operer",    // NE PAS MODIFIER — lien ancre vers la section offres
    icon: PiEngine,             // icône (voir lib/offres.ts pour la liste)
  },
  …
]
```

`title` et `description` sont les seuls champs à modifier. `href` doit rester synchronisé avec l'`id` de la section dans `/offres/`.

---

### Page Offres — `lib/offres.ts`

Chaque offre a deux niveaux de contenu.

#### Version simplifiée — carte sur `/offres/`

```ts
{
  id: "etudes-reseau",         // NE PAS MODIFIER — c'est le slug de l'URL /offres/etudes-reseau/
  title: "Études de réseau",   // titre de la carte (h3)
  versionCourte: "Comprendre le comportement de votre réseau…",  // corps de la carte (1 paragraphe)
}
```

`versionCourte` est un texte plat — pas de liste, pas de gras. Viser 2–4 phrases.

#### Version détaillée — page `/offres/[slug]/`

Tous les champs sont **optionnels** : un champ absent = la section n'apparaît pas sur la page.

```ts
versionDetaillee: {
  titre: "Études de réseau et analyses de sécurité",  // h1 de la page
  sousTitre: "Des études opérationnelles, reproductibles…",  // accroche sous le h1

  // ── Sections de contenu (dans l'ordre d'affichage) ──────────────────
  contexte: "…",               // paragraphe sans titre (intro contextuelle)
  objectif: "…",               // paragraphe — titre affiché : "Objectif"
  ceQueNousFaisons: ["…", "…"],  // liste à puces — titre : "Ce que nous faisons"
  expertiseApportee: ["…"],    // liste à puces — titre : "Expertise apportée"
  domainesCouverts: "…",       // paragraphe — titre : "Domaines couverts"
  secteursConcernes: "…",      // paragraphe — titre : "Secteurs concernés"
  formats: ["…", "…"],         // liste à puces — titre : "Formats"
  themes: ["…"],               // liste à puces — titre : "Thèmes"
  publicsCibles: "…",          // paragraphe — titre : "Publics cibles"
  derouleType: ["**Étape 1** : …", "**Étape 2** : …"],  // liste — titre : "Déroulé type" (gras supporté)
  livrablesTypes: ["…", "…"],  // liste OU chaîne unique — titre : "Livrables types"
  plusValueClient: "…",        // paragraphe — titre : "Plus-value client"
  beneficesClient: ["…"],      // liste — titre : "Bénéfices client"
  resultatsAttendus: ["…"],    // liste — titre : "Résultats attendus"
  casDusage: ["…"],            // liste — titre : "Cas d'usage"
  exempleMissions: ["…"],      // liste — titre : "Exemples de missions"
  references: ["…"],           // liste — titre : "Références"
}
```

#### Titres de piliers et descriptions

```ts
// Description courte affichée sous le titre de chaque pilier (partagée avec la Home)
export const pillarDescriptions = {
  operer: "Études de réseau, procédures opérationnelles…",
  former: "Formation des dispatchers…",
  digitaliser: "Configuration de simulateurs…",
}

// Dans offresData, chaque pilier a aussi :
operer: {
  pillarTitle: "Opérer.",          // h2 de la section
  pillarDescription: pillarDescriptions.operer,  // texte sous le h2
  …
}
```

---

### Page À propos — `lib/apropos.ts`

#### Valeurs (3 colonnes)

```ts
export const valeurs: Valeur[] = [
  {
    titre: "Excellence",          // titre en doré (h3)
    texte: "Chaque mission…",     // paragraphe sous le titre
  },
  …
]
```

Ajouter une valeur = ajouter un objet `{ titre, texte }` dans le tableau. La grille s'adapte automatiquement (elle est en `grid-cols-3` — au-delà de 3 items, ils passeront à la ligne).

#### Domaines d'expertise (6 cartes en grille 2×3)

```ts
export const expertises: Expertise[] = [
  {
    icon: PiBroadcast,            // icône (Phosphor Icons — préfixe Pi)
    title: "Exploitation et conduite des réseaux HTB / HTA",  // titre de la carte
    desc: "Analyse, exploitation…",  // description (1–3 phrases)
  },
  …
]
```

La grille est en `grid-cols-2` — les items doivent rester par paires pour garder l'équilibre visuel.

#### Texte fondateur (paragraphes du haut)

Texte figé dans le composant — modifier directement dans `components/AProposContent.tsx`, lignes 22–39. Ce sont trois balises `<p>` successives.

---

### Projets — `content/projects/*.md`

Chaque projet est un fichier Markdown. Le nom du fichier **est** le slug de l'URL (`/projets/mon-projet/`).

#### En-tête (front-matter)

```yaml
---
slug: "appui-deploiement-simulateur"   # doit correspondre au nom du fichier (sans .md)
title: "Appui au déploiement d'un simulateur de réseau"
description: "Courte description (meta SEO et carte projet)"
client: "Rte international"
date: "2026"                           # année uniquement
skills: ["Simulateur OTS", "Python"]  # badges affichés sur la carte
contexteSummary: "Phrase résumé affichée sur la carte projet"
offresLiees:
  - offreId: "ots-ingenierie-scenarios"   # doit correspondre à un offre.id existant
    label: "Voir l'offre \"Simulateurs de conduite\""
---
```

`offresLiees` est optionnel. Si présent, `offreId` doit matcher exactement un `id` dans `lib/offres.ts` — le build échoue sinon.

#### Corps du projet (Markdown libre)

```markdown
## Contexte

Un paragraphe de contexte.

## Enjeux

- Premier enjeu
- Deuxième enjeu

## Notre intervention

- **Phase 1 : Configuration** : description de la phase.
- **Phase 2 : Recette** : description.

## Résultats

- Résultat concret 1.
- Résultat concret 2.
```

Les sections (`## Titre`) sont libres — utiliser celles qui font sens. Le Markdown est rendu tel quel.

#### Ajouter un projet

1. Créer `content/projects/mon-nouveau-projet.md` avec le front-matter complet.
2. Vérifier que `slug` dans le front-matter = nom du fichier.
3. `npm run build` — le validateur confirme les références.

#### Supprimer un projet

Supprimer le fichier `.md`. Si d'autres fichiers référencent son slug, le validateur de liens le détectera au build.

---

### Conseils de mise en forme

#### Listes à puces (champs `array` dans `lib/offres.ts`)

```ts
// Ajouter un item : ajouter une chaîne au tableau
ceQueNousFaisons: [
  "Calculs de répartition (load flow) et analyses de sécurité N-1.",
  "Nouvelle ligne ajoutée.",        // ← ajout
]

// Supprimer : retirer la chaîne (attention à la virgule de l'item précédent)
ceQueNousFaisons: [
  "Calculs de répartition (load flow) et analyses de sécurité N-1.",
  // "Ligne supprimée",             // ← retirer ou commenter
]
```

#### Gras dans une liste (`derouleType`, corps Markdown)

Dans `derouleType` : utiliser `**texte**` à l'intérieur d'une chaîne.

```ts
derouleType: [
  "**Cadrage** : périmètre, référentiels, accès documentaire.",
  "**Analyse documentaire** : procédures, consignes, REX.",
]
```

Dans le Markdown des projets : syntaxe Markdown standard `**texte**`.

#### Paragraphe vs liste — quand choisir

| Format | Utiliser quand… |
|---|---|
| Paragraphe (`string`) | Texte continu, contexte narratif, 1–3 phrases |
| Liste (`string[]`) | Éléments indépendants, énumération de livrables, étapes séquentielles |

#### Transformer un paragraphe en liste (dans `versionDetaillee`)

Remplacer la `string` par un `string[]` :

```ts
// Avant (paragraphe)
livrablesTypes: "Rapport d'étude · modèles CGMES · scripts Python",

// Après (liste à puces)
livrablesTypes: [
  "Rapport d'étude argumenté",
  "Modèles CGMES livrés et documentés",
  "Scripts Python livrés",
],
```

#### Longueurs recommandées

| Zone | Longueur cible |
|---|---|
| `versionCourte` (carte offre) | 2–4 phrases, ~40–80 mots |
| `contexte` / `objectif` | 2–4 phrases |
| Item de liste | 1 phrase, max 25 mots |
| `proofPoints` (home) | 1 ligne, max 12 mots |
| `desc` (expertise) | 2–3 phrases |
| `texte` (valeur) | 3–4 phrases |

## Key constraints

- **Static export only** — no API routes, no SSR. Contact form → `netlify/functions/contact.js`.
- **No framer-motion** — animations are CSS-only.
- **trailingSlash: true** — all internal links must end with `/`.

See `AGENTS.md` for the full list of non-negotiable rules and quality gates.

## Deployment

Hosted on Netlify. Every push to `main` triggers a deploy. Validate on the Netlify Deploy Preview before merging.

Required env vars (set in Netlify dashboard):
- `RESEND_API_KEY`
- `TURNSTILE_SECRET_KEY`
- `TURNSTILE_SITE_KEY`
