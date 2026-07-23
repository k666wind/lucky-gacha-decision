import React, { useEffect, useState } from 'react';
import { useGameStore } from './store/useGameStore';
import { I18nProvider, useI18n } from './i18n';
import { GachaMachine } from './components/GachaMachine/GachaMachine';
import { Mascot } from './components/Mascot/Mascot';
import { PackSelector } from './components/PackSelector/PackSelector';
import { OptionEditor } from './components/OptionEditor/OptionEditor';
import { ResultCard } from './components/ResultCard/ResultCard';
import { Statistics } from './components/Statistics/Statistics';
import { StickerBook } from './components/StickerBook/StickerBook';
import { Shop } from './components/Shop/Shop';
import { Achievements } from './components/Achievements/Achievements';
import { Settings } from './components/Settings/Settings';
import { AchievementToast } from './components/AchievementToast/AchievementToast';
import { pickRandomOption, rollCapsuleRarity } from './utils/random';
import { playSfx } from './utils/sound';
import { getTheme } from './data/themes';
import { getCapsuleSkin } from './data/capsuleSkins';
import type { CapsuleRarity, GachaOption, Screen } from './types';
import { STICKER_POOL } from './data/stickers';
import './App.css';

const SPIN_DURATION_MS = 2900;

function useApplyReduceMotion(enabled: boolean) {
  useEffect(() => {
    document.body.classList.toggle('reduce-motion', enabled);
  }, [enabled]);
}

