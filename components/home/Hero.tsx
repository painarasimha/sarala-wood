import Image from 'next/image'
import Link from 'next/link'
import { EnterLines, EnterUp } from '@/components/ui/EnterLines'
import { Plate } from '@/components/ui/Plate'
import { Seal } from '@/components/ornament/Ornaments'

/**
 * The object and the promise, side by side. The entrance runs in CSS so the
 * headline is in the first paint rather than waiting on hydration.
 */
export function Hero() {
  return (
    <section className="pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(2.5rem,4.5vw,4rem)]">
      <div className="wrap grid items-center gap-[clamp(2.5rem,5vw,3.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-x-[clamp(2.5rem,5vw,5rem)]">
        <div>
          <EnterUp>
            <span className="label block sm:whitespace-nowrap">
              Hand-carved woodwork · Karkala, Karnataka
            </span>
          </EnterUp>

          <EnterLines
            tag="h1"
            delay={0.08}
            className="mt-[clamp(1.2rem,2.2vw,1.8rem)] max-w-[14ch] font-serif text-d1"
            lines={[
              <>The first thing a</>,
              <>
                guest <em className="italic text-bronze">touches.</em>
              </>,
            ]}
          />

          <EnterUp delay={0.22}>
            <p className="mt-[clamp(1.2rem,2vw,1.6rem)] max-w-narrow text-lead text-ink-2">
              Since 1986 we have carved doors and frames, wardrobes, furniture and modular
              kitchens to order at Nandalike — in teak, shisham, mango and meranti, from designs
              drawn out of heritage architecture.
            </p>
          </EnterUp>

          <EnterUp
            delay={0.3}
            className="mt-[clamp(1.8rem,3vw,2.4rem)] flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-[0.85rem]"
          >
            <Link href="/collections" className="btn btn-fill w-full sm:w-auto">
              See what we make
            </Link>
            <Link href="/contact" className="btn w-full sm:w-auto">
              Start a commission
            </Link>
          </EnterUp>

          <EnterUp delay={0.36}>
            <div className="mt-[clamp(2rem,3.5vw,2.75rem)] flex max-w-[44ch] items-center gap-[0.9rem] border-t border-ink/8 pt-[1.35rem]">
              <Seal className="h-[34px] w-[34px] shrink-0 text-bronze" />
              <p className="cap">
                Founded by Mrs. Sarala Hegde. Still carving at the same workshop, in the same
                village, thirty-nine years later.
              </p>
            </div>
          </EnterUp>
        </div>

        <EnterUp delay={0.14} className="mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-none">
          <Plate>
            <Image
              src="/images/editorial/hero-main-door.jpg"
              alt="A teak main door carved with a kalasha panel, flanked by turned and carved pilasters"
              width={1200}
              height={1345}
              priority
              fetchPriority="high"
              quality={60}
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 44vw"
              className="h-auto w-full"
            />
          </Plate>
          <div className="mt-[0.8rem] flex justify-between gap-4">
            <span className="cap">Main door &amp; frame · carved teak</span>
            <span className="cap">Nandalike</span>
          </div>
        </EnterUp>
      </div>
    </section>
  )
}
