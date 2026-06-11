import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export interface Frontmatter {
  title: string
  description?: string
  date?: string
  client?: string
  tags?: string
  [key: string]: string | undefined
}

export function getSlugs(subDir: string): string[] {
  const dir = path.join(contentDir, subDir)
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getBySlug(
  subDir: string,
  slug: string
): { frontmatter: Frontmatter; content: string } {
  const fullPath = path.join(contentDir, subDir, `${slug}.md`)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)
  return { frontmatter: data as Frontmatter, content }
}


