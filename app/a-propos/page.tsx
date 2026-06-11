import type { Metadata } from 'next'
import AProposContent from '@/components/AProposContent'

export const metadata: Metadata = {
  title: 'À propos — BetaPower',
  description: 'BetaPower : expertise en exploitation des réseaux électriques HTB/HTA, études de réseau, formation des opérateurs, simulateurs OTS et codes de réseau ENTSO-E. Fondé par Vincent Taillandier, ancien dispatcher RTE.',
}

export default function AProposPage() {
  return <AProposContent />
}
