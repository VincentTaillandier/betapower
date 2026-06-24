#!/usr/bin/env node
// Model integrity validator — runs post-build (requires out/ to exist).
// Checks:
//   1. offresLiees[].offreId must match an offre.id (built out/offres/<id>/ exists)
//   2. front-matter slug must equal the filename (source of truth = filename)
// Exits 1 on any error — use as a CI gate after `next build`.

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const CONTENT_DIR = path.resolve(__dirname, '..', 'content', 'projects')
const OUT_OFFRES_DIR = path.resolve(__dirname, '..', 'out', 'offres')

if (!fs.existsSync(OUT_OFFRES_DIR)) {
  console.error('ERROR: out/offres/ not found — run `next build` first.')
  process.exit(1)
}

// Valid offer IDs = directories in out/offres/ (built from offresData)
const validOffreIds = new Set(
  fs.readdirSync(OUT_OFFRES_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
)

let errors = 0

for (const file of fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'))) {
  const filename = file.replace(/\.md$/, '')
  const { data } = matter(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8'))

  // Check 1: front-matter slug must match filename
  if (data.slug !== undefined && data.slug !== filename) {
    console.error(`MISMATCH  ${file}: front-matter.slug="${data.slug}" ≠ filename="${filename}"`)
    errors++
  }

  // Check 2: each offresLiees[].offreId must be a valid offre.id
  if (Array.isArray(data.offresLiees)) {
    for (const ref of data.offresLiees) {
      if (ref.slug !== undefined) {
        console.error(`LEGACY_FIELD  ${file}: offresLiees uses deprecated "slug" field — rename to "offreId"`)
        errors++
        continue
      }
      if (ref.offreId === undefined) {
        console.error(`MISSING_FIELD  ${file}: offresLiees entry has no "offreId" field`)
        errors++
        continue
      }
      if (!validOffreIds.has(ref.offreId)) {
        console.error(`BROKEN_REF  ${file}: offresLiees.offreId="${ref.offreId}" does not match any offre.id`)
        errors++
      }
    }
  }
}

if (errors > 0) {
  console.error(`\n${errors} model error(s) found. Fix before deploying.`)
  process.exit(1)
}

console.log(`✓ Model validated — offresLiees.offreId and front-matter slugs are consistent.`)
