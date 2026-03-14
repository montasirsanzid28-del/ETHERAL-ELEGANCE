export class AudioEngine {
  private ctx: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;
  private isPlaying = false;

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  private start() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    
    this.gainNode = this.ctx.createGain();
    this.gainNode.connect(this.ctx.destination);
    this.gainNode.gain.value = 0;
    this.gainNode.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 2); // Fade in

    // Ethereal chord: Cmaj9 (C, E, G, B, D)
    const frequencies = [130.81, 164.81, 196.00, 246.94, 293.66];
    
    frequencies.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      // Slow LFO for ethereal pulsing
      const lfo = this.ctx!.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.05 + (i * 0.02); // Different pulse rates
      
      const lfoGain = this.ctx!.createGain();
      lfoGain.gain.value = 5;
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      
      // Panning
      const panner = this.ctx!.createStereoPanner();
      panner.pan.value = (i % 2 === 0 ? 1 : -1) * 0.5;
      
      osc.connect(panner);
      panner.connect(this.gainNode!);
      
      osc.start();
      lfo.start();
      this.oscillators.push(osc, lfo);
    });
    
    this.isPlaying = true;
  }

  private stop() {
    if (!this.ctx || !this.gainNode) return;
    
    this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 2); // Fade out
    
    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try { osc.stop(); } catch (e) {}
      });
      this.oscillators = [];
      this.isPlaying = false;
    }, 2100);
  }
}
