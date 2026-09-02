import React, { useState } from 'react';
import { Deck } from '../../types';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  Check,
  Sparkles,
} from 'lucide-react';
import { sounds } from '../../services/sound';
import { Modal } from '../common/Modal';

interface SetCreatorProps {
  initialDeck?: Deck | null;
  onSave: (deckData: {
    title: string;
    description: string;
    cards: Array<{ id?: string; term: string; definition: string; hint?: string; example?: string }>;
  }) => void;
  onCancel: () => void;
  onOpenBatchImport?: () => void;
}

interface CardRow {
  id: string;
  term: string;
  definition: string;
  hint?: string;
  example?: string;
}

export const SetCreator: React.FC<SetCreatorProps> = ({
  initialDeck,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialDeck?.title || '');
  const [description, setDescription] = useState(initialDeck?.description || '');
  const [error, setError] = useState('');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');

  // Initial cards or 3 blank rows
  const [cardRows, setCardRows] = useState<CardRow[]>(() => {
    if (initialDeck && initialDeck.cards.length > 0) {
      return initialDeck.cards.map(c => ({
        id: c.id,
        term: c.term,
        definition: c.definition,
        hint: c.hint,
        example: c.example,
      }));
    }
    return [
      { id: 'row-1', term: '', definition: '' },
      { id: 'row-2', term: '', definition: '' },
      { id: 'row-3', term: '', definition: '' },
    ];
  });

  const handleAddRow = () => {
    sounds.playClick();
    setCardRows(prev => [
      ...prev,
      { id: `row-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, term: '', definition: '' },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    if (cardRows.length <= 1) return;
    sounds.playClick();
    setCardRows(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateRow = (index: number, field: 'term' | 'definition' | 'hint', value: string) => {
    setCardRows(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    if (error) setError('');
  };

  const handleImportText = () => {
    if (!importText.trim()) {
      setImportError('Please paste some terms and definitions');
      return;
    }

    const lines = importText.split('\n');
    const newRows: CardRow[] = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      let parts: string[] = [];
      if (trimmed.includes('\t')) parts = trimmed.split('\t');
      else if (trimmed.includes(' - ')) parts = trimmed.split(' - ');
      else if (trimmed.includes(' | ')) parts = trimmed.split(' | ');
      else if (trimmed.includes(';')) parts = trimmed.split(';');
      else if (trimmed.includes(',')) parts = trimmed.split(',');

      if (parts.length >= 2) {
        const term = parts[0].trim();
        const definition = parts.slice(1).join(' - ').trim();
        if (term && definition) {
          newRows.push({
            id: `row-${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${newRows.length}`,
            term,
            definition,
          });
        }
      }
    }

    if (newRows.length === 0) {
      setImportError('Could not detect valid lines. Separate terms and definitions with Tab, hyphen ( - ), or comma.');
      return;
    }

    sounds.playCorrect();
    // Replace completely blank default rows or append
    setCardRows(prev => {
      const nonEmpty = prev.filter(r => r.term.trim() || r.definition.trim());
      return [...nonEmpty, ...newRows];
    });
    setImportText('');
    setImportError('');
    setIsImportModalOpen(false);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      setError('Please enter a title for your study set.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const validCards = cardRows
      .filter(r => r.term.trim() && r.definition.trim())
      .map(r => ({
        id: r.id.startsWith('row-') ? undefined : r.id,
        term: r.term.trim(),
        definition: r.definition.trim(),
        hint: r.hint?.trim() || undefined,
        example: r.example?.trim() || undefined,
      }));

    if (validCards.length === 0) {
      setError('Please add at least one card with both a term and definition.');
      return;
    }

    sounds.playCorrect();
    onSave({
      title: title.trim(),
      description: description.trim(),
      cards: validCards,
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-28">
      {/* Top Header Sticky Bar */}
      <div className="flex items-center justify-between sticky top-20 bg-cream/95 backdrop-blur-md py-4 z-30 border-b-2 border-dark/10">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-dark text-xs font-heading font-extrabold text-dark shadow-pop-active hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
        >
          <ArrowLeft size={14} strokeWidth={2.5} /> Cancel
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-white text-xs font-heading font-black border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-pop-active transition-all flex items-center gap-2"
          >
            <Check size={14} strokeWidth={3} /> {initialDeck ? 'Save Changes' : 'Create Set'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border-2 border-rose-500 rounded-2xl text-xs font-heading font-bold text-rose-700 shadow-pop-active animate-fade-in">
          ⚠️ {error}
        </div>
      )}

      {/* Set Details Form */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-tertiary border-2 border-dark text-xs font-heading font-black shadow-pop-active">
          <Sparkles size={13} strokeWidth={2.5} />
          <span>SET CREATOR</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-black text-dark tracking-tight">
          {initialDeck ? 'Edit Study Set' : 'Create a New Study Set'}
        </h1>

        <div className="space-y-4 pt-2">
          {/* Title Input */}
          <div className="bg-white rounded-3xl border-2 border-dark p-6 shadow-pop focus-within:shadow-pop-violet transition-all">
            <label className="block text-xs font-heading font-black uppercase tracking-wider text-dark/50 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder='Enter title, e.g. "Cognitive Biases & Mental Models"'
              className="w-full text-lg sm:text-xl font-heading font-black text-dark placeholder-dark/30 focus:outline-none bg-transparent"
              autoFocus
            />
          </div>

          {/* Description Input & Import Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-white rounded-3xl border-2 border-dark p-6 shadow-pop focus-within:shadow-pop-violet transition-all">
              <label className="block text-xs font-heading font-black uppercase tracking-wider text-dark/50 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="What is this study set about?"
                className="w-full text-sm font-medium text-dark placeholder-dark/30 focus:outline-none bg-transparent leading-relaxed"
              />
            </div>

            <div className="sm:w-60 flex items-stretch">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setIsImportModalOpen(true);
                }}
                className="w-full p-6 rounded-3xl bg-white border-2 border-dark hover:bg-tertiary text-dark font-heading font-black text-xs shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:shadow-pop-active transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-full bg-cream border-2 border-dark flex items-center justify-center shadow-pop-active group-hover:rotate-12 transition-transform">
                  <Upload size={18} strokeWidth={2.5} className="text-dark" />
                </div>
                <span>Import from Text</span>
                <span className="text-[10px] text-dark/50 font-normal">
                  Tab, Hyphen or CSV
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card Rows List ("The Card Stack") */}
      <div className="space-y-5 pt-4">
        {cardRows.map((row, idx) => (
          <div
            key={row.id}
            className="bg-white rounded-3xl border-2 border-dark p-6 sm:p-7 shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all space-y-4"
          >
            {/* Card Row Top: Number badge and Delete */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-dark/10 text-xs font-heading font-black text-dark/40">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-tertiary border-2 border-dark text-dark flex items-center justify-center shadow-pop-active">
                  {idx + 1}
                </span>
                <span className="text-dark font-extrabold uppercase tracking-wider text-[11px]">Card Specimen</span>
              </div>

              {cardRows.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveRow(idx)}
                  className="w-8 h-8 rounded-full border-2 border-transparent hover:border-dark hover:bg-rose-50 text-rose-500 flex items-center justify-center transition-all"
                  title="Delete card"
                >
                  <Trash2 size={16} strokeWidth={2.5} />
                </button>
              )}
            </div>

            {/* Term & Definition Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Term Input */}
              <div className="space-y-1">
                <input
                  type="text"
                  value={row.term}
                  onChange={e => handleUpdateRow(idx, 'term', e.target.value)}
                  placeholder="Enter term"
                  className="w-full pb-2 border-b-2 border-dark focus:border-accent text-base font-heading font-black text-dark placeholder-dark/30 focus:outline-none transition-colors"
                />
                <span className="text-[10px] uppercase font-heading font-extrabold tracking-wider text-dark/50 block">
                  TERM
                </span>
              </div>

              {/* Definition Input */}
              <div className="space-y-1">
                <input
                  type="text"
                  value={row.definition}
                  onChange={e => handleUpdateRow(idx, 'definition', e.target.value)}
                  placeholder="Enter definition"
                  className="w-full pb-2 border-b-2 border-dark focus:border-accent text-base font-medium text-dark placeholder-dark/30 focus:outline-none transition-colors"
                />
                <span className="text-[10px] uppercase font-heading font-extrabold tracking-wider text-dark/50 block">
                  DEFINITION
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Big Yellow "+ ADD CARD" Button */}
        <button
          type="button"
          onClick={handleAddRow}
          className="w-full py-6 rounded-3xl bg-tertiary hover:bg-tertiary-hover border-2 border-dark text-dark font-heading font-black text-sm uppercase tracking-wider shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-pop-active transition-all flex items-center justify-center gap-2"
        >
          <div className="w-7 h-7 rounded-full bg-white border-2 border-dark flex items-center justify-center shadow-pop-active">
            <Plus size={18} strokeWidth={3} />
          </div>
          <span>Add Another Card</span>
        </button>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t-2 border-dark/10">
        <button
          onClick={handleSubmit}
          className="px-8 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-white font-heading font-black text-sm border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-pop-active transition-all flex items-center gap-2"
        >
          <Check size={16} strokeWidth={3} /> {initialDeck ? 'Save Changes' : 'Create Study Set'}
        </button>
      </div>

      {/* Direct Batch Import Modal */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Paste & Import Cards"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4">
          <p className="text-xs font-medium text-dark/70">
            Paste terms and definitions from Quizlet, Google Sheets, Excel, or Word.
            Separate terms and definitions with a <strong>Tab</strong>, <strong>hyphen ( - )</strong>, or <strong>comma</strong>.
          </p>

          {importError && (
            <div className="p-3 bg-rose-50 border-2 border-rose-500 rounded-2xl text-xs font-heading font-bold text-rose-700 shadow-pop-active">
              ⚠️ {importError}
            </div>
          )}

          <textarea
            rows={8}
            value={importText}
            onChange={e => {
              setImportText(e.target.value);
              if (importError) setImportError('');
            }}
            placeholder={`Mitosis\tCell division resulting in two daughter cells\nMeiosis\tCell division reducing chromosome count by half\nEnzyme - Biological protein catalyst`}
            className="w-full p-4 rounded-2xl bg-cream border-2 border-dark font-mono text-xs text-dark placeholder-dark/30 focus:outline-none focus:bg-white focus:shadow-pop-violet transition-all"
          />

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsImportModalOpen(false)}
              className="px-5 py-2.5 rounded-full bg-white border-2 border-dark text-xs font-heading font-bold text-dark hover:bg-cream transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleImportText}
              className="px-6 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-white text-xs font-heading font-black border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-pop-active transition-all flex items-center gap-2"
            >
              <Plus size={15} strokeWidth={3} />
              <span>Add Cards to Set</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
