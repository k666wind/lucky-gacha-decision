import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GachaOption, OptionPack, Language, Statistics } from '../types';
import { generateId } from '../utils/random';

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

interface GameState {
  packs: OptionPack[];
  currentPackId: string;
  language: Language;
  sound: boolean;
  reduceMotion: boolean;
  statistics: Statistics;

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

  recordSpin: (option: GachaOption) => void;

  importData: (data: Partial<GameState>) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      packs: [DEFAULT_PACK],
      currentPackId: DEFAULT_PACK.id,
      language: 'zh',
      sound: true,
      reduceMotion: false,
      statistics: { totalSpins: 0, mostSelected: {}, lastResult: '' },

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

      recordSpin: (option) =>
        set((s) => {
          const key = `${option.emoji} ${option.text}`;
          const mostSelected = { ...s.statistics.mostSelected };
          mostSelected[key] = (mostSelected[key] || 0) + 1;
          return {
            statistics: {
              totalSpins: s.statistics.totalSpins + 1,
              mostSelected,
              lastResult: key,
            },
          };
        }),

      importData: (data) => set(() => ({ ...get(), ...data })),
    }),
    {
      name: 'lucky-gacha-decision-storage',
      version: 1,
    }
  )
);
