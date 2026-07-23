import React, { useEffect } from 'react';
import './AchievementToast.css';
import { useI18n } from '../../i18n';
import { ACHIEVEMENTS } from '../../data/achievements';

interface AchievementToastProps {
  achievementId: string;
  onDismiss: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({
  achievementId,
  onDismiss,
}) => {
  const { t } = useI18n();
  const def = ACHIEVEMENTS.find((a) => a.id === achievementId);

  useEffect(() => {
    const id = setTimeout(onDismiss, 3200);
    return () => clearTimeout(id);
  }, [achievementId, onDismiss]);

  if (!def) return null;

  return (
    <div className="achievement-toast" role="status">
      <span className="achievement-toast__emoji">{def.emoji}</span>
      <div>
        <div className="achievement-toast__label">{t('newAchievementUnlocked')}</div>
        <div className="achievement-toast__name">{t(def.nameKey)}</div>
      </div>
    </div>
  );
};
