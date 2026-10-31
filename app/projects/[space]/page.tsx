import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { bySpace } from '@/content/gallery'
import { spaces } from '@/content/story'
import type { SpaceSlug } from '@/content/types'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProjectsGallery } from '@/components/gallery/ProjectsGallery'

/**
 * One prerendered page per kind of space. Making these routes rather than a
 * query parameter keeps every view static, indexable and complete in the HTML.
 */
const COPY: Record<SpaceSlug, { title: string[]; lead: string; meta: string }> = {
  residential: {
    title: ['The rooms', 'people live in.'],
    lead: 'Main doors and frames, pooja doors and mantapas, bedroom shutters, window frames, wardrobes, cots, dining tables, sofas, TV units, railings and turned pillars — made for houses across coastal Karnataka.',
    meta: 'Hand-carved main doors, pooja mantapas, wardrobes, cots, dining tables and railings made by Sarala Wood Industries for homes across Udupi, Mangalore and Karkala.',
  },
  commercial: {
    title: ['Where a business', 'is first seen.'],
    lead: 'Courtyards, double main doors, seating and wood works for the builders, hotels, theme restaurants and offices that have come to us since 1986.',
    meta: 'Carved courtyards, double main doors, seating and wood works by Sarala Wood Industries for builders, hotels and offices in coastal Karnataka.',
  },
  worship: {
    title: ['Carved for', 'the sacred.'],
    lead: 'Temple doors and frames, pooja rooms and stands, mantapas, altars, church benches and a ratha — carved in the traditions of this coast.',
    meta: 'Temple doors, pooja mantapas and stands, altars, church benches and a ratha, hand-carved by Sarala Wood Industries at Nandalike, Karkala.',
  },
}

export function generateStaticParams() {
  return spaces.map((space) => ({ space: space.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ space: string }>
}): Promise<Metadata> {
  const { space } = await params
  const match = spaces.find((s) => s.slug === space)
  if (!match) return {}

  return {
    title: `${match.name} projects — carved woodwork in Karnataka`,
    description: COPY[match.slug].meta,
    alternates: { canonical: `/projects/${match.slug}` },
    openGraph: { title: `${match.name} — Sarala Wood Industries`, url: `/projects/${match.slug}` },
  }
}

export default async function SpaceProjectsPage({
  params,
}: {
  params: Promise<{ space: string }>
}) {
  const { space } = await params
  const match = spaces.find((s) => s.slug === space)
  if (!match) notFound()

  const items = bySpace(match.slug)
  const copy = COPY[match.slug]

  return (
    <>
      <PageHeader
        eyebrow={`Projects · ${match.name}`}
        index={match.index}
        title={[
          <>{copy.title[0]}</>,
          <>
            <em key="e" className="accent">
              {copy.title[1]}
            </em>
          </>,
        ]}
        lead={copy.lead}
      />
      <section className="surface-paper">
        <ProjectsGallery items={items} space={match.slug} />
      </section>
    </>
  )
}
