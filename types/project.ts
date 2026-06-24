export interface Projet {
  slug: string
  title: string
  description: string
  date: string
  client: string
  skills: string[]
  contexteSummary?: string
  offresLiees?: { offreId: string; label: string }[]
}
