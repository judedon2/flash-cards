import { LanguageDirection } from '../types';

interface LanguageToggleProps {
  direction: LanguageDirection;
  onToggle: () => void;
}

export function LanguageToggle({ direction, onToggle }: LanguageToggleProps) {
  const isEnToPt = direction === 'en-to-pt';

  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <span
        className={`text-sm font-medium transition-colors ${
          isEnToPt
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-400 dark:text-gray-500'
        }`}
      >
        English → Portuguese
      </span>

      <button
        onClick={onToggle}
        className="relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600 dark:bg-blue-500"
        role="switch"
        aria-checked={!isEnToPt}
        aria-label="Toggle language direction"
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
            isEnToPt ? 'translate-x-1' : 'translate-x-9'
          }`}
        />
      </button>

      <span
        className={`text-sm font-medium transition-colors ${
          !isEnToPt
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-400 dark:text-gray-500'
        }`}
      >
        Portuguese → English
      </span>
    </div>
  );
}
