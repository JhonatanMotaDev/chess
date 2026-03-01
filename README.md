# Chess Game - Mobile development MVP

A complete, Chess.com-inspired mobile chess application built with React Native (Expo) and TypeScript.

## Architecture Overview

### Tech Stack
- **Framework**: Expo SDK 52 + React Native
- **Language**: TypeScript (strict mode)
- **State Management**: Zustand with persistence (AsyncStorage)
- **Chess Logic**: chess.js (move validation, rules)
- **AI Engine**: js-chess-engine (minimax + alpha-beta)
- **Animations**: React Native Reanimated
- **Navigation**: Expo Router (file-based)

### Feature-Based Folder Structure

```
src/
├── components/
│   └── chess/           # Board, pieces, panels, modals
├── engine/              # Chess AI, opening book
├── store/               # Zustand stores (game, settings)
├── theme/               # Light/dark colors
├── types/               # TypeScript definitions
├── utils/               # Chess helpers, analysis
├── hooks/               # useSounds (haptics)
└── assets/              # Icons, sounds
```

## Features

### Core Gameplay
- Full chess rules (castling, en passant, promotion, check/checkmate)
- Draw detection (stalemate, 50-move, repetition, insufficient material)
- Play as white or black vs AI
- Board flip
- Undo move (optional)
- Pawn promotion modal

### AI Engine
- 4 difficulty levels: Beginner, Intermediate, Advanced, Master
- Human-like play: evaluation randomness, thinking delay
- Opening book for variety in first moves
- js-chess-engine with alpha-beta pruning

### UI/UX (Chess.com Inspired)
- Green-themed board (beige/green squares)
- Board coordinates (a-h, 1-8)
- Legal move highlights
- Last move highlight
- Check highlight
- Captured pieces display
- PGN move list
- Responsive layout

### Extra Features
- Light/Dark mode
- Settings screen
- ELO rating display
- Game analysis screen (PGN, accuracy placeholder)
- Persistent settings (AsyncStorage)
- Haptic feedback

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run android
npm run ios
npm run web
```

## Project Structure

```
├── app/
│   ├── _layout.tsx          # Root layout
│   ├── (tabs)/              # Home tab
│   ├── game/play.tsx        # Game screen
│   ├── difficulty.tsx       # Difficulty/color selection
│   ├── settings.tsx         # Settings modal
│   └── analysis.tsx        # Post-game analysis
├── src/
│   ├── components/chess/    # Chess UI components
│   ├── engine/              # AI + opening book
│   ├── store/               # State (Zustand)
│   ├── theme/               # Theming
│   └── utils/               # Helpers
└── assets/                  # Icons, images
```

## Configuration

- **ESLint + Prettier**: Pre-configured
- **Path alias**: `@/` maps to `src/`
- **Babel**: module-resolver for path aliases

## License

MIT