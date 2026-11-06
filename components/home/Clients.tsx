import Image from 'next/image'
import Link from 'next/link'
import { clientLogos, clients } from '@/content/clients'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

/** Fifteen names on the home page; the rest live on /clients. */
const shown = clients.slice(0, 15)

export function Clients() {
  return (
    <div className="bg-paper-2">
      <Section id="clients" index="VI">
        <Reveal>
          <span className="label">Clients</span>
          <h2 className="mb-[clamp(2.25rem,4vw,3rem)] mt-4 max-w-[22ch] text-d2">
            Thirty-nine builders, architects and institutions across the coast.
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mb-[2.4rem] grid grid-cols-2 gap-px border border-ink/8 bg-ink/8 sm:grid-cols-4">
            {clientLogos.map((logo) => (
              <li key={logo.name} className="grid min-h-[124px] place-items-center bg-mat px-6 py-8">
                <Image
                  src={logo.src}
                  alt={`${logo.name}, ${logo.city}`}
                  width={200}
                  height={80}
                  sizes="(max-width: 640px) 45vw, 20vw"
                  quality={82}
                  className="h-auto max-h-[46px] w-auto object-contain opacity-60 grayscale transition duration-500 ease-carve hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="columns-1 gap-x-[clamp(2rem,5vw,4.5rem)] sm:columns-2">
            {shown.map((client) => (
              <li
                key={client.name}
                className="flex items-baseline justify-between gap-6 break-inside-avoid border-b border-ink/8 py-[0.58rem] text-[1.06rem] text-ink-2"
              >
                {client.name}
                <span className="shrink-0 font-caps text-[0.7rem] uppercase tracking-[0.13em] text-ink-3">
                  {client.city}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8">
            <Link href="/clients" className="lnk">
              All thirty-nine clients
            </Link>
          </p>
        </Reveal>
      </Section>
    </div>
  )
}
