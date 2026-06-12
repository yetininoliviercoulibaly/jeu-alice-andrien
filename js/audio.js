/* =====================================================================
   PETITS EFFETS SONORES (WebAudio, aucun fichier externe)
   ===================================================================== */

const Sfx = {
  ctx: null,

  _ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  },

  _tone(freq, dur, type = "square", vol = 0.12, when = 0, slideTo = null) {
    const ctx = this._ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  },

  jump()  { this._tone(300, 0.18, "square", 0.08, 0, 600); },
  coin()  { this._tone(900, 0.08, "square", 0.10); this._tone(1300, 0.18, "square", 0.10, 0.08); },
  stomp() { this._tone(220, 0.15, "triangle", 0.15, 0, 80); },
  hurt()  { this._tone(280, 0.3, "sawtooth", 0.12, 0, 90); },
  block() { this._tone(520, 0.1, "square", 0.1); },

  correct() {
    this._tone(523, 0.12, "triangle", 0.14);
    this._tone(659, 0.12, "triangle", 0.14, 0.12);
    this._tone(784, 0.25, "triangle", 0.14, 0.24);
  },
  wrong() {
    this._tone(330, 0.2, "sawtooth", 0.1);
    this._tone(247, 0.35, "sawtooth", 0.1, 0.2);
  },
  win() {
    [523, 587, 659, 784, 1047].forEach((f, i) => this._tone(f, 0.18, "triangle", 0.14, i * 0.13));
  },
  lose() {
    [392, 330, 262].forEach((f, i) => this._tone(f, 0.25, "triangle", 0.12, i * 0.2));
  },
};
