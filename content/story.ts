import type { CraftStep, Space, TimelineEntry, Value } from './types'

/* ------------------------------------------------------------------ *
 * The founder's story. Every fact here appears on the workshop's own
 * About page; the telling is ours.
 * ------------------------------------------------------------------ */

export const story = {
  eyebrow: 'Our Story',
  heading: 'A home is remembered by its wood.',
  lead: 'Sarala Wood Industries is a story of entrepreneurial spirit — the promotion of designer wooden doors and frames, windows, wardrobes, modular kitchens and home furniture from a small place called Nandalike.',

  body: [
    'It began in 1986, when Mrs. Sarala Hegde realised how much potential there was for heritage and carved wooden furniture in home décor. Many would have frowned at the idea. She was driven by a passion: to build a brand on exquisite design and imperial quality.',
    'She started with a seed capital of ₹4,40,000, of which ₹1,40,000 was loaned by Vijaya Bank, Belman Branch. Fine species of raw wood were within easy reach; almost nothing else was. Thanks to an unwavering spirit, the workshop gradually carved out a niche for itself in custom-made designer doors and frames, windows, wardrobes, modular kitchens and home furniture.',
    'Today that clientele includes prominent builders, heritage houses, hotels, theme restaurants and places of religious worship. As demand rose and clients’ preferences evolved, the company moved successfully to automated designing and carving — a contemporary technology holding a traditional essence, rather than replacing it.',
    'Mr. Suhas Hegde, an engineering graduate of Malnad Engineering College, Hassan, has been an able ally to his mother’s initiative, bringing a fresh perspective to production and marketing and drawing out the plans that carried the name further. He is currently the Managing Director of the company.',
  ],

  signature: { name: 'Sarala Hegde', role: 'Founder, 1986' },

  portrait: {
    src: '/images/editorial/story-carved-main-door.jpg',
    alt: 'Carved teak main door with beaded moulding and a floral roundel, made at the Nandalike workshop',
    width: 1300,
    height: 1625,
  },

  /** {{TODO: a photograph of Mrs. Sarala Hegde, and one of Mr. Suhas Hegde}} */
  founderPortrait: null,
}

/* ------------------------------------------------------------------ *
 * Timeline. Only 1986 and the move to automated carving are documented;
 * everything else waits on the client.
 * ------------------------------------------------------------------ */

export const timeline: TimelineEntry[] = [
  {
    year: '1986',
    title: 'A workshop at Nandalike',
    body: 'Mrs. Sarala Hegde founds Sarala Wood Industries with ₹4,40,000 of seed capital — ₹1,40,000 of it loaned by Vijaya Bank, Belman Branch — betting that heritage carving belongs in ordinary homes, not only in temples and palaces.',
  },
  {
    year: '{{TODO: year}}',
    title: 'The first commissions beyond Karkala',
    body: '{{TODO: when did work first travel outside the taluk, and for whom? A builder, a temple, a hotel — one sentence is enough.}}',
    todo: true,
  },
  {
    year: '{{TODO: year}}',
    title: 'Suhas Hegde joins the workshop',
    body: '{{TODO: the year Mr. Suhas Hegde joined, and the year he became Managing Director.}}',
    todo: true,
  },
  {
    year: '{{TODO: year}}',
    title: 'Automated designing and carving',
    body: 'The workshop migrates to automated designing and carving to keep pace with demand — contemporary technology set to work in the service of a traditional hand. {{TODO: the year this happened, and which machines were brought in.}}',
    todo: true,
  },
  {
    year: '{{TODO: year}}',
    title: 'A clientele across the coast',
    body: '{{TODO: a milestone worth marking — a landmark temple, a hotel, an institutional project, or the year the client list passed a number you are proud of.}}',
    todo: true,
  },
]

/* ------------------------------------------------------------------ *
 * Values. Drawn from what the workshop says about itself.
 * ------------------------------------------------------------------ */

