// Procedural Web Audio API sound generator tuned for Playful Geometric theme
// Bouncy pops, bubbly clicks, and cheerful game-show chimes with zero external audio assets

class SoundEffects {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    const saved = localStorage.getItem('flashpop_muted') || localStorage.getItem('mnemonique_muted');
    this.isMuted = saved === 'true';
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('flashpop_muted', String(this.isMuted));
    if (this.isMuted && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Bubbly pop click
  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio playback failsafe
    }
  }

  // Tactile card flip flutter
  public playFlip() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Audio failsafe
    }
  }

  // Cheerful game-show correct arpeggio
  public playCorrect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.2, this.ctx!.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + idx * 0.06 + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + idx * 0.06);
        osc.stop(this.ctx!.currentTime + idx * 0.06 + 0.18);
      });
    } catch {
      // Audio failsafe
    }
  }

  // Bouncy cartoon bonk
  public playIncorrect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {
      // Audio failsafe
    }
  }

  // Fanfare for quiz completion
  public playComplete() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const chords = [
        [523.25, 659.25], // C5, E5
        [659.25, 783.99], // E5, G5
        [783.99, 1046.5], // G5, C6
      ];

      chords.forEach((chord, step) => {
        chord.forEach(freq => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + step * 0.12);

          gain.gain.setValueAtTime(0.2, this.ctx!.currentTime + step * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + step * 0.12 + 0.4);

          osc.connect(gain);
          gain.connect(this.ctx!.destination);

          osc.start(this.ctx!.currentTime + step * 0.12);
          osc.stop(this.ctx!.currentTime + step * 0.12 + 0.4);
        });
      });
    } catch {
      // Audio failsafe
    }
  }

  // Speech synthesis
  public speak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (this.isMuted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  }
}

export const sounds = new SoundEffects();
