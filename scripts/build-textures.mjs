/**
 * Bakes the wood grain and film grain into seamless WebP tiles.
 *
 * These were SVG `feTurbulence` filters inlined in CSS. They looked right, but
 * the browser has to run the turbulence filter every time it rasterises a
 * surface — at several sizes, on every page — and on a throttled phone that is
 * expensive enough to hold up the first paint. A pre-rendered tile costs a few
 * kilobytes and nothing to draw.
 *
 * The noise is tileable by construction: every octave uses a lattice whose cell
 * count divides the texture size, and lattice lookups wrap, so opposite edges
 * match exactly and the tile repeats with no visible seam.
 *
 * Run with: node scripts/build-textures.mjs
 */
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = new URL('../public/textures', import.meta.url).pathname
await mkdir(OUT, { recursive: true })

/** Deterministic hash → [0, 1). Same seed always gives the same texture. */
function rand(x, y, seed) {
  let h = Math.imul(x * 374761393 + y * 668265263 + seed * 2246822519, 3266489917)
  h = (h ^ (h >>> 15)) >>> 0
  return h / 4294967296
}

const smooth = (t) => t * t * (3 - 2 * t)

/** Value noise on a wrapping lattice of cx × cy cells. */
function noise(u, v, cx, cy, seed) {
  const x = u * cx
  const y = v * cy
  const x0 = Math.floor(x)
  const y0 = Math.floor(y)
  const fx = smooth(x - x0)
  const fy = smooth(y - y0)

  const a = rand(x0 % cx, y0 % cy, seed)
  const b = rand((x0 + 1) % cx, y0 % cy, seed)
  const c = rand(x0 % cx, (y0 + 1) % cy, seed)
  const d = rand((x0 + 1) % cx, (y0 + 1) % cy, seed)

  return a * (1 - fx) * (1 - fy) + b * fx * (1 - fy) + c * (1 - fx) * fy + d * fx * fy
}

/**
 * Sums octaves. `cells` is the base lattice; each octave doubles it, so every
 * octave still divides the texture and the whole stack stays seamless.
 */
function fbm(u, v, cells, octaves, seed) {
  let sum = 0
  let amp = 1
  let total = 0
  for (let o = 0; o < octaves; o++) {
    const f = 2 ** o
    sum += amp * noise(u, v, cells[0] * f, cells[1] * f, seed + o * 101)
    total += amp
    amp *= 0.5
  }
  return sum / total
}

/**
 * Wood fibre: cells that are very wide and very short, so the noise stretches
 * into long horizontal fibres the way sawn timber reads.
 */
async function wood({ file, width, height, cells, octaves, seed, contrast, alpha, warp }) {
  const data = Buffer.alloc(width * height * 4)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const u = x / width
      // A low-frequency wobble applied to the across-grain axis, so the fibres
      // wander the way sawn timber does instead of running as flat stripes.
      const drift = (fbm(u, y / height, [4, 3], 2, seed + 991) - 0.5) * warp
      const v = (((y / height + drift) % 1) + 1) % 1
      const n = fbm(u, v, cells, octaves, seed)
      // Push the midtones apart so the fibres read as grain, not fog.
      const tone = Math.min(1, Math.max(0, (n - 0.5) * contrast + 0.5))
      const i = (y * width + x) * 4
      data[i] = Math.round(107 * tone + 28 * (1 - tone)) // teak → ebony
      data[i + 1] = Math.round(63 * tone + 18 * (1 - tone))
      data[i + 2] = Math.round(34 * tone + 12 * (1 - tone))
      data[i + 3] = Math.round(255 * alpha)
    }
  }
  await sharp(data, { raw: { width, height, channels: 4 } })
    .webp({ quality: 78, alphaQuality: 80 })
    .toFile(join(OUT, file))
  console.log(`✓ ${file}  ${width}×${height}`)
}

/** Film grain: fine monochrome speckle, almost transparent. */
async function film({ file, size, seed }) {
  const data = Buffer.alloc(size * size * 4)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = fbm(x / size, y / size, [size / 2, size / 2], 2, seed)
      const v = Math.round(n * 255)
      const i = (y * size + x) * 4
      data[i] = v
      data[i + 1] = v
      data[i + 2] = v
      data[i + 3] = 110
    }
  }
  await sharp(data, { raw: { width: size, height: size, channels: 4 } })
    .webp({ quality: 70, alphaQuality: 70 })
    .toFile(join(OUT, file))
  console.log(`✓ ${file}  ${size}×${size}`)
}

await wood({
  file: 'wood-grain.webp',
  width: 1200,
  height: 400,
  cells: [9, 26], // wide, short cells: fibres run with the long edge
  octaves: 5,
  seed: 17,
  contrast: 1.8,
  alpha: 0.82,
  warp: 0.09,
})

await wood({
  file: 'wood-grain-fine.webp',
  width: 600,
  height: 240,
  cells: [14, 48],
  octaves: 3,
  seed: 41,
  contrast: 1.3,
  alpha: 0.4,
  warp: 0.05,
})

await film({ file: 'film-grain.webp', size: 192, seed: 7 })
