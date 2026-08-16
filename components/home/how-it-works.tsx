'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const steps = [
  {
    step: '01',
    title: 'Capture',
    desc: 'Activez le micro. EchoVault enregistre un court extrait du son ambiant.',
  },
  {
    step: '02',
    title: 'Empreinte',
    desc: 'Le signal est transformé en signature spectrale et comparé à la vault.',
  },
  {
    step: '03',
    title: 'Révélation',
    desc: 'Le résultat s’affiche avec le score de confiance et les métadonnées.',
  },
]

const stats = [
  { value: '4.2M', label: 'Empreintes indexées' },
  { value: '780ms', label: 'Latence moyenne' },
  { value: '99.1%', label: 'Précision' },
  { value: '120+', label: 'Pays couverts' },
]

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="glass-strong overflow-hidden rounded-3xl p-8 sm:p-12">
        <div className="mb-12 text-center">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-magenta">Processus</p>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Trois secondes, une identité
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <span className="font-mono text-5xl font-bold text-transparent [-webkit-text-stroke:1px_var(--neon-cyan)]">
                {s.step}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="bg-gradient-to-b from-cyan to-violet bg-clip-text font-mono text-3xl font-bold text-transparent sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="neon-border mt-16 flex flex-col items-center gap-6 rounded-3xl p-10 text-center sm:p-16"
      >
        <h2 className="max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Prêt à donner une identité à vos sons ?
        </h2>
        <p className="max-w-xl text-pretty text-muted-foreground">
          Rejoignez EchoVault et transformez chaque signal audio en donnée exploitable.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/auth"
            className="rounded-xl bg-magenta px-7 py-3 font-semibold text-primary-foreground transition-all hover:glow-magenta"
          >
            Créer un compte
          </Link>
          <Link
            href="/recognize"
            className="rounded-xl border border-cyan/40 bg-cyan/10 px-7 py-3 font-semibold text-cyan transition-all hover:glow-cyan"
          >
            Essayer maintenant
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
