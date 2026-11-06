'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { whatsappLink } from '@/lib/whatsapp'
import { EASE } from '@/lib/motion'

/**
 * Floating WhatsApp button. It arrives once the visitor has scrolled past the
 * first screen, so it never covers the hero.
 */
export function WhatsAppButton() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.65)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-[75] grid h-14 w-14 place-items-center rounded-full bg-ink shadow-[0_12px_30px_-10px_rgba(25,19,16,.45)] sm:bottom-7 sm:right-7"
      initial={false}
      animate={{ opacity: shown ? 1 : 0, scale: shown ? 1 : 0.85, pointerEvents: shown ? 'auto' : 'none' }}
      transition={{ duration: 0.5, ease: EASE }}
      aria-label="Message Sarala Wood Industries on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-paper" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35ZM12.04 2A9.94 9.94 0 0 0 2.1 11.94c0 1.75.46 3.46 1.33 4.97L2 22l5.23-1.37a9.9 9.9 0 0 0 4.8 1.22h.01a9.94 9.94 0 0 0 9.94-9.94A9.94 9.94 0 0 0 12.04 2Zm0 18.2h-.01a8.25 8.25 0 0 1-4.2-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.24 8.24 0 0 1-1.26-4.41 8.26 8.26 0 1 1 8.24 8.26Z" />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap bg-ink px-3 py-2 font-caps text-[0.7rem] uppercase tracking-[0.16em] text-paper opacity-0 transition-opacity duration-500 ease-carve group-hover:opacity-100">
        WhatsApp us
      </span>
    </motion.a>
  )
}
