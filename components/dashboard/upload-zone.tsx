'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { UploadCloud, FileAudio, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function UploadZone() {
  const [dragging, setDragging] = useState(false)
  const [progress, setProgress] = useState<number | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const simulateUpload = (name: string) => {
    if (timer.current) clearInterval(timer.current)
    setFileName(name)
    setDone(false)
    setProgress(0)
    timer.current = setInterval(() => {
      setProgress((p) => {
        const next = (p ?? 0) + Math.random() * 18
        if (next >= 100) {
          if (timer.current) clearInterval(timer.current)
          setDone(true)
          return 100
        }
        return next
      })
    }, 220)
  }

  const handleFiles = (files: FileList | null) => {
    const f = files?.[0]
    if (f) simulateUpload(f.name)
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        handleFiles(e.dataTransfer.files)
      }}
      className={cn(
        'relative flex flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center transition-all',
        dragging ? 'border-cyan bg-cyan/5 glow-cyan' : 'border-white/15 bg-white/[0.02]',
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <AnimatePresence mode="wait">
        {progress === null ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-cyan/15 text-cyan glow-cyan"
            >
              <UploadCloud className="h-6 w-6" />
            </motion.span>
            <p className="font-medium">Déposez un fichier audio</p>
            <p className="mt-1 text-sm text-muted-foreground">WAV, MP3, FLAC — jusqu&apos;à 50 Mo</p>
            <button
              onClick={() => inputRef.current?.click()}
              className="mt-5 rounded-xl bg-cyan px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:glow-cyan"
            >
              Choisir un fichier
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="progress"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm"
          >
            <div className="mb-3 flex items-center gap-3">
              <span
                className={cn(
                  'grid h-11 w-11 place-items-center rounded-xl',
                  done ? 'bg-cyan/15 text-cyan' : 'bg-violet/15 text-violet',
                )}
              >
                {done ? <CheckCircle2 className="h-5 w-5" /> : <FileAudio className="h-5 w-5" />}
              </span>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-medium">{fileName}</p>
                <p className="text-xs text-muted-foreground">
                  {done ? 'Empreinte générée et indexée' : `Encodage… ${Math.round(progress)}%`}
                </p>
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan via-violet to-magenta"
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            {done && (
              <button
                onClick={() => {
                  setProgress(null)
                  setFileName(null)
                  setDone(false)
                }}
                className="mt-4 rounded-xl border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                Ajouter un autre son
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
