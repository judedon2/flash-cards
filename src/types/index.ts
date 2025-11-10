export interface FlashcardData {
  id: string;
  english: string;
  portuguese: string;
  breakdown: string;
}

export type LanguageDirection = 'en-to-pt' | 'pt-to-en';

export interface FlashcardState {
  cards: FlashcardData[];
  currentIndex: number;
  isFlipped: boolean;
  direction: LanguageDirection;
  showBreakdown: boolean;
}
