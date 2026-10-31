import Link from 'next/link'
import { spaces } from '@/content/story'
import { Reveal } from '@/components/ui/Reveal'

export function Spaces() {
  return (
    <section className="surface-paper pb-section lg:pb-section-lg">
      <div className="wrap">
        <Reveal>
          <div className="grid border border-teak/20 md:grid-cols-3">
            {spaces.map((space) => (
              <Link
                key={space.slug}
                href={`/projects/${space.slug}`}
                className="group relative border-t border-teak/20 p-8 transition-colors duration-600 ease-carve first:border-t-0 hover:bg-sandalwood focus-visible:bg-sandalwood md:border-l md:border-t-0 md:first:border-l-0 lg:p-11"
              >
                <span className="numeral text-[1.1rem]">{space.index}.</span>
                <h3 className="mt-3 font-serif text-d3">{space.name}</h3>
                <p className="mt-4 max-w-[34ch] text-small text-muted">{space.blurb}</p>
                <span className="mt-7 inline-flex items-center gap-2 border-b border-honey pb-1 font-sans text-eyebrow font-semibold uppercase text-teak">
                  View the work
                  <span
                    className="transition-transform duration-600 ease-carve group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
