import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

export const alt = `${site.name} — hand-carved doors and furniture since 1986`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * The social card: paper, the house mark, and the promise. Drawn rather than
 * photographed so it stays sharp at any crop.
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
          background: '#F3EEE4',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="#855D34" strokeWidth="1.4">
            <rect x="1.4" y="1.4" width="37.2" height="37.2" />
            <circle cx="20" cy="20" r="12.4" />
            <circle cx="20" cy="9.6" r="2.7" />
            <circle cx="27.4" cy="12.6" r="2.7" />
            <circle cx="30.4" cy="20" r="2.7" />
            <circle cx="27.4" cy="27.4" r="2.7" />
            <circle cx="20" cy="30.4" r="2.7" />
            <circle cx="12.6" cy="27.4" r="2.7" />
            <circle cx="9.6" cy="20" r="2.7" />
            <circle cx="12.6" cy="12.6" r="2.7" />
            <circle cx="20" cy="20" r="3.4" />
          </svg>
          <span style={{ color: '#191310', fontSize: 30, letterSpacing: 8 }}>SARALA</span>
          <span style={{ color: '#756657', fontSize: 19, letterSpacing: 4 }}>EST. 1986</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#191310', fontSize: 82, lineHeight: 1.05, letterSpacing: -1 }}>
            The first thing a
          </div>
          <div style={{ color: '#855D34', fontSize: 82, lineHeight: 1.05, fontStyle: 'italic' }}>
            guest touches.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid rgba(25,19,16,0.16)',
            paddingTop: 26,
            color: '#4C4137',
            fontSize: 21,
          }}
        >
          <span>Hand-carved woodwork · Nandalike, Karkala Taluk · Udupi District</span>
          <span style={{ color: '#855D34' }}>saralawood.com</span>
        </div>
      </div>
    ),
    size
  )
}
