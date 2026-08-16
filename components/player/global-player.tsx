'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { usePlayer } from './player-provider'
import { formatTime } from '@/lib/music-data'
import { cn } from '@/lib/utils'

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
const accentFrom: Record<string, string> = {
  cyan: 'from-cyan',
  violet: 'from-violet',
  magenta: 'from-magenta',
}

function Equalizer({ active, accent }: { active: boolean; accent: string }) {
  return (
    <div className="flex h-5 items-end gap-0.5" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className={cn('w-1 rounded-full', accentText[accent].replace('text-', 'bg-'))}
          animate={
            active
              ? { height: ['30%', '100%', '45%', '85%', '30%'] }
              : { height: '30%' }
          }
          transition={{
            duration: 0.9 + i * 0.15,
            repeat: active ? Infinity : 0,
            ease: 'easeInOut',
          }}
          style={{ height: '30%' }}
        />
      ))}
    </div>
  )
}

export function GlobalPlayer() {
  const {
    current,
    isPlaying,
    currentTime,
    duration,
    volume,
    toggle,
    next,
    prev,
    seek,
    setVolume,
  } = usePlayer()

  const barRef = useRef<HTMLDivElement>(null)
  const accent = current?.accent ?? 'cyan'
  const progress = duration ? Math.min(100, (currentTime / duration) * 100) : 0

  // Reserve space at the bottom of the document while the player is visible.
  useEffect(() => {
    document.body.style.paddingBottom = current ? '7rem' : ''
    return () => {
      document.body.style.paddingBottom = ''
    }
  }, [current])

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const el = barRef.current
    if (!el || !duration) return
    const rect = el.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    seek(ratio * duration)
  }

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-4 sm:pb-4"
        >
          <div className="glass-strong mx-auto flex max-w-6xl flex-col gap-2 rounded-2xl px-3 py-2.5 sm:px-4">
            {/* progress bar */}
            <div className="flex items-center gap-3">
              <span className="w-10 shrink-0 text-right font-mono text-[0.7rem] text-muted-foreground">
                {formatTime(currentTime)}
              </span>
              <div
                ref={barRef}
                onClick={handleSeek}
                className="group relative h-1.5 flex-1 cursor-pointer rounded-full bg-white/10"
              >
                <div
                  className={cn(
                    'absolute inset-y-0 left-0 rounded-full bg-gradient-to-r to-transparent',
                    accentFrom[accent],
                  )}
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, var(--neon-${accent}), color-mix(in oklch, var(--neon-${accent}) 40%, transparent))`,
                  }}
                />
                <div
                  className={cn(
                    'absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full opacity-0 transition-opacity group-hover:opacity-100',
                    accentText[accent].replace('text-', 'bg-'),
                    accentGlow[accent],
                  )}
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>
              <span className="w-10 shrink-0 font-mono text-[0.7rem] text-muted-foreground">
                {formatTime(duration)}
              </span>
            </div>

            {/* controls row */}
            <div className="flex items-center gap-3">
              {/* track info */}
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={current.cover || '/placeholder.svg'}
                    alt={`Pochette de ${current.album}`}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold leading-tight">{current.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{current.artist}</p>
                </div>
                <div className="ml-1 hidden sm:block">
                  <Equalizer active={isPlaying} accent={accent} />
                </div>
              </div>

              {/* transport */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={prev}
                  aria-label="Précédent"
                  className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                >
                  <SkipBack className="h-4 w-4" />
                </button>
                <button
                  onClick={toggle}
                  aria-label={isPlaying ? 'Pause' : 'Lecture'}
                  className={cn(
                    'grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br text-background transition-transform hover:scale-105',
                    accentGlow[accent],
                  )}
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--neon-${accent}), var(--neon-violet))`,
                  }}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 fill-current" />
                  ) : (
                    <Play className="h-5 w-5 translate-x-px fill-current" />
                  )}
                </button>
                <button
                  onClick={next}
                  aria-label="Suivant"
                  className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                >
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>

              {/* volume */}
              <div className="hidden items-center gap-2 md:flex md:w-32">
                <button
                  onClick={() => setVolume(volume > 0 ? 0 : 0.7)}
                  aria-label={volume > 0 ? 'Couper le son' : 'Rétablir le son'}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {volume > 0 ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="Volume"
                  className="ev-range h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/10"
                  style={{
                    background: `linear-gradient(90deg, var(--neon-${accent}) ${volume * 100}%, oklch(1 0 0 / 10%) ${volume * 100}%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
