'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

interface Projet {
  slug: string
  title: string
  description?: string
  date?: string
  client?: string
  skills?: string[]
}

const milestones = [
  { date: 'Juin 2025',  label: 'Création de BetaPower' },
  { date: '2025',       label: 'Première mission RTE international' },
  { date: '2026',       label: 'Prochain jalon à venir' },
]

function ProjectCard({ projet }: { projet: Projet }) {
  const skills = Array.isArray(projet.skills) ? projet.skills : []
  const hasPage = !!projet.slug

  return (
    <div className="card group hover:shadow-md transition-all duration-200">
      {/* Year badge */}
      {projet.date && (
        <span
          className="inline-block text-xs font-bold uppercase tracking-wider mb-4 px-3 py-1 rounded-full"
          style={{ background: 'rgba(217,119,6,0.12)', color: '#D97706' }}
        >
          {projet.date}
        </span>
      )}

      {/* Client tag */}
      {projet.client && (
        <p className="text-sm font-medium mb-3" style={{ color: '#407489' }}>
          {projet.client}
        </p>
      )}

      <h3 className="text-gray-900 mb-4" style={{ fontSize: '1.15rem', fontWeight: 600 }}>
        {projet.title}
      </h3>

      {projet.description && (
        <p className="text-gray-500 text-sm leading-relaxed mb-5">{projet.description}</p>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {skills.map((s) => (
            <span
              key={s}
              className="text-xs px-2.5 py-1 rounded-full border border-gray-200 text-gray-500"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {hasPage && (
        <Link
          href={`/projets/${projet.slug}`}
          className="text-sm font-medium text-betapower-azure group-hover:underline"
        >
          En savoir plus →
        </Link>
      )}
    </div>
  )
}

export default function ProjetsContent({ projets }: { projets: Projet[] }) {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-betapower-darkblue flex items-center" style={{ minHeight: 300 }}>
        <div className="max-w-6xl mx-auto w-full px-6 lg:px-16 py-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <h1 className="text-white mb-4">Projets &amp; Réalisations</h1>
            <p className="text-white/60 text-lg" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
              Des missions concrètes, des résultats mesurables.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Mobile: simple stack */}
          <div className="lg:hidden space-y-8">
            {projets.map((projet) => (
              <motion.div
                key={projet.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
              >
                <ProjectCard projet={projet} />
              </motion.div>
            ))}
          </div>

          {/* Desktop: alternating timeline */}
          <div className="hidden lg:block relative">
            {/* Vertical line */}
            <div
              className="absolute top-0 bottom-0 w-px"
              style={{ left: '50%', transform: 'translateX(-50%)', background: 'rgba(64,116,137,0.25)' }}
            />

            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              {projets.map((projet, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={projet.slug}
                    className="relative grid grid-cols-2 gap-0 mb-16"
                    variants={fadeUp}
                    transition={{ duration: 0.85, ease: 'easeOut' }}
                  >
                    {/* Dot on central line */}
                    <div
                      className="absolute w-4 h-4 rounded-full border-4 border-white z-10"
                      style={{
                        background: '#D97706',
                        left: '50%',
                        top: '2rem',
                        transform: 'translateX(-50%)',
                      }}
                    />

                    {/* Left slot */}
                    <div className="pr-12">
                      {isLeft && <ProjectCard projet={projet} />}
                    </div>

                    {/* Right slot */}
                    <div className="pl-12">
                      {!isLeft && <ProjectCard projet={projet} />}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── JALONS ───────────────────────────────────────────── */}
      <section className="bg-betapower-bg py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="mb-14"
          >
            <h2 className="text-gray-900 mb-3">Jalons BetaPower</h2>
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
              Construction en public — voici comment BetaPower grandit.
            </p>
          </motion.div>

          {/* Horizontal timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden sm:block absolute top-5 left-0 right-0 h-px bg-betapower-azure/25" />

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {milestones.map(({ date, label }) => (
                <motion.div
                  key={date}
                  className="relative flex flex-col items-start sm:items-center sm:text-center"
                  variants={fadeUp}
                  transition={{ duration: 0.85, ease: 'easeOut' }}
                >
                  {/* Dot */}
                  <div
                    className="w-3 h-3 rounded-full mb-4 shrink-0"
                    style={{ background: '#407489' }}
                  />
                  <p className="text-xs font-bold text-betapower-gold uppercase tracking-wider mb-1">{date}</p>
                  <p className="text-gray-600 text-sm">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-betapower-darkblue py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          <p className="text-white text-xl mb-8" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
            Votre projet pourrait être le prochain.
          </p>
          <Link href="/contact" className="btn-primary">
            Contactez-nous
          </Link>
        </motion.div>
      </section>
    </>
  )
}
