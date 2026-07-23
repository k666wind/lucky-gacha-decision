import React from 'react';
import './ImportConfirmModal.css';
import { useI18n } from '../../i18n';

interface ImportConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ImportConfirmModal: React.FC<ImportConfirmModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  const { t } = useI18n();

  return (
    <div className="import-modal__overlay" role="dialog" aria-modal="true">
      <div className="import-modal">
        <div className="import-modal__icon">⚠️</div>
        <h3 className="import-modal__title">{t('importConfirmTitle')}</h3>
        <p className="import-modal__body">{t('importConfirmBody')}</p>
        <div className="import-modal__actions">
          <button className="btn btn--secondary" onClick={onCancel}>
            {t('cancel')}
          </button>
          <button className="btn btn--danger" onClick={onConfirm}>
            {t('import')}
          </button>
        </div>
      </div>
    </div>
  );
};
