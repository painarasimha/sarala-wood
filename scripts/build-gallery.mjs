/**
 * Reads every photograph in /public/images/gallery and writes a typed manifest
 * to /content/gallery.generated.ts, including intrinsic dimensions and a base64
 * blur placeholder for each file.
 *
 * Re-run with `npm run gallery` after adding, removing or renaming photos.
 * Subcategory folders are named <slug>-NN.<ext>; the slug is looked up in
 * SUBCATEGORY_LABELS below for its caption. Add new slugs there.
 */
import { readdir, writeFile, readFile } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import sharp from 'sharp'

const ROOT = new URL('..', import.meta.url).pathname
const GALLERY_DIR = join(ROOT, 'public/images/gallery')
const OUT = join(ROOT, 'content/gallery.generated.ts')

/** Category folder -> the space the work sits in. */
const CATEGORIES = {
  residential: { label: 'Residential', slug: 'residential' },
  commercial: { label: 'Commercial', slug: 'commercial' },
  worship: { label: 'Places of Worship', slug: 'worship' },
}

/**
 * Captions, taken from the subcategory names the workshop uses on its own
 * site. Spelling tidied; nothing invented.
 */
const SUBCATEGORY_LABELS = {
  // Residential
  'latest-work': 'Latest Work',
  'main-door-frames-shutters': 'Main Door Frames & Shutters',
  'main-door-cum-window': 'Main Door cum Window',
  'pooja-doors-mantapa': 'Pooja Doors & Mantapa',
  'bedroom-door-frames-shutters': 'Bedroom Door Frames & Shutters',
  'window-frames-shutters': 'Window Frames & Shutters',
  'railings-arch-woodan-pillars': 'Railings, Arches & Wooden Pillars',
  'wooden-plywood-wardrobes-kitchen-cabinet': 'Wardrobes & Kitchen Cabinets',
  'wooden-cots-side-tables': 'Cots & Side Tables',
  'dining-tables-chairs': 'Dining Tables & Chairs',
  'wooden-sofa-teapoy': 'Sofa & Teapoy',
  'tv-unit-wall-partition': 'TV Units & Wall Partitions',
  'other-designs': 'Other Designs',
  // Commercial
  courtyard: 'Courtyard',
  'main-door-double-doors': 'Main Door — Double Doors',
  chairs: 'Chairs',
  'wood-works': 'Wood Works',
  // Places of worship
  'temple-door': 'Temple Door',
  'pooja-door-frame': 'Pooja Door & Frame',
  'pooja-room': 'Pooja Room',
  'pooja-stand': 'Pooja Stand',
  'church-bench': 'Church Bench',
  altar: 'Altar',
  'wooden-wedding-ring-holder': 'Wooden Wedding Ring Holder',
  ratha: 'Ratha',
}

/**
 * Which product line each subcategory belongs to, so a collection page can
 * pull its own photographs out of the same manifest.
 */
const COLLECTION_OF = {
  'main-door-frames-shutters': 'doors-windows',
  'main-door-cum-window': 'doors-windows',
  'bedroom-door-frames-shutters': 'doors-windows',
  'window-frames-shutters': 'doors-windows',
  'pooja-doors-mantapa': 'doors-windows',
  'temple-door': 'doors-windows',
  'pooja-door-frame': 'doors-windows',
  'main-door-double-doors': 'doors-windows',
  'wooden-plywood-wardrobes-kitchen-cabinet': 'wardrobes',
  'wooden-cots-side-tables': 'furniture',
  'dining-tables-chairs': 'furniture',
  'wooden-sofa-teapoy': 'furniture',
  'tv-unit-wall-partition': 'furniture',
  'railings-arch-woodan-pillars': 'furniture',
  chairs: 'furniture',
  'church-bench': 'furniture',
  altar: 'furniture',
  'pooja-stand': 'furniture',
  'pooja-room': 'furniture',
  ratha: 'furniture',
  'wooden-wedding-ring-holder': 'furniture',
  courtyard: 'furniture',
  'wood-works': 'furniture',
  'latest-work': 'furniture',
  'other-designs': 'furniture',
}

const slugOf = (file) => basename(file, extname(file)).replace(/-\d+$/, '')

async function blurOf(path) {
  const buf = await sharp(await readFile(path))
    .resize(12, 12, { fit: 'inside' })
    .webp({ quality: 40 })
    .toBuffer()
  return `data:image/webp;base64,${buf.toString('base64')}`
}

const items = []
const unknown = new Set()

for (const [dir, category] of Object.entries(CATEGORIES)) {
  let files
  try {
    files = (await readdir(join(GALLERY_DIR, dir))).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
  } catch {
    console.warn(`· no folder for ${dir}, skipping`)
    continue
  }
  files.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))

  for (const file of files) {
    const path = join(GALLERY_DIR, dir, file)
    const slug = slugOf(file)
    const label = SUBCATEGORY_LABELS[slug]
    if (!label) unknown.add(slug)

    const meta = await sharp(path).metadata()
    const caption = label ?? slug.replace(/-/g, ' ')

    items.push({
      id: `${dir}/${basename(file, extname(file))}`,
      src: `/images/gallery/${dir}/${file}`,
      width: meta.width ?? 1200,
      height: meta.height ?? 1600,
      blurDataURL: await blurOf(path),
      category: category.slug,
      categoryLabel: category.label,
      subcategory: slug,
      subcategoryLabel: caption,
      collection: COLLECTION_OF[slug] ?? null,
      alt: `${caption} hand-carved by Sarala Wood Industries — ${category.label.toLowerCase()} work, Karkala, Karnataka`,
    })
  }
}

if (unknown.size) {
  console.warn(`· unlabelled subcategories (add to SUBCATEGORY_LABELS): ${[...unknown].join(', ')}`)
}

const body = `// GENERATED FILE — do not edit by hand.
// Run \`npm run gallery\` to rebuild from the photographs in /public/images/gallery.
import type { GalleryItem } from './types'

export const galleryItems: GalleryItem[] = ${JSON.stringify(items, null, 2)}
`

await writeFile(OUT, body, 'utf8')
console.log(`✓ ${items.length} photographs written to content/gallery.generated.ts`)
