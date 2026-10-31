'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { usePrefersReducedMotion } from '@/lib/motion'

/** The live instance, so anything on the page can scroll through it. */
let lenis: Lenis | null = null

/** Scroll the page, going through Lenis when it is driving. */
export function scrollTo(target: number | string | HTMLElement, immediate = false) {
  if (lenis) lenis.scrollTo(target, { offset: -96, immediate })
  else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'auto' })
  else document.querySelector(typeof target === 'string' ? target : '')?.scrollIntoView()
}

/**
 * Lenis drives the page scroll so the whole site moves with the same weight as
 * the animations on it. Under prefers-reduced-motion it never starts, and the
 * browser's own scrolling is left alone.
 *
 * While Lenis is running it writes its own scroll position every frame, which
 * silently defeats `window.scrollTo` and `Element.scrollIntoView` — that breaks
 * in-page anchors, the skip link, focus scrolling and anything else that moves
 * the page programmatically. Both are routed through Lenis for as long as it is
 * mounted, and restored when it is not.
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion()
  const pathname = usePathname()

  useEffect(() => {
    if (reduced) return

    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch keeps the platform's own scrolling, which feels better on phones.
      syncTouch: false,
    })
    lenis = instance

    let frame = 0
    const raf = (time: number) => {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // --- Route programmatic scrolling through Lenis -------------------
    const nativeScrollTo = window.scrollTo.bind(window)
    const nativeScrollIntoView = Element.prototype.scrollIntoView

    window.scrollTo = ((...args: unknown[]) => {
      const first = args[0]
      const top =
        typeof first === 'object' && first !== null
          ? ((first as ScrollToOptions).top ?? instance.scroll)
          : Number(args[1] ?? 0)
      const smooth =
        typeof first === 'object' && first !== null
          ? (first as ScrollToOptions).behavior === 'smooth'
          : false
      instance.scrollTo(top, { immediate: !smooth })
    }) as typeof window.scrollTo

    Element.prototype.scrollIntoView = function (this: Element, arg?: boolean | ScrollIntoViewOptions) {
      const smooth = typeof arg === 'object' && arg?.behavior === 'smooth'
      instance.scrollTo(this as HTMLElement, { offset: -96, immediate: !smooth })
    }

    // In-page anchors land at the same pace as everything else.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest('a[href^="#"]')
      if (!(anchor instanceof HTMLAnchorElement)) return
      const id = anchor.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      event.preventDefault()
      instance.scrollTo(target as HTMLElement, { offset: -96 })
    }
    document.addEventListener('click', onClick)

    // Keyboard focus moving off-screen should bring the page with it.
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target
      if (!(target instanceof HTMLElement)) return
      const rect = target.getBoundingClientRect()
      if (rect.top < 96 || rect.bottom > window.innerHeight) {
        instance.scrollTo(target, { offset: -140, immediate: true })
      }
    }
    document.addEventListener('focusin', onFocusIn)

    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('focusin', onFocusIn)
      cancelAnimationFrame(frame)
      window.scrollTo = nativeScrollTo
      Element.prototype.scrollIntoView = nativeScrollIntoView
      instance.destroy()
      if (lenis === instance) lenis = null
    }
  }, [reduced])

  // A route change should start at the top, whichever scroller is in charge.
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return null
}