function useApplyTheme(themeId: string) {
  useEffect(() => {
    const theme = getTheme(themeId as any);
    Object.entries(theme.vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [themeId]);
}

const AppInner: React.FC = () => {
  const { t } = useI18n();
  const language = useGameStore((s) => s.language);
  const setLanguage = useGameStore((s) => s.setLanguage);
  const sound = useGameStore((s) => s.sound);
  const toggleSound = useGameStore((s) => s.toggleSound);
  const packs = useGameStore((s) => s.packs);
  const currentPackId = useGameStore((s) => s.currentPackId);
  const recordSpin = useGameStore((s) => s.recordSpin);
  const coins = useGameStore((s) => s.coins);
  const currentTheme = useGameStore((s) => s.currentTheme);
  const currentMascot = useGameStore((s) => s.currentMascot);
  const currentCapsuleSkin = useGameStore((s) => s.currentCapsuleSkin);
  const checkAchievements = useGameStore((s) => s.checkAchievements);
  const reduceMotion = useGameStore((s) => s.reduceMotion);

  useApplyTheme(currentTheme);
  useApplyReduceMotion(reduceMotion);

  const pack = packs.find((p) => p.id === currentPackId) ?? packs[0];
  const skinColors = getCapsuleSkin(currentCapsuleSkin).colors;

  const [screen, setScreen] = useState<Screen>('home');
  const [spinning, setSpinning] = useState(false);
  const [rarity, setRarity] = useState<CapsuleRarity>('white');
  const [result, setResult] = useState<GachaOption | null>(null);
  const [rewardCoins, setRewardCoins] = useState(0);
  const [rewardSticker, setRewardSticker] = useState('');
  const [mascotMessage, setMascotMessage] = useState('');
  const [achievementQueue, setAchievementQueue] = useState<string[]>([]);

  const canSpin = pack.options.length >= 2 && !spinning;

  const runAchievementCheck = () => {
    const newly = checkAchievements();
    if (newly.length) setAchievementQueue((q) => [...q, ...newly]);
  };

  const handleSpin = () => {
    if (pack.options.length < 2) {
      setMascotMessage(t('needOptions'));
      return;
    }
    const rolledRarity = rollCapsuleRarity();
    setSpinning(true);
    setResult(null);
    setRarity(rolledRarity);
    setMascotMessage(t('mascotHints')[0]);

    playSfx('click', sound);
    setTimeout(() => playSfx('rotate', sound), 150);
    setTimeout(() => playSfx('shake', sound), 700);
    setTimeout(() => playSfx('bounce', sound), 1900);
    setTimeout(() => playSfx('open', sound), 2600);

    setTimeout(() => {
      const picked = pickRandomOption(pack.options);
      const { newSticker, coinsEarned } = recordSpin(picked, rolledRarity);
      setResult(picked);
      setSpinning(false);
      setRewardCoins(coinsEarned);
      setRewardSticker(STICKER_POOL.find((s) => s.id === newSticker)?.emoji || '');
      setMascotMessage(t('mascotResult', { item: `${picked.emoji} ${picked.text}` }));
      playSfx('winner', sound);
      runAchievementCheck();
    }, SPIN_DURATION_MS);
  };

  const handleSpinAgain = () => {
    setResult(null);
    handleSpin();
  };

  const handleDone = () => {
    setResult(null);
    setMascotMessage('');
  };

  return (
    <div className="app">
      <div className="starfield" />

      <header className="app__topbar">
        <h1 className="app__title">🪐 {t('appName')}</h1>
        <div className="app__topbar-controls">
          <div className="app__coins-badge" title={t('coins')}>
            🪙 {coins}
          </div>
          <button
            className="app__icon-btn"
            onClick={() => setScreen('stickers')}
            aria-label={t('stickerBook')}
            title={t('stickerBook')}
          >
            📔
          </button>
          <button
            className="app__icon-btn"
            onClick={() => setScreen('shop')}
            aria-label={t('shop')}
            title={t('shop')}
          >
            🛍️
          </button>
          <button
            className="app__icon-btn"
            onClick={() => setScreen('achievements')}
            aria-label={t('achievements')}
            title={t('achievements')}
          >
            🏆
          </button>
          <button
            className="app__icon-btn"
            onClick={() => setScreen('stats')}
            aria-label={t('statistics')}
            title={t('statistics')}
          >
            📊
          </button>
          <button
            className="app__icon-btn"
            onClick={() => setScreen('settings')}
            aria-label={t('settings')}
            title={t('settings')}
          >
            ⚙️
          </button>
          <button
            className="app__icon-btn"
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            aria-label={t('language')}
            title={t('language')}
          >
            {language === 'zh' ? '中' : 'EN'}
          </button>
          <button
            className="app__icon-btn"
            onClick={toggleSound}
            aria-label={sound ? t('soundOn') : t('soundOff')}
            title={sound ? t('soundOn') : t('soundOff')}
          >
            {sound ? '🔊' : '🔇'}
          </button>
        </div>
      </header>

      {screen === 'home' && (
        <main className="app__home">
          <Mascot message={mascotMessage} species={currentMascot} />

          <GachaMachine spinning={spinning} rarity={rarity} skinColors={skinColors} />

          <button
            className="btn btn--primary app__spin-btn"
            onClick={handleSpin}
            disabled={!canSpin}
          >
            {spinning ? t('spinning') : t('spin')}
          </button>

          <PackSelector />

          <button className="app__edit-link" onClick={() => setScreen('edit')}>
            ⚙️ {t('editOptions')}
          </button>
        </main>
      )}

      {screen === 'edit' && <OptionEditor onBack={() => setScreen('home')} />}
      {screen === 'stats' && <Statistics onBack={() => setScreen('home')} />}
      {screen === 'stickers' && <StickerBook onBack={() => setScreen('home')} />}
      {screen === 'shop' && (
        <Shop onBack={() => setScreen('home')} onAchievementCheck={runAchievementCheck} />
      )}
      {screen === 'achievements' && <Achievements onBack={() => setScreen('home')} />}
      {screen === 'settings' && <Settings onBack={() => setScreen('home')} />}

      {result && (
        <ResultCard
          option={result}
          coinsEarned={rewardCoins}
          stickerEmoji={rewardSticker}
          onSpinAgain={handleSpinAgain}
          onDone={handleDone}
        />
      )}

      {achievementQueue.length > 0 && (
        <AchievementToast
          achievementId={achievementQueue[0]}
          onDismiss={() => setAchievementQueue((q) => q.slice(1))}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  const language = useGameStore((s) => s.language);
  return (
    <I18nProvider lang={language}>
      <AppInner />
    </I18nProvider>
  );
};

export default App;