export const values: Value[] = [
  {
    index: 'i',
    title: 'Exquisite design',
    body: 'The founding bet: that design carries a house further than ornament for its own sake. Most of our patterns are imbibed from ancient architecture and heritage collections, so a new house can hold an old grammar.',
  },
  {
    index: 'ii',
    title: 'Imperial quality',
    body: 'Quality workmanship at an affordable cost is the promise the name was built on, and the reason clients return. When you choose Sarala, you choose the guarantee of quality and splendour.',
  },
  {
    index: 'iii',
    title: 'Made to order',
    body: 'Nothing here is cut down from a standard size. Every door, wardrobe, kitchen and table is made for the opening, the room and the household it is going to.',
  },
  {
    index: 'iv',
    title: 'Tradition, carried forward',
    body: 'We moved to automated designing and carving as demand rose — a right mix of contemporary technology with traditional essence, so that the hand still decides and the machine only keeps up.',
  },
]

/* ------------------------------------------------------------------ *
 * The four stages of the craft.
 * ------------------------------------------------------------------ */

export const craftSteps: CraftStep[] = [
  {
    index: 'i',
    name: 'Selecting',
    short: 'Choosing the board for the piece it will become',
    body: 'Timber is hand-picked for grain, density and character. Shisham, teak, mango and meranti each behave differently under a chisel, and a client may choose the species themselves. The board is chosen for the piece it is going to become, not the other way round.',
    motif: 'rings',
    image: {
      src: '/images/editorial/craft-selecting-boards.jpg',
      alt: 'Boards of differing grain and colour laid up side by side at the Nandalike workshop',
    },
  },
  {
    index: 'ii',
    name: 'Seasoning',
    short: 'Letting the wood settle before it is asked to hold a shape',
    body: 'Wood moves. On this coast it swells through the monsoon and gives it back in the dry months, so it is seasoned before anything is cut — because a door that was rushed will tell you about it every June.',
    motif: 'boards',
    image: {
      src: '/images/editorial/craft-seasoning-turned.jpg',
      alt: 'Turned wooden vessels resting at the workshop, their end grain exposed',
    },
  },
  {
    index: 'iii',
    name: 'Carving',
    short: 'Lotus, vine and temple motifs brought out line by line',
    body: 'This is where the house gets its character. Lotus roundels, running vine, bead-and-reel borders and narrative relief panels are brought out line by line. Automated carving does the repetitive ground; the detail, the undercut and the final pass stay with the carver.',
    motif: 'lotus',
    image: {
      src: '/images/editorial/craft-carving-relief.jpg',
      alt: 'A deep relief panel of tigers among pines, carved in wood by Sarala Wood Industries',
    },
  },
  {
    index: 'iv',
    name: 'Finishing',
    short: 'Polishing until the grain comes up rather than disappears',
    body: 'Layered polishing deepens the natural tone and protects the surface without hiding what is underneath. The grain should come up, not vanish under a coat — a Sarala piece is meant to be read as wood for as long as it stands.',
    motif: 'chisel',
    image: {
      src: '/images/editorial/craft-carved-mantapa.jpg',
      alt: 'Finished carved wooden mantapa with a deep polished surface',
    },
  },
]

/* ------------------------------------------------------------------ *
 * The three kinds of space the workshop builds for.
 * ------------------------------------------------------------------ */

export const spaces: Space[] = [
  {
    slug: 'residential',
    index: 'i',
    name: 'Residential',
    blurb: 'Main doors, pooja rooms, wardrobes, cots, dining tables and partitions — the pieces that give a house its character and keep it.',
    hero: {
      src: '/images/editorial/collection-doors-windows.jpg',
      alt: 'Carved wooden main door frame in a Karnataka home',
    },
  },
  {
    slug: 'commercial',
    index: 'ii',
    name: 'Commercial',
    blurb: 'Courtyards, double main doors, seating and wood works for builders, hotels, theme restaurants and offices along the coast.',
    hero: {
      src: '/images/gallery/commercial/courtyard-01.jpg',
      alt: 'Wooden courtyard structure built for a commercial project',
    },
  },
  {
    slug: 'worship',
    index: 'iii',
    name: 'Places of Worship',
    blurb: 'Temple doors and frames, mantapas, pooja rooms and stands, altars, church benches and a ratha — carved in the traditions of the region.',
    hero: {
      src: '/images/gallery/worship/temple-door-01.jpg',
      alt: 'Carved temple door made by Sarala Wood Industries',
    },
  },
]
