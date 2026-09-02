import React, { useState, useEffect } from 'react';
import { Card } from '../../types';
import { Modal } from '../common/Modal';
import { Plus, Check, Sparkles, HelpCircle } from 'lucide-react';
import { sounds } from '../../services/sound';

interface CardEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cardData: { term: string; definition: string; hint?: string; example?: string }, keepOpen?: boolean) => void;
  initialCard?: Card | null;
}

export const CardEditorModal: React.FC<CardEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialCard,
}) => {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [hint, setHint] = useState('');
  const [example, setExample] = useState('');
  const [showExtras, setShowExtras] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialCard) {
      setTerm(initialCard.term);
      setDefinition(initialCard.definition);
      setHint(initialCard.hint || '');
      setExample(initialCard.example || '');
      setShowExtras(Boolean(initialCard.hint || initialCard.example));
    } else {
      setTerm('');
      setDefinition('');
      setHint('');
      setExample('');
      setShowExtras(false);
    }
    setError('');
  }, [initialCard, isOpen]);

  const handleSubmit = (keepOpen: boolean = false) => {
    if (!term.trim()) {
      setError('Term is required');
      return;
    }
    if (!definition.trim()) {
      setError('Definition is required');
      return;
    }

    sounds.playClick();
    onSave(
      {
        term: term.trim(),
        definition: definition.trim(),
        hint: hint.trim() || undefined,
        example: example.trim() || undefined,
      },
      keepOpen
    );

    if (keepOpen) {
      setTerm('');
      setDefinition('');
      setHint('');
      setExample('');
      setError('');
    } else {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(!initialCard);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialCard ? 'Edit Card Specimen' : 'Add New Card'}
      maxWidth="max-w-xl"
    >
      <div onKeyDown={handleKeyDown} className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 border-2 border-rose-500 rounded-2xl text-xs font-heading font-bold text-rose-700 shadow-pop-active">
            ⚠️ {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-heading font-black uppercase tracking-wider text-dark/60 mb-1">
            Term <span className="text-secondary">*</span>
          </label>
          <input
            type="text"
            value={term}
            onChange={e => {
              setTerm(e.target.value);
              if (error) setError('');
            }}
            placeholder="Enter term"
            className="w-full px-4 py-3 rounded-2xl bg-cream border-2 border-dark text-dark placeholder-dark/40 focus:outline-none focus:bg-white focus:shadow-pop-violet font-heading font-black text-sm transition-all"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-black uppercase tracking-wider text-dark/60 mb-1">
            Definition <span className="text-secondary">*</span>
          </label>
          <textarea
            rows={4}
            value={definition}
            onChange={e => {
              setDefinition(e.target.value);
              if (error) setError('');
            }}
            placeholder="Enter definition"
            className="w-full px-4 py-3 rounded-2xl bg-cream border-2 border-dark text-dark placeholder-dark/40 focus:outline-none focus:bg-white focus:shadow-pop-violet text-sm leading-relaxed transition-all"
          />
        </div>

        {!showExtras ? (
          <button
            type="button"
            onClick={() => setShowExtras(true)}
            className="text-xs font-heading font-black text-accent hover:text-accent-hover flex items-center gap-1.5 py-1"
          >
            <Sparkles size={13} strokeWidth={2.5} /> + Add Clue or Example Context
          </button>
        ) : (
          <div className="space-y-3 pt-2 border-t-2 border-dark/10">
            <div>
              <label className="block text-xs font-heading font-black uppercase tracking-wider text-dark/60 mb-1 flex items-center gap-1">
                <HelpCircle size={13} strokeWidth={2.5} className="text-tertiary" />
                Hint / Clue (optional)
              </label>
              <input
                type="text"
                value={hint}
                onChange={e => setHint(e.target.value)}
                placeholder="Helpful clue before flipping"
                className="w-full px-4 py-2.5 rounded-xl bg-cream border-2 border-dark text-dark text-xs focus:outline-none focus:bg-white focus:shadow-pop-violet"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-black uppercase tracking-wider text-dark/60 mb-1">
                Example (optional)
              </label>
              <input
                type="text"
                value={example}
                onChange={e => setExample(e.target.value)}
                placeholder="Real-world context or sentence"
                className="w-full px-4 py-2.5 rounded-xl bg-cream border-2 border-dark text-dark text-xs focus:outline-none focus:bg-white focus:shadow-pop-violet"
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t-2 border-dark/10 text-xs">
          <span className="text-dark/40 hidden sm:inline font-mono">
            ⌘+Enter to save
          </span>

          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full font-heading font-bold text-dark/70 hover:text-dark transition-colors"
            >
              Cancel
            </button>

            {!initialCard && (
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                className="px-4 py-2.5 rounded-full font-heading font-black bg-cream hover:bg-tertiary text-dark border-2 border-dark shadow-pop-active transition-all flex items-center gap-1.5"
              >
                <Plus size={14} strokeWidth={3} /> Save & Add Next
              </button>
            )}

            <button
              type="button"
              onClick={() => handleSubmit(false)}
              className="px-6 py-2.5 rounded-full font-heading font-black bg-accent hover:bg-accent-hover text-white border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:shadow-pop-active transition-all flex items-center gap-1.5"
            >
              <Check size={14} strokeWidth={3} /> {initialCard ? 'Save' : 'Add Card'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
