import { useState, useCallback } from 'react';
import { FlashcardData, LanguageDirection } from '../types';

export function useFlashcards(initialCards: FlashcardData[]) {
  const [cards] = useState<FlashcardData[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState<LanguageDirection>('en-to-pt');
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isMaleVoice, setIsMaleVoice] = useState(false);

  const currentCard = cards[currentIndex];
  const progress = {
    current: currentIndex + 1,
    total: cards.length,
  };

  /**
   * Navigate to next card
   */
  const nextCard = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  }, [currentIndex, cards.length]);

  /**
   * Navigate to previous card
   */
  const previousCard = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  /**
   * Flip the current card
   */
  const flipCard = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  /**
   * Toggle language direction
   * When toggled, all cards conceptually flip
   */
  const toggleDirection = useCallback(() => {
    setDirection((prev) => (prev === 'en-to-pt' ? 'pt-to-en' : 'en-to-pt'));
    // Reset flip state when changing direction
    setIsFlipped(false);
  }, []);

  /**
   * Toggle breakdown visibility
   */
  const toggleBreakdown = useCallback(() => {
    setShowBreakdown((prev) => !prev);
  }, []);

  /**
   * Toggle voice gender (male/female)
   */
  const toggleVoiceGender = useCallback(() => {
    setIsMaleVoice((prev) => !prev);
  }, []);

  /**
   * Get the front side text based on current direction
   */
  const getFrontText = useCallback(
    (card: FlashcardData) => {
      return direction === 'en-to-pt' ? card.english : card.portuguese;
    },
    [direction]
  );

  /**
   * Get the back side text based on current direction
   */
  const getBackText = useCallback(
    (card: FlashcardData) => {
      return direction === 'en-to-pt' ? card.portuguese : card.english;
    },
    [direction]
  );

  return {
    currentCard,
    currentIndex,
    isFlipped,
    direction,
    showBreakdown,
    isMaleVoice,
    progress,
    nextCard,
    previousCard,
    flipCard,
    toggleDirection,
    toggleBreakdown,
    toggleVoiceGender,
    getFrontText,
    getBackText,
  };
}
