'use client'

import Link from 'next/link'
import { offresData, Offre } from '@/lib/offres'
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
        href={`/offres/${offre.id}/`}
        className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-[inset_4px_0_0_#D97706,0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200 group h-full flex flex-col"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-betapower-darkblue">
          {offre.title}
        </h3>
        <p className="text-base text-gray-600 mb-4 flex-1 leading-relaxed">
          {offre.versionCourte}
        </p>
        <span className="text-sm font-medium text-betapower-azure group-hover:underline">
          En savoir plus →
        </span>
      </Link>
    </div>
  )
}

export default function OffresContent() {
  return (
    <>
      <PageHero title="Une expertise de l'exploitation, quatre façons d'intervenir." />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">

        {/* Introduction */}
        <div className="animate-fade-in-up prose prose-lg max-w-none mb-16">
          <p className="text-gray-700 mb-4 leading-relaxed">
            BetaPower intervient sur l'ensemble du cycle de vie opérationnel des réseaux électriques : préparation de l'exploitation, conduite, retour d'expérience, formation des équipes et mise en données des réseaux. Chaque mission s'appuie sur une expérience directe de la conduite d'un réseau de transport et sur la maîtrise des référentiels du secteur — codes de réseau ENTSO-E, CIM/CGMES.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Les offres ci-dessous sont des cadres de départ : chaque mission est dimensionnée sur mesure, avec un livrable et des critères de réussite définis dès le cadrage.
          </p>
        </div>

        {/* 4 domaines principaux */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {offresData.domaines.map((offre, idx) => (
            <OffreCard key={offre.id} offre={offre} index={idx} />
          ))}
        </div>

        {/* Offre secondaire — visuellement séparée */}
        <div className="pt-10 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-6">
            Pour les porteurs de projet, investisseurs et bailleurs
          </p>
          <div className="max-w-md">
            <OffreCard offre={offresData.secondaire} index={0} />
          </div>
        </div>

      </div>

      {/* CTA Final */}
      <section className="bg-betapower-darkblue py-20 px-6 text-center">
        <div className="animate-fade-in-up max-w-2xl mx-auto">
          <h2 className="text-white text-2xl font-semibold mb-4">
            Un enjeu d'exploitation à challenger ?
          </h2>
          <p className="text-white/80 mb-6">
            Chaque mission est dimensionnée sur mesure. Discutons de votre enjeu lors d'un premier échange de 30&nbsp;minutes, sans engagement.
          </p>
          <Link href="/contact/" className="btn-primary inline-block">
            Prendre contact
          </Link>
        </div>
      </section>
    </>
  )
}
