'use client'

import { motion } from 'framer-motion'

export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <motion.div
        className="absolute -left-32 top-[-10%] h-[42rem] w-[42rem] rounded-full bg-violet/25 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-10%] top-1/3 h-[36rem] w-[36rem] rounded-full bg-magenta/20 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-15%] left-1/3 h-[40rem] w-[40rem] rounded-full bg-cyan/20 blur-[130px]"
        animate={{ x: [0, 40, 0], y: [0, -40, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
