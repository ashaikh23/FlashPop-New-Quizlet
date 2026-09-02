# FlashPop

A fast, interactive flashcard and multiple-choice study application built as a clean alternative to Quizlet without paywalls, account requirements, or bloat.

Live Demo: https://ashaikh23.github.io/FlashPop-New-Quizlet/

---

## Overview

FlashPop is a web-based learning app designed to make studying active and engaging. It combines physical-feeling 3D flashcards, an automated multiple-choice quiz generator, a speed-match tile game, audio pronunciations, and print-ready study sheets into a single client-side application.

Everything runs directly in the browser. You do not need an account, an API key, or an internet connection once loaded.

---

## Features

### Study and Review
- 3D Interactive Flashcards: Flip cards in realistic 3D space with click or keyboard shortcuts. Flip, star, or mark mastery with instant visual feedback.
- Hands-Free Auto-Play: Audio loop that speaks terms, pauses for recall, flips to definition, reads the definition, and advances through the deck automatically.
- Study Stopwatch: An in-place study timer that counts up your study session duration with pause, resume, and reset controls.
- Pronunciation and Audio: Built-in text-to-speech using browser synthesis to read cards aloud.
- Starred Cards Quick Filter: Toggle to isolate difficult cards and drill only starred terms.

### Assessment and Games
- Multiple Choice Quiz Arena: Automatically generates 4-option multiple-choice tests from any deck by synthesizing distractors from other terms. Supports Term to Definition, Definition to Term, and Mixed modes with optional per-question timers.
- Missed Cards Re-Quiz: Immediate post-quiz review showing score breakdowns and an instant button to re-test only the questions you missed.
- Speed Match: Tile-matching mini-game that challenges you to pair terms with their definitions against a live stopwatch.

### Material Generation and Data
- Printable Study Materials: Generates print-ready documents in three formats: a two-column vocabulary sheet, a fill-in-the-blank practice exam with a detachable answer key, and cut-out dashed paper flashcards.
- Batch Text Import: Paste terms and definitions separated by tabs, hyphens, commas, or semicolons directly from Google Sheets, Excel, Quizlet, or text notes.
- JSON Backup and Restore: Export your entire collection to a single JSON file and restore it on any computer or browser.
- Dark and Night Mode: Full high-contrast dark theme with midnight canvas, slate borders, and crisp typography.

---

## How It Was Built

The application was built as a lightweight, static single-page application using modern web standards:

- React 18 and TypeScript: Component architecture with strict typing across cards, decks, quiz generators, and user records.
- Vite: Development environment and production build tool, providing instant hot module replacement and tree-shaken static assets.
- Tailwind CSS: Custom design system based on a playful geometric aesthetic with high-contrast borders, offset drop shadows, custom color tokens, and dark mode class scoping.
- Web Audio API: Sound effects (button clicks, card flips, correct chimes, and completion fanfares) are synthesized procedurally via oscillators and gain nodes in code, avoiding external sound asset loading.
- Web Speech API: Uses SpeechSynthesis for reading terms and definitions aloud without third-party services or network latency.
- Browser LocalStorage: All user-created sets, card edits, study history, and preferences persist locally on your device.
- Canvas Confetti: Canvas-based particle rendering for quiz completion and high-score celebrations.
- Lucide React: Vector iconography used throughout the user interface.

---

## Getting Started

### Prerequisites
- Node.js version 18 or higher
- npm version 9 or higher

### Local Installation

1. Clone the repository:
```bash
git clone https://github.com/ashaikh23/FlashPop-New-Quizlet.git
cd FlashPop-New-Quizlet
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the local URL displayed in your terminal (typically http://localhost:5173 or http://localhost:5175).

### Building for Production

To create an optimized production build for static hosting:
```bash
npm run build
```

The output will be placed in the `dist` directory, ready to be served by any static web host or CDN.

---

## Keyboard Shortcuts

Flashcard Study Mode:
- Spacebar: Flip current card
- Right Arrow or D: Next card
- Left Arrow or A: Previous card
- 1: Mark as Still Learning
- 2: Mark as Mastered
- S: Toggle Star
- P: Pronounce term / definition

Multiple Choice Quiz Mode:
- 1, 2, 3, 4: Select option
- A, B, C, D: Select option
- Escape: Exit quiz

---

## Next Steps and Roadmap

Here are planned improvements for future releases:

1. Backend Database Integration:
   - Connect a database (such as Supabase or PostgreSQL) with user authentication so decks and study progress sync seamlessly across phones, laptops, and tablets.

2. Spaced Repetition Algorithm:
   - Implement an automated spaced repetition schedule (such as the SM-2 or FSRS algorithm) that calculates optimal review intervals based on difficulty and recall accuracy.

3. Image and Media Support:
   - Add image attachments to card faces for anatomy diagrams, geometry figures, and visual flashcards.

4. Community and Public Deck Sharing:
   - Allow users to publish public decks, browse community collections, and copy shared sets with a short link.

5. Multiplayer Study Modes:
   - Real-time head-to-head quiz matches via WebSockets for classroom or friend group challenges.

---

## Author

Created by Afya.
