import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { collections } from '@/content/collections'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { OrnamentDivider } from '@/components/ornament/Ornaments'

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
        title={[<>Four lines</>, <>of <em key="e" className="accent">made-to-order</em></>, <>woodwork.</>]}
        lead="Nothing here is cut down from a standard size. Choose the line, tell us the opening or the room, and the piece is made for it."
      />

      <section className="surface-paper py-section lg:py-section-lg">
        <div className="wrap flex flex-col gap-section">
          {collections.map((collection, i) => (
            <Reveal key={collection.slug}>
              <article
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-[6vw] ${
                  i % 2 === 1 ? 'lg:[&>a]:order-2' : ''
                }`}
              >
                <Link
                  href={`/collections/${collection.slug}`}
                  data-cursor="View"
                  className="group relative block aspect-[4/5] overflow-hidden"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    src={collection.hero.src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    quality={82}
                    className="object-cover transition-transform duration-1200 ease-carve group-hover:scale-[1.05]"
                  />
                  <span
                    className="pointer-events-none absolute inset-4 border border-brass/0 transition-colors duration-900 ease-carve group-hover:border-brass/50"
                    aria-hidden="true"
                  />
                </Link>

                <div>
                  <span className="numeral text-[1.3rem]">{collection.index}.</span>
                  <h2 className="mt-3 font-serif text-d2">
                    <Link href={`/collections/${collection.slug}`} className="link-draw">
                      {collection.name}
                    </Link>
                  </h2>
                  <p className="mt-3 font-serif text-[1.3rem] italic text-amber">{collection.tagline}</p>
                  <p className="mt-6 max-w-prose text-muted">{collection.body[0]}</p>

                  {collection.timbers.length > 0 && (
                    <p className="mt-5 font-sans text-eyebrow font-semibold uppercase text-muted">
                      In {collection.timbers.join(' · ')}
                    </p>
                  )}

                  <Link
                    href={`/collections/${collection.slug}`}
                    className="btn btn-ink mt-8 inline-flex"
                  >
                    See the collection
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}

          <OrnamentDivider tone="honey" />
        </div>
      </section>
    </>
  )
}
