import { getBySlug, markdownToHtml } from '@/lib/markdown'
import AProposContent from '@/components/AProposContent'

export default async function AProposPage() {
  const { frontmatter, content } = getBySlug('', 'about')
  const contentHtml = await markdownToHtml(content)
  return (
    <AProposContent
      title={frontmatter.title ?? 'À propos'}
      contentHtml={contentHtml}
    />
  )
}
