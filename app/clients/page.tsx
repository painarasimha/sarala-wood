import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { clientLogos, clients, clientsIntro, clientStories } from '@/content/clients'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { OrnamentDivider } from '@/components/ornament/Ornaments'

export const metadata: Metadata = {
  title: 'Clients — builders, architects & temples across Karnataka',
  description:
    'Sarala Wood Industries has worked with builders, architects, hotels, institutions and places of worship from Mangalore and Udupi to Manipal, Moodabidre, Ujire and Kundapura.',
  alternates: { canonical: '/clients' },
  openGraph: { title: 'Clients — Sarala Wood Industries', url: '/clients' },
}

/** Group the list by city, largest first, so the page reads as a map of the coast. */
const byCity = Object.entries(
  clients.reduce<Record<string, typeof clients>>((acc, client) => {
    ;(acc[client.city] ||= []).push(client)
    return acc
  }, {})
).sort((a, b) => b[1].length - a[1].length)

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Clients"
        title={[<>From a small place</>, <>called <em key="e" className="accent">Nandalike.</em></>]}
        lead={clientsIntro.body[0]}
      />

      {/* ---------- Logo wall ---------- */}
      <section className="surface-paper py-section">
        <div className="wrap">
          <Reveal>
            <ul className="grid border-y border-teak/20 sm:grid-cols-2 lg:grid-cols-4">
              {clientLogos.map((logo) => (
                <li
                  key={logo.name}
                  className="grid min-h-[170px] place-items-center border-t border-teak/15 p-10 first:border-t-0 sm:border-l sm:border-t-0 sm:first:border-l-0 sm:[&:nth-child(3)]:border-l-0 lg:[&:nth-child(3)]:border-l"
                >
                  <Image
                    src={logo.src}
                    alt={`${logo.name}, ${logo.city}`}
                    width={220}
                    height={90}
                    sizes="(max-width: 640px) 60vw, 20vw"
                    quality={82}
                    className="h-auto max-h-[74px] w-auto object-contain opacity-80 transition duration-900 ease-carve [filter:grayscale(1)_sepia(0.35)_contrast(1.08)] hover:opacity-100 hover:[filter:none]"
                  />
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-6 max-w-prose text-small italic text-muted">
              {'{{TODO: logo files for the remaining 35 clients. Four marks are on file; the rest are set in type below, which is a perfectly good look, but real marks would be better.}}'}
            </p>
            <p className="mt-6 max-w-prose text-muted">{clientsIntro.body[1]}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- The list, by place ---------- */}
      <section className="surface-wood py-section lg:py-section-lg">
        <div className="wrap">
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[16ch] font-serif text-d2">
              {clients.length} names, across <em className="accent">the coast.</em>
            </h2>
            <p className="max-w-[34ch] font-light text-sandalwood/70">
              Builders, architects, hotels, an education foundation and places of worship — listed
              the way they come to us.
            </p>
          </Reveal>

          <div className="columns-1 gap-x-[5vw] lg:columns-2 [&>div]:mb-12 [&>div]:break-inside-avoid">
            {byCity.map(([city, group], i) => (
              <Reveal key={city} delay={Math.min(i, 6) * 0.04}>
                <section className="border-t border-brass/25 pt-6">
                  <h3 className="flex items-baseline justify-between gap-4 font-sans text-eyebrow font-semibold uppercase text-brass">
                    {city}
                    <span className="numeral not-italic text-[0.9rem] text-brass/80">
                      {String(group.length).padStart(2, '0')}
                    </span>
                  </h3>
                  <ul className="mt-4 grid gap-2.5">
                    {group.map((client) => (
                      <li
                        key={client.name}
                        className="flex items-baseline justify-between gap-5 border-b border-brass/10 pb-2.5"
                      >
                        <span className="font-serif text-[1.22rem] text-sandalwood">{client.name}</span>
                        <span className="shrink-0 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-brass/80">
                          {client.kind}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Project stories ---------- */}
      <section className="surface-sandal py-section">
        <div className="wrap">
          <OrnamentDivider className="mb-12" tone="honey" />
          <Reveal className="mx-auto max-w-[42rem] text-center">
            <span className="eyebrow">Project stories</span>
            {clientStories.length === 0 ? (
              <>
                <h2 className="mt-4 font-serif text-d3">
                  The best page on this site is the one not written yet.
                </h2>
                <p className="mx-auto mt-5 max-w-prose text-small italic text-muted">
                  {'{{TODO: two or three real project stories — the client, the building, what was made and how long it took. A named temple door or a hotel lobby, in the client’s own words if they will give them, would do more for this page than anything else on it.}}'}
                </p>
              </>
            ) : (
              <ul className="mt-10 grid gap-10 text-left">
                {clientStories.map((item) => (
                  <li key={item.client}>
                    <h3 className="font-serif text-d4">{item.client}</h3>
                    <p className="mt-1 font-sans text-eyebrow font-semibold uppercase text-muted">
                      {item.place}
                    </p>
                    <p className="mt-4 text-muted">{item.body}</p>
                  </li>
                ))}
              </ul>
            )}

            <Link href="/contact" className="btn btn-ink mt-10 inline-flex">
              Work with us
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
