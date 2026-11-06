import Link from 'next/link'
import { collections } from '@/content/collections'
import { Section, SectionHead } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { PlateImage } from '@/components/ui/Plate'

/* An editorial arrangement, not four equal cards: two large and staggered,
   two smaller, and a note in the margin. */
const SPAN = [
  'md:col-span-3',
  'md:col-span-3 md:mt-[clamp(2rem,5vw,4.5rem)]',
  'md:col-span-2',
  'md:col-span-2 md:mt-[clamp(1.5rem,3vw,2.5rem)]',
]
const ASPECT = ['3/4', '3/4', '4/5', '4/5']
const SIZES = [
  '(max-width: 768px) 46vw, 36vw',
  '(max-width: 768px) 46vw, 36vw',
  '(max-width: 768px) 46vw, 24vw',
  '(max-width: 768px) 46vw, 24vw',
]

export function Collections() {
  return (
    <Section id="make" index="II" tight>
      <Reveal>
        <SectionHead
          title="Four things, made to the size of your room."
          lead="Nothing here is cut down from a standard. Send the opening, the drawing or the space, and the piece is made for it."
        />
      </Reveal>

      <div className="grid grid-cols-2 gap-x-[clamp(1.25rem,2.2vw,2rem)] gap-y-[clamp(2rem,3.5vw,3rem)] md:grid-cols-6 md:items-start">
        {collections.map((collection, i) => (
          <Reveal key={collection.slug} className={SPAN[i]} delay={(i % 2) * 0.05}>
            <Link href={`/collections/${collection.slug}`} className="group block">
              <span className="block overflow-hidden">
                <span className="block transition-transform duration-1100 ease-carve group-hover:scale-[1.035]">
                  <PlateImage
                    src={collection.hero.src}
                    alt=""
                    aspect={ASPECT[i]}
                    sizes={SIZES[i]}
                    quality={82}
                  />
                </span>
              </span>
              <span className="mt-4 flex items-baseline gap-3">
                <span className="numeral">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-serif text-[1.3rem]">{collection.name}</span>
              </span>
              <span className="cap mt-[0.3rem] block max-w-[32ch]">{collection.summary}</span>
            </Link>
          </Reveal>
        ))}

        <Reveal
          className="col-span-2 md:col-span-2 md:mt-[clamp(1.5rem,3vw,2.5rem)] md:border-l md:border-ink/8 md:pl-6"
          delay={0.1}
        >
          <span className="label">Timber</span>
          <p className="mt-[0.65rem] text-small text-ink-2">
            Teak, shisham, mango and meranti — or bring your own. The board is chosen for the
            piece it is going to become, not the other way round.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
