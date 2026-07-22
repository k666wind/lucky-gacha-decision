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

export type Screen = 'home' | 'edit';

export interface Statistics {
  totalSpins: number;
  mostSelected: Record<string, number>;
  lastResult: string;
}
