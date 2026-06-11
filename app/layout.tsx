import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: {
    template: '%s — BetaPower',
    default: 'BetaPower — Expertise en exploitation des réseaux électriques',
  },
  description:
    'Conseil, audit et expertise en exploitation des réseaux électriques pour GRT, opérateurs et industriels.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.betapower.fr',
    siteName: 'BetaPower',
    /* TODO: Ajouter les balises hreflang fr/en/es dès la mise en ligne multilingue
    alternateLanguages: {
      'en': 'https://www.betapower.fr/en',
      'es': 'https://www.betapower.fr/es',
    },
    */
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} ${playfair.variable} bg-betapower-bg text-betapower-text min-h-screen flex flex-col`}>
        <Navbar />
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}
