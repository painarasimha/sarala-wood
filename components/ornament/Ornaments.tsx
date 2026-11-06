/**
 * The motif library.
 *
 * These are not invented ornaments: each one is traced from carving that is
 * visible in the workshop's own photographs — the lotus roundels and the
 * kalasha panel on the main doors, the running vine and bead mouldings that
 * edge every frame, the pierced rosette screens on the mantapa backs, and the
 * diamond crosshatch cut into the turned pilasters.
 *
 * Every motif is stroke-only, so it reads as a line incised into a surface
 * rather than as a filled icon.
 */

type MotifProps = {
  className?: string
  /** Defaults to currentColor so a motif inherits the colour around it. */
  stroke?: string
  strokeWidth?: number
}

const base = {
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/* ------------------------------------------------------------------ *
 * Padma — the lotus roundel. Eight petals around a seeded centre.
 * ------------------------------------------------------------------ */
export function Padma({ className, stroke = 'currentColor', strokeWidth = 1 }: MotifProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" focusable="false">
      <g {...base} stroke={stroke} strokeWidth={strokeWidth}>
        <circle cx="40" cy="40" r="31" />
        <circle cx="40" cy="15" r="7" />
        <circle cx="57.7" cy="22.3" r="7" />
        <circle cx="65" cy="40" r="7" />
        <circle cx="57.7" cy="57.7" r="7" />
        <circle cx="40" cy="65" r="7" />
        <circle cx="22.3" cy="57.7" r="7" />
        <circle cx="15" cy="40" r="7" />
        <circle cx="22.3" cy="22.3" r="7" />
        <circle cx="40" cy="40" r="11" />
        <circle cx="40" cy="40" r="4.5" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Kalasha — the pot and finial. The centre panel of the main door.
 * ------------------------------------------------------------------ */
export function Kalasha({ className, stroke = 'currentColor', strokeWidth = 1 }: MotifProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" focusable="false">
      <g {...base} stroke={stroke} strokeWidth={strokeWidth}>
        <path d="M40 8v8" />
        <circle cx="40" cy="19.5" r="3.4" />
        <path d="M40 23v5M30 28.5h20M28 33h24" />
        <path d="M31 33c-7 5-11 13-11 22 0 11 9 19 20 19s20-8 20-19c0-9-4-17-11-22" />
        <path d="M21 46c5.5 3 12 4.6 19 4.6S53.5 49 59 46M23 59c5 2.8 10.7 4.3 17 4.3S52 61.8 57 59" />
        <path d="M26 74h28" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Patra-lata — the running vine that edges a door frame.
 * ------------------------------------------------------------------ */
export function PatraLata({ className, stroke = 'currentColor', strokeWidth = 1 }: MotifProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" focusable="false">
      <g {...base} stroke={stroke} strokeWidth={strokeWidth}>
        <path d="M4 34C14 34 17 16 27 16s13 18 26 18 13-18 23-18" />
        <path d="M27 16c-6 0-9 5-7 9 2 3.6 7.6 2.7 8.3-1.4.6-3.4-2.7-5.2-5-3.8" />
        <path d="M40 34c-5-3.6-5-11 0-15.4 5 4.4 5 11.8 0 15.4Z" />
        <path d="M4 46c10 0 13 18 23 18s13-18 26-18 13 18 23 18" />
        <path d="M53 64c-4.4-3.2-4.4-9.6 0-13.4 4.4 3.8 4.4 10.2 0 13.4Z" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Jaali — the pierced screen.
 * ------------------------------------------------------------------ */
export function Jaali({ className, stroke = 'currentColor', strokeWidth = 1 }: MotifProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" focusable="false">
      <g {...base} stroke={stroke} strokeWidth={strokeWidth}>
        <circle cx="40" cy="22" r="7.6" />
        <circle cx="52.7" cy="27.3" r="7.6" />
        <circle cx="58" cy="40" r="7.6" />
        <circle cx="52.7" cy="52.7" r="7.6" />
        <circle cx="40" cy="58" r="7.6" />
        <circle cx="27.3" cy="52.7" r="7.6" />
        <circle cx="22" cy="40" r="7.6" />
        <circle cx="27.3" cy="27.3" r="7.6" />
        <circle cx="40" cy="40" r="5.4" />
        <circle cx="7" cy="7" r="2.6" />
        <circle cx="73" cy="7" r="2.6" />
        <circle cx="7" cy="73" r="2.6" />
        <circle cx="73" cy="73" r="2.6" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Bead moulding — the run of beads that edges every panel.
 * ------------------------------------------------------------------ */
export function BeadMoulding({ className, stroke = 'currentColor', strokeWidth = 1 }: MotifProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" focusable="false">
      <g {...base} stroke={stroke} strokeWidth={strokeWidth}>
        <path d="M4 26h72M4 54h72" opacity="0.45" />
        <circle cx="14" cy="40" r="7" />
        <circle cx="31" cy="40" r="3" />
        <path d="M38.5 32v16M42.5 32v16" strokeWidth={0.9} />
        <circle cx="51" cy="40" r="7" />
        <circle cx="68" cy="40" r="3" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Diamond diaper — the crosshatch cut into the pilasters.
 * ------------------------------------------------------------------ */
export function DiamondDiaper({ className, stroke = 'currentColor', strokeWidth = 1 }: MotifProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" focusable="false">
      <g {...base} stroke={stroke} strokeWidth={strokeWidth}>
        <path d="M40 8 56 24 40 40 24 24Z" />
        <path d="M40 40 56 56 40 72 24 56Z" />
        <path d="M8 24 24 40 8 56Z" />
        <path d="M72 24 56 40 72 56Z" />
      </g>
      <g fill={stroke} stroke="none">
        <circle cx="40" cy="24" r="1.8" />
        <circle cx="40" cy="56" r="1.8" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * The house mark: a lotus roundel inside a pierced square, after the
 * jaali panels on their own mantapas.
 * ------------------------------------------------------------------ */
export function HouseMark({ className, stroke = '#855D34', strokeWidth = 1.1 }: MotifProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <g {...base} stroke={stroke} strokeWidth={strokeWidth}>
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
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * The founder's seal — a lotus within two rings.
 * ------------------------------------------------------------------ */
export function Seal({ className, stroke = 'currentColor', strokeWidth = 1 }: MotifProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <g {...base} stroke={stroke} strokeWidth={strokeWidth}>
        <circle cx="20" cy="20" r="18.5" />
        <circle cx="20" cy="20" r="15" />
        <path d="M20 7.5c-4 5.5-4 13.5 0 18.5 4-5 4-13 0-18.5Z" />
        <path d="M20 26c-3.3-.9-7-3.9-8-8.4 3.3.9 6.3 3.9 8 8.4ZM20 26c3.3-.9 7-3.9 8-8.4-3.3.9-6.3 3.9-8 8.4Z" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * A chip-carved lozenge, used as a list marker.
 * ------------------------------------------------------------------ */
export function Lozenge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`block h-[13px] w-[13px] rotate-45 border border-bronze ${className}`}
      aria-hidden="true"
    />
  )
}
