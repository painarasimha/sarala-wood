import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { craftSteps } from '@/content/story'
import { detailSelection } from '@/content/gallery'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { RevealImage } from '@/components/ui/Frames'
import { DiamondBullet, OrnamentDivider, VineScroll } from '@/components/ornament/Ornaments'

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
        eyebrow="The Craft"
        title={[<>From log</>, <>to <em key="e" className="accent">heirloom.</em></>]}
        lead="Four stages, in the same order, every time. Nothing is rushed, because wood remembers how it was treated."
      />

      {/* ---------- The four stages, full bleed ---------- */}
      {craftSteps.map((step, i) => (
        <section
          key={step.name}
          className={i % 2 === 0 ? 'surface-paper py-section' : 'surface-sandal py-section'}
        >
          <div
            className={`wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-[6vw] ${
              i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
            }`}
          >
            <Reveal>
              {step.image && (
                <RevealImage
                  src={step.image.src}
                  alt={step.image.alt}
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="aspect-[4/5] overflow-hidden shadow-lift"
                  parallax={26}
                  priority={i === 0}
                />
              )}
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex items-baseline gap-5">
                <span className="numeral text-[2.6rem] leading-none">{step.index}.</span>
                <h2 className="font-serif text-d2">{step.name}</h2>
              </div>
              <p className="mt-5 font-serif text-[1.35rem] italic text-amber">{step.short}</p>
              <p className="mt-6 max-w-prose text-muted">{step.body}</p>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ---------- Macro details ---------- */}
      <section className="surface-wood relative overflow-hidden py-section lg:py-section-lg">
        <VineScroll
          className="pointer-events-none absolute inset-x-0 top-12 h-16 w-full opacity-[0.06]"
          stroke="#c9a35f"
        />
        <div className="wrap">
          <Reveal className="mb-14 max-w-[42rem]">
            <span className="eyebrow">In the detail</span>
            <h2 className="mt-4 font-serif text-d2">
              What the chisel does <em className="accent">last.</em>
            </h2>
            <p className="mt-5 text-sandalwood/70">
              Relief panels, lotus roundels, pierced jaali screens, turned finials. This is the part
              that cannot be hurried and cannot be bought in.
            </p>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {detailSelection.map((item, i) => (
              <li key={item.id} className={`${i % 2 === 1 ? 'lg:mt-12' : ''}`}>
                <Reveal delay={(i % 4) * 0.05}>
                  <Link href="/projects" data-cursor="View" className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
                        quality={72}
                        placeholder="blur"
                        blurDataURL={item.blurDataURL}
                        className="object-cover transition-transform duration-1200 ease-carve group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 font-serif text-[1rem] italic text-brass">
                      {item.caption}
                    </p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Timber ---------- */}
      <section className="surface-paper py-section">
        <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[6vw]">
          <Reveal>
            <span className="eyebrow">Timber</span>
            <h2 className="mt-4 font-serif text-d3">Four species, and whatever you bring us.</h2>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="grid gap-px border border-teak/20 bg-teak/20 sm:grid-cols-2">
              {['Shisham', 'Teak', 'Mango', 'Meranti'].map((timber) => (
                <li key={timber} className="flex items-center gap-3 bg-ivory p-7">
                  <DiamondBullet className="h-3.5 w-3.5 shrink-0" stroke="#b9814a" />
                  <span className="font-serif text-d4 text-rosewood">{timber}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-prose text-muted">
              These are the species the workshop names for doors and windows — and a client may
              choose their own instead. {'{{TODO: how each species behaves, what it costs, and what the workshop recommends for which piece.}}'}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="surface-sandal py-section">
        <div className="wrap text-center">
          <OrnamentDivider className="mb-10" tone="honey" />
          <h2 className="mx-auto max-w-[20ch] font-serif text-d2 text-rosewood">
            Bring us the opening. We will bring the <em className="accent">rest.</em>
          </h2>
          <Link href="/contact" className="btn btn-ink mt-9 inline-flex">
            Commission a piece
          </Link>
        </div>
      </section>
    </>
  )
}
