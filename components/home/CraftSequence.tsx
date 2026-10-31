'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { craftSteps } from '@/content/story'
import { BeadAndReel, DiamondBullet } from '@/components/ornament/Ornaments'
import { usePrefersReducedMotion } from '@/lib/motion'

/**
 * The four stages of the craft, pinned: the section holds while the steps
 * advance one by one and the photograph behind them changes.
 *
 * Below `lg`, and under prefers-reduced-motion, nothing is pinned — the same
 * content stacks and scrolls normally. The pin is an enhancement, never the
 * only way to read the section.
 */
export function CraftSequence() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    if (reduced) return
    const section = sectionRef.current
    if (!section) return

    gsap.registerPlugin(ScrollTrigger)

    const context = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)': () => {
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => `+=${craftSteps.length * 48}%`,
            pin: true,
            pinSpacing: true,
            scrub: true,
            onUpdate: (self) => {
              const index = Math.min(
                craftSteps.length - 1,
                Math.floor(self.progress * craftSteps.length)
              )
              setActive(index)
            },
          })
        },
      })
    }, section)

    return () => context.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="craft"
      className="surface-wood relative overflow-hidden py-section lg:flex lg:min-h-[100svh] lg:items-center lg:py-0 lg:pt-24"
    >
      <BeadAndReel className="absolute inset-x-0 top-0 h-4 w-full opacity-25" stroke="#c9a35f" />

      <div className="wrap w-full">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-7 lg:mb-16">
          <div>
            <span className="eyebrow">The Craft</span>
            <h2 className="mt-4 max-w-[13ch] font-serif text-d2">
              From log to <em className="accent">heirloom.</em>
            </h2>
          </div>
          <p className="max-w-[38ch] font-light text-sandalwood/70">
            Every piece passes through the same four stages. Nothing is rushed, because wood
            remembers how it was treated.
          </p>
        </div>

        {/* ---------- Desktop: pinned, one step at a time ---------- */}
        <div className="hidden lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-[5vw]">
          <ol className="border-t border-brass/25">
            {craftSteps.map((step, i) => {
              const current = i === active
              return (
                <li
                  key={step.name}
                  className="border-b border-brass/10 transition-colors duration-900 ease-carve"
                >
                  <div
                    className={`grid grid-cols-[auto_1fr] gap-6 py-6 transition-opacity duration-900 ease-carve ${
                      current ? 'opacity-100' : 'opacity-35'
                    }`}
                  >
                    <span className="numeral pt-1 text-[2.2rem] leading-none text-brass">
                      {step.index}.
                    </span>
                    <div>
                      <h3 className="font-serif text-d4 text-sandalwood">{step.name}</h3>
                      <div
                        className="grid transition-[grid-template-rows,opacity] duration-900 ease-carve"
                        style={{
                          gridTemplateRows: current ? '1fr' : '0fr',
                          opacity: current ? 1 : 0,
                        }}
                      >
                        <div className="overflow-hidden">
                          <p className="mt-3 max-w-prose text-small font-light text-sandalwood/70">
                            {step.body}
                          </p>
                        </div>
                      </div>
                      {!current && (
                        <p className="mt-2 font-serif text-[1.02rem] italic text-brass/80">
                          {step.short}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="relative aspect-[4/5] w-full">
            <span className="pointer-events-none absolute -inset-3 border border-brass/25" aria-hidden="true" />
            {craftSteps.map((step, i) =>
              step.image ? (
                <Image
                  key={step.name}
                  src={step.image.src}
                  alt={step.image.alt}
                  fill
                  sizes="42vw"
                  quality={82}
                  className="object-cover transition-opacity duration-1200 ease-carve"
                  style={{ opacity: i === active ? 1 : 0 }}
                />
              ) : null
            )}
            <span
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ebony/55 to-transparent"
              aria-hidden="true"
            />
            <span className="absolute bottom-5 left-5 font-sans text-eyebrow font-semibold uppercase text-brass">
              {craftSteps[active].index}. {craftSteps[active].name}
            </span>
          </div>
        </div>

        {/* ---------- Mobile and reduced motion: stacked ---------- */}
        <ol className="grid gap-10 lg:hidden">
          {craftSteps.map((step) => (
            <li key={step.name} className="border-t border-brass/20 pt-6">
              <div className="flex items-baseline gap-4">
                <span className="numeral text-[1.8rem] leading-none text-brass">{step.index}.</span>
                <h3 className="font-serif text-d4 text-sandalwood">{step.name}</h3>
              </div>
              {step.image && (
                <div className="relative mt-5 aspect-[5/4] w-full overflow-hidden">
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="92vw"
                    quality={72}
                    className="object-cover"
                  />
                </div>
              )}
              <p className="mt-4 text-small font-light text-sandalwood/70">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex items-center gap-3 lg:mt-12">
          <DiamondBullet className="h-3 w-3 shrink-0" stroke="#c9a35f" />
          <Link href="/the-craft" className="link-draw font-sans text-eyebrow font-semibold uppercase text-brass">
            Go deeper into the craft
          </Link>
        </div>
      </div>
    </section>
  )
}
