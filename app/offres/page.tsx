import { getAllItems } from '@/lib/markdown'
import OffresContent from '@/components/OffresContent'

export default function OffresPage() {
  const offres = getAllItems('offres')
  return <OffresContent offres={offres} />
}
