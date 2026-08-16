'use client'

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { SynthEngine } from '@/lib/audio-engine'
import { tracks as allTracks, getAlbumTracks, type Track } from '@/lib/music-data'

type PlayerContextValue = {
  current: Track | null
  queue: Track[]
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  playTrack: (track: Track, queue?: Track[]) => void
  playAlbum: (albumId: string) => void
  toggle: () => void
  next: () => void
  prev: () => void
  seek: (time: number) => void
  setVolume: (v: number) => void
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const engineRef = useRef<SynthEngine | null>(null)
  const tickRef = useRef<number | null>(null)

  const [queue, setQueue] = useState<Track[]>([])
  const [index, setIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolumeState] = useState(0.7)

  const current = index >= 0 && index < queue.length ? queue[index] : null
  const duration = current?.duration ?? 0

  const getEngine = useCallback(() => {
    if (!engineRef.current) engineRef.current = new SynthEngine()
    return engineRef.current
  }, [])

  const stopTick = useCallback(() => {
    if (tickRef.current !== null) {
      window.clearInterval(tickRef.current)
      tickRef.current = null
    }
  }, [])

  // advance the virtual playback clock
  const startTick = useCallback(() => {
    stopTick()
    let last = performance.now()
    tickRef.current = window.setInterval(() => {
      const now = performance.now()
      const delta = (now - last) / 1000
      last = now
      setCurrentTime((t) => t + delta)
    }, 250)
  }, [stopTick])

  const startTrackAt = useCallback(
    (nextQueue: Track[], nextIndex: number) => {
      const track = nextQueue[nextIndex]
      if (!track) return
      const engine = getEngine()
      engine.loadAndPlay(track.freq)
      engine.setVolume(volume)
      setQueue(nextQueue)
      setIndex(nextIndex)
      setCurrentTime(0)
      setIsPlaying(true)
      startTick()
    },
    [getEngine, startTick, volume],
  )

  const playTrack = useCallback(
    (track: Track, q?: Track[]) => {
      const nextQueue = q && q.length ? q : [track]
      const nextIndex = Math.max(
        0,
        nextQueue.findIndex((t) => t.id === track.id),
      )
      startTrackAt(nextQueue, nextIndex)
    },
    [startTrackAt],
  )

  const playAlbum = useCallback(
    (albumId: string) => {
      const albumTracks = getAlbumTracks(albumId)
      if (albumTracks.length) startTrackAt(albumTracks, 0)
    },
    [startTrackAt],
  )

  const next = useCallback(() => {
    if (!queue.length) return
    const ni = index + 1
    if (ni < queue.length) startTrackAt(queue, ni)
    else {
      // end of queue
      getEngine().stop()
      setIsPlaying(false)
      stopTick()
      setCurrentTime(0)
    }
  }, [queue, index, startTrackAt, getEngine, stopTick])

  const prev = useCallback(() => {
    if (!queue.length) return
    if (currentTime > 3) {
      startTrackAt(queue, index)
      return
    }
    const pi = index - 1
    if (pi >= 0) startTrackAt(queue, pi)
    else startTrackAt(queue, index)
  }, [queue, index, currentTime, startTrackAt])

  const toggle = useCallback(() => {
    if (!current) {
      // nothing loaded — start the whole catalogue
      startTrackAt(allTracks, 0)
      return
    }
    const engine = getEngine()
    if (isPlaying) {
      engine.pause()
      setIsPlaying(false)
      stopTick()
    } else {
      engine.resume()
      setIsPlaying(true)
      startTick()
    }
  }, [current, isPlaying, getEngine, startTick, stopTick, startTrackAt])

  const seek = useCallback(
    (time: number) => {
      setCurrentTime(Math.max(0, Math.min(time, duration)))
    },
    [duration],
  )

  const setVolume = useCallback(
    (v: number) => {
      setVolumeState(v)
      getEngine().setVolume(v)
    },
    [getEngine],
  )

  // auto-advance when the virtual clock reaches the track duration
  useEffect(() => {
    if (isPlaying && duration > 0 && currentTime >= duration) {
      next()
    }
  }, [currentTime, duration, isPlaying, next])

  useEffect(() => stopTick, [stopTick])

  return (
    <PlayerContext.Provider
      value={{
        current,
        queue,
        isPlaying,
        currentTime,
        duration,
        volume,
        playTrack,
        playAlbum,
        toggle,
        next,
        prev,
        seek,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within a PlayerProvider')
  return ctx
}
