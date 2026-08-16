'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { AudioWaveform, Mail, Lock, User, ArrowRight, Headphones, Mic2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Mode = 'login' | 'signup'
type Role = 'user' | 'artist'

export function AuthForm() {
  const [mode, setMode] = useState<Mode>('login')
  const [role, setRole] = useState<Role>('user')

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="glass-strong w-full max-w-md overflow-hidden rounded-3xl p-8"
      >
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan/15 glow-cyan">
            <AudioWaveform className="h-5 w-5 text-cyan" />
          </span>
          <span className="font-mono text-xl font-bold tracking-tight text-glow-cyan">
            Echo<span className="text-cyan">Vault</span>
          </span>
        </Link>

        {/* Mode toggle */}
        <div className="mb-8 grid grid-cols-2 gap-1 rounded-xl bg-white/5 p-1">
          {(['login', 'signup'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="relative rounded-lg py-2 text-sm font-semibold transition-colors"
            >
              {mode === m && (
                <motion.span
                  layoutId="auth-toggle"
                  className="absolute inset-0 rounded-lg bg-cyan/15 ring-1 ring-cyan/40"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={cn('relative', mode === m ? 'text-cyan' : 'text-muted-foreground')}>
                {m === 'login' ? 'Connexion' : 'Inscription'}
              </span>
            </button>
          ))}
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <AnimatePresence mode="popLayout">
            {mode === 'signup' && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <Field icon={User} label="Nom d’artiste ou pseudo" type="text" placeholder="Nova" />
              </motion.div>
            )}
          </AnimatePresence>

          <Field icon={Mail} label="Adresse e-mail" type="email" placeholder="nova@echovault.io" />
          <Field icon={Lock} label="Mot de passe" type="password" placeholder="••••••••" />

          <AnimatePresence mode="popLayout">
            {mode === 'signup' && (
              <motion.div
                key="role"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <p className="mb-2 text-sm text-muted-foreground">Type de compte</p>
                <div className="grid grid-cols-2 gap-3">
                  <RoleCard
                    active={role === 'user'}
                    onClick={() => setRole('user')}
                    icon={Headphones}
                    label="Auditeur"
                    desc="Reconnaître des sons"
                  />
                  <RoleCard
                    active={role === 'artist'}
                    onClick={() => setRole('artist')}
                    icon={Mic2}
                    label="Artiste"
                    desc="Indexer mes sons"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="group mt-2 flex items-center justify-center gap-2 rounded-xl bg-cyan py-3 font-semibold text-primary-foreground transition-all hover:glow-cyan"
          >
            {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === 'login' ? 'Pas encore de compte ? ' : 'Déjà membre ? '}
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="font-semibold text-cyan transition-colors hover:text-magenta"
          >
            {mode === 'login' ? 'Inscrivez-vous' : 'Connectez-vous'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}

function Field({
  icon: Icon,
  label,
  type,
  placeholder,
}: {
  icon: typeof Mail
  label: string
  type: string
  placeholder: string
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted-foreground">{label}</span>
      <span className="relative flex items-center">
        <Icon className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
        <input
          type={type}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-cyan/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-cyan/30"
        />
      </span>
    </label>
  )
}

function RoleCard({
  active,
  onClick,
  icon: Icon,
  label,
  desc,
}: {
  active: boolean
  onClick: () => void
  icon: typeof Mail
  label: string
  desc: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all',
        active
          ? 'border-cyan/50 bg-cyan/10 glow-cyan'
          : 'border-white/10 bg-white/[0.02] hover:bg-white/5',
      )}
    >
      <Icon className={cn('h-5 w-5', active ? 'text-cyan' : 'text-muted-foreground')} />
      <span className="text-sm font-semibold">{label}</span>
      <span className="text-xs text-muted-foreground">{desc}</span>
    </button>
  )
}
