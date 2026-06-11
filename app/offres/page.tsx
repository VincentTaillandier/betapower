import type { Metadata } from 'next'
import OffresContent from '@/components/OffresContent'

export const metadata: Metadata = {
  title: 'Offres BetaPower — Études de réseau, formation dispatchers, OTS, codes de réseau ENTSO-E, CGMES',
  description: '8 offres d\'expertise en exploitation des réseaux électriques : formation des opérateurs, études de réseau, audit d\'exploitation, simulateurs OTS, codes de réseau, automatisation CGMES, due diligence internationale.',
}

export default function OffresPage() {
  return <OffresContent />
}
