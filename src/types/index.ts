export interface Card {
  id: string;
  term: string;
  definition: string;
  hint?: string;
  example?: string;
  starred?: boolean;
  mastered?: boolean;
  createdAt: number;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  color: string; // Tailwind color theme identifier (e.g. 'violet', 'emerald', 'cyan', 'amber', 'rose')
  icon: string;  // Lucide icon name
  cards: Card[];
  createdAt: number;
  updatedAt: number;
}

export type QuestionMode = 'term-to-def' | 'def-to-term' | 'mixed';

export interface QuizSettings {
  questionCount: number | 'all';
  questionMode: QuestionMode;
  timed: boolean;
  timePerQuestionSeconds: number;
  onlyStarred: boolean;
}

export interface QuizQuestion {
  id: string;
  cardId: string;
  prompt: string;
  promptType: 'term' | 'definition';
  correctAnswer: string;
  options: string[];
  originalCard: Card;
}

export interface AnswerRecord {
  questionIndex: number;
  question: QuizQuestion;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpentMs: number;
}

export interface QuizResult {
  deckId: string;
  deckTitle: string;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  percentage: number;
  answers: AnswerRecord[];
  maxStreak: number;
  timeElapsedSeconds: number;
  completedAt: number;
}

export type ActiveTab = 'decks' | 'deck-detail' | 'study-flashcards' | 'quiz' | 'quiz-results' | 'match';

export interface MatchTile {
  id: string;
  cardId: string;
  text: string;
  type: 'term' | 'definition';
  isMatched: boolean;
  isSelected: boolean;
  isError: boolean;
}
