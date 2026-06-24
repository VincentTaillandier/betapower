'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { offresData, Offre, Pillar } from '@/lib/offres'
import PageHero from '@/components/PageHero'

interface OffreCardProps {
  offre: Offre
  index: number
}

function OffreCard({ offre, index }: OffreCardProps) {
  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${index * 110}ms` }}
    >
      <Link
        href={`/offres/${offre.id}`}
        className="bg-white rounded-lg p-6 border border-gray-200 hover:border-betapower-azure hover:shadow-lg transition-all group h-full flex flex-col"
      >
        {offre.badge && (
          <span className="bg-betapower-gold text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-3">
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

  return (
    <section id={pillarKey} className="mb-20 scroll-mt-20">
      <div className="animate-fade-in-up mb-8">
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
          <OffreCard key={offre.id} offre={offre} index={idx} />
        ))}
      </div>
    </section>
  )
}

export default function OffresContent() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const id = hash.slice(1)
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <PageHero title="Une expertise, trois manières de vous servir : opérer, former, digitaliser." />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
      {/* Introduction */}
      <div className="animate-fade-in-up prose prose-lg max-w-none mb-16">
        <p className="text-gray-700 mb-4 leading-relaxed">
          BetaPower intervient sur l'ensemble du cycle de vie opérationnel des réseaux électriques : préparation de l'exploitation, conduite, retour d'expérience, formation des équipes et mise en données des réseaux. Chaque mission s'appuie sur une expérience directe de la conduite d'un réseau de transport et sur la maîtrise des référentiels du secteur — codes de réseau ENTSO-E, CIM/CGMES, pratiques des GRT européens.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Les offres ci-dessous sont des cadres de départ : chaque mission est dimensionnée sur mesure, avec un livrable et des critères de réussite définis dès le cadrage.
        </p>
      </div>

      {/* Pillars */}
      <PillarSection pillar={offresData.operer} pillarKey="operer" />
      <PillarSection pillar={offresData.former} pillarKey="former" />
      <PillarSection pillar={offresData.digitaliser} pillarKey="digitaliser" />

      </div>

      {/* CTA Final */}
      <section className="bg-betapower-darkblue py-20 px-6 text-center">
        <div className="animate-fade-in-up max-w-2xl mx-auto">
          <h2 className="text-white text-2xl font-semibold mb-4">
            Une question sur nos offres ?
          </h2>
          <p className="text-white/80 mb-6">
            Chaque mission est dimensionnée sur mesure. Discutons de votre enjeu lors d'un premier échange de 30 minutes, sans engagement.
          </p>
          <Link href="/contact/" className="btn-primary inline-block">
            Contactez nous pour un premier échange
          </Link>
        </div>
      </section>
    </>
  )
}
