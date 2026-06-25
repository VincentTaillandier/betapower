'use client'

import Link from 'next/link'
import { Offre, VersionDetaillee } from '@/lib/offres'

interface OffreDetailClientProps {
  offre: Offre
  relatedProjects?: { slug: string; title: string }[]
}

interface SectionConfig {
  key: keyof VersionDetaillee
  titre?: string
  type: 'paragraphe' | 'liste'
}

const sectionsConfig: SectionConfig[] = [
  { key: 'enBref', titre: 'En bref', type: 'paragraphe' },
  { key: 'ceQueCouvreOffre', titre: "Ce que couvre l'offre", type: 'liste' },
  { key: 'livrablesTypes', titre: 'Livrables types', type: 'paragraphe' },
  { key: 'exemplesMissions', titre: 'Exemples de missions', type: 'liste' },
]

export default function OffreDetailClient({ offre, relatedProjects }: OffreDetailClientProps) {
  const detail = offre.versionDetaillee

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <div className="animate-fade-in-up mb-8">
        <Link
          href="/offres/"
          className="text-sm text-betapower-azure hover:underline"
        >
          ← Retour aux offres
        </Link>
      </div>

      {/* Title Section */}
      <div className="animate-fade-in-up mb-12" style={{ animationDelay: '100ms' }}>
        <div className="mb-3">
          <span className="text-sm font-medium text-betapower-azure uppercase tracking-wide">
            {offre.eyebrow}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {detail.titre}
        </h1>
        {detail.audienceNote && (
          <p className="text-base text-gray-500 italic mb-4">
            {detail.audienceNote}
          </p>
        )}
        <p className="text-xl text-gray-600 leading-relaxed">
          {detail.sousTitre}
        </p>
      </div>

      {/* Content Sections */}
      <div className="prose prose-lg max-w-none">
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
                    {(value as string[]).map((item, idx) => (
                      <li key={idx} className="text-gray-700 leading-relaxed">{item}</li>
                    ))}
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
      </div>

      {/* Projets liés */}
      {relatedProjects && relatedProjects.length > 0 && (
        <div className="mt-12 mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Projets liés</h2>
          <ul className="space-y-2">
            {relatedProjects.map(p => (
              <li key={p.slug}>
                <Link
                  href={`/projets/${p.slug}/`}
                  className="text-betapower-azure hover:text-betapower-gold transition-colors font-medium"
                >
                  {p.title} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <div className="animate-fade-in-up mt-16 bg-betapower-darkblue rounded-xl p-8 text-center">
        <h2 className="text-white text-2xl font-semibold mb-4">
          Intéressé par cette offre ?
        </h2>
        <p className="text-white/80 mb-6 max-w-2xl mx-auto">
          Discutons de votre projet lors d'un premier échange de 30 minutes, sans engagement.
        </p>
        <Link href="/contact/" className="btn-primary inline-block">
          Prendre contact
        </Link>
      </div>
    </div>
  )
}
