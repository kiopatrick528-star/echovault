'use client'

import { motion } from 'framer-motion'
import { Mic } from 'lucide-react'
import { cn } from '@/lib/utils'

type ListenOrbProps = {
  label?: string
  active?: boolean
  size?: number
  onClick?: () => void
  className?: string
}

export function ListenOrb({
  label = 'Écouter',
  active = false,
  size = 224,
  onClick,
  className,
}: ListenOrbProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? 'Écoute en cours' : label}
      className={cn('group relative grid place-items-center outline-none', className)}
      style={{ width: size, height: size }}
    >
      {/* Expanding rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-cyan/40"
          style={{ width: size, height: size }}
          animate={{ scale: [1, 1.6], opacity: [0.55, 0] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            delay: i * 0.85,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Rotating gradient halo */}
      <motion.span
        className="absolute rounded-full opacity-70 blur-2xl"
        style={{
          width: size * 0.95,
          height: size * 0.95,
          background:
            'conic-gradient(from 0deg, var(--neon-cyan), var(--neon-violet), var(--neon-magenta), var(--neon-cyan))',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: active ? 4 : 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Core */}
      <motion.span
        className="relative grid place-items-center rounded-full glass-strong glow-cyan"
        style={{ width: size * 0.62, height: size * 0.62 }}
        animate={active ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={{ duration: 1, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="flex flex-col items-center gap-2">
          <Mic
            className="text-cyan text-glow-cyan"
            style={{ width: size * 0.16, height: size * 0.16 }}
          />
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan/90">
            {active ? 'Écoute…' : label}
          </span>
        </span>
      </motion.span>
    </button>
  )
}
