'use client'

import { motion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { DURATION, EASE, usePrefersReducedMotion, useRevealed } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Seconds of delay before this block starts. */
  delay?: number
  /** 'rise' lifts and fades; 'wipe' uncovers with a clip-path mask. */
  as?: 'rise' | 'wipe'
}

/**
 * The one entrance used for ordinary content blocks. Reduced motion collapses
 * it to a plain render, with no transform and no opacity step.
 */
export function Reveal({ children, className, delay = 0, as = 'rise' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const shown = useRevealed(ref, reduced)

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  const hidden = as === 'wipe' ? { clipPath: 'inset(0 0 100% 0)' } : { opacity: 0, y: 38 }
  const visible = as === 'wipe' ? { clipPath: 'inset(0 0 0% 0)' } : { opacity: 1, y: 0 }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={shown ? visible : hidden}
      transition={{ duration: as === 'wipe' ? DURATION.slow : DURATION.base, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Headline reveal, line by line. Each line sits in an overflow-hidden band and
 * rises out of it, which reads as type being lifted off a block rather than
 * faded in.
 */
export function RevealLines({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  tag: Tag = 'h2',
}: {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  tag?: 'h1' | 'h2' | 'h3' | 'p'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const shown = useRevealed(ref, reduced)

  return (
    <div ref={ref}>
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className={`block overflow-hidden pb-[0.08em] ${lineClassName}`}>
            <motion.span
              className="block"
              initial={reduced ? false : { y: '108%' }}
              animate={{ y: shown ? '0%' : '108%' }}
              transition={{ duration: DURATION.slow, ease: EASE, delay: delay + i * 0.11 }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  )
}
