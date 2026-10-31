import type { Collection } from './types'

/**
 * The four product lines the workshop makes, in the order they present them.
 *
 * Copy is rewritten from the workshop's own Products page — more evocative,
 * same claims. Where they have not told us something (sizes, finishes, lead
 * times), the field carries a {{TODO}} rather than an invention.
 */
export const collections: Collection[] = [
  {
    slug: 'doors-windows',
    index: 'I',
    name: 'Doors & Windows',
    tagline: 'The first thing a guest touches',
    summary:
      'Carved main doors, frames and windows drawn from ancient architecture and heritage collections, made to the size of your opening.',
    body: [
      'A door is the first thing a guest touches and the last thing they remember. Ours are designed gracefully, carved meticulously and hung so that they close with the weight that only solid timber gives.',
      'Most of our designs are imbibed from ancient architecture and heritage collections, so that you can carry the same visual appeal into a house built today. Main doors, pooja doors, bedroom shutters, window frames — each is made to the opening it will live in, not cut down from a standard size.',
      'Prominent buildings, heritage houses, hotels, theme restaurants and places of religious worship have all come to us for the same reason: the entrance sets the register for everything behind it.',
    ],
    hero: {
      src: '/images/editorial/collection-doors-windows.jpg',
      alt: 'Hand-carved teak main door with a deep floral panel, made by Sarala Wood Industries',
      width: 958,
      height: 1280,
    },
    detail: {
      src: '/images/editorial/story-carved-main-door.jpg',
      alt: 'Close detail of a carved main door panel showing a lotus roundel and bead-and-reel border',
      width: 1300,
      height: 1625,
    },
    commission: [
      { label: 'Sizes', value: '{{TODO: standard and custom opening sizes the workshop quotes for}}' },
      { label: 'Finishes', value: '{{TODO: list of polish and finish options}}' },
      { label: 'Motifs', value: '{{TODO: named carving motifs available — e.g. lotus, vine, kalasha}}' },
      { label: 'Lead time', value: '{{TODO: typical lead time from order to delivery}}' },
    ],
    timbers: ['Shisham', 'Teak', 'Mango', 'Meranti'],
  },
  {
    slug: 'wardrobes',
    index: 'II',
    name: 'Wardrobes',
    tagline: 'For the most intimate room in the house',
    summary:
      'Spacious, exquisitely polished wardrobes, compartmented so that everything you own has somewhere of its own.',
    body: [
      'A bedroom carries a personality the rest of the house does not have to. Our wardrobes are crafted to endorse it rather than interrupt it — spacious, elegant, and straightforward to install.',
      'Each wardrobe is fitted with multiple sections, so that what you own can be stacked separately: one compartment for cosmetics, another for bags, the upper section for formal outfits, the lower for everyday wear.',
      'They are finished with the same polish we give a carved door. That is the point of them: an object that adorns the most intimate place in the house, not a box that stores things in it.',
    ],
    hero: {
      src: '/images/editorial/collection-wardrobes.jpg',
      alt: 'A panelled wooden wardrobe standing in a lit bedroom, made by Sarala Wood Industries',
    },
    commission: [
      { label: 'Sizes', value: '{{TODO: wardrobe widths, depths and height options}}' },
      { label: 'Finishes', value: '{{TODO: polish, veneer and plywood options}}' },
      { label: 'Fittings', value: '{{TODO: hinge, handle and internal fitting options}}' },
      { label: 'Lead time', value: '{{TODO: typical lead time from order to delivery}}' },
    ],
    timbers: [],
  },
  {
    slug: 'furniture',
    index: 'III',
    name: 'Home & Office Furniture',
    tagline: 'Made around your rooms, not the other way round',
    summary:
      'Custom-made cots, dining tables, chairs, sofas, teapoys, TV units, railings and partitions for homes and offices.',
    body: [
      'We custom-manufacture the furniture that fits your rooms: cots and side tables, dining tables and chairs, sofas and teapoys, TV units, wall partitions, railings, arches and turned pillars.',
      'Our pieces tend towards the futuristic in design while remaining within an affordable budget, because we would rather you compromised on neither design nor quality. Choosing to have furniture made here means significant savings compared with buying it elsewhere, a wide range of models to select from, and delivery that arrives promptly and unscratched.',
      'Everything is made to order. Tell us the room and we will tell you what it can hold.',
    ],
    hero: {
      src: '/images/editorial/collection-furniture.jpg',
      alt: 'Solid wood dining table and chairs made to order by Sarala Wood Industries',
      width: 1349,
      height: 1799,
    },
    commission: [
      { label: 'Pieces', value: 'Cots, side tables, dining tables, chairs, sofas, teapoys, TV units, wall partitions, railings, arches, pillars' },
      { label: 'Sizes', value: '{{TODO: size ranges the workshop quotes for, per piece type}}' },
      { label: 'Finishes', value: '{{TODO: finish and upholstery options}}' },
      { label: 'Lead time', value: '{{TODO: typical lead time from order to delivery}}' },
    ],
    timbers: [],
  },
  {
    slug: 'modular-kitchens',
    index: 'IV',
    name: 'Modular Kitchens',
    tagline: 'Real wood in the most-used room',
    summary:
      'Modular kitchen furniture built from pedigree wood, laid out to use every inch of the space and simple to install.',
    body: [
      'Our modular kitchens are designed around two things: how easily they go in, and how much room they give back to you once they are in.',
      'The first thing you notice is the ingenuity of the layout, which uses the space optimally. The second is the finish — smooth, stylish designs that smear the kitchen with visual delight rather than lining it with cupboards.',
      'They come in various models, built from pedigree wood, and you may select your own material and the design that best depicts your kitchen. Decorate the room this way and you are gifted with elegant quality and décor in the place the household actually lives.',
    ],
    hero: {
      src: '/images/editorial/collection-modular-kitchens.jpg',
      alt: 'A fitted modular kitchen with wooden cabinetry, made by Sarala Wood Industries',
    },
    commission: [
      { label: 'Layouts', value: '{{TODO: layout types offered — e.g. L-shape, parallel, island}}' },
      { label: 'Materials', value: '{{TODO: carcass and shutter material options}}' },
      { label: 'Finishes', value: '{{TODO: finish and hardware options}}' },
      { label: 'Lead time', value: '{{TODO: typical lead time from order to installation}}' },
    ],
    timbers: [],
  },
]

export const collectionBySlug = (slug: string) => collections.find((c) => c.slug === slug)
