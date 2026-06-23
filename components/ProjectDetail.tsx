'use client'

import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Projet } from '@/types/project'

type ProjectDetailProps = {
  project: Projet
  markdownContent: string
}

export default function ProjectDetail({ project, markdownContent }: ProjectDetailProps) {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <span className="inline-block text-xs font-bold uppercase tracking-wider mb-6 px-4 py-2 rounded-full bg-betapower-gold/10 text-betapower-gold">
            Étude de cas
          </span>

          {/* Meta : client + date + compétences */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="text-sm font-semibold text-gray-600">{project.client}</span>
            <span className="text-gray-300">·</span>
            <span className="text-sm text-gray-400">{project.date}</span>
            <span className="text-gray-300">·</span>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-medium px-2 py-0.5 rounded-full bg-betapower-azure/10 text-betapower-azure"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Contenu markdown */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-100 flex items-center gap-3">
                  <span className="inline-block w-1 h-5 rounded-full bg-betapower-azure shrink-0" />
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 mb-6 pl-1">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="flex gap-3 text-gray-700">
                  <span className="text-betapower-azure mt-1 shrink-0 font-bold">·</span>
                  <span className="leading-relaxed">{children}</span>
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900">{children}</strong>
              ),
            }}
          >
            {markdownContent}
          </ReactMarkdown>

          {/* Offres liées */}
          {project.offresLiees && project.offresLiees.length > 0 && (
            <div className="mt-10 bg-betapower-darkblue/5 rounded-lg p-6 border-l-4 border-betapower-azure">
              <p className="text-gray-700 mb-4 font-medium">Ces compétences vous intéressent ?</p>
              <div className="flex flex-wrap gap-3">
                {project.offresLiees.map((offre, i) => (
                  <Link
                    key={offre.slug}
                    href={`/offres/${offre.slug}`}
                    className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all
                      ${i === 0
                        ? 'bg-white border-2 border-betapower-azure text-betapower-azure hover:bg-betapower-azure hover:text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-betapower-azure hover:text-betapower-azure'
                      }`}
                  >
                    {offre.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-6">
            <Link href="/contact" className="btn-primary">
              Discutons de votre projet
            </Link>
            <Link href="/projets" className="text-sm text-gray-500 hover:text-betapower-azure transition-colors">
              ← Tous les projets
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
