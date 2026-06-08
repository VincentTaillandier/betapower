'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}

interface Offre {
  slug: string
  title: string
  description?: string
}

export default function OffresContent({ offres }: { offres: Offre[] }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Nos offres</h1>
        <p className="text-gray-500 text-lg mb-12">
          Des expertises ciblées pour vos enjeux d&apos;infrastructure réseau électrique.
        </p>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {offres.map((offre) => (
          <motion.div
            key={offre.slug}
            variants={cardVariants}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <Link
              href={`/offres/${offre.slug}`}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-betapower-azure transition-all group h-full flex flex-col"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-betapower-darkblue">
                {offre.title}
              </h2>
              <p className="text-gray-500 mb-5 flex-1">{offre.description}</p>
              <span className="text-sm font-medium text-betapower-azure group-hover:underline">
                En savoir plus →
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
