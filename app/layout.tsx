import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s — ${SITE_NAME}`,
    default: `${SITE_NAME} — Expertise en exploitation des réseaux électriques`,
  },
  description:
    'Conseil, audit et expertise en exploitation des réseaux électriques pour GRT, opérateurs et industriels.',
  alternates: {
    canonical: `${SITE_URL}/`,
    // i18n extension point: add languages: hreflang('/') when launching EN/ES
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [DEFAULT_OG_IMAGE],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/betapower_logo.png`,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} ${playfair.variable} bg-betapower-bg text-betapower-text min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}
