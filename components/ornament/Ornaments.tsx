/**
 * Original ornament library, drawn from the vocabulary of coastal-Karnataka
 * temple woodwork: the lotus (padma), the vine scroll (patra-lata), the
 * kalasha finial, and bead-and-reel edge mouldings.
 *
 * Every motif is stroke-only so it reads as a carved line rather than a filled
 * icon, and every stroke is sized in the 0.8–1.2 range to stay fine at any scale.
 */

type OrnamentProps = {
  className?: string
  /** Stroke colour; defaults to currentColor so it inherits text colour. */
  stroke?: string
  strokeWidth?: number
  'aria-hidden'?: boolean
}

const base = {
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
}

/* ------------------------------------------------------------------ *
 * Lotus — eight petals around a seeded heart. The house motif.
 * ------------------------------------------------------------------ */
export function Lotus({ className, stroke = 'currentColor', strokeWidth = 1.05 }: OrnamentProps) {
  return (
    <svg viewBox="0 0 96 72" className={className} aria-hidden="true" focusable="false">
      <g {...base} stroke={stroke} strokeWidth={strokeWidth}>
        {/* centre petal */}
        <path d="M48 66C34.5 54 34.5 26 48 8c13.5 18 13.5 46 0 58Z" />
        {/* inner flanking petals */}
        <path d="M48 66C37 62 25 50 22.5 34.5 33.5 38 43 50 48 66Z" />
        <path d="M48 66C59 62 71 50 73.5 34.5 62.5 38 53 50 48 66Z" />
        {/* outer flanking petals */}
        <path d="M48 66C34 65.5 17 58 8 45.5c13 0.5 29 8.5 40 20.5Z" />
        <path d="M48 66c14-0.5 31-8 40-20.5-13 0.5-29 8.5-40 20.5Z" />
        {/* seeded heart */}
        <path d="M48 56c-3.2-3.6-3.2-9.4 0-13 3.2 3.6 3.2 9.4 0 13Z" />
        <circle cx="48" cy="49.5" r="1.3" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Vine scroll — a running patra-lata, seamless left to right at 160px.
 * ------------------------------------------------------------------ */
export function VineScroll({ className, stroke = 'currentColor', strokeWidth = 1 }: OrnamentProps) {
  return (
    <svg viewBox="0 0 160 40" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <g {...base} stroke={stroke} strokeWidth={strokeWidth}>
        {/* the stem */}
        <path d="M0 20C14 20 18 6 32 6s18 14 32 14 18-14 32-14 18 14 32 14 18-14 32-14" />
        {/* curling tendrils */}
        <path d="M32 6c-5.5 0-8.5 4.5-6.5 8 1.8 3.2 6.8 2.4 7.4-1.2.5-3-2.4-4.6-4.4-3.4" />
        <path d="M96 6c-5.5 0-8.5 4.5-6.5 8 1.8 3.2 6.8 2.4 7.4-1.2.5-3-2.4-4.6-4.4-3.4" />
        {/* leaves on the downstroke */}
        <path d="M64 20c-4-3-4-9 0-12.5 4 3.5 4 9.5 0 12.5Z" />
        <path d="M128 20c-4-3-4-9 0-12.5 4 3.5 4 9.5 0 12.5Z" />
        <path d="M0 20c4 3 4 9 0 12.5M160 20c-4 3-4 9 0 12.5" />
        <path d="M32 33c-3.4-2.6-3.4-7.6 0-10.4 3.4 2.8 3.4 7.8 0 10.4Z" />
        <path d="M96 33c-3.4-2.6-3.4-7.6 0-10.4 3.4 2.8 3.4 7.8 0 10.4Z" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Kalasha — the pot-and-finial that crowns a temple door frame.
 * ------------------------------------------------------------------ */
export function Kalasha({ className, stroke = 'currentColor', strokeWidth = 1.05 }: OrnamentProps) {
  return (
    <svg viewBox="0 0 48 84" className={className} aria-hidden="true" focusable="false">
      <g {...base} stroke={stroke} strokeWidth={strokeWidth}>
        {/* finial */}
        <path d="M24 4v9" />
        <circle cx="24" cy="15.5" r="2.6" />
        {/* neck and collar */}
        <path d="M24 18.2v5.4" />
        <path d="M17 24.6h14M15.6 28.2h16.8" />
        {/* body of the pot */}
        <path d="M18 28.4c-6 4.6-9.6 11.6-9.6 19.2 0 10.4 7 18.2 15.6 18.2s15.6-7.8 15.6-18.2c0-7.6-3.6-14.6-9.6-19.2" />
        {/* banded belly */}
        <path d="M9.4 43.6c4.2 2.6 9.2 4 14.6 4s10.4-1.4 14.6-4" />
        <path d="M11.4 54.2c3.6 2.2 7.9 3.4 12.6 3.4s9-1.2 12.6-3.4" />
        {/* base */}
        <path d="M13.6 68.4h20.8M11 73h26M12.6 78h22.8" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Bead and reel — classical edge moulding, seamless at 120px.
 * ------------------------------------------------------------------ */
export function BeadAndReel({ className, stroke = 'currentColor', strokeWidth = 0.95 }: OrnamentProps) {
  return (
    <svg viewBox="0 0 120 16" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <g {...base} stroke={stroke} strokeWidth={strokeWidth}>
        <path d="M0 2.4h120M0 13.6h120" opacity="0.55" />
        {[0, 30, 60, 90].map((x) => (
          <g key={x} transform={`translate(${x} 0)`}>
            <circle cx="7" cy="8" r="3.1" />
            <path d="M12.4 4.6v6.8M14.6 4.6v6.8" />
            <circle cx="21" cy="8" r="1.5" />
            <path d="M25.4 4.6v6.8M27.6 4.6v6.8" />
          </g>
        ))}
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Corner bracket — the carved corner of an inset frame. Rotate to place.
 * ------------------------------------------------------------------ */
export function CornerBracket({ className, stroke = 'currentColor', strokeWidth = 1 }: OrnamentProps) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden="true" focusable="false">
      <g {...base} stroke={stroke} strokeWidth={strokeWidth}>
        <path d="M0 1h40M1 0v40" />
        <path d="M0 9h22M9 0v22" opacity="0.5" />
        {/* a small curling leaf tucked into the angle */}
        <path d="M9 9c0 8 5.6 14 13.4 14.8-0.8-7.8-6.8-13.4-13.4-14.8Z" />
        <path d="M24 9c6 0.8 10.4 5 11.2 11-5.6-0.6-9.8-4.6-11.2-11Z" opacity="0.8" />
        <path d="M9 24c0.8 6 5 10.4 11 11.2-0.6-5.6-4.6-9.8-11-11.2Z" opacity="0.8" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Temple arch — the silhouette used for image masks and the loader frame.
 * ------------------------------------------------------------------ */
export function TempleArch({ className, stroke = 'currentColor', strokeWidth = 1 }: OrnamentProps) {
  return (
    <svg viewBox="0 0 120 170" className={className} aria-hidden="true" focusable="false">
      <g {...base} stroke={stroke} strokeWidth={strokeWidth}>
        <path d="M6 170V62C6 31.1 30.1 6 60 6s54 25.1 54 56v108" />
        <path d="M16 170V63c0-25.4 19.7-46 44-46s44 20.6 44 46v107" opacity="0.5" />
        <path d="M60 17v-9M52 30h16" opacity="0.7" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Diamond bullet — a chip-carved lozenge, used for list markers.
 * ------------------------------------------------------------------ */
export function DiamondBullet({ className, stroke = 'currentColor', strokeWidth = 1 }: OrnamentProps) {
  return (
    <svg viewBox="0 0 14 14" className={className} aria-hidden="true" focusable="false">
      <g {...base} stroke={stroke} strokeWidth={strokeWidth}>
        <path d="M7 1l6 6-6 6-6-6 6-6Z" />
        <path d="M7 4.2l2.8 2.8L7 9.8 4.2 7 7 4.2Z" opacity="0.6" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Section divider — lotus centrepiece flanked by vine and hairlines.
 * ------------------------------------------------------------------ */
export function OrnamentDivider({
  className = '',
  tone = 'brass',
}: {
  className?: string
  tone?: 'brass' | 'honey'
}) {
  const stroke = tone === 'brass' ? '#c9a35f' : '#b9814a'
  return (
    <div className={`flex items-center justify-center gap-5 ${className}`} aria-hidden="true">
      <span
        className="h-px flex-1 max-w-[220px]"
        style={{ background: `linear-gradient(90deg, transparent, ${stroke}66)` }}
      />
      <VineScroll className="h-[26px] w-[110px] opacity-70" stroke={stroke} />
      <Lotus className="h-[30px] w-[40px]" stroke={stroke} />
      <VineScroll className="h-[26px] w-[110px] -scale-x-100 opacity-70" stroke={stroke} />
      <span
        className="h-px flex-1 max-w-[220px]"
        style={{ background: `linear-gradient(270deg, transparent, ${stroke}66)` }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Year seal — the 1986 roundel.
 * ------------------------------------------------------------------ */
export function YearSeal({
  year = '1986',
  place = 'Nandalike',
  className = '',
}: {
  year?: string
  place?: string
  className?: string
}) {
  return (
    <div
      className={`grid aspect-square w-[132px] place-items-center rounded-full bg-ebony text-center shadow-seal ${className}`}
    >
      <div className="relative grid place-items-center">
        <svg
          viewBox="0 0 120 120"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="60" cy="60" r="55" fill="none" stroke="#c9a35f" strokeWidth="0.8" opacity="0.55" />
          <circle cx="60" cy="60" r="50" fill="none" stroke="#c9a35f" strokeWidth="0.5" opacity="0.3" />
        </svg>
        <span className="block font-sans text-[0.75rem] font-semibold uppercase tracking-[0.3em] text-brass">
          Est.
        </span>
        <b className="block font-serif text-[2.3rem] font-normal leading-none text-sandalwood">{year}</b>
        <span className="mt-1 block font-sans text-[0.75rem] font-semibold uppercase tracking-[0.26em] text-brass">
          {place}
        </span>
      </div>
    </div>
  )
}
