'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type StatCardProps = {
  icon: LucideIcon
  label: string
  value: string
  trend?: string
  accent?: 'cyan' | 'violet' | 'magenta'
  index?: number
}

const accentMap: Record<string, { text: string; bg: string }> = {
  cyan: { text: 'text-cyan', bg: 'bg-cyan/15' },
  violet: { text: 'text-violet', bg: 'bg-violet/15' },
  magenta: { text: 'text-magenta', bg: 'bg-magenta/15' },
}

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  accent = 'cyan',
  index = 0,
}: StatCardProps) {
  const a = accentMap[accent]
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-center justify-between">
        <span className={cn('grid h-9 w-9 place-items-center rounded-lg', a.bg)}>
          <Icon className={cn('h-4 w-4', a.text)} />
        </span>
        {trend && (
          <span className={cn('font-mono text-xs font-semibold', a.text)}>{trend}</span>
        )}
      </div>
      <p className="mt-4 font-mono text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  )
}
