import { useState } from 'react';
import { FlashcardData } from './types';
import { shuffleCards } from './utils/shuffle';
import { ContentDropper } from './components/ContentDropper';
import { FlashcardDeck } from './components/FlashcardDeck';
import { ThemeToggle } from './components/ThemeToggle';

type AppView = 'dropper' | 'flashcards';

function App() {
  const [view, setView] = useState<AppView>('dropper');
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);

  const handleGenerateFlashcards = (cards: FlashcardData[]) => {
    // Shuffle the cards for random order
    const shuffled = shuffleCards(cards);
    setFlashcards(shuffled);
    setView('flashcards');
  };

  const handleExitFlashcards = () => {
    setView('dropper');
    // Optionally clear flashcards
    // setFlashcards([]);
  };

  return (
    <>
      <ThemeToggle />
      {view === 'dropper' ? (
        <ContentDropper onGenerateFlashcards={handleGenerateFlashcards} />
      ) : (
        <FlashcardDeck cards={flashcards} onExit={handleExitFlashcards} />
      )}
    </>
  );
}

export default App;
