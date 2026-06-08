'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface Projet {
  slug: string
  title: string
  description?: string
  date?: string
  client?: string
}

export default function ProjetsContent({ projets }: { projets: Projet[] }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Projets</h1>
        <p className="text-gray-500 text-lg mb-12">Études de cas et réalisations récentes.</p>
      </motion.div>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.3, duration: 0.7, ease: 'easeInOut' }}
      >
        {projets.map((projet) => (
          <motion.div
            key={projet.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Link
              href={`/projets/${projet.slug}`}
              className="block bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-betapower-azure transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-betapower-darkblue">
                  {projet.title}
                </h2>
                {projet.date && (
                  <span className="text-sm text-gray-400 shrink-0">{projet.date}</span>
                )}
              </div>
              {projet.client && (
                <p className="text-sm text-betapower-azure font-medium mb-2">Client : {projet.client}</p>
              )}
              <p className="text-gray-500">{projet.description}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
