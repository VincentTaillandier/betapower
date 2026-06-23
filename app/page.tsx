import type { Metadata } from 'next'
import HomeContent from '@/components/HomeContent'
import { canonical, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} — Expert exploitation réseaux électriques | Études de réseau, formation dispatchers, OTS & CGMES`,
  },
  description:
    "Conseil et formation en exploitation des réseaux électriques : études de réseau, codes de réseau ENTSO-E, simulateurs de conduite (OTS), CGMES, calcul de capacité. Expertise d'un ancien dispatcher RTE. Europe, Amérique latine, international.",
  alternates: { canonical: canonical('/') },
  openGraph: {
    title: `${SITE_NAME} — Expert exploitation réseaux électriques`,
    description:
      "Conseil et formation en exploitation des réseaux électriques : études de réseau, OTS, CGMES, codes de réseau ENTSO-E. Expertise d'un ancien dispatcher RTE.",
    url: canonical('/'),
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },
}

export default function Home() {
  return <HomeContent />
}
