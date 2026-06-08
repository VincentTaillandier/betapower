'use client'

import { motion } from 'framer-motion'

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact</h1>
        <p className="text-gray-500 text-lg mb-10">Décrivez-nous votre besoin, nous vous répondons sous 48h.</p>
      </motion.div>

      <motion.div
        className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeInOut' }}
      >
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
          <a href="mailto:contact@betapower.fr" className="text-betapower-azure hover:underline">
            contact@betapower.fr
          </a>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">LinkedIn</p>
          <a
            href="https://linkedin.com/in/votre-profil"
            target="_blank"
            rel="noopener noreferrer"
            className="text-betapower-azure hover:underline"
          >
            linkedin.com/in/votre-profil
          </a>
        </div>

        <hr className="border-gray-100" />

        <p className="text-sm text-gray-500">
          Pour les projets nécessitant un NDA ou un devis formalisé,
          précisez-le dans votre email et nous enverrons les documents adaptés.
        </p>
      </motion.div>
    </div>
  )
}
