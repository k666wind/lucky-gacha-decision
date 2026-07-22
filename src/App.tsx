import React, { useState } from 'react';
import { useGameStore } from './store/useGameStore';
import { I18nProvider, useI18n } from './i18n';
import { GachaMachine } from './components/GachaMachine/GachaMachine';
import { Mascot } from './components/Mascot/Mascot';
import { PackSelector } from './components/PackSelector/PackSelector';
import { OptionEditor } from './components/OptionEditor/OptionEditor';
import { ResultCard } from './components/ResultCard/ResultCard';
import { pickRandomOption, rollCapsuleRarity } from './utils/random';
import { playSfx } from './utils/sound';
import type { CapsuleRarity, GachaOption, Screen } from './types';
import './App.css';

const SPIN_DURATION_MS = 2900;

const AppInner: React.FC = () => {
  const { t } = useI18n();
  const language = useGameStore((s) => s.language);
  const setLanguage = useGameStore((s) => s.setLanguage);
  const sound = useGameStore((s) => s.sound);
  const toggleSound = useGameStore((s) => s.toggleSound);
  const packs = useGameStore((s) => s.packs);
  const currentPackId = useGameStore((s) => s.currentPackId);
  const recordSpin = useGameStore((s) => s.recordSpin);

  const pack = packs.find((p) => p.id === currentPackId) ?? packs[0];

  const [screen, setScreen] = useState<Screen>('home');
  const [spinning, setSpinning] = useState(false);
  const [rarity, setRarity] = useState<CapsuleRarity>('white');
  const [result, setResult] = useState<GachaOption | null>(null);
  const [mascotMessage, setMascotMessage] = useState('');

  const canSpin = pack.options.length >= 2 && !spinning;

  const handleSpin = () => {
    if (pack.options.length < 2) {
      setMascotMessage(t('needOptions'));
      return;
    }
    setSpinning(true);
    setResult(null);
    setRarity(rollCapsuleRarity());
    setMascotMessage(t('mascotHints')[0]);

    playSfx('click', sound);
    setTimeout(() => playSfx('rotate', sound), 150);
    setTimeout(() => playSfx('shake', sound), 700);
    setTimeout(() => playSfx('bounce', sound), 1900);
    setTimeout(() => playSfx('open', sound), 2600);

    setTimeout(() => {
      const picked = pickRandomOption(pack.options);
      recordSpin(picked);
      setResult(picked);
      setSpinning(false);
      setMascotMessage(t('mascotResult', { item: `${picked.emoji} ${picked.text}` }));
      playSfx('winner', sound);
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
          <Mascot message={mascotMessage} />

          <GachaMachine spinning={spinning} rarity={rarity} />

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

      {result && (
        <ResultCard option={result} onSpinAgain={handleSpinAgain} onDone={handleDone} />
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
