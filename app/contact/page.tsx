import type { Metadata } from 'next'
import { Suspense } from 'react'
import { site } from '@/content/site'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { EnquiryForm } from '@/components/contact/EnquiryForm'
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
        title={[<>Tell us the room.</>, <>We will tell you</>, <><em key="e" className="italic text-bronze">what it can hold.</em></>]}
        lead="Four short questions and we will have enough to come back to you. If you would rather talk, the workshop answers the phone."
      />

      <Section index="I">
        <div className="grid gap-[clamp(2.5rem,5vw,4rem)] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-x-[clamp(2.5rem,5.5vw,4.5rem)]">
          <Reveal>
            <dl className="grid gap-8">
              <div>
                <dt className="label">The workshop</dt>
                <dd className="mt-3">
                  <address className="not-italic font-serif text-[1.35rem] leading-snug">
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
                    className="lnk mt-4"
                  >
                    Open in Maps
                  </a>
                </dd>
              </div>

              <div>
                <dt className="label">Call</dt>
                <dd className="mt-3 flex flex-col gap-1.5">
                  {site.phones.map((phone) => (
                    <a
                      key={phone.tel}
                      href={`tel:${phone.tel}`}
                      className="w-fit border-b border-ink/14 font-serif text-[1.28rem] transition-colors duration-500 ease-carve hover:border-ink"
                    >
                      {phone.number}
                      <span className="ml-2 font-caps text-[0.68rem] uppercase tracking-[0.18em] text-ink-3">
                        {phone.label}
                      </span>
                    </a>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="label">Write</dt>
                <dd className="mt-3 flex flex-col gap-1.5">
                  {site.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="w-fit border-b border-ink/14 font-serif text-[1.18rem] transition-colors duration-500 ease-carve hover:border-ink"
                    >
                      {email}
                    </a>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="label">Visiting hours</dt>
                <dd className="mt-3 max-w-prose text-cap italic text-ink-3">{site.hours}</dd>
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

          <Reveal delay={0.06}>
            <Suspense
              fallback={<div className="border border-ink/14 p-10 text-small text-ink-3">Loading the enquiry form…</div>}
            >
              <EnquiryForm />
            </Suspense>
          </Reveal>
        </div>
      </Section>

      <div className="bg-paper-2">
        <Section index="II">
          <Reveal>
            <div className="mb-10 text-center">
              <h2 className="text-d2">Nandalike, Karkala Taluk.</h2>
              <p className="mx-auto mt-4 max-w-prose text-ink-2">
                An hour inland from Udupi, in the hills behind the coast. Visitors are welcome —
                call ahead and we will have the workshop open.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="plate">
              <span className="plate-corner plate-corner-tr" aria-hidden="true" />
              <span className="plate-corner plate-corner-bl" aria-hidden="true" />
              <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[21/9]">
                <iframe
                  src={site.mapsEmbedSrc}
                  title={`Map showing ${site.name} at ${site.address.oneLine}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-full w-full grayscale-[0.3] sepia-[0.15]"
                />
              </div>
            </div>
          </Reveal>
        </Section>
      </div>
    </>
  )
}
