import Link from 'next/link'
import { site } from '@/content/site'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { whatsappLink } from '@/lib/whatsapp'

export function Commission() {
  return (
    <Section id="contact" index="VII">
      <div className="grid gap-[clamp(2.5rem,5vw,4rem)] md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:gap-x-[clamp(2.5rem,5.5vw,4.5rem)]">
        <Reveal>
          <span className="label">Commission a piece</span>
          <h2 className="mb-[1.35rem] mt-4 max-w-[18ch] text-d2">
            Tell us the room. We will tell you what it can hold.
          </h2>
          <p className="max-w-prose text-lead text-ink-2">
            Send the opening, the drawing or a photograph of the space. We will come back with
            what is possible, in which timber, and what it costs.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-[0.85rem]">
            <Link href="/contact" className="btn btn-fill w-full sm:w-auto">
              Start an enquiry
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-full sm:w-auto"
            >
              Message on WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <dl className="mt-1 grid gap-[1.75rem]">
            <div>
              <dt className="label mb-[0.3rem]">The workshop</dt>
              <dd className="text-[1.2rem] leading-[1.5]">
                {site.address.street}, {site.address.taluk}
                <br />
                {site.address.district}, {site.address.state} {site.address.postalCode}
              </dd>
            </div>
            <div>
              <dt className="label mb-[0.3rem]">Call</dt>
              <dd className="flex flex-col gap-1 text-[1.2rem] leading-[1.5]">
                {site.phones.slice(0, 2).map((phone) => (
                  <a
                    key={phone.tel}
                    href={`tel:${phone.tel}`}
                    className="w-fit border-b border-ink/14 transition-colors duration-500 ease-carve hover:border-ink"
                  >
                    {phone.number}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt className="label mb-[0.3rem]">Write</dt>
              <dd className="text-[1.2rem] leading-[1.5]">
                <a
                  href={`mailto:${site.emails[0]}`}
                  className="border-b border-ink/14 transition-colors duration-500 ease-carve hover:border-ink"
                >
                  {site.emails[0]}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
