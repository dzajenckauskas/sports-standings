# Sports Standings

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178C6)]()
[![React](https://img.shields.io/badge/framework-React-61DAFB)]()

A small tournament app that lets you add participants, record matches, and view computed standings — themeable, localizable, and keyboard‑/screen‑reader friendly.

---

## 🔗 Live Demo
👉 [https://standings.danzaj.lt/](https://standings.danzaj.lt/)

---

## 📑 Table of Contents

- [Quick Start](#quick-start)
- [Scripts](#scripts)
- [Features](#features)
- [How It’s Implemented](#how-its-implemented)
- [Theming](#theming)
- [i18n](#i18n)
- [Accessibility](#accessibility)
- [Project Structure](#project-structure)
- [Scaling Ideas](#scaling-ideas)

---

## 🚀 Quick Start

### Requirements
- Node 18+ and npm 9+

### Install
```bash
npm install
```

### Start (dev server)
```bash
npm start
```
App runs at [http://localhost:3000](http://localhost:3000)

### Build (production)
```bash
npm run build
```
Outputs to `build/`

### Type check
```bash
npm run typecheck
```

### Lint
```bash
npm run lint
# Auto‑fix
npm run lint:fix
```

### Test
```bash
npm test
```

---

## 📜 Scripts

- **start**: runs the dev server (react-scripts)
- **build**: creates a production build
- **test**: runs tests (Jest via react-scripts)
- **typecheck**: TypeScript checking with `tsc --noEmit`
- **lint**: ESLint on `.ts/.tsx`
- **lint:fix**: ESLint with `--fix`

---

## ✨ Features

### Participant entry (3 modes)
- Text input  
- Select from options (e.g., country lists)  
- Emoji input with at‑caret insertion and popover  

### Matches + standings
- Add matches; standings update automatically (points/wins/losses/draws)  
- Duplicate pair protection (A vs B = B vs A)  
- Sort by **points → wins → name**  

### Theme‑driven UI
- Color and layout tokens per theme (`cleanMinimal`, `sportyEnergetic`, `tableCentric`)  
- Input/Select/Button sizes and styles controlled by theme tokens  

### i18n
- Dot‑path JSON in `public/locales/`  
- Pre‑loads common namespace to avoid flicker  
- Optional per‑template namespaces (e.g., `eurobasket.json`)  
- Example locales: **en**, **lt**  

### Data cleanup menu
- Three‑dots “More” button in card header  
- Options:  
  - Clear matches data (per tournament)  
  - Clear all tournament data (participants + matches)  
- Each action asks for confirmation  

### Validation
- Yup validation for forms (required, min length, “pair already played”)  

### Accessibility
- Selects have associated label or aria‑label  
- Presentational header icon (non‑focusable, aria‑hidden)  
- Styled props use transient ($) props to avoid DOM warnings  

---

## ⚙️ How It’s Implemented

### Forms and validation
- `react-hook-form` + `yup` for typed, scale‑friendly forms  
- ParticipantForm supports: **text | select | emoji**  
- Select filters out already‑added participants  

### Redux
- Slices:  
  - **participants**: add, remove by tournamentId  
  - **scores**: add/update/remove match, remove by tournamentId  
- Optimizations:  
  - `shallowEqual` on filtered selectors  
  - Derived sets (playedPairs) memoized via `useMemo`/`useCallback`  

### Emoji input
- Inline adornment button (right) with exact height matching the input  
- Divider color syncs to theme focus; switches to error color when invalid  
- Popover uses click‑away close; flips up when space is tight  

### Standings
- Localized headers (`standings.columns.*`)  
- Columns and icon visibility are theme‑configurable  

---

## 🎨 Theming

Tokens live in `src/theme/*.ts` (see `tableCentric.ts` for refactor with color variables).  

**Palette highlights**
- `background.default/paper`  
- `text.primary/secondary`  
- `primary/secondary/error/success`  
- `tableHeader/tableRow`  
- `input/select`: bgColor, color, borderColor, focusBorderColor  

**UI layout tokens (`AppTheme.ui`)**
- `layout.buttonsSize / inputsSize`  
- `select.fontSize`, `select.fontWeight`, `inputsSize`  
- Input fine‑grained tokens: paddingX, radius, borderWidth, placeholderOpacity, focusRingWidth/focusRingAlpha, background  

Examples:  
- Input/Select default sizes sourced from the theme  
- Header toggle buttons’ variants/sizes from theme tokens  

---

## 🌍 i18n

**Files**
- `public/locales/{en|lt}/common.json`  
- Add more namespaces like `public/locales/en/eurobasket.json`  

**API**
- `t('forms.participant.title')`  
- `t('forms.score.selectHome.${kind}')`  
- `t('actions.addScore')`  

**Preloading**
- `common.json` is preloaded before first render  
- Additional namespaces can be merged at runtime  

---

## ♿ Accessibility

- Selects have either:  
  - `<label htmlFor="...">` + `id` on `<select>`  
  - `aria-label` derived from placeholder when label is omitted  

- Card header icon:  
  - `aria-hidden="true"`, `tabIndex={-1}`, `role="presentation"`  
  - Removed focus‑based animation  

- Styled transient props ($align, $emphasize) avoid “unknown prop” warnings on th/td  

---

## 📂 Project Structure

```
src/components
  TournamentCard.tsx — page shell, menu, forms, standings
  forms/ — ParticipantForm, ScoreForm, EmojiInput, EmojiPickerMini
  shared/ — Input, Select, Button, Card, Typography, Option, FormCard, icons

src/features
  Redux slices (participants, scores)

src/theme
  Tokens and theme presets (cleanMinimal, sportyEnergetic, tableCentric)

public/locales
  JSON translations
```

---

## 🚀 Scaling Ideas

- Dark/Light theme switcher  
- Language switcher  
- Import/Export tournament data  
- Undo/Toast for destructive actions  
- Memoized selectors (Reselect)  
- Offline/PWA support  

---

## 📜 License
MIT
