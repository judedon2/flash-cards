import { FlashcardData, LanguageDirection } from '../types';
import { BreakdownSection } from './BreakdownSection';

interface FlashcardProps {
  card: FlashcardData;
  isFlipped: boolean;
  direction: LanguageDirection;
  showBreakdown: boolean;
  onFlip: () => void;
  onToggleBreakdown: () => void;
  onSpeak: (text: string) => void;
}

export function Flashcard({
  card,
  isFlipped,
  direction,
  showBreakdown,
  onFlip,
  onToggleBreakdown,
  onSpeak,
}: FlashcardProps) {
  const isEnToPt = direction === 'en-to-pt';
  const frontText = isEnToPt ? card.english : card.portuguese;
  const backText = isEnToPt ? card.portuguese : card.english;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Flashcard */}
      <div
        className="relative h-80 cursor-pointer"
        onClick={onFlip}
      >
        {/* Question Side */}
        <div
          className={`absolute w-full h-full transition-all duration-300 ${
            isFlipped ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          <div className="h-full flex items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-center w-full">
              <p className="text-4xl font-semibold text-gray-900 dark:text-gray-100">
                {frontText}
              </p>
              {!isEnToPt && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSpeak(card.portuguese);
                  }}
                  className="mt-6 p-3 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-full transition-colors"
                  aria-label="Play pronunciation"
                  title="Hear pronunciation"
                >
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                Click to reveal
              </p>
            </div>
          </div>
        </div>

        {/* Answer Side */}
        <div
          className={`absolute w-full h-full transition-all duration-300 ${
            !isFlipped ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          <div className="h-full flex items-center justify-center p-8 bg-gradient-to-br from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-500 rounded-2xl shadow-2xl">
            <div className="text-center w-full">
              <p className="text-4xl font-bold text-white">{backText}</p>
              {isEnToPt && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSpeak(card.portuguese);
                  }}
                  className="mt-6 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  aria-label="Play pronunciation"
                  title="Hear pronunciation"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Section */}
      <div className="mt-6">
        <BreakdownSection
          breakdown={card.breakdown}
          isVisible={showBreakdown}
          onToggle={onToggleBreakdown}
        />
      </div>
    </div>
  );
}
