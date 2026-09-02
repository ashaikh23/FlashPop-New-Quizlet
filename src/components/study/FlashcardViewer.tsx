import React, { useState, useEffect, useCallback } from 'react';
import { Card, Deck } from '../../types';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Star,
  Check,
  X,
  Volume2,
  HelpCircle,
  RotateCw,
  Timer,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';
import { sounds } from '../../services/sound';

interface FlashcardViewerProps {
  deck: Deck;
  onBack: () => void;
  onToggleMastery: (cardId: string, mastered: boolean) => void;
  onToggleStar: (cardId: string) => void;
}

export const FlashcardViewer: React.FC<FlashcardViewerProps> = ({
  deck,
  onBack,
  onToggleMastery,
  onToggleStar,
}) => {
  const [cards, setCards] = useState<Card[]>(deck.cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [onlyStarred, setOnlyStarred] = useState(false);

  // Stopwatch state
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const stopwatchIntervalRef = React.useRef<number | null>(null);

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

  useEffect(() => {
    let list = [...deck.cards];
    if (onlyStarred) {
      list = list.filter(c => c.starred);
    }
    if (list.length === 0 && onlyStarred) {
      setOnlyStarred(false);
      list = [...deck.cards];
    }
    setCards(list);
    setCurrentIndex(prev => (prev >= list.length ? Math.max(0, list.length - 1) : prev));
  }, [deck.cards]);

  useEffect(() => {
    let list = [...deck.cards];
    if (onlyStarred) {
      list = list.filter(c => c.starred);
    }
    setCards(list);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
  }, [onlyStarred]);

  const currentCard = cards[currentIndex];

  const handleFlip = useCallback(() => {
    sounds.playFlip();
    setIsFlipped(prev => !prev);
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      sounds.playClick();
      setIsFlipped(false);
      setShowHint(false);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, cards.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      sounds.playClick();
      setIsFlipped(false);
      setShowHint(false);
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const handleShuffle = () => {
    sounds.playClick();
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
    setIsShuffled(!isShuffled);
  };

  const handleMarkMastered = (mastered: boolean) => {
    if (!currentCard) return;
    if (mastered) {
      sounds.playCorrect();
    } else {
      sounds.playIncorrect();
    }
    onToggleMastery(currentCard.id, mastered);
    if (currentIndex < cards.length - 1) {
      setTimeout(() => handleNext(), 150);
    }
  };

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
      } else if (e.key === '1') {
        e.preventDefault();
        handleMarkMastered(false);
      } else if (e.key === '2') {
        e.preventDefault();
        handleMarkMastered(true);
      } else if (e.key === 's' || e.key === 'S') {
        if (currentCard) {
          sounds.playClick();
          onToggleStar(currentCard.id);
        }
      } else if (e.key === 'p' || e.key === 'P') {
        if (currentCard) {
          sounds.speak(isFlipped ? currentCard.definition : currentCard.term);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, currentCard, isFlipped, onToggleStar]);

  if (!currentCard || cards.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center bg-white rounded-3xl p-8 border-2 border-dark shadow-pop">
        <h3 className="text-xl font-heading font-black text-dark">No cards to study</h3>
        <p className="text-xs font-medium text-dark/60 mt-1 mb-6">
          {onlyStarred ? 'No starred cards in this set.' : 'This set has no cards.'}
        </p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-full text-xs font-heading font-black bg-accent text-white border-2 border-dark shadow-pop"
        >
          Return to Set
        </button>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / cards.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-20">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-dark text-xs font-heading font-extrabold text-dark shadow-pop-active hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
        >
          <ArrowLeft size={14} strokeWidth={2.5} /> Back to Set
        </button>

        <div className="flex items-center gap-2.5">
          {/* Study Stopwatch */}
          {stopwatchSeconds === 0 && !isStopwatchRunning ? (
            <button
              onClick={handleToggleStopwatch}
              className="px-3 py-1.5 rounded-full border-2 border-dark text-xs font-heading font-black flex items-center gap-1.5 shadow-pop-active bg-white text-dark hover:bg-tertiary transition-all"
              title="Start study stopwatch"
            >
              <Timer size={13} strokeWidth={2.5} />
              <span>Stopwatch</span>
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-tertiary px-3 py-1 rounded-full border-2 border-dark shadow-pop text-xs font-heading font-black text-dark animate-bounce-in">
              <button
                onClick={handleToggleStopwatch}
                className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                title={isStopwatchRunning ? 'Pause stopwatch' : 'Resume stopwatch'}
              >
                <Timer size={13} strokeWidth={2.5} className={isStopwatchRunning ? 'animate-pulse' : ''} />
                <span className="font-mono text-xs tracking-wider">
                  {formatStopwatchTime(stopwatchSeconds)}
                </span>
                {isStopwatchRunning ? (
                  <Pause size={10} strokeWidth={3} className="fill-dark" />
                ) : (
                  <Play size={10} strokeWidth={3} className="fill-dark" />
                )}
              </button>
              <button
                onClick={handleResetStopwatch}
                className="ml-1 p-0.5 hover:rotate-180 transition-transform text-dark/70 hover:text-dark"
                title="Reset stopwatch"
              >
                <RotateCcw size={11} strokeWidth={2.5} />
              </button>
            </div>
          )}

          <button
            onClick={() => setOnlyStarred(!onlyStarred)}
            className={`px-4 py-1.5 rounded-full border-2 border-dark text-xs font-heading font-black flex items-center gap-1.5 shadow-pop-active transition-all ${
              onlyStarred
                ? 'bg-tertiary text-dark'
                : 'bg-white text-dark hover:bg-tertiary'
            }`}
          >
            <Star size={13} strokeWidth={2.5} className={onlyStarred ? 'fill-dark' : ''} />
            <span>Starred</span>
          </button>

          <button
            onClick={handleShuffle}
            className={`px-4 py-1.5 rounded-full border-2 border-dark text-xs font-heading font-black flex items-center gap-1.5 shadow-pop-active transition-all ${
              isShuffled
                ? 'bg-accent text-white'
                : 'bg-white text-dark hover:bg-accent hover:text-white'
            }`}
          >
            <Shuffle size={13} strokeWidth={2.5} />
            <span className="hidden sm:inline">Shuffle</span>
          </button>
        </div>
      </div>

      {/* Progress Bar with Chunky 2px Border */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-heading font-extrabold text-dark">
          <span className="px-2.5 py-0.5 rounded-full bg-white border-2 border-dark shadow-pop-active">
            Card {currentIndex + 1} of {cards.length}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-quaternary border-2 border-dark shadow-pop-active">
            {progressPercent}% Complete
          </span>
        </div>
        <div className="w-full h-3.5 rounded-full bg-white border-2 border-dark p-0.5 overflow-hidden shadow-pop-active">
          <div
            className="h-full bg-quaternary rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Giant 3D Flashcard ("Sticker Card") */}
      <div className="perspective-1000 w-full min-h-[380px] sm:min-h-[440px] select-none cursor-pointer">
        <div
          onClick={handleFlip}
          className={`relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-3xl transition-transform duration-500 preserve-3d shadow-pop-lg bg-white border-2 border-dark ${
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
                  title="Pronounce (P)"
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
                      : 'bg-cream text-dark/30 hover:bg-tertiary hover:text-dark'
                  }`}
                  title="Star (S)"
                >
                  <Star size={16} strokeWidth={2.5} className={currentCard.starred ? 'fill-dark' : ''} />
                </button>
              </div>
            </div>

            {/* Front Term Text */}
            <div className="my-auto py-8 text-center space-y-4 px-4">
              <h2 className="text-3xl sm:text-5xl font-heading font-black text-dark leading-tight">
                {currentCard.term}
              </h2>

              {currentCard.hint && (
                <div onClick={e => e.stopPropagation()}>
                  {!showHint ? (
                    <button
                      type="button"
                      onClick={() => setShowHint(true)}
                      className="text-xs font-heading font-extrabold text-accent inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent-light border-2 border-dark shadow-pop-active"
                    >
                      <HelpCircle size={13} strokeWidth={2.5} /> Show Clue
                    </button>
                  ) : (
                    <p className="text-xs font-bold text-dark bg-cream p-3 rounded-2xl border-2 border-dark shadow-pop-active max-w-sm mx-auto">
                      💡 {currentCard.hint}
                    </p>
                  )}
                </div>
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
                  title="Pronounce (P)"
                >
                  <Volume2 size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Back Definition Text */}
            <div className="my-auto py-8 text-center space-y-4 px-4 max-w-2xl mx-auto">
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

      {/* Sorting & Nav Controls: "Still Learning" (Hot Pink) vs "Know" (Mint Green) */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="w-12 h-12 rounded-full bg-white border-2 border-dark text-dark hover:bg-tertiary disabled:opacity-30 transition-all flex items-center justify-center shadow-pop active:shadow-none"
          title="Previous (Left Arrow)"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>

        <div className="flex items-center gap-4 flex-1 max-w-md justify-center">
          {/* Still Learning Candy Button */}
          <button
            onClick={() => handleMarkMastered(false)}
            className="flex-1 py-3.5 px-4 rounded-full bg-secondary hover:bg-secondary-hover text-white font-heading font-black text-xs uppercase tracking-wider border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-pop-active transition-all flex items-center justify-center gap-2"
          >
            <div className="w-5 h-5 rounded-full bg-white text-secondary flex items-center justify-center shadow-sm">
              <X size={14} strokeWidth={3} />
            </div>
            <span>Still Learning</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 rounded-md bg-dark/20 text-[10px] font-mono">1</kbd>
          </button>

          {/* Know Candy Button */}
          <button
            onClick={() => handleMarkMastered(true)}
            className="flex-1 py-3.5 px-4 rounded-full bg-quaternary hover:bg-quaternary-hover text-dark font-heading font-black text-xs uppercase tracking-wider border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-pop-active transition-all flex items-center justify-center gap-2"
          >
            <div className="w-5 h-5 rounded-full bg-dark text-white flex items-center justify-center shadow-sm">
              <Check size={14} strokeWidth={3} />
            </div>
            <span>Know</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 rounded-md bg-dark/10 text-[10px] font-mono">2</kbd>
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          className="w-12 h-12 rounded-full bg-white border-2 border-dark text-dark hover:bg-tertiary disabled:opacity-30 transition-all flex items-center justify-center shadow-pop active:shadow-none"
          title="Next (Right Arrow)"
        >
          <ChevronRight size={24} strokeWidth={2.5} />
        </button>
      </div>

      {/* Keyboard Shortcuts Pill Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-heading font-bold text-dark/60 pt-2">
        <span className="px-3 py-1 rounded-full bg-white border-2 border-dark shadow-pop-active">
          <kbd className="font-mono text-dark font-black">Space</kbd> Flip
        </span>
        <span className="px-3 py-1 rounded-full bg-white border-2 border-dark shadow-pop-active">
          <kbd className="font-mono text-dark font-black">← / →</kbd> Navigate
        </span>
        <span className="px-3 py-1 rounded-full bg-white border-2 border-dark shadow-pop-active">
          <kbd className="font-mono text-dark font-black">1</kbd> Still Learning
        </span>
        <span className="px-3 py-1 rounded-full bg-white border-2 border-dark shadow-pop-active">
          <kbd className="font-mono text-dark font-black">2</kbd> Know
        </span>
      </div>
    </div>
  );
};
