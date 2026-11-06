import Link from 'next/link'
import { Padma } from '@/components/ornament/Ornaments'
import { BeadRule } from '@/components/ui/Section'

export default function NotFound() {
  return (
    <section className="flex min-h-[72svh] items-center py-section">
      <div className="wrap text-center">
        <Padma className="mx-auto h-16 w-16 text-bronze" />

        <p className="label mt-10">Error 404</p>
        <h1 className="mx-auto mt-5 max-w-[18ch] text-d1">
          This door opens onto <em className="italic text-bronze">nothing.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-narrow text-lead text-ink-2">
          The page you were looking for has been moved or never existed. Everything we have made
          is still here, one floor down.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-fill">
            Back to the beginning
          </Link>
          <Link href="/projects" className="btn">
            Look through the projects
          </Link>
        </div>

        <BeadRule className="mx-auto mt-14 max-w-sm" />
      </div>
    </section>
  )
}
