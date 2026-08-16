'use client'

import { motion } from 'framer-motion'
import { Fingerprint, Zap, ShieldCheck, Radio, Waves, Database } from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: Fingerprint,
    title: 'Empreinte acoustique',
    desc: 'Chaque son est encodé en une signature spectrale unique, résistante au bruit.',
    accent: 'cyan',
  },
  {
    icon: Zap,
    title: 'Latence quasi nulle',
    desc: 'Résultats en moins de 800 ms grâce à notre index vectoriel distribué.',
    accent: 'magenta',
  },
  {
    icon: Radio,
    title: 'Sons personnalisés',
    desc: 'Indexez vos propres samples, jingles ou signatures de marque.',
    accent: 'violet',
  },
  {
    icon: ShieldCheck,
    title: 'Confidentialité native',
    desc: 'Les captures sont analysées à la volée puis effacées. Rien ne persiste.',
    accent: 'cyan',
  },
  {
    icon: Waves,
    title: 'Visualisation temps réel',
    desc: 'Un spectre animé traduit chaque fréquence captée par le micro.',
    accent: 'magenta',
  },
  {
    icon: Database,
    title: 'Vault infinie',
    desc: 'Des millions d’empreintes indexées, mises à jour en continu.',
    accent: 'violet',
  },
]

const accentMap: Record<string, { text: string; bg: string; glow: string }> = {
  cyan: { text: 'text-cyan', bg: 'bg-cyan/15', glow: 'group-hover:glow-cyan' },
  violet: { text: 'text-violet', bg: 'bg-violet/15', glow: 'group-hover:glow-violet' },
  magenta: { text: 'text-magenta', bg: 'bg-magenta/15', glow: 'group-hover:glow-magenta' },
}

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mb-14 text-center">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan">Capacités</p>
        <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Une technologie qui écoute vraiment
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => {
          const a = accentMap[f.accent]
          const Icon = f.icon
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <span
                className={cn(
                  'mb-4 grid h-11 w-11 place-items-center rounded-xl transition-all',
                  a.bg,
                  a.glow,
                )}
              >
                <Icon className={cn('h-5 w-5', a.text)} />
              </span>
              <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
