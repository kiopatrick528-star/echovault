'use client'

import { motion } from 'framer-motion'
import {
  LayoutGrid,
  UploadCloud,
  BarChart3,
  Music4,
  Play,
  TrendingUp,
  Radio,
  MoreVertical,
} from 'lucide-react'
import { AnimatedBackground } from '@/components/animated-background'
import { SiteNav } from '@/components/site-nav'
import { DashboardShell, type NavItem } from '@/components/dashboard-shell'
import { StatCard } from '@/components/dashboard/stat-card'
import { UploadZone } from '@/components/dashboard/upload-zone'
import { cn } from '@/lib/utils'

const nav: NavItem[] = [
  { label: 'Catalogue', icon: LayoutGrid, active: true },
  { label: 'Uploader', icon: UploadCloud },
  { label: 'Statistiques', icon: BarChart3 },
  { label: 'Mes sons', icon: Music4 },
]

const catalog = [
  { title: 'Neon Rain', status: 'Actif', plays: '128 402', matches: '9 210', trend: '+12%' },
  { title: 'Pulse Reactor', status: 'Actif', plays: '84 019', matches: '5 771', trend: '+8%' },
  { title: 'Hollow Drift', status: 'En revue', plays: '—', matches: '—', trend: '' },
  { title: 'Crimson Echo', status: 'Actif', plays: '211 550', matches: '18 044', trend: '+21%' },
  { title: 'Static Bloom', status: 'Archivé', plays: '12 003', matches: '640', trend: '-3%' },
]

const statusStyle: Record<string, string> = {
  Actif: 'bg-cyan/15 text-cyan',
  'En revue': 'bg-violet/15 text-violet',
  Archivé: 'bg-white/10 text-muted-foreground',
}

export default function ArtistDashboard() {
  return (
    <>
      <AnimatedBackground />
      <SiteNav />
      <DashboardShell
        role="Espace artiste"
        title="Studio VOID SIGNAL"
        subtitle="Indexez vos sons personnalisés et suivez leurs reconnaissances en temps réel."
        accent="violet"
        nav={nav}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Music4} label="Sons indexés" value="24" trend="+3" accent="violet" index={0} />
          <StatCard icon={Radio} label="Reconnaissances" value="33.6k" trend="+21%" accent="cyan" index={1} />
          <StatCard icon={Play} label="Écoutes totales" value="435k" accent="magenta" index={2} />
          <StatCard icon={TrendingUp} label="Portée mensuelle" value="+18%" trend="30 j" accent="cyan" index={3} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-2">
                <UploadCloud className="h-4 w-4 text-cyan" />
                <h2 className="text-lg font-semibold">Nouveau son</h2>
              </div>
              <UploadZone />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="glass overflow-hidden rounded-2xl lg:col-span-3"
          >
            <div className="flex items-center justify-between p-6 pb-4">
              <h2 className="text-lg font-semibold">Mon catalogue</h2>
              <span className="font-mono text-xs text-muted-foreground">{catalog.length} titres</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-y border-white/10 text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-3 font-medium">Titre</th>
                    <th className="px-3 py-3 font-medium">Statut</th>
                    <th className="px-3 py-3 text-right font-medium">Écoutes</th>
                    <th className="px-3 py-3 text-right font-medium">Matches</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {catalog.map((row, i) => (
                    <motion.tr
                      key={row.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 + i * 0.05 }}
                      className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan/25 to-violet/25 text-cyan">
                            <Music4 className="h-4 w-4" />
                          </span>
                          <span className="font-medium">{row.title}</span>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-1 text-xs font-medium',
                            statusStyle[row.status],
                          )}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-right font-mono">{row.plays}</td>
                      <td className="px-3 py-4 text-right">
                        <span className="font-mono">{row.matches}</span>
                        {row.trend && (
                          <span className="ml-2 font-mono text-xs text-cyan">{row.trend}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          aria-label={`Options pour ${row.title}`}
                          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </DashboardShell>
    </>
  )
}
