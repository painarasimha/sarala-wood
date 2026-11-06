import { vocabulary, vocabularyIntro } from '@/content/vocabulary'
import { Section, SectionHead } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import {
  BeadMoulding,
  DiamondDiaper,
  Jaali,
  Kalasha,
  Padma,
  PatraLata,
} from '@/components/ornament/Ornaments'

const MOTIFS = {
  padma: Padma,
  kalasha: Kalasha,
  'patra-lata': PatraLata,
  jaali: Jaali,
  bead: BeadMoulding,
  diaper: DiamondDiaper,
} as const

/**
 * The carving vocabulary, drawn. This is the section that could belong to no
 * other business — see content/vocabulary.ts for what is verified and what
 * still needs the workshop's own words.
 */
export function Vocabulary() {
  return (
    <Section id="vocabulary" index="I">
      <Reveal>
        <SectionHead
          eyebrow={vocabularyIntro.eyebrow}
          title={vocabularyIntro.heading}
          lead={vocabularyIntro.lead}
        />
      </Reveal>

      <Reveal delay={0.06}>
        <ul className="grid grid-cols-2 gap-px border border-ink/8 bg-ink/8 sm:grid-cols-3 xl:grid-cols-6">
          {vocabulary.map((item) => {
            const Motif = MOTIFS[item.motif]
            return (
              <li key={item.name} className="bg-mat px-4 py-[clamp(1.3rem,2.4vw,1.8rem)] text-center">
                <Motif className="mx-auto mb-[0.9rem] h-auto w-full max-w-[72px] text-bronze" />
                <p className="font-caps text-[0.72rem] uppercase tracking-[0.13em] text-ink-2">
                  {item.name}
                </p>
                <p className="mt-[0.28rem] font-serif text-[0.86rem] italic text-ink-3">{item.gloss}</p>
              </li>
            )
          })}
        </ul>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 max-w-prose text-cap">
          Seen on: {vocabulary.map((m) => m.seenOn.toLowerCase()).join(' · ')}.
        </p>
      </Reveal>
    </Section>
  )
}
