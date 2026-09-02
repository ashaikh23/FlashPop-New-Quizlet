import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Deck, Card } from '../../types';
import {
  ArrowLeft,
  Play,
  HelpCircle,
  Puzzle,
  Plus,
  Star,
  Volume2,
  Edit3,
  Trash2,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Share2,
  Upload,
  RotateCw,
  Sparkles,
  Printer,
  Headphones,
  Pause,
  Timer,
  RotateCcw,
} from 'lucide-react';
import { sounds } from '../../services/sound';
import { PrintModal } from './PrintModal';

interface DeckDetailProps {
  deck: Deck;
  onBack: () => void;
  onStudy: () => void;
  onQuiz: () => void;
  onMatch: () => void;
  onAddCard: () => void;
  onEditCard: (card: Card) => void;
  onDeleteCard: (cardId: string) => void;
  onToggleStar: (cardId: string) => void;
  onToggleMastery?: (cardId: string) => void;
  onOpenBatchImport: () => void;
}

const ROW_COLORS = [
  'bg-accent text-white',
  'bg-secondary text-white',
  'bg-tertiary text-dark',
  'bg-quaternary text-dark',
];

export const DeckDetail: React.FC<DeckDetailProps> = ({
  deck,
  onBack,
  onStudy,
  onQuiz,
  onMatch,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onToggleStar,
  onOpenBatchImport,
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [filterStarred, setFilterStarred] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Auto-play state
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayTimeoutRef = useRef<number | null>(null);

  // Stopwatch state
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const stopwatchIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isStopwatchRunning) {
      stopwatchIntervalRef.current = window.setInterval(() => {
        setStopwatchSeconds(prev => prev + 1);
      }, 1000);
    } else if (stopwatchIntervalRef.current) {
      clearInterval(stopwatchIntervalRef.current);
    }
    return () => {
      if (stopwatchIntervalRef.current) clearInterval(stopwatchIntervalRef.current);
    };
  }, [isStopwatchRunning]);

  const handleToggleStopwatch = () => {
    sounds.playClick();
    setIsStopwatchRunning(prev => !prev);
  };

  const handleResetStopwatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick();
    setIsStopwatchRunning(false);
    setStopwatchSeconds(0);
  };

  const formatStopwatchTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Filtered card list
  const starredCount = deck.cards.filter(c => c.starred).length;
  const activeDeckCards = filterStarred
    ? deck.cards.filter(c => c.starred)
    : deck.cards;

  const [cards, setCards] = useState<Card[]>(activeDeckCards);

  useEffect(() => {
    setCards(isShuffled ? [...activeDeckCards].sort(() => Math.random() - 0.5) : activeDeckCards);
    setActiveCardIndex(prev => (prev >= activeDeckCards.length ? Math.max(0, activeDeckCards.length - 1) : prev));
  }, [deck.cards]);

  useEffect(() => {
    setCards(activeDeckCards);
    setActiveCardIndex(0);
    setIsFlipped(false);
    setIsShuffled(false);
    setIsAutoPlaying(false);
  }, [filterStarred]);

  const currentCard = cards[activeCardIndex];

  const handleFlip = useCallback(() => {
    sounds.playFlip();
    setIsFlipped(prev => !prev);
  }, []);

  const handleNext = useCallback(() => {
    if (activeCardIndex < cards.length - 1) {
      sounds.playClick();
      setIsFlipped(false);
      setActiveCardIndex(prev => prev + 1);
    }
  }, [activeCardIndex, cards.length]);

  const handlePrev = useCallback(() => {
    if (activeCardIndex > 0) {
      sounds.playClick();
      setIsFlipped(false);
      setActiveCardIndex(prev => prev - 1);
    }
  }, [activeCardIndex]);

  const handleShuffle = () => {
    sounds.playClick();
    if (isShuffled) {
      setCards(activeDeckCards);
      setIsShuffled(false);
    } else {
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setIsShuffled(true);
    }
    setActiveCardIndex(0);
    setIsFlipped(false);
  };

  // Hands-Free Auto-Play Cycle
  const handleToggleAutoPlay = () => {
    sounds.playClick();
    setIsAutoPlaying(prev => !prev);
  };

  useEffect(() => {
    if (!isAutoPlaying || cards.length === 0 || !currentCard) {
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    // Step 1: Speak Term
    sounds.speak(currentCard.term);

    // Step 2: After 2.5s, flip to definition and speak definition
    const timer1 = window.setTimeout(() => {
      setIsFlipped(true);
      sounds.playFlip();
      sounds.speak(currentCard.definition);

      // Step 3: After 3.5s, flip back and advance to next card
      const timer2 = window.setTimeout(() => {
        setIsFlipped(false);
        if (activeCardIndex < cards.length - 1) {
          setActiveCardIndex(prev => prev + 1);
        } else {
          // Loop back to start
          setActiveCardIndex(0);
        }
      }, 3500);

      autoPlayTimeoutRef.current = timer2;
    }, 2500);

    autoPlayTimeoutRef.current = timer1;

    return () => {
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isAutoPlaying, activeCardIndex, cards]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-20">
      {/* Top Breadcrumb */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-dark text-xs font-heading font-extrabold text-dark shadow-pop-active hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
      >
        <ArrowLeft size={14} strokeWidth={2.5} /> Back to Library
      </button>

      {/* Set Header: Title & Playful Actions */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-secondary text-white text-[10px] font-heading font-black border-2 border-dark shadow-pop-active">
            <Sparkles size={11} strokeWidth={3} />
            <span>STUDY SET</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-dark tracking-tight">
            {deck.title}
          </h1>
          <p className="text-sm font-medium text-dark/70 max-w-2xl leading-relaxed">
            {deck.description || 'Practice flashcards and test your recall with interactive multiple choice.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Print Study Guide Button */}
          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="w-10 h-10 rounded-full bg-white border-2 border-dark text-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:shadow-pop-active flex items-center justify-center transition-all"
            title="Print Study Guide & Flashcards"
          >
            <Printer size={16} strokeWidth={2.5} />
          </button>

          {/* Share Set Link */}
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Set link copied to clipboard!');
              }
            }}
            className="w-10 h-10 rounded-full bg-white border-2 border-dark text-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:shadow-pop-active flex items-center justify-center transition-all"
            title="Share set"
          >
            <Share2 size={16} strokeWidth={2.5} />
          </button>

          {/* Add New Card */}
          <button
            onClick={onAddCard}
            className="w-10 h-10 rounded-full bg-tertiary border-2 border-dark text-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:shadow-pop-active flex items-center justify-center transition-all"
            title="Add card"
          >
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Study Modes: 3 Large "Candy Cards" */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Flashcards Candy Card */}
        <button
          onClick={() => {
            sounds.playClick();
            onStudy();
          }}
          disabled={cards.length === 0}
          className="p-5 rounded-3xl bg-accent hover:bg-accent-hover text-white border-2 border-dark shadow-pop hover:-translate-x-1 hover:-translate-y-1 hover:shadow-pop-lg active:shadow-pop-active transition-all text-left flex items-center gap-4 group disabled:opacity-40"
        >
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-dark text-accent flex items-center justify-center shrink-0 shadow-pop-active group-hover:rotate-6 transition-transform">
            <Play size={20} strokeWidth={3} className="fill-accent ml-0.5" />
          </div>
          <div>
            <span className="text-[10px] font-heading font-black uppercase tracking-wider text-white/80 block">
              Mode 01
            </span>
            <span className="text-base font-heading font-black tracking-tight block">
              Flashcards
            </span>
          </div>
        </button>

        {/* Test Mode Candy Card */}
        <button
          onClick={() => {
            sounds.playClick();
            onQuiz();
          }}
          disabled={cards.length === 0}
          className="p-5 rounded-3xl bg-secondary hover:bg-secondary-hover text-white border-2 border-dark shadow-pop hover:-translate-x-1 hover:-translate-y-1 hover:shadow-pop-lg active:shadow-pop-active transition-all text-left flex items-center gap-4 group disabled:opacity-40"
        >
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-dark text-secondary flex items-center justify-center shrink-0 shadow-pop-active group-hover:rotate-6 transition-transform">
            <HelpCircle size={20} strokeWidth={3} />
          </div>
          <div>
            <span className="text-[10px] font-heading font-black uppercase tracking-wider text-white/80 block">
              Mode 02
            </span>
            <span className="text-base font-heading font-black tracking-tight block">
              Test Quiz
            </span>
          </div>
        </button>

        {/* Match Mode Candy Card */}
        <button
          onClick={() => {
            sounds.playClick();
            onMatch();
          }}
          disabled={cards.length < 3}
          className="p-5 rounded-3xl bg-quaternary hover:bg-quaternary-hover text-dark border-2 border-dark shadow-pop hover:-translate-x-1 hover:-translate-y-1 hover:shadow-pop-lg active:shadow-pop-active transition-all text-left flex items-center gap-4 group disabled:opacity-40"
        >
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-dark text-dark flex items-center justify-center shrink-0 shadow-pop-active group-hover:rotate-6 transition-transform">
            <Puzzle size={20} strokeWidth={3} />
          </div>
          <div>
            <span className="text-[10px] font-heading font-black uppercase tracking-wider text-dark/70 block">
              Mode 03
            </span>
            <span className="text-base font-heading font-black tracking-tight block">
              Speed Match
            </span>
          </div>
        </button>
      </div>

      {/* Quick Filters & Hands-Free Audio Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border-2 border-dark shadow-pop">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setFilterStarred(false);
              setActiveCardIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-heading font-black border-2 transition-all ${
              !filterStarred
                ? 'bg-dark text-white border-dark shadow-pop-active'
                : 'bg-cream text-dark border-transparent hover:border-dark'
            }`}
          >
            All Cards ({deck.cards.length})
          </button>

          <button
            onClick={() => {
              if (starredCount > 0) {
                setFilterStarred(true);
                setActiveCardIndex(0);
                setIsFlipped(false);
              }
            }}
            disabled={starredCount === 0}
            className={`px-3 py-1.5 rounded-full text-xs font-heading font-black border-2 transition-all flex items-center gap-1.5 ${
              filterStarred
                ? 'bg-tertiary text-dark border-dark shadow-pop-active'
                : 'bg-cream text-dark border-transparent hover:border-dark disabled:opacity-40'
            }`}
          >
            <Star size={12} strokeWidth={2.5} className="fill-tertiary text-dark" />
            Starred Only ({starredCount})
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Start Stopwatch Button */}
          {stopwatchSeconds === 0 && !isStopwatchRunning ? (
            <button
              onClick={handleToggleStopwatch}
              className="px-3.5 py-1.5 rounded-full text-xs font-heading font-black border-2 border-dark bg-cream hover:bg-tertiary shadow-pop-active transition-all flex items-center gap-1.5 text-dark"
              title="Start study stopwatch"
            >
              <Timer size={14} strokeWidth={2.5} />
              <span>Start Stopwatch</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-tertiary px-3.5 py-1 rounded-full border-2 border-dark shadow-pop text-xs font-heading font-black text-dark animate-bounce-in">
              <button
                onClick={handleToggleStopwatch}
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                title={isStopwatchRunning ? 'Pause stopwatch' : 'Resume stopwatch'}
              >
                <Timer size={14} strokeWidth={2.5} className={isStopwatchRunning ? 'animate-pulse' : ''} />
                <span className="font-mono text-xs tracking-wider">
                  {formatStopwatchTime(stopwatchSeconds)}
                </span>
                {isStopwatchRunning ? (
                  <Pause size={11} strokeWidth={3} className="ml-0.5 fill-dark" />
                ) : (
                  <Play size={11} strokeWidth={3} className="ml-0.5 fill-dark" />
                )}
              </button>
              <button
                onClick={handleResetStopwatch}
                className="ml-1 p-0.5 hover:rotate-180 transition-transform text-dark/70 hover:text-dark"
                title="Reset stopwatch"
              >
                <RotateCcw size={12} strokeWidth={2.5} />
              </button>
            </div>
          )}

          {/* Hands-Free Auto-Play Button */}
          <button
            onClick={handleToggleAutoPlay}
            className={`px-4 py-1.5 rounded-full text-xs font-heading font-black border-2 border-dark transition-all flex items-center gap-2 ${
              isAutoPlaying
                ? 'bg-secondary text-white shadow-pop animate-pulse'
                : 'bg-cream text-dark hover:bg-tertiary shadow-pop-active'
            }`}
            title="Hands-free auto audio playback and card flip"
          >
            {isAutoPlaying ? (
              <>
                <Pause size={13} strokeWidth={3} className="fill-white" />
                <span>Auto-Playing Audio...</span>
              </>
            ) : (
              <>
                <Headphones size={13} strokeWidth={2.5} />
                <span>Hands-Free Auto-Play</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive 3D Flashcard ("Giant Sticker Card") */}
      {cards.length > 0 && currentCard ? (
        <div className="space-y-5">
          <div className="perspective-1000 w-full min-h-[360px] sm:min-h-[420px] select-none cursor-pointer">
            <div
              onClick={handleFlip}
              className={`relative w-full h-full min-h-[360px] sm:min-h-[420px] rounded-3xl transition-transform duration-500 preserve-3d shadow-pop-lg bg-white border-2 border-dark ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* ================= FRONT (TERM) ================= */}
              <div className="absolute inset-0 w-full h-full rounded-3xl p-8 sm:p-12 flex flex-col justify-between backface-hidden bg-white">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-accent-light border-2 border-dark text-accent text-xs font-heading font-black uppercase tracking-wider shadow-pop-active">
                    TERM
                  </span>

                  <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => sounds.speak(currentCard.term)}
                      className="w-9 h-9 rounded-full bg-cream border-2 border-dark text-dark hover:bg-tertiary flex items-center justify-center shadow-pop-active transition-all"
                      title="Pronounce"
                    >
                      <Volume2 size={16} strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onToggleStar(currentCard.id);
                      }}
                      className={`w-9 h-9 rounded-full border-2 border-dark flex items-center justify-center shadow-pop-active transition-all ${
                        currentCard.starred
                          ? 'bg-tertiary text-dark'
                          : 'bg-cream text-dark/40 hover:bg-tertiary hover:text-dark'
                      }`}
                      title="Star card"
                    >
                      <Star
                        size={16}
                        strokeWidth={2.5}
                        className={currentCard.starred ? 'fill-dark' : ''}
                      />
                    </button>
                  </div>
                </div>

                <div className="my-auto py-8 text-center px-4">
                  <h2 className="text-3xl sm:text-5xl font-heading font-black text-dark leading-tight">
                    {currentCard.term}
                  </h2>
                  {currentCard.hint && (
                    <p className="text-xs font-bold text-accent mt-3 inline-block px-3 py-1 bg-accent-light rounded-full border border-accent">
                      💡 Clue: {currentCard.hint}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-heading font-bold text-dark/40 pt-4 border-t-2 border-dark/10">
                  <span className="flex items-center gap-1.5">
                    <RotateCw size={13} strokeWidth={2.5} /> Tap card or press Space to flip
                  </span>
                  <span className="uppercase tracking-wider">Face 01 / Front</span>
                </div>
              </div>

              {/* ================= BACK (DEFINITION) ================= */}
              <div className="absolute inset-0 w-full h-full rounded-3xl p-8 sm:p-12 flex flex-col justify-between backface-hidden rotate-y-180 bg-cream">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3.5 py-1 rounded-full bg-secondary border-2 border-dark text-white text-xs font-heading font-black uppercase tracking-wider shadow-pop-active">
                      DEFINITION
                    </span>
                    <span className="text-xs font-heading font-bold text-dark/50 truncate max-w-[200px]">
                      {currentCard.term}
                    </span>
                  </div>

                  <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => sounds.speak(currentCard.definition)}
                      className="w-9 h-9 rounded-full bg-white border-2 border-dark text-dark hover:bg-tertiary flex items-center justify-center shadow-pop-active transition-all"
                      title="Pronounce"
                    >
                      <Volume2 size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                <div className="my-auto py-8 text-center px-4 max-w-2xl mx-auto space-y-4">
                  <p className="text-xl sm:text-3xl font-medium text-dark leading-relaxed">
                    {currentCard.definition}
                  </p>
                  {currentCard.example && (
                    <div className="text-left bg-white p-4 rounded-2xl border-2 border-dark shadow-pop-active">
                      <p className="text-xs text-dark/80 font-medium">
                        <strong className="font-heading font-black text-dark">Example: </strong>
                        {currentCard.example}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-heading font-bold text-dark/40 pt-4 border-t-2 border-dark/10">
                  <span className="flex items-center gap-1.5">
                    <RotateCw size={13} strokeWidth={2.5} /> Tap to flip back
                  </span>
                  <span className="uppercase tracking-wider">Face 02 / Back</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Flashcard Bottom Controls */}
          <div className="flex items-center justify-between bg-white p-4 sm:px-8 rounded-3xl border-2 border-dark shadow-pop">
            <button
              onClick={handleShuffle}
              className={`px-4 py-2 rounded-full border-2 border-dark font-heading font-extrabold text-xs flex items-center gap-2 transition-all ${
                isShuffled
                  ? 'bg-tertiary text-dark shadow-pop-active'
                  : 'bg-cream text-dark hover:bg-tertiary shadow-pop-active hover:-translate-x-0.5 hover:-translate-y-0.5'
              }`}
              title="Shuffle cards"
            >
              <Shuffle size={14} strokeWidth={2.5} />
              <span className="hidden sm:inline">Shuffle</span>
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                disabled={activeCardIndex === 0}
                className="w-10 h-10 rounded-full bg-cream border-2 border-dark text-dark hover:bg-tertiary disabled:opacity-30 flex items-center justify-center shadow-pop-active active:shadow-none transition-all"
                title="Previous card"
              >
                <ChevronLeft size={22} strokeWidth={2.5} />
              </button>

              <span className="px-4 py-1.5 rounded-full bg-cream border-2 border-dark font-heading font-black text-sm text-dark min-w-[70px] text-center shadow-pop-active">
                {activeCardIndex + 1} / {cards.length}
              </span>

              <button
                onClick={handleNext}
                disabled={activeCardIndex === cards.length - 1}
                className="w-10 h-10 rounded-full bg-cream border-2 border-dark text-dark hover:bg-tertiary disabled:opacity-30 flex items-center justify-center shadow-pop-active active:shadow-none transition-all"
                title="Next card"
              >
                <ChevronRight size={22} strokeWidth={2.5} />
              </button>
            </div>

            <button
              onClick={onStudy}
              className="w-10 h-10 rounded-full bg-cream border-2 border-dark text-dark hover:bg-tertiary flex items-center justify-center shadow-pop-active transition-all"
              title="Full Study View"
            >
              <Maximize2 size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border-2 border-dark text-center shadow-pop">
          <p className="text-sm font-bold text-dark/70">
            No starred cards yet! Click the star icon on any card to study them here.
          </p>
        </div>
      )}

      {/* Author & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t-2 border-dark/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary border-2 border-dark text-white font-heading font-black text-sm flex items-center justify-center shadow-pop-active">
            A
          </div>
          <div>
            <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-dark/50 block">Author</span>
            <span className="text-sm font-heading font-black text-dark">Afya</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBatchImport}
            className="px-4 py-2.5 rounded-full bg-white border-2 border-dark text-xs font-heading font-extrabold text-dark hover:bg-tertiary shadow-pop-active transition-all flex items-center gap-2"
          >
            <Upload size={14} strokeWidth={2.5} /> Batch Import
          </button>
          <button
            onClick={onAddCard}
            className="px-5 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-white text-xs font-heading font-black border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:shadow-pop-active transition-all flex items-center gap-2"
          >
            <Plus size={15} strokeWidth={3} /> Add Card
          </button>
        </div>
      </div>

      {/* Terms Ledger */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-black text-dark">
            Terms in this Set ({deck.cards.length})
          </h2>
        </div>

        <div className="space-y-3.5">
          {deck.cards.map((card, idx) => {
            const colorClass = ROW_COLORS[idx % ROW_COLORS.length];
            return (
              <div
                key={card.id}
                className="bg-white rounded-2xl border-2 border-dark p-5 shadow-pop-active hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
              >
                {/* Left: Index + Term */}
                <div className="w-full md:w-1/3 flex items-start gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-xl border-2 border-dark ${colorClass} font-heading font-black text-xs flex items-center justify-center shrink-0 shadow-pop-active mt-0.5`}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-black text-dark">
                      {card.term}
                    </h3>
                    {card.hint && (
                      <span className="text-xs font-bold text-accent block mt-0.5">
                        Clue: {card.hint}
                      </span>
                    )}
                  </div>
                </div>

                {/* Middle: Definition */}
                <div className="w-full md:w-1/2 md:border-l-2 md:border-dark/10 md:pl-6">
                  <p className="text-sm font-medium text-dark leading-relaxed">
                    {card.definition}
                  </p>
                  {card.example && (
                    <p className="text-xs font-semibold text-dark/60 italic mt-1.5">
                      Ex: {card.example}
                    </p>
                  )}
                </div>

                {/* Right: Card Actions */}
                <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => sounds.speak(card.term)}
                    className="w-8 h-8 rounded-full bg-cream border-2 border-dark text-dark hover:bg-tertiary flex items-center justify-center transition-all"
                    title="Pronounce"
                  >
                    <Volume2 size={14} strokeWidth={2.5} />
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClick();
                      onToggleStar(card.id);
                    }}
                    className={`w-8 h-8 rounded-full border-2 border-dark flex items-center justify-center transition-all ${
                      card.starred
                        ? 'bg-tertiary text-dark'
                        : 'bg-cream text-dark/30 hover:bg-tertiary hover:text-dark'
                    }`}
                    title="Star card"
                  >
                    <Star size={14} strokeWidth={2.5} className={card.starred ? 'fill-dark' : ''} />
                  </button>

                  <button
                    onClick={() => onEditCard(card)}
                    className="w-8 h-8 rounded-full bg-cream border-2 border-dark text-dark hover:bg-muted flex items-center justify-center transition-all"
                    title="Edit card"
                  >
                    <Edit3 size={14} strokeWidth={2.5} />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${card.term}"?`)) {
                        onDeleteCard(card.id);
                      }
                    }}
                    className="w-8 h-8 rounded-full bg-cream border-2 border-dark text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-all"
                    title="Delete card"
                  >
                    <Trash2 size={14} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Print Modal */}
      <PrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        deck={deck}
      />
    </div>
  );
};
