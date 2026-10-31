import type { Metadata } from 'next'
import {
  BeadAndReel,
  CornerBracket,
  DiamondBullet,
  Kalasha,
  Lotus,
  OrnamentDivider,
  TempleArch,
  VineScroll,
  YearSeal,
} from '@/components/ornament/Ornaments'
import { BrassFrame } from '@/components/ui/Frames'
import { PageHeader } from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Styleguide',
  description: 'The design system behind the Sarala Wood Industries site.',
  robots: { index: false, follow: false },
}

const PALETTE = [
  ['Ebony', '#1c120c', 'bg-ebony'],
  ['Rosewood', '#3a2016', 'bg-rosewood'],
  ['Teak', '#6b3f22', 'bg-teak'],
  ['Honey', '#b9814a', 'bg-honey'],
  ['Brass', '#c9a35f', 'bg-brass'],
  ['Sandalwood', '#efe3cf', 'bg-sandalwood'],
  ['Ivory', '#f8f2e7', 'bg-ivory'],
] as const

export default function StyleguidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Internal"
        title={[<>The design</>, <><em key="e" className="accent">system.</em></>]}
        lead="Every colour, type size, ornament and control used on this site, in one place. Not linked from the site and not indexed."
      />

      {/* ---------- Palette ---------- */}
      <Section title="Palette" note="Dark wood sections alternate with ivory paper sections.">
        <ul className="grid gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {PALETTE.map(([name, hex, bg]) => (
            <li key={name}>
              <span className={`block aspect-square border border-teak/20 ${bg}`} />
              <p className="mt-2 font-sans text-eyebrow font-semibold uppercase text-muted">{name}</p>
              <p className="font-serif text-[0.95rem] text-teak">{hex}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- Surfaces ---------- */}
      <Section title="Surfaces" note="Procedural wood grain, ivory paper, and the sitewide film grain.">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="surface-wood grid h-44 place-items-center">
            <span className="font-sans text-eyebrow font-semibold uppercase text-brass">surface-wood</span>
          </div>
          <div className="surface-sandal grid h-44 place-items-center border border-teak/15">
            <span className="font-sans text-eyebrow font-semibold uppercase text-muted">surface-sandal</span>
          </div>
          <div className="surface-paper grid h-44 place-items-center border border-teak/15">
            <span className="font-sans text-eyebrow font-semibold uppercase text-muted">surface-paper</span>
          </div>
        </div>
        <div className="band-lotus mt-6" />
      </Section>

      {/* ---------- Type ---------- */}
      <Section title="Typography" note="Cormorant Garamond for display and italic accents; Manrope for body and UI.">
        <div className="grid gap-8">
          <div>
            <Label>Display 1 · clamp(3rem, 8.2vw, 7.4rem)</Label>
            <p className="font-serif text-d1 text-rosewood">
              Carved by <em className="accent">hand.</em>
            </p>
          </div>
          <div>
            <Label>Display 2</Label>
            <p className="font-serif text-d2 text-rosewood">From log to heirloom.</p>
          </div>
          <div>
            <Label>Display 3</Label>
            <p className="font-serif text-d3 text-rosewood">Made for the way you live.</p>
          </div>
          <div>
            <Label>Display 4</Label>
            <p className="font-serif text-d4 text-rosewood">Doors &amp; Windows</p>
          </div>
          <div>
            <Label>Eyebrow</Label>
            <p className="eyebrow">Heritage woodcraft · Karkala, Karnataka</p>
          </div>
          <div>
            <Label>Lead</Label>
            <p className="max-w-prose text-lead font-light text-muted">
              Since 1986, our craftsmen have turned seasoned timber into doors, furniture and sacred
              spaces.
            </p>
          </div>
          <div>
            <Label>Body with drop cap</Label>
            <p className="dropcap max-w-prose text-muted">
              It began in 1986, when Mrs. Sarala Hegde realised how much potential there was for
              heritage and carved wooden furniture in home décor. Many would have frowned at the idea.
            </p>
          </div>
          <div>
            <Label>Roman numerals</Label>
            <p className="flex gap-6">
              {['i', 'ii', 'iii', 'iv'].map((n) => (
                <span key={n} className="numeral text-[2rem]">
                  {n}.
                </span>
              ))}
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- Ornaments ---------- */}
      <Section title="Ornament library" note="Original motifs drawn from coastal-Karnataka temple woodwork.">
        <ul className="grid gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {[
            ['Lotus', <Lotus key="a" className="h-16 w-20" stroke="#b9814a" />],
            ['Kalasha', <Kalasha key="b" className="h-16 w-10" stroke="#b9814a" />],
            ['Temple arch', <TempleArch key="c" className="h-16 w-12" stroke="#b9814a" />],
            ['Corner bracket', <CornerBracket key="d" className="h-16 w-16" stroke="#b9814a" />],
            ['Diamond bullet', <DiamondBullet key="e" className="h-9 w-9" stroke="#b9814a" />],
            ['Year seal', <YearSeal key="f" className="scale-[0.55]" />],
          ].map(([name, node]) => (
            <li key={name as string} className="grid place-items-center gap-3 border border-teak/15 p-6">
              <span className="grid h-20 place-items-center">{node as React.ReactNode}</span>
              <span className="font-sans text-eyebrow font-semibold uppercase text-muted">
                {name as string}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-8">
          <div>
            <Label>Vine scroll — repeats seamlessly</Label>
            <VineScroll className="h-10 w-full" stroke="#b9814a" />
          </div>
          <div>
            <Label>Bead and reel</Label>
            <BeadAndReel className="h-5 w-full" stroke="#b9814a" />
          </div>
          <div>
            <Label>Section divider</Label>
            <OrnamentDivider tone="honey" />
          </div>
        </div>
      </Section>

      {/* ---------- Controls ---------- */}
      <Section title="Controls" note="Brass fills from the bottom; underlines draw from the left.">
        <div className="flex flex-wrap items-center gap-5">
          <button className="btn btn-ink">Ink outline</button>
          <a href="#controls" className="link-draw font-sans text-eyebrow font-semibold uppercase text-teak">
            Underline draws
          </a>
        </div>

        <div className="surface-wood mt-8 flex flex-wrap items-center gap-5 p-9">
          <button className="btn">Brass outline</button>
          <button className="btn btn-solid">Brass solid</button>
          <a href="#controls" className="link-draw font-sans text-eyebrow font-semibold uppercase text-brass">
            On wood
          </a>
        </div>

        <div className="surface-wood mt-4 grid gap-6 p-9 sm:grid-cols-2">
          <label className="block">
            <span className="field-label">Your name</span>
            <input className="field-input" placeholder="Enter your name" />
          </label>
          <label className="block">
            <span className="field-label">Phone</span>
            <input className="field-input" placeholder="+91" />
          </label>
        </div>
      </Section>

      {/* ---------- Frames ---------- */}
      <Section title="Frames & masks" note="Inset brass hairline with carved corners; temple-arch image mask.">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="surface-wood relative grid h-64 place-items-center">
            <BrassFrame inset="inset-5" animate={false} />
            <span className="font-sans text-eyebrow font-semibold uppercase text-brass">Brass frame</span>
          </div>
          <div className="relative grid h-64 place-items-center">
            <span className="grid h-full w-44 place-items-center rounded-arch border border-honey/60 bg-sandalwood">
              <span className="font-sans text-eyebrow font-semibold uppercase text-muted">Arch mask</span>
            </span>
          </div>
        </div>
      </Section>

      {/* ---------- Motion ---------- */}
      <Section
        title="Motion"
        note="One ease, cubic-bezier(0.22, 0.75, 0.2, 1), at 600ms / 900ms / 1200ms. Everything respects prefers-reduced-motion."
      >
        <ul className="grid gap-3 font-serif text-[1.2rem] text-teak sm:grid-cols-3">
          <li className="border border-teak/15 p-6">600ms — links, buttons, hovers</li>
          <li className="border border-teak/15 p-6">900ms — content reveals</li>
          <li className="border border-teak/15 p-6">1200ms — images, clip-path wipes</li>
        </ul>
      </Section>
    </>
  )
}

function Section({
  title,
  note,
  children,
}: {
  title: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <section id={title.toLowerCase().replace(/\W+/g, '-')} className="surface-paper border-b border-teak/10 py-16">
      <div className="wrap">
        <h2 className="font-serif text-d3 text-rosewood">{title}</h2>
        {note && <p className="mt-3 max-w-prose text-small text-muted">{note}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-muted/70">
      {children}
    </p>
  )
}
