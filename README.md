# Lucky Gacha Decision 幸運扭蛋機

A kid-friendly PWA that helps you make decisions by "spinning" a gacha capsule machine. Fully offline, no backend, no accounts.

## Stack
- Vite + React 18 + TypeScript
- Zustand (state + localStorage persistence)
- vite-plugin-pwa (manifest + service worker)
- Vanilla CSS (space theme design tokens in `src/index.css`)

## Getting started
```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Deploy to GitHub Pages
1. Push this repo to GitHub as `lucky-gacha-decision`.
2. In `vite.config.ts`, `base: './'` is already set so it works from a project subpath.
3. Build with `npm run build`, then deploy the `dist/` folder to the `gh-pages` branch
   (e.g. via the `gh-pages` npm package, or a GitHub Actions workflow).

## Features
- Option packs: add / rename / delete / switch packs
- Option editor: add / edit / delete / drag-to-reorder / shuffle / clear all
- Gacha machine (SVG) with a 10-step spin animation across 8 unlockable
  themes (Space, Candy, Ocean, Princess, Pirate, Dinosaur, Forest, Robot)
- Equal-probability random pick (`src/utils/random.ts`) — capsule "rarity" is
  rolled completely separately and only changes cosmetics, never the result
- Result screen with confetti + coin/sticker reward + Spin Again / Done
- 6 mascots (fox/rabbit/bear/cat/penguin/frog), idle blink/float + speech
  bubble hints
- Coins (+5/spin) and a 20-sticker collection book
- Cosmetic shop: spend coins on themes, mascots, capsule color skins
- 11 achievements with unlock toast + achievements screen
- Statistics screen (total spins, favorite option, breakdown, reset)
- Settings screen: language, sound, reduce motion, export/import JSON backup
  (with a styled confirmation modal before overwriting), reset everything
- Chinese/English language toggle throughout (`src/i18n/`)
- Sound effects synthesized with the Web Audio API (no external audio files
  needed)
- LocalStorage auto-save/restore of everything (via Zustand persist)
- Installable PWA, works offline

See `PHASE1_HANDOVER.md` for architecture notes and suggested next steps.
