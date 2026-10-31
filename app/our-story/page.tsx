import type { Metadata } from 'next'
import Link from 'next/link'
import { story, timeline, values } from '@/content/story'
import { site } from '@/content/site'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { ArchImage, RevealImage } from '@/components/ui/Frames'
import { OrnamentDivider, YearSeal, Kalasha } from '@/components/ornament/Ornaments'

export const metadata: Metadata = {
  title: 'Our Story — a workshop at Nandalike since 1986',
  description:
    'Mrs. Sarala Hegde founded Sarala Wood Industries in 1986 with ₹4,40,000 of seed capital, betting that heritage carving belonged in ordinary homes. The story of the workshop at Nandalike, Karkala.',
  alternates: { canonical: '/our-story' },
  openGraph: { title: 'Our Story — Sarala Wood Industries', url: '/our-story' },
}

export default function OurStoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title={[<>A home is</>, <>remembered by</>, <>its <em key="e" className="accent">wood.</em></>]}
        lead={story.lead}
      />

      {/* ---------- The founding ---------- */}
      <section className="surface-paper py-section lg:py-section-lg">
        <div className="wrap grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[6vw]">
          <Reveal>
            <div className="relative mx-auto w-full max-w-[420px] lg:sticky lg:top-28 lg:max-w-none">
              <ArchImage
                src={story.portrait.src}
                alt={story.portrait.alt}
                sizes="(max-width: 1024px) 86vw, 38vw"
              />
              <YearSeal className="absolute -bottom-6 right-0 scale-[0.78] sm:scale-90 lg:-right-6 lg:bottom-12 lg:scale-100" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            {story.body.map((paragraph, i) => (
              <p key={i} className={`max-w-prose text-muted ${i === 0 ? 'dropcap' : 'mt-6'}`}>
                {paragraph}
              </p>
            ))}

            <div className="mt-10 border-t border-teak/20 pt-8">
              <p className="font-serif text-[1.8rem] italic text-teak">{story.signature.name}</p>
              <p className="mt-1 font-sans text-eyebrow font-semibold uppercase text-muted">
                {story.signature.role}
              </p>
              <p className="mt-6 max-w-prose text-small italic text-muted">
                {'{{TODO: a photograph of Mrs. Sarala Hegde, and one of Mr. Suhas Hegde, would carry this page — the site has none at present.}}'}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Timeline ---------- */}
      <section className="surface-wood py-section lg:py-section-lg">
        <div className="wrap">
          <Reveal className="mb-14 max-w-[42rem]">
            <span className="eyebrow">The years</span>
            <h2 className="mt-4 font-serif text-d2">
              From one workshop to <em className="accent">a name on the coast.</em>
            </h2>
          </Reveal>

          <ol className="relative border-l border-brass/25 pl-8 sm:pl-12">
            {timeline.map((entry, i) => (
              <li key={entry.title} className="relative pb-12 last:pb-0">
                <Reveal delay={i * 0.05}>
                  <span
                    className="absolute -left-[33px] top-2 grid h-3.5 w-3.5 place-items-center sm:-left-[49px]"
                    aria-hidden="true"
                  >
                    <span
                      className={`block h-2 w-2 rotate-45 ${
                        entry.todo ? 'border border-brass/50' : 'bg-brass'
                      }`}
                    />
                  </span>
                  <p
                    className={`font-serif text-[1.6rem] leading-none ${
                      entry.todo ? 'text-brass/80' : 'text-brass'
                    }`}
                  >
                    {entry.year}
                  </p>
                  <h3 className="mt-3 font-serif text-d4 text-sandalwood">{entry.title}</h3>
                  <p
                    className={`mt-3 max-w-prose text-small font-light ${
                      entry.todo ? 'italic text-sandalwood/65' : 'text-sandalwood/75'
                    }`}
                  >
                    {entry.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Values ---------- */}
      <section className="surface-paper py-section lg:py-section-lg">
        <div className="wrap">
          <Reveal className="mx-auto mb-14 max-w-[38rem] text-center">
            <Kalasha className="mx-auto h-16 w-10 opacity-80" stroke="#b9814a" />
            <h2 className="mt-7 font-serif text-d2">What has not changed.</h2>
          </Reveal>

          <ul className="grid gap-px border border-teak/20 bg-teak/20 sm:grid-cols-2">
            {values.map((value, i) => (
              <li key={value.title} className="h-full bg-ivory p-8 lg:p-11">
                <Reveal delay={i * 0.05}>
                  <span className="numeral text-[1.1rem]">{value.index}.</span>
                  <h3 className="mt-3 font-serif text-d4">{value.title}</h3>
                  <p className="mt-4 max-w-prose text-small text-muted">{value.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- The workshop ---------- */}
      <section className="surface-sandal py-section">
        <div className="wrap">
          <Reveal className="mb-11 max-w-[40rem]">
            <span className="eyebrow">The workshop</span>
            <h2 className="mt-4 font-serif text-d3">
              Nandalike, Karkala Taluk — where all of it is made.
            </h2>
            <p className="mt-5 max-w-prose text-muted">
              {'{{TODO: photographs of the workshop itself, the machines and the craftsmen at work. Every photograph the business has is of a finished piece — nothing of hands, chisels or raw timber. These would transform this page and The Craft.}}'}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                '/images/editorial/craft-carved-mantapa.jpg',
                '/images/gallery/residential/latest-work-12.jpg',
                '/images/editorial/craft-carved-swing.jpg',
              ].map((src, i) => (
                <RevealImage
                  key={src}
                  src={src}
                  alt="Carved woodwork made at the Sarala workshop in Nandalike"
                  sizes="(max-width: 640px) 92vw, 30vw"
                  className={`aspect-[3/4] overflow-hidden ${i === 1 ? 'sm:mt-10' : ''}`}
                  quality={72}
                />
              ))}
            </div>
          </Reveal>

          <OrnamentDivider className="mt-16" tone="honey" />

          <div className="mt-12 text-center">
            <p className="mx-auto max-w-prose font-serif text-d4 text-rosewood">
              {site.tagline}.
            </p>
            <Link href="/the-craft" className="btn btn-ink mt-8 inline-flex">
              How a piece is made
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
