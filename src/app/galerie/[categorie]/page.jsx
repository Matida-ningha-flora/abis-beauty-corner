import { galleries } from '@/lib/galleriesData'
import GalerieClient from './GalerieClient'

export function generateStaticParams() {
  return galleries.map(g => ({ categorie: g.slug }))
}

export default async function GaleriePage({ params }) {
  const { categorie } = await params
  const gallery = galleries.find(g => g.slug === categorie)
  return <GalerieClient gallery={gallery} categorie={categorie} />
}