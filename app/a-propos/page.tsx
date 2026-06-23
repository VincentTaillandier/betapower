import type { Metadata } from 'next'
import AProposContent from '@/components/AProposContent'
import { canonical, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "BetaPower : expertise en exploitation des réseaux électriques HTB/HTA, études de réseau, formation des opérateurs, simulateurs OTS et codes de réseau ENTSO-E. Fondé par Vincent Taillandier, ancien dispatcher RTE.",
  alternates: { canonical: canonical('/a-propos') },
  openGraph: {
    title: `À propos — ${SITE_NAME}`,
    description:
      "Expertise en exploitation des réseaux électriques HTB/HTA, études de réseau, formation des opérateurs, simulateurs OTS et codes de réseau ENTSO-E. Fondé par Vincent Taillandier, ancien dispatcher RTE.",
    url: canonical('/a-propos'),
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },
}

export default function AProposPage() {
  return <AProposContent />
}
