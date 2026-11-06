import { galleryCount } from '@/content/gallery'
import { clients } from '@/content/clients'
import { BeadRule } from '@/components/ui/Section'

/** Four numbers, every one of them checkable. */
const facts = [
  { value: '1986', label: 'Year founded' },
  { value: String(clients.length), label: 'Clients on record' },
  { value: '3', label: 'Kinds of space' },
  { value: String(galleryCount), label: 'Pieces photographed' },
]

export function Facts() {
  return (
    <>
      <div className="wrap">
        <BeadRule />
      </div>
      <div className="wrap">
        <ul className="grid grid-cols-2 md:grid-cols-4">
          {facts.map((fact, i) => (
            <li
              key={fact.label}
              className={`relative px-4 py-[clamp(1.5rem,2.8vw,2.2rem)] text-center ${
                i > 1 ? 'border-t border-ink/8 md:border-t-0' : ''
              }`}
            >
              {i % 2 === 1 && (
                <span className="absolute inset-y-[28%] left-0 w-px bg-ink/8" aria-hidden="true" />
              )}
              {i % 2 === 0 && i > 0 && (
                <span
                  className="absolute inset-y-[28%] left-0 hidden w-px bg-ink/8 md:block"
                  aria-hidden="true"
                />
              )}
              <b className="block font-serif text-[clamp(1.6rem,2.5vw,2.1rem)] font-normal leading-none">
                {fact.value}
              </b>
              <span className="label label-mute mt-[0.6rem] block text-[0.68rem] tracking-[0.17em]">
                {fact.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="wrap">
        <BeadRule />
      </div>
    </>
  )
}
