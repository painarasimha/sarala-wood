'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { BrassFrame } from '@/components/ui/Frames'
import { EnterLines, EnterUp } from '@/components/ui/EnterLines'
import { MagneticLink } from '@/components/ui/MagneticLink'
import { usePrefersReducedMotion } from '@/lib/motion'

/**
 * The hero's entrance runs in CSS so the headline is in the first paint rather
 * than waiting on hydration; only the scroll-linked drift and fade — pure
 * enhancement — come from JavaScript.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-ebony">
      {/* The photograph, pushing in slowly and drifting on scroll */}
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y }}>
        <Image
          src="/images/editorial/hero-carved-teak-panel.jpg"
          alt="A wall of hand-carved teak panelling with chevron fluting, made at the Sarala workshop in Nandalike"
          fill
          priority
          fetchPriority="high"
          quality={72}
          sizes="100vw"
          className={`object-cover ${reduced ? '' : 'animate-slow-push'}`}
        />
      </motion.div>

      {/* Two gradients: one to carry the type, one to seat the section below */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(94deg, rgba(28,18,12,0.94) 0%, rgba(28,18,12,0.72) 42%, rgba(28,18,12,0.22) 78%, rgba(28,18,12,0.35) 100%), linear-gradient(0deg, rgba(28,18,12,0.92) 0%, rgba(28,18,12,0.1) 46%)',
        }}
        aria-hidden="true"
      />

      <BrassFrame inset="inset-x-3 bottom-3 top-[84px] sm:inset-x-5 sm:bottom-5 sm:top-[96px]" />

      <motion.div
        className="wrap relative z-20 pb-[13vh] pt-32"
        style={reduced ? undefined : { opacity: fade }}
      >
        <EnterUp>
          <span className="eyebrow block text-brass sm:whitespace-nowrap">
            Heritage woodcraft · Karkala, Karnataka
          </span>
        </EnterUp>

        <EnterLines
          tag="h1"
          delay={0.08}
          className="mt-6 max-w-[13ch] font-serif text-d1 text-sandalwood"
          lines={[
            <>Carved by hand.</>,
            <>
              Made to <em className="accent font-serif italic">outlive us.</em>
            </>,
          ]}
        />

        <EnterUp delay={0.22}>
          <p className="mt-7 max-w-narrow font-sans text-lead font-light text-sandalwood/80">
            Since 1986, our craftsmen have turned seasoned timber into doors, furniture and sacred
            spaces — each one carved to be handed down.
          </p>
        </EnterUp>

        <EnterUp
          delay={0.3}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 [&>span]:w-full sm:[&>span]:w-auto"
        >
          <MagneticLink href="/collections" className="btn btn-solid w-full sm:w-auto">
            Explore the collections
          </MagneticLink>
          <MagneticLink href="/the-craft" className="btn w-full sm:w-auto">
            See how it is made
          </MagneticLink>
        </EnterUp>
      </motion.div>

      {/* The year, right-aligned, desktop only */}
      <motion.div
        className="absolute bottom-[13vh] right-[var(--gutter)] z-20 hidden text-right lg:block"
        style={reduced ? undefined : { opacity: fade }}
      >
        <EnterUp delay={0.36}>
          <b className="block font-serif text-[4rem] font-normal leading-none text-sandalwood">1986</b>
          <span className="mt-2 block font-serif text-[1.02rem] italic leading-snug text-brass">
            carving in coastal
            <br />
            Karnataka ever since
          </span>
        </EnterUp>
      </motion.div>

      <Link
        href="#story"
        aria-label="Scroll to our story"
        className="absolute bottom-6 left-1/2 z-20 hidden h-14 w-px -translate-x-1/2 sm:block"
      >
        <span
          className="block h-full w-full animate-cue bg-gradient-to-b from-brass to-transparent"
          aria-hidden="true"
        />
      </Link>
    </section>
  )
}
