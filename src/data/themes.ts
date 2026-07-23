import type { ThemeId } from '../types';

export interface ThemeDef {
  id: ThemeId;
  nameKey: string;
  cost: number; // coins, 0 = free/default
  emoji: string;
  vars: Record<string, string>;
}

export const THEMES: ThemeDef[] = [
  {
    id: 'space',
    nameKey: 'themeSpace',
    cost: 0,
    emoji: '🪐',
    vars: {
      '--bg-space': '#0b1026',
      '--bg-space-2': '#161b3d',
      '--nebula-purple': '#6c3baa',
      '--nebula-pink': '#ff6fa8',
      '--star-yellow': '#ffd86b',
      '--accent-cyan': '#4cd9e8',
      '--surface': '#1c2350',
      '--surface-light': '#262d5c',
    },
  },
  {
    id: 'candy',
    nameKey: 'themeCandy',
    cost: 40,
    emoji: '🍬',
    vars: {
      '--bg-space': '#3a1236',
      '--bg-space-2': '#4d1a4a',
      '--nebula-purple': '#c94f9c',
      '--nebula-pink': '#ff8fc7',
      '--star-yellow': '#ffe66d',
      '--accent-cyan': '#7ee8fa',
      '--surface': '#5a2358',
      '--surface-light': '#712c6e',
    },
  },
  {
    id: 'ocean',
    nameKey: 'themeOcean',
    cost: 40,
    emoji: '🌊',
    vars: {
      '--bg-space': '#052236',
      '--bg-space-2': '#0a3049',
      '--nebula-purple': '#1f6f8b',
      '--nebula-pink': '#3ec6c6',
      '--star-yellow': '#ffe08a',
      '--accent-cyan': '#4cd9e8',
      '--surface': '#0e3a54',
      '--surface-light': '#14496a',
    },
  },
  {
    id: 'princess',
    nameKey: 'themePrincess',
    cost: 60,
    emoji: '👑',
    vars: {
      '--bg-space': '#3d1f45',
      '--bg-space-2': '#4c2857',
      '--nebula-purple': '#a05cc7',
      '--nebula-pink': '#ffb6d9',
      '--star-yellow': '#ffe9a8',
      '--accent-cyan': '#e0aaff',
      '--surface': '#5c2f68',
      '--surface-light': '#713980',
    },
  },
  {
    id: 'pirate',
    nameKey: 'themePirate',
    cost: 60,
    emoji: '🏴‍☠️',
    vars: {
      '--bg-space': '#1c1408',
      '--bg-space-2': '#2b2010',
      '--nebula-purple': '#7a5230',
      '--nebula-pink': '#e0a13a',
      '--star-yellow': '#ffd86b',
      '--accent-cyan': '#5fbdb0',
      '--surface': '#3a2c15',
      '--surface-light': '#4a3a1e',
    },
  },
  {
    id: 'dinosaur',
    nameKey: 'themeDinosaur',
    cost: 80,
    emoji: '🦕',
    vars: {
      '--bg-space': '#0f2a1c',
      '--bg-space-2': '#163a26',
      '--nebula-purple': '#3f7a4d',
      '--nebula-pink': '#e07a3f',
      '--star-yellow': '#f2d24b',
      '--accent-cyan': '#7ee787',
      '--surface': '#1e4a2e',
      '--surface-light': '#265c39',
    },
  },
  {
    id: 'forest',
    nameKey: 'themeForest',
    cost: 80,
    emoji: '🌲',
    vars: {
      '--bg-space': '#122015',
      '--bg-space-2': '#1a2e1e',
      '--nebula-purple': '#3f5d3a',
      '--nebula-pink': '#e8b04b',
      '--star-yellow': '#ffe08a',
      '--accent-cyan': '#8fd18f',
      '--surface': '#22391f',
      '--surface-light': '#2c4728',
    },
  },
  {
    id: 'robot',
    nameKey: 'themeRobot',
    cost: 100,
    emoji: '🤖',
    vars: {
      '--bg-space': '#14171f',
      '--bg-space-2': '#1e222e',
      '--nebula-purple': '#5a6472',
      '--nebula-pink': '#ff5c5c',
      '--star-yellow': '#ffd86b',
      '--accent-cyan': '#4cd9e8',
      '--surface': '#242938',
      '--surface-light': '#2f3546',
    },
  },
];

export function getTheme(id: ThemeId): ThemeDef {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
