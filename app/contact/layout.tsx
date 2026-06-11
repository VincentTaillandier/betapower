import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — BetaPower',
  description: 'Contactez BetaPower pour vos projets d\'exploitation de réseau électrique, formation ou digitalisation. Réponse sous 48h.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
