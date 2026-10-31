import type { Metadata } from 'next'
import { Suspense } from 'react'
import { site } from '@/content/site'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { EnquiryForm } from '@/components/contact/EnquiryForm'
import { OrnamentDivider } from '@/components/ornament/Ornaments'
import { whatsappLink } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Contact & commission — the workshop at Nandalike, Karkala',
  description: `Commission carved woodwork from Sarala Wood Industries. The workshop is at ${site.address.oneLine}. Call ${site.phones[0].number} or send an enquiry.`,
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact — Sarala Wood Industries', url: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Commission a piece"
        title={[<>Tell us the room.</>, <>We will tell you</>, <><em key="e" className="accent">what it can hold.</em></>]}
        lead="Four short questions and we will have enough to come back to you. If you would rather talk, the workshop answers the phone."
      />

      <section className="surface-wood py-section lg:py-section-lg">
        <div className="wrap grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-[6vw]">
          {/* ---------- Details ---------- */}
          <Reveal>
            <dl className="grid gap-8">
              <div>
                <dt className="font-sans text-eyebrow font-semibold uppercase text-brass">
                  The workshop
                </dt>
                <dd className="mt-3">
                  <address className="not-italic font-serif text-[1.42rem] leading-snug text-sandalwood">
                    {site.address.street}
                    <br />
                    {site.address.taluk}
                    <br />
                    {site.address.district}, {site.address.state} {site.address.postalCode}
                  </address>
                  <a
                    href={site.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw mt-3 inline-block font-sans text-eyebrow font-semibold uppercase text-brass"
                  >
                    Open in Maps
                  </a>
                </dd>
              </div>

              <div>
                <dt className="font-sans text-eyebrow font-semibold uppercase text-brass">Call</dt>
                <dd className="mt-3 flex flex-col gap-1.5">
                  {site.phones.map((phone) => (
                    <a
                      key={phone.tel}
                      href={`tel:${phone.tel}`}
                      className="link-draw w-fit font-serif text-[1.32rem] text-sandalwood"
                    >
                      {phone.number}
                      <span className="ml-2 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-brass/80">
                        {phone.label}
                      </span>
                    </a>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="font-sans text-eyebrow font-semibold uppercase text-brass">Write</dt>
                <dd className="mt-3 flex flex-col gap-1.5">
                  {site.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="link-draw w-fit font-serif text-[1.22rem] text-sandalwood"
                    >
                      {email}
                    </a>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="font-sans text-eyebrow font-semibold uppercase text-brass">
                  Visiting hours
                </dt>
                <dd className="mt-3 max-w-prose text-small italic text-sandalwood/65">
                  {site.hours}
                </dd>
              </div>

            </dl>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-8 inline-flex"
            >
              Message on WhatsApp
            </a>
          </Reveal>

          {/* ---------- Form ---------- */}
          <Reveal delay={0.08}>
            <Suspense
              fallback={
                <div className="border border-brass/25 p-10 text-small text-sandalwood/60">
                  Loading the enquiry form…
                </div>
              }
            >
              <EnquiryForm />
            </Suspense>
          </Reveal>
        </div>
      </section>

      {/* ---------- Map ---------- */}
      <section className="surface-paper py-section">
        <div className="wrap">
          <Reveal className="mb-10 text-center">
            <OrnamentDivider className="mb-9" tone="honey" />
            <h2 className="font-serif text-d3">Nandalike, Karkala Taluk.</h2>
            <p className="mx-auto mt-4 max-w-prose text-muted">
              An hour inland from Udupi, in the hills behind the coast. Visitors are welcome — call
              ahead and we will have the workshop open.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="brass-frame relative aspect-[16/10] w-full overflow-hidden border border-teak/20 sm:aspect-[21/9]">
              <iframe
                src={site.mapsEmbedSrc}
                title={`Map showing ${site.name} at ${site.address.oneLine}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full w-full grayscale-[0.35] sepia-[0.25]"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
