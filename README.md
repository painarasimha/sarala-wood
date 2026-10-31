# Sarala Wood Industries

The website for a heritage wood-carving workshop at Nandalike, Karkala Taluk,
Udupi District, Karnataka — founded in 1986 by Mrs. Sarala Hegde.

Next.js (App Router) · TypeScript · Tailwind CSS · GSAP + ScrollTrigger · Lenis ·
Framer Motion · Resend.

---

## Running it

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm run start   # production build
```

## Environment variables

| Variable | What it does | Needed to run? |
|---|---|---|
| `RESEND_API_KEY` | Sends the commission enquiry email. Create a key at [resend.com/api-keys](https://resend.com/api-keys). | No — the form is honest about it being missing |
| `ENQUIRY_TO_EMAIL` | Where enquiries land. Comma-separated for several recipients. Defaults to the two addresses in `content/site.ts`. | No |
| `ENQUIRY_FROM_EMAIL` | The sender, e.g. `Sarala Wood Industries <enquiries@saralawood.com>`. The domain must be verified in Resend. | No |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, used by the sitemap, canonical tags and Open Graph. | No (defaults to `https://saralawood.com`) |

**Without the Resend variables the enquiry form does not pretend to work.** It
tells the visitor email is not configured on this deployment and points them at
the phone numbers and WhatsApp. The WhatsApp route works with no configuration
at all.

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new). Everything is detected
   — no build settings to change.
3. Add the four environment variables above under **Settings → Environment
   Variables**, for Production and Preview.
4. Add the domain under **Settings → Domains** and set `NEXT_PUBLIC_SITE_URL` to
   match.

Every page is statically prerendered, so the site serves from the edge cache and
costs essentially nothing to run.

---

## Where the content lives

All copy and data is in `/content`, typed in `content/types.ts`, and no component
reaches past it. Moving to a CMS (Sanity or otherwise) means changing where these
objects come from — the types and the components stay as they are.

| File | What is in it |
|---|---|
| `content/site.ts` | Name, address, phones, emails, WhatsApp number, map embed, navigation |
| `content/collections.ts` | The four product lines: copy, hero image, commission options, timber |
| `content/story.ts` | Founder story, timeline, values, the four craft stages, the three spaces |
| `content/clients.ts` | The 39 named clients, the four logo files, the Clients-page copy |
| `content/gallery.ts` | Hand-picked selections for the home rail and the craft details |
| `content/gallery.generated.ts` | **Generated** — do not edit. 510 photographs with dimensions and blur placeholders |

Anything the client still owes is written as `{{TODO: … }}` and listed in
[`CONTENT_TODO.md`](./CONTENT_TODO.md). Placeheld text renders in a dimmed italic
so it is obvious in review and impossible to ship by accident unnoticed.

### Editing copy

Open the file, change the string. Nothing else to do — every page is static and
rebuilt on deploy.

### Swapping or adding photographs

1. Drop files into `public/images/gallery/<residential|commercial|worship>/`,
   named `<subcategory-slug>-NN.jpg`.
2. If the slug is new, add it to `SUBCATEGORY_LABELS` (its caption) and
   `COLLECTION_OF` (which product line it belongs to) in
   `scripts/build-gallery.mjs`.
3. Run `npm run gallery`. It rewrites `content/gallery.generated.ts` with each
   file's real dimensions and a base64 blur placeholder, and warns about any
   slug it has no label for.

The handful of images the design leans on hardest — the hero, the story
portrait, the collection and craft images — are cropped versions of workshop
photographs, built by `node scripts/build-editorial.mjs` into
`public/images/editorial/`. That script trims the white letterboxing and crops
away the burnt-in camera watermarks; the originals are never modified. To change
one, edit the `jobs` list at the top and re-run it.

---

## How it is put together

```
app/                     routes, metadata, sitemap, robots, OG image
  projects/[space]/      one prerendered page per space, not a query parameter
  actions/enquiry.ts     server action → Resend, with Zod validation + honeypot
components/
  layout/                header, footer, preloader, cursor, smooth scroll, page transition
  ornament/              the SVG motif library (lotus, vine, kalasha, bead-and-reel…)
  ui/                    reveals, frames, arch masks, magnetic links, page header
  home/ gallery/ …       page sections
content/                 all copy and data (above)
lib/                     motion vocabulary, WhatsApp deep links
scripts/                 gallery manifest, editorial crops, textures, screenshots
```

### The design system

`/styleguide` renders the whole thing — palette, surfaces, type scale, the
ornament library, controls, frames and the motion timings. It is `noindex` and
not linked from the site.

- **Palette** ebony `#1c120c` · rosewood `#3a2016` · teak `#6b3f22` ·
  honey `#b9814a` · brass `#c9a35f` · sandalwood `#efe3cf` · ivory `#f8f2e7`
- **Type** Cormorant Garamond (display, italics as the accent voice) + Manrope
  (body and UI), both via `next/font` with a strict `clamp()` scale
- **Surfaces** `.surface-wood`, `.surface-sandal` and `.surface-paper` alternate
  down every page. The wood grain is two layers of noise at different
  frequencies, baked to seamless WebP tiles by `npm run textures` — the noise is
  tileable by construction, so there is no seam at any size. It started as
  inline `feTurbulence`, which looked identical but had to be re-run by the
  browser on every rasterisation and cost about a second of load time on a
  phone
- **Motion** one ease — `cubic-bezier(0.22, 0.75, 0.2, 1)` — at 620ms for the
  first screen and 600 / 900 / 1200ms thereafter. Nothing bounces

Tailwind's opacity scale is extended to every whole percent in
`tailwind.config.ts`: the default ships only multiples of five, so a class like
`text-brass/72` would otherwise produce no rule at all and fail silently.

