'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { railSelection } from '@/content/gallery'
import { Reveal } from '@/components/ui/Reveal'
import { usePrefersReducedMotion } from '@/lib/motion'

/**
 * A horizontal rail of recent work. On a wide screen the track slides sideways
 * as the section scrolls; on a narrow one — and under reduced motion — it is an
 * ordinary swipeable, snapping row, which is the better interaction on a phone
 * anyway.
 */
export function GalleryRail() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-26%'])

  return (
    <section ref={ref} className="surface-wood overflow-hidden py-section lg:py-section-lg">
      <div className="wrap">
        <Reveal className="mb-12 max-w-[40rem]">
          <span className="eyebrow">From the workshop</span>
          <h2 className="mt-4 font-serif text-d2">
            Every grain <em className="accent">tells a story.</em>
          </h2>
          <p className="mt-5 text-sandalwood/70">
            A few recent pieces — carved panels, temple doors, turned pillars and the details that
            take the longest.
          </p>
        </Reveal>
      </div>

      {/* Reduced motion and touch: a plain snapping rail */}
      <div className="rail-scroll flex gap-5 overflow-x-auto px-[var(--gutter)] pb-6 [scroll-snap-type:x_mandatory] lg:hidden">
        {railSelection.map((item) => (
          <figure key={item.id} className="w-[72vw] shrink-0 [scroll-snap-align:center] sm:w-[46vw]">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 72vw, 46vw"
                quality={72}
                placeholder="blur"
                blurDataURL={item.blurDataURL}
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 font-serif text-[1.02rem] italic text-brass">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Desktop: the track drifts sideways with the scroll */}
      <motion.div
        className="hidden gap-7 pl-[var(--gutter)] lg:flex"
        style={reduced ? undefined : { x }}
      >
        {railSelection.map((item, i) => (
          <figure
            key={item.id}
            className={`shrink-0 ${i % 2 === 1 ? 'mt-16' : ''}`}
            style={{ width: 'clamp(240px, 23vw, 380px)' }}
          >
            <Link href="/projects" data-cursor="View" className="group block">
              <div
                className={`relative overflow-hidden ${i % 3 === 2 ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="23vw"
                  quality={72}
                  placeholder="blur"
                  blurDataURL={item.blurDataURL}
                  className="object-cover transition-transform duration-1200 ease-carve group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-3.5 font-serif text-[1.05rem] italic text-brass">
                {item.caption}
              </figcaption>
            </Link>
          </figure>
        ))}
      </motion.div>

      <div className="wrap mt-12">
        <Link href="/projects" className="btn">
          See all {railSelection.length > 0 ? 'the projects' : 'projects'}
        </Link>
      </div>
    </section>
  )
}
