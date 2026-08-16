'use client'

import { motion } from 'framer-motion'

const data = [42, 58, 47, 72, 65, 88, 79, 96, 84, 100, 91, 76]
const labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

export function ActivityChart() {
  const max = Math.max(...data)
  return (
    <div className="flex h-48 items-stretch gap-2">
      {data.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(v / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: 'easeOut' }}
              className="w-full rounded-t-md bg-gradient-to-t from-cyan/30 via-violet to-magenta"
              style={{ boxShadow: '0 0 12px oklch(0.62 0.24 295 / 40%)' }}
            />
          </div>
          <span className="font-mono text-[0.65rem] text-muted-foreground">{labels[i]}</span>
        </div>
      ))}
    </div>
  )
}
