import React, { useEffect } from 'react';
import { QuizResult, Card } from '../../types';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Check,
  X,
  Clock,
  BookOpen,
  RefreshCw,
  Trophy,
  Sparkles,
} from 'lucide-react';
import { sounds } from '../../services/sound';

interface QuizResultsProps {
  result: QuizResult;
  onRetake: () => void;
  onRequizMissed: (missedCards: Card[]) => void;
  onStudyCards: () => void;
  onBackToDeck: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  result,
  onRetake,
  onRequizMissed,
  onStudyCards,
  onBackToDeck,
}) => {
  useEffect(() => {
    sounds.playComplete();

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#8B5CF6', '#F472B6', '#FBBF24', '#34D399'],
    });
  }, [result.percentage]);

  const missedAnswers = result.answers.filter(a => !a.isCorrect);
  const rawMissedCards = missedAnswers.map(a => a.question.originalCard);
  const missedCards = Array.from(new Map(rawMissedCards.map(c => [c.id, c])).values());

  const getFeedback = () => {
    if (result.percentage === 100) return { title: 'Perfect Score!', subtitle: 'You crushed every single question!' };
    if (result.percentage >= 80) return { title: 'High Five!', subtitle: "You're demonstrating strong concept recall." };
    if (result.percentage >= 60) return { title: 'Solid Effort!', subtitle: 'Review the missed concepts and try again.' };
    return { title: 'Keep Playing!', subtitle: "Practice the terms you missed to level up your mastery." };
  };

  const feedback = getFeedback();

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-20">
      {/* Top Results Card ("The Trophy Sticker Card") */}
      <div className="bg-white rounded-3xl border-2 border-dark p-8 sm:p-12 text-center space-y-6 shadow-pop">
        <div className="w-20 h-20 mx-auto rounded-full bg-tertiary border-2 border-dark flex items-center justify-center shadow-pop animate-bounce-in">
          <Trophy size={36} strokeWidth={2.5} className="text-dark" />
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-secondary text-white text-xs font-heading font-black border-2 border-dark shadow-pop-active">
            <Sparkles size={12} strokeWidth={3} />
            <span>SESSION COMPLETE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-dark tracking-tight mt-2">
            {feedback.title}
          </h1>
          <p className="text-sm font-medium text-dark/70">
            {feedback.subtitle}
          </p>
        </div>

        {/* Score Badge */}
        <div className="pt-2">
          <span className="text-7xl sm:text-8xl font-heading font-black text-accent tracking-tight inline-block drop-shadow-sm">
            {result.percentage}%
          </span>
          <p className="text-xs font-heading font-black uppercase tracking-wider text-dark/50 mt-1">
            Overall Accuracy
          </p>
        </div>

        {/* 3 Stats Pills */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t-2 border-dark/10 max-w-md mx-auto">
          <div className="p-3.5 bg-quaternary-light border-2 border-dark rounded-2xl text-center shadow-pop-active">
            <span className="text-2xl font-heading font-black text-dark flex items-center justify-center gap-1">
              <Check size={20} strokeWidth={3} className="text-emerald-700" /> {result.correctCount}
            </span>
            <p className="text-xs font-heading font-extrabold uppercase text-dark/60 mt-0.5">Correct</p>
          </div>

          <div className="p-3.5 bg-secondary-light border-2 border-dark rounded-2xl text-center shadow-pop-active">
            <span className="text-2xl font-heading font-black text-dark flex items-center justify-center gap-1">
              <X size={20} strokeWidth={3} className="text-secondary" /> {result.incorrectCount}
            </span>
            <p className="text-xs font-heading font-extrabold uppercase text-dark/60 mt-0.5">Missed</p>
          </div>

          <div className="p-3.5 bg-tertiary-light border-2 border-dark rounded-2xl text-center shadow-pop-active">
            <span className="text-2xl font-heading font-black text-dark flex items-center justify-center gap-1">
              <Clock size={20} strokeWidth={2.5} className="text-dark" /> {Math.round(result.timeElapsedSeconds)}s
            </span>
            <p className="text-xs font-heading font-extrabold uppercase text-dark/60 mt-0.5">Time</p>
          </div>
        </div>

        {/* Action Candy Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          {missedCards.length > 0 && (
            <button
              onClick={() => {
                sounds.playClick();
                onRequizMissed(missedCards);
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full font-heading font-black text-xs uppercase tracking-wider bg-secondary hover:bg-secondary-hover text-white border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-pop-active transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={15} strokeWidth={2.5} /> Re-test Missed Only ({missedCards.length})
            </button>
          )}

          <button
            onClick={() => {
              sounds.playClick();
              onRetake();
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full font-heading font-black text-xs uppercase tracking-wider bg-accent hover:bg-accent-hover text-white border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-pop-active transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={15} strokeWidth={2.5} /> Take New Test
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onStudyCards();
            }}
            className="w-full sm:w-auto px-5 py-3.5 rounded-full font-heading font-extrabold text-xs uppercase tracking-wider bg-cream hover:bg-tertiary text-dark border-2 border-dark shadow-pop-active hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
          >
            <BookOpen size={15} strokeWidth={2.5} /> Flashcards
          </button>

          <button
            onClick={onBackToDeck}
            className="w-full sm:w-auto px-5 py-3.5 rounded-full font-heading font-extrabold text-xs text-dark/70 hover:text-dark transition-colors"
          >
            Return to Set
          </button>
        </div>
      </div>

      {/* Answer Ledger Review */}
      <div className="space-y-4">
        <h2 className="text-xl font-heading font-black text-dark">
          Question Ledger Review ({result.answers.length})
        </h2>

        <div className="space-y-3.5">
          {result.answers.map((ans, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-3xl border-2 border-dark shadow-pop-active transition-all ${
                ans.isCorrect ? 'bg-white' : 'bg-secondary-light/30'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-cream border-2 border-dark text-xs font-heading font-black flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-heading font-black uppercase px-3 py-0.5 rounded-full border-2 border-dark ${
                        ans.isCorrect
                          ? 'bg-quaternary text-dark'
                          : 'bg-secondary text-white'
                      }`}
                    >
                      {ans.isCorrect ? 'Correct' : 'Missed'}
                    </span>
                  </div>

                  <h3 className="text-base font-heading font-black text-dark">
                    {ans.question.prompt}
                  </h3>

                  <div className="space-y-1 text-xs font-semibold">
                    {!ans.isCorrect && (
                      <p className="text-secondary">
                        <strong className="uppercase font-heading font-black text-secondary block">Your Choice:</strong>{' '}
                        {ans.selectedAnswer || '(Timed out / Blank)'}
                      </p>
                    )}
                    <p className="text-emerald-800">
                      <strong className="uppercase font-heading font-black text-emerald-800 block">Correct Answer:</strong>{' '}
                      {ans.question.correctAnswer}
                    </p>
                  </div>
                </div>

                {ans.isCorrect ? (
                  <div className="w-8 h-8 rounded-full bg-quaternary border-2 border-dark flex items-center justify-center shrink-0 mt-1 shadow-pop-active">
                    <Check size={18} strokeWidth={3} className="text-dark" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-secondary border-2 border-dark flex items-center justify-center shrink-0 mt-1 shadow-pop-active">
                    <X size={18} strokeWidth={3} className="text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
