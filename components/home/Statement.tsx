import { Reveal } from '@/components/ui/Reveal'
import { Kalasha } from '@/components/ornament/Ornaments'

export function Statement() {
  return (
    <section className="surface-sandal py-section-lg">
      <div className="wrap">
        <Reveal className="mx-auto max-w-[46rem] text-center">
          <Kalasha className="mx-auto h-20 w-12 opacity-80" stroke="#b9814a" />
          <blockquote className="mt-10">
            <p className="mx-auto max-w-[20ch] font-serif text-d2 leading-[1.14] text-rosewood">
              When you choose Sarala, you choose the guarantee of{' '}
              <em className="accent">quality &amp; splendour.</em>
            </p>
          </blockquote>
          <p className="mt-8 font-sans text-eyebrow font-semibold uppercase text-muted">
            Sarala Wood Industries · Nandalike · Est. 1986
          </p>
        </Reveal>
      </div>
    </section>
  )
}
