import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import './globals.css'
import Navbar from '@/components/Navbar'
import PageTransition from '@/components/PageTransition'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BetaPower — Expertise en infrastructure réseau électrique',
  description:
    'Conseil, audit et expertise en infrastructure de réseau électrique pour opérateurs et industriels.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        <Navbar />
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        <footer className="bg-betapower-darkblue text-white/50 py-10 mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Image
                src="/images/betapower_logo.png"
                alt="BetaPower"
                width={28}
                height={28}
                className="h-7 w-auto opacity-70"
              />
              <span className="text-white/70 font-semibold">BetaPower</span>
              <span className="hidden sm:inline">—</span>
              <span className="hidden sm:inline">© {new Date().getFullYear()} Tous droits réservés.</span>
            </div>
            <span className="sm:hidden text-center">© {new Date().getFullYear()} Tous droits réservés.</span>
            <a href="mailto:contact@betapower.fr" className="hover:text-white transition-colors">
              contact@betapower.fr
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}
