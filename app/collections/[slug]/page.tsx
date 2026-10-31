import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { collections, collectionBySlug } from '@/content/collections'
import { byCollection, spread } from '@/content/gallery'
import { site } from '@/content/site'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { RevealImage } from '@/components/ui/Frames'
import { DiamondBullet, OrnamentDivider } from '@/components/ornament/Ornaments'
import { CollectionEnquiry } from '@/components/collections/CollectionEnquiry'

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const collection = collectionBySlug(slug)
  if (!collection) return {}

  return {
    title: `${collection.name} — made to order in Karkala`,
    description: collection.summary,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: {
      title: `${collection.name} — ${site.name}`,
      description: collection.summary,
      url: `/collections/${collection.slug}`,
      images: [{ url: collection.hero.src }],
    },
  }
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = collectionBySlug(slug)
  if (!collection) notFound()

  const photographs = spread(byCollection(collection.slug), 12)
  const others = collections.filter((c) => c.slug !== collection.slug)

  return (
    <>
      <PageHeader
        eyebrow="Collections"
        index={collection.index}
        title={[collection.name]}
        lead={collection.summary}
      />

      {/* ---------- Opening spread ---------- */}
      <section className="surface-paper py-section lg:py-section-lg">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[6vw]">
          <Reveal>
            <RevealImage
              src={collection.hero.src}
              alt={collection.hero.alt}
              sizes="(max-width: 1024px) 92vw, 48vw"
              className="aspect-[4/5] overflow-hidden"
              parallax={22}
              /* First image on the page: paint it immediately instead of
                 holding it behind a reveal that needs JavaScript. */
              priority
            />
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="font-serif text-d3 text-rosewood">{collection.tagline}</h2>
            {collection.body.map((paragraph, i) => (
              <p key={i} className={`mt-5 max-w-prose text-muted ${i === 0 ? 'dropcap' : ''}`}>
                {paragraph}
              </p>
            ))}

            {collection.timbers.length > 0 && (
              <div className="mt-9 border-t border-teak/20 pt-7">
                <h3 className="font-sans text-eyebrow font-semibold uppercase text-amber">
                  Timber named by the workshop
                </h3>
                <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
                  {collection.timbers.map((timber) => (
                    <li key={timber} className="flex items-center gap-2 font-serif text-[1.22rem] text-teak">
                      <DiamondBullet className="h-3 w-3 shrink-0" stroke="#b9814a" />
                      {timber}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------- What you can commission ---------- */}
      <section className="surface-wood py-section">
        <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-[6vw]">
          <Reveal>
            <span className="eyebrow">What you can specify</span>
            <h2 className="mt-4 max-w-[12ch] font-serif text-d3">
              Every piece is <em className="accent">yours to set.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="grid gap-0 border-t border-brass/20">
              {collection.commission.map((option) => (
                <div
                  key={option.label}
                  className="grid gap-2 border-b border-brass/10 py-6 sm:grid-cols-[180px_1fr] sm:gap-7"
                >
                  <dt className="font-sans text-eyebrow font-semibold uppercase text-brass">
                    {option.label}
                  </dt>
                  <dd
                    className={
                      option.value.startsWith('{{TODO')
                        ? 'font-sans text-small italic text-sandalwood/65'
                        : 'text-small font-light text-sandalwood/80'
                    }
                  >
                    {option.value}
                  </dd>
                </div>
              ))}
            </dl>

            <CollectionEnquiry collection={collection.name} />
          </Reveal>
        </div>
      </section>

      {/* ---------- Gallery ---------- */}
      {photographs.length > 0 && (
        <section className="surface-paper py-section lg:py-section-lg">
          <div className="wrap">
            <Reveal className="mb-12 text-center">
              <span className="eyebrow">From this collection</span>
              <h2 className="mt-4 font-serif text-d3">Work that has already left the workshop.</h2>
            </Reveal>

            <ul className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>li]:mb-4">
              {photographs.map((item) => (
                <li key={item.id} className="break-inside-avoid">
                  <Link
                    href={`/projects/${item.category}`}
                    data-cursor="View"
                    className="group relative block overflow-hidden bg-sandalwood"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 23vw"
                      quality={72}
                      placeholder="blur"
                      blurDataURL={item.blurDataURL}
                      className="h-auto w-full transition-transform duration-1200 ease-carve group-hover:scale-[1.04]"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-12 text-center">
              <Link href="/projects" className="btn btn-ink">
                See every project
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ---------- The other collections ---------- */}
      <section className="surface-sandal py-section">
        <div className="wrap">
          <OrnamentDivider className="mb-12" tone="honey" />
          <ul className="grid gap-8 sm:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link href={`/collections/${other.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={other.hero.src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 92vw, 30vw"
                      quality={72}
                      className="object-cover transition-transform duration-1200 ease-carve group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 font-serif text-d4 text-rosewood">
                    <span className="link-draw">{other.name}</span>
                  </h3>
                  <p className="mt-2 text-small text-muted">{other.tagline}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
