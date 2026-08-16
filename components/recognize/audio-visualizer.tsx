'use client'

import { useEffect, useRef } from 'react'

type AudioVisualizerProps = {
  active: boolean
  bars?: number
}

/**
 * Canvas frequency visualizer. Tries the real microphone via Web Audio API,
 * and gracefully falls back to a synthesized spectrum when mic access is
 * unavailable (e.g. inside the preview iframe).
 */
export function AudioVisualizer({ active, bars = 64 }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const dataRef = useRef<Float32Array>(new Float32Array(bars))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let analyser: AnalyserNode | null = null
    let audioCtx: AudioContext | null = null
    let stream: MediaStream | null = null
    let freqData: Uint8Array | null = null
    let disposed = false

    async function initMic() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        if (disposed) return
        audioCtx = new AudioContext()
        const source = audioCtx.createMediaStreamSource(stream)
        analyser = audioCtx.createAnalyser()
        analyser.fftSize = 256
        source.connect(analyser)
        freqData = new Uint8Array(analyser.frequencyBinCount)
      } catch {
        analyser = null
      }
    }

    if (active) initMic()

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      if (!canvas) return
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    let t = 0

    function draw() {
      if (!canvas || !ctx) return
      t += 0.05
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const target = dataRef.current

      if (analyser && freqData) {
        analyser.getByteFrequencyData(freqData)
        for (let i = 0; i < bars; i++) {
          const idx = Math.floor((i / bars) * freqData.length)
          target[i] = freqData[idx] / 255
        }
      } else {
        // Synthesized spectrum
        for (let i = 0; i < bars; i++) {
          const base = active
            ? Math.abs(Math.sin(i * 0.28 + t)) * 0.6 +
              Math.abs(Math.sin(i * 0.11 - t * 1.7)) * 0.4
            : 0.04
          const noise = active ? Math.random() * 0.25 : 0
          target[i] += ((base + noise) * (active ? 1 : 0.3) - target[i]) * 0.25
        }
      }

      const gap = 2 * dpr
      const barW = (w - gap * (bars - 1)) / bars
      const grad = ctx.createLinearGradient(0, 0, w, 0)
      grad.addColorStop(0, 'oklch(0.82 0.15 195)')
      grad.addColorStop(0.5, 'oklch(0.62 0.24 295)')
      grad.addColorStop(1, 'oklch(0.68 0.27 340)')
      ctx.fillStyle = grad
      ctx.shadowBlur = 16 * dpr
      ctx.shadowColor = 'oklch(0.62 0.24 295 / 60%)'

      for (let i = 0; i < bars; i++) {
        const v = Math.max(0.02, target[i])
        const barH = v * h * 0.9
        const x = i * (barW + gap)
        const y = (h - barH) / 2
        const r = Math.min(barW / 2, 4 * dpr)
        ctx.beginPath()
        ctx.roundRect(x, y, barW, barH, r)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      disposed = true
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      stream?.getTracks().forEach((tr) => tr.stop())
      audioCtx?.close().catch(() => {})
    }
  }, [active, bars])

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
}
