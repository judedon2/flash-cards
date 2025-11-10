import { useState, useRef, ClipboardEvent } from 'react';
import { FlashcardData } from '../types';
import { parseTSVData, validateFlashcardData } from '../utils/parser';

interface ContentDropperProps {
  onGenerateFlashcards: (cards: FlashcardData[]) => void;
}

export function ContentDropper({ onGenerateFlashcards }: ContentDropperProps) {
  const [pastedData, setPastedData] = useState<string[][]>([]);
  const [error, setError] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('text');

    if (!clipboardData) {
      setError('No data found in clipboard');
      return;
    }

    // Parse the TSV data
    const lines = clipboardData.trim().split('\n');
    const rows = lines.map((line) => {
      const cols = line.split('\t');
      return [
        cols[0]?.trim() || '',
        cols[1]?.trim() || '',
        cols[2]?.trim() || '',
      ];
    });

    // Skip header if it exists
    const hasHeader =
      rows[0] &&
      (rows[0][0]?.toLowerCase() === 'english' ||
        rows[0][1]?.toLowerCase() === 'portuguese');

    const dataRows = hasHeader ? rows.slice(1) : rows;

    if (dataRows.length === 0) {
      setError('No valid data found. Please paste at least one row.');
      return;
    }

    setPastedData(dataRows);
    setError('');
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleGenerate = () => {
    if (pastedData.length === 0) {
      setError('Please paste some data from your Google Sheet first');
      return;
    }

    // Convert to TSV format for parsing
    const tsvString = pastedData.map((row) => row.join('\t')).join('\n');
    const cards = parseTSVData(tsvString);

    const validation = validateFlashcardData(cards);
    if (!validation.valid) {
      setError(validation.error || 'Invalid data');
      return;
    }

    onGenerateFlashcards(cards);
  };

  const handleClear = () => {
    setPastedData([]);
    setError('');
    setShowSuccess(false);
    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Brazilian Portuguese Flashcards
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Paste your vocabulary from Google Sheets and start learning
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">
            How to use:
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-300">
            <li>Open your Google Sheet with vocabulary</li>
            <li>Select the rows you want to practice (English, Portuguese, Breakdown columns)</li>
            <li>Copy (Ctrl+C / Cmd+C) and paste (Ctrl+V / Cmd+V) below</li>
            <li>Click "Generate Flashcards" to start learning!</li>
          </ol>
        </div>

        {/* Paste Area */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Paste your vocabulary here (Ctrl+V / Cmd+V)
            </label>
            <textarea
              ref={textareaRef}
              onPaste={handlePaste}
              placeholder="Select this area and paste your Google Sheets data here..."
              className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200 font-medium">
                ✓ Successfully pasted {pastedData.length} row{pastedData.length !== 1 ? 's' : ''}!
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* Preview Table */}
          {pastedData.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Preview ({pastedData.length} entries)
              </h3>
              <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        English
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Portuguese
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Breakdown
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {pastedData.slice(0, 10).map((row, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                          {row[0]}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                          {row[1]}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                          {row[2]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {pastedData.length > 10 && (
                  <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                    ... and {pastedData.length - 10} more
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleGenerate}
              disabled={pastedData.length === 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Generate Flashcards
            </button>
            {pastedData.length > 0 && (
              <button
                onClick={handleClear}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
