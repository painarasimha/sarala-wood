import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { Facts } from '@/components/home/Facts'
import { Vocabulary } from '@/components/home/Vocabulary'
import { Collections } from '@/components/home/Collections'
import { Story } from '@/components/home/Story'
import { Craft } from '@/components/home/Craft'
import { Statement } from '@/components/home/Statement'
import { SelectedWork } from '@/components/home/SelectedWork'
import { Clients } from '@/components/home/Clients'
import { Commission } from '@/components/home/Commission'

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
      <Facts />
      <Vocabulary />
      <Collections />
      <Story />
      <Craft />
      <Statement />
      <SelectedWork />
      <Clients />
      <Commission />
    </>
  )
}
