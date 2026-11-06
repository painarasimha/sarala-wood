# Content to come from Sarala Wood Industries

Everything on the site today is true. This is the list of what is **missing** or
**placeheld**, in the order it would improve the site most.

Every placeholder in the code is written as `{{TODO: … }}` so it is easy to
find: `grep -rn "{{TODO" content/ app/`

---

## 1. The biggest gap: photography of the work being made

**Every one of the 510 photographs on this site is of a finished piece.** There
is not a single frame of a hand, a chisel, a stack of timber, the machines, or
anyone who works at Nandalike.

That is the one thing standing between this site and a genuinely great one. A
craft brand is sold on the making, not only the made. A single afternoon with a
camera in the workshop would change the Home, Our Story and The Craft pages more
than any other item on this list.

Specifically, what the layouts are built to hold:

| Where | What is needed | Currently showing |
|---|---|---|
| Home — "The Craft" pinned sequence | One photograph per stage: timber being chosen, boards seasoning, a carver at the bench, a piece being polished | Finished pieces standing in for each stage |
| The Craft — four full-width sections | The same four, larger and in detail | As above |
| The Craft — before/after | One raw plank and the finished piece made from it, shot from the same angle. The brief asked for a slider; it is not built because no such pair exists. Supply the pair and it goes in | Not built |
| Our Story — founder | A photograph of **Mrs. Sarala Hegde**, and one of **Mr. Suhas Hegde** | A carved door stands in |
| Our Story — the workshop | The building, the yard, the machines, the team | Three finished pieces |

## 2. Photographs that need replacing or re-shooting

- **Resolution.** Only 13 of the 510 photographs are wider than 1500px; most are
  around 750×1000. They hold up at the sizes used, but a full-bleed hero or a
  large detail wants 2500px or more. Re-shoot the best twenty pieces.
- **Watermarks.** A number of files carry a burnt-in camera watermark
  (`REDMI NOTE 8 QUAD CAMERA`) or hand-added labels (`wooden key Holder`,
  `wooden chopping board`, `Sarala wood`). The eleven images used editorially are
  cropped around these in `scripts/build-editorial.mjs`; the rest show them in
  the gallery.
- **Backgrounds.** Many pieces are shot against a workshop wall, a tarpaulin or
  grass. Shot against a plain ground, or in the room they were installed in,
  the same pieces would look twice the price.

## 3. Stock imagery removed from the old site

The old saralawood.com used **stock photographs** for its homepage banners
(`banner1–4.jpg`, `mobile-banner1–4.jpg`), its page banners
(`about-banner`, `products-banner`, `clients-banner`, `contact-banner`), its
product tiles (`product1–4.jpg`, `prod1–4.jpg`) and its welcome images.

They are downloaded to `/public/images/hero`, `/public/images/site` and
`/public/images/products` for reference but **are not used anywhere on the new
site** — presenting someone else's furniture as Sarala's work would be a lie,
and a visitor who spots it stops believing the rest. Every image on the new site
is the workshop's own.

If a stock bedroom or kitchen is genuinely wanted for a mood shot, it should be
licensed and captioned as such.

## 4. Copy that is placeheld

### Our Story — the timeline (`content/story.ts`)
Only **1986** is a documented date. Four entries are waiting:

- The year work first travelled beyond Karkala taluk, and for whom
- The year Mr. Suhas Hegde joined, and the year he became Managing Director
- The year the workshop moved to automated designing and carving, and which
  machines were brought in
- One more milestone worth marking — a landmark temple, a hotel, an
  institutional project

### Collections — "What you can specify" (`content/collections.ts`)
Each of the four collections has four fields waiting, and they are the fields a
buyer actually wants:

| Collection | Needed |
|---|---|
| Doors & Windows | Standard and custom opening sizes · finishes · named carving motifs · lead time |
| Wardrobes | Widths, depths, heights · polish/veneer/plywood options · hinge, handle and internal fittings · lead time |
| Home & Office Furniture | Size ranges per piece type · finish and upholstery options · lead time |
| Modular Kitchens | Layout types (L-shape, parallel, island…) · carcass and shutter materials · finishes and hardware · lead time |

