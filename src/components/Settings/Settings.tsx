import React, { useRef, useState } from 'react';
import './Settings.css';
import { useGameStore } from '../../store/useGameStore';
import { useI18n } from '../../i18n';
import { ImportConfirmModal } from '../ImportConfirmModal/ImportConfirmModal';
import type { Language } from '../../types';

interface SettingsProps {
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const { t } = useI18n();
  const language = useGameStore((s) => s.language);
  const setLanguage = useGameStore((s) => s.setLanguage);
  const sound = useGameStore((s) => s.sound);
  const toggleSound = useGameStore((s) => s.toggleSound);
  const reduceMotion = useGameStore((s) => s.reduceMotion);
  const toggleReduceMotion = useGameStore((s) => s.toggleReduceMotion);
  const exportData = useGameStore((s) => s.exportData);
  const importData = useGameStore((s) => s.importData);
  const resetEverything = useGameStore((s) => s.resetEverything);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingImport, setPendingImport] = useState<any | null>(null);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LuckyGachaBackup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChosen: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.packs)) {
          window.alert(t('importInvalidFile'));
          return;
        }
        setPendingImport(parsed);
      } catch {
        window.alert(t('importInvalidFile'));
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const confirmImport = () => {
    if (pendingImport) importData(pendingImport);
    setPendingImport(null);
  };

  const handleReset = () => {
    if (window.confirm(t('confirmResetEverything'))) resetEverything();
  };

  return (
    <div className="settings">
      <div className="settings__header">
        <button className="btn btn--secondary" onClick={onBack}>
          ← {t('back')}
        </button>
        <h2>⚙️ {t('settings')}</h2>
      </div>

      <div className="settings__row">
        <span>{t('settingsLanguage')}</span>
        <div className="settings__toggle-group">
          <button
            className={`settings__toggle ${language === 'zh' ? 'settings__toggle--active' : ''}`}
            onClick={() => setLanguage('zh' as Language)}
          >
            中文
          </button>
          <button
            className={`settings__toggle ${language === 'en' ? 'settings__toggle--active' : ''}`}
            onClick={() => setLanguage('en' as Language)}
          >
            EN
          </button>
        </div>
      </div>

      <div className="settings__row">
        <span>{t('settingsSound')}</span>
        <button className="settings__switch" onClick={toggleSound} aria-pressed={sound}>
          {sound ? '🔊 ' + t('soundOn') : '🔇 ' + t('soundOff')}
        </button>
      </div>

      <div className="settings__row">
        <span>{t('settingsReduceMotion')}</span>
        <button
          className="settings__switch"
          onClick={toggleReduceMotion}
          aria-pressed={reduceMotion}
        >
          {reduceMotion ? '✅' : '⬜️'}
        </button>
      </div>

      <h3 className="settings__subheading">{t('settingsData')}</h3>
      <div className="settings__actions">
        <button className="btn btn--secondary" onClick={handleExport}>
          ⬇️ {t('exportBackup')}
        </button>
        <button className="btn btn--secondary" onClick={() => fileInputRef.current?.click()}>
          ⬆️ {t('importBackup')}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="settings__hidden-input"
          onChange={handleFileChosen}
        />
      </div>

      <button className="btn btn--danger settings__reset" onClick={handleReset}>
        🗑 {t('resetEverything')}
      </button>

      {pendingImport && (
        <ImportConfirmModal onConfirm={confirmImport} onCancel={() => setPendingImport(null)} />
      )}
    </div>
  );
};
