# Handover — Lucky Gacha Decision

## Status
All of Phase 1 + the full Phase 2 feature list is now implemented and builds
cleanly (`npm run build` passes tsc + vite build, no errors/warnings).

## What's implemented (Phase 1 + Phase 2)
- Option packs, option editor (add/edit/delete/reorder/shuffle/clear)
- Space-theme gacha machine with 10-step spin animation, equal-probability
  random pick, cosmetic-only capsule rarity
- Mascot (SVG, 6 species — fox/rabbit/bear/cat/penguin/frog) with idle
  blink/float + speech bubble
- Chinese/English language toggle
- Web Audio API synthesized sound effects (no external files needed)
- **Coins**: +5 per spin
- **Sticker book**: 20-sticker pool, one random sticker per spin, duplicates
  tracked with a ×N count, collection screen with progress counter
- **Cosmetic shop**: spend coins to unlock/select among 8 themes, 6 mascots,
  4 capsule color skins. Themes recolor the whole app via CSS custom
  properties applied to `document.documentElement` at runtime
  (`src/data/themes.ts`, `useApplyTheme` in `App.tsx`)
- **Achievements**: 11 achievements (spin milestones, rarity milestones,
  sticker/theme/mascot completion) checked after each spin and after shop
  unlocks, shown via a toast + a dedicated Achievements screen
- **Statistics screen**: total spins, favorite option, last result, full
  breakdown bar list, reset statistics
- **Settings screen**: language, sound, reduce motion (now actually wired —
  toggles a `reduce-motion` class on `<body>`, not just relying on the OS
  media query), Export/Import backup, Reset Everything
- **Export/Import**: exports `LuckyGachaBackup.json` via `store.exportData()`;
  import reads the file, does a light shape check (`Array.isArray(data.packs)`),
  then shows the **styled `ImportConfirmModal`** (not a browser `confirm()`)
  before overwriting

## Architecture notes
- **State**: `src/store/useGameStore.ts` — one Zustand store, persisted to
  localStorage (`lucky-gacha-decision-storage`, `version: 2`). Adding new
  cosmetics/achievements should extend `ExportedData` so they're covered by
  export/import automatically.
- **Static config lives in `src/data/`**: `stickers.ts`, `themes.ts`,
  `mascots.ts`, `capsuleSkins.ts`, `achievements.ts`. Each is a plain array of
  defs (id, cost, i18n key) — add a new theme/mascot/skin/achievement by
  adding one entry there plus the matching i18n keys in both `en.json` and
  `zh.json`.
- **Randomness split is still intact**: `pickRandomOption` (the real result)
  vs `rollCapsuleRarity` (cosmetic only) — this was preserved through all the
  new coin/sticker/achievement wiring; nothing about rewards or rarity
  influences which option gets picked.
- **Themes**: implemented as CSS variable overrides applied directly to
  `document.documentElement.style`, not a `data-theme` attribute + static
  stylesheet blocks. This was simpler given only ~10 variables define the
  whole palette. If a theme ever needs more than color (e.g. different
  particle shapes), that's the place to extend.
- **Mascots**: `src/components/Mascot/Mascot.tsx` now takes a `species` prop
  and renders from a small `VISUALS` map (body/inner color + ear shape) rather
  than one-off SVGs per animal, to keep 6 species maintainable in one file.

## Known simplifications
- No font swap per theme — the build sandbox has no network access to fetch
  Google Fonts, so all themes share the same rounded system-font stack
  defined in `src/index.css`. If real fonts get self-hosted later, swap
  `--font-display` / `--font-body` per theme the same way colors are done.
- Pack deletion, "clear all options", and "reset statistics/everything" still
  use `window.confirm()`. Only *import* got the styled modal, per your
  original ask — happy to reuse `ImportConfirmModal` as a generic
  `ConfirmModal` for these too if you want visual consistency everywhere.
- Placeholder shop icons for themes/mascots/skins are emoji, not custom
  illustrations — fine for now but worth a design pass later.
- `reduceMotion` disables CSS animation duration but the JS spin timing
  (`SPIN_DURATION_MS`) still waits the full ~2.9s before showing the result —
  visuals jump instantly but there's still a pause. Worth shortening the
  timeout when reduce-motion is on if that bothers testers.
- App icons (`public/icons/*.png`) are still the simple programmatically
  generated placeholder from Phase 1.

## Suggested next steps (all optional, nothing left from the original ask)
1. Swap `window.confirm()` usages for a shared styled `ConfirmModal`
2. Real illustrated app icon + shop icons
3. Self-hosted fonts per theme if the space-y look isn't cutting it elsewhere
4. Shorten spin duration when `reduceMotion` is on
