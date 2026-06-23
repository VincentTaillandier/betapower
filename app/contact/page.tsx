import type { Metadata } from 'next'
import ContactContent from '@/components/ContactContent'
import { canonical, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contactez BetaPower pour vos projets en exploitation de réseau électrique, formation des opérateurs, simulateurs OTS ou automatisation CGMES. Réponse sous 48h.",
  alternates: { canonical: canonical('/contact') },
  openGraph: {
    title: `Contact — ${SITE_NAME}`,
    description:
      "Contactez BetaPower pour vos projets en exploitation de réseau électrique, formation des opérateurs, simulateurs OTS ou automatisation CGMES. Réponse sous 48h.",
    url: canonical('/contact'),
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },
}

export default function ContactPage() {
  return <ContactContent />
}
