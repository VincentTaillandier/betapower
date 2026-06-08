'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const links = [
  { href: '/',         label: 'Accueil' },
  { href: '/offres',   label: 'Offres' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/projets',  label: 'Projets' },
  { href: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/betapower_logo.png"
              alt="BetaPower"
              width={40}
              height={40}
              className="h-9 w-auto"
            />
            <span className="text-xl font-bold text-betapower-darkblue">BetaPower</span>
          </Link>

          <motion.div
            className="hidden md:flex items-center gap-7"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1, delay: 0.2 }}
          >
            {links.map(({ href, label }) => (
              <motion.div key={href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === href
                      ? 'text-betapower-darkblue'
                      : 'text-gray-600 hover:text-betapower-darkblue'
                  }`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
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

        {open && (
          <motion.div
            className="md:hidden pb-4 space-y-1 border-t border-gray-100 pt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-betapower-darkblue rounded-lg font-medium"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
