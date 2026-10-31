'use client'

import Link from 'next/link'
import { useRef, type ComponentProps, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useHasFinePointer, usePrefersReducedMotion } from '@/lib/motion'

type MagneticProps = {
  children: ReactNode
  className?: string
  /** How far the element is allowed to lean toward the pointer, in pixels. */
  strength?: number
}

/**
 * Leans toward the pointer and settles back on a soft spring. Desktop only,
 * and off entirely under prefers-reduced-motion — on touch it is just a wrapper.
 */
function useMagnet(strength: number) {
  const ref = useRef<HTMLSpanElement>(null)
  const fine = useHasFinePointer()
  const reduced = usePrefersReducedMotion()
  const active = fine && !reduced

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 140, damping: 18, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 140, damping: 18, mass: 0.6 })

  const onMove = (event: React.MouseEvent) => {
    if (!active || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    x.set((dx / rect.width) * strength * 2)
    y.set((dy / rect.height) * strength * 2)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref, active, style: active ? { x: sx, y: sy } : undefined, onMove, onLeave }
}

export function MagneticLink({
  children,
  className,
  strength = 9,
  ...props
}: MagneticProps & ComponentProps<typeof Link>) {
  const magnet = useMagnet(strength)

  return (
    <motion.span
      ref={magnet.ref}
      className="inline-block"
      style={magnet.style}
      onMouseMove={magnet.onMove}
      onMouseLeave={magnet.onLeave}
    >
      <Link className={className} {...props}>
        {children}
      </Link>
    </motion.span>
  )
}

export function MagneticButton({
  children,
  className,
  strength = 9,
  ...props
}: MagneticProps & ComponentProps<'button'>) {
  const magnet = useMagnet(strength)

  return (
    <motion.span
      ref={magnet.ref}
      className="inline-block"
      style={magnet.style}
      onMouseMove={magnet.onMove}
      onMouseLeave={magnet.onLeave}
    >
      <button className={className} {...props}>
        {children}
      </button>
    </motion.span>
  )
}
