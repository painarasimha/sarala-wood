/**
 * Captures every page at desktop and phone width into /screenshots.
 *
 * Start the production server first (`npm run build && npx next start -p 4010`),
 * then: node scripts/screenshots.mjs [baseUrl] [nameFilter]
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const BASE = process.argv[2] || 'http://127.0.0.1:4010'
/** Optional: a substring to limit the run to, e.g. `node … '' home`. */
const ONLY = process.argv[3] || ''
const OUT = new URL('../screenshots', import.meta.url).pathname

const PAGES = [
  ['home', '/'],
  ['our-story', '/our-story'],
  ['the-craft', '/the-craft'],
  ['collections', '/collections'],
  ['collection-doors-windows', '/collections/doors-windows'],
  ['collection-wardrobes', '/collections/wardrobes'],
  ['collection-furniture', '/collections/furniture'],
  ['collection-modular-kitchens', '/collections/modular-kitchens'],
  ['projects', '/projects'],
  ['projects-residential', '/projects/residential'],
  ['projects-commercial', '/projects/commercial'],
  ['projects-worship', '/projects/worship'],
  ['clients', '/clients'],
  ['contact', '/contact'],
  ['styleguide', '/styleguide'],
  ['404', '/this-page-does-not-exist'],
]

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
]

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()

for (const viewport of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    // 1.5× keeps the type crisp without producing 17 MB files.
    deviceScaleFactor: 1.5,
    hasTouch: Boolean(viewport.isMobile),
    // The preloader only runs on a first visit; a fresh context would show it
    // in every shot, so mark it seen before the page scripts run.
    storageState: undefined,
  })

  for (const [name, path] of PAGES.filter(([n]) => !ONLY || n.includes(ONLY))) {
    const page = await context.newPage()
    await page.addInitScript(() => {
      try {
        sessionStorage.setItem('sarala:seen', '1')
      } catch {}
    })

    await page.goto(`${BASE}${path}`, { waitUntil: 'load', timeout: 60_000 })

    // Walk the page once so every scroll-triggered reveal has fired and every
    // lazy image has been requested.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.6
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 150))
      }
    })

    // Give the images a moment to arrive, with a ceiling so one slow picture
    // cannot hold up the run.
    await page
      .evaluate(() =>
        Promise.race([
          Promise.all(
            [...document.images].map((img) =>
              img.complete
                ? null
                : new Promise((r) => {
                    img.onload = r
                    img.onerror = r
                  })
            )
          ),
          new Promise((r) => setTimeout(r, 4000)),
        ])
      )
      .catch(() => {})

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(900)

    const file = `${name}-${viewport.name}.jpg`
    await page.screenshot({
      path: join(OUT, file),
      fullPage: true,
      type: 'jpeg',
      quality: 86,
      timeout: 120_000,
    })
    console.log(`✓ ${file}`)
    await page.close()
  }

  await context.close()
}

await browser.close()
console.log('done')
