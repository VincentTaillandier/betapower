import { getAllItems } from '@/lib/markdown'
import HomeContent from '@/components/HomeContent'

export default function Home() {
  const offres = getAllItems('offres')
  return <HomeContent offres={offres} />
}
