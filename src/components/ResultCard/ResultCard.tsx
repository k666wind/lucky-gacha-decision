import React, { useMemo } from 'react';
import './ResultCard.css';
import type { GachaOption } from '../../types';
import { useI18n } from '../../i18n';

interface ResultCardProps {
  option: GachaOption;
  onSpinAgain: () => void;
  onDone: () => void;
}

const CONFETTI_COLORS = ['#ff6fa8', '#4cd9e8', '#ffd86b', '#a06cff', '#7ee787'];

export const ResultCard: React.FC<ResultCardProps> = ({ option, onSpinAgain, onDone }) => {
  const { t } = useI18n();

  const confetti = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.4 + Math.random() * 0.8,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotate: Math.random() * 360,
      })),
    [option.id]
  );

  return (
    <div className="result-card__overlay">
      <div className="result-card__confetti">
        {confetti.map((c) => (
          <span
            key={c.id}
            className="result-card__confetti-piece"
            style={{
              left: `${c.left}%`,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              background: c.color,
              transform: `rotate(${c.rotate}deg)`,
            }}
          />
        ))}
      </div>

      <div className="result-card">
        <div className="result-card__label">{t('todaysChoice')}</div>
        <div className="result-card__emoji" role="img" aria-label={option.text}>
          {option.emoji}
        </div>
        <div className="result-card__text">{option.text}</div>

        <div className="result-card__actions">
          <button className="btn btn--secondary" onClick={onDone}>
            {t('done')}
          </button>
          <button className="btn btn--primary" onClick={onSpinAgain}>
            {t('spinAgain')}
          </button>
        </div>
      </div>
    </div>
  );
};
