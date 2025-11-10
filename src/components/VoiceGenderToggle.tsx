interface VoiceGenderToggleProps {
  isMale: boolean;
  onToggle: () => void;
}

export function VoiceGenderToggle({ isMale, onToggle }: VoiceGenderToggleProps) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <span
        className={`text-sm font-medium transition-colors ${
          !isMale
            ? 'text-purple-600 dark:text-purple-400'
            : 'text-gray-400 dark:text-gray-500'
        }`}
      >
        Female Voice
      </span>

      <button
        onClick={onToggle}
        className="relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 bg-purple-600 dark:bg-purple-500"
        role="switch"
        aria-checked={isMale}
        aria-label="Toggle voice gender"
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
            !isMale ? 'translate-x-1' : 'translate-x-9'
          }`}
        />
      </button>

      <span
        className={`text-sm font-medium transition-colors ${
          isMale
            ? 'text-purple-600 dark:text-purple-400'
            : 'text-gray-400 dark:text-gray-500'
        }`}
      >
        Male Voice
      </span>
    </div>
  );
}
