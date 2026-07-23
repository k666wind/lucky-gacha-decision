import React from 'react';
import './StickerBook.css';
import { useGameStore } from '../../store/useGameStore';
import { useI18n } from '../../i18n';
import { STICKER_POOL } from '../../data/stickers';

interface StickerBookProps {
  onBack: () => void;
}

export const StickerBook: React.FC<StickerBookProps> = ({ onBack }) => {
  const { t } = useI18n();
  const stickers = useGameStore((s) => s.stickers);
  const collectedCount = Object.keys(stickers).length;

  return (
    <div className="sticker-book">
      <div className="sticker-book__header">
        <button className="btn btn--secondary" onClick={onBack}>
          ← {t('back')}
        </button>
        <h2>📔 {t('stickerBook')}</h2>
      </div>

      <div className="sticker-book__progress">
        {t('stickerCollectionLabel', {
          count: String(collectedCount),
          total: String(STICKER_POOL.length),
        })}
      </div>

      <div className="sticker-book__grid">
        {STICKER_POOL.map((sticker) => {
          const count = stickers[sticker.id] || 0;
          const owned = count > 0;
          return (
            <div
              key={sticker.id}
              className={`sticker-book__slot ${owned ? 'sticker-book__slot--owned' : ''}`}
            >
              <span className="sticker-book__emoji">{owned ? sticker.emoji : '❔'}</span>
              {count > 1 && <span className="sticker-book__count">×{count}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
