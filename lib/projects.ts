import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export interface ProjectData {
  slug: string
  title: string
  description: string
  client: string
  date: string
  content: string
}

export function getAllProjects(): ProjectData[] {
  const fileNames = fs.readdirSync(projectsDirectory)
  const allProjects = fileNames
    .filter((fileName) => /^[a-z0-9-]+\.md$/.test(fileName))
    .map((fileName) => {
      const fullPath = path.join(projectsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const slug = data.slug || fileName.replace(/\.md$/, '')

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        client: data.client || '',
        date: data.date || '',
        content,
      }
    })

  return allProjects.sort((a, b) => (a.date > b.date ? -1 : 1))
}

