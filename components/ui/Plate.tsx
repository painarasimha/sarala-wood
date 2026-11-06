import Image from 'next/image'
import type { ReactNode } from 'react'

/**
 * A photograph presented the way a print is mounted: a white mount, a
 * hairline and four carved corner marks.
 *
 * This is deliberate art direction rather than decoration. The workshop's
 * photographs are phone shots taken against workshop walls; shown full-bleed
 * they look like what they are, but mounted and given air they read as plates
 * in a catalogue.
 */
export function Plate({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <figure className={`plate ${className}`}>
      <span className="plate-corner plate-corner-tr" aria-hidden="true" />
      <span className="plate-corner plate-corner-bl" aria-hidden="true" />
      {children}
    </figure>
  )
}

/** A mounted photograph with a fixed aspect, cropped to fill. */
export function PlateImage({
  src,
  alt,
  sizes,
  priority = false,
  quality = 72,
  blurDataURL,
  aspect = '4/5',
  className = '',
}: {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  quality?: 60 | 72 | 82 | 90
  blurDataURL?: string
  /** Any CSS aspect-ratio value. */
  aspect?: string
  className?: string
}) {
  return (
    <span className={`relative block w-full overflow-hidden bg-mat ${className}`} style={{ aspectRatio: aspect }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        className="object-cover"
      />
    </span>
  )
}
