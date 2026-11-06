import type { Metadata } from 'next'
import { vocabulary } from '@/content/vocabulary'
import {
  BeadMoulding,
  DiamondDiaper,
  HouseMark,
  Jaali,
  Kalasha,
  Lozenge,
  Padma,
  PatraLata,
  Seal,
} from '@/components/ornament/Ornaments'
import { BeadRule, JaaliBand } from '@/components/ui/Section'
import { Plate, PlateImage } from '@/components/ui/Plate'

export const metadata: Metadata = {
  title: 'Styleguide',
  description: 'The design system behind the Sarala Wood Industries site.',
  robots: { index: false, follow: false },
}

const PALETTE = [
  ['Paper', '#F3EEE4', 'bg-paper'],
  ['Paper 2', '#EDE6D8', 'bg-paper-2'],
  ['Mat', '#FDFBF7', 'bg-mat'],
  ['Bronze', '#855D34', 'bg-bronze'],
  ['Bronze 2', '#A98247', 'bg-bronze-2'],
  ['Ink 3', '#756657', 'bg-ink-3'],
  ['Ink 2', '#4C4137', 'bg-ink-2'],
  ['Ink', '#191310', 'bg-ink'],
  ['Dark', '#15110E', 'bg-dark'],
] as const

const MOTIFS = [
  ['Padma', Padma],
  ['Kalasha', Kalasha],
  ['Running vine', PatraLata],
  ['Jaali', Jaali],
  ['Bead moulding', BeadMoulding],
  ['Diamond diaper', DiamondDiaper],
] as const

