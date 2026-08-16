// A lightweight ambient synth engine built on the Web Audio API.
// It generates a soft evolving pad per track so playback is actually audible
// in the preview without shipping any external audio files.

type Voice = { osc: OscillatorNode; gain: GainNode }

export class SynthEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private filter: BiquadFilterNode | null = null
  private lfo: OscillatorNode | null = null
  private lfoGain: GainNode | null = null
  private voices: Voice[] = []
  private _volume = 0.7
  private started = false

  private ensureContext() {
    if (this.ctx) return
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    this.ctx = new Ctor()

    this.master = this.ctx.createGain()
    this.master.gain.value = this._volume

    this.filter = this.ctx.createBiquadFilter()
    this.filter.type = 'lowpass'
    this.filter.frequency.value = 1600
    this.filter.Q.value = 0.7

    this.filter.connect(this.master)
    this.master.connect(this.ctx.destination)
  }

  private clearVoices() {
    const now = this.ctx?.currentTime ?? 0
    this.voices.forEach(({ osc, gain }) => {
      try {
        gain.gain.cancelScheduledValues(now)
        gain.gain.setTargetAtTime(0, now, 0.15)
        osc.stop(now + 0.6)
      } catch {
        /* already stopped */
      }
    })
    this.voices = []
    if (this.lfo) {
      try {
        this.lfo.stop(now + 0.6)
      } catch {
        /* noop */
      }
      this.lfo = null
    }
  }

  // Start a soft chord pad tuned around the base frequency of the track.
  loadAndPlay(freq: number) {
    this.ensureContext()
    if (!this.ctx || !this.filter) return
    void this.ctx.resume()
    this.clearVoices()

    const now = this.ctx.currentTime
    const intervals = [1, 1.5, 2, 3] // root, fifth, octave, octave+fifth
    const types: OscillatorType[] = ['sine', 'triangle', 'sine', 'sawtooth']
    const levels = [0.22, 0.14, 0.1, 0.045]

    intervals.forEach((mult, i) => {
      const osc = this.ctx!.createOscillator()
      const gain = this.ctx!.createGain()
      osc.type = types[i]
      osc.frequency.value = freq * mult
      osc.detune.value = (i - 1.5) * 4
      gain.gain.value = 0
      gain.gain.setTargetAtTime(levels[i], now, 0.6)
      osc.connect(gain)
      gain.connect(this.filter!)
      osc.start()
      this.voices.push({ osc, gain })
    })

    // Slow tremolo so the pad breathes like a track.
    this.lfo = this.ctx.createOscillator()
    this.lfoGain = this.ctx.createGain()
    this.lfo.frequency.value = 0.18
    this.lfoGain.gain.value = 320
    this.lfo.connect(this.lfoGain)
    this.lfoGain.connect(this.filter.frequency)
    this.lfo.start()

    this.started = true
  }

  resume() {
    if (!this.ctx) return
    void this.ctx.resume()
    if (this.master) {
      this.master.gain.setTargetAtTime(this._volume, this.ctx.currentTime, 0.1)
    }
  }

  pause() {
    if (!this.ctx || !this.master) return
    // Fade out then suspend to avoid clicks.
    this.master.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.08)
    const ctx = this.ctx
    window.setTimeout(() => {
      void ctx.suspend()
    }, 160)
  }

  stop() {
    this.clearVoices()
    this.started = false
  }

  setVolume(v: number) {
    this._volume = Math.max(0, Math.min(1, v))
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(this._volume, this.ctx.currentTime, 0.05)
    }
  }

  get isStarted() {
    return this.started
  }
}
