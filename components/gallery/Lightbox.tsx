'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { GalleryItem } from '@/content/types'
import { EASE } from '@/lib/motion'

/**
 * Full-screen viewer. Arrow keys and Escape work, focus is trapped while it is
 * open, and a horizontal swipe moves between photographs on touch.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: GalleryItem[]
  index: number | null
  onClose: () => void
  onIndexChange: (next: number) => void
}) {
  const open = index !== null
  const panelRef = useRef<HTMLDivElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const [zoomed, setZoomed] = useState(false)

  const go = useCallback(
    (delta: number) => {
      if (index === null) return
      onIndexChange((index + delta + items.length) % items.length)
      setZoomed(false)
    },
    [index, items.length, onIndexChange]
  )

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowRight') go(1)
      else if (event.key === 'ArrowLeft') go(-1)
      else if (event.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>('button')
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    panelRef.current?.querySelector<HTMLElement>('button')?.focus()

    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open, go, onClose])

  const item = index === null ? null : items[index]

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          ref={panelRef}
          className="fixed inset-0 z-[95] flex flex-col bg-ebony/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.subcategoryLabel} — photograph ${index + 1} of ${items.length}`}
          onTouchStart={(e) => {
            touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
          }}
          onTouchEnd={(e) => {
            const start = touchStart.current
            if (!start) return
            const dx = e.changedTouches[0].clientX - start.x
            const dy = e.changedTouches[0].clientY - start.y
            if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
            touchStart.current = null
          }}
        >
          <div className="flex items-center justify-between gap-4 px-[var(--gutter)] py-5">
            <p className="font-sans text-eyebrow font-semibold uppercase text-brass">
              {item.categoryLabel} · {index + 1} / {items.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="grid h-11 w-11 place-items-center border border-brass/40 text-brass transition-colors duration-600 ease-carve hover:bg-brass hover:text-ebony"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.4" fill="none" />
              </svg>
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-1 z-10 grid h-12 w-12 place-items-center text-brass transition-transform duration-600 ease-carve hover:-translate-x-1 sm:left-4"
              aria-label="Previous photograph"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path d="M15 4l-8 8 8 8" stroke="currentColor" strokeWidth="1.2" fill="none" />
              </svg>
            </button>

            <motion.div
              key={item.id}
              className="relative flex h-full w-full items-center justify-center"
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <button
                type="button"
                onClick={() => setZoomed((v) => !v)}
                className="relative h-full w-full cursor-zoom-in"
                aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
                data-cursor={zoomed ? 'Close' : 'Zoom'}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 96vw, 80vw"
                  quality={90}
                  placeholder="blur"
                  blurDataURL={item.blurDataURL}
                  className="object-contain transition-transform duration-1200 ease-carve"
                  style={{ transform: zoomed ? 'scale(1.7)' : 'scale(1)' }}
                />
              </button>
            </motion.div>

            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-1 z-10 grid h-12 w-12 place-items-center text-brass transition-transform duration-600 ease-carve hover:translate-x-1 sm:right-4"
              aria-label="Next photograph"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path d="M9 4l8 8-8 8" stroke="currentColor" strokeWidth="1.2" fill="none" />
              </svg>
            </button>
          </div>

          <p className="px-[var(--gutter)] pb-7 pt-4 text-center font-serif text-[1.15rem] italic text-brass">
            {item.subcategoryLabel}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
