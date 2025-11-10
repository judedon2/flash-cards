# Brazilian Portuguese Flashcards

A modern, interactive web app for learning Brazilian Portuguese vocabulary using flashcards. Simply paste your vocabulary from Google Sheets and start practicing!

## Features

- **Effortless Content Import**: Copy and paste directly from Google Sheets
- **Interactive Flashcards**: Beautiful cards with smooth 3D flip animations
- **Bidirectional Learning**: Switch between English→Portuguese and Portuguese→English at any time
- **Native Pronunciation**: Built-in Brazilian Portuguese text-to-speech
- **Grammar Notes**: Optional breakdown section for additional context
- **Keyboard Shortcuts**: Navigate efficiently without using your mouse
- **Light/Dark Mode**: Easy on the eyes in any lighting condition
- **Fully Responsive**: Works beautifully on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start both proxy server and dev server
npm run start
```

The app will be available at [http://localhost:5173](http://localhost:5173)
The TTS proxy server runs on [http://localhost:3001](http://localhost:3001)

### Building for Production

```bash
npm run build
npm run preview
```

## How to Use

1. **Prepare Your Vocabulary**
   - Open your Google Sheet with three columns: English, Portuguese, Breakdown
   - Select the rows you want to practice

2. **Import to App**
   - Copy the selected rows (Ctrl+C / Cmd+C)
   - Paste directly into the app (Ctrl+V / Cmd+V)
   - The data will automatically populate the table

3. **Generate Flashcards**
   - Click "Generate Flashcards"
   - Cards are automatically shuffled for better learning

4. **Study!**
   - Click cards to flip between English and Portuguese
   - Use the speaker icon to hear native Brazilian pronunciation
   - Toggle "Show Breakdown" for grammar notes
   - Switch language direction anytime during your study session

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` or `Enter` | Flip the current card |
| `←` `→` | Navigate between cards |
| `B` | Toggle breakdown section |

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling and animations
- **Google Translate TTS** - Natural-sounding Brazilian Portuguese via proxy server

## Project Structure

```
flash-cards/
├── src/
│   ├── components/       # React components
│   │   ├── ContentDropper.tsx
│   │   ├── Flashcard.tsx
│   │   ├── FlashcardDeck.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── BreakdownSection.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useFlashcards.ts
│   │   └── useSpeech.ts
│   ├── utils/           # Utility functions
│   │   ├── parser.ts
│   │   └── shuffle.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## Features in Detail

### Smart Paste Detection
The app automatically detects tab-separated values from Google Sheets and parses them into a clean table format.

### Mid-Session Direction Toggle
Unique feature: You can switch language direction at any point during your study session. All cards (past, current, and future) instantly adapt to the new direction.

### Brazilian Portuguese Audio
Uses Google Translate TTS API for authentic, natural-sounding Brazilian Portuguese pronunciation. A local proxy server bypasses CORS restrictions to deliver high-quality audio. The speaker icon appears only when Portuguese text is displayed, regardless of the language direction selected.

### Responsive Design
Fully optimized for mobile devices with touch-friendly controls and adaptive layouts.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
