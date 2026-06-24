# Content & Routing

> **Trigger:** Read this before any change to content, routing, offres/projects data, or the sitemap.

## Offres — TypeScript Data Model

Source of truth: `lib/offres.ts`.

**Structure:**
```
offresData: OffresData
  .operer   → Pillar  (3 offres: etudes-reseau, conseil-operationnel, audit-exploitation)
  .former   → Pillar  (3 offres: formation-operateurs, codes-reseau-conformite, projets-internationaux-due-diligence)
  .digitaliser → Pillar (2 offres: ots-ingenierie-scenarios, donnees-cgmes-automatisation)
```

Each `Offre` has:
- `id` — URL slug and cross-reference key (e.g. `"etudes-reseau"`)
- `title`, `badge?`, `versionCourte` (card text)
- `versionDetaillee` — rich detail object with optional fields

Each `Pillar` has `pillarTitle`, `pillarDescription`, `icon` (react-icons/pi), `offres[]`.

Shared pillar descriptions are exported separately as `pillarDescriptions` for reuse on the home page.

**Why not Markdown for offres:** Offres contain structured data (arrays, nested objects) and React icons. Markdown cannot express this without a custom parser. Reassess only when implementing i18n, which would require a language-keyed data store anyway.

## Projects — Markdown Front-Matter

Source: `content/projects/*.md`. Loaded by `lib/projects.ts` via `lib/markdown.ts`.

**Required front-matter fields:**
```yaml
slug: "filename-without-extension"   # must match filename exactly
title: "…"
description: "…"
client: "…"
date: "YYYY"
skills: ["…", "…"]
contexteSummary: "…"
offresLiees:
  - offreId: "etudes-reseau"          # must match an offre.id
    label: "Voir l'offre \"…\""
```

`offresLiees` is optional; `slug` field is optional in front-matter (filename is the source of truth), but if present it must equal the filename.

## ID / Slug Integrity — Validation at Postbuild

`scripts/validate-model.js` runs automatically after every `npm run build` (via `postbuild`). It:
1. Reads every `.md` in `content/projects/`
2. Checks that `front-matter.slug` (if present) equals the filename
3. Checks that every `offresLiees[].offreId` matches a directory in `out/offres/` (i.e. a built offre page)

**Errors exit with code 1** — the build fails. Fix the `offreId` reference or rename the file to match.

## Internal Link Validation

`scripts/check-links.js` also runs in `postbuild`. It crawls `out/` for all `href` attributes and verifies each internal link resolves to an `out/<path>/index.html` file.

**Common causes of broken links:**
- Linking to `/offres/etudes-reseau` instead of `/offres/etudes-reseau/` (missing trailing slash)
- Deleting an offre or project without updating references

## Trailing Slash Rules

`trailingSlash: true` in `next.config.ts` means every page is served as `out/<path>/index.html`.

- Internal links: always end with `/` → `<Link href="/offres/">`, `<Link href="/projets/mon-projet/">`
- Anchor links: slash before hash → `/offres/#operer` not `/offres#operer`
- `lib/seo.ts:canonical()` enforces this for metadata

## Routing Structure

```
app/
  page.tsx                    → /
  offres/page.tsx             → /offres/
  offres/[slug]/page.tsx      → /offres/<offre.id>/   (static, from offresData)
  projets/page.tsx            → /projets/
  projets/[slug]/page.tsx     → /projets/<filename>/  (static, from content/projects/)
  a-propos/page.tsx           → /a-propos/
  contact/page.tsx            → /contact/
  confidentialite/page.tsx    → /confidentialite/
```

All routes are statically generated at build time (`generateStaticParams`).

## Sitemap

`app/sitemap.ts` generates `/sitemap.xml`. The `lastmod` date must come from git history or front-matter — **never `new Date()`** (would make every deploy change all lastmod dates, hurting crawl budget).
