'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { AudioWaveform } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/recognize', label: 'Reconnaître' },
  { href: '/dashboard/user', label: 'Utilisateur' },
  { href: '/dashboard/artist', label: 'Artiste' },
  { href: '/dashboard/admin', label: 'Admin' },
]

export function SiteNav() {
  const pathname = usePathname()

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav className="glass-strong flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-cyan/15 glow-cyan">
            <AudioWaveform className="h-5 w-5 text-cyan" />
          </span>
          <span className="font-mono text-lg font-bold tracking-tight text-glow-cyan">
            Echo<span className="text-cyan">Vault</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  active ? 'text-cyan' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-cyan/10 ring-1 ring-cyan/40"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            )
          })}
        </div>

        <Link
          href="/auth"
          className="rounded-lg border border-cyan/40 bg-cyan/10 px-4 py-1.5 text-sm font-semibold text-cyan transition-all hover:glow-cyan hover:bg-cyan/20"
        >
          Connexion
        </Link>
      </nav>
    </motion.header>
  )
}
