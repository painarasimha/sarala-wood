'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { GalleryItem, SpaceSlug } from '@/content/types'
import { spaceFilters } from '@/content/gallery'
import { Lightbox } from './Lightbox'
import { EASE } from '@/lib/motion'

// Enough to fill a few screens without 48 images competing for bandwidth
const PAGE = 24

/**
 * The gallery grid.
 *
 * The space filter is a set of real routes rather than client state, so every
 * view is prerendered, arrives as complete HTML and is indexable on its own.
 * Reading it from the query string instead meant the server could only render a
 * "loading" placeholder, which the client then replaced — a second of blank
 * page and a large layout shift.
 *
 * Only the subcategory pills are client state: they need no deep link, and
 * filtering inside a page that has already loaded should be instant.
 */
export function ProjectsGallery({
  items,
  space,
}: {
  items: GalleryItem[]
  space: SpaceSlug | 'all'
}) {
  const [sub, setSub] = useState<string | 'all'>('all')
  const [shown, setShown] = useState(PAGE)
  const [open, setOpen] = useState<number | null>(null)

  /** Subcategories present in this space, in gallery order. */
  const subs = useMemo(() => {
    const seen = new Map<string, string>()
    for (const item of items) seen.set(item.subcategory, item.subcategoryLabel)
    return [...seen.entries()].map(([slug, label]) => ({ slug, label }))
  }, [items])

  const filtered = useMemo(
    () => (sub === 'all' ? items : items.filter((i) => i.subcategory === sub)),
    [items, sub]
  )

  const visible = filtered.slice(0, shown)

  return (
    <>
      {/* ---------- Filters ---------- */}
      <div className="sticky top-[76px] z-[60] border-b border-teak/15 bg-ivory/95 backdrop-blur-sm">
        <div className="wrap py-3.5">
          <nav className="flex flex-wrap items-baseline gap-x-6 gap-y-2" aria-label="Filter by space">
            {spaceFilters.map((filter) => {
              const active = filter.slug === space
              return (
                <Link
                  key={filter.slug}
                  href={filter.slug === 'all' ? '/projects' : `/projects/${filter.slug}`}
                  aria-current={active ? 'page' : undefined}
                  className={`link-draw font-sans text-eyebrow font-semibold uppercase transition-colors duration-600 ease-carve ${
                    active ? 'text-teak' : 'text-muted hover:text-teak'
                  }`}
                >
                  {filter.label}
                </Link>
              )
            })}
            <span className="w-full font-serif text-[1rem] italic text-amber sm:ml-auto sm:w-auto">
              {filtered.length} photographs
            </span>
          </nav>

          {subs.length > 1 && (
            <div
              className="rail-scroll -mx-[var(--gutter)] mt-3 flex gap-x-5 overflow-x-auto px-[var(--gutter)] pb-1"
              role="group"
              aria-label="Filter by type of work"
            >
              <FilterPill
                label="Everything"
                active={sub === 'all'}
                onClick={() => {
                  setSub('all')
                  setShown(PAGE)
                }}
              />
              {subs.map((item) => (
                <FilterPill
                  key={item.slug}
                  label={item.label}
                  active={sub === item.slug}
                  onClick={() => {
                    setSub(item.slug)
                    setShown(PAGE)
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ---------- Masonry ---------- */}
      <div className="wrap pb-section pt-10">
        <ul className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>li]:mb-4">
          {visible.map((item, i) => (
            <motion.li
              key={item.id}
              className="break-inside-avoid"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: Math.min(i, 10) * 0.025 }}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                data-cursor="View"
                className="group relative block w-full overflow-hidden bg-sandalwood"
                /* The exact ratio comes from the manifest, so every tile
                   reserves its final height before its image arrives — without
                   it the multi-column layout rebalances as pictures load and
                   the page jumps under the reader. */
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
                aria-label={`Open ${item.subcategoryLabel}, photograph ${i + 1}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 23vw"
                  quality={72}
                  placeholder="blur"
                  blurDataURL={item.blurDataURL}
                  className="object-cover transition-transform duration-1200 ease-carve group-hover:scale-[1.04]"
                />
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ebony/80 via-transparent to-transparent opacity-0 transition-opacity duration-900 ease-carve group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden="true"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left font-sans text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-brass opacity-0 transition-all duration-900 ease-carve group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  {item.subcategoryLabel}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>

        {shown < filtered.length && (
          <div className="mt-12 text-center">
            <button type="button" className="btn btn-ink" onClick={() => setShown((n) => n + PAGE)}>
              Show more ({filtered.length - shown} left)
            </button>
          </div>
        )}
      </div>

      <Lightbox items={filtered} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </>
  )
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`whitespace-nowrap border-b py-1 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-600 ease-carve ${
        active ? 'border-honey text-teak' : 'border-transparent text-muted hover:text-teak'
      }`}
    >
      {label}
    </button>
  )
}
