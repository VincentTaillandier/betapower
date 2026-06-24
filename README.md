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
