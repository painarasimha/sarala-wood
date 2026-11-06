# Sarala Wood Industries

The website for a heritage wood-carving workshop at Nandalike, Karkala Taluk,
Udupi District, Karnataka — founded in 1986 by Mrs. Sarala Hegde.

Next.js (App Router) · TypeScript · Tailwind CSS · Lenis · Framer Motion ·
Resend.

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
| `content/gallery.ts` | Hand-picked selections for the craft details |
| `content/vocabulary.ts` | The six carving motifs — read the header before editing |
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
  layout/                header, footer, smooth scroll, WhatsApp button
  ornament/              the six motifs, the house mark and the seal
  ui/                    plate, section scaffolding, reveals, CSS entrances, page header
  home/ gallery/ …       page sections
content/                 all copy and data (above), including vocabulary.ts
lib/                     motion vocabulary, WhatsApp deep links
scripts/                 gallery manifest, editorial crops, screenshots
```

### The design system

`/styleguide` renders the whole thing — palette, patterns, type scale, the six
motifs, the plate, controls and motion timings. It is `noindex` and not linked
from the site.

The governing idea: **the page is paper, and the only wood on it is the work
itself.** The previous version made the interface out of the same material as
the product, so the carving disappeared into the chrome.

- **Palette** paper `#F3EEE4` · paper-2 `#EDE6D8` · mat `#FDFBF7` ·
  bronze `#855D34` · ink `#191310` · dark `#15110E` · dark-ink `#E9E1D2`.
  Every pairing used on the site clears WCAG AA — bronze started at `#8A6238`
  and was darkened because it only reached 4.35:1 on the paper-2 sections.
- **Type** EB Garamond throughout, with Marcellus — Roman inscriptional
  capitals, letterforms that were *cut* — for labels and small caps. Two
  families, both serif, no UI sans.
- **Patterns** three, each traced from carving visible in the workshop's own
  photographs and defined as an inline SVG data-URI in `globals.css`:
  the **diamond diaper** from the pilasters (the page texture, at about 3%),
  the **pierced jaali** from the mantapa screens (the top inlay and the screen
  behind the dark section), and the **bead-and-reel** from the door mouldings
  (the rule between sections).
- **The plate** every photograph is mounted: a white mount, a hairline and four
  carved corner marks, with the caption beneath rather than over the picture.
  This is deliberate — their photographs are phone shots against workshop
  walls, and mounting flatters them where a full-bleed crop exposes them.
- **Motion** one ease, `cubic-bezier(0.2, 0.7, 0.2, 1)`. 500ms for hovers,
  620ms for the first screen (in CSS), 800ms for reveals on scroll.

Tailwind's opacity scale is extended to every whole percent in
`tailwind.config.ts`: the default ships only multiples of five, so a class like
`text-bronze/72` would otherwise produce no rule at all and fail silently.

### The vocabulary section

`/` and `/the-craft` both carry a section naming six carving motifs. Read
`content/vocabulary.ts` before editing it — it documents exactly which parts are
verified against the photographs and which are our words rather than the
workshop's. Three of the names (padma, kalasha, jaali) are standard terms safe
to attribute; the rest are described in plain English on purpose, and the copy
never claims the workshop uses this vocabulary with customers.

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
starts, the CSS entrances do not run, and reveals render in place.

Three things worth knowing if you work on this:

- **The first screen never waits for JavaScript.** `EnterLines` / `EnterUp`
  (used by the hero and every page header) animate in CSS. A JS-gated headline
  is invisible without scripts, and on a throttled phone it pushes Largest
  Contentful Paint seconds late. Below the fold, `Reveal` takes over, because
  that genuinely depends on scroll position.
- **`EnterUp` translates but does not fade.** An element at `opacity: 0` has
  not been painted, so fading the first screen in delays Largest Contentful
  Paint by the whole length of the animation. Sliding alone reads the same.
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

Semantic landmarks, a skip link, visible bronze focus rings everywhere, labelled
form fields with inline errors, alt text on every photograph, and a keyboard-
and swipe-navigable lightbox (arrows, Escape, trapped focus). The mobile menu
traps focus, closes on Escape and returns focus to the button that opened it.

### Performance

Lighthouse, mobile preset, against `next start` on a quiet machine:

| Page | Perf | A11y | Best practices | SEO |
|---|---|---|---|---|
| Home | 96 | 100 | 100 | 100 |
| Collections | 92 | 100 | 100 | 100 |
| Collection detail | 91 | 100 | 100 | 100 |
| Projects (all 510) | 86 | 100 | 100 | 100 |
| Projects — Residential | 95 | 100 | 100 | 100 |
| Projects — Places of Worship | 100 | 100 | 100 | 100 |
| Our Story | 91 | 100 | 100 | 100 |
| The Craft | 91 | 100 | 100 | 100 |
| Clients | 96 | 100 | 100 | 100 |
| Contact | 96 | 100 | 100 | 100 |

`/projects` is the one page under 90. It is the index of all 510 photographs,
so its document is the largest on the site and its Largest Contentful Paint is
a gallery tile at about 4.3s under Lighthouse's simulated 1.6 Mbps link. The
per-space routes that the navigation and the home page actually link to score
95–100. If it matters, the fix is to paginate the index server-side rather than
hand the client every item for filtering.

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
- **The page texture is an inline SVG data-URI, not a filter.** An earlier
  version used `feTurbulence`, which the browser re-ran on every rasterisation
  and which cost about a second of load on a phone.
- **The gallery filter is a route, not a query parameter** — see below.
- **The first image on each page carries `priority`.** These are image-LCP
  pages now; discovering the largest picture lazily costs about a second.
- **EB Garamond is pinned to weight 400.** Left unpinned, `next/font` ships the
  full variable font — 158 KB across two files for an axis the site never uses.
  Pinning it took the page's font payload from 201 KB to 60 KB and lifted every
  page by five to ten points.
- **The gallery payload is trimmed.** `trimForClient` in `content/gallery.ts`
  drops the blur placeholder past the first two dozen tiles and the duplicated
  alt sentence (rebuilt identically on render), taking the `/projects` document
  from 461 KB to 338 KB.

### SEO

Per-page titles and descriptions, canonical URLs, Open Graph and Twitter cards,
a drawn `opengraph-image`, `sitemap.xml`, `robots.txt`, and `Organization` +
`LocalBusiness`/`FurnitureStore` JSON-LD carrying the real address, coordinates,
phone and the four product lines.

---

## The approved concept

`concept/index.html` is the standalone design concept this site was built from,
with its own copy of the images in `concept/img/` so it opens anywhere without
a server. `sarala-concept.zip` is the same folder, ready to send to the client.
Neither is part of the build; they are kept as the reference the implementation
was signed off against.

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
