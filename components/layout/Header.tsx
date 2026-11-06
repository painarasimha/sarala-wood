'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, site } from '@/content/site'
import { EASE } from '@/lib/motion'
import { HouseMark } from '@/components/ornament/Ornaments'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
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
        className="sr-only-focusable fixed left-4 top-4 z-[95] bg-ink px-5 py-3 font-caps text-label uppercase text-paper"
      >
        Skip to content
      </a>

      {/* An inlaid strip of pierced jaali along the very top edge. */}
      <div className="jaali-band h-[7px] opacity-30" aria-hidden="true" style={{ backgroundSize: '28px 28px' }} />

      <header
        className={`sticky top-0 z-[80] border-b bg-paper/94 backdrop-blur-sm transition-colors duration-500 ease-carve ${
          scrolled || open ? 'border-ink/14' : 'border-transparent'
        }`}
      >
        <div className="wrap flex h-[82px] items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-3">
            <HouseMark className="h-[26px] w-[26px] shrink-0" />
            <span className="font-caps text-[1.22rem] tracking-[0.2em]">SARALA</span>
            <span className="hidden h-5 w-px bg-ink/14 sm:block" aria-hidden="true" />
            <span className="hidden font-caps text-[0.68rem] uppercase tracking-[0.17em] text-ink-3 sm:block">
              Est. 1986
            </span>
          </Link>

          <nav className="hidden items-center gap-[1.6rem] lg:flex xl:gap-[1.9rem]" aria-label="Primary">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`whitespace-nowrap border-b pb-1 font-caps text-[0.84rem] tracking-[0.055em] transition-colors duration-500 ease-carve ${
                    active
                      ? 'border-bronze text-ink'
                      : 'border-transparent text-ink-2 hover:border-bronze hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <Link href="/contact" className="btn hidden whitespace-nowrap px-6 py-[0.85em] text-[0.72rem] lg:inline-flex">
            Commission a piece
          </Link>

          <button
            ref={burgerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-overlay"
            className="relative z-[86] grid h-[42px] w-[42px] place-items-center border border-ink/14 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="relative block h-3 w-[17px]">
              <motion.span
                className="absolute left-0 top-0 block h-px w-full bg-ink"
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
              <motion.span
                className="absolute bottom-0 left-0 block h-px w-full bg-ink"
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
            className="fixed inset-0 z-[82] grid content-center gap-1 bg-paper px-gutter lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-ink/8 py-2 font-serif text-[1.8rem]"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-fill mt-7 justify-center">
              Commission a piece
            </Link>
            <a href={`tel:${site.phones[0].tel}`} className="mt-5 text-center font-serif text-[1.3rem] text-bronze">
              {site.phones[0].number}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
