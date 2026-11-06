import { site } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import { Padma } from '@/components/ornament/Ornaments'

/** The one dark moment on the page, with the jaali screen behind it. */
export function Statement() {
  return (
    <section className="surface-dark py-section">
      <div className="wrap text-center">
        <Padma className="mx-auto mb-[2.1rem] h-[58px] w-[58px] text-[#C9A66B]" strokeWidth={0.9} />
        <Reveal>
          <blockquote className="mx-auto max-w-[23ch] text-[clamp(1.85rem,3.4vw,2.9rem)] leading-[1.2]">
            When you choose Sarala, you choose the guarantee of{' '}
            <em className="italic text-[#C9A66B]">quality &amp; splendour.</em>
          </blockquote>
        </Reveal>
        <Reveal delay={0.06}>
          <span className="label mt-8 block">
            {site.address.street} · {site.address.taluk} · {site.address.district}
          </span>
        </Reveal>
      </div>
    </section>
  )
}
