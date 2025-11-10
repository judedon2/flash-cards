import { useEffect } from 'react';
import { FlashcardData } from '../types';
import { useFlashcards } from '../hooks/useFlashcards';
import { useSpeech } from '../hooks/useSpeech';
import { Flashcard } from './Flashcard';
import { LanguageToggle } from './LanguageToggle';

interface FlashcardDeckProps {
  cards: FlashcardData[];
  onExit: () => void;
}

export function FlashcardDeck({ cards, onExit }: FlashcardDeckProps) {
  const {
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
  } = useFlashcards(cards);

  const { speak } = useSpeech();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          flipCard();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          previousCard();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextCard();
          break;
        case 'b':
        case 'B':
          e.preventDefault();
          toggleBreakdown();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [flipCard, nextCard, previousCard, toggleBreakdown]);

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No flashcards available
          </p>
          <button
            onClick={onExit}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Content Dropper
          </button>

          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Card {progress.current} of {progress.total}
          </div>
        </div>

        {/* Language Direction Toggle */}
        <LanguageToggle direction={direction} onToggle={toggleDirection} />

        {/* Voice Gender Toggle - Hidden for now */}
        {/* <VoiceGenderToggle isMale={isMaleVoice} onToggle={toggleVoiceGender} /> */}

        {/* Flashcard */}
        <Flashcard
          card={currentCard}
          isFlipped={isFlipped}
          direction={direction}
          showBreakdown={showBreakdown}
          onFlip={flipCard}
          onToggleBreakdown={toggleBreakdown}
          onSpeak={(text) => speak(text, isMaleVoice)}
        />

        {/* Navigation */}
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={previousCard}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous card"
          >
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="flex gap-4">
            <button
              onClick={flipCard}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Flip Card
            </button>
          </div>

          <button
            onClick={nextCard}
            disabled={currentIndex === cards.length - 1}
            className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Next card"
          >
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Keyboard Shortcuts
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Space</kbd> or{' '}
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Enter</kbd>
              <p className="mt-1 text-xs">Flip card</p>
            </div>
            <div>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">←</kbd>{' '}
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">→</kbd>
              <p className="mt-1 text-xs">Navigate</p>
            </div>
            <div>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">B</kbd>
              <p className="mt-1 text-xs">Toggle breakdown</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
