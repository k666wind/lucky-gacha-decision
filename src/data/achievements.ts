export interface AchievementCheckState {
  totalSpins: number;
  rarityCounts: Record<string, number>;
  stickerCount: number; // unique stickers collected
  totalStickerPoolSize: number;
  unlockedThemesCount: number;
  totalThemesCount: number;
  unlockedMascotsCount: number;
  totalMascotsCount: number;
}

export interface AchievementDef {
  id: string;
  nameKey: string;
  descKey: string;
  emoji: string;
  check: (s: AchievementCheckState) => boolean;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'first_spin',
    nameKey: 'achFirstSpin',
    descKey: 'achFirstSpinDesc',
    emoji: '🎯',
    check: (s) => s.totalSpins >= 1,
  },
  {
    id: 'ten_spins',
    nameKey: 'achTenSpins',
    descKey: 'achTenSpinsDesc',
    emoji: '🔟',
    check: (s) => s.totalSpins >= 10,
  },
  {
    id: 'fifty_spins',
    nameKey: 'achFiftySpins',
    descKey: 'achFiftySpinsDesc',
    emoji: '🎖️',
    check: (s) => s.totalSpins >= 50,
  },
  {
    id: 'hundred_spins',
    nameKey: 'achHundredSpins',
    descKey: 'achHundredSpinsDesc',
    emoji: '💯',
    check: (s) => s.totalSpins >= 100,
  },
  {
    id: 'five_hundred_spins',
    nameKey: 'achFiveHundredSpins',
    descKey: 'achFiveHundredSpinsDesc',
    emoji: '👑',
    check: (s) => s.totalSpins >= 500,
  },
  {
    id: 'first_gold',
    nameKey: 'achFirstGold',
    descKey: 'achFirstGoldDesc',
    emoji: '🥇',
    check: (s) => (s.rarityCounts.gold || 0) >= 1,
  },
  {
    id: 'first_rainbow',
    nameKey: 'achFirstRainbow',
    descKey: 'achFirstRainbowDesc',
    emoji: '🌈',
    check: (s) => (s.rarityCounts.rainbow || 0) >= 1,
  },
  {
    id: 'stickers_10',
    nameKey: 'achStickers10',
    descKey: 'achStickers10Desc',
    emoji: '📔',
    check: (s) => s.stickerCount >= 10,
  },
  {
    id: 'stickers_all',
    nameKey: 'achStickersAll',
    descKey: 'achStickersAllDesc',
    emoji: '📚',
    check: (s) => s.stickerCount >= s.totalStickerPoolSize,
  },
  {
    id: 'all_themes',
    nameKey: 'achAllThemes',
    descKey: 'achAllThemesDesc',
    emoji: '🎨',
    check: (s) => s.unlockedThemesCount >= s.totalThemesCount,
  },
  {
    id: 'all_mascots',
    nameKey: 'achAllMascots',
    descKey: 'achAllMascotsDesc',
    emoji: '🐾',
    check: (s) => s.unlockedMascotsCount >= s.totalMascotsCount,
  },
];
