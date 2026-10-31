import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { StoryTeaser } from '@/components/home/StoryTeaser'
import dynamic from 'next/dynamic'

// Below the fold, and the only thing that pulls in GSAP — split it out so the
// first screen is not waiting on it.
const CraftSequence = dynamic(() =>
  import('@/components/home/CraftSequence').then((m) => m.CraftSequence)
)
import { CollectionsGrid } from '@/components/home/CollectionsGrid'
import { Spaces } from '@/components/home/Spaces'
import { GalleryRail } from '@/components/home/GalleryRail'
import { Statement } from '@/components/home/Statement'
import { ClientsStrip } from '@/components/home/ClientsStrip'
import { CommissionCTA } from '@/components/home/CommissionCTA'

export const metadata: Metadata = {
  title: 'Hand-carved wooden doors & furniture — Karkala, Karnataka',
  description:
    'Sarala Wood Industries has carved doors, window frames, wardrobes, furniture and modular kitchens at Nandalike, Karkala since 1986. Made to order for homes, offices and places of worship across Karnataka.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="band-lotus" aria-hidden="true" />
      <StoryTeaser />
      <CraftSequence />
      <CollectionsGrid />
      <Spaces />
      <GalleryRail />
      <Statement />
      <ClientsStrip />
      <CommissionCTA />
    </>
  )
}
