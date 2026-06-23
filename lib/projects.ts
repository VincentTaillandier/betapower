import { getSlugs, getBySlug } from './markdown'
import { Projet } from '@/types/project'

function fromFrontmatter(slug: string): Projet {
  const { frontmatter } = getBySlug('projects', slug)
  return {
    slug,
    title: (frontmatter.title as string) ?? '',
    description: (frontmatter.description as string) ?? '',
    date: (frontmatter.date as string) ?? '',
    client: (frontmatter.client as string) ?? '',
    skills: (frontmatter.skills as string[]) ?? [],
    contexteSummary: frontmatter.contexteSummary as string | undefined,
    offresLiees: frontmatter.offresLiees as { slug: string; label: string }[] | undefined,
  }
}

export function getProjects(): Projet[] {
  return getSlugs('projects')
    .map(fromFrontmatter)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getProjectBySlug(slug: string): Projet | undefined {
  try {
    return fromFrontmatter(slug)
  } catch {
    return undefined
  }
}
