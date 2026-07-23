import React, { useMemo } from 'react';
import './Statistics.css';
import { useGameStore } from '../../store/useGameStore';
import { useI18n } from '../../i18n';

interface StatisticsProps {
  onBack: () => void;
}

export const Statistics: React.FC<StatisticsProps> = ({ onBack }) => {
  const { t } = useI18n();
  const statistics = useGameStore((s) => s.statistics);
  const resetStatistics = useGameStore((s) => s.resetStatistics);

  const breakdown = useMemo(
    () =>
      Object.entries(statistics.mostSelected).sort((a, b) => b[1] - a[1]),
    [statistics.mostSelected]
  );

  const favorite = breakdown[0];
  const maxCount = breakdown.length ? breakdown[0][1] : 0;

  const handleReset = () => {
    if (window.confirm(t('confirmResetStats'))) resetStatistics();
  };

  return (
    <div className="statistics">
      <div className="statistics__header">
        <button className="btn btn--secondary" onClick={onBack}>
          ← {t('back')}
        </button>
        <h2>📊 {t('statistics')}</h2>
      </div>

      {statistics.totalSpins === 0 ? (
        <p className="statistics__empty">{t('noSpinsYet')}</p>
      ) : (
        <>
          <div className="statistics__cards">
            <div className="statistics__card">
              <div className="statistics__card-label">{t('totalSpins')}</div>
              <div className="statistics__card-value">{statistics.totalSpins}</div>
            </div>
            <div className="statistics__card">
              <div className="statistics__card-label">{t('favoriteOption')}</div>
              <div className="statistics__card-value">{favorite ? favorite[0] : '—'}</div>
            </div>
            <div className="statistics__card">
              <div className="statistics__card-label">{t('lastResult')}</div>
              <div className="statistics__card-value">{statistics.lastResult || '—'}</div>
            </div>
          </div>

          <h3 className="statistics__subheading">{t('breakdown')}</h3>
          <ul className="statistics__breakdown">
            {breakdown.map(([label, count]) => (
              <li key={label} className="statistics__row">
                <span className="statistics__row-label">{label}</span>
                <div className="statistics__bar-track">
                  <div
                    className="statistics__bar-fill"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="statistics__row-count">{count}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <button
        className="btn btn--secondary statistics__reset"
        onClick={handleReset}
        disabled={statistics.totalSpins === 0}
      >
        🗑 {t('resetStatistics')}
      </button>
    </div>
  );
};
