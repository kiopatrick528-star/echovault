'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { ListenOrb } from '@/components/listen-orb'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-28 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass mb-8 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-cyan"
      >
        <Sparkles className="h-3.5 w-3.5" />
        Reconnaissance audio nouvelle génération
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
      >
        Chaque son a une{' '}
        <span className="bg-gradient-to-r from-cyan via-violet to-magenta bg-clip-text text-transparent">
          empreinte
        </span>
        . Nous la révélons.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground"
      >
        EchoVault identifie instantanément vos sons personnalisés, samples et signatures
        sonores. Approchez le micro, laissez la vault écouter.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="my-12"
      >
        <Link href="/recognize" aria-label="Aller à la reconnaissance audio">
          <ListenOrb label="Reconnaître" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="flex flex-col items-center gap-4 sm:flex-row"
      >
        <Link
          href="/recognize"
          className="group flex items-center gap-2 rounded-xl bg-cyan px-6 py-3 font-semibold text-primary-foreground transition-all hover:glow-cyan"
        >
          Lancer l&apos;écoute
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/dashboard/artist"
          className="rounded-xl border border-violet/40 bg-violet/10 px-6 py-3 font-semibold text-foreground transition-all hover:glow-violet hover:bg-violet/20"
        >
          Espace artiste
        </Link>
      </motion.div>
    </section>
  )
}
