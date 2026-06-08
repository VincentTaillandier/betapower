import { getBySlug, getSlugs, markdownToHtml } from '@/lib/markdown'
import Link from 'next/link'

export async function generateStaticParams() {
  return getSlugs('projects').map((slug) => ({ slug }))
}

export default async function ProjetPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { frontmatter, content } = getBySlug('projects', slug)
  const contentHtml = await markdownToHtml(content)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <Link href="/projets" className="text-betapower-azure hover:underline text-sm mb-8 inline-block">
        ← Retour aux projets
      </Link>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{frontmatter.title}</h1>
      {frontmatter.client && (
        <p className="text-betapower-azure font-medium mb-1">Client : {frontmatter.client}</p>
      )}
      {frontmatter.date && (
        <p className="text-sm text-gray-400 mb-6">{frontmatter.date}</p>
      )}
      {frontmatter.description && (
        <p className="text-xl text-gray-500 mb-10 border-l-4 border-betapower-azure pl-4">
          {frontmatter.description}
        </p>
      )}
      <article className="prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  )
}
