import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  GachaOption,
  OptionPack,
  Language,
  Statistics,
  ThemeId,
  MascotId,
  CapsuleSkinId,
  CapsuleRarity,
} from '../types';
import { generateId } from '../utils/random';
import { STICKER_POOL } from '../data/stickers';
import { THEMES } from '../data/themes';
import { MASCOTS } from '../data/mascots';
import { CAPSULE_SKINS } from '../data/capsuleSkins';
import { ACHIEVEMENTS, type AchievementCheckState } from '../data/achievements';

const DEFAULT_PACK: OptionPack = {
  id: 'pack-default',
  name: 'My Choices',
  options: [
    { id: generateId(), emoji: '🍕', text: 'Pizza' },
    { id: generateId(), emoji: '🍔', text: 'Burger' },
    { id: generateId(), emoji: '🍜', text: 'Noodles' },
    { id: generateId(), emoji: '🎬', text: 'Movie Night' },
  ],
};

const EMPTY_RARITY_COUNTS: Record<CapsuleRarity, number> = {
  white: 0,
  blue: 0,
  purple: 0,
  gold: 0,
  rainbow: 0,
};

export interface ExportedData {
  packs: OptionPack[];
  currentPackId: string;
  language: Language;
  sound: boolean;
  reduceMotion: boolean;
  statistics: Statistics;
  coins: number;
  stickers: Record<string, number>;
  unlockedThemes: ThemeId[];
  unlockedMascots: MascotId[];
  unlockedCapsuleSkins: CapsuleSkinId[];
  currentTheme: ThemeId;
  currentMascot: MascotId;
  currentCapsuleSkin: CapsuleSkinId;
  achievementsUnlocked: string[];
}

interface GameState extends ExportedData {
  setLanguage: (lang: Language) => void;
  toggleSound: () => void;
  toggleReduceMotion: () => void;

  setCurrentPack: (id: string) => void;
  addPack: (name: string) => void;
  renamePack: (id: string, name: string) => void;
  deletePack: (id: string) => void;

  addOption: (packId: string, option: Omit<GachaOption, 'id'>) => void;
  updateOption: (packId: string, optionId: string, updates: Partial<GachaOption>) => void;
  deleteOption: (packId: string, optionId: string) => void;
  reorderOptions: (packId: string, options: GachaOption[]) => void;
  shuffleOptions: (packId: string) => void;
  clearOptions: (packId: string) => void;

  recordSpin: (option: GachaOption, rarity: CapsuleRarity) => { newSticker: string; coinsEarned: number };
  resetStatistics: () => void;

  unlockTheme: (id: ThemeId) => boolean;
  unlockMascot: (id: MascotId) => boolean;
  unlockCapsuleSkin: (id: CapsuleSkinId) => boolean;
  setCurrentTheme: (id: ThemeId) => void;
  setCurrentMascot: (id: MascotId) => void;
  setCurrentCapsuleSkin: (id: CapsuleSkinId) => void;

  checkAchievements: () => string[];

  resetEverything: () => void;
  exportData: () => ExportedData;
  importData: (data: Partial<ExportedData>) => void;
}

function buildAchievementCheckState(s: GameState): AchievementCheckState {
  return {
    totalSpins: s.statistics.totalSpins,
    rarityCounts: s.statistics.rarityCounts,
    stickerCount: Object.keys(s.stickers).length,
    totalStickerPoolSize: STICKER_POOL.length,
    unlockedThemesCount: s.unlockedThemes.length,
    totalThemesCount: THEMES.length,
    unlockedMascotsCount: s.unlockedMascots.length,
    totalMascotsCount: MASCOTS.length,
  };
}

