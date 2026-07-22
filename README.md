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

## What's in Phase 1
- Option packs: add / rename / delete / switch packs
- Option editor: add / edit / delete / drag-to-reorder / shuffle / clear all
- Gacha machine (space theme, SVG) with a 10-step spin animation
- Equal-probability random pick (`src/utils/random.ts`) — capsule "rarity" is
  rolled completely separately and only changes cosmetics, never the result
- Result screen with confetti + Spin Again / Done
- Mascot (space fox) with idle blink/float animation + speech bubble hints
- Chinese/English language toggle (`src/i18n/`)
- Sound effects synthesized with the Web Audio API (no external audio files
  needed) — toggle in the top bar
- LocalStorage auto-save/restore of packs + settings + stats (via Zustand persist)
- Installable PWA, works offline

## Deferred to Phase 2 (per PRD)
Sticker book, coins, cosmetic shop, achievements, statistics screen,
additional themes (Candy/Ocean/Princess/Pirate/Dinosaur/Forest/Robot),
additional mascots (Rabbit/Bear/Cat/Penguin/Frog), JSON export/import
(the import confirmation modal component is a good next addition — currently
pack deletion uses a plain `confirm()` as an interim placeholder).

See `PHASE1_HANDOVER.md` for implementation notes and what to build in Phase 2.
