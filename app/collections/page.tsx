import type { Metadata } from 'next'
import Link from 'next/link'
import { collections } from '@/content/collections'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Plate, PlateImage } from '@/components/ui/Plate'

export const metadata: Metadata = {
  title: 'Collections — doors, wardrobes, furniture & modular kitchens',
  description:
    'Four lines of made-to-order woodwork from Sarala Wood Industries: carved doors and window frames, wardrobes, custom home and office furniture, and modular kitchens.',
  alternates: { canonical: '/collections' },
  openGraph: { title: 'Collections — Sarala Wood Industries', url: '/collections' },
}

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Collections"
        title={[<>Four lines</>, <>of <em key="e" className="italic text-bronze">made-to-order</em></>, <>woodwork.</>]}
        lead="Nothing here is cut down from a standard size. Choose the line, tell us the opening or the room, and the piece is made for it."
      />

      <Section>
        <div className="flex flex-col gap-section">
          {collections.map((collection, i) => (
            <Reveal key={collection.slug}>
              <article className="grid items-center gap-10 md:grid-cols-2 md:gap-x-[clamp(2.5rem,5vw,4.5rem)]">
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <Plate>
                    <PlateImage
                      src={collection.hero.src}
                      alt={collection.hero.alt}
                      sizes="(max-width: 768px) 92vw, 44vw"
                      aspect="4/5"
                      priority={i === 0}
                    />
                  </Plate>
                </div>

                <div>
                  <span className="numeral">{collection.index}.</span>
                  <h2 className="mt-3 text-d2">
                    <Link href={`/collections/${collection.slug}`} className="transition-colors duration-500 ease-carve hover:text-bronze">
                      {collection.name}
                    </Link>
                  </h2>
                  <p className="mt-3 font-serif text-[1.3rem] italic text-bronze">
                    {collection.tagline}
                  </p>
                  <p className="mt-6 max-w-prose text-ink-2">{collection.body[0]}</p>

                  {collection.timbers.length > 0 && (
                    <p className="label label-mute mt-5">In {collection.timbers.join(' · ')}</p>
                  )}

                  <Link href={`/collections/${collection.slug}`} className="btn mt-8 inline-flex">
                    See the collection
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
