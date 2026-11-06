import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { collections, collectionBySlug } from '@/content/collections'
import { byCollection, spread } from '@/content/gallery'
import { site } from '@/content/site'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section, SectionHead } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Plate, PlateImage } from '@/components/ui/Plate'
import { Lozenge } from '@/components/ornament/Ornaments'
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
      <Section index="I">
        <div className="grid items-start gap-[clamp(2.5rem,5vw,4rem)] md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-x-[clamp(2.5rem,5.5vw,4.5rem)]">
          <Reveal>
            <Plate>
              <PlateImage
                src={collection.hero.src}
                alt={collection.hero.alt}
                sizes="(max-width: 768px) 92vw, 46vw"
                aspect="4/5"
                priority
              />
            </Plate>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="text-d3 text-bronze">{collection.tagline}</h2>
            {collection.body.map((paragraph, i) => (
              <p key={i} className="mt-5 max-w-prose text-ink-2">
                {paragraph}
              </p>
            ))}

            {collection.timbers.length > 0 && (
              <div className="mt-9 border-t border-ink/14 pt-7">
                <h3 className="label">Timber named by the workshop</h3>
                <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
                  {collection.timbers.map((timber) => (
                    <li key={timber} className="flex items-center gap-2.5 font-serif text-[1.22rem]">
                      <Lozenge />
                      {timber}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
      </Section>

      {/* ---------- What you can commission ---------- */}
      <div className="surface-dark">
        <Section index="II">
          <div className="grid gap-[clamp(2.5rem,5vw,4rem)] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-x-[clamp(2.5rem,5.5vw,4.5rem)]">
            <Reveal>
              <span className="label">What you can specify</span>
              <h2 className="mt-4 max-w-[12ch] text-d2">
                Every piece is <em className="italic text-bronze-2">yours to set.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <dl className="grid border-t border-dark-ink/25">
                {collection.commission.map((option) => (
                  <div
                    key={option.label}
                    className="grid gap-2 border-b border-dark-ink/10 py-6 sm:grid-cols-[180px_1fr] sm:gap-7"
                  >
                    <dt className="label text-bronze-2">{option.label}</dt>
                    <dd
                      className={
                        option.value.startsWith('{{TODO')
                          ? 'text-small italic text-dark-ink/60'
                          : 'text-small text-dark-ink/80'
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
        </Section>
      </div>

      {/* ---------- Gallery ---------- */}
      {photographs.length > 0 && (
        <Section index="III">
          <Reveal>
            <SectionHead
              eyebrow="From this collection"
              title="Work that has already left the workshop."
            />
          </Reveal>

          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {photographs.map((item, i) => (
              <li key={item.id}>
                <Reveal delay={(i % 4) * 0.04}>
                  <Link href={`/projects/${item.category}`} className="group block">
                    <span className="block overflow-hidden">
                      <span className="block transition-transform duration-1100 ease-carve group-hover:scale-[1.04]">
                        <PlateImage
                          src={item.src}
                          alt={item.alt}
                          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 23vw"
                          aspect="4/5"
                          quality={72}
                          blurDataURL={item.blurDataURL}
                        />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <p className="mt-10">
              <Link href="/projects" className="lnk">
                See every project
              </Link>
            </p>
          </Reveal>
        </Section>
      )}

      {/* ---------- The other collections ---------- */}
      <div className="bg-paper-2">
        <Section index="IV">
          <ul className="grid gap-8 sm:grid-cols-3">
            {others.map((other, i) => (
              <li key={other.slug}>
                <Reveal delay={i * 0.05}>
                  <Link href={`/collections/${other.slug}`} className="group block">
                    <span className="block overflow-hidden">
                      <span className="block transition-transform duration-1100 ease-carve group-hover:scale-105">
                        <PlateImage
                          src={other.hero.src}
                          alt=""
                          sizes="(max-width: 640px) 92vw, 30vw"
                          aspect="4/3"
                          quality={72}
                        />
                      </span>
                    </span>
                    <h3 className="mt-4 text-d3">{other.name}</h3>
                    <p className="cap mt-2">{other.tagline}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </>
  )
}
