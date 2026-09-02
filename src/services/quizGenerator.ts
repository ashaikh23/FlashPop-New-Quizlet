import { Card, Deck, QuizQuestion, QuizSettings } from '../types';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateQuiz(
  deck: Deck,
  allDecks: Deck[],
  settings: QuizSettings,
  specificCards?: Card[]
): QuizQuestion[] {
  let sourceCards = specificCards ? [...specificCards] : [...deck.cards];

  if (settings.onlyStarred) {
    const starred = sourceCards.filter(c => c.starred);
    if (starred.length > 0) {
      sourceCards = starred;
    }
  }

  if (sourceCards.length === 0) {
    return [];
  }

  // Shuffle source cards
  sourceCards = shuffleArray(sourceCards);

  // Apply question count limit
  if (settings.questionCount !== 'all' && typeof settings.questionCount === 'number') {
    sourceCards = sourceCards.slice(0, settings.questionCount);
  }

  // Pool of fallback distractors from other decks if this deck is small
  const externalCards = allDecks.flatMap(d => (d.id !== deck.id ? d.cards : []));

  const questions: QuizQuestion[] = [];

  sourceCards.forEach((card, index) => {
    let promptType: 'term' | 'definition';

    if (settings.questionMode === 'term-to-def') {
      promptType = 'term';
    } else if (settings.questionMode === 'def-to-term') {
      promptType = 'definition';
    } else {
      // Mixed: alternate
      promptType = index % 2 === 0 ? 'term' : 'definition';
    }

    const prompt = promptType === 'term' ? card.term : card.definition;
    const correctAnswer = promptType === 'term' ? card.definition : card.term;

    // Collect distractors - strictly exclude correct answer and duplicates
    const otherCardsInDeck = deck.cards.filter(c => c.id !== card.id);
    const rawCandidates = promptType === 'term'
      ? otherCardsInDeck.map(c => c.definition).filter(Boolean)
      : otherCardsInDeck.map(c => c.term).filter(Boolean);

    // Filter out correct answer and deduplicate
    const distractorCandidates = Array.from(
      new Set(rawCandidates.filter(d => d.trim().toLowerCase() !== correctAnswer.trim().toLowerCase()))
    );

    let distractors = shuffleArray(distractorCandidates).slice(0, 3);

    // If deck had fewer than 3 other cards, pull from external cards
    if (distractors.length < 3) {
      const rawExternal = promptType === 'term'
        ? externalCards.map(c => c.definition).filter(Boolean)
        : externalCards.map(c => c.term).filter(Boolean);

      const externalCandidates = Array.from(
        new Set(
          rawExternal.filter(
            d =>
              d.trim().toLowerCase() !== correctAnswer.trim().toLowerCase() &&
              !distractors.some(existing => existing.trim().toLowerCase() === d.trim().toLowerCase())
          )
        )
      );

      const needed = 3 - distractors.length;
      const extra = shuffleArray(externalCandidates).slice(0, needed);
      distractors = [...distractors, ...extra];
    }

    // If still under 3 (e.g. brand new standalone deck with 1 or 2 cards and no other decks)
    const genericDistractors = promptType === 'term'
      ? [
          'A system for coordinating concurrent operations across asynchronous nodes.',
          'An empirical heuristic emphasizing linear degradation over time.',
          'A structural convention that limits recursive execution bounds.',
          'A perceptual threshold determining cognitive load allocation.'
        ]
      : [
          'Entropy Vector',
          'Recursive Invariance',
          'Cognitive Equilibrium',
          'Null Hypothesis Shift'
        ];

    while (distractors.length < 3) {
      const fallback = genericDistractors[distractors.length % genericDistractors.length];
      if (!distractors.includes(fallback) && fallback !== correctAnswer) {
        distractors.push(fallback);
      } else {
        distractors.push(`${fallback} (${distractors.length + 1})`);
      }
    }

    const options = shuffleArray([correctAnswer, ...distractors]);

    questions.push({
      id: `q-${card.id}-${index}`,
      cardId: card.id,
      prompt,
      promptType,
      correctAnswer,
      options,
      originalCard: card,
    });
  });

  return questions;
}
