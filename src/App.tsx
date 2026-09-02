import React, { useState } from 'react';
import { Card, Deck, QuizSettings, QuizQuestion as QuizQuestionType, AnswerRecord, QuizResult } from './types';
import { storage } from './services/storage';
import { sounds } from './services/sound';
import { generateQuiz } from './services/quizGenerator';
import { Navbar } from './components/common/Navbar';
import { DeckList } from './components/deck/DeckList';
import { DeckDetail } from './components/deck/DeckDetail';
import { CardEditorModal } from './components/deck/CardEditorModal';
import { BatchImportModal } from './components/deck/BatchImportModal';
import { SetCreator } from './components/deck/SetCreator';
import { FlashcardViewer } from './components/study/FlashcardViewer';
import { QuizSetup } from './components/quiz/QuizSetup';
import { QuizQuestion } from './components/quiz/QuizQuestion';
import { QuizResults } from './components/quiz/QuizResults';
import { MatchGame } from './components/match/MatchGame';
import { Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>(() => storage.loadDecks());
  const [currentDeckId, setCurrentDeckId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<
    'decks' | 'deck-detail' | 'create-set' | 'study-flashcards' | 'quiz-setup' | 'quiz-question' | 'quiz-results' | 'match'
  >('decks');

  // Sound state
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(() => sounds.getMuted());

  // Night / Dark Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('flashpop_theme');
    if (saved) return saved === 'dark';
    return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('flashpop_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('flashpop_theme', 'light');
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Card modal state
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Quiz active session state
  const [quizSettings, setQuizSettings] = useState<QuizSettings | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<AnswerRecord[]>([]);
  const [quizStreak, setQuizStreak] = useState(0);
  const [quizMaxStreak, setQuizMaxStreak] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState(0);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const currentDeck = decks.find(d => d.id === currentDeckId);

  // Overall library stats
  const masteredCount = decks.reduce(
    (acc, d) => acc + d.cards.filter(c => c.mastered).length,
    0
  );

  // Sound toggle
  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsSoundMuted(muted);
  };

  // Navigation handlers
  const handleSelectDeck = (deckId: string) => {
    setCurrentDeckId(deckId);
    setActiveView('deck-detail');
  };

  const handleStudyDeck = (deckId: string) => {
    setCurrentDeckId(deckId);
    setActiveView('study-flashcards');
  };

  const handleQuizDeck = (deckId: string) => {
    setCurrentDeckId(deckId);
    setActiveView('quiz-setup');
  };

  const handleMatchDeck = (deckId: string) => {
    setCurrentDeckId(deckId);
    setActiveView('match');
  };

  const handleOpenNewDeck = () => {
    setEditingDeck(null);
    setActiveView('create-set');
  };

  const handleOpenEditDeck = (deck: Deck) => {
    setEditingDeck(deck);
    setActiveView('create-set');
  };

  const handleSaveFromSetCreator = (deckData: {
    title: string;
    description: string;
    cards: Array<{ id?: string; term: string; definition: string; hint?: string; example?: string }>;
  }) => {
    if (editingDeck) {
      const updated: Deck = {
        ...editingDeck,
        title: deckData.title,
        description: deckData.description,
        updatedAt: Date.now(),
        cards: deckData.cards.map((c, i) => {
          const existingCard = c.id ? editingDeck.cards.find(orig => orig.id === c.id) : null;
          return {
            id: existingCard?.id || 'card-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6) + '-' + i,
            term: c.term,
            definition: c.definition,
            hint: c.hint,
            example: c.example,
            createdAt: existingCard?.createdAt || Date.now(),
            starred: existingCard?.starred || false,
            mastered: existingCard?.mastered || false,
          };
        }),
      };
      const updatedDecks = storage.saveDeck(updated);
      setDecks(updatedDecks);
      setCurrentDeckId(updated.id);
      setActiveView('deck-detail');
    } else {
      const newDeck: Deck = {
        id: 'deck-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        title: deckData.title,
        description: deckData.description,
        color: 'violet',
        icon: 'Brain',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        cards: deckData.cards.map((c, i) => ({
          id: 'card-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6) + '-' + i,
          term: c.term,
          definition: c.definition,
          hint: c.hint,
          example: c.example,
          createdAt: Date.now(),
          starred: false,
          mastered: false,
        })),
      };
      const updatedDecks = storage.saveDeck(newDeck);
      setDecks(updatedDecks);
      setCurrentDeckId(newDeck.id);
      setActiveView('deck-detail');
    }
  };

  const handleDeleteDeck = (deckId: string) => {
    const updated = storage.deleteDeck(deckId);
    setDecks(updated);
    if (currentDeckId === deckId) {
      setCurrentDeckId(null);
      setActiveView('decks');
    }
  };

  // Card Management handlers
  const handleOpenAddCard = () => {
    setEditingCard(null);
    setIsCardModalOpen(true);
  };

  const handleOpenEditCard = (card: Card) => {
    setEditingCard(card);
    setIsCardModalOpen(true);
  };

  const handleSaveCard = (
    cardData: { term: string; definition: string; hint?: string; example?: string },
    keepOpen?: boolean
  ) => {
    if (!currentDeckId) return;

    if (editingCard) {
      const updatedCard: Card = {
        ...editingCard,
        ...cardData,
      };
      const updatedDeck = storage.updateCard(currentDeckId, updatedCard);
      if (updatedDeck) {
        setDecks(prev => prev.map(d => (d.id === currentDeckId ? updatedDeck : d)));
      }
    } else {
      const updatedDeck = storage.addCard(currentDeckId, cardData);
      if (updatedDeck) {
        setDecks(prev => prev.map(d => (d.id === currentDeckId ? updatedDeck : d)));
      }
    }

    if (!keepOpen) {
      setIsCardModalOpen(false);
    }
  };

  const handleDeleteCard = (cardId: string) => {
    if (!currentDeckId) return;
    const updatedDeck = storage.deleteCard(currentDeckId, cardId);
    if (updatedDeck) {
      setDecks(prev => prev.map(d => (d.id === currentDeckId ? updatedDeck : d)));
    }
  };

  const handleToggleStar = (cardId: string) => {
    if (!currentDeckId) return;
    const updatedDeck = storage.toggleCardStar(currentDeckId, cardId);
    if (updatedDeck) {
      setDecks(prev => prev.map(d => (d.id === currentDeckId ? updatedDeck : d)));
    }
  };

  const handleToggleMastery = (cardId: string, mastered?: boolean) => {
    if (!currentDeckId) return;
    const updatedDeck = storage.toggleCardMastery(currentDeckId, cardId, mastered);
    if (updatedDeck) {
      setDecks(prev => prev.map(d => (d.id === currentDeckId ? updatedDeck : d)));
    }
  };

  const handleBatchImport = (rawText: string): number => {
    if (!currentDeckId) return 0;
    const count = storage.importTextCards(currentDeckId, rawText);
    if (count > 0) {
      setDecks(storage.loadDecks());
    }
    return count;
  };

  // JSON Export & Import
  const handleExportJSON = () => {
    sounds.playClick();
    const json = storage.exportAllJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quizlet_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (jsonStr: string) => {
    const imported = storage.importJSON(jsonStr);
    if (imported) {
      sounds.playComplete();
      setDecks(imported);
      alert(`Successfully restored ${imported.length} study sets!`);
    } else {
      sounds.playIncorrect();
      alert('Invalid backup JSON file.');
    }
  };

  const handleResetDefaults = () => {
    sounds.playClick();
    const defs = storage.resetDefaults();
    setDecks(defs);
    setCurrentDeckId(null);
    setActiveView('decks');
  };

  // Quiz Lifecycle Handlers
  const handleStartQuiz = (settings: QuizSettings, specificCards?: Card[]) => {
    if (!currentDeck) return;
    const questions = generateQuiz(currentDeck, decks, settings, specificCards);
    if (questions.length === 0) {
      alert('Cannot start test: not enough cards match your settings.');
      return;
    }

    setQuizSettings(settings);
    setQuizQuestions(questions);
    setCurrentQuestionIndex(0);
    setQuizAnswers([]);
    setQuizStreak(0);
    setQuizMaxStreak(0);
    setQuizStartTime(Date.now());
    setActiveView('quiz-question');
  };

  const handleAnswerQuizQuestion = (record: AnswerRecord) => {
    const updatedAnswers = [...quizAnswers, record];
    setQuizAnswers(updatedAnswers);

    let newStreak = quizStreak;
    let newMax = quizMaxStreak;

    if (record.isCorrect) {
      newStreak += 1;
      if (newStreak > newMax) newMax = newStreak;
    } else {
      newStreak = 0;
    }
    setQuizStreak(newStreak);
    setQuizMaxStreak(newMax);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 700);
    } else {
      setTimeout(() => {
        const timeElapsed = (Date.now() - quizStartTime) / 1000;
        const correctCount = updatedAnswers.filter(a => a.isCorrect).length;
        const total = quizQuestions.length;
        const percentage = Math.round((correctCount / total) * 100);

        const result: QuizResult = {
          deckId: currentDeck?.id || '',
          deckTitle: currentDeck?.title || '',
          totalQuestions: total,
          correctCount,
          incorrectCount: total - correctCount,
          percentage,
          answers: updatedAnswers,
          maxStreak: newMax,
          timeElapsedSeconds: timeElapsed,
          completedAt: Date.now(),
        };

        setQuizResult(result);
        setActiveView('quiz-results');
      }, 800);
    }
  };

  const handleRetakeQuiz = () => {
    if (quizSettings) {
      handleStartQuiz(quizSettings);
    } else {
      setActiveView('quiz-setup');
    }
  };

  const handleRequizMissed = (missedCards: Card[]) => {
    if (!quizSettings) return;
    handleStartQuiz(
      {
        ...quizSettings,
        questionCount: 'all',
      },
      missedCards
    );
  };

  return (
    <div className={`min-h-screen dot-grid-bg text-dark flex flex-col font-sans selection:bg-secondary/30 selection:text-dark ${isDarkMode ? 'dark' : ''}`}>
      {/* FlashPop Header */}
      <Navbar
        onGoHome={() => {
          sounds.playClick();
          setActiveView('decks');
        }}
        onNewDeck={handleOpenNewDeck}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onResetDefaults={handleResetDefaults}
        currentDeckTitle={currentDeck?.title}
        activeView={activeView}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeView === 'decks' && (
          <DeckList
            decks={decks}
            onSelectDeck={handleSelectDeck}
            onStudyDeck={handleStudyDeck}
            onQuizDeck={handleQuizDeck}
            onMatchDeck={handleMatchDeck}
            onEditDeck={handleOpenEditDeck}
            onDeleteDeck={handleDeleteDeck}
            onCreateDeck={handleOpenNewDeck}
            masteredCount={masteredCount}
          />
        )}

        {activeView === 'create-set' && (
          <SetCreator
            initialDeck={editingDeck}
            onSave={handleSaveFromSetCreator}
            onCancel={() => {
              if (currentDeckId) {
                setActiveView('deck-detail');
              } else {
                setActiveView('decks');
              }
            }}
            onOpenBatchImport={() => setIsImportModalOpen(true)}
          />
        )}

        {activeView === 'deck-detail' && currentDeck && (
          <DeckDetail
            deck={currentDeck}
            onBack={() => setActiveView('decks')}
            onStudy={() => setActiveView('study-flashcards')}
            onQuiz={() => setActiveView('quiz-setup')}
            onMatch={() => setActiveView('match')}
            onAddCard={handleOpenAddCard}
            onEditCard={handleOpenEditCard}
            onDeleteCard={handleDeleteCard}
            onToggleStar={handleToggleStar}
            onToggleMastery={handleToggleMastery}
            onOpenBatchImport={() => setIsImportModalOpen(true)}
          />
        )}

        {activeView === 'study-flashcards' && currentDeck && (
          <FlashcardViewer
            deck={currentDeck}
            onBack={() => setActiveView('deck-detail')}
            onToggleMastery={handleToggleMastery}
            onToggleStar={handleToggleStar}
          />
        )}

        {activeView === 'quiz-setup' && currentDeck && (
          <QuizSetup
            deck={currentDeck}
            onBack={() => setActiveView('deck-detail')}
            onStartQuiz={settings => handleStartQuiz(settings)}
          />
        )}

        {activeView === 'quiz-question' && quizQuestions[currentQuestionIndex] && (
          <QuizQuestion
            question={quizQuestions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={quizQuestions.length}
            timed={quizSettings?.timed || false}
            timePerQuestionSeconds={quizSettings?.timePerQuestionSeconds || 15}
            onAnswer={handleAnswerQuizQuestion}
            onExit={() => setActiveView('deck-detail')}
          />
        )}

        {activeView === 'quiz-results' && quizResult && (
          <QuizResults
            result={quizResult}
            onRetake={handleRetakeQuiz}
            onRequizMissed={handleRequizMissed}
            onStudyCards={() => setActiveView('study-flashcards')}
            onBackToDeck={() => setActiveView('deck-detail')}
          />
        )}

        {activeView === 'match' && currentDeck && (
          <MatchGame
            deck={currentDeck}
            onBack={() => setActiveView('deck-detail')}
          />
        )}
      </main>

      {/* Playful Footer */}
      <footer className="py-6 border-t-2 border-dark/10 text-center print:hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-dark shadow-pop text-xs font-heading font-black text-dark">
          <span>Made with</span>
          <Heart size={14} className="text-secondary fill-secondary animate-pulse" />
          <span>by</span>
          <span className="text-accent underline decoration-2 underline-offset-2">Afya</span>
        </div>
      </footer>

      {/* Modals */}
      <CardEditorModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        onSave={handleSaveCard}
        initialCard={editingCard}
      />

      {currentDeck && (
        <BatchImportModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onImport={handleBatchImport}
          deckTitle={currentDeck.title}
        />
      )}
    </div>
  );
};

export default App;
