import type { Metadata } from 'next'
import OffresContent from '@/components/OffresContent'
import { canonical, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    absolute: `Offres — ${SITE_NAME} | Études de réseau, exploitation, codes ENTSO-E, formation OTS`,
  },
  description:
    "Quatre domaines d'expertise en exploitation des réseaux électriques : études & analyses de réseau, exploitation & audit, codes de réseau ENTSO-E, formation & simulateurs OTS. Appui investisseurs & bailleurs.",
  alternates: { canonical: canonical('/offres') },
  openGraph: {
    title: `Offres — ${SITE_NAME} | Expertise exploitation réseaux électriques`,
    description:
      "Quatre domaines d'expertise en exploitation des réseaux électriques : études & analyses de réseau, exploitation & audit, codes de réseau ENTSO-E, formation & simulateurs OTS.",
    url: canonical('/offres'),
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },
}

export default function OffresPage() {
  return <OffresContent />
}
