'use client'

import Link from 'next/link'
import { offresData, Offre, Pillar } from '@/lib/offres'

interface OffreCardProps {
  offre: Offre
  variant?: 'default' | 'highlighted'
  index: number
}

function OffreCard({ offre, variant = 'default', index }: OffreCardProps) {
  const isHighlighted = variant === 'highlighted'

  const cardClasses = isHighlighted
    ? "bg-gradient-to-br from-betapower-azure/10 to-betapower-darkblue/10 rounded-lg p-6 border-2 border-betapower-azure hover:shadow-xl transition-all group h-full flex flex-col relative"
    : "bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-betapower-azure hover:shadow-lg transition-all group h-full flex flex-col"

  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Link href={`/offres/${offre.id}`} className={cardClasses}>
        {offre.badge && (
          <span className="absolute top-4 right-4 bg-betapower-gold text-white text-xs font-bold px-3 py-1 rounded-full">
            {offre.badge}
          </span>
        )}
        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-betapower-darkblue">
          {offre.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">
          {offre.versionCourte}
        </p>
        <span className="text-sm font-medium text-betapower-azure group-hover:underline">
          En savoir plus →
        </span>
      </Link>
    </div>
  )
}

interface PillarSectionProps {
  pillar: Pillar
  pillarKey: 'operer' | 'former' | 'digitaliser'
}

function PillarSection({ pillar, pillarKey }: PillarSectionProps) {
  const Icon = pillar.icon
  const gridCols = pillarKey === 'digitaliser' ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
  const variant = pillarKey === 'former' ? 'highlighted' : 'default'

  return (
    <section id={pillarKey} className="mb-20 scroll-mt-20">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Icon size={32} className="text-betapower-azure" />
          <h2 className="text-3xl font-bold text-gray-900">{pillar.pillarTitle}</h2>
        </div>
        <p className="text-gray-600 text-lg">
          {pillar.pillarDescription}
        </p>
      </div>

      <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
        {pillar.offres.map((offre, idx) => (
          <OffreCard key={offre.id} offre={offre} variant={variant} index={idx} />
        ))}
      </div>
    </section>
  )
}

export default function OffresContent() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Header avec introduction */}
      <div className="animate-fade-in-up mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Une expertise, trois manières de vous servir : opérer, former, digitaliser.
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-4 leading-relaxed">
            BetaPower intervient sur l'ensemble du cycle de vie opérationnel des réseaux électriques : préparation de l'exploitation, conduite, retour d'expérience, formation des équipes et mise en données des réseaux. Chaque mission s'appuie sur une expérience directe de la conduite d'un réseau de transport et sur la maîtrise des référentiels du secteur — codes de réseau ENTSO-E, CIM/CGMES, pratiques des GRT européens.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Les offres ci-dessous sont des cadres de départ : chaque mission est dimensionnée sur mesure, avec un livrable et des critères de réussite définis dès le cadrage.
          </p>
        </div>
      </div>

      {/* Pillars */}
      <PillarSection pillar={offresData.operer} pillarKey="operer" />
      <PillarSection pillar={offresData.former} pillarKey="former" />
      <PillarSection pillar={offresData.digitaliser} pillarKey="digitaliser" />

      {/* CTA Final */}
      <div className="animate-fade-in-up bg-betapower-darkblue rounded-xl p-8 text-center">
        <h2 className="text-white text-2xl font-semibold mb-4">
          Une question sur nos offres ?
        </h2>
        <p className="text-white/80 mb-6 max-w-2xl mx-auto">
          Chaque mission est dimensionnée sur mesure. Discutons de votre enjeu lors d'un premier échange de 30 minutes, sans engagement.
        </p>
        <Link href="/contact" className="btn-primary inline-block">
          Contactez nous pour un premier échange
        </Link>
      </div>
    </div>
  )
}
