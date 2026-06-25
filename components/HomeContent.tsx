'use client'

import Link from 'next/link'
import { proofPoints, pillars, pillarSecondaire } from '@/lib/home'

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

            <h1
              className="text-white max-w-3xl mb-7"
              style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)', lineHeight: 1.12 }}
            >
              L'exploitation des réseaux électriques, vue depuis la salle de conduite.
            </h1>

            <p
              className="animate-fade-in-up text-white/70 max-w-2xl mb-10"
              style={{ fontSize: '1.125rem', lineHeight: 1.75, animationDelay: '120ms' }}
            >
              BetaPower met une expertise rare de l'exploitation — forgée au pupitre d'un réseau THT — au service des gestionnaires de réseau de transport et des centres de coordination, à l'instant où vos projets en ont besoin. Études de réseau, formation des opérateurs, simulateurs OTS, codes de réseau, automatisation des données.
            </p>

            <div
              className="animate-fade-in-up flex flex-wrap gap-4 items-center"
              style={{ animationDelay: '240ms' }}
            >
              <Link
                href="/offres/"
                className="btn-primary"
              >
                Découvrir les offres →
              </Link>
            </div>

          </div>
        </div>

        {/* Bandeau de réassurance (3 items) */}
        <div
          className="animate-fade-in-up relative z-10 bg-betapower-darkblue/80 backdrop-blur-sm border-t border-white/10"
          style={{ animationDelay: '380ms' }}
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-16 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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

      {/* ── QUATRE DOMAINES + OFFRE SECONDAIRE ───────────────── */}
      <section className="bg-betapower-bg py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-in-up mb-12 text-center">
            <h2 className="text-gray-900 mb-3">Une expertise, quatre façons d'intervenir.</h2>
            <p className="text-gray-500 text-lg" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
              Un accompagnement sur mesure pour vos enjeux d'exploitation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <ul className="flex-1 space-y-1.5">
                      {pillar.description.map((item, i) => (
                        <li key={i} className="flex items-baseline gap-2 text-sm text-gray-600 leading-snug">
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

          {/* Offre secondaire — visuellement séparée */}
          <div className="mt-10 pt-10 border-t border-gray-200 flex justify-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <div className="w-full max-w-sm">
              {(() => {
                const Icon = pillarSecondaire.icon
                return (
                  <Link
                    href={pillarSecondaire.href}
                    className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-[inset_4px_0_0_#D97706,0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200 group flex flex-col"
                  >
                    <div className="text-betapower-azure mb-4">
                      <Icon size={28} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-betapower-darkblue text-lg leading-snug">
                      {pillarSecondaire.title}
                    </h3>
                    <ul className="flex-1 space-y-1">
                      {pillarSecondaire.description.map((item, i) => (
                        <li key={i} className="flex items-baseline gap-2 text-sm text-gray-600 leading-snug">
                          <span className="text-betapower-azure shrink-0">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-400 mt-3">Pour les porteurs de projet, investisseurs et bailleurs</p>
                    <span className="text-sm font-medium text-betapower-azure group-hover:underline mt-3 inline-block">
                      En savoir plus →
                    </span>
                  </Link>
                )
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA DE CLÔTURE ───────────────────────────────────── */}
      <section className="bg-betapower-darkblue py-20 px-6 text-center">
        <div className="animate-fade-in-up max-w-2xl mx-auto">
          <h2 className="text-white text-2xl font-semibold mb-4">
            Un enjeu d'exploitation à challenger ?
          </h2>
          <p className="text-white/80 mb-6">
            Décrivez votre besoin : BetaPower vous répond sous 48&nbsp;h pour un premier échange de 30&nbsp;minutes, sans engagement.
          </p>
          <Link href="/contact/" className="btn-primary inline-block">
            Prendre contact
          </Link>
        </div>
      </section>

    </>
  )
}
