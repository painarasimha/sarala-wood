import type { ReactNode } from 'react'

/**
 * Section scaffolding: a numbered margin down the left, like the stile of a
 * door, with the content set beside it. The numeral is decorative — screen
 * readers get the heading, not a roman numeral with no meaning.
 */
export function Section({
  id,
  index,
  children,
  className = '',
  tight = false,
}: {
  id?: string
  /** Roman numeral shown in the margin on wide screens. */
  index?: string
  children: ReactNode
  className?: string
  /** Drop the top padding where two sections run together. */
  tight?: boolean
}) {
  return (
    <section id={id} className={`${tight ? 'pb-section' : 'py-section'} ${className}`}>
      <div className="wrap grid gap-6 lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-x-[clamp(2rem,4vw,3.5rem)]">
        <div className="hidden lg:block" aria-hidden="true">
          <div className="sticky top-[120px]">
            {index && <span className="numeral block">{index}</span>}
            <span className="mt-[0.85rem] block h-[60px] w-px bg-gradient-to-b from-bronze to-transparent opacity-60" />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}

/** A heading block: eyebrow, display line, and an optional standfirst beside it. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  className?: string
}) {
  return (
    <div className={`mb-[clamp(2.5rem,4.5vw,3.5rem)] ${className}`}>
      <div className="grid gap-[1.05rem] md:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] md:items-end md:gap-x-[3.25rem]">
        <div>
          {eyebrow && <span className="label mb-4 block">{eyebrow}</span>}
          <h2 className="text-d2">{title}</h2>
        </div>
        {lead && <p className="text-lead text-ink-2">{lead}</p>}
      </div>
    </div>
  )
}

/** The bead-and-reel rule, used where a section needs a carved edge. */
export function BeadRule({ className = '' }: { className?: string }) {
  return <div className={`bead-rule ${className}`} aria-hidden="true" />
}

/** A strip of pierced jaali, used as an inlay. */
export function JaaliBand({ className = '', height = 44 }: { className?: string; height?: number }) {
  return <div className={`jaali-band ${className}`} style={{ height }} aria-hidden="true" />
}
