'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, site } from '@/content/site'
import { EASE } from '@/lib/motion'
import { Lotus, OrnamentDivider } from '@/components/ornament/Ornaments'
import { MagneticLink } from '@/components/ui/MagneticLink'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the overlay on navigation.
  useEffect(() => setOpen(false), [pathname])

  // While the overlay is open: lock the page, trap focus, close on Escape.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        burgerRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )
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

    document.addEventListener('keydown', onKey)
    // Move focus into the panel so a keyboard user is where they expect to be.
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus()

    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-[95] bg-ebony px-5 py-3 font-sans text-eyebrow font-semibold uppercase tracking-[0.24em] text-brass"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-[background-color,box-shadow,border-color] duration-600 ease-carve ${
          scrolled || open
            ? 'border-b border-brass/20 bg-ebony/95 backdrop-blur-sm'
            : 'border-b border-transparent bg-gradient-to-b from-ebony/55 to-transparent'
        }`}
      >
        <div className="wrap flex items-center justify-between gap-6 py-4 lg:py-5">
          <Link href="/" className="group flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center border border-brass/45 transition-colors duration-600 ease-carve group-hover:border-brass">
              <Lotus className="h-5 w-6" stroke="#c9a35f" />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-[1.28rem] tracking-[0.12em] text-sandalwood">SARALA</span>
              <span className="mt-1 block font-sans text-[0.75rem] font-semibold uppercase tracking-[0.3em] text-brass/80">
                Wood Industries · 1986
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Primary">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`link-draw whitespace-nowrap font-sans text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-600 ease-carve ${
                    active ? 'text-brass' : 'text-sandalwood/80 hover:text-sandalwood'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:block">
            <MagneticLink href="/contact" className="btn whitespace-nowrap px-6">
              Commission a piece
            </MagneticLink>
          </div>

          <button
            ref={burgerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-overlay"
            className="relative z-[86] grid h-11 w-11 place-items-center border border-brass/40 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="relative block h-3 w-5">
              <motion.span
                className="absolute left-0 top-0 block h-px w-full bg-brass"
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
              <motion.span
                className="absolute bottom-0 left-0 block h-px w-full bg-brass"
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-overlay"
            ref={panelRef}
            className="surface-wood fixed inset-0 z-[82] flex flex-col justify-center lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.85, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <nav className="wrap flex flex-col gap-1 pb-10 pt-24" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-baseline gap-5 border-b border-brass/10 py-5 font-serif text-[2.1rem] leading-none text-sandalwood"
                  >
                    <span className="numeral text-[0.95rem]">{romanise(i + 1)}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.56 }}
                className="mt-10 flex flex-col gap-5"
              >
                <Link href="/contact" className="btn btn-solid w-full">
                  Commission a piece
                </Link>
                <a
                  href={`tel:${site.phones[0].tel}`}
                  className="font-serif text-[1.35rem] italic text-brass"
                >
                  {site.phones[0].number}
                </a>
              </motion.div>

              <OrnamentDivider className="mt-12 opacity-60" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const NUMERALS = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x']
const romanise = (n: number) => NUMERALS[n - 1] ?? String(n)
