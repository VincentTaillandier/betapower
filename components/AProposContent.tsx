'use client'

import Link from 'next/link'
import { valeurs } from '@/lib/apropos'
import PageHero from '@/components/PageHero'

export default function AProposContent() {
  return (
    <>
      <PageHero
        title="Un cabinet fondé par un ancien dispatcher de réseau de transport"
      />

      {/* ── FONDATEUR ────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className="space-y-6 text-gray-600 leading-relaxed max-w-3xl animate-fade-in-up"
            style={{ fontSize: '1rem', lineHeight: 1.8, fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            <p>
              BetaPower est née d'un constat simple : les projets d'infrastructure réseau les plus complexes manquent rarement de moyens — ils manquent d'une expertise pointue, disponible au bon moment. J'ai créé ce cabinet pour combler cet écart : apporter une compétence technique de haut niveau, directement là où elle crée de la valeur.
            </p>
            <p>
              Je m'appelle Vincent Taillandier. J'ai débuté au pupitre d'un réseau de transport très haute tension, comme dispatcher chez RTE : conduite en temps réel, gestion des congestions et des incidents, reprise de service — du régime normal aux situations les plus dégradées. J'ai ensuite piloté, au sein d'un ingénieriste international du secteur électrique, des projets pour des gestionnaires de réseau de transport : codes de réseau, études, calcul de capacité, formation des opérateurs. Depuis 2020, le fil est le même — faire fonctionner des réseaux électriques dans les contextes les plus exigeants — et c'est ce que je poursuis aujourd'hui avec BetaPower.
            </p>
            <p>
              Ma conviction : un réseau qui fonctionne bien est une infrastructure pensée par des gens qui maîtrisent à la fois la physique du système, les contraintes réglementaires et les réalités du terrain. À ce triptyque j'ajoute une compétence rarement réunie avec les autres : l'ingénierie des données qui sous-tend l'exploitation moderne — modèles CGMES, automatisation, calculs reproductibles. C'est ce croisement, entre le métier de la conduite et la maîtrise de la donnée, que j'apporte à chaque mission — au service des gestionnaires de réseau de transport et des centres de coordination.
            </p>
          </div>
        </div>
      </section>

      {/* ── VALEURS ──────────────────────────────────────────── */}
      <section className="bg-betapower-bg py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <h2 className="text-gray-900">Mes valeurs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {valeurs.map(({ titre, texte }, idx) => (
              <div
                key={titre}
                className="animate-fade-in-up"
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                <h3
                  className="mb-4"
                  style={{ color: '#D97706', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-playfair, Georgia, serif)' }}
                >
                  {titre}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
                  {texte}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPÉRIENCE INTERNATIONALE ────────────────────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="text-gray-900">Une expérience internationale</h2>
          </div>
          <div
            className="max-w-3xl animate-fade-in-up text-gray-600 leading-relaxed"
            style={{ fontSize: '1rem', lineHeight: 1.8, fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            <p>
              Mon parcours s'étend bien au-delà du réseau européen : j'ai contribué à des projets de réseau de transport dans de nombreux pays — Europe, Afrique, Asie centrale, Moyen-Orient, Pacifique — souvent pour le compte d'ingénieristes du secteur, de bailleurs de fonds et d'institutions internationales : audits d'exploitation, formation de dispatchers, analyse de codes de réseau, due diligence de projets. Des grands réseaux interconnectés aux réseaux insulaires, cette diversité nourrit une lecture comparée des pratiques d'exploitation.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-betapower-darkblue py-20 px-6 text-center">
        <div className="animate-fade-in-up">
          <p className="text-white text-xl mb-8" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
            Un projet ? Parlons-en directement.
          </p>
          <Link href="/contact/" className="btn-primary">
            Prendre contact
          </Link>
          <div className="mt-6 flex flex-col items-center gap-3">
            <Link
              href="/offres/"
              className="text-white/60 text-sm hover:text-white/80 transition-colors"
              style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
            >
              Découvrir les offres →
            </Link>
            <a
              href="https://www.linkedin.com/in/vincent-taillandier-15574a150/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/45 text-sm hover:text-white/70 transition-colors"
              style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
            >
              Retrouvez-moi sur LinkedIn →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
