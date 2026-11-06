import Link from 'next/link'
import { story } from '@/content/story'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Plate, PlateImage } from '@/components/ui/Plate'
import { Seal } from '@/components/ornament/Ornaments'

export function Story() {
  return (
    <div className="bg-paper-2">
      <Section id="story" index="III">
        <div className="grid items-center gap-[clamp(2.5rem,5vw,4rem)] md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:gap-x-[clamp(2.5rem,5.5vw,4.5rem)]">
          <Reveal>
            <Plate>
              <PlateImage
                src={story.portrait.src}
                alt={story.portrait.alt}
                sizes="(max-width: 768px) 92vw, 34vw"
                aspect="4/5"
              />
            </Plate>
          </Reveal>

          <Reveal delay={0.06}>
            <span className="label">Our story</span>
            <h2 className="mb-[1.45rem] mt-4 text-d2">
              Started with ₹4,40,000 and a conviction nobody shared.
            </h2>
            {story.body.slice(0, 3).map((paragraph, i) => (
              <p key={i} className={`max-w-prose text-ink-2 ${i > 0 ? 'mt-[1.05rem]' : ''}`}>
                {paragraph}
              </p>
            ))}

            <div className="mt-[1.8rem] flex items-center gap-[0.95rem]">
              <Seal className="h-[30px] w-[30px] shrink-0 text-bronze" />
              <span>
                <b className="block font-serif text-[1.3rem] font-normal">{story.signature.name}</b>
                <span className="label label-mute text-[0.68rem]">Founder</span>
              </span>
            </div>

            <p className="mt-[1.8rem]">
              <Link href="/our-story" className="lnk">
                Read the whole story
              </Link>
            </p>
          </Reveal>
        </div>
      </Section>
    </div>
  )
}
