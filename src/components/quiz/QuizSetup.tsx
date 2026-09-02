import React, { useState } from 'react';
import { Deck, QuizSettings, QuestionMode } from '../../types';
import { ArrowLeft, Play, Clock, Star, Shuffle, Sparkles } from 'lucide-react';
import { sounds } from '../../services/sound';

interface QuizSetupProps {
  deck: Deck;
  onBack: () => void;
  onStartQuiz: (settings: QuizSettings) => void;
}

export const QuizSetup: React.FC<QuizSetupProps> = ({
  deck,
  onBack,
  onStartQuiz,
}) => {
  const starredCount = deck.cards.filter(c => c.starred).length;
  const totalCards = deck.cards.length;

  const [questionCount, setQuestionCount] = useState<number | 'all'>(
    totalCards > 10 ? 10 : 'all'
  );
  const [questionMode, setQuestionMode] = useState<QuestionMode>('term-to-def');
  const [timed, setTimed] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(15);
  const [onlyStarred, setOnlyStarred] = useState(false);

  const handleStart = () => {
    sounds.playClick();
    onStartQuiz({
      questionCount,
      questionMode,
      timed,
      timePerQuestionSeconds: timeSeconds,
      onlyStarred,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in pb-20">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-dark text-xs font-heading font-extrabold text-dark shadow-pop-active hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
      >
        <ArrowLeft size={14} strokeWidth={2.5} /> Back to Set
      </button>

      <div className="bg-white rounded-3xl border-2 border-dark p-6 sm:p-10 space-y-7 shadow-pop">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-white text-xs font-heading font-black border-2 border-dark shadow-pop-active">
            <Sparkles size={12} strokeWidth={3} />
            <span>TEST ARENA</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-dark tracking-tight mt-2">
            Quiz Settings: {deck.title}
          </h1>
          <p className="text-sm font-medium text-dark/70 mt-1">
            Configure your multiple-choice active recall session.
          </p>
        </div>

        {/* Question Count Pills */}
        <div className="space-y-2.5 pt-2 border-t-2 border-dark/10">
          <label className="block text-xs font-heading font-black uppercase tracking-wider text-dark/50">
            Number of Questions
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {[5, 10, 15, 'all'].map(option => {
              const disabled = typeof option === 'number' && totalCards < option && totalCards < 5;
              const isSelected = questionCount === option;

              return (
                <button
                  key={String(option)}
                  type="button"
                  disabled={disabled}
                  onClick={() => setQuestionCount(option as number | 'all')}
                  className={`py-3 px-3 rounded-2xl border-2 border-dark font-heading font-black text-xs transition-all ${
                    isSelected
                      ? 'bg-accent text-white shadow-pop -translate-y-0.5'
                      : 'bg-cream text-dark hover:bg-tertiary shadow-pop-active'
                  } disabled:opacity-30`}
                >
                  {option === 'all' ? `All (${totalCards})` : `${option} Cards`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Mode */}
        <div className="space-y-2.5">
          <label className="block text-xs font-heading font-black uppercase tracking-wider text-dark/50">
            Prompt / Answer Direction
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setQuestionMode('term-to-def')}
              className={`p-4 rounded-2xl border-2 border-dark text-left transition-all ${
                questionMode === 'term-to-def'
                  ? 'bg-accent-light border-dark shadow-pop -translate-y-0.5'
                  : 'bg-white hover:bg-cream shadow-pop-active'
              }`}
            >
              <div className="text-xs font-heading font-black text-dark">Definition</div>
              <div className="text-[11px] font-medium text-dark/60 mt-1">Prompt: Term. Pick definition.</div>
            </button>

            <button
              type="button"
              onClick={() => setQuestionMode('def-to-term')}
              className={`p-4 rounded-2xl border-2 border-dark text-left transition-all ${
                questionMode === 'def-to-term'
                  ? 'bg-secondary-light border-dark shadow-pop -translate-y-0.5'
                  : 'bg-white hover:bg-cream shadow-pop-active'
              }`}
            >
              <div className="text-xs font-heading font-black text-dark">Term</div>
              <div className="text-[11px] font-medium text-dark/60 mt-1">Prompt: Definition. Pick term.</div>
            </button>

            <button
              type="button"
              onClick={() => setQuestionMode('mixed')}
              className={`p-4 rounded-2xl border-2 border-dark text-left transition-all ${
                questionMode === 'mixed'
                  ? 'bg-tertiary-light border-dark shadow-pop -translate-y-0.5'
                  : 'bg-white hover:bg-cream shadow-pop-active'
              }`}
            >
              <div className="text-xs font-heading font-black text-dark flex items-center gap-1">
                <Shuffle size={13} strokeWidth={2.5} /> Mixed
              </div>
              <div className="text-[11px] font-medium text-dark/60 mt-1">Dynamic term & def mix.</div>
            </button>
          </div>
        </div>

        {/* Timed Test Mode */}
        <div className="space-y-3 pt-2 border-t-2 border-dark/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-cream border-2 border-dark flex items-center justify-center shadow-pop-active">
                <Clock size={18} strokeWidth={2.5} className="text-dark" />
              </div>
              <div>
                <span className="text-sm font-heading font-black text-dark">Timed Countdown</span>
                <p className="text-xs font-medium text-dark/60">Limit time per question</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTimed(!timed)}
              className={`w-14 h-8 rounded-full border-2 border-dark transition-colors relative shadow-pop-active ${
                timed ? 'bg-quaternary' : 'bg-cream'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-dark transition-transform absolute top-1 ${
                  timed ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          {timed && (
            <div className="flex items-center gap-2 pl-12 animate-fade-in text-xs font-heading font-bold">
              <span className="text-dark/70">Timer:</span>
              {[10, 15, 25].map(sec => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setTimeSeconds(sec)}
                  className={`px-3 py-1 rounded-full border-2 border-dark ${
                    timeSeconds === sec
                      ? 'bg-accent text-white shadow-pop-active'
                      : 'bg-white text-dark hover:bg-tertiary'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Starred items only */}
        {starredCount > 0 && (
          <div className="flex items-center justify-between pt-2 border-t-2 border-dark/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-tertiary border-2 border-dark flex items-center justify-center shadow-pop-active">
                <Star size={18} strokeWidth={2.5} className="fill-dark text-dark" />
              </div>
              <div>
                <span className="text-sm font-heading font-black text-dark">Test Starred Cards Only</span>
                <p className="text-xs font-medium text-dark/60">{starredCount} starred in this set</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOnlyStarred(!onlyStarred)}
              className={`w-14 h-8 rounded-full border-2 border-dark transition-colors relative shadow-pop-active ${
                onlyStarred ? 'bg-tertiary' : 'bg-cream'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-dark transition-transform absolute top-1 ${
                  onlyStarred ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        )}

        {/* Candy Button: Start test */}
        <div className="pt-2">
          <button
            onClick={handleStart}
            className="w-full py-4 rounded-full bg-accent hover:bg-accent-hover text-white font-heading font-black text-sm uppercase tracking-wider border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-pop-active transition-all flex items-center justify-center gap-2"
          >
            <div className="w-6 h-6 rounded-full bg-white text-accent flex items-center justify-center shadow-sm">
              <Play size={14} strokeWidth={3} className="fill-accent ml-0.5" />
            </div>
            <span>Start Test Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
