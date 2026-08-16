'use client'

import { motion } from 'framer-motion'
import {
  Gauge,
  Users,
  ShieldAlert,
  Server,
  Activity,
  Database,
  Cpu,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { AnimatedBackground } from '@/components/animated-background'
import { SiteNav } from '@/components/site-nav'
import { DashboardShell, type NavItem } from '@/components/dashboard-shell'
import { StatCard } from '@/components/dashboard/stat-card'
import { ActivityChart } from '@/components/dashboard/activity-chart'
import { cn } from '@/lib/utils'

const nav: NavItem[] = [
  { label: 'Vue système', icon: Gauge, active: true },
  { label: 'Utilisateurs', icon: Users },
  { label: 'Modération', icon: ShieldAlert },
  { label: 'Infrastructure', icon: Server },
]

const queue = [
  { title: 'Hollow Drift', artist: 'Mira K.', flag: 'Nouveau son' },
  { title: 'Ghost Frequency', artist: 'NOVA-7', flag: 'Contenu signalé' },
  { title: 'Iron Lullaby', artist: 'AZTEC', flag: 'Doublon possible' },
]

const services = [
  { name: 'API de reconnaissance', status: 'ok', value: '99.98%' },
  { name: 'Index vectoriel', status: 'ok', value: '4.2M' },
  { name: 'File d’ingestion', status: 'warn', value: '312 en file' },
  { name: 'Passerelle audio', status: 'ok', value: '780ms' },
]

export default function AdminDashboard() {
  return (
    <>
      <AnimatedBackground />
      <SiteNav />
      <DashboardShell
        role="Console admin"
        title="Supervision EchoVault"
        subtitle="État du système, modération du catalogue et santé de l’infrastructure."
        accent="magenta"
        nav={nav}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Users} label="Utilisateurs actifs" value="48.2k" trend="+6%" accent="cyan" index={0} />
          <StatCard icon={Activity} label="Requêtes / min" value="12 480" trend="live" accent="magenta" index={1} />
          <StatCard icon={Database} label="Empreintes" value="4.2M" trend="+41k" accent="violet" index={2} />
          <StatCard icon={Cpu} label="Charge cluster" value="63%" accent="cyan" index={3} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass rounded-2xl p-6 lg:col-span-2"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Reconnaissances mensuelles</h2>
              <span className="font-mono text-xs text-cyan">+18% sur l&apos;année</span>
            </div>
            <ActivityChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <div className="mb-5 flex items-center gap-2">
              <Server className="h-4 w-4 text-cyan" />
              <h2 className="text-lg font-semibold">Services</h2>
            </div>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li
                  key={s.name}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'h-2 w-2 rounded-full',
                        s.status === 'ok' ? 'bg-cyan' : 'bg-magenta',
                      )}
                      style={{
                        boxShadow:
                          s.status === 'ok'
                            ? '0 0 8px oklch(0.82 0.15 195)'
                            : '0 0 8px oklch(0.68 0.27 340)',
                      }}
                    />
                    <span className="text-sm">{s.name}</span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{s.value}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-6 glass rounded-2xl p-6"
        >
          <div className="mb-5 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-magenta" />
            <h2 className="text-lg font-semibold">File de modération</h2>
            <span className="ml-auto rounded-full bg-magenta/15 px-2.5 py-1 font-mono text-xs text-magenta">
              {queue.length} en attente
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {queue.map((q, i) => (
              <motion.li
                key={q.title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.06 }}
                className="flex flex-col gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{q.title}</p>
                  <p className="text-sm text-muted-foreground">{q.artist}</p>
                </div>
                <span className="w-fit rounded-full border border-violet/40 bg-violet/10 px-3 py-1 text-xs text-violet">
                  {q.flag}
                </span>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 rounded-lg bg-cyan/15 px-3 py-1.5 text-sm font-medium text-cyan transition-all hover:glow-cyan">
                    <CheckCircle2 className="h-4 w-4" />
                    Approuver
                  </button>
                  <button className="flex items-center gap-1.5 rounded-lg bg-destructive/15 px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/25">
                    <XCircle className="h-4 w-4" />
                    Rejeter
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </DashboardShell>
    </>
  )
}
