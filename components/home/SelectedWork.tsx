import Link from 'next/link'
import { spaces } from '@/content/story'
import { Section, SectionHead } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { PlateImage } from '@/components/ui/Plate'

/**
 * Six pieces, in plates with captions beneath. Two of them — a frieze and a
 * ratha — are wide by nature, so they run wide rather than being squeezed
 * into a portrait cell.
 */
const pieces = [
  {
    src: '/images/editorial/craft-carving-relief.jpg',
    alt: 'Deep relief panel of tigers among pines carved in wood',
    caption: 'Relief panel · tigers',
    space: 'Residential',
    wide: true,
  },
  {
    src: '/images/gallery/worship/temple-door-01.jpg',
    alt: 'Carved temple door',
    caption: 'Temple door',
    space: 'Worship',
  },
  {
    src: '/images/gallery/residential/latest-work-11.jpg',
    alt: 'Pierced roundel carved in a square frame',
    caption: 'Pierced roundel',
    space: 'Residential',
    drop: true,
  },
  {
    src: '/images/gallery/residential/pooja-doors-mantapa-27.jpg',
    alt: 'Carved pooja mantapa',
    caption: 'Pooja mantapa',
    space: 'Residential',
  },
  {
    src: '/images/editorial/hero-carved-teak-panel.jpg',
    alt: 'A wall of carved teak panelling with chevron fluting',
    caption: 'Wall partition · teak',
    space: 'Residential',
  },
  {
    src: '/images/gallery/worship/ratha-01.jpg',
    alt: 'A carved wooden temple ratha',
    caption: 'Ratha',
    space: 'Worship',
    wide: true,
  },
]

export function SelectedWork() {
  return (
    <Section id="work" index="V">
      <Reveal>
        <SectionHead
          title="Selected work."
          lead="Residential, commercial and places of worship — from main doors and pooja mantapas to a temple ratha."
        />
      </Reveal>

      <div className="grid grid-cols-2 gap-[clamp(1.25rem,2.2vw,2rem)] md:grid-cols-3">
        {pieces.map((piece, i) => (
          <Reveal
            key={piece.src}
            className={`${piece.wide ? 'col-span-2' : ''} ${piece.drop ? 'md:mt-[clamp(1.5rem,3vw,3rem)]' : ''}`}
            delay={(i % 3) * 0.05}
          >
            <Link href="/projects" data-cursor="View" className="group block">
              <span className="block overflow-hidden">
                <span className="block transition-transform duration-1100 ease-carve group-hover:scale-[1.04]">
                  <PlateImage
                    src={piece.src}
                    alt={piece.alt}
                    aspect={piece.wide ? '8/5' : '4/5'}
                    sizes={piece.wide ? '(max-width: 768px) 92vw, 62vw' : '(max-width: 768px) 46vw, 30vw'}
                    quality={72}
                  />
                </span>
              </span>
              <span className="mt-[0.68rem] flex justify-between gap-4">
                <span className="cap">{piece.caption}</span>
                <span className="cap">{piece.space}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-[clamp(2.25rem,4vw,3rem)] flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link href="/projects" className="lnk">
            View all 510 photographs
          </Link>
          {spaces.map((space) => (
            <Link
              key={space.slug}
              href={`/projects/${space.slug}`}
              className="border-b border-ink/14 pb-1 font-caps text-[0.8rem] uppercase tracking-[0.12em] text-ink-2 transition-colors duration-500 ease-carve hover:border-ink hover:text-ink"
            >
              {space.name}
            </Link>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
