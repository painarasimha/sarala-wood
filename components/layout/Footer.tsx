import Link from 'next/link'
import { footerNav, site } from '@/content/site'
import { BeadAndReel, Lotus } from '@/components/ornament/Ornaments'

export function Footer() {
  return (
    <footer className="bg-ebony text-sandalwood/65">
      <BeadAndReel className="h-4 w-full opacity-30" stroke="#c9a35f" />

      <div className="wrap pb-9 pt-16 sm:pt-20">
        <div className="grid gap-12 border-b border-brass/15 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Lotus className="h-7 w-9" stroke="#c9a35f" />
              <span className="font-serif text-[1.35rem] tracking-[0.12em] text-sandalwood">SARALA</span>
            </div>
            <address className="not-italic text-small leading-relaxed">
              {site.address.street}
              <br />
              {site.address.taluk}
              <br />
              {site.address.district}, {site.address.state} {site.address.postalCode}
            </address>
            <div className="mt-5 flex flex-col gap-1 text-small">
              {site.phones.slice(0, 2).map((phone) => (
                <a key={phone.tel} href={`tel:${phone.tel}`} className="link-draw w-fit hover:text-sandalwood">
                  {phone.number}
                </a>
              ))}
              <a href={`mailto:${site.emails[0]}`} className="link-draw w-fit hover:text-sandalwood">
                {site.emails[0]}
              </a>
            </div>
          </div>

          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <h2 className="mb-5 font-sans text-eyebrow font-semibold uppercase text-brass">{heading}</h2>
              <ul className="flex flex-col gap-2.5 text-small">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="link-draw hover:text-sandalwood">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-[0.78rem]">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-serif italic text-brass/75">{site.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
