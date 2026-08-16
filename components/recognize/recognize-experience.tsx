'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Disc3, RotateCcw, Share2, Check } from 'lucide-react'
import { AudioVisualizer } from '@/components/recognize/audio-visualizer'
import { ListenOrb } from '@/components/listen-orb'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'listening' | 'analyzing' | 'result'

const SAMPLE = {
  title: 'Neon Rain',
  artist: 'VOID SIGNAL',
  album: 'Chromatic Dusk',
  confidence: 98.4,
  duration: '3:42',
  bpm: 128,
  key: 'F# min',
  tags: ['Synthwave', 'Custom Drop', 'Vault ID · 0x9F2A'],
}

export function RecognizeExperience() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [elapsed, setElapsed] = useState(0)
  const [copied, setCopied] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const start = useCallback(() => {
    clearTimers()
    setElapsed(0)
    setPhase('listening')
    timers.current.push(setTimeout(() => setPhase('analyzing'), 4000))
    timers.current.push(setTimeout(() => setPhase('result'), 6200))
  }, [])

  const reset = useCallback(() => {
    clearTimers()
    setPhase('idle')
    setElapsed(0)
    setCopied(false)
  }, [])

  useEffect(() => {
    if (phase !== 'listening') return
    const id = setInterval(() => setElapsed((e) => e + 0.1), 100)
    return () => clearInterval(id)
  }, [phase])

  useEffect(() => () => clearTimers(), [])

  const active = phase === 'listening' || phase === 'analyzing'

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 pb-16 pt-28 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan">
          Salle d&apos;écoute
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          {phase === 'idle' && 'Approchez le son'}
          {phase === 'listening' && 'Écoute en cours…'}
          {phase === 'analyzing' && 'Analyse de l’empreinte…'}
          {phase === 'result' && 'Son identifié'}
        </h1>
      </motion.div>

      {/* Orb / status */}
      <AnimatePresence mode="wait">
        {phase !== 'result' && (
          <motion.div
            key="orb"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <ListenOrb
              label="Toucher"
              active={active}
              onClick={phase === 'idle' ? start : undefined}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visualizer */}
      <motion.div
        layout
        className="mt-8 h-40 w-full overflow-hidden rounded-2xl glass p-4"
      >
        <AudioVisualizer active={active || phase === 'result'} />
      </motion.div>

      {/* Timer + hint */}
      <div className="mt-4 h-6 font-mono text-sm text-muted-foreground">
        {phase === 'listening' && <span className="text-cyan">{elapsed.toFixed(1)}s captées</span>}
        {phase === 'analyzing' && (
          <span className="inline-flex items-center gap-2 text-violet">
            <Disc3 className="h-4 w-4 animate-spin" />
            Comparaison à 4.2M empreintes
          </span>
        )}
        {phase === 'idle' && <span>Touchez l&apos;orbe pour lancer la reconnaissance</span>}
      </div>

      {/* Result card */}
      <AnimatePresence>
        {phase === 'result' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-6 w-full"
          >
            <div className="glass-strong overflow-hidden rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <motion.div
                  initial={{ rotate: -8, scale: 0.9 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="relative mx-auto h-32 w-32 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan/30 via-violet/30 to-magenta/30 glow-violet sm:mx-0"
                >
                  <div className="grid h-full w-full place-items-center">
                    <Disc3 className="h-14 w-14 animate-spin text-cyan [animation-duration:6s]" />
                  </div>
                </motion.div>

                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-cyan/15 px-3 py-1 text-xs font-semibold text-cyan">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                    {SAMPLE.confidence}% de confiance
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-glow-cyan">
                    {SAMPLE.title}
                  </h2>
                  <p className="text-muted-foreground">{SAMPLE.artist}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{SAMPLE.album}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                {[
                  ['Durée', SAMPLE.duration],
                  ['Tempo', `${SAMPLE.bpm} BPM`],
                  ['Tonalité', SAMPLE.key],
                ].map(([label, value]) => (
                  <div key={label} className="text-center">
                    <p className="font-mono text-lg font-semibold">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {SAMPLE.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-violet/40 bg-violet/10 px-3 py-1 font-mono text-xs text-violet"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={reset}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan px-5 py-3 font-semibold text-primary-foreground transition-all hover:glow-cyan"
                >
                  <RotateCcw className="h-4 w-4" />
                  Nouvelle écoute
                </button>
                <button
                  onClick={() => {
                    setCopied(true)
                    setTimeout(() => setCopied(false), 1800)
                  }}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-2 rounded-xl border px-5 py-3 font-semibold transition-all',
                    copied
                      ? 'border-cyan/50 bg-cyan/15 text-cyan'
                      : 'border-white/15 bg-white/5 text-foreground hover:bg-white/10',
                  )}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                  {copied ? 'Copié' : 'Partager'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
