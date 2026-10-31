'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { CornerBracket } from '@/components/ornament/Ornaments'
import { DURATION, EASE, usePrefersReducedMotion, useRevealed } from '@/lib/motion'

/* ------------------------------------------------------------------ *
 * Brass frame — an inset hairline with carved corner brackets. The
 * hairline draws itself in when the frame enters view.
 * ------------------------------------------------------------------ */
export function BrassFrame({
  className = '',
  inset = 'inset-4',
  tone = 'brass',
  corners = true,
  animate = true,
}: {
  className?: string
  inset?: string
  tone?: 'brass' | 'honey'
  corners?: boolean
  animate?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const revealed = useRevealed(ref, reduced, '-8% 0px -8% 0px')
  const colour = tone === 'brass' ? 'rgba(201,163,95,0.55)' : 'rgba(185,129,74,0.55)'
  const show = reduced || !animate || revealed

  return (
    <div ref={ref} className={`pointer-events-none absolute ${inset} z-10 ${className}`} aria-hidden="true">
      {/* The four edges draw outward from the centre of each side. */}
      <motion.span
        className="absolute left-0 top-0 h-px w-full origin-center"
        style={{ background: colour }}
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: show ? 1 : 0 }}
        transition={{ duration: DURATION.slow, ease: EASE }}
      />
      <motion.span
        className="absolute bottom-0 left-0 h-px w-full origin-center"
        style={{ background: colour }}
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: show ? 1 : 0 }}
        transition={{ duration: DURATION.slow, ease: EASE, delay: 0.06 }}
      />
      <motion.span
        className="absolute left-0 top-0 h-full w-px origin-center"
        style={{ background: colour }}
        initial={reduced ? false : { scaleY: 0 }}
        animate={{ scaleY: show ? 1 : 0 }}
        transition={{ duration: DURATION.slow, ease: EASE, delay: 0.12 }}
      />
      <motion.span
        className="absolute right-0 top-0 h-full w-px origin-center"
        style={{ background: colour }}
        initial={reduced ? false : { scaleY: 0 }}
        animate={{ scaleY: show ? 1 : 0 }}
        transition={{ duration: DURATION.slow, ease: EASE, delay: 0.18 }}
      />

      {corners && (
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: DURATION.base, ease: EASE, delay: 0.42 }}
        >
          <CornerBracket
            className="absolute -left-[6px] -top-[6px] h-11 w-11"
            stroke={tone === 'brass' ? '#c9a35f' : '#b9814a'}
          />
          <CornerBracket
            className="absolute -right-[6px] -top-[6px] h-11 w-11 -scale-x-100"
            stroke={tone === 'brass' ? '#c9a35f' : '#b9814a'}
          />
          <CornerBracket
            className="absolute -bottom-[6px] -left-[6px] h-11 w-11 -scale-y-100"
            stroke={tone === 'brass' ? '#c9a35f' : '#b9814a'}
          />
          <CornerBracket
            className="absolute -bottom-[6px] -right-[6px] h-11 w-11 -scale-100"
            stroke={tone === 'brass' ? '#c9a35f' : '#b9814a'}
          />
        </motion.div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Arched image — a temple-door mask with an outline a shade outside it.
 * ------------------------------------------------------------------ */
export function ArchImage({
  src,
  alt,
  priority = false,
  sizes = '(max-width: 768px) 86vw, 42vw',
  className = '',
  blurDataURL,
  children,
}: {
  src: string
  alt: string
  priority?: boolean
  sizes?: string
  className?: string
  blurDataURL?: string
  children?: ReactNode
}) {
  return (
    <div className={`relative p-5 sm:p-6 ${className}`}>
      <span className="pointer-events-none absolute inset-0 rounded-arch border border-honey/50" aria-hidden="true" />
      <RevealImage
        src={src}
        alt={alt}
        priority={priority}
        sizes={sizes}
        blurDataURL={blurDataURL}
        className="aspect-[4/5] overflow-hidden rounded-arch shadow-lift"
      />
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Image that is uncovered by a clip-path mask as it scrolls in, with an
 * optional slow parallax drift on the picture inside it.
 * ------------------------------------------------------------------ */
export function RevealImage({
  src,
  alt,
  className = '',
  sizes = '100vw',
  priority = false,
  blurDataURL,
  parallax = 0,
  quality = 82,
}: {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
  blurDataURL?: string
  /** Pixels of drift across the viewport; 0 turns parallax off. */
  parallax?: number
  quality?: 60 | 72 | 82 | 90
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const revealed = useRevealed(ref, reduced, '-6% 0px -6% 0px')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax])

  const show = reduced || priority || revealed

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={reduced || priority ? false : { clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: show ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
      transition={{ duration: DURATION.slow, ease: EASE }}
    >
      <motion.div className="h-full w-full" style={reduced || !parallax ? undefined : { y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
          className="h-full w-full object-cover"
          style={parallax ? { scale: 1.08 } : undefined}
        />
      </motion.div>
    </motion.div>
  )
}
