import React, { useState } from 'react';
import './OptionEditor.css';
import { useGameStore } from '../../store/useGameStore';
import { useI18n } from '../../i18n';
import type { GachaOption } from '../../types';

interface OptionEditorProps {
  onBack: () => void;
}

export const OptionEditor: React.FC<OptionEditorProps> = ({ onBack }) => {
  const { t } = useI18n();
  const packs = useGameStore((s) => s.packs);
  const currentPackId = useGameStore((s) => s.currentPackId);
  const pack = packs.find((p) => p.id === currentPackId) ?? packs[0];

  const addOption = useGameStore((s) => s.addOption);
  const updateOption = useGameStore((s) => s.updateOption);
  const deleteOption = useGameStore((s) => s.deleteOption);
  const reorderOptions = useGameStore((s) => s.reorderOptions);
  const shuffleOptions = useGameStore((s) => s.shuffleOptions);
  const clearOptions = useGameStore((s) => s.clearOptions);

  const [newEmoji, setNewEmoji] = useState('🎯');
  const [newText, setNewText] = useState('');
  const [dragId, setDragId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newText.trim()) return;
    addOption(pack.id, { emoji: newEmoji || '🎯', text: newText.trim() });
    setNewText('');
  };

  const handleDrop = (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    const options = [...pack.options];
    const fromIdx = options.findIndex((o) => o.id === dragId);
    const toIdx = options.findIndex((o) => o.id === targetId);
    const [moved] = options.splice(fromIdx, 1);
    options.splice(toIdx, 0, moved);
    reorderOptions(pack.id, options);
    setDragId(null);
  };

  return (
    <div className="option-editor">
      <div className="option-editor__header">
        <button className="btn btn--secondary" onClick={onBack}>
          ← {t('back')}
        </button>
        <h2>{pack.name}</h2>
      </div>

      <div className="option-editor__add-row">
        <input
          className="option-editor__emoji-input"
          value={newEmoji}
          onChange={(e) => setNewEmoji(e.target.value)}
          placeholder={t('optionPlaceholderEmoji')}
          maxLength={4}
        />
        <input
          className="option-editor__text-input"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder={t('optionPlaceholderText')}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button className="btn btn--primary" onClick={handleAdd}>
          {t('addOption')}
        </button>
      </div>

      <ul className="option-editor__list">
        {pack.options.map((opt: GachaOption) => (
          <li
            key={opt.id}
            className={`option-editor__item ${dragId === opt.id ? 'option-editor__item--dragging' : ''}`}
            draggable
            onDragStart={() => setDragId(opt.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(opt.id)}
          >
            <span className="option-editor__handle" aria-hidden>
              ⠿
            </span>
            <input
              className="option-editor__emoji-input"
              value={opt.emoji}
              onChange={(e) => updateOption(pack.id, opt.id, { emoji: e.target.value })}
              maxLength={4}
            />
            <input
              className="option-editor__text-input"
              value={opt.text}
              onChange={(e) => updateOption(pack.id, opt.id, { text: e.target.value })}
            />
            <button
              className="option-editor__delete"
              aria-label={t('delete')}
              onClick={() => deleteOption(pack.id, opt.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {pack.options.length === 0 && (
        <p className="option-editor__empty">{t('needOptions')}</p>
      )}

      <div className="option-editor__footer">
        <button
          className="btn btn--secondary"
          onClick={() => shuffleOptions(pack.id)}
          disabled={pack.options.length < 2}
        >
          🔀 {t('shuffle')}
        </button>
        <button
          className="btn btn--secondary"
          onClick={() => {
            if (window.confirm(t('confirmDeletePack'))) clearOptions(pack.id);
          }}
          disabled={pack.options.length === 0}
        >
          🗑 {t('clearAll')}
        </button>
      </div>
    </div>
  );
};
