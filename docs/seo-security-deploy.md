# SEO, Security Headers & Deployment

> **Trigger:** Read this before any change to SEO metadata, headers/CSP, the contact form, or Netlify configuration.

## Metadata Structure

Central helpers in `lib/seo.ts`:
- `SITE_URL = 'https://betapower.fr'`
- `SITE_NAME = 'BetaPower'`
- `DEFAULT_OG_IMAGE = '${SITE_URL}/images/betapower_logo.png'`
- `canonical(path)` — returns absolute URL with trailing slash

**Layout-level metadata** (`app/layout.tsx`):
```ts
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { template: `%s — ${SITE_NAME}`, default: `${SITE_NAME} — …` },
  description: '…',
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: { type: 'website', locale: 'fr_FR', … },
}
```

**Per-page metadata** — every page must export `generateMetadata` (or a static `export const metadata`) with a unique `title` and `description`. The `title` flows into the template automatically. The `canonical` must use `canonical('/path/')` from `lib/seo.ts`.

**i18n extension point** — `lib/seo.ts` has a commented `hreflang()` stub. When launching EN/ES, uncomment it and add `alternates.languages` to each page's metadata. The layout already has a comment marking the extension point.

**JSON-LD** — Organization schema is injected in `app/layout.tsx`. Page-level schemas (Article, BreadcrumbList) go in the relevant page component.

## Security Headers

**Single source of truth: `public/_headers`**

Next.js copies `public/_headers` to `out/_headers` at build time. Netlify reads `out/_headers` at serve time. There are no `[[headers]]` blocks in `netlify.toml`.

Current headers applied to `/*`:
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000          # no preload yet
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
X-XSS-Protection: 0                                  # disabled (deprecated)
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; object-src 'none'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'
```

**Why `'unsafe-inline'` in CSP:**
- `script-src`: Next.js App Router (static export) injects inline `<script>` blocks for RSC payload (`__next_f`). Nonce-based CSP requires server-side rendering — impossible here.
- `style-src`: React renders `style=""` attributes inline (Next.js Image, animation delays, font variables).

**Why no nonce:** Nonces require generating a unique value per request server-side. This site is 100% static — there is no per-request server execution.

**To add HSTS preload** (future): add `; preload` to the HSTS header and submit to hstspreload.org. Do not do this until the domain is permanently on HTTPS with no exceptions.

## Contact Form — Netlify Function + Resend + Turnstile

Architecture:
1. `components/ContactContent.tsx` — form UI, calls `/.netlify/functions/contact` via `fetch()`
2. `netlify/functions/contact.js` — validates Turnstile token, sends email via Resend API
3. No Next.js API route involved — static export makes them impossible

**Required environment variables** (set in Netlify dashboard, not committed):
- `RESEND_API_KEY` — Resend API key (EU region endpoint used in the function)
- `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret
- `TURNSTILE_SITE_KEY` — Turnstile site key (used client-side in ContactContent)

RGPD requirements already in place:
- Turnstile widget (not reCAPTCHA — no Google data processing)
- Consent checkbox + link to `/confidentialite/` in the form
- No email addresses stored; Resend is transactional only

## Netlify Configuration

`netlify.toml`:
- `[build]`: command = `npm run build`, publish = `out`, Node 20
- `[functions]`: directory = `netlify/functions`, bundler = esbuild
- `[[redirects]]`: www → non-www, http → https (all 301 force)

**What is NOT in netlify.toml:** security headers (they are in `public/_headers`).

## 301 Redirects

All canonical domain redirects are in `netlify.toml`:
- `https://www.betapower.fr/*` → `https://betapower.fr/:splat`
- `http://www.betapower.fr/*` → `https://betapower.fr/:splat`
- `http://betapower.fr/*` → `https://betapower.fr/:splat`

For page-level redirects (renamed routes, old URLs), add `[[redirects]]` blocks to `netlify.toml`.
