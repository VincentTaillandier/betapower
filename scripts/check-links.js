#!/usr/bin/env node
// Post-build internal link validator for Next.js static export (trailingSlash: true).
// Crawls out/, extracts all internal hrefs from HTML, verifies each target exists.
// Exits 1 if any broken link is found — use as a CI gate after `next build`.

const fs = require('fs')
const path = require('path')

const OUT_DIR = path.resolve(__dirname, '..', 'out')

function* walkHtml(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walkHtml(full)
    else if (entry.name.endsWith('.html')) yield full
  }
}

function extractHrefs(html) {
  const hrefs = []
  const re = /\shref="([^"]+)"/g
  let m
  while ((m = re.exec(html)) !== null) hrefs.push(m[1])
  return hrefs
}

// Extensions that are assets, not HTML pages — skip them
const ASSET_EXT = /\.(css|js|mjs|woff2?|ttf|otf|eot|png|jpe?g|gif|svg|ico|webp|avif|mp4|webm|txt|xml|json|pdf|zip)(\?|$)/i

function isSkipped(href) {
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#') ||
    href.startsWith('/_next/') || // Next.js build assets
    ASSET_EXT.test(href)           // static file references
  )
}

// Resolve an internal href to the expected filesystem path in out/.
// Returns null if the href cannot be checked (relative, data:, etc.).
function resolveTarget(href) {
  // Strip hash and query string
  const clean = href.split('#')[0].split('?')[0]
  if (!clean) return null
  if (!clean.startsWith('/')) return null // relative link — skip

  if (clean === '/') return path.join(OUT_DIR, 'index.html')

  // With trailingSlash: true, every page is out/<path>/index.html
  const withSlash = clean.endsWith('/') ? clean : clean + '/'
  return path.join(OUT_DIR, withSlash, 'index.html')
}

if (!fs.existsSync(OUT_DIR)) {
  console.error('ERROR: out/ directory not found — run `next build` first.')
  process.exit(1)
}

let broken = 0
const checked = new Set()

for (const htmlFile of walkHtml(OUT_DIR)) {
  const html = fs.readFileSync(htmlFile, 'utf8')
  const source = '/' + path.relative(OUT_DIR, htmlFile).replace(/\\/g, '/')

  for (const href of extractHrefs(html)) {
    if (isSkipped(href)) continue
    const target = resolveTarget(href)
    if (!target) continue

    const key = href
    if (checked.has(key)) continue
    checked.add(key)

    if (!fs.existsSync(target)) {
      const rel = path.relative(OUT_DIR, target).replace(/\\/g, '/')
      console.error(`BROKEN  href="${href}"  (from ${source})  →  out/${rel} not found`)
      broken++
    }
  }
}

if (broken > 0) {
  console.error(`\n${broken} broken internal link(s). Fix before deploying.`)
  process.exit(1)
}

console.log(`✓ ${checked.size} internal link(s) verified — none broken.`)
