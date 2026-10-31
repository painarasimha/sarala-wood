'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import { EASE, usePrefersReducedMotion } from '@/lib/motion'

/**
 * A wood panel wipes down over the outgoing page and lifts off the incoming
 * one. The content itself is never animated out — the panel covers the swap —
 * so navigation stays instant even while it reads as a curtain.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const reduced = usePrefersReducedMotion()
  const [wiping, setWiping] = useState(false)

  useEffect(() => {
    if (reduced) return
    setWiping(true)
    const done = window.setTimeout(() => setWiping(false), 620)
    return () => window.clearTimeout(done)
  }, [pathname, reduced])

  return (
    <>
      <AnimatePresence>
        {wiping && (
          <motion.div
            key={pathname}
            className="pointer-events-none fixed inset-0 z-[85]"
            initial={{ clipPath: 'inset(0 0 0 0)' }}
            animate={{ clipPath: 'inset(0 0 100% 0)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.62, ease: EASE }}
            aria-hidden="true"
          >
            <span className="surface-wood absolute inset-0" />
            <span className="absolute inset-x-0 bottom-0 h-px bg-brass/50" />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}
