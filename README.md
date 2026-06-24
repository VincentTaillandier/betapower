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