export default function StyleguidePage() {
  return (
    <>
      <header className="pb-10 pt-[clamp(3rem,6vw,5rem)]">
        <div className="wrap">
          <p className="label">Internal</p>
          <h1 className="mt-5 max-w-[16ch] text-d1">
            The design <em className="italic text-bronze">system.</em>
          </h1>
          <p className="mt-7 max-w-prose text-lead text-ink-2">
            Every colour, type size, motif and control used on this site, in one place. Not linked
            from the site and not indexed.
          </p>
        </div>
      </header>

      <Block title="Palette" note="Paper, not timber — the only wood on the page is the work itself.">
        <ul className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
          {PALETTE.map(([name, hex, bg]) => (
            <li key={name}>
              <span className={`block aspect-square border border-ink/14 ${bg}`} />
              <p className="label label-mute mt-2 text-[0.64rem]">{name}</p>
              <p className="font-serif text-[0.9rem] text-ink-2">{hex}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block
        title="Patterns"
        note="Traced from the carving in the workshop's own photographs. The diaper is the page texture; the jaali is an inlay; the bead is the rule between sections."
      >
        <div className="grid gap-6">
          <div>
            <Label>Diamond diaper — the page itself, at 3%</Label>
            <div className="h-24 border border-ink/14" />
          </div>
          <div>
            <Label>Jaali band</Label>
            <JaaliBand />
          </div>
          <div>
            <Label>Bead and reel rule</Label>
            <BeadRule />
          </div>
          <div>
            <Label>The dark ground, with the jaali behind it</Label>
            <div className="surface-dark grid h-40 place-items-center">
              <span className="label">surface-dark</span>
            </div>
          </div>
        </div>
      </Block>

      <Block title="Typography" note="EB Garamond throughout; Marcellus — Roman inscriptional capitals — for labels.">
        <div className="grid gap-8">
          <div>
            <Label>Display 1</Label>
            <p className="text-d1">
              Carved by <em className="italic text-bronze">hand.</em>
            </p>
          </div>
          <div>
            <Label>Display 2</Label>
            <p className="text-d2">From log to heirloom.</p>
          </div>
          <div>
            <Label>Display 3</Label>
            <p className="text-d3">Doors &amp; Windows</p>
          </div>
          <div>
            <Label>Label — Marcellus caps</Label>
            <p className="label">Hand-carved woodwork · Karkala, Karnataka</p>
          </div>
          <div>
            <Label>Lead</Label>
            <p className="max-w-prose text-lead text-ink-2">
              Since 1986 we have carved doors and frames, wardrobes, furniture and modular
              kitchens to order at Nandalike.
            </p>
          </div>
          <div>
            <Label>Caption</Label>
            <p className="cap">Main door &amp; frame · carved teak</p>
          </div>
          <div>
            <Label>Numeral</Label>
            <p className="flex gap-6">
              {['I', 'II', 'III', 'IV'].map((n) => (
                <span key={n} className="numeral text-[1.4rem]">
                  {n}
                </span>
              ))}
            </p>
          </div>
        </div>
      </Block>

      <Block title="Motifs" note="Six marks, each one visible in their work. See content/vocabulary.ts for what is verified and what still needs the workshop's own words.">
        <ul className="grid grid-cols-2 gap-px border border-ink/8 bg-ink/8 sm:grid-cols-3 lg:grid-cols-6">
          {MOTIFS.map(([name, Motif]) => (
            <li key={name} className="grid place-items-center gap-3 bg-mat p-6 text-center">
              <Motif className="h-16 w-16 text-bronze" />
              <span className="label label-mute text-[0.64rem]">{name}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid grid-cols-3 gap-px border border-ink/8 bg-ink/8 sm:grid-cols-3">
          <div className="grid place-items-center gap-3 bg-mat p-6">
            <HouseMark className="h-12 w-12" />
            <span className="label label-mute text-[0.64rem]">House mark</span>
          </div>
          <div className="grid place-items-center gap-3 bg-mat p-6">
            <Seal className="h-12 w-12 text-bronze" />
            <span className="label label-mute text-[0.64rem]">Seal</span>
          </div>
          <div className="grid place-items-center gap-3 bg-mat p-6">
            <Lozenge />
            <span className="label label-mute text-[0.64rem]">Lozenge</span>
          </div>
        </div>

        <dl className="mt-8 grid gap-px border border-ink/8 bg-ink/8 sm:grid-cols-2 lg:grid-cols-3">
          {vocabulary.map((item) => (
            <div key={item.name} className="bg-mat p-6">
              <dt className="font-serif text-[1.15rem]">
                {item.name} <span className="italic text-ink-3">{item.gloss}</span>
              </dt>
              <dd className="label label-mute mt-2 text-[0.64rem]">{item.seenOn}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block title="The plate" note="How every photograph is presented: a white mount, a hairline and four carved corner marks.">
        <div className="max-w-sm">
          <Plate>
            <PlateImage
              src="/images/editorial/story-carved-main-door.jpg"
              alt="Carved main door detail"
              sizes="380px"
              aspect="4/5"
            />
          </Plate>
          <p className="cap mt-3">Caption sits beneath, never over the picture</p>
        </div>
      </Block>

      <Block title="Controls">
        <div className="flex flex-wrap items-center gap-5">
          <button className="btn">Outline</button>
          <button className="btn btn-fill">Filled</button>
          <a href="#controls" className="lnk">
            Underlined link
          </a>
        </div>

        <div className="surface-dark mt-8 flex flex-wrap items-center gap-5 p-9">
          <button className="btn btn-light">On the dark ground</button>
          <span className="label">Label on dark</span>
        </div>

        <div className="mt-6 grid gap-6 border border-ink/14 p-8 sm:grid-cols-2">
          <label className="block">
            <span className="field-label">Your name</span>
            <input className="field-input" placeholder="Enter your name" />
          </label>
          <label className="block">
            <span className="field-label">Phone</span>
            <input className="field-input" placeholder="+91" />
          </label>
        </div>
      </Block>

      <Block title="Motion" note="One ease — cubic-bezier(0.2, 0.7, 0.2, 1). The first screen animates in CSS; everything below the fold uses a single rise-and-fade on scroll.">
        <ul className="grid gap-3 font-serif text-[1.15rem] text-ink-2 sm:grid-cols-3">
          <li className="border border-ink/14 p-6">500ms — links, buttons, hovers</li>
          <li className="border border-ink/14 p-6">620ms — the first screen, in CSS</li>
          <li className="border border-ink/14 p-6">800ms — reveals on scroll</li>
        </ul>
      </Block>
    </>
  )
}

function Block({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-ink/8 py-14">
      <div className="wrap">
        <h2 className="text-d2">{title}</h2>
        {note && <p className="mt-3 max-w-prose text-small text-ink-2">{note}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="label label-mute mb-3 text-[0.64rem]">{children}</p>
}
