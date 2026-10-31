import Image from 'next/image'
import Link from 'next/link'
import { clientLogos, clients } from '@/content/clients'
import { Reveal } from '@/components/ui/Reveal'

/** A handful of named clients to set alongside the four real logos. */
const NAMED = clients.filter((c) =>
  ['Land Trades Builders & Developers', 'Hotel Sahana Orchid', 'Saldanha Associates', 'Sai Radha Developers'].includes(
    c.name
  )
)

export function ClientsStrip() {
  return (
    <section className="surface-paper py-section">
      <div className="wrap">
        <Reveal className="mb-11 text-center">
          <span className="eyebrow">Trusted by</span>
          <p className="mx-auto mt-4 max-w-prose font-serif text-d4 text-rosewood">
            Builders, architects, hotels and places of worship across coastal Karnataka.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="grid border-y border-teak/20 sm:grid-cols-2 lg:grid-cols-4">
            {clientLogos.map((logo) => (
              <li
                key={logo.name}
                className="grid min-h-[150px] place-items-center border-t border-teak/15 p-9 first:border-t-0 sm:border-l sm:border-t-0 sm:first:border-l-0 sm:[&:nth-child(3)]:border-l-0 lg:[&:nth-child(3)]:border-l"
              >
                <Image
                  src={logo.src}
                  alt={`${logo.name}, ${logo.city}`}
                  width={200}
                  height={80}
                  sizes="(max-width: 640px) 60vw, 20vw"
                  quality={82}
                  className="h-auto max-h-[68px] w-auto object-contain opacity-80 transition duration-900 ease-carve [filter:grayscale(1)_sepia(0.35)_contrast(1.08)] hover:opacity-100 hover:[filter:none]"
                />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
            {NAMED.map((client) => (
              <li key={client.name} className="font-serif text-[1.08rem] italic text-teak/75">
                {client.name}
                <span className="ml-2 font-sans text-[0.75rem] font-semibold uppercase not-italic tracking-[0.22em] text-muted/70">
                  {client.city}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9 text-center">
            <Link href="/clients" className="link-draw font-sans text-eyebrow font-semibold uppercase text-teak">
              All {clients.length} clients
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
