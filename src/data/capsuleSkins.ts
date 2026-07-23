import type { CapsuleSkinId } from '../types';

export interface CapsuleSkinDef {
  id: CapsuleSkinId;
  nameKey: string;
  cost: number;
  colors: string[];
}

export const CAPSULE_SKINS: CapsuleSkinDef[] = [
  {
    id: 'default',
    nameKey: 'skinDefault',
    cost: 0,
    colors: ['#ff6fa8', '#4cd9e8', '#ffd86b', '#a06cff', '#7ee787'],
  },
  {
    id: 'pastel',
    nameKey: 'skinPastel',
    cost: 25,
    colors: ['#ffd1dc', '#c9f0ff', '#fff5ba', '#e0c9ff', '#d4ffd9'],
  },
  {
    id: 'neon',
    nameKey: 'skinNeon',
    cost: 45,
    colors: ['#ff2e88', '#00f0ff', '#faff00', '#b400ff', '#00ff85'],
  },
  {
    id: 'gemstone',
    nameKey: 'skinGemstone',
    cost: 65,
    colors: ['#e0115f', '#0f52ba', '#ffd700', '#9966cc', '#50c878'],
  },
];

export function getCapsuleSkin(id: CapsuleSkinId): CapsuleSkinDef {
  return CAPSULE_SKINS.find((s) => s.id === id) ?? CAPSULE_SKINS[0];
}
