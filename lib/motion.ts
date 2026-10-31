'use client'

import { useEffect, useState, type RefObject } from 'react'
import { useInView } from 'framer-motion'

/**
 * The house motion vocabulary: slow, weighted, never bouncy.
 * 600–1200ms on a single custom ease, used everywhere so the whole site moves
 * at one pace.
 */
export const EASE = [0.22, 0.75, 0.2, 1] as const
export const EASE_CSS = 'cubic-bezier(0.22, 0.75, 0.2, 1)'

export const DURATION = {
  quick: 0.6,
  base: 0.9,
  slow: 1.2,
} as const

/** Reads the user's motion preference and keeps up if they change it. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/** True on a device with a real pointer — the cursor and magnetism are desktop-only. */
export function useHasFinePointer(): boolean {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    setFine(query.matches)
    const onChange = (event: MediaQueryListEvent) => setFine(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return fine
}

/** Rise-and-fade, the default entrance for a block of content. */
export const rise = {
  hidden: { opacity: 0, y: 38 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
}

/** A clip-path wipe, used for image reveals: the image is uncovered, not faded. */
export const wipe = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: { clipPath: 'inset(0 0 0% 0)', transition: { duration: DURATION.slow, ease: EASE } },
}

/** Children stagger in at a walking pace. */
export const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay, delayChildren: 0.1 } },
})

/**
 * True once the element has been seen — or once we can tell it was already on
 * screen when the page loaded.
 *
 * The IntersectionObserver alone is not enough: its first callback is async, so
 * a page scrolled (or deep-linked past the fold) before that callback runs
 * would leave content permanently hidden. The mount check closes that gap by
 * revealing anything that starts at or above the fold.
 */
export function useRevealed(ref: RefObject<HTMLElement | null>, reduced: boolean, margin = '-10% 0px -10% 0px') {
  const inView = useInView(ref, { once: true, margin: margin as `${number}% ${number}px ${number}% ${number}px` })
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    if (reduced || seen) return
    const element = ref.current
    if (!element) return

    // Anything at or above the fold counts as seen: that covers the first
    // screen, and anything the page has already been jumped past.
    const check = () => {
      if (!element.isConnected) return false
      if (element.getBoundingClientRect().top < window.innerHeight) {
        setSeen(true)
        return true
      }
      return false
    }

    if (check()) return

    // Still below the fold — the observer handles the ordinary case, and this
    // catches an instant jump that skips straight past it. The listener drops
    // away as soon as the element has been seen.
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [ref, reduced, seen])

  return reduced || inView || seen
}
