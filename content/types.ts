/**
 * The shape of every piece of content on the site.
 *
 * Nothing in /content reaches for the filesystem or the network, so the whole
 * folder can be swapped for a Sanity (or any other) client later: keep these
 * types, change where the objects come from, and no component needs touching.
 */

export type SpaceSlug = 'residential' | 'commercial' | 'worship'

export type CollectionSlug = 'doors-windows' | 'wardrobes' | 'furniture' | 'modular-kitchens'

export type GalleryItem = {
  id: string
  src: string
  width: number
  height: number
  blurDataURL: string
  category: SpaceSlug
  categoryLabel: string
  subcategory: string
  subcategoryLabel: string
  collection: CollectionSlug | null
  alt: string
}

export type Picture = {
  src: string
  alt: string
  width?: number
  height?: number
}

export type Collection = {
  slug: CollectionSlug
  /** Roman index used as the editorial marker. */
  index: string
  name: string
  /** Shown over the card on the home grid. */
  tagline: string
  /** One-sentence summary for cards and metadata. */
  summary: string
  /** Long-form body, rewritten from the workshop's own description. */
  body: string[]
  hero: Picture
  /** Optional second image for the detail-page opening spread. */
  detail?: Picture
  /** What a customer can specify when commissioning. */
  commission: { label: string; value: string }[]
  /** Timber the workshop names for this line; empty when they have not said. */
  timbers: string[]
}

export type Space = {
  slug: SpaceSlug
  index: string
  name: string
  blurb: string
  hero: Picture
}

export type CraftStep = {
  index: string
  name: string
  short: string
  body: string
  /** Which ornament accompanies the step. */
  motif: 'rings' | 'boards' | 'lotus' | 'chisel'
  image?: Picture
}

export type Client = {
  name: string
  city: string
  /** 'builder' | 'architect' | 'institution' | 'hospitality' — as stated by the workshop. */
  kind: ClientKind
}

export type ClientKind = 'builder' | 'architect' | 'institution' | 'hospitality' | 'manufacturer'

export type TimelineEntry = {
  year: string
  title: string
  body: string
  /** True when the entry still needs the client's input. */
  todo?: boolean
}

export type Value = {
  index: string
  title: string
  body: string
}
