import Image from 'next/image'
import Link from 'next/link'
import { collections } from '@/content/collections'
import { Reveal } from '@/components/ui/Reveal'
import { OrnamentDivider } from '@/components/ornament/Ornaments'

/** Asymmetric editorial grid: 7/5, then 5/7, so the eye zig-zags down. */
const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']
const HEIGHTS = ['lg:min-h-[560px]', 'lg:min-h-[560px]', 'lg:min-h-[460px]', 'lg:min-h-[460px]']
const SIZES = [
  '(max-width: 1024px) 92vw, 54vw',
  '(max-width: 1024px) 92vw, 38vw',
  '(max-width: 1024px) 92vw, 38vw',
  '(max-width: 1024px) 92vw, 54vw',
]

export function CollectionsGrid() {
  return (
    <section id="collections" className="surface-paper py-section lg:py-section-lg">
      <div className="wrap">
        <Reveal className="mx-auto mb-14 max-w-[40rem] text-center lg:mb-20">
          <span className="eyebrow">Collections</span>
          <h2 className="mt-4 font-serif text-d2">
            Made for the way <em className="accent">you live.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-prose text-muted">
            Four lines of work, every piece made to order — sized for your space, finished to match
            your house.
          </p>
          <OrnamentDivider className="mt-9" tone="honey" />
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-12">
          {collections.map((collection, i) => (
            <Reveal key={collection.slug} className={SPANS[i]} delay={i * 0.06}>
              <Link
                href={`/collections/${collection.slug}`}
                data-cursor="View"
                className={`group relative isolate flex min-h-[380px] w-full items-end overflow-hidden ${HEIGHTS[i]}`}
              >
                <Image
                  src={collection.hero.src}
                  alt=""
                  fill
                  sizes={SIZES[i]}
                  quality={82}
                  className="-z-20 object-cover transition-transform duration-1200 ease-carve group-hover:scale-[1.06]"
                />
                <span
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-ebony/95 via-ebony/60 to-ebony/20"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute inset-3.5 border border-brass/0 transition-colors duration-900 ease-carve group-hover:border-brass/55"
                  aria-hidden="true"
                />

                <div className="relative p-7 sm:p-9">
                  <span className="font-sans text-eyebrow font-semibold uppercase text-brass">
                    {collection.index} · {collection.tagline}
                  </span>
                  <h3 className="mt-3 font-serif text-d3 text-sandalwood">{collection.name}</h3>
                  {/* Opens on hover, always open on touch where there is no hover */}
                  <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-900 ease-carve lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-visible:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-3 max-w-[40ch] text-small font-light text-sandalwood/80">
                        {collection.summary}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
