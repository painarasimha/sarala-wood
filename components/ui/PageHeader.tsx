import type { ReactNode } from 'react'
import { EnterLines, EnterUp } from '@/components/ui/EnterLines'
import { BeadRule } from '@/components/ui/Section'

/**
 * The opening of every inner page. Always the first screen, so the entrance
 * is CSS-only — the heading is in the server HTML and paints without waiting
 * for hydration.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  index,
  children,
}: {
  eyebrow: string
  /** Each entry is rendered as its own rising line. */
  title: ReactNode[]
  lead?: string
  index?: string
  children?: ReactNode
}) {
  return (
    <header className="pb-[clamp(2.5rem,5vw,4rem)] pt-[clamp(3rem,6vw,5rem)]">
      <div className="wrap">
        <EnterUp>
          <p className="label flex items-center gap-3">
            {index && <span className="numeral">{index}</span>}
            {eyebrow}
          </p>
        </EnterUp>

        <EnterLines
          tag="h1"
          delay={0.07}
          className="mt-5 max-w-[16ch] font-serif text-d1"
          lines={title}
        />

        {lead && (
          <EnterUp delay={0.2}>
            <p className="mt-7 max-w-prose text-lead text-ink-2">{lead}</p>
          </EnterUp>
        )}

        {children && <EnterUp delay={0.26}>{children}</EnterUp>}
      </div>
      <div className="wrap mt-[clamp(2.5rem,5vw,4rem)]">
        <BeadRule />
      </div>
    </header>
  )
}
