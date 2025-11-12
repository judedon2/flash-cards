# Flash Cards App - Features Overview

## What Is This App?

A modern web application for learning **Brazilian Portuguese vocabulary** using interactive digital flashcards. Users paste vocabulary data directly from Google Sheets and study with animated cards featuring native pronunciation and optional grammar notes.

---

## Core Features

### 1. Data Import & Management

- **Google Sheets Integration**: Paste tab-separated values (TSV) directly from Google Sheets
- **Smart Auto-Detection**: Automatically parses 3-column format (English | Portuguese | Breakdown)
- **Live Preview**: Shows first 10 entries with total row count before generating cards
- **Data Validation**: Ensures valid data with both English and Portuguese text present

### 2. Interactive Flashcard Study

- **Animated Card Flipping**: Beautiful 3D flip animation on click or keypress
- **Progress Tracking**: Real-time display showing current position (e.g., "Card 5 of 20")
- **Card Navigation**: Move between cards using arrow keys or on-screen buttons
- **Auto-Shuffle**: Cards are randomized using Fisher-Yates algorithm for better learning retention
- **Large, Readable Text**: 4xl font size optimized for quick recognition

### 3. Bidirectional Learning

- **Language Direction Toggle**: Switch between English→Portuguese and Portuguese→English
- **Mid-Session Switching**: Change direction anytime during study without restarting
- **Instant Adaptation**: All cards automatically adapt to selected direction
- **Smart State Reset**: Flip state resets when changing direction for clarity

### 4. Native Audio Pronunciation

- **Text-to-Speech**: Native Brazilian Portuguese pronunciation using Google Translate TTS
- **Smart Icon Placement**: Speaker icon appears only when Portuguese text is visible
- **Audio Caching**: Server-side 1-hour cache for improved performance on repeated words
- **Production-Ready**: Works in both development and production (Vercel) environments

### 5. Grammar Support

- **Optional Breakdown Sections**: Display grammar notes or contextual information for each card
- **Toggle Visibility**: Show/Hide button (B key) to reveal/hide explanations
- **Conditional Display**: Only shows when breakdown content exists
- **Non-Intrusive**: Keeps focus on vocabulary while providing depth when needed

### 6. Theme Customization

- **Light/Dark Mode**: Full theme support with smooth transitions
- **Persistent Preference**: Saves choice to browser localStorage
- **System Detection**: Respects OS-level dark mode preferences by default
- **Fixed Toggle Button**: Always accessible in top-right corner

### 7. Keyboard Shortcuts

Complete keyboard navigation for efficient studying:

| Key | Action |
|-----|--------|
| **Space** or **Enter** | Flip current card |
| **←** (Left Arrow) | Previous card |
| **→** (Right Arrow) | Next card |
| **B** | Toggle breakdown/grammar section |

### 8. Responsive Design

- **Mobile-First**: Optimized for phones, tablets, and desktops
- **Touch-Friendly**: Large clickable buttons and touch-optimized controls
- **Adaptive Layouts**: Uses Tailwind CSS grid system for flexible layouts
- **Cross-Browser**: Tested across modern browsers with PostCSS autoprefixer

---

## Technical Highlights

### Frontend Stack
- **React 18.3.1** with TypeScript 5.5.3
- **Vite 5.3.1** for lightning-fast development and builds
- **Tailwind CSS 3.4.4** for modern, utility-first styling

### Backend & API
- **Express Server** for local development proxy (port 3001)
- **Vercel Serverless Functions** for production TTS API
- **CORS-Enabled** for secure cross-origin requests

### State Management
- **React Hooks** (useState, useCallback) for component state
- **Custom Hooks** (useFlashcards, useSpeech) for reusable logic
- **Props-Based Communication** for clean component architecture

### Build & Deployment
- **TypeScript Compilation** with strict type checking
- **Optimized Production Builds** via Vite
- **Multiple Deployment Options**: Vercel (recommended), GitHub Pages, Netlify

---

## Deployment Configuration

### Currently Configured For:
1. **Vercel** (Primary): Full functionality including working audio via serverless functions
2. **Local Development**: Concurrent dev server (port 5173) + proxy server (port 3001)
3. **GitHub Pages** (Alternative): Frontend-only, static hosting (no audio support)

### Available npm Scripts:
```bash
npm run dev      # Start Vite dev server
npm run proxy    # Start local TTS proxy
npm start        # Run both servers concurrently
npm run build    # Production build with type checking
npm run deploy   # Deploy to GitHub Pages
```

---

## User Workflow

1. **Paste Data**: Copy vocabulary from Google Sheets → Paste into input area
2. **Preview**: Review first 10 entries in formatted table
3. **Generate Cards**: Click "Generate Flashcards" button
4. **Study**: Navigate through shuffled cards with keyboard or buttons
5. **Flip Cards**: Reveal answers with Space/Enter or click
6. **Hear Pronunciation**: Click speaker icon for native audio
7. **Review Grammar**: Press B key to toggle breakdown sections
8. **Customize**: Switch language direction or theme anytime

---

## Future-Ready Features

### Already Implemented (But Hidden/Commented):
- **Voice Gender Selection**: Framework for male/female Portuguese voice options (VoiceGenderToggle component exists but not currently displayed)

### Extensibility:
- Modular component architecture allows easy addition of:
  - Quiz modes
  - Spaced repetition algorithms
  - Progress analytics
  - Multiple deck support
  - Export/import deck functionality

---

## Project Statistics

- **Components**: 7 React components
- **Custom Hooks**: 2 specialized hooks
- **Utility Functions**: 2 (parser, shuffle)
- **TypeScript Interfaces**: Fully typed
- **Supported Languages**: English ↔ Brazilian Portuguese
- **Audio API**: Google Translate TTS
- **Primary Deployment**: Vercel
