'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PiBookOpenLight, PiEngine, PiLightbulb, PiShootingStar } from 'react-icons/pi'

const icons = [PiEngine, PiLightbulb, PiShootingStar, PiBookOpenLight]

const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}
const heroItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.4 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}

const stats = [
  { value: '7 ans',    label: "d'expérience" },
  { value: '2 projets', label: 'RTE international' },
  { value: 'HTB / HTA', label: 'réseaux maîtrisés' },
]

interface Offre {
  slug: string
  title: string
  description?: string
}

export default function HomeContent({ offres }: { offres: Offre[] }) {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col"
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        {/* Background photo + overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero-substation.jpg)' }}
        />
        <div className="absolute inset-0 bg-betapower-darkblue" style={{ opacity: 0.7 }} />

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-6xl mx-auto w-full px-6 lg:px-16 py-20">
            <motion.div variants={heroVariants} initial="hidden" animate="visible">

              <motion.p
                className="text-white/60 text-xs font-semibold tracking-[0.2em] mb-6 uppercase"
                variants={heroItem}
                transition={{ duration: 0.85, ease: 'easeOut' }}
              >
                Conseil &amp; Expertise en Énergie
              </motion.p>

              <motion.h1
                className="text-white max-w-3xl mb-7"
                style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)', lineHeight: 1.12 }}
                variants={heroItem}
                transition={{ duration: 0.85, ease: 'easeOut' }}
              >
                Relever les défis du système électrique de demain avec les acteurs du secteur.
              </motion.h1>

              <motion.p
                className="text-white/70 max-w-xl mb-10"
                style={{ fontSize: '1.125rem', lineHeight: 1.75 }}
                variants={heroItem}
                transition={{ duration: 0.85, ease: 'easeOut' }}
              >
                BetaPower accompagne opérateurs et industriels dans leurs projets de réseau,
                audits d&apos;infrastructure et stratégie énergie.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 items-center"
                variants={heroItem}
                transition={{ duration: 0.85, ease: 'easeOut' }}
              >
                <Link href="/contact" className="btn-primary">
                  Discutons de votre projet
                </Link>
                <Link
                  href="/projets"
                  className="text-white text-sm font-medium underline underline-offset-4 hover:text-white/70 transition-colors"
                >
                  Voir nos réalisations →
                </Link>
              </motion.div>

            </motion.div>
          </div>
        </div>

        {/* Stats band */}
        <div className="relative z-10 bg-betapower-darkblue/80 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 lg:px-16 py-7 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center py-4 sm:py-0">
                <p className="text-2xl font-bold text-betapower-gold">{value}</p>
                <p className="text-white/55 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOS OFFRES ──────────────────────────────────────────── */}
      <section className="bg-betapower-bg py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut', delay: 0.15 }}
            className="mb-12"
          >
            <h2 className="text-gray-900 mb-3">Nos offres</h2>
            <p className="text-gray-500 text-lg" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
              Un accompagnement sur mesure pour vos enjeux réseau.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {offres.map((offre, i) => {
              const Icon = icons[i % icons.length]
              return (
                <motion.div
                  key={offre.slug}
                  variants={cardVariants}
                  transition={{ duration: 0.85, ease: 'easeOut' }}
                >
                  <Link
                    href={`/offres/${offre.slug}`}
                    className="bg-white rounded-lg p-7 border border-gray-200 hover:shadow-[inset_4px_0_0_#D97706,0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200 group h-full flex flex-col"
                  >
                    <div className="text-betapower-azure mb-5">
                      {Icon && <Icon size={28} />}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-betapower-darkblue text-base leading-snug">
                      {offre.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-5 flex-1 leading-relaxed">{offre.description}</p>
                    <span className="text-sm font-medium text-betapower-azure group-hover:underline">
                      En savoir plus →
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </>
  )
}
