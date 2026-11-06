import type { Metadata } from 'next'
import Link from 'next/link'
import { craftSteps } from '@/content/story'
import { detailSelection } from '@/content/gallery'
import { vocabulary } from '@/content/vocabulary'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section, SectionHead } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Plate, PlateImage } from '@/components/ui/Plate'
import { Lozenge } from '@/components/ornament/Ornaments'

export const metadata: Metadata = {
  title: 'The Craft — selecting, seasoning, carving, finishing',
  description:
    'How a Sarala piece is made: selecting shisham, teak, mango or meranti; seasoning it against the coastal monsoon; carving lotus, vine and relief motifs; and polishing so the grain comes up rather than disappears.',
  alternates: { canonical: '/the-craft' },
  openGraph: { title: 'The Craft — Sarala Wood Industries', url: '/the-craft' },
}

export default function TheCraftPage() {
  return (
    <>
      <PageHeader
        eyebrow="The craft"
        title={[<>From log</>, <>to <em key="e" className="italic text-bronze">heirloom.</em></>]}
        lead="Four stages, in the same order, every time. Nothing is rushed, because wood remembers how it was treated."
      />

      {craftSteps.map((step, i) => (
        <div key={step.name} className={i % 2 === 1 ? 'bg-paper-2' : ''}>
          <Section index={['I', 'II', 'III', 'IV'][i]}>
            <div className="grid items-center gap-[clamp(2.5rem,5vw,4rem)] md:grid-cols-2 md:gap-x-[clamp(2.5rem,5vw,4.5rem)]">
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <Reveal>
                  {step.image && (
                    <Plate>
                      <PlateImage
                        src={step.image.src}
                        alt={step.image.alt}
                        sizes="(max-width: 768px) 92vw, 44vw"
                        aspect="4/5"
                        priority={i === 0}
                      />
                    </Plate>
                  )}
                </Reveal>
              </div>

              <Reveal delay={0.06}>
                <div className="flex items-baseline gap-4">
                  <Lozenge />
                  <h2 className="text-d2">{step.name}</h2>
                </div>
                <p className="mt-5 font-serif text-[1.3rem] italic text-bronze">{step.short}</p>
                <p className="mt-6 max-w-prose text-ink-2">{step.body}</p>
              </Reveal>
            </div>
          </Section>
        </div>
      ))}

      {/* ---------- Macro details ---------- */}
      <div className="surface-dark">
        <Section index="V">
          <Reveal>
            <SectionHead
              eyebrow="In the detail"
              title={<>What the chisel does <em className="italic text-bronze-2">last.</em></>}
              lead="Relief panels, lotus roundels, pierced jaali screens, turned finials. This is the part that cannot be hurried and cannot be bought in."
            />
          </Reveal>

          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {detailSelection.map((item, i) => (
              <li key={item.id} className={i % 2 === 1 ? 'lg:mt-12' : ''}>
                <Reveal delay={(i % 4) * 0.05}>
                  <Link href="/projects" className="group block">
                    <span className="block overflow-hidden">
                      <span className="block transition-transform duration-1100 ease-carve group-hover:scale-105">
                        <PlateImage
                          src={item.src}
                          alt={item.alt}
                          sizes="(max-width: 640px) 46vw, 22vw"
                          aspect="3/4"
                          quality={72}
                          blurDataURL={item.blurDataURL}
                        />
                      </span>
                    </span>
                    <p className="mt-3 font-serif text-[1rem] italic text-bronze-2">{item.caption}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* ---------- The vocabulary, named ---------- */}
      <Section index="VI">
        <Reveal>
          <SectionHead
            eyebrow="The vocabulary"
            title="The six marks you will see most often."
            lead="Nearly every piece is assembled from the same handful of forms, drawn from the temple architecture of this coast."
          />
        </Reveal>
        <Reveal delay={0.06}>
          <dl className="grid gap-px border border-ink/8 bg-ink/8 sm:grid-cols-2 lg:grid-cols-3">
            {vocabulary.map((item) => (
              <div key={item.name} className="bg-mat p-7">
                <dt className="font-serif text-d3">
                  {item.name}
                  <span className="ml-2 font-serif text-[0.95rem] italic text-ink-3">{item.gloss}</span>
                </dt>
                <dd className="label label-mute mt-3">{item.seenOn}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* ---------- Timber ---------- */}
      <div className="bg-paper-2">
        <Section index="VII">
          <div className="grid gap-[clamp(2.5rem,5vw,4rem)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-x-[clamp(2.5rem,5.5vw,4.5rem)]">
            <Reveal>
              <span className="label">Timber</span>
              <h2 className="mt-4 text-d2">Four species, and whatever you bring us.</h2>
            </Reveal>

            <Reveal delay={0.06}>
              <ul className="grid gap-px border border-ink/8 bg-ink/8 sm:grid-cols-2">
                {['Shisham', 'Teak', 'Mango', 'Meranti'].map((timber) => (
                  <li key={timber} className="flex items-center gap-3 bg-mat p-7">
                    <Lozenge />
                    <span className="font-serif text-d3">{timber}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-prose text-ink-2">
                These are the species the workshop names for doors and windows — and a client may
                choose their own instead.{' '}
                <span className="italic text-ink-3">
                  {'{{TODO: how each species behaves, what it costs, and what the workshop recommends for which piece.}}'}
                </span>
              </p>
            </Reveal>
          </div>
        </Section>
      </div>

      <Section>
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-[20ch] text-d2">
              Bring us the opening. We will bring the <em className="italic text-bronze">rest.</em>
            </h2>
            <Link href="/contact" className="btn btn-fill mt-9 inline-flex">
              Commission a piece
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
