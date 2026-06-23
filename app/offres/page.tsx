import type { Metadata } from 'next'
import OffresContent from '@/components/OffresContent'
import { canonical, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    absolute: `Offres ${SITE_NAME} — Études de réseau, formation dispatchers, OTS, codes de réseau ENTSO-E, CGMES`,
  },
  description:
    "8 offres d'expertise en exploitation des réseaux électriques : formation des opérateurs, études de réseau, audit d'exploitation, simulateurs OTS, codes de réseau, automatisation CGMES, due diligence internationale.",
  alternates: { canonical: canonical('/offres') },
  openGraph: {
    title: `Offres ${SITE_NAME} — Études de réseau, formation, OTS, CGMES`,
    description:
      "8 offres d'expertise en exploitation des réseaux électriques : formation dispatchers, études de réseau, simulateurs OTS, codes de réseau ENTSO-E, automatisation CGMES.",
    url: canonical('/offres'),
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },
}

export default function OffresPage() {
  return <OffresContent />
}
