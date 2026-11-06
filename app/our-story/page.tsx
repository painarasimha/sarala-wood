import type { Metadata } from 'next'
import Link from 'next/link'
import { story, timeline, values } from '@/content/story'
import { site } from '@/content/site'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section, SectionHead } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Plate, PlateImage } from '@/components/ui/Plate'
import { Kalasha, Seal } from '@/components/ornament/Ornaments'

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
        eyebrow="Our story"
        title={[<>A home is</>, <>remembered by</>, <>its <em key="e" className="italic text-bronze">wood.</em></>]}
        lead={story.lead}
      />

      <Section index="I">
        <div className="grid items-start gap-[clamp(2.5rem,5vw,4rem)] md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:gap-x-[clamp(2.5rem,5.5vw,4.5rem)]">
          <Reveal>
            <div className="md:sticky md:top-28">
              <Plate>
                <PlateImage
                  src={story.portrait.src}
                  alt={story.portrait.alt}
                  sizes="(max-width: 768px) 92vw, 34vw"
                  aspect="4/5"
                />
              </Plate>
              <p className="cap mt-[0.8rem]">Carved main door · Nandalike workshop</p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            {story.body.map((paragraph, i) => (
              <p key={i} className={`max-w-prose text-ink-2 ${i > 0 ? 'mt-[1.05rem]' : ''}`}>
                {paragraph}
              </p>
            ))}

            <div className="mt-10 flex items-center gap-4 border-t border-ink/8 pt-8">
              <Seal className="h-9 w-9 shrink-0 text-bronze" />
              <span>
                <b className="block font-serif text-[1.5rem] font-normal">{story.signature.name}</b>
                <span className="label label-mute text-[0.68rem]">{story.signature.role}</span>
              </span>
            </div>
            <p className="mt-6 max-w-prose text-cap italic text-ink-3">
              {'{{TODO: a photograph of Mrs. Sarala Hegde, and one of Mr. Suhas Hegde, would carry this page — the business has none at present.}}'}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Timeline ---------- */}
      <div className="surface-dark">
        <Section index="II">
          <Reveal>
            <span className="label">The years</span>
            <h2 className="mb-14 mt-4 max-w-[20ch] text-d2">
              From one workshop to <em className="italic text-bronze-2">a name on the coast.</em>
            </h2>
          </Reveal>

          <ol className="relative border-l border-dark-ink/25 pl-8 sm:pl-12">
            {timeline.map((entry, i) => (
              <li key={entry.title} className="relative pb-12 last:pb-0">
                <Reveal delay={Math.min(i, 4) * 0.05}>
                  <span
                    className="absolute -left-[33px] top-2 grid h-3.5 w-3.5 place-items-center sm:-left-[49px]"
                    aria-hidden="true"
                  >
                    <span
                      className={`block h-2 w-2 rotate-45 ${
                        entry.todo ? 'border border-bronze-2/70' : 'bg-bronze-2'
                      }`}
                    />
                  </span>
                  <p className={`font-serif text-[1.6rem] leading-none ${entry.todo ? 'text-bronze-2/90' : 'text-bronze-2'}`}>
                    {entry.year}
                  </p>
                  <h3 className="mt-3 text-d3 text-dark-ink">{entry.title}</h3>
                  <p
                    className={`mt-3 max-w-prose text-small ${
                      entry.todo ? 'italic text-dark-ink/60' : 'text-dark-ink/75'
                    }`}
                  >
                    {entry.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      {/* ---------- Values ---------- */}
      <Section index="III">
        <Reveal>
          <div className="mx-auto mb-14 max-w-[38rem] text-center">
            <Kalasha className="mx-auto h-16 w-10 text-bronze" />
            <h2 className="mt-7 text-d2">What has not changed.</h2>
          </div>
        </Reveal>

        <ul className="grid gap-px border border-ink/8 bg-ink/8 sm:grid-cols-2">
          {values.map((value, i) => (
            <li key={value.title} className="h-full bg-mat p-8 lg:p-11">
              <Reveal delay={(i % 2) * 0.05}>
                <span className="numeral">{value.index}.</span>
                <h3 className="mt-3 text-d3">{value.title}</h3>
                <p className="mt-4 max-w-prose text-small text-ink-2">{value.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- The workshop ---------- */}
      <div className="bg-paper-2">
        <Section index="IV">
          <Reveal>
            <SectionHead
              eyebrow="The workshop"
              title="Nandalike, Karkala Taluk — where all of it is made."
              lead={
                <span className="italic text-ink-3">
                  {'{{TODO: photographs of the workshop itself, the machines and the craftsmen at work. Every photograph the business has is of a finished piece.}}'}
                </span>
              }
            />
          </Reveal>

          <Reveal delay={0.06}>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                '/images/editorial/craft-carved-mantapa.jpg',
                '/images/gallery/residential/latest-work-12.jpg',
                '/images/editorial/craft-carved-swing.jpg',
              ].map((src, i) => (
                <div key={src} className={i === 1 ? 'sm:mt-10' : ''}>
                  <Plate>
                    <PlateImage
                      src={src}
                      alt="Carved woodwork made at the Sarala workshop in Nandalike"
                      sizes="(max-width: 640px) 92vw, 30vw"
                      aspect="3/4"
                      quality={72}
                    />
                  </Plate>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 text-center">
              <p className="mx-auto max-w-prose text-d3">{site.tagline}.</p>
              <Link href="/the-craft" className="btn mt-8 inline-flex">
                How a piece is made
              </Link>
            </div>
          </Reveal>
        </Section>
      </div>
    </>
  )
}
