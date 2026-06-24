<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# BetaPower — Project Context

**Stack:** Next.js 16.2.7 · React 19 · Tailwind 4 · TypeScript · App Router  
**Hosting:** Netlify only (no `vercel.json`). `next.config.ts`: `output: "export"`, `trailingSlash: true`.  
**Language:** FR today (EN/ES planned — i18n-ready architecture already in place).

## Non-Negotiable Rules

1. **Static export only.** No `app/api/*` Route Handlers, no server middleware, no SSR/ISR. Contact form → `netlify/functions/contact.js` + Resend. Never add an API route.
2. **No framer-motion.** Permanently removed. Animations = CSS-only at mount (`animate-fade-in-up`) + IntersectionObserver + CSS transitions. Never reinstall. See `docs/animations-and-perf.md`.
3. **LCP rule (anti-regression).** Above-the-fold / hero elements must **never** start `opacity-0` toggled by JS. Use CSS-only animation only. Violation caused ~6 s LCP historically.
4. **Trailing slash.** All internal `<Link>` targets: `/path/` not `/path`. Anchors: `/offres/#operer` not `/offres#operer`.
5. **Content model.** Offres → TypeScript (`lib/offres.ts`, React icons). Projects → Markdown (`content/projects/*.md`). Do not migrate offres to Markdown.
6. **ID/slug integrity.** `offresLiees[].offreId` in project `.md` front-matter must match an existing `offre.id`. Project slug = filename (not front-matter). Both validated at postbuild.
7. **RGPD/security.** Turnstile (not reCAPTCHA). Resend EU region. All secrets in env vars only.
8. **SEO.** Unique `title`/`description` per page via `generateMetadata`. Canonical with trailing slash via `lib/seo.ts:canonical()`. `sitemap.ts` `lastmod` from git/content date — never `new Date()`.
9. **Headers/CSP.** Single source: `public/_headers` only. No `[[headers]]` in `netlify.toml`. No nonce (impossible in static export).

## Quality Gates — Run Before Every Commit

```bash
npm run build                                          # next build + check-links.js + validate-model.js
npm run lint                                           # eslint
grep -r "framer-motion" app/ components/ lib/          # must return 0 results
ANALYZE=true npm run build                             # only when touching bundle/code-split boundaries
```

`npm run build` covers TypeScript type-checking (via `next build`) + internal link validation + model integrity.

## Git Conventions

Format: `type(scope): description` — types: `fix feat perf chore refactor sec seo ui`  
Never commit a red build. Branch for risky tasks. Validate on Netlify Deploy Preview before merging.

## Read-Before-Touch Triggers

| Touching… | Read first |
|---|---|
| Any visual component, animation, or entry reveal | `docs/animations-and-perf.md` |
| Content, routing, offres/projects data, or sitemap | `docs/content-and-routing.md` |
| SEO, headers/CSP, contact form, or Netlify config | `docs/seo-security-deploy.md` |
| Historical content/editorial decisions | `docs/BetaPower_Contenu_Site_FINAL_v2.md` |
