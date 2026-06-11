export interface Projet {
  slug: string
  title: string
  description: string
  date: string
  client: string
  skills: string[]
  contexteSummary?: string
  heroImage?: string
  details: {
    contexte: string
    enjeux: string[]
    actions: { title: string; description: string }[]
    resultats: { value?: string; label: string }[]
    defisTechniques?: { title: string; content: string }[]
    offresLiees?: { slug: string; label: string }[]
  }
}
