'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PiEngine, PiLightbulb, PiShootingStar } from 'react-icons/pi'

const icons = [PiEngine, PiLightbulb, PiShootingStar]

interface Offre {
  slug: string
  title: string
  description?: string
}

export default function HomeContent({ offres }: { offres: Offre[] }) {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-betapower-darkblue to-betapower-azure text-white py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-4">
            Conseil &amp; Expertise
          </p>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeInOut' }}
          >
            Infrastructure de réseau<br />
            <span className="text-white/80">électrique</span>
          </motion.h1>
          <motion.p
            className="text-white/70 text-lg md:text-xl max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeInOut' }}
          >
            BetaPower accompagne opérateurs et industriels dans leurs projets de réseau,
            audits d&apos;infrastructure et stratégie énergie.
          </motion.p>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: 'easeInOut' }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Nos offres</h2>
          <p className="text-gray-500 mb-10">Un accompagnement sur mesure pour vos enjeux réseau.</p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 1, duration: 0.7, ease: 'easeInOut' }}
        >
          {offres.map((offre, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={offre.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <Link
                  href={`/offres/${offre.slug}`}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-betapower-azure transition-all group h-full flex flex-col"
                >
                  <div className="text-betapower-azure mb-4">
                    {Icon && <Icon size={28} />}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-betapower-darkblue">
                    {offre.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 flex-1">{offre.description}</p>
                  <span className="text-xs font-medium text-betapower-azure group-hover:underline">
                    En savoir plus →
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </section>
    </>
  )
}
