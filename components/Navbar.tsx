'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { navLinks as links } from '@/lib/nav'

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname              = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navBg      = scrolled ? 'bg-betapower-darkblue shadow-lg' : 'bg-white shadow-sm'
  const borderLine = scrolled ? 'border-white/10' : 'border-gray-200'
  const brandColor = scrolled ? 'text-white' : 'text-betapower-darkblue'
  const linkRest   = scrolled ? 'text-white/80' : 'text-gray-600'

  const linkClass = (href: string) => {
    const isActive = pathname === href
    const base = `text-sm font-medium transition-all duration-200 relative group`
    if (isActive) return `${base} ${scrolled ? 'text-betapower-azure' : 'text-betapower-azure'} underline underline-offset-4 decoration-betapower-azure`
    return `${base} ${linkRest} hover:text-betapower-azure hover:underline hover:underline-offset-4 hover:decoration-betapower-azure`
  }

  return (
    <nav className={`sticky top-0 z-50 border-b transition-all duration-300 ${navBg} ${borderLine}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/betapower_logo.png"
              alt="BetaPower"
              width={40}
              height={40}
              className="h-9 w-auto"
            />
            <span className={`text-xl font-bold transition-colors duration-300 ${brandColor}`} style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
              BetaPower
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu — always dark */}
      {open && (
        <div className="md:hidden bg-betapower-darkblue border-t border-white/10 px-4 pb-5 pt-3 space-y-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                pathname === href
                  ? 'text-betapower-azure bg-white/5'
                  : 'text-white/80 hover:text-betapower-azure hover:bg-white/5'
              }`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
