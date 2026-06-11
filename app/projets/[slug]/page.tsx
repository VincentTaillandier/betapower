import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProjects, getProjectBySlug } from '@/lib/projects-data'
import { getBySlug } from '@/lib/markdown'
import ProjectDetail from '@/components/ProjectDetail'

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Projet non trouvé' }
  return {
    title: `${project.title} | BetaPower`,
    description: project.description,
  }
}

export const dynamicParams = false

export async function generateStaticParams() {
  const projects = getProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const { content } = getBySlug('projects', slug)

  return (
    <>
      <section className="bg-betapower-darkblue flex items-center" style={{ minHeight: 300 }}>
        <div className="max-w-6xl mx-auto w-full px-6 lg:px-16 py-16">
          <h1 className="text-white mb-4">{project!.title}</h1>
          <p className="text-white/60 text-lg" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
            {project!.description}
          </p>
        </div>
      </section>
      <ProjectDetail project={project!} markdownContent={content} />
    </>
  )
}
