import Link from 'next/link'
import Image from 'next/image'
import { navLinks } from '@/lib/nav'

export default function Footer() {
  return (
    <footer className="bg-betapower-darkblue text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Col 1 — Logo + baseline */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/betapower_logo.png"
                alt="BetaPower"
                width={36}
                height={36}
                className="h-8 w-auto opacity-90"
              />
              <span className="text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
                BetaPower
              </span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed">
              Relever les défis du système électrique de demain avec les acteurs du secteur.
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/65 hover:text-betapower-azure text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@betapower.fr"
                className="block text-white/65 hover:text-betapower-azure text-sm transition-colors duration-200"
              >
                contact@betapower.fr
              </a>
              <a
                href="https://www.linkedin.com/company/betapower/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/65 hover:text-betapower-azure text-sm transition-colors duration-200"
              >
                LinkedIn — BetaPower →
              </a>
              <a
                href="https://www.linkedin.com/in/vincent-taillandier-15574a150/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/65 hover:text-betapower-azure text-sm transition-colors duration-200"
              >
                LinkedIn — Vincent Taillandier →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-betapower-azure/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4 text-center text-white/35 text-xs" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
          © {new Date().getFullYear()} BetaPower — Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
