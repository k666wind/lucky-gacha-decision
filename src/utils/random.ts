import type { CapsuleRarity, GachaOption } from '../types';

/**
 * Picks one option with exactly equal probability for every entry.
 * This is the ONLY function that determines the actual result.
 */
export function pickRandomOption(options: GachaOption[]): GachaOption {
  const index = Math.floor(Math.random() * options.length);
  return options[index];
}

/**
 * Rolls a purely cosmetic capsule rarity. This has ZERO influence on
 * which option is picked - it only changes what the capsule looks like
 * during the animation.
 */
export function rollCapsuleRarity(): CapsuleRarity {
  const roll = Math.random() * 100;
  if (roll < 60) return 'white';
  if (roll < 85) return 'blue';
  if (roll < 95) return 'purple';
  if (roll < 99) return 'gold';
  return 'rainbow';
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
