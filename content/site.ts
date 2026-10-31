/**
 * Brand facts. Every value here is taken from the workshop's own site or from
 * the client brief — nothing is inferred. Anything the client still needs to
 * supply is marked with the {{TODO: …}} convention and listed in
 * CONTENT_TODO.md.
 */

export const site = {
  name: 'Sarala Wood Industries',
  shortName: 'Sarala',
  founded: '1986',
  founder: 'Mrs. Sarala Hegde',
  managingDirector: 'Mr. Suhas Hegde',
  tagline: 'When you choose Sarala, you choose the guarantee of quality & splendour',
  description:
    'Heritage wood carving from Karkala, Karnataka. Hand-carved doors and window frames, wardrobes, custom home and office furniture and modular kitchens, made to order since 1986.',

  address: {
    street: 'Nandalike Post',
    taluk: 'Karkala Taluk',
    district: 'Udupi District',
    state: 'Karnataka',
    postalCode: '576111',
    country: 'IN',
    /** One-line form for footers and metadata. */
    oneLine: 'Nandalike Post, Karkala Taluk, Udupi District, Karnataka 576111',
  },

  /** Coordinates of the workshop, taken from the Google Maps place embed. */
  geo: { latitude: 13.18001, longitude: 74.88906 },

  phones: [
    { label: 'Mobile', number: '+91 98451 20969', tel: '+919845120969', primary: true },
    { label: 'Mobile', number: '+91 73537 62075', tel: '+917353762075', primary: false },
    { label: 'Mobile', number: '+91 91480 77969', tel: '+919148077969', primary: false },
    { label: 'Landline', number: '08258 274329', tel: '+918258274329', primary: false },
  ],

  emails: ['sarala.mill@yahoo.com', 'suhaskumarhegde@gmail.com'],

  /** The number WhatsApp deep links open, in international format, digits only. */
  whatsapp: '919845120969',

  /** {{TODO: confirm visiting hours at the Nandalike workshop}} */
  hours: '{{TODO: visiting hours — e.g. Mon–Sat, 9.30am to 6.30pm}}',

  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.720515334655!2d74.8890555148874!3d13.180013690719383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbb6d7a84309b%3A0x301238cad022a01b!2sSarala%20Wood%20Industries!5e0!3m2!1sen!2sin!4v1585568028970!5m2!1sen!2sin',
  mapsLink: 'https://maps.google.com/?q=Sarala+Wood+Industries,+Nandalike,+Karkala,+Udupi,+Karnataka+576111',

  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saralawood.com',
} as const

export const nav = [
  { href: '/our-story', label: 'Our Story' },
  { href: '/the-craft', label: 'The Craft' },
  { href: '/collections', label: 'Collections' },
  { href: '/projects', label: 'Projects' },
  { href: '/clients', label: 'Clients' },
  { href: '/contact', label: 'Contact' },
] as const

export const footerNav = {
  Visit: [
    { href: '/our-story', label: 'Our Story' },
    { href: '/the-craft', label: 'The Craft' },
    { href: '/clients', label: 'Clients' },
    { href: '/contact', label: 'Commission a piece' },
  ],
  Collections: [
    { href: '/collections/doors-windows', label: 'Doors & Windows' },
    { href: '/collections/wardrobes', label: 'Wardrobes' },
    { href: '/collections/furniture', label: 'Home & Office Furniture' },
    { href: '/collections/modular-kitchens', label: 'Modular Kitchens' },
  ],
  Projects: [
    { href: '/projects/residential', label: 'Residential' },
    { href: '/projects/commercial', label: 'Commercial' },
    { href: '/projects/worship', label: 'Places of Worship' },
  ],
} as const
