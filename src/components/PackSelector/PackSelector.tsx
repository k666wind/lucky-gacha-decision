import React, { useState } from 'react';
import './PackSelector.css';
import { useGameStore } from '../../store/useGameStore';
import { useI18n } from '../../i18n';

export const PackSelector: React.FC = () => {
  const { t } = useI18n();
  const packs = useGameStore((s) => s.packs);
  const currentPackId = useGameStore((s) => s.currentPackId);
  const setCurrentPack = useGameStore((s) => s.setCurrentPack);
  const addPack = useGameStore((s) => s.addPack);
  const renamePack = useGameStore((s) => s.renamePack);
  const deletePack = useGameStore((s) => s.deletePack);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState('');

  const startAdd = () => {
    const name = t('newPack');
    addPack(`${name} ${packs.length + 1}`);
  };

  const startRename = (id: string, current: string) => {
    setEditingId(id);
    setDraftName(current);
  };

  const commitRename = (id: string) => {
    if (draftName.trim()) renamePack(id, draftName.trim());
    setEditingId(null);
  };

  return (
    <div className="pack-selector">
      <div className="pack-selector__label">{t('packs')}</div>
      <div className="pack-selector__list">
        {packs.map((pack) => (
          <div
            key={pack.id}
            className={`pack-selector__chip ${
              pack.id === currentPackId ? 'pack-selector__chip--active' : ''
            }`}
          >
            {editingId === pack.id ? (
              <input
                autoFocus
                className="pack-selector__input"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                onBlur={() => commitRename(pack.id)}
                onKeyDown={(e) => e.key === 'Enter' && commitRename(pack.id)}
              />
            ) : (
              <button
                className="pack-selector__chip-btn"
                onClick={() => setCurrentPack(pack.id)}
                onDoubleClick={() => startRename(pack.id, pack.name)}
                title={t('rename')}
              >
                {pack.name}
              </button>
            )}
            {packs.length > 1 && (
              <button
                className="pack-selector__delete"
                aria-label={t('delete')}
                onClick={() => {
                  if (window.confirm(t('confirmDeletePack'))) deletePack(pack.id);
                }}
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button className="pack-selector__add" onClick={startAdd}>
          + {t('newPack')}
        </button>
      </div>
    </div>
  );
};
