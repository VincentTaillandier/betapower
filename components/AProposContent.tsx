'use client'

import Link from 'next/link'
import { expertises, valeurs } from '@/lib/apropos'
import PageHero from '@/components/PageHero'

export default function AProposContent() {
  return (
    <>
      <PageHero
        title="À propos de BetaPower"
        subtitle="Un cabinet fondé par un ingénieur de terrain"
      />

      {/* ── FONDATEUR ────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className="space-y-6 text-gray-600 leading-relaxed max-w-3xl animate-fade-in-up"
            style={{ fontSize: '1rem', lineHeight: 1.8, fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            <p>
              BetaPower est née d'un constat simple : les projets d'infrastructure réseau les plus complexes
              manquent rarement de ressources — ils manquent d'expertise pointue, disponible au bon moment.
              J'ai créé ce cabinet pour combler cet écart, en apportant une compétence technique de haut niveau
              directement là où elle crée de la valeur.
            </p>
            <p>
              Avec sept ans d'expérience sur les réseaux HTB/HTA, j'ai contribué à des projets réglementés
              d'envergure nationale et internationale, notamment auprès de RTE. J'ai travaillé sur
              l'intégration d'énergies renouvelables, le déploiement de simulateurs OTS pour la formation
              des opérateurs réseau, et la conduite de projets soumis aux contraintes les plus exigeantes
              du secteur de l'énergie.
            </p>
            <p>
              Ma conviction profonde : un réseau électrique qui fonctionne bien, c'est une infrastructure
              qui a été pensée par des gens qui comprennent à la fois la physique du système, les contraintes
              réglementaires et les réalités du terrain. C'est ce regard croisé que j'apporte à chaque mission.
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
                style={{ animationDelay: `${idx * 80}ms` }}
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

      {/* ── EXPERTISE ────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <h2 className="text-gray-900 mb-3">Mes domaines d'expertise</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {expertises.map(({ icon: Icon, title, desc }, idx) => (
              <div
                key={title}
                className="card flex gap-5 items-start animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="text-betapower-azure shrink-0 mt-1">
                  <Icon size={28} />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2" style={{ fontSize: '1.05rem', fontWeight: 600 }}>{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
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
          <div className="mt-6">
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
