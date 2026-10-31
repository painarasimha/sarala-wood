import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

export const alt = `${site.name} — hand-carved doors and furniture since 1986`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * The default social card. Drawn rather than photographed, so it stays sharp
 * and on-brand at any crop; individual pages can override it.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(140deg, #40241a 0%, #2b1a12 52%, #1c120c 100%)',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="46" height="35" viewBox="0 0 96 72">
            <g fill="none" stroke="#c9a35f" strokeWidth="2.2" strokeLinejoin="round">
              <path d="M48 66C34.5 54 34.5 26 48 8c13.5 18 13.5 46 0 58Z" />
              <path d="M48 66C37 62 25 50 22.5 34.5 33.5 38 43 50 48 66Z" />
              <path d="M48 66C59 62 71 50 73.5 34.5 62.5 38 53 50 48 66Z" />
            </g>
          </svg>
          <span
            style={{
              color: '#c9a35f',
              fontSize: 19,
              letterSpacing: 7,
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
            }}
          >
            Sarala Wood Industries · Est. 1986
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#efe3cf', fontSize: 86, lineHeight: 1.04, letterSpacing: -1 }}>
            Carved by hand.
          </div>
          <div style={{ color: '#c9a35f', fontSize: 86, lineHeight: 1.04, fontStyle: 'italic' }}>
            Made to outlive us.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid rgba(201,163,95,0.35)',
            paddingTop: 26,
            color: 'rgba(239,227,207,0.72)',
            fontSize: 22,
            fontFamily: 'sans-serif',
          }}
        >
          <span>Nandalike, Karkala Taluk · Udupi District · Karnataka</span>
          <span style={{ color: '#c9a35f' }}>saralawood.com</span>
        </div>

        {/* Inset brass hairline */}
        <div
          style={{
            position: 'absolute',
            inset: 28,
            border: '1px solid rgba(201,163,95,0.3)',
          }}
        />
      </div>
    ),
    size
  )
}
