import { galleryItems } from './gallery.generated'
import type { CollectionSlug, GalleryItem, SpaceSlug } from './types'

export { galleryItems }

/** A gallery photograph with a caption written for the layout it sits in. */
export type DetailItem = GalleryItem & { caption: string }

export const spaceFilters: { slug: SpaceSlug | 'all'; label: string }[] = [
  { slug: 'all', label: 'All work' },
  { slug: 'residential', label: 'Residential' },
  { slug: 'commercial', label: 'Commercial' },
  { slug: 'worship', label: 'Places of Worship' },
]

export const bySpace = (space: SpaceSlug) => galleryItems.filter((i) => i.category === space)

export const byCollection = (collection: CollectionSlug) =>
  galleryItems.filter((i) => i.collection === collection)

/**
 * Deterministic "spread" of a list: walks the array in a fixed stride so a
 * short selection samples the whole set instead of taking the first N, which
 * would show one subcategory over and over. Deterministic matters — the same
 * order has to come out on the server and the client.
 */
export function spread<T>(items: T[], count: number): T[] {
  if (items.length <= count) return items
  const stride = items.length / count
  return Array.from({ length: count }, (_, i) => items[Math.floor(i * stride)])
}

/**
 * A curated handful for the home page's horizontal rail. Captions describe what
 * is in the photograph, because the workshop files most of these under one
 * heading ("Latest Work") that would otherwise repeat down the whole rail.
 */
export const railSelection: DetailItem[] = (
  [
    ['residential/latest-work-13', 'Deep relief, tigers among pines'],
    ['worship/temple-door-01', 'Temple door'],
    ['residential/latest-work-10', 'Seven horses, relief panel'],
    ['residential/pooja-doors-mantapa-27', 'Pooja mantapa'],
    ['residential/latest-work-11', 'Pierced roundel in a square frame'],
    ['worship/ratha-01', 'Ratha'],
    ['residential/latest-work-20', 'Carved Ganesha'],
    ['residential/railings-arch-woodan-pillars-27', 'Turned pillar'],
    ['residential/latest-work-22', 'Pierced lattice screen'],
    ['worship/pooja-door-frame-09', 'Pooja door frame'],
    ['residential/latest-work-16', 'Lion corbel'],
    ['residential/dining-tables-chairs-01', 'Dining table and chairs'],
  ] as const
).flatMap<DetailItem>(([id, caption]) => {
  const item = galleryItems.find((i) => i.id === id)
  return item ? [{ ...item, caption }] : []
})

/**
 * Macro carving details, used on The Craft.
 */
export const detailSelection: DetailItem[] = (
  [
    ['residential/latest-work-12', 'Figurative relief panel'],
    ['residential/latest-work-13', 'Deep relief, tigers among pines'],
    ['residential/latest-work-20', 'Carved Ganesha'],
    ['residential/latest-work-11', 'Pierced roundel in a square frame'],
    ['residential/latest-work-22', 'Pierced lattice screen'],
    ['residential/latest-work-16', 'Lion corbel'],
    ['residential/latest-work-26', 'Chevron surface carving'],
    ['residential/latest-work-28', 'Turned and banded vessels'],
  ] as const
)
  .flatMap<DetailItem>(([id, caption]) => {
    const item = galleryItems.find((i) => i.id === id)
    return item ? [{ ...item, caption }] : []
  })

export const galleryCount = galleryItems.length