const initialState: ExportedData = {
  packs: [DEFAULT_PACK],
  currentPackId: DEFAULT_PACK.id,
  language: 'zh',
  sound: true,
  reduceMotion: false,
  statistics: { totalSpins: 0, mostSelected: {}, lastResult: '', rarityCounts: { ...EMPTY_RARITY_COUNTS } },
  coins: 0,
  stickers: {},
  unlockedThemes: ['space'],
  unlockedMascots: ['fox'],
  unlockedCapsuleSkins: ['default'],
  currentTheme: 'space',
  currentMascot: 'fox',
  currentCapsuleSkin: 'default',
  achievementsUnlocked: [],
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setLanguage: (language) => set({ language }),
      toggleSound: () => set((s) => ({ sound: !s.sound })),
      toggleReduceMotion: () => set((s) => ({ reduceMotion: !s.reduceMotion })),

      setCurrentPack: (id) => set({ currentPackId: id }),

      addPack: (name) =>
        set((s) => {
          const pack: OptionPack = { id: generateId(), name, options: [] };
          return { packs: [...s.packs, pack], currentPackId: pack.id };
        }),

      renamePack: (id, name) =>
        set((s) => ({
          packs: s.packs.map((p) => (p.id === id ? { ...p, name } : p)),
        })),

      deletePack: (id) =>
        set((s) => {
          const packs = s.packs.filter((p) => p.id !== id);
          const safePacks = packs.length ? packs : [{ ...DEFAULT_PACK, id: generateId() }];
          const currentPackId =
            s.currentPackId === id ? safePacks[0].id : s.currentPackId;
          return { packs: safePacks, currentPackId };
        }),

      addOption: (packId, option) =>
        set((s) => ({
          packs: s.packs.map((p) =>
            p.id === packId
              ? { ...p, options: [...p.options, { ...option, id: generateId() }] }
              : p
          ),
        })),

      updateOption: (packId, optionId, updates) =>
        set((s) => ({
          packs: s.packs.map((p) =>
            p.id === packId
              ? {
                  ...p,
                  options: p.options.map((o) =>
                    o.id === optionId ? { ...o, ...updates } : o
                  ),
                }
              : p
          ),
        })),

      deleteOption: (packId, optionId) =>
        set((s) => ({
          packs: s.packs.map((p) =>
            p.id === packId
              ? { ...p, options: p.options.filter((o) => o.id !== optionId) }
              : p
          ),
        })),

      reorderOptions: (packId, options) =>
        set((s) => ({
          packs: s.packs.map((p) => (p.id === packId ? { ...p, options } : p)),
        })),

      shuffleOptions: (packId) =>
        set((s) => ({
          packs: s.packs.map((p) => {
            if (p.id !== packId) return p;
            const shuffled = [...p.options];
            for (let i = shuffled.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return { ...p, options: shuffled };
          }),
        })),

      clearOptions: (packId) =>
        set((s) => ({
          packs: s.packs.map((p) => (p.id === packId ? { ...p, options: [] } : p)),
        })),

      recordSpin: (option, rarity) => {
        const coinsEarned = 5;
        const sticker = STICKER_POOL[Math.floor(Math.random() * STICKER_POOL.length)];
        set((s) => {
          const key = `${option.emoji} ${option.text}`;
          const mostSelected = { ...s.statistics.mostSelected };
          mostSelected[key] = (mostSelected[key] || 0) + 1;
          const rarityCounts = { ...s.statistics.rarityCounts };
          rarityCounts[rarity] = (rarityCounts[rarity] || 0) + 1;
          const stickers = { ...s.stickers };
          stickers[sticker.id] = (stickers[sticker.id] || 0) + 1;
          return {
            statistics: {
              totalSpins: s.statistics.totalSpins + 1,
              mostSelected,
              lastResult: key,
              rarityCounts,
            },
            coins: s.coins + coinsEarned,
            stickers,
          };
        });
        return { newSticker: sticker.id, coinsEarned };
      },

      resetStatistics: () =>
        set({
          statistics: { totalSpins: 0, mostSelected: {}, lastResult: '', rarityCounts: { ...EMPTY_RARITY_COUNTS } },
        }),

      unlockTheme: (id) => {
        const s = get();
        if (s.unlockedThemes.includes(id)) return true;
        const def = THEMES.find((t) => t.id === id);
        if (!def || s.coins < def.cost) return false;
        set({ coins: s.coins - def.cost, unlockedThemes: [...s.unlockedThemes, id] });
        return true;
      },

      unlockMascot: (id) => {
        const s = get();
        if (s.unlockedMascots.includes(id)) return true;
        const def = MASCOTS.find((m) => m.id === id);
        if (!def || s.coins < def.cost) return false;
        set({ coins: s.coins - def.cost, unlockedMascots: [...s.unlockedMascots, id] });
        return true;
      },

      unlockCapsuleSkin: (id) => {
        const s = get();
        if (s.unlockedCapsuleSkins.includes(id)) return true;
        const def = CAPSULE_SKINS.find((c) => c.id === id);
        if (!def || s.coins < def.cost) return false;
        set({ coins: s.coins - def.cost, unlockedCapsuleSkins: [...s.unlockedCapsuleSkins, id] });
        return true;
      },

      setCurrentTheme: (id) => set({ currentTheme: id }),
      setCurrentMascot: (id) => set({ currentMascot: id }),
      setCurrentCapsuleSkin: (id) => set({ currentCapsuleSkin: id }),

      checkAchievements: () => {
        const s = get();
        const checkState = buildAchievementCheckState(s);
        const newly: string[] = [];
        ACHIEVEMENTS.forEach((a) => {
          if (!s.achievementsUnlocked.includes(a.id) && a.check(checkState)) {
            newly.push(a.id);
          }
        });
        if (newly.length) {
          set({ achievementsUnlocked: [...s.achievementsUnlocked, ...newly] });
        }
        return newly;
      },

      resetEverything: () => set({ ...initialState, packs: [{ ...DEFAULT_PACK, id: generateId() }] }),

      exportData: () => {
        const s = get();
        const {
          packs,
          currentPackId,
          language,
          sound,
          reduceMotion,
          statistics,
          coins,
          stickers,
          unlockedThemes,
          unlockedMascots,
          unlockedCapsuleSkins,
          currentTheme,
          currentMascot,
          currentCapsuleSkin,
          achievementsUnlocked,
        } = s;
        return {
          packs,
          currentPackId,
          language,
          sound,
          reduceMotion,
          statistics,
          coins,
          stickers,
          unlockedThemes,
          unlockedMascots,
          unlockedCapsuleSkins,
          currentTheme,
          currentMascot,
          currentCapsuleSkin,
          achievementsUnlocked,
        };
      },

      importData: (data) => set((s) => ({ ...s, ...data })),
    }),
    {
      name: 'lucky-gacha-decision-storage',
      version: 2,
    }
  )
);
