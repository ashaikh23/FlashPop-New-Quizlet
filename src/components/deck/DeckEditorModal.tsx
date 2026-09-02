import React, { useState, useEffect } from 'react';
import { Deck } from '../../types';
import { Modal } from '../common/Modal';
import { Check, Sparkles, Brain, BookOpen, Layers, Lightbulb, Compass, Code, Music, Atom } from 'lucide-react';
import { sounds } from '../../services/sound';

interface DeckEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (deckData: { title: string; description: string; color: string; icon: string }) => void;
  initialDeck?: Deck | null;
}

const COLOR_OPTIONS = [
  { id: 'violet', label: 'Blue', bg: 'bg-quizlet-blue' },
  { id: 'cyan', label: 'Cyan', bg: 'bg-cyan-500' },
  { id: 'emerald', label: 'Green', bg: 'bg-emerald-500' },
  { id: 'amber', label: 'Yellow', bg: 'bg-amber-500' },
  { id: 'rose', label: 'Red', bg: 'bg-rose-500' },
  { id: 'indigo', label: 'Purple', bg: 'bg-purple-600' },
];

const ICON_OPTIONS = [
  { id: 'Brain', icon: Brain },
  { id: 'Sparkles', icon: Sparkles },
  { id: 'Layers', icon: Layers },
  { id: 'BookOpen', icon: BookOpen },
  { id: 'Lightbulb', icon: Lightbulb },
  { id: 'Compass', icon: Compass },
  { id: 'Code', icon: Code },
  { id: 'Music', icon: Music },
  { id: 'Atom', icon: Atom },
];

export const DeckEditorModal: React.FC<DeckEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDeck,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('violet');
  const [icon, setIcon] = useState('Brain');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialDeck) {
      setTitle(initialDeck.title);
      setDescription(initialDeck.description);
      setColor(initialDeck.color || 'violet');
      setIcon(initialDeck.icon || 'Brain');
    } else {
      setTitle('');
      setDescription('');
      setColor('violet');
      setIcon('Brain');
    }
    setError('');
  }, [initialDeck, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    sounds.playClick();
    onSave({
      title: title.trim(),
      description: description.trim(),
      color,
      icon,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialDeck ? 'Edit study set' : 'Create a new study set'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-quizlet-red">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-quizlet-navy/60 mb-1">
            Title <span className="text-quizlet-blue">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="Subject, chapter, unit..."
            className="w-full px-4 py-2.5 rounded-xl bg-quizlet-bg border border-quizlet-border text-quizlet-dark-navy placeholder-quizlet-navy/40 focus:outline-none focus:border-quizlet-blue focus:bg-white focus:ring-2 focus:ring-quizlet-blue/20 font-bold text-sm"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-quizlet-navy/60 mb-1">
            Description
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Add a description..."
            className="w-full px-4 py-2 rounded-xl bg-quizlet-bg border border-quizlet-border text-quizlet-dark-navy placeholder-quizlet-navy/40 focus:outline-none focus:border-quizlet-blue focus:bg-white text-xs leading-relaxed"
          />
        </div>

        {/* Color Palette */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-quizlet-navy/60 mb-2">
            Badge color
          </label>
          <div className="flex items-center gap-3">
            {COLOR_OPTIONS.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColor(c.id)}
                className={`w-7 h-7 rounded-full ${c.bg} transition-transform flex items-center justify-center ${
                  color === c.id ? 'ring-2 ring-quizlet-dark-navy ring-offset-2 scale-110' : 'opacity-70 hover:opacity-100'
                }`}
                title={c.label}
              >
                {color === c.id && <Check size={12} className="text-white stroke-[3]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Icon */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-quizlet-navy/60 mb-2">
            Set icon
          </label>
          <div className="flex flex-wrap gap-2">
            {ICON_OPTIONS.map(item => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIcon(item.id)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    icon === item.id
                      ? 'bg-quizlet-blue-light border-quizlet-blue text-quizlet-blue ring-1 ring-quizlet-blue'
                      : 'bg-quizlet-bg border-quizlet-border text-quizlet-navy/60 hover:text-quizlet-navy hover:bg-white'
                  }`}
                >
                  <IconComp size={18} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-quizlet-border text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl font-semibold text-quizlet-navy/70 hover:bg-quizlet-bg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl font-bold bg-quizlet-blue hover:bg-quizlet-blue-hover text-white shadow-sm transition-all"
          >
            {initialDeck ? 'Save changes' : 'Create set'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
