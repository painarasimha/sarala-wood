import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import './globals.css'
import { site } from '@/content/site'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Preloader, preloaderScript } from '@/components/layout/Preloader'
import { Cursor } from '@/components/layout/Cursor'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { PageTransition } from '@/components/layout/PageTransition'

// Only the weights the site actually sets are loaded — every extra file is
// another request competing with the one the headline is waiting for.
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

// Manrope is a variable font: omitting `weight` ships one file covering the
// whole axis instead of one per weight.
const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Hand-carved doors & furniture, Karkala, Karnataka`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    'carved wooden doors Karnataka',
    'temple woodwork Udupi',
    'custom wooden furniture Karkala',
    'wooden door frames Udupi',
    'modular kitchen Karkala',
    'wooden wardrobes Mangalore',
    'heritage wood carving Karnataka',
    'pooja door carving',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Hand-carved doors & furniture since 1986`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Hand-carved doors & furniture since 1986`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1c120c',
  colorScheme: 'light',
}

/** LocalBusiness + Organization, with the real address and phone numbers. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      foundingDate: site.founded,
      founder: { '@type': 'Person', name: site.founder },
      email: site.emails[0],
      telephone: site.phones[0].number,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.taluk,
        addressRegion: site.address.state,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
    },
    {
      '@type': ['LocalBusiness', 'FurnitureStore'],
      '@id': `${site.url}/#localbusiness`,
      name: site.name,
      description: site.description,
      url: site.url,
      telephone: site.phones[0].number,
      email: site.emails[0],
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.taluk,
        addressRegion: site.address.state,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: site.geo.latitude,
        longitude: site.geo.longitude,
      },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Udupi District' },
        { '@type': 'AdministrativeArea', name: 'Dakshina Kannada' },
        { '@type': 'State', name: 'Karnataka' },
      ],
      makesOffer: [
        'Wooden Doors & Windows',
        'Wooden Wardrobes',
        'Custom-made Home & Office Furniture',
        'Modular Kitchens',
      ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Product', name } })),
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <head>
        {/* Decides the preloader before the first paint. See Preloader.tsx. */}
        <script dangerouslySetInnerHTML={{ __html: preloaderScript }} />
      </head>
      <body className="film-grain">
        <script
          type="application/ld+json"
          // The payload is our own static object, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <Preloader />
        <Cursor />
        <Header />
        <PageTransition>
          <main id="main">{children}</main>
        </PageTransition>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
