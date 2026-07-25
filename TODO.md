# Architecture TODO

Actionable follow-ups from the architecture review. Content loading via static `require()` switches is left as-is — Metro needs those for production builds; dynamic paths are not a viable fix.

## High priority

- [ ] **Collapse progress APIs** — Keep `progressState` (+ `useProgress`) as the only public API. Make AsyncStorage helpers private so nothing can write favorites/completed poems outside the in-memory cache and drift UI state.
- [ ] **Sentry release hygiene** — Turn off `debug: true` and remove the startup `captureMessage("App startup reached _layout")` (or gate both behind `__DEV__` / a release flag).
- [ ] **Stop passing images through route params** — Replace `JSON.stringify(categoryImage)` on `/congratulation` with a stable key (`categoryId` or image name) and resolve the asset on the destination screen.

## Medium priority

- [ ] **Harden global audio lifecycle** — Don’t force the player visible on every reading mount; clear/sync `isPlaying` with `expo-audio` status; avoid orphaned track state when navigating away without playing.
- [ ] **Finish game migration** — Move leftover `components/game` into `features/game` (or delete dead paths) so there’s one home for challenge UI.
- [ ] **RTL first-launch** — Confirm `I18nManager.forceRTL(true)` actually applies on first install (often needs reload). Document or force a one-time restart if needed.

## Lower priority / cleanup

- [ ] **Demote non-features** — Move Expo-template UI (`hello-wave`, `haptic-tab`, `collapsible`, `parallax-scroll-view`, etc.) out of `features/` into `components/` so `features/` stays domain screens only.
- [ ] **Split `dataService`** — Separate catalog reads (poems/categories/audio) from user prefs (rules, profile, showMeanings).
- [ ] **Tighten types** — Extend `Poem` (or add `PoemWithContent`) for verses/summaries; replace `any` on audio payloads.
- [ ] **Revisit New Arch + minSdk 21** — `newArchEnabled: true` with a very old min SDK widens the crash surface; decide a realistic support floor and test matrix.
