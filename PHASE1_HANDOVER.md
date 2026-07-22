# Phase 1 Handover — Lucky Gacha Decision

## Status
Phase 1 (MVP) is complete and builds cleanly (`npm run build` passes tsc + vite build).

## Architecture notes for the next session
- **State**: single Zustand store at `src/store/useGameStore.ts`, persisted to
  localStorage under the key `lucky-gacha-decision-storage`, versioned (`version: 1`).
  Add new slices (coins, stickers, achievements, statistics detail) directly here.
- **i18n**: `src/i18n/en.json` + `src/i18n/zh.json`, loaded via `I18nProvider`/`useI18n()`.
  Add new keys to both files together — nothing auto-falls-back between languages.
- **Randomness**: `src/utils/random.ts` intentionally keeps `pickRandomOption`
  (the real result) and `rollCapsuleRarity` (cosmetic only) as two independent
  functions. Keep this separation when adding new cosmetic systems (e.g. themed
  capsule skins) so nothing can accidentally bias the real pick.
- **Sound**: `src/utils/sound.ts` synthesizes effects with the Web Audio API
  instead of shipping audio files (build sandbox had no network access to fetch
  CC0 sound assets). This is a legitimate long-term approach (keeps bundle
  tiny, no licensing to track) but can be swapped for real sample playback
  later if preferred — the `sfx` map is the only place that would change.
- **Theme**: only "Space" is implemented (`src/index.css` design tokens:
  `--bg-space`, `--nebula-purple`, `--accent-cyan`, etc). To add more themes,
  the cleanest approach is a `data-theme` attribute on `<body>` with a
  parallel CSS variable block per theme, then a themes store slice.
- **Mascot**: `src/components/Mascot/Mascot.tsx` is a single hand-built SVG fox
  in a space helmet with a blink loop and float animation. Additional mascots
  (rabbit/bear/cat/penguin/frog) should follow the same shape: a self-contained
  SVG component taking no props besides `message`, swapped via a store setting.

## Known simplifications / things to revisit
- Pack deletion and "clear all options" still use `window.confirm()`. The
  brief specifically asked for a **styled modal** for the *import* confirmation
  — build `src/components/ImportConfirmModal/` (folder already scaffolded,
  currently empty) when Phase 2 adds export/import, and consider reusing it
  for pack deletion too for visual consistency.
- No sticker book / coins / shop / achievements / statistics screen yet —
  all deferred per the Phase 1 scope agreed with the user.
- Only one option pack ships by default ("My Choices") with 4 sample options.
- Icons (`public/icons/icon-192.png`, `icon-512.png`) are placeholder art
  generated programmatically (simple gacha-dome glyph) — swap for real
  illustrated app icons if a nicer one gets designed later.

## Suggested Phase 2 order
1. Statistics screen (reads straight from the existing `statistics` store slice)
2. Coins + sticker collection (spin already calls `recordSpin`; add
   coin/sticker rewards there)
3. Cosmetic shop (spend coins, unlock themes/mascots/capsule skins)
4. Achievements
5. Export/import + the styled `ImportConfirmModal`
6. Remaining themes and mascots
