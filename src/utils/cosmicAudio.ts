/**
 * Cosmic Audio Synthesizer (Web Audio API)
 * Procedurally generates cinematic space sound effects for the Big Bang intro:
 * - Low cosmic rumble and rising gravitational energy as stars approach
 * - Deep sub-bass boom & supernova explosion upon collision
 * - Shimmering celestial harmonic chime as the universe is born
 * 
 * Works 100% offline with zero external audio assets, zero latency,
 * and gracefully respects browser autoplay restrictions.
 */

class CosmicAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isSilenced: boolean = false;
  private masterGain: GainNode | null = null;
  private activeSources: Set<AudioScheduledSourceNode> = new Set();
  private approachGain: GainNode | null = null;
  private approachOsc: OscillatorNode | null = null;
  private approachRumbleOsc: OscillatorNode | null = null;

  constructor() {
    // Check if user previously muted
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('siddhi_cosmic_audio_muted') : null;
    if (stored !== null) {
      this.isMuted = stored === 'true';
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private getMasterGain(ctx: AudioContext): GainNode {
    if (!this.masterGain) {
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, ctx.currentTime);
      this.masterGain.connect(ctx.destination);
    }
    return this.masterGain;
  }

  private registerSource(source: AudioScheduledSourceNode): void {
    this.activeSources.add(source);
    source.onended = () => {
      this.activeSources.delete(source);
    };
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    try {
      localStorage.setItem('siddhi_cosmic_audio_muted', String(muted));
    } catch {
      // ignore local storage restrictions
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(muted || this.isSilenced ? 0 : 1, this.ctx.currentTime);
    }
    if (muted && this.approachGain && this.ctx) {
      this.approachGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.approachGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  /**
   * Reset engine for a new intro replay sequence
   */
  public reset(): void {
    this.isSilenced = false;
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
    }
  }

  /**
   * Scene 1: Dual stars approaching sound
   * Low gravitational rumble + rising energy frequency
   */
  public playApproach(durationSeconds: number = 2.0): void {
    if (this.isMuted || this.isSilenced) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const master = this.getMasterGain(ctx);

      // Master approach gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.25, now + durationSeconds);
      masterGain.connect(master);
      this.approachGain = masterGain;

      // 1. Deep Sub-bass Rumble (38Hz -> 75Hz)
      const subOsc = ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(38, now);
      subOsc.frequency.exponentialRampToValueAtTime(75, now + durationSeconds);

      const lowFilter = ctx.createBiquadFilter();
      lowFilter.type = 'lowpass';
      lowFilter.frequency.setValueAtTime(80, now);
      lowFilter.frequency.linearRampToValueAtTime(160, now + durationSeconds);

      subOsc.connect(lowFilter);
      lowFilter.connect(masterGain);
      this.registerSource(subOsc);
      subOsc.start(now);
      subOsc.stop(now + durationSeconds + 0.1);
      this.approachRumbleOsc = subOsc;

      // 2. Rising Energy / Gravitational Tension (110Hz -> 360Hz)
      const energyOsc = ctx.createOscillator();
      energyOsc.type = 'sawtooth';
      energyOsc.frequency.setValueAtTime(110, now);
      energyOsc.frequency.exponentialRampToValueAtTime(380, now + durationSeconds);

      const energyFilter = ctx.createBiquadFilter();
      energyFilter.type = 'bandpass';
      energyFilter.Q.value = 4;
      energyFilter.frequency.setValueAtTime(180, now);
      energyFilter.frequency.exponentialRampToValueAtTime(750, now + durationSeconds);

      const energyGain = ctx.createGain();
      energyGain.gain.setValueAtTime(0.01, now);
      energyGain.gain.exponentialRampToValueAtTime(0.18, now + durationSeconds);

      energyOsc.connect(energyFilter);
      energyFilter.connect(energyGain);
      energyGain.connect(masterGain);

      this.registerSource(energyOsc);
      energyOsc.start(now);
      energyOsc.stop(now + durationSeconds + 0.1);
      this.approachOsc = energyOsc;

      // 3. Stellar Solar Wind (Filtered White Noise)
      const bufferSize = ctx.sampleRate * Math.min(durationSeconds, 4);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.Q.value = 3;
      noiseFilter.frequency.setValueAtTime(250, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(1200, now + durationSeconds);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.005, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.12, now + durationSeconds);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);

      this.registerSource(whiteNoise);
      whiteNoise.start(now);
      whiteNoise.stop(now + durationSeconds + 0.1);
    } catch {
      // Audio autoplay policy blocked or not supported
    }
  }

  /**
   * Sequential skill absorption collision:
   * Crisp, warm resonant harmonic chord with rising pitch as the ball grows
   */
  public playAbsorption(index: number = 0): void {
    if (this.isMuted || this.isSilenced) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const baseFreq = 220 + index * 36; // Ascending harmonic scale
      const master = this.getMasterGain(ctx);

      // 1. Resonant Tone
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.12);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18 + index * 0.02, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(master);
      this.registerSource(osc);
      osc.start(now);
      osc.stop(now + 0.5);

      // 2. Subtle Low Thump
      const thump = ctx.createOscillator();
      thump.type = 'sine';
      thump.frequency.setValueAtTime(90 + index * 12, now);
      thump.frequency.exponentialRampToValueAtTime(45, now + 0.2);

      const thumpGain = ctx.createGain();
      thumpGain.gain.setValueAtTime(0.2, now);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      thump.connect(thumpGain);
      thumpGain.connect(master);
      this.registerSource(thump);
      thump.start(now);
      thump.stop(now + 0.28);
    } catch {
      // Audio autoplay policy blocked
    }
  }

  /**
   * Scene 3: The Cosmic Collision & Explosion
   * Powerful sub-bass impact boom + shockwave noise burst + shimmering resonance
   */
  public playBigBangImpact(): void {
    if (this.isMuted || this.isSilenced) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const master = this.getMasterGain(ctx);

      // 1. Deep Sub-bass Impact Boom (130Hz -> 30Hz)
      const boomOsc = ctx.createOscillator();
      boomOsc.type = 'sine';
      boomOsc.frequency.setValueAtTime(130, now);
      boomOsc.frequency.exponentialRampToValueAtTime(28, now + 1.2);

      const boomGain = ctx.createGain();
      boomGain.gain.setValueAtTime(0.65, now);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      boomOsc.connect(boomGain);
      boomGain.connect(master);
      this.registerSource(boomOsc);
      boomOsc.start(now);
      boomOsc.stop(now + 2.3);

      // 2. Supernova Explosion Noise Transient
      const noiseDuration = 2.0;
      const bufferSize = ctx.sampleRate * noiseDuration;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.45));
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const blastFilter = ctx.createBiquadFilter();
      blastFilter.type = 'lowpass';
      blastFilter.frequency.setValueAtTime(3200, now);
      blastFilter.frequency.exponentialRampToValueAtTime(80, now + 1.8);

      const blastGain = ctx.createGain();
      blastGain.gain.setValueAtTime(0.5, now);
      blastGain.gain.exponentialRampToValueAtTime(0.001, now + 1.9);

      noiseSource.connect(blastFilter);
      blastFilter.connect(blastGain);
      blastGain.connect(master);
      this.registerSource(noiseSource);
      noiseSource.start(now);
      noiseSource.stop(now + 2.0);

      // 3. Shimmering Celestial Harmonics (Birth of stars / cosmos)
      const celestialFreqs = [528, 660, 792, 1056, 1320, 1584];
      celestialFreqs.forEach((freq, idx) => {
        const chimeOsc = ctx.createOscillator();
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(freq * (1 + (Math.random() - 0.5) * 0.01), now);

        const chimeGain = ctx.createGain();
        const startDelay = 0.05 + idx * 0.04;
        chimeGain.gain.setValueAtTime(0.0001, now);
        chimeGain.gain.setValueAtTime(0.08 / (idx + 1), now + startDelay);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2 + idx * 0.2);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(master);
        this.registerSource(chimeOsc);
        chimeOsc.start(now + startDelay);
        chimeOsc.stop(now + 3.5 + idx * 0.2);
      });
    } catch {
      // Audio autoplay policy blocked
    }
  }

  /**
   * Immediately stops all active sound sources, cancels scheduled events,
   * and silences the engine to prevent any restart after animation ends.
   */
  public stopAll(): void {
    this.isSilenced = true;
    try {
      if (this.ctx && this.masterGain) {
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
      this.activeSources.forEach((source) => {
        try {
          source.stop();
          source.disconnect();
        } catch {
          // already stopped
        }
      });
      this.activeSources.clear();

      if (this.approachGain && this.ctx) {
        this.approachGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.approachGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
      if (this.approachOsc) {
        try {
          this.approachOsc.stop();
        } catch {
          // already stopped
        }
        this.approachOsc = null;
      }
      if (this.approachRumbleOsc) {
        try {
          this.approachRumbleOsc.stop();
        } catch {
          // already stopped
        }
        this.approachRumbleOsc = null;
      }
    } catch {
      // Ignore
    }
  }
}

export const cosmicAudio = new CosmicAudioEngine();
