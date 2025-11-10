import { FlashcardData } from '../types';

/**
 * Fisher-Yates shuffle algorithm for randomizing flashcards
 */
export function shuffleCards(cards: FlashcardData[]): FlashcardData[] {
  const shuffled = [...cards];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
