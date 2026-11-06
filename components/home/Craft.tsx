import Link from 'next/link'
import { craftSteps } from '@/content/story'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Plate, PlateImage } from '@/components/ui/Plate'
import { Lozenge } from '@/components/ornament/Ornaments'

export function Craft() {
  return (
    <Section id="craft" index="IV">
      <div className="grid gap-[clamp(2.5rem,5vw,4rem)] md:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] md:items-start md:gap-x-[clamp(2.5rem,5.5vw,4.5rem)]">
        <Reveal>
          <span className="label">The craft</span>
          <h2 className="mb-[2.1rem] mt-4 text-d2">Four stages. The same order, every time.</h2>

          <ol className="border-t border-ink/14">
            {craftSteps.map((step) => (
              <li
                key={step.name}
                className="grid grid-cols-[auto_1fr] gap-[1.1rem] border-b border-ink/8 py-[1.45rem]"
              >
                <Lozenge className="mt-[0.5rem]" />
                <div>
                  <h3 className="text-[1.22rem]">{step.name}</h3>
                  <p className="mt-[0.2rem] text-small text-ink-2">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-8">
            <Link href="/the-craft" className="lnk">
              Go deeper into the craft
            </Link>
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <Plate>
            <PlateImage
              src="/images/editorial/craft-carved-mantapa.jpg"
              alt="A finished carved mantapa with a pierced jaali screen and a deep polished surface"
              sizes="(max-width: 768px) 92vw, 30vw"
              aspect="3/4"
            />
          </Plate>
          <p className="cap mt-[0.8rem]">Mantapa with a pierced jaali back</p>
        </Reveal>
      </div>
    </Section>
  )
}
