import type { Metadata } from 'next'
import AProposContent from '@/components/AProposContent'
import { canonical, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo'

export const metadata: Metadata = {
  title: `À propos — ${SITE_NAME} | Vincent Taillandier, ancien dispatcher de réseau de transport`,
  description:
    "BetaPower est fondé par Vincent Taillandier, ancien dispatcher RTE et expert en exploitation des réseaux électriques : études de réseau, formation des opérateurs, simulateurs OTS, codes de réseau ENTSO-E.",
  alternates: { canonical: canonical('/a-propos') },
  openGraph: {
    title: `À propos — ${SITE_NAME} | Vincent Taillandier, ancien dispatcher de réseau de transport`,
    description:
      "BetaPower est fondé par Vincent Taillandier, ancien dispatcher RTE et expert en exploitation des réseaux électriques : études de réseau, formation des opérateurs, simulateurs OTS, codes de réseau ENTSO-E.",
    url: canonical('/a-propos'),
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },
}

export default function AProposPage() {
  return <AProposContent />
}
