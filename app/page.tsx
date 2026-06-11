import type { Metadata } from 'next'
import HomeContent from '@/components/HomeContent'

export const metadata: Metadata = {
  title: 'BetaPower — Expert exploitation réseaux électriques | Études de réseau, formation dispatchers, OTS & CGMES',
  description: 'Conseil et formation en exploitation des réseaux électriques : études de réseau, codes de réseau ENTSO-E, simulateurs de conduite (OTS), CGMES, calcul de capacité. Expertise d\'un ancien dispatcher RTE. Europe, Amérique latine, international.',
}

export default function Home() {
  return <HomeContent />
}
