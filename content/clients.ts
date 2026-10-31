import type { Client } from './types'

/**
 * The client list exactly as the workshop publishes it — 39 names with their
 * cities. `kind` is read from the name itself (Builders, Developers,
 * Architecture, Hotel, Education Foundation); where the name does not say,
 * it is left as 'builder', which is how the workshop groups them.
 *
 * Do not add a name here that the client has not given us.
 */
export const clients: Client[] = [
  { name: 'Archi Techniques', city: 'Mangalore', kind: 'architect' },
  { name: 'Siddivinayak Constructions', city: 'Mangalore', kind: 'builder' },
  { name: 'Mathias Builders', city: 'Mangalore', kind: 'builder' },
  { name: 'Classic Promoters & Developers', city: 'Mangalore', kind: 'builder' },
  { name: 'Land Trades Builders & Developers', city: 'Mangalore', kind: 'builder' },
  { name: 'Shree Skanda Constructions', city: 'Mangalore', kind: 'builder' },
  { name: 'F. R. Promoters & Developers', city: 'Mangalore', kind: 'builder' },
  { name: 'Vijayashree Builders & Developers', city: 'Mangalore', kind: 'builder' },
  { name: 'Pride Developers', city: 'Mangalore', kind: 'builder' },
  { name: 'Monarch Builders & Engineers', city: 'Mangalore', kind: 'builder' },
  { name: 'Raj Kamal Developers', city: 'Mangalore', kind: 'builder' },
  { name: 'Rachana Consulting Engineer & Architecture', city: 'Mangalore', kind: 'architect' },
  { name: 'Anushar Designer', city: 'Mangalore', kind: 'architect' },
  { name: 'Saldanha Associates', city: 'Mangalore', kind: 'architect' },
  { name: 'Kirthi Associates', city: 'Mangalore', kind: 'architect' },
  { name: 'Uttam Constructions', city: 'Mangalore', kind: 'builder' },
  { name: 'J. V Builders', city: 'Mangalore', kind: 'builder' },
  { name: 'Northensky Properties Pvt. Ltd', city: 'Mangalore', kind: 'builder' },
  { name: 'Adyar Garden', city: 'Mangalore', kind: 'hospitality' },
  { name: 'Anubhav Designers', city: 'Mangalore', kind: 'architect' },
  { name: 'Dev Kusum Developers', city: 'Surathkal', kind: 'builder' },
  { name: 'Prashanthi Developers', city: 'Brahmavar', kind: 'builder' },
  { name: 'Premier Builders', city: 'Udupi', kind: 'builder' },
  { name: 'Sai Radha Developers', city: 'Udupi', kind: 'builder' },
  { name: 'Simon And Associate', city: 'Udupi', kind: 'architect' },
  { name: 'Shabhari Manini Enterprise', city: 'Udupi', kind: 'builder' },
  { name: 'Minerva Builders & Developers', city: 'Udupi', kind: 'builder' },
  { name: 'Aagamaa Designers', city: 'Udupi', kind: 'architect' },
  { name: 'Jathan Arcade', city: 'Udupi', kind: 'builder' },
  { name: 'NN Projects', city: 'Udupi', kind: 'builder' },
  { name: 'Ujwal Developers', city: 'Udupi', kind: 'builder' },
  { name: 'Sri Mookambika Poly Products', city: 'Udupi', kind: 'manufacturer' },
  { name: 'Veridian Builders', city: 'Manipal', kind: 'builder' },
  { name: 'Alvas Education Foundation', city: 'Moodabidre', kind: 'institution' },
  { name: 'S. L. V Constructions', city: 'Ujire', kind: 'builder' },
  { name: 'Kaveri Builders', city: 'Belman', kind: 'builder' },
  { name: 'Hotel Sahana Orchid', city: 'Kundapura', kind: 'hospitality' },
  { name: 'SS Ventures', city: 'Padubidri', kind: 'builder' },
  { name: 'Sri Manya Developers Vanadurga', city: 'Belman', kind: 'builder' },
]

/**
 * The four client logos the workshop supplies as image files. Each is matched
 * to a name on the list above. {{TODO: logo files for the other 35 clients —
 * the wall currently shows set type for them, which is a perfectly good look,
 * but real marks would be better.}}
 */
export const clientLogos = [
  { src: '/images/clients/client-logo-01.jpg', name: 'Pride Developers', city: 'Mangalore' },
  { src: '/images/clients/client-logo-02.jpg', name: 'Alvas Education Foundation', city: 'Moodabidre' },
  { src: '/images/clients/client-logo-03.jpg', name: 'Rachana Consulting Engineer & Architecture', city: 'Mangalore' },
  { src: '/images/clients/client-logo-04.jpg', name: 'Uttam Constructions', city: 'Mangalore' },
]

export const clientsIntro = {
  eyebrow: 'Clients',
  heading: 'From a small place called Nandalike.',
  body: [
    'From a small-scale industry in Nandalike, Udupi District, to a brand recognised across the state, Sarala Wood Industries has carved out a niche for itself in designer wooden doors and frames, windows, wardrobes, modular kitchens and home furniture.',
    'We have had the privilege of working with some of the best-known builders, heritage houses, hotels, theme restaurants, places of religious worship and elite individuals from around the country. We are proud of what we have achieved, and we hold to the quest for perpetual innovation — with the ambition of becoming one of India’s leading names for designer furniture, accessories and interiors.',
  ],
}

/** {{TODO: two or three real project stories — client, place, what was made.}} */
export const clientStories: { client: string; place: string; body: string }[] = []
