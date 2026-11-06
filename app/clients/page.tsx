import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { clientLogos, clients, clientsIntro, clientStories } from '@/content/clients'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Padma } from '@/components/ornament/Ornaments'

export const metadata: Metadata = {
  title: 'Clients — builders, architects & temples across Karnataka',
  description:
    'Sarala Wood Industries has worked with builders, architects, hotels, institutions and places of worship from Mangalore and Udupi to Manipal, Moodabidre, Ujire and Kundapura.',
  alternates: { canonical: '/clients' },
  openGraph: { title: 'Clients — Sarala Wood Industries', url: '/clients' },
}

/** Grouped by city, largest group first, so the page reads as a map of the coast. */
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
        title={[<>From a small place</>, <>called <em key="e" className="italic text-bronze">Nandalike.</em></>]}
        lead={clientsIntro.body[0]}
      />

      <Section index="I">
        <Reveal>
          <ul className="grid grid-cols-2 gap-px border border-ink/8 bg-ink/8 sm:grid-cols-4">
            {clientLogos.map((logo) => (
              <li key={logo.name} className="grid min-h-[150px] place-items-center bg-mat px-8 py-10">
                <Image
                  src={logo.src}
                  alt={`${logo.name}, ${logo.city}`}
                  width={220}
                  height={90}
                  sizes="(max-width: 640px) 45vw, 20vw"
                  quality={82}
                  className="h-auto max-h-[52px] w-auto object-contain opacity-60 grayscale transition duration-500 ease-carve hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-6 max-w-prose text-cap italic text-ink-3">
            {'{{TODO: logo files for the remaining 35 clients. Four marks are on file; the rest are set in type below, which is a perfectly good look, but real marks would be better.}}'}
          </p>
          <p className="mt-6 max-w-prose text-ink-2">{clientsIntro.body[1]}</p>
        </Reveal>
      </Section>

      <div className="surface-dark">
        <Section index="II">
          <Reveal>
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <h2 className="max-w-[16ch] text-d2">
                {clients.length} names, across <em className="italic text-bronze-2">the coast.</em>
              </h2>
              <p className="max-w-[34ch] text-dark-ink/70">
                Builders, architects, hotels, an education foundation and places of worship —
                listed the way they come to us.
              </p>
            </div>
          </Reveal>

          <div className="columns-1 gap-x-[clamp(2rem,5vw,4.5rem)] lg:columns-2 [&>section]:mb-12 [&>section]:break-inside-avoid">
            {byCity.map(([city, group], i) => (
              <section key={city} className="border-t border-dark-ink/25 pt-6">
                <Reveal delay={Math.min(i, 6) * 0.04}>
                  <h3 className="label flex items-baseline justify-between gap-4 text-bronze-2">
                    {city}
                    <span className="font-caps text-[0.9rem] tracking-normal text-bronze-2/90">
                      {String(group.length).padStart(2, '0')}
                    </span>
                  </h3>
                  <ul className="mt-4 grid gap-2.5">
                    {group.map((client) => (
                      <li
                        key={client.name}
                        className="flex items-baseline justify-between gap-5 border-b border-dark-ink/10 pb-2.5"
                      >
                        <span className="font-serif text-[1.18rem] text-dark-ink">{client.name}</span>
                        <span className="shrink-0 font-caps text-[0.68rem] uppercase tracking-[0.18em] text-bronze-2">
                          {client.kind}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </section>
            ))}
          </div>
        </Section>
      </div>

      <div className="bg-paper-2">
        <Section index="III">
          <Reveal>
            <div className="mx-auto max-w-[42rem] text-center">
              <Padma className="mx-auto mb-10 h-12 w-12 text-bronze" />
              <span className="label">Project stories</span>
              {clientStories.length === 0 ? (
                <>
                  <h2 className="mt-4 text-d2">
                    The best page on this site is the one not written yet.
                  </h2>
                  <p className="mx-auto mt-5 max-w-prose text-cap italic text-ink-3">
                    {'{{TODO: two or three real project stories — the client, the building, what was made and how long it took. A named temple door or a hotel lobby, in the client’s own words if they will give them, would do more for this page than anything else on it.}}'}
                  </p>
                </>
              ) : (
                <ul className="mt-10 grid gap-10 text-left">
                  {clientStories.map((item) => (
                    <li key={item.client}>
                      <h3 className="text-d3">{item.client}</h3>
                      <p className="label label-mute mt-1">{item.place}</p>
                      <p className="mt-4 text-ink-2">{item.body}</p>
                    </li>
                  ))}
                </ul>
              )}

              <Link href="/contact" className="btn mt-10 inline-flex">
                Work with us
              </Link>
            </div>
          </Reveal>
        </Section>
      </div>
    </>
  )
}
