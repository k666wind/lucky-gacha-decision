import React from 'react';
import './Achievements.css';
import { useGameStore } from '../../store/useGameStore';
import { useI18n } from '../../i18n';
import { ACHIEVEMENTS } from '../../data/achievements';

interface AchievementsProps {
  onBack: () => void;
}

export const Achievements: React.FC<AchievementsProps> = ({ onBack }) => {
  const { t } = useI18n();
  const unlocked = useGameStore((s) => s.achievementsUnlocked);

  return (
    <div className="achievements">
      <div className="achievements__header">
        <button className="btn btn--secondary" onClick={onBack}>
          ← {t('back')}
        </button>
        <h2>🏆 {t('achievements')}</h2>
      </div>

      <div className="achievements__progress">
        {t('achievementsProgress', {
          count: String(unlocked.length),
          total: String(ACHIEVEMENTS.length),
        })}
      </div>

      <ul className="achievements__list">
        {ACHIEVEMENTS.map((a) => {
          const isUnlocked = unlocked.includes(a.id);
          return (
            <li
              key={a.id}
              className={`achievements__item ${isUnlocked ? 'achievements__item--unlocked' : ''}`}
            >
              <span className="achievements__emoji">{isUnlocked ? a.emoji : '🔒'}</span>
              <div className="achievements__text">
                <div className="achievements__name">{t(a.nameKey)}</div>
                <div className="achievements__desc">{t(a.descKey)}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
