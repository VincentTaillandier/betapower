'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Offre, VersionDetaillee } from '@/lib/offres'

interface OffreDetailClientProps {
  offre: Offre
  pillarName: string
}

interface SectionConfig {
  key: keyof VersionDetaillee
  titre?: string
  type: 'paragraphe' | 'liste'
}

const sectionsConfig: SectionConfig[] = [
  { key: 'contexte', type: 'paragraphe' },
  { key: 'objectif', titre: 'Objectif', type: 'paragraphe' },
  { key: 'ceQueNousFaisons', titre: 'Ce que nous faisons', type: 'liste' },
  { key: 'expertiseApportee', titre: 'Expertise apportée', type: 'liste' },
  { key: 'domainesCouverts', titre: 'Domaines couverts', type: 'paragraphe' },
  { key: 'secteursConcernes', titre: 'Secteurs concernés', type: 'paragraphe' },
  { key: 'formats', titre: 'Formats', type: 'liste' },
  { key: 'themes', titre: 'Thèmes', type: 'liste' },
  { key: 'publicsCibles', titre: 'Publics cibles', type: 'paragraphe' },
  { key: 'derouleType', titre: 'Déroulé type', type: 'liste' },
  { key: 'livrablesTypes', titre: 'Livrables types', type: 'liste' },
  { key: 'plusValueClient', titre: 'Plus-value client', type: 'paragraphe' },
  { key: 'beneficesClient', titre: 'Bénéfices client', type: 'liste' },
  { key: 'resultatsAttendus', titre: 'Résultats attendus', type: 'liste' },
  { key: 'casDusage', titre: "Cas d'usage", type: 'liste' },
  { key: 'exempleMissions', titre: 'Exemples de missions', type: 'liste' },
  { key: 'references', titre: 'Références', type: 'liste' },
]

function renderListItem(item: string, idx: number) {
  // Handle bold markdown (**text**)
  const parts = item.split('**')
  return (
    <li key={idx} className="text-gray-700 leading-relaxed">
      {parts.map((part, i) => 
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      )}
    </li>
  )
}

export default function OffreDetailClient({ offre, pillarName }: OffreDetailClientProps) {
  const detail = offre.versionDetaillee
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Link 
          href="/offres" 
          className="text-sm text-betapower-azure hover:underline"
        >
          ← Retour aux offres
        </Link>
      </motion.div>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mb-12"
      >
        <div className="mb-3">
          <span className="text-sm font-medium text-betapower-azure uppercase tracking-wide">
            {pillarName}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {detail.titre}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          {detail.sousTitre}
        </p>
      </motion.div>

      {/* Content Sections */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="prose prose-lg max-w-none"
      >
        {sectionsConfig.map((section) => {
          const value = detail[section.key]
          
          if (!value) return null

          return (
            <div key={section.key} className="mb-10">
              {section.titre && (
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.titre}</h2>
              )}
              
              {section.type === 'paragraphe' ? (
                <p className="text-gray-700 leading-relaxed">
                  {value as string}
                </p>
              ) : (
                Array.isArray(value) ? (
                  <ul className="space-y-3">
                    {value.map((item, idx) => renderListItem(item, idx))}
                  </ul>
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {value as string}
                  </p>
                )
              )}
            </div>
          )
        })}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-16 bg-betapower-darkblue rounded-xl p-8 text-center"
      >
        <h2 className="text-white text-2xl font-semibold mb-4">
          Intéressé par cette offre ?
        </h2>
        <p className="text-white/80 mb-6 max-w-2xl mx-auto">
          Discutons de votre projet lors d'un premier échange de 30 minutes, sans engagement.
        </p>
        <Link href="/contact" className="btn-primary inline-block">
          Prendre contact
        </Link>
      </motion.div>
    </div>
  )
}
