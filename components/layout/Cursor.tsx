'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useHasFinePointer, usePrefersReducedMotion } from '@/lib/motion'

/**
 * A brass ring that follows the pointer and grows into a labelled disc over
 * anything carrying data-cursor="View" (images, cards, the gallery).
 *
 * Desktop pointers only. It never replaces the system cursor on touch devices,
 * and it is skipped entirely under prefers-reduced-motion.
 */
export function Cursor() {
  const fine = useHasFinePointer()
  const reduced = usePrefersReducedMotion()
  const enabled = fine && !reduced

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 480, damping: 42, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 480, damping: 42, mass: 0.4 })

  const [label, setLabel] = useState<string | null>(null)
  const [down, setDown] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)

      const target = (event.target as HTMLElement | null)?.closest('[data-cursor]')
      setLabel(target instanceof HTMLElement ? target.dataset.cursor || null : null)
    }
    const onLeave = () => setVisible(false)
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const expanded = Boolean(label)

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[90] grid place-items-center rounded-full mix-blend-normal"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: expanded ? 86 : 22,
        height: expanded ? 86 : 22,
        opacity: visible ? 1 : 0,
        backgroundColor: expanded ? 'rgba(201,163,95,0.94)' : 'rgba(201,163,95,0)',
        borderColor: expanded ? 'rgba(201,163,95,0)' : 'rgba(201,163,95,0.8)',
        scale: down ? 0.88 : 1,
      }}
      transition={{ duration: 0.42, ease: [0.22, 0.75, 0.2, 1] }}
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-full border border-[inherit]" style={{ borderColor: 'inherit' }} />
      <motion.span
        className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-ebony"
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        {label}
      </motion.span>
    </motion.div>
  )
}
