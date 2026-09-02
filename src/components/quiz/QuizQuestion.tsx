import React, { useState, useEffect, useCallback, useRef } from 'react';
import { QuizQuestion as QuizQuestionType, AnswerRecord } from '../../types';
import {
  X,
  Check,
  Volume2,
} from 'lucide-react';
import { sounds } from '../../services/sound';

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionIndex: number;
  totalQuestions: number;
  timed: boolean;
  timePerQuestionSeconds: number;
  onAnswer: (record: AnswerRecord) => void;
  onExit: () => void;
}

const OPTION_THEMES = [
  { letter: 'A', bg: 'bg-accent text-white' },
  { letter: 'B', bg: 'bg-secondary text-white' },
  { letter: 'C', bg: 'bg-tertiary text-dark' },
  { letter: 'D', bg: 'bg-quaternary text-dark' },
];

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  questionIndex,
  totalQuestions,
  timed,
  timePerQuestionSeconds,
  onAnswer,
  onExit,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timePerQuestionSeconds);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(timePerQuestionSeconds);
    startTimeRef.current = Date.now();
  }, [question, timePerQuestionSeconds]);

  const handleSelectOption = useCallback(
    (option: string) => {
      if (isAnswered) return;

      const timeSpentMs = Date.now() - startTimeRef.current;
      const isCorrect = option === question.correctAnswer;

      setSelectedOption(option);
      setIsAnswered(true);

      if (isCorrect) {
        sounds.playCorrect();
      } else {
        sounds.playIncorrect();
      }

      onAnswer({
        questionIndex,
        question,
        selectedAnswer: option,
        isCorrect,
        timeSpentMs,
      });
    },
    [isAnswered, question, questionIndex, onAnswer]
  );

  useEffect(() => {
    if (!timed || isAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSelectOption('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timed, isAnswered, handleSelectOption]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (!isAnswered) {
        const key = e.key.toLowerCase();
        let optIndex = -1;
        if (['1', '2', '3', '4'].includes(key)) {
          optIndex = parseInt(key, 10) - 1;
        } else if (key === 'a') {
          optIndex = 0;
        } else if (key === 'b') {
          optIndex = 1;
        } else if (key === 'c') {
          optIndex = 2;
        } else if (key === 'd') {
          optIndex = 3;
        }

        if (optIndex >= 0 && question.options[optIndex]) {
          e.preventDefault();
          handleSelectOption(question.options[optIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, question.options, handleSelectOption]);

  const timerPercent = timed ? (timeLeft / timePerQuestionSeconds) * 100 : 100;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-20">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            if (window.confirm('Exit the test? Your current quiz session will end.')) {
              onExit();
            }
          }}
          className="w-10 h-10 rounded-full bg-white border-2 border-dark text-dark hover:bg-rose-100 flex items-center justify-center shadow-pop-active transition-all"
          title="Exit Quiz"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        {/* Question Counter Pill */}
        <div className="px-4 py-1.5 rounded-full bg-white border-2 border-dark font-heading font-black text-xs text-dark shadow-pop-active">
          Question {questionIndex + 1} of {totalQuestions}
        </div>
      </div>

      {/* Progress & Countdown Bars with 2px Dark Border */}
      <div className="space-y-1.5">
        <div className="w-full h-3 rounded-full bg-white border-2 border-dark p-0.5 overflow-hidden shadow-pop-active">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {timed && (
          <div className="w-full h-2 rounded-full bg-white border-2 border-dark p-0.5 overflow-hidden shadow-pop-active">
            <div
              className={`h-full transition-all duration-1000 linear rounded-full ${
                timerPercent < 30 ? 'bg-secondary' : 'bg-tertiary'
              }`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* Question Prompt "Sticker Card" */}
      <div className="bg-white rounded-3xl border-2 border-dark p-7 sm:p-9 space-y-4 shadow-pop">
        <div className="flex items-center justify-between">
          <span className="px-3.5 py-1 rounded-full bg-cream border-2 border-dark text-dark text-[11px] font-heading font-black uppercase tracking-wider shadow-pop-active">
            {question.promptType === 'term' ? 'Prompt: Term' : 'Prompt: Definition'}
          </span>

          <button
            onClick={() => sounds.speak(question.prompt)}
            className="w-9 h-9 rounded-full bg-cream border-2 border-dark text-dark hover:bg-tertiary flex items-center justify-center shadow-pop-active transition-all"
            title="Pronounce"
          >
            <Volume2 size={16} strokeWidth={2.5} />
          </button>
        </div>

        <h2 className="text-2xl sm:text-4xl font-heading font-black text-dark leading-snug">
          {question.prompt}
        </h2>

        <p className="text-xs font-heading font-extrabold uppercase tracking-wider text-dark/50">
          {question.promptType === 'term'
            ? 'Select matching definition:'
            : 'Select matching term:'}
        </p>
      </div>

      {/* 4 Multiple Choice Options (A, B, C, D) as Tactile Pop Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === question.correctAnswer;
          const theme = OPTION_THEMES[idx % OPTION_THEMES.length];

          let optionStyle =
            'bg-white border-2 border-dark text-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-lg';

          if (isAnswered) {
            if (isCorrect) {
              optionStyle =
                'bg-quaternary-light border-2 border-dark text-dark shadow-pop ring-2 ring-quaternary';
            } else if (isSelected && !isCorrect) {
              optionStyle =
                'bg-secondary-light border-2 border-dark text-dark shadow-pop ring-2 ring-secondary';
            } else {
              optionStyle = 'bg-white border-2 border-dark/30 text-dark/40 opacity-40 shadow-none';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelectOption(option)}
              className={`p-5 rounded-3xl text-left transition-all duration-150 flex items-start gap-3.5 group active:scale-[0.99] ${optionStyle}`}
            >
              {/* Option Letter Circle */}
              <div
                className={`w-8 h-8 rounded-full text-xs font-heading font-black flex items-center justify-center shrink-0 border-2 border-dark shadow-pop-active transition-all ${
                  isAnswered && isCorrect
                    ? 'bg-quaternary text-dark'
                    : isAnswered && isSelected && !isCorrect
                    ? 'bg-secondary text-white'
                    : theme.bg
                }`}
              >
                {isAnswered && isCorrect ? (
                  <Check size={16} strokeWidth={3} />
                ) : isAnswered && isSelected && !isCorrect ? (
                  <X size={16} strokeWidth={3} />
                ) : (
                  theme.letter
                )}
              </div>

              <span className="text-sm font-semibold leading-relaxed pt-1">
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {/* Answer Feedback Strip */}
      {isAnswered && (
        <div className="p-5 rounded-3xl bg-white border-2 border-dark shadow-pop space-y-1.5 animate-bounce-in">
          {selectedOption === question.correctAnswer ? (
            <div className="flex items-center gap-2 text-emerald-700 font-heading font-black text-sm">
              <div className="w-6 h-6 rounded-full bg-quaternary border-2 border-dark text-dark flex items-center justify-center">
                <Check size={14} strokeWidth={3} />
              </div>
              <span>Bingo! Correct answer!</span>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-secondary font-heading font-black text-sm">
                <div className="w-6 h-6 rounded-full bg-secondary border-2 border-dark text-white flex items-center justify-center">
                  <X size={14} strokeWidth={3} />
                </div>
                <span>Not quite!</span>
              </div>
              <p className="text-xs font-medium text-dark pl-8">
                Correct answer was:{' '}
                <strong className="font-heading font-black text-emerald-800 underline decoration-2">{question.correctAnswer}</strong>
              </p>
            </div>
          )}

          {question.originalCard.example && (
            <p className="text-xs font-medium text-dark/60 pl-8 pt-1">
              Context: {question.originalCard.example}
            </p>
          )}
        </div>
      )}

      {/* Keyboard Shortcut Guide */}
      <div className="text-center text-xs font-heading font-bold text-dark/50">
        Press <kbd className="px-2 py-0.5 rounded-md bg-white border-2 border-dark text-dark font-mono shadow-pop-active">1</kbd>–
        <kbd className="px-2 py-0.5 rounded-md bg-white border-2 border-dark text-dark font-mono shadow-pop-active">4</kbd> to select an option
      </div>
    </div>
  );
};