### The Craft (`app/the-craft/page.tsx`)
How shisham, teak, mango and meranti each behave, what they cost relative to one
another, and which the workshop recommends for which piece.

### Clients (`content/clients.ts`)
- **Two or three real project stories** — the client, the building, what was
  made, how long it took. In the client's own words if they will give them.
  This is the single best piece of copy the site could gain.
- **Logo files for the other 35 clients.** Four marks are on file (Pride,
  Alva's Education Foundation, Rachana, Uttam Group); the remaining 35 are set
  in type, which looks deliberate, but real marks would be better.
- Which client each project photograph belongs to, so the gallery can be
  credited.

### Contact (`content/site.ts`)
- **Visiting hours** at the Nandalike workshop.

### The carving vocabulary (`content/vocabulary.ts`)
The site now names six carving motifs, on the home page and on The Craft. The
**drawings are verified** — each motif was checked against close crops of the
workshop's own photographs before it was drawn. The **names are ours**, because
the workshop has never published any.

Three are standard terms that are safe to attribute — *padma*, *kalasha*,
*jaali*. The other three are described in plain English (*running vine*,
*bead moulding*, *diamond diaper*) rather than given invented Sanskrit names,
and the copy deliberately never says the workshop uses this vocabulary with
customers.

- [ ] Show the six to Mr. Hegde. If the carvers have their own names — in
      Kannada or Tulu — his words beat ours, and this section gets much better
      for it. If he confirms the Sanskrit terms are used in the workshop, the
      copy can say so directly.

---

## 5. Things deliberately *not* written

These were asked for in the brief and have been left out rather than invented,
because inventing them would be a lie a customer could catch:

- **Testimonials and reviews** — none exist.
- **Statistics** ("40 years", "500 projects", "30 craftsmen") — the site says
  "1986" and "510 photographs", both of which are checkable facts.
- **Awards and certifications** — none are claimed anywhere by the business.
- **Timber claims beyond shisham, teak, mango and meranti** — the only four
  species the workshop names, and only for doors and windows. No other
  collection has a timber list, so none is shown.
- **Client names beyond the 39 published** on saralawood.com/clients.

---

## 6. Before going live

- [ ] Set `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL` and `ENQUIRY_FROM_EMAIL`
      (see `README.md`). **Until these are set the enquiry form tells the
      visitor that email is not configured and points them at WhatsApp** — it
      never pretends to have sent something it did not send.
- [ ] Verify the sending domain in Resend so enquiries do not land in spam.
- [ ] Confirm `NEXT_PUBLIC_SITE_URL` is the live domain (it feeds the sitemap,
      canonical URLs and Open Graph tags).
- [ ] Confirm the WhatsApp number in `content/site.ts` (`whatsapp: '919845120969'`)
      is the one that is actually watched.
- [ ] Decide whether `sarala.mill@yahoo.com` should remain the public address or
      be replaced with something at saralawood.com.
- [ ] Re-run `npm run assets` after adding or replacing any photographs, so the
      manifest, the editorial crops and the textures stay in step.

---

## 7. What changed from the old site, for the record

- **Nothing was invented.** Every claim on the new site traces to the old one,
  to the brief, or to what is visible in a photograph. Where a photograph is
  described ("relief panel of tigers among pines", "lion corbel") that is a
  description of the picture, not a claim about the piece.
- **The 39 client names are reproduced exactly**, grouped by the city each is
  listed under, which is new — the old site ran them as one undifferentiated
  column.
- **Facts the old site buried are now in the story**: the ₹4,40,000 of seed
  capital and the Vijaya Bank loan, Mr. Suhas Hegde's engineering background and
  his role as Managing Director, the move to automated designing and carving,
  and the four timber species named for doors and windows.
- **The stock photography is gone** (see section 3), so every image a visitor
  sees is the workshop's own work.
