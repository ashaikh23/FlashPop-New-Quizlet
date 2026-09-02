import React, { useState } from 'react';
import { Deck } from '../../types';
import {
  Play,
  HelpCircle,
  Puzzle,
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { sounds } from '../../services/sound';

interface DeckListProps {
  decks: Deck[];
  onSelectDeck: (deckId: string) => void;
  onStudyDeck: (deckId: string) => void;
  onQuizDeck: (deckId: string) => void;
  onMatchDeck: (deckId: string) => void;
  onEditDeck: (deck: Deck) => void;
  onDeleteDeck: (deckId: string) => void;
  onCreateDeck: () => void;
  masteredCount?: number;
}

const ACCENT_COLORS = [
  { bg: 'bg-accent', light: 'bg-accent-light', text: 'text-accent', border: 'border-accent' },
  { bg: 'bg-secondary', light: 'bg-secondary-light', text: 'text-secondary', border: 'border-secondary' },
  { bg: 'bg-tertiary', light: 'bg-tertiary-light', text: 'text-dark', border: 'border-tertiary' },
  { bg: 'bg-quaternary', light: 'bg-quaternary-light', text: 'text-emerald-800', border: 'border-quaternary' },
];

export const DeckList: React.FC<DeckListProps> = ({
  decks,
  onSelectDeck,
  onStudyDeck,
  onQuizDeck,
  onMatchDeck,
  onEditDeck,
  onDeleteDeck,
  onCreateDeck,
  masteredCount = 0,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const filteredDecks = decks.filter(deck => {
    const q = searchQuery.toLowerCase();
    const matchesTitle = deck.title.toLowerCase().includes(q);
    const matchesDesc = deck.description.toLowerCase().includes(q);
    const matchesCards = deck.cards.some(
      c => c.term.toLowerCase().includes(q) || c.definition.toLowerCase().includes(q)
    );
    return matchesTitle || matchesDesc || matchesCards;
  });

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto pb-20">
      {/* Playful Hero Header with Geometric Decorations */}
      <div className="relative bg-white rounded-3xl border-2 border-dark p-6 sm:p-10 shadow-pop overflow-hidden">
        {/* Decorative Memphis Background Shapes */}
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-tertiary/40 border-2 border-dark pointer-events-none -z-0" />
        <div className="absolute right-24 -bottom-6 w-20 h-20 bg-secondary/30 rounded-2xl rotate-12 border-2 border-dark pointer-events-none -z-0" />
        <div className="absolute left-1/2 top-4 w-6 h-6 rounded-full bg-quaternary border-2 border-dark pointer-events-none hidden sm:block" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-tertiary border-2 border-dark text-xs font-heading font-extrabold shadow-pop-active">
                <Sparkles size={13} strokeWidth={2.5} />
                <span>LEARNING PLAYGROUND</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-quaternary text-dark border-2 border-dark text-xs font-heading font-black shadow-pop-active">
                <span>⭐ {masteredCount} Mastered</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-black text-dark tracking-tight">
              Your Study Sets
            </h1>
            <p className="text-sm font-medium text-dark/70">
              {decks.length} {decks.length === 1 ? 'collection' : 'collections'} saved & ready for practice
            </p>
          </div>

          {/* Primary "Candy Button" */}
          <button
            onClick={onCreateDeck}
            className="px-6 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-white font-heading font-extrabold text-sm border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-pop-active transition-all flex items-center justify-center gap-2.5 shrink-0"
          >
            <div className="w-6 h-6 rounded-full bg-white text-accent flex items-center justify-center shadow-sm">
              <Plus size={16} strokeWidth={3} />
            </div>
            <span>Create New Set</span>
          </button>
        </div>
      </div>

      {/* Filter / Search Bar with Memphis Hard Shadow */}
      <div className="relative max-w-md">
        <Search size={18} strokeWidth={2.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Filter study sets by title or term..."
          className="w-full pl-11 pr-4 py-3 rounded-full bg-white border-2 border-dark text-xs font-bold text-dark placeholder-dark/40 shadow-pop-active focus:outline-none focus:shadow-pop-violet transition-all"
        />
      </div>

      {/* Sets Grid: Memphis "Sticker Cards" */}
      {filteredDecks.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white rounded-3xl border-2 border-dark shadow-pop">
          <div className="w-16 h-16 mx-auto rounded-full bg-tertiary border-2 border-dark flex items-center justify-center mb-4 shadow-pop-active">
            <BookOpen size={28} strokeWidth={2.5} className="text-dark" />
          </div>
          <h3 className="text-xl font-heading font-extrabold text-dark">No study sets found</h3>
          <p className="text-xs font-medium text-dark/60 max-w-sm mx-auto mt-1 mb-6">
            {searchQuery
              ? `No cards matched "${searchQuery}".`
              : 'Create your first flashcard set to start studying with interactive quizzes!'}
          </p>
          <button
            onClick={onCreateDeck}
            className="px-6 py-3 rounded-full bg-secondary hover:bg-secondary-hover text-white font-heading font-extrabold text-xs border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover transition-all inline-flex items-center gap-2"
          >
            <Plus size={16} strokeWidth={3} /> Create First Set
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredDecks.map((deck, idx) => {
            const colorTheme = ACCENT_COLORS[idx % ACCENT_COLORS.length];

            return (
              <div
                key={deck.id}
                className="group relative bg-white rounded-3xl border-2 border-dark p-6 shadow-pop hover:-translate-x-1 hover:-translate-y-1 hover:shadow-pop-lg transition-all duration-200 flex flex-col justify-between"
              >
                {/* Floating Circle Icon sitting on top border */}
                <div className={`absolute -top-4 left-6 w-9 h-9 rounded-full ${colorTheme.bg} border-2 border-dark text-white font-heading font-black text-xs flex items-center justify-center shadow-pop-active group-hover:rotate-12 transition-transform`}>
                  {idx + 1}
                </div>

                <div>
                  <div className="flex items-start justify-between gap-3 mb-3 pt-2">
                    <span className={`text-[11px] font-heading font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border-2 border-dark ${colorTheme.light} text-dark`}>
                      {deck.cards.length} {deck.cards.length === 1 ? 'card' : 'cards'}
                    </span>

                    {/* Menu Button */}
                    <div className="relative">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === deck.id ? null : deck.id);
                        }}
                        className="w-8 h-8 rounded-full border-2 border-transparent hover:border-dark hover:bg-muted text-dark/60 hover:text-dark flex items-center justify-center transition-all"
                      >
                        <MoreVertical size={16} strokeWidth={2.5} />
                      </button>

                      {activeMenuId === deck.id && (
                        <div
                          className="absolute right-0 top-9 w-40 rounded-2xl bg-white border-2 border-dark shadow-pop-lg py-1.5 z-30 animate-bounce-in text-xs font-heading font-bold"
                          onClick={e => e.stopPropagation()}
                        >
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              onEditDeck(deck);
                            }}
                            className="w-full px-4 py-2 text-left text-dark hover:bg-tertiary-light flex items-center gap-2"
                          >
                            <Edit2 size={13} strokeWidth={2.5} /> Edit Set
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              if (window.confirm(`Delete set "${deck.title}"?`)) {
                                onDeleteDeck(deck.id);
                              }
                            }}
                            className="w-full px-4 py-2 text-left text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                          >
                            <Trash2 size={13} strokeWidth={2.5} /> Delete Set
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3
                    onClick={() => onSelectDeck(deck.id)}
                    className="text-lg font-heading font-black text-dark hover:text-accent cursor-pointer transition-colors line-clamp-1"
                  >
                    {deck.title}
                  </h3>
                  <p className="text-xs font-medium text-dark/70 mt-1.5 line-clamp-2 min-h-[32px] leading-relaxed">
                    {deck.description || 'Collection of cards for active recall and multiple choice testing.'}
                  </p>
                </div>

                {/* Bottom Actions: Mini Candy Pills */}
                <div className="mt-6 pt-4 border-t-2 border-dark/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-dark/60">
                    <div className="w-5 h-5 rounded-full bg-tertiary border-2 border-dark text-dark font-black text-[10px] flex items-center justify-center">
                      A
                    </div>
                    <span>Afya</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onStudyDeck(deck.id);
                      }}
                      disabled={deck.cards.length === 0}
                      className="py-2 px-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-heading font-extrabold text-[11px] border-2 border-dark shadow-pop-active hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1 disabled:opacity-40"
                    >
                      <Play size={11} strokeWidth={3} className="fill-white" /> Cards
                    </button>

                    <button
                      onClick={() => {
                        sounds.playClick();
                        onQuizDeck(deck.id);
                      }}
                      disabled={deck.cards.length === 0}
                      className="py-2 px-2 rounded-xl bg-secondary hover:bg-secondary-hover text-white font-heading font-extrabold text-[11px] border-2 border-dark shadow-pop-active hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1 disabled:opacity-40"
                    >
                      <HelpCircle size={11} strokeWidth={3} /> Test
                    </button>

                    <button
                      onClick={() => {
                        sounds.playClick();
                        onMatchDeck(deck.id);
                      }}
                      disabled={deck.cards.length < 3}
                      className="py-2 px-2 rounded-xl bg-quaternary hover:bg-quaternary-hover text-dark font-heading font-extrabold text-[11px] border-2 border-dark shadow-pop-active hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1 disabled:opacity-40"
                    >
                      <Puzzle size={11} strokeWidth={3} /> Match
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
