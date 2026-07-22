// Lightweight sound effects synthesized with the Web Audio API.
// We avoid shipping external audio assets (network-restricted build
// environment) - these are small procedural blips that still give
// good tactile feedback and can be muted via settings.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return ctx;
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  startGain = 0.15,
  delay = 0
) {
  const audioCtx = getCtx();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const now = audioCtx.currentTime + delay;
  gain.gain.setValueAtTime(startGain, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + duration);
}

export const sfx = {
  click: () => tone(440, 0.08, 'square', 0.1),
  rotate: () => {
    tone(300, 0.15, 'triangle', 0.08);
    tone(360, 0.15, 'triangle', 0.08, 0.08);
  },
  shake: () => {
    for (let i = 0; i < 4; i++) tone(200 + i * 20, 0.06, 'square', 0.05, i * 0.06);
  },
  drop: () => tone(180, 0.2, 'sine', 0.12),
  bounce: () => tone(500, 0.1, 'sine', 0.08),
  open: () => {
    tone(600, 0.12, 'triangle', 0.1);
    tone(800, 0.15, 'triangle', 0.1, 0.1);
  },
  winner: () => {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.25, 'sine', 0.12, i * 0.09));
  },
};

export function playSfx(name: keyof typeof sfx, enabled: boolean) {
  if (!enabled) return;
  try {
    sfx[name]();
  } catch {
    // Audio can fail before first user gesture on some browsers - ignore.
  }
}
