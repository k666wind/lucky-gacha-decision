export interface GachaOption {
  id: string;
  emoji: string;
  text: string;
}

export interface OptionPack {
  id: string;
  name: string;
  options: GachaOption[];
}

export type CapsuleRarity = 'white' | 'blue' | 'purple' | 'gold' | 'rainbow';

export type Language = 'en' | 'zh';

export type Screen = 'home' | 'edit' | 'stats' | 'stickers' | 'shop' | 'achievements' | 'settings';

export type ThemeId =
  | 'space'
  | 'candy'
  | 'ocean'
  | 'princess'
  | 'pirate'
  | 'dinosaur'
  | 'forest'
  | 'robot';

export type MascotId = 'fox' | 'rabbit' | 'bear' | 'cat' | 'penguin' | 'frog';

export type CapsuleSkinId = 'default' | 'pastel' | 'neon' | 'gemstone';

export interface Statistics {
  totalSpins: number;
  mostSelected: Record<string, number>;
  lastResult: string;
  rarityCounts: Record<CapsuleRarity, number>;
}

export interface StickerDef {
  id: string;
  emoji: string;
}
