import type { StickerDef } from '../types';

export const STICKER_POOL: StickerDef[] = [
  { id: 'pizza', emoji: '🍕' },
  { id: 'burger', emoji: '🍔' },
  { id: 'noodles', emoji: '🍜' },
  { id: 'sushi', emoji: '🍣' },
  { id: 'movie', emoji: '🎬' },
  { id: 'beach', emoji: '🏖' },
  { id: 'game', emoji: '🎮' },
  { id: 'star', emoji: '⭐' },
  { id: 'rainbow', emoji: '🌈' },
  { id: 'rocket', emoji: '🚀' },
  { id: 'planet', emoji: '🪐' },
  { id: 'comet', emoji: '☄️' },
  { id: 'alien', emoji: '👽' },
  { id: 'moon', emoji: '🌙' },
  { id: 'unicorn', emoji: '🦄' },
  { id: 'cake', emoji: '🎂' },
  { id: 'balloon', emoji: '🎈' },
  { id: 'gem', emoji: '💎' },
  { id: 'trophy', emoji: '🏆' },
  { id: 'sparkles', emoji: '✨' },
];

export function rollSticker(): StickerDef {
  return STICKER_POOL[Math.floor(Math.random() * STICKER_POOL.length)];
}
