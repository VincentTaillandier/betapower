import { getBySlug, getSlugs, markdownToHtml } from '@/lib/markdown'
import Link from 'next/link'

export async function generateStaticParams() {
  return getSlugs('offres').map((slug) => ({ slug }))
}

export default async function OfrePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { frontmatter, content } = getBySlug('offres', slug)
  const contentHtml = await markdownToHtml(content)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <Link href="/offres" className="text-betapower-azure hover:underline text-sm mb-8 inline-block">
        ← Retour aux offres
      </Link>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{frontmatter.title}</h1>
      {frontmatter.description && (
        <p className="text-xl text-gray-500 mb-10 border-l-4 border-betapower-azure pl-4">
          {frontmatter.description}
        </p>
      )}
      <article className="prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  )
}
