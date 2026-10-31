/**
 * Prepares the handful of "editorial" images the site leans on hardest — the
 * hero, the story portrait, the craft details — from the workshop's own
 * photographs.
 *
 * The source files are phone photographs with white letterbox borders and, on a
 * few, a camera watermark burnt into the bottom strip. This script trims the
 * borders and crops the watermark away so the art direction can be clean, while
 * the originals stay untouched in /public/images/gallery.
 *
 * Run with: node scripts/build-editorial.mjs
 */
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const ROOT = new URL('..', import.meta.url).pathname
const SRC = join(ROOT, 'public/images/gallery')
const OUT = join(ROOT, 'public/images/editorial')

/**
 * trim: drop uniform white letterboxing.
 * top / bottom: additionally remove this fraction of the height, for a burnt-in
 * watermark or a hand-added label.
 * aspect: final crop ratio, centred on `position`.
 */
const jobs = [
  {
    from: 'residential/tv-unit-wall-partition-55.jpg',
    to: 'hero-carved-teak-panel.jpg',
    trim: true,
    aspect: 16 / 9,
    position: 'centre',
    width: 2200,
  },
  {
    from: 'residential/main-door-frames-shutters-03.jpg',
    to: 'story-carved-main-door.jpg',
    trim: true,
    bottom: 0.14,
    aspect: 4 / 5,
    position: 'top',
    width: 1300,
  },
  {
    from: 'residential/latest-work-07.jpg',
    to: 'craft-carved-mantapa.jpg',
    trim: true,
    // A hand-added "Sarala wood" label sits across the top of this frame.
    top: 0.2,
    aspect: 3 / 4,
    position: 'centre',
    width: 1300,
  },
  {
    from: 'residential/dining-tables-chairs-10.jpg',
    to: 'collection-furniture.jpg',
    trim: true,
    bottom: 0.06,
    aspect: 3 / 4,
    position: 'centre',
    width: 1400,
  },
  {
    from: 'residential/latest-work-06.jpg',
    to: 'craft-carved-swing.jpg',
    trim: true,
    aspect: 3 / 4,
    position: 'centre',
    width: 1300,
  },
  {
    from: 'residential/main-door-frames-shutters-01.jpg',
    to: 'collection-doors-windows.jpg',
    trim: true,
    width: 1400,
  },
  {
    from: 'residential/wooden-plywood-wardrobes-kitchen-cabinet-15.jpg',
    to: 'collection-wardrobes.jpg',
    trim: true,
    width: 1400,
  },
  {
    from: 'residential/wooden-plywood-wardrobes-kitchen-cabinet-26.jpg',
    to: 'collection-modular-kitchens.jpg',
    trim: true,
    width: 1400,
  },
  {
    from: 'residential/latest-work-31.jpg',
    to: 'craft-selecting-boards.jpg',
    trim: true,
    width: 1400,
  },
  {
    from: 'residential/latest-work-28.jpg',
    to: 'craft-seasoning-turned.jpg',
    trim: true,
    width: 1200,
  },
  {
    from: 'residential/latest-work-13.jpg',
    to: 'craft-carving-relief.jpg',
    trim: true,
    width: 1200,
  },
]

await mkdir(OUT, { recursive: true })

for (const job of jobs) {
  let img = sharp(join(SRC, job.from))

  if (job.trim) {
    img = img.trim({ background: '#ffffff', threshold: 22 })
  }

  // Re-read dimensions after the trim so the aspect crop is measured correctly.
  let buf = await img.toBuffer()
  let meta = await sharp(buf).metadata()

  if (job.bottom || job.top) {
    const skip = Math.round(meta.height * (job.top ?? 0))
    const keep = Math.round(meta.height * (1 - (job.bottom ?? 0))) - skip
    buf = await sharp(buf).extract({ left: 0, top: skip, width: meta.width, height: keep }).toBuffer()
    meta = await sharp(buf).metadata()
  }

  // Centre- or top-weighted crop to the target ratio. Sources too small to
  // survive a ratio crop are left at their trimmed size and framed by the
  // layout's object-cover instead.
  let out = sharp(buf)
  let naturalWidth = meta.width

  if (job.aspect) {
    const targetH = Math.min(meta.height, Math.round(meta.width / job.aspect))
    const targetW = Math.min(meta.width, Math.round(targetH * job.aspect))
    const left = Math.round((meta.width - targetW) / 2)
    const top = job.position === 'top' ? 0 : Math.round((meta.height - targetH) / 2)
    out = out.extract({ left, top, width: targetW, height: targetH })
    naturalWidth = targetW
  }

  await out
    .resize({ width: Math.min(job.width, naturalWidth), withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(join(OUT, job.to))

  const written = await sharp(join(OUT, job.to)).metadata()
  console.log(`✓ ${job.to}  ${written.width}×${written.height}`)
}
