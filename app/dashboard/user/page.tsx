'use client'

import { motion } from 'framer-motion'
import {
  History,
  Heart,
  Headphones,
  Flame,
  Play,
  Clock,
  Music2,
  Star,
} from 'lucide-react'
import { AnimatedBackground } from '@/components/animated-background'
import { SiteNav } from '@/components/site-nav'
import { DashboardShell, type NavItem } from '@/components/dashboard-shell'
import { StatCard } from '@/components/dashboard/stat-card'

const nav: NavItem[] = [
  { label: 'Aperçu', icon: History, active: true },
  { label: 'Favoris', icon: Heart },
  { label: 'Historique', icon: Clock },
  { label: 'Découvertes', icon: Music2 },
]

const history = [
  { title: 'Neon Rain', artist: 'VOID SIGNAL', when: 'il y a 2 min', conf: 98 },
  { title: 'Pulse Reactor', artist: 'AZTEC', when: 'il y a 1 h', conf: 95 },
  { title: 'Hollow Drift', artist: 'Mira K.', when: 'hier', conf: 91 },
  { title: 'Static Bloom', artist: 'NOVA-7', when: 'hier', conf: 88 },
  { title: 'Crimson Echo', artist: 'VOID SIGNAL', when: 'il y a 3 j', conf: 99 },
]

const favorites = [
  { title: 'Neon Rain', artist: 'VOID SIGNAL' },
  { title: 'Chromatic Dusk', artist: 'AZTEC' },
  { title: 'Ghost Frequency', artist: 'Mira K.' },
]

export default function UserDashboard() {
  return (
    <>
      <AnimatedBackground />
      <SiteNav />
      <DashboardShell
        role="Espace utilisateur"
        title="Bonjour, Nova"
        subtitle="Retrouvez vos reconnaissances, vos favoris et vos statistiques d’écoute."
        accent="cyan"
        nav={nav}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Headphones} label="Sons reconnus" value="342" trend="+18" accent="cyan" index={0} />
          <StatCard icon={Heart} label="Favoris" value="27" accent="magenta" index={1} />
          <StatCard icon={Flame} label="Série active" value="12 j" trend="record" accent="violet" index={2} />
          <StatCard icon={Star} label="Précision moy." value="94%" accent="cyan" index={3} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass rounded-2xl p-6 lg:col-span-2"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Historique récent</h2>
              <span className="font-mono text-xs text-muted-foreground">5 dernières</span>
            </div>
            <ul className="flex flex-col gap-2">
              {history.map((h, i) => (
                <motion.li
                  key={h.title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
                  className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:bg-white/5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cyan/10 text-cyan transition-all group-hover:glow-cyan">
                    <Play className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{h.title}</p>
                    <p className="truncate text-sm text-muted-foreground">{h.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-cyan">{h.conf}%</p>
                    <p className="text-xs text-muted-foreground">{h.when}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <div className="mb-5 flex items-center gap-2">
              <Heart className="h-4 w-4 text-magenta" />
              <h2 className="text-lg font-semibold">Favoris</h2>
            </div>
            <ul className="flex flex-col gap-3">
              {favorites.map((f) => (
                <li key={f.title} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-violet/30 to-magenta/30">
                    <Music2 className="h-4 w-4 text-magenta" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{f.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{f.artist}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full rounded-xl border border-magenta/40 bg-magenta/10 py-2.5 text-sm font-semibold text-magenta transition-all hover:glow-magenta">
              Voir tous les favoris
            </button>
          </motion.div>
        </div>
      </DashboardShell>
    </>
  )
}
