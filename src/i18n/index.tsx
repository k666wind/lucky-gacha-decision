import React, { createContext, useContext, useMemo } from 'react';
import en from './en.json';
import zh from './zh.json';
import type { Language } from '../types';

const dictionaries: Record<Language, Record<string, any>> = { en, zh };

interface I18nContextValue {
  t: (key: string, vars?: Record<string, string>) => any;
  lang: Language;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{ lang: Language; children: React.ReactNode }> = ({
  lang,
  children,
}) => {
  const value = useMemo<I18nContextValue>(() => {
    const dict = dictionaries[lang] || dictionaries.en;
    const t = (key: string, vars?: Record<string, string>) => {
      let val = dict[key] ?? key;
      if (typeof val === 'string' && vars) {
        Object.entries(vars).forEach(([k, v]) => {
          val = val.replace(`{${k}}`, v);
        });
      }
      return val;
    };
    return { t, lang };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
