import React from 'react';
import './Shop.css';
import { useGameStore } from '../../store/useGameStore';
import { useI18n } from '../../i18n';
import { THEMES } from '../../data/themes';
import { MASCOTS } from '../../data/mascots';
import { CAPSULE_SKINS } from '../../data/capsuleSkins';
import type { ThemeId, MascotId, CapsuleSkinId } from '../../types';

interface ShopProps {
  onBack: () => void;
  onAchievementCheck: () => void;
}

export const Shop: React.FC<ShopProps> = ({ onBack, onAchievementCheck }) => {
  const { t } = useI18n();
  const coins = useGameStore((s) => s.coins);
  const unlockedThemes = useGameStore((s) => s.unlockedThemes);
  const unlockedMascots = useGameStore((s) => s.unlockedMascots);
  const unlockedCapsuleSkins = useGameStore((s) => s.unlockedCapsuleSkins);
  const currentTheme = useGameStore((s) => s.currentTheme);
  const currentMascot = useGameStore((s) => s.currentMascot);
  const currentCapsuleSkin = useGameStore((s) => s.currentCapsuleSkin);
  const unlockTheme = useGameStore((s) => s.unlockTheme);
  const unlockMascot = useGameStore((s) => s.unlockMascot);
  const unlockCapsuleSkin = useGameStore((s) => s.unlockCapsuleSkin);
  const setCurrentTheme = useGameStore((s) => s.setCurrentTheme);
  const setCurrentMascot = useGameStore((s) => s.setCurrentMascot);
  const setCurrentCapsuleSkin = useGameStore((s) => s.setCurrentCapsuleSkin);

  const handleUnlockTheme = (id: ThemeId, cost: number) => {
    if (unlockedThemes.includes(id)) {
      setCurrentTheme(id);
      return;
    }
    if (coins < cost) {
      window.alert(t('notEnoughCoins'));
      return;
    }
    if (unlockTheme(id)) {
      setCurrentTheme(id);
      onAchievementCheck();
    }
  };

  const handleUnlockMascot = (id: MascotId, cost: number) => {
    if (unlockedMascots.includes(id)) {
      setCurrentMascot(id);
      return;
    }
    if (coins < cost) {
      window.alert(t('notEnoughCoins'));
      return;
    }
    if (unlockMascot(id)) {
      setCurrentMascot(id);
      onAchievementCheck();
    }
  };

  const handleUnlockSkin = (id: CapsuleSkinId, cost: number) => {
    if (unlockedCapsuleSkins.includes(id)) {
      setCurrentCapsuleSkin(id);
      return;
    }
    if (coins < cost) {
      window.alert(t('notEnoughCoins'));
      return;
    }
    if (unlockCapsuleSkin(id)) {
      setCurrentCapsuleSkin(id);
    }
  };

  return (
    <div className="shop">
      <div className="shop__header">
        <button className="btn btn--secondary" onClick={onBack}>
          ← {t('back')}
        </button>
        <h2>🛍️ {t('shop')}</h2>
        <div className="shop__coins">🪙 {coins}</div>
      </div>

      <section className="shop__section">
        <h3>{t('shopThemes')}</h3>
        <div className="shop__grid">
          {THEMES.map((theme) => {
            const owned = unlockedThemes.includes(theme.id);
            const active = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                className={`shop__item ${active ? 'shop__item--active' : ''}`}
                onClick={() => handleUnlockTheme(theme.id, theme.cost)}
              >
                <span className="shop__item-emoji">{theme.emoji}</span>
                <span className="shop__item-name">{t(theme.nameKey)}</span>
                <span className="shop__item-status">
                  {active ? t('selected') : owned ? t('select') : `🪙 ${theme.cost}`}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="shop__section">
        <h3>{t('shopMascots')}</h3>
        <div className="shop__grid">
          {MASCOTS.map((mascot) => {
            const owned = unlockedMascots.includes(mascot.id);
            const active = currentMascot === mascot.id;
            return (
              <button
                key={mascot.id}
                className={`shop__item ${active ? 'shop__item--active' : ''}`}
                onClick={() => handleUnlockMascot(mascot.id, mascot.cost)}
              >
                <span className="shop__item-emoji">{mascot.emoji}</span>
                <span className="shop__item-name">{t(mascot.nameKey)}</span>
                <span className="shop__item-status">
                  {active ? t('selected') : owned ? t('select') : `🪙 ${mascot.cost}`}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="shop__section">
        <h3>{t('shopCapsuleSkins')}</h3>
        <div className="shop__grid">
          {CAPSULE_SKINS.map((skin) => {
            const owned = unlockedCapsuleSkins.includes(skin.id);
            const active = currentCapsuleSkin === skin.id;
            return (
              <button
                key={skin.id}
                className={`shop__item ${active ? 'shop__item--active' : ''}`}
                onClick={() => handleUnlockSkin(skin.id, skin.cost)}
              >
                <span className="shop__item-dots">
                  {skin.colors.slice(0, 4).map((c, i) => (
                    <span key={i} className="shop__dot" style={{ background: c }} />
                  ))}
                </span>
                <span className="shop__item-name">{t(skin.nameKey)}</span>
                <span className="shop__item-status">
                  {active ? t('selected') : owned ? t('select') : `🪙 ${skin.cost}`}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
