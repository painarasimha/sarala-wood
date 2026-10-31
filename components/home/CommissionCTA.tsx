import Link from 'next/link'
import { site } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import { MagneticLink } from '@/components/ui/MagneticLink'
import { VineScroll } from '@/components/ornament/Ornaments'
import { whatsappLink } from '@/lib/whatsapp'

export function CommissionCTA() {
  return (
    <section className="surface-wood relative overflow-hidden py-section lg:py-section-lg">
      <VineScroll
        className="pointer-events-none absolute inset-x-0 top-10 h-16 w-full opacity-[0.07]"
        stroke="#c9a35f"
      />

      <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[7vw]">
        <Reveal>
          <span className="eyebrow">Commission a piece</span>
          <h2 className="mt-4 max-w-[15ch] font-serif text-d2">
            Tell us the room. We will tell you <em className="accent">what it can hold.</em>
          </h2>
          <p className="mt-6 max-w-narrow font-light text-sandalwood/70">
            Every door, wardrobe, kitchen and table we make is made to order. Send us the opening,
            the space or the drawing, and we will come back with what is possible.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <MagneticLink href="/contact" className="btn btn-solid">
              Start an enquiry
            </MagneticLink>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn">
              Message on WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="grid gap-7 border-t border-brass/20 pt-9">
            <div>
              <dt className="font-sans text-eyebrow font-semibold uppercase text-brass">The workshop</dt>
              <dd className="mt-2 font-serif text-[1.4rem] leading-snug text-sandalwood">
                {site.address.street}, {site.address.taluk}
                <br />
                {site.address.district}, {site.address.state} {site.address.postalCode}
              </dd>
            </div>
            <div>
              <dt className="font-sans text-eyebrow font-semibold uppercase text-brass">Call</dt>
              <dd className="mt-2 flex flex-col gap-1">
                {site.phones.slice(0, 2).map((phone) => (
                  <a
                    key={phone.tel}
                    href={`tel:${phone.tel}`}
                    className="link-draw w-fit font-serif text-[1.4rem] text-sandalwood"
                  >
                    {phone.number}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-sans text-eyebrow font-semibold uppercase text-brass">Write</dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${site.emails[0]}`}
                  className="link-draw font-serif text-[1.4rem] text-sandalwood"
                >
                  {site.emails[0]}
                </a>
              </dd>
            </div>
          </dl>

          <Link
            href="/projects"
            className="link-draw mt-9 inline-block font-sans text-eyebrow font-semibold uppercase text-brass"
          >
            Or look through the projects first
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
