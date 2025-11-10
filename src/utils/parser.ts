import { FlashcardData } from '../types';

/**
 * Parses TSV (tab-separated values) data from Google Sheets paste
 * Expects format: English\tPortuguese\tBreakdown
 */
export function parseTSVData(tsvData: string): FlashcardData[] {
  const lines = tsvData.trim().split('\n');
  const cards: FlashcardData[] = [];

  lines.forEach((line, index) => {
    // Skip empty lines
    if (!line.trim()) return;

    const columns = line.split('\t');

    // We expect 3 columns: English, Portuguese, Breakdown
    if (columns.length >= 2) {
      const english = columns[0]?.trim() || '';
      const portuguese = columns[1]?.trim() || '';
      const breakdown = columns[2]?.trim() || '';

      // Skip header row if it looks like a header
      if (index === 0 && (
        english.toLowerCase() === 'english' ||
        portuguese.toLowerCase() === 'portuguese'
      )) {
        return;
      }

      // Only add if both English and Portuguese have content
      if (english && portuguese) {
        cards.push({
          id: `card-${Date.now()}-${index}`,
          english,
          portuguese,
          breakdown,
        });
      }
    }
  });

  return cards;
}

/**
 * Validates that the parsed data is valid
 */
export function validateFlashcardData(cards: FlashcardData[]): {
  valid: boolean;
  error?: string;
} {
  if (cards.length === 0) {
    return {
      valid: false,
      error: 'No valid flashcard data found. Please paste at least one row with English and Portuguese text.',
    };
  }

  return { valid: true };
}
