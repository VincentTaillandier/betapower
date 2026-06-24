import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProjects, getProjectBySlug } from '@/lib/projects'
import { getBySlug } from '@/lib/markdown'
import ProjectDetail from '@/components/ProjectDetail'
import MarkdownContent from '@/components/MarkdownContent'
import { canonical, SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/seo'

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Projet non trouvé' }
  const pageCanonical = canonical(`/projets/${slug}`)
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: pageCanonical },
    openGraph: {
      title: `${project.title} — ${SITE_NAME}`,
      description: project.description,
      url: pageCanonical,
      images: [{ url: DEFAULT_OG_IMAGE, alt: project.title }],
    },
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Projets', item: `${SITE_URL}/projets/` },
      { '@type': 'ListItem', position: 3, name: project!.title, item: canonical(`/projets/${slug}`) },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="bg-betapower-darkblue flex items-center" style={{ minHeight: 300 }}>
        <div className="max-w-6xl mx-auto w-full px-6 lg:px-16 py-16">
          <h1 className="text-white mb-4">{project!.title}</h1>
          <p className="text-white/60 text-lg" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
            {project!.description}
          </p>
        </div>
      </section>
      <ProjectDetail project={project!}>
        <MarkdownContent content={content} />
      </ProjectDetail>
    </>
  )
}
