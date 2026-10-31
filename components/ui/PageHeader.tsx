import type { ReactNode } from 'react'
import { EnterLines, EnterUp } from '@/components/ui/EnterLines'
import { BeadAndReel } from '@/components/ornament/Ornaments'

/**
 * The opening of every inner page: a dark wood band carrying an eyebrow, a
 * display heading and an optional standfirst. Keeps the whole site arriving
 * the same way.
 *
 * This is always the first screen, so the entrance is CSS-only — the heading is
 * in the server HTML and paints without waiting for hydration.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
  index,
}: {
  eyebrow: string
  /** Each entry is rendered as its own rising line. */
  title: ReactNode[]
  lead?: string
  children?: ReactNode
  /** Optional roman index shown beside the eyebrow. */
  index?: string
}) {
  return (
    <header className="surface-wood relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-48">
      <BeadAndReel className="absolute inset-x-0 bottom-0 h-4 w-full opacity-25" stroke="#c9a35f" />

      <div className="wrap">
        <EnterUp>
          <p className="eyebrow flex items-center gap-3">
            {index && <span className="numeral not-italic text-brass/80">{index}</span>}
            {eyebrow}
          </p>
        </EnterUp>

        <EnterLines
          tag="h1"
          delay={0.07}
          className="mt-5 max-w-[16ch] font-serif text-d1 text-sandalwood"
          lines={title}
        />

        {lead && (
          <EnterUp delay={0.2}>
            <p className="mt-7 max-w-prose font-light text-lead text-sandalwood/75">{lead}</p>
          </EnterUp>
        )}

        {children && <EnterUp delay={0.26}>{children}</EnterUp>}
      </div>
    </header>
  )
}
