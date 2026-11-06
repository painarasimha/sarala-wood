import Link from 'next/link'
import { footerNav, site } from '@/content/site'
import { HouseMark } from '@/components/ornament/Ornaments'
import { JaaliBand } from '@/components/ui/Section'

export function Footer() {
  return (
    <footer className="surface-dark pb-10 pt-[3.25rem]">
      <div className="wrap">
        <JaaliBand className="mb-10 opacity-14" />

        <div className="grid gap-10 border-b border-dark-ink/15 pb-11 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <HouseMark className="h-6 w-6" stroke="#A98247" />
              <span className="font-caps text-[1.15rem] tracking-[0.2em] text-dark-ink">SARALA</span>
            </div>
            <address className="not-italic text-cap leading-relaxed text-dark-ink/65">
              {site.address.street}
              <br />
              {site.address.taluk}
              <br />
              {site.address.district}, {site.address.state} {site.address.postalCode}
            </address>
            <div className="mt-5 flex flex-col gap-1.5 text-cap">
              {site.phones.slice(0, 2).map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className="w-fit border-b border-transparent text-dark-ink/65 transition-colors duration-500 ease-carve hover:border-dark-ink/40 hover:text-dark-ink"
                >
                  {phone.number}
                </a>
              ))}
              <a
                href={`mailto:${site.emails[0]}`}
                className="w-fit border-b border-transparent text-dark-ink/65 transition-colors duration-500 ease-carve hover:border-dark-ink/40 hover:text-dark-ink"
              >
                {site.emails[0]}
              </a>
            </div>
          </div>

          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <h2 className="label mb-5 text-bronze-2">{heading}</h2>
              <ul className="flex flex-col gap-2.5 text-cap">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="border-b border-transparent text-dark-ink/65 transition-colors duration-500 ease-carve hover:border-dark-ink/40 hover:text-dark-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-6">
          <p className="cap text-dark-ink/52">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="cap text-dark-ink/52">Nandalike · Karkala · Udupi · Karnataka</p>
        </div>
      </div>
    </footer>
  )
}
