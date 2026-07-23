import type { MascotId } from '../types';

export interface MascotDef {
  id: MascotId;
  nameKey: string;
  cost: number;
  emoji: string;
}

export const MASCOTS: MascotDef[] = [
  { id: 'fox', nameKey: 'mascotFox', cost: 0, emoji: '🦊' },
  { id: 'rabbit', nameKey: 'mascotRabbit', cost: 30, emoji: '🐰' },
  { id: 'bear', nameKey: 'mascotBear', cost: 30, emoji: '🐻' },
  { id: 'cat', nameKey: 'mascotCat', cost: 50, emoji: '🐱' },
  { id: 'penguin', nameKey: 'mascotPenguin', cost: 50, emoji: '🐧' },
  { id: 'frog', nameKey: 'mascotFrog', cost: 70, emoji: '🐸' },
];

export function getMascot(id: MascotId): MascotDef {
  return MASCOTS.find((m) => m.id === id) ?? MASCOTS[0];
}
