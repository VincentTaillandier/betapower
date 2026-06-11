import type { Metadata } from 'next'
import ContactContent from '@/components/ContactContent'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Décrivez-nous votre besoin, nous vous répondons sous 48h.',
}

export default function ContactPage() {
  return <ContactContent />
}
