'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AudioWaveform, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type NavItem = {
  label: string
  icon: LucideIcon
  active?: boolean
}

type DashboardShellProps = {
  title: string
  subtitle: string
  role: string
  accent: 'cyan' | 'violet' | 'magenta'
  nav: NavItem[]
  children: ReactNode
}

const accentText: Record<string, string> = {
  cyan: 'text-cyan',
  violet: 'text-violet',
  magenta: 'text-magenta',
}
const accentGlow: Record<string, string> = {
  cyan: 'glow-cyan',
  violet: 'glow-violet',
  magenta: 'glow-magenta',
}

export function DashboardShell({
  title,
  subtitle,
  role,
  accent,
  nav,
  children,
}: DashboardShellProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl gap-6 px-4 pb-12 pt-24 sm:px-6 lg:gap-8">
      <aside className="glass sticky top-24 hidden h-[calc(100vh-8rem)] w-60 shrink-0 flex-col rounded-2xl p-4 lg:flex">
        <Link href="/" className="mb-6 flex items-center gap-2.5 px-2">
          <span className={cn('grid h-8 w-8 place-items-center rounded-lg bg-cyan/15', accentGlow[accent])}>
            <AudioWaveform className={cn('h-4 w-4', accentText[accent])} />
          </span>
          <span className="font-mono text-base font-bold">EchoVault</span>
        </Link>
        <p className="mb-2 px-3 text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">
          {role}
        </p>
        <nav className="flex flex-col gap-1">
          {nav.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  item.active
                    ? cn('bg-white/5 ring-1 ring-white/10', accentText[accent])
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground',
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className="mt-auto glass rounded-xl p-3">
          <p className="text-xs text-muted-foreground">Connecté en tant que</p>
          <p className="truncate text-sm font-semibold">nova@echovault.io</p>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className={cn('mb-1 font-mono text-xs uppercase tracking-widest', accentText[accent])}>
            {role}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">{subtitle}</p>
        </motion.div>
        {children}
      </main>
    </div>
  )
}
