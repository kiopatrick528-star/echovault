export type Accent = 'cyan' | 'violet' | 'magenta'

export type Track = {
  id: string
  title: string
  artist: string
  album: string
  albumId: string
  cover: string
  duration: number // seconds
  freq: number // base frequency (Hz) for the ambient synth engine
  accent: Accent
}

export type Album = {
  id: string
  title: string
  artist: string
  cover: string
  year: number
  genre: string
  accent: Accent
  trackIds: string[]
}

export const albums: Album[] = [
  {
    id: 'neon-cathedral',
    title: 'Neon Cathedral',
    artist: 'VOID SIGNAL',
    cover: '/covers/neon-cathedral.png',
    year: 2087,
    genre: 'Synthwave',
    accent: 'cyan',
    trackIds: ['neon-rain', 'crimson-echo', 'glass-choir'],
  },
  {
    id: 'chromatic-dusk',
    title: 'Chromatic Dusk',
    artist: 'AZTEC',
    cover: '/covers/chromatic-dusk.png',
    year: 2086,
    genre: 'Darkwave',
    accent: 'magenta',
    trackIds: ['chromatic-dusk', 'rooftop-mirage', 'afterglow'],
  },
  {
    id: 'hollow-frequencies',
    title: 'Hollow Frequencies',
    artist: 'Mira K.',
    cover: '/covers/hollow-frequencies.png',
    year: 2085,
    genre: 'Ambient',
    accent: 'violet',
    trackIds: ['hollow-drift', 'ghost-frequency', 'resonance'],
  },
  {
    id: 'static-bloom',
    title: 'Static Bloom',
    artist: 'NOVA-7',
    cover: '/covers/static-bloom.png',
    year: 2088,
    genre: 'Glitch',
    accent: 'cyan',
    trackIds: ['static-bloom', 'pixel-garden', 'chroma-key'],
  },
  {
    id: 'ghost-protocol',
    title: 'Ghost Protocol',
    artist: 'SYNTH//WAVE',
    cover: '/covers/ghost-protocol.png',
    year: 2087,
    genre: 'Cyber',
    accent: 'magenta',
    trackIds: ['ghost-protocol', 'data-rain', 'phantom-load'],
  },
  {
    id: 'pulse-reactor',
    title: 'Pulse Reactor',
    artist: 'AZTEC',
    cover: '/covers/pulse-reactor.png',
    year: 2088,
    genre: 'Techno',
    accent: 'violet',
    trackIds: ['pulse-reactor', 'core-meltdown', 'hex-chamber'],
  },
]

type TrackSeed = {
  id: string
  title: string
  albumId: string
  duration: number
  freq: number
}

const trackSeeds: TrackSeed[] = [
  { id: 'neon-rain', title: 'Neon Rain', albumId: 'neon-cathedral', duration: 214, freq: 220.0 },
  { id: 'crimson-echo', title: 'Crimson Echo', albumId: 'neon-cathedral', duration: 258, freq: 174.6 },
  { id: 'glass-choir', title: 'Glass Choir', albumId: 'neon-cathedral', duration: 191, freq: 261.6 },
  { id: 'chromatic-dusk', title: 'Chromatic Dusk', albumId: 'chromatic-dusk', duration: 236, freq: 196.0 },
  { id: 'rooftop-mirage', title: 'Rooftop Mirage', albumId: 'chromatic-dusk', duration: 203, freq: 246.9 },
  { id: 'afterglow', title: 'Afterglow', albumId: 'chromatic-dusk', duration: 277, freq: 164.8 },
  { id: 'hollow-drift', title: 'Hollow Drift', albumId: 'hollow-frequencies', duration: 312, freq: 146.8 },
  { id: 'ghost-frequency', title: 'Ghost Frequency', albumId: 'hollow-frequencies', duration: 245, freq: 185.0 },
  { id: 'resonance', title: 'Resonance', albumId: 'hollow-frequencies', duration: 268, freq: 220.0 },
  { id: 'static-bloom', title: 'Static Bloom', albumId: 'static-bloom', duration: 198, freq: 293.7 },
  { id: 'pixel-garden', title: 'Pixel Garden', albumId: 'static-bloom', duration: 224, freq: 329.6 },
  { id: 'chroma-key', title: 'Chroma Key', albumId: 'static-bloom', duration: 187, freq: 261.6 },
  { id: 'ghost-protocol', title: 'Ghost Protocol', albumId: 'ghost-protocol', duration: 251, freq: 155.6 },
  { id: 'data-rain', title: 'Data Rain', albumId: 'ghost-protocol', duration: 229, freq: 207.7 },
  { id: 'phantom-load', title: 'Phantom Load', albumId: 'ghost-protocol', duration: 263, freq: 138.6 },
  { id: 'pulse-reactor', title: 'Pulse Reactor', albumId: 'pulse-reactor', duration: 242, freq: 174.6 },
  { id: 'core-meltdown', title: 'Core Meltdown', albumId: 'pulse-reactor', duration: 289, freq: 130.8 },
  { id: 'hex-chamber', title: 'Hex Chamber', albumId: 'pulse-reactor', duration: 216, freq: 196.0 },
]

export const tracks: Track[] = trackSeeds.map((seed) => {
  const album = albums.find((a) => a.id === seed.albumId)!
  return {
    id: seed.id,
    title: seed.title,
    artist: album.artist,
    album: album.title,
    albumId: album.id,
    cover: album.cover,
    duration: seed.duration,
    freq: seed.freq,
    accent: album.accent,
  }
})

export function getTrack(id: string): Track | undefined {
  return tracks.find((t) => t.id === id)
}

export function getAlbumTracks(albumId: string): Track[] {
  return tracks.filter((t) => t.albumId === albumId)
}

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}
