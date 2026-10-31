import type { ReactNode } from 'react'

/**
 * A line-by-line headline entrance for content that is on the first screen.
 *
 * Unlike `RevealLines`, this runs entirely in CSS: the markup is complete and
 * correct in the server-rendered HTML, the animation starts at first paint, and
 * nothing waits for JavaScript to hydrate. That matters twice over — a
 * JS-gated headline is invisible to a visitor without scripts, and on a
 * throttled phone it pushes Largest Contentful Paint several seconds late.
 *
 * Below the fold, use `RevealLines`, which is tied to the scroll position.
 */
export function EnterLines({
  lines,
  className = '',
  delay = 0,
  stagger = 0.08,
  tag: Tag = 'h2',
}: {
  lines: ReactNode[]
  className?: string
  /** Seconds before the first line starts. */
  delay?: number
  /** Seconds between lines. */
  stagger?: number
  tag?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <span className="enter-line" style={{ animationDelay: `${delay + i * stagger}s` }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}

/** The same idea for a single block: fade and lift, in CSS, at first paint. */
export function EnterUp({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <div className={`enter-up ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  )
}
