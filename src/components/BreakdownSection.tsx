interface BreakdownSectionProps {
  breakdown: string;
  isVisible: boolean;
  onToggle: () => void;
}

export function BreakdownSection({
  breakdown,
  isVisible,
  onToggle,
}: BreakdownSectionProps) {
  // Don't render anything if there's no breakdown content
  if (!breakdown) return null;

  return (
    <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
      >
        <svg
          className={`w-4 h-4 transform transition-transform ${
            isVisible ? 'rotate-90' : ''
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">
          {isVisible ? 'Hide' : 'Show'} Breakdown
        </span>
      </button>

      {isVisible && (
        <div className="mt-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300 animate-fadeIn">
          {breakdown}
        </div>
      )}
    </div>
  );
}
