'use client'

import Link from 'next/link'
import { Projet } from '@/types/project'
import PageHero from '@/components/PageHero'

type ProjetsContentProps = {
  projects: Projet[]
}

function ProjectCard({ project, index }: { project: Projet; index: number }) {
  return (
    <div
      className="animate-fade-in-up w-72 rounded-2xl flex flex-col items-center justify-start p-5 bg-white border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-200 ease-out group"
      style={{ animationDelay: `${index * 180}ms` }}
    >
      <span className="text-xs font-bold uppercase tracking-wider mb-3 px-3 py-1 rounded-full bg-betapower-gold/10 text-betapower-gold">
        {project.date}
      </span>
      <h3 className="text-sm font-bold text-gray-900 mb-1 text-center line-clamp-2 leading-snug">
        {project.title}
      </h3>
      <p className="text-xs text-gray-400 mb-2 text-center">{project.client}</p>
      {project.contexteSummary && (
        <p className="text-xs text-gray-600 text-center leading-relaxed mb-3 px-1">
          {project.contexteSummary}
        </p>
      )}
      <Link
        href={`/projets/${project.slug}`}
        className="mt-auto text-xs text-betapower-azure font-semibold hover:text-betapower-gold transition-colors group-hover:underline"
      >
        En savoir plus →
      </Link>
    </div>
  )
}

export default function ProjetsContent({ projects }: ProjetsContentProps) {
  return (
    <>
      <PageHero
        title="Projets & Réalisations"
        subtitle="Des missions concrètes, livrées en conditions réelles."
      />

      {/* ── TIMELINE ─────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6">
        <div className="relative max-w-4xl mx-auto">

          {/* Ligne desktop */}
          <div
            className="absolute hidden md:block top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: '2px',
              background: 'linear-gradient(to bottom, transparent 0%, #C8962E 8%, #C8962E 92%, transparent 100%)',
              boxShadow: '0 0 2px 1px rgba(200, 150, 46, 0.2)',
            }}
            aria-hidden="true"
          />

          {/* Ligne mobile : CSS gradient (position fixe à gauche) */}
          <div
            className="absolute md:hidden top-0 bottom-0 pointer-events-none"
            style={{
              left: '23px',
              width: '2px',
              background: 'linear-gradient(to bottom, transparent 0%, #C8962E 8%, #C8962E 92%, transparent 100%)',
              boxShadow: '0 0 6px 2px rgba(200, 150, 46, 0.4)',
            }}
            aria-hidden="true"
          />

          {projects.map((project, index) => {
            const isLeft = index % 2 === 0
            return (
              <div key={project.slug} className="relative mb-20">

                {/* Desktop : alternance gauche / droite */}
                <div className="hidden md:flex w-full items-center">
                  <div className="w-1/2 flex justify-end pr-12">
                    {isLeft && <ProjectCard project={project} index={index} />}
                  </div>

                  {/* Marqueur central */}
                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <div className="w-3 h-3 rounded-full bg-betapower-gold ring-4 ring-betapower-gold/20" />
                  </div>

                  <div className="w-1/2 flex justify-start pl-12">
                    {!isLeft && <ProjectCard project={project} index={index} />}
                  </div>
                </div>

                {/* Mobile : empilé, ligne à gauche */}
                <div className="flex md:hidden items-center pl-16">
                  <div className="absolute left-6 -translate-x-1/2 flex items-center justify-center z-10">
                    <div className="w-3 h-3 rounded-full bg-betapower-gold ring-4 ring-betapower-gold/20" />
                  </div>
                  <ProjectCard project={project} index={index} />
                </div>

              </div>
            )
          })}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-betapower-darkblue py-20 px-6 text-center">
        <div className="animate-fade-in-up">
          <p className="text-white text-xl mb-8" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
            Votre projet pourrait être le prochain.
          </p>
          <Link href="/contact" className="btn-primary">
            Contactez-nous
          </Link>
        </div>
      </section>
    </>
  )
}