### Why the gallery filter is a route

`/projects/residential`, `/projects/commercial` and `/projects/worship` are
real, prerendered pages rather than `?space=…` on one page. Reading the filter
from the query string forces the gallery into a client-rendered Suspense
boundary: the server can only emit a "loading" placeholder, the browser swaps in
five hundred tiles after hydration, and the result is a second of blank page and
a 0.18 layout shift. As routes, each view is static, complete in the HTML and
indexable on its own. The subcategory pills stay client state — they need no
deep link and should feel instant.

### Motion and `prefers-reduced-motion`

Every animation is off under `prefers-reduced-motion: reduce`: Lenis never
starts, the preloader never shows, the pinned craft sequence is not pinned, the
custom cursor is not rendered, and reveals render in place.

Three things worth knowing if you work on this:

- **The first screen never waits for JavaScript.** `EnterLines` / `EnterUp`
  (used by the hero and every page header) animate in CSS, and the preloader is
  gated by a four-line inline script in `<head>` rather than a React effect.
  A JS-gated headline is invisible without scripts, and on a throttled phone it
  pushes Largest Contentful Paint seconds late. Below the fold, `Reveal` and
  `RevealLines` take over, because those genuinely depend on scroll position.
- **Reveals latch.** `useRevealed` (`lib/motion.ts`) treats an element as seen
  once an IntersectionObserver sees it, *or* once it is at or above the fold.
  The observer alone is not enough — its first callback is async, so a page
  scrolled or deep-linked past the fold before it runs would leave content
  permanently invisible.
- **Lenis is patched.** While Lenis is driving, it writes its own scroll
  position every frame, which silently defeats `window.scrollTo` and
  `Element.scrollIntoView` — that breaks in-page anchors, the skip link, focus
  scrolling and browser find-in-page. `components/layout/SmoothScroll.tsx`
  routes both through Lenis while it is mounted and restores the originals when
  it is not.

### Accessibility

Semantic landmarks, a skip link, visible brass focus rings everywhere, labelled
form fields with inline errors, alt text on every photograph, and a keyboard-
and swipe-navigable lightbox (arrows, Escape, trapped focus). The mobile menu
traps focus, closes on Escape and returns focus to the button that opened it.

### Performance

Lighthouse, mobile preset, against `next start` on a quiet machine:

| Page | Perf | A11y | Best practices | SEO |
|---|---|---|---|---|
| Home | 93 | 100 | 100 | 100 |
| Projects (and each space) | 90–91 | 100 | 100 | 100 |
| Collections | 94 | 100 | 100 | 100 |
| Collection detail (×4) | 93–94 | 100 | 100 | 100 |
| Our Story | 92 | 100 | 100 | 100 |
| The Craft | 93 | 100 | 100 | 100 |
| Clients | 93 | 100 | 100 | 100 |
| Contact | 94 | 100 | 100 | 100 |

Cumulative Layout Shift is 0 on every page and Total Blocking Time is under
20 ms. Largest Contentful Paint is 3.1–3.7 s under Lighthouse's simulated slow
4G and 4× CPU throttle, which is the metric doing most of the work in the score.

Re-run it yourself with the server already warm — scores drop several points if
anything else on the machine is using the CPU, so measure on a quiet one:

```bash
npm run build && npx next start -p 4010
npx lighthouse http://127.0.0.1:4010/ --chrome-flags="--headless=new" --view
```

Four things carry most of that result, and they are worth knowing before you
change them:

- **The first screen never waits for JavaScript** (see below). Gating the
  headline on hydration cost roughly a second and a half of LCP.
- **The wood grain is a baked WebP tile, not `feTurbulence`.** The filter was
  re-run by the browser on every rasterisation; replacing it moved the gallery
  pages from 80 to 91.
- **The gallery filter is a route, not a query parameter** — see below.
- **The preloader panels use a gradient, not the wood texture.** Give them a
  background *image* and the browser scores the curtain as the Largest
  Contentful Paint, so the metric measures the loader instead of the page.

### SEO

Per-page titles and descriptions, canonical URLs, Open Graph and Twitter cards,
a drawn `opengraph-image`, `sitemap.xml`, `robots.txt`, and `Organization` +
`LocalBusiness`/`FurnitureStore` JSON-LD carrying the real address, coordinates,
phone and the four product lines.

---

## Repository size

`public/images` is 67 MB — 510 photographs downloaded from the old site at the
best resolution it had. If that is too much for the host repository, the
alternatives are to move the gallery to a CMS or an image CDN and keep only the
editorial crops in-repo, or to run the originals through
`sips -Z 1600` (or sharp) before committing. Nothing in the code depends on the
files being any particular size: rerun `npm run gallery` afterwards and the
manifest picks up the new dimensions.

## Screenshots

```bash
npm run build
npx next start -p 4010
npm run screenshots                    # → /screenshots, desktop + mobile
```

Every page at 1440px and 390px, full height, 1.5× device pixel ratio, as JPEG.
Pass a name to redo one: `node scripts/screenshots.mjs "" home`.

The home page capture has a long blank stretch after The Craft. That is the
pinned ScrollTrigger section doing its job: it reserves two viewport heights of
scroll so the four stages can advance in place, and a full-page screenshot
renders that reserve as empty space. On a real screen there is no gap.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (every route prerendered) |
| `npm run start` | Serve the production build |
| `npm run assets` | All three asset steps below, in order |
| `npm run gallery` | Rebuild the photo manifest from `public/images/gallery` |
| `npm run editorial` | Rebuild the cropped editorial images |
| `npm run textures` | Rebuild the seamless wood- and film-grain tiles |
| `npm run screenshots` | Capture `/screenshots` (server must be running) |
