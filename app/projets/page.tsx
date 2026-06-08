import { getAllItems } from '@/lib/markdown'
import ProjetsContent from '@/components/ProjetsContent'

export default function ProjetsPage() {
  const projets = getAllItems('projects')
  return <ProjetsContent projets={projets} />
}
