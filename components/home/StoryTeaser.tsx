import Link from 'next/link'
import { story } from '@/content/story'
import { ArchImage } from '@/components/ui/Frames'
import { Reveal } from '@/components/ui/Reveal'
import { YearSeal } from '@/components/ornament/Ornaments'

export function StoryTeaser() {
  return (
    <section id="story" className="surface-paper py-section lg:py-section-lg">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-[7vw]">
        <Reveal>
          <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
            <ArchImage
              src={story.portrait.src}
              alt={story.portrait.alt}
              sizes="(max-width: 1024px) 86vw, 38vw"
            />
            <YearSeal className="absolute -bottom-6 right-0 scale-[0.78] sm:scale-90 lg:-right-6 lg:bottom-14 lg:scale-100" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <span className="eyebrow">{story.eyebrow}</span>
          <h2 className="mt-5 max-w-[14ch] font-serif text-d2">
            A home is remembered by its <em className="accent">wood.</em>
          </h2>

          <p className="dropcap mt-8 max-w-prose text-muted">{story.body[0]}</p>
          <p className="mt-5 max-w-prose text-muted">{story.body[1]}</p>

          <div className="mt-9">
            <p className="font-serif text-[1.6rem] italic text-teak">{story.signature.name}</p>
            <p className="mt-1 font-sans text-eyebrow font-semibold uppercase text-muted">
              {story.signature.role}
            </p>
          </div>

          <Link
            href="/our-story"
            className="link-draw mt-9 inline-block font-sans text-eyebrow font-semibold uppercase text-teak"
          >
            Read the whole story
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
