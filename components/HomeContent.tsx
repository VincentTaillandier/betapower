'use client'

import Link from 'next/link'
import { proofPoints, pillars } from '@/lib/home'

export default function HomeContent() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col"
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-betapower-darkblue to-betapower-darkblue/90" />

        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-6xl mx-auto w-full px-6 lg:px-16 py-20">

            <p className="animate-fade-in-up text-white/70 text-base font-medium mb-6">
              L'expertise de l'exploitation du réseau électrique au service des acteurs du secteur
            </p>

            <h1
              className="text-white max-w-3xl mb-7"
              style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)', lineHeight: 1.12 }}
            >
              Expertise en exploitation des réseaux électriques
            </h1>

            <p
              className="animate-fade-in-up text-white/70 max-w-2xl mb-10"
              style={{ fontSize: '1.125rem', lineHeight: 1.75, animationDelay: '120ms' }}
            >
              Études de réseau, formation des opérateurs, simulateurs de conduite, codes de réseau ENTSO-E, automatisation CGMES : BetaPower apporte aux acteurs du système électrique une expertise forgée en salle de conduite et éprouvée dans plus de dix pays.
            </p>

            <div
              className="animate-fade-in-up flex flex-wrap gap-4 items-center"
              style={{ animationDelay: '240ms' }}
            >
              <Link
                href="/offres"
                className="btn-primary"
              >
                Découvrir les offres →
              </Link>
            </div>

          </div>
        </div>

        {/* Bandeau de preuves (4 items) */}
        <div
          className="animate-fade-in-up relative z-10 bg-betapower-darkblue/80 backdrop-blur-sm border-t border-white/10"
          style={{ animationDelay: '380ms' }}
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-16 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {proofPoints.map((point, idx) => (
                <div key={idx} className="text-center sm:text-left">
                  <p className="text-white/85 text-sm leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TROIS PILIERS (cliquables) ────────────────────────── */}
      <section className="bg-betapower-bg py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-in-up mb-12 text-center">
            <h2 className="text-gray-900 mb-3">Nos domaines d'expertise</h2>
            <p className="text-gray-500 text-lg" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
              Un accompagnement sur mesure pour vos enjeux réseau.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, pillarIdx) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.href}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${pillarIdx * 150}ms` }}
                >
                  <Link
                    href={pillar.href}
                    className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-[inset_4px_0_0_#D97706,0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200 group h-full flex flex-col"
                  >
                    <div className="text-betapower-azure mb-5">
                      <Icon size={32} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 group-hover:text-betapower-darkblue text-xl leading-snug">
                      {pillar.title}
                    </h3>
                    <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-gray-600 flex-1">
                      {pillar.description.map((item, i) => (
                        <li key={i} className="flex items-baseline gap-1.5 leading-snug">
                          <span className="text-betapower-azure shrink-0">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="text-sm font-medium text-betapower-azure group-hover:underline mt-4 inline-block">
                      En savoir plus →
                    </span>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

    </>
  )
}
