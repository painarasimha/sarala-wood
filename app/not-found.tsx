import Link from 'next/link'
import { Kalasha, OrnamentDivider } from '@/components/ornament/Ornaments'

export default function NotFound() {
  return (
    <section className="surface-wood flex min-h-[100svh] items-center py-32">
      <div className="wrap text-center">
        <Kalasha className="mx-auto h-24 w-14 opacity-75" stroke="#c9a35f" />

        <p className="eyebrow mt-10">Error 404</p>
        <h1 className="mx-auto mt-5 max-w-[18ch] font-serif text-d1 text-sandalwood">
          This door opens onto <em className="accent">nothing.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-narrow font-light text-sandalwood/70">
          The page you were looking for has been moved or never existed. Everything we have made is
          still here, one floor down.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-solid">
            Back to the beginning
          </Link>
          <Link href="/projects" className="btn">
            Look through the projects
          </Link>
        </div>

        <OrnamentDivider className="mt-16 opacity-60" />
      </div>
    </section>
  )
}
