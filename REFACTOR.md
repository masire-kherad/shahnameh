# Refactor.md – MasireKherad (مسیر خرد)

**A roadmap for improving code quality, performance, and maintainability of the Shahnameh reading app.**

---

## 🧐 Current Status Assessment

### Strengths  
- ✅ Clean project structure with separation of concerns  
- ✅ Full TypeScript for type safety  
- ✅ Expo for cross‑platform development  
- ✅ File‑based routing with Expo Router  

### Areas for Improvement  
- 📊 State management is spread across components / local storage  
- 🧪 No automated testing  
- 🔧 Some components are too large and duplicated  
- 🚀 Performance not yet optimized for low‑end devices  
- 🔍 Error handling is minimal (mostly `console.log`)  

---

## 🔥 Priority Refactoring Tasks

### 🔴 High Priority

#### 1. Centralize State Management  
Move from scattered `useState` / `AsyncStorage` calls to a single source of truth.

**Proposed approach** – use **Zustand** (lightweight) or Redux Toolkit.
```ts
// store/useReadingStore.ts
interface ReadingState {
  currentPoemId: string | null;
  progress: number;
  completed: string[];
  setProgress: (id: string, pct: number) => void;
  markComplete: (id: string) => void;
}
```
- [ ] Choose and integrate state manager  
- [ ] Migrate user preferences / progress  
- [ ] Remove prop‑drilling  

#### 2. Component Architecture Refactor  
Break down large UI blocks into smaller, reusable pieces.

- [ ] Extract `AudioPlayer` into a standalone component  
- [ ] Create a `PoemCard` that can be reused in lists and detail view  
- [ ] Separate game logic from presentational components (e.g. `ChallengeButton`, `ScoreBadge`)  

#### 3. Data Layer Improvements  
- [ ] Add **React Query** or **SWR** for server‑side data (if an API exists)  
- [ ] Implement a local cache service for poems / audio  
- [ ] Remove hard‑coded data files and serve from a structured backend  

---

### 🟡 Medium Priority

#### 4. Test Infrastructure  
Currently there are **zero** tests.

**Goal**: at least 80% unit test coverage for critical logic.

```json
// package.json
"jest": {
  "preset": "jest-expo",
  "setupFilesAfterSetup": ["./jest.setup.ts"]
}
```
```bash
tests/
├── unit/           # Hooks, utilities, game logic
├── integration/    # Screens with contexts
├── e2e/            # Detox / Maestro tests
└── __mocks__/      # Expo modules mocks
```
- [ ] Add Jest + React Native Testing Library  
- [ ] Write initial unit tests for `services/` and `hooks/`  
- [ ] Set up GitHub Actions for CI  

#### 5. Performance Optimisation  
- [ ] Replace `FlatList` scroll sections with `FlashList` for large poem sets  
- [ ] Use `React.memo` and `useMemo` on list items  
- [ ] Optimise image assets with `expo-image`  
- [ ] Lazy‑load non‑critical screens  
- [ ] Add performance profiling scripts  

#### 6. Error Handling & Logging  
- [ ] Create a `LoggerService` (wraps `console.error` with remote reporting)  
- [ ] Add Sentry or Crashlytics for crash reporting  
- [ ] Replace all `console.log` calls with the logger  
- [ ] Provide user‑friendly error boundaries  

---

### 🟢 Low Priority

#### 7. Code Quality & Consistency  
- [ ] Install `eslint`, `prettier` with Expo defaults  
- [ ] Add `husky` + `lint-staged` for pre‑commit checks  
- [ ] Enforce import order and file naming conventions  
- [ ] Document all custom hooks with JSDoc  

#### 8. Internationalisation (i18n)  
The app is in Persian; future could include English.

```ts
// locales/index.ts
export const resources = {
  en: { translation: require('./en.json') },
};
```
- [ ] Set up `i18next` or `react-native-localize`  
- [ ] Extract all user‑facing strings  

---

## 💣 Technical Debt Items

### Immediate Fixes  
- Remove all `any` types → create proper interfaces  
- Replace magic numbers/strings with named constants  
- Extract repetitive UI styles into a `useTheme()` hook  
- Remove unused commented‑out code  

### Medium‑Term  
- Upgrade to Expo SDK 51+  
- Audit and prune unused npm packages  
- Normalise naming (some files use `PascalCase`, others `camelCase`)  

### Long‑Term  
- Implement **offline‑first** with local SQLite  
- Build a lightweight backend for poems storage  
- Add comprehensive accessibility labels  

---

## 🏗️ Proposed Project Structure

```
shahname/
├── app/                     # Screens (Expo Router)
├── components/
│   ├── common/             # Buttons, Cards, Inputs
│   ├── game/               # Points, Challenges, Achievements
│   ├── reading/            # Poem viewer, progress bar
│   └── layout/             # Shell, Tabs, Headers
├── features/               # Feature‑based modules
│   ├── reading/
│   ├── gamification/
│   ├── audio/
│   └── profile/
├── store/                  # Zustand / Redux stores
├── services/
│   ├── api/                # HTTP client
│   ├── cache/              # AsyncStorage wrapper
│   └── audio/              # Audio playback service
├── hooks/                  # useAudio, useProgress, etc.
├── utils/                  # Pure utility functions
├── constants/              # Colors, sizes, keys
├── types/                  # Global TypeScript types
├── assets/                 # Fonts, images, audio
├── public/                 # Web‑specific assets
└── tests/                  # Colocated or test root
```
---

## 🚀 Migration Strategy

### Phase 1 – Foundation (2–3 weeks)  
1. Set up state management store  
2. Integrate testing framework  
3. Create error handling service  
4. Extract constants  

### Phase 2 – Component Refactor (3–4 weeks)  
1. Break down huge components  
2. Create reusable hooks  
3. Optimise list rendering  
4. Add TypeScript strict mode  

### Phase 3 – Architecture (2–3 weeks)  
1. Reorganise into feature folders  
2. Plug in React Query (if needed)  
3. Set up CI/CD pipeline  
4. Build caching layer  

### Phase 4 – Polish (1–2 weeks)  
1. Performance profiling  
2. Accessibility audit  
3. Documentation overhaul  
4. Validate with user testing  

---

## 📊 Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Test coverage | 0% | ≥ 80% |
| `any` type usage | 40+ occurrences | 0 |
| App startup time | ~4s | < 2s |
| Scrolling FPS (poem list) | 20–30 FPS | 60 FPS |
| Bundle size (Android) | 18 MB | < 14 MB |

---

## ⚠️ Risks & Mitigation

| Risk | Mitigation |
|------|------------|
| Breaking changes during state refactor | Use feature flags, migrate gradually |
| Performance regression | Profile before/after each PR |
| Lost user data (progress) | Write migration scripts for storage |
| Dependency instability | Pin versions, gradual updates |
| Developer confusion | Keep up‑to‑date docs, clear commit messages |

---

## 🔧 Resources Needed

**Tools**  
- [ ] React Native DevTools / Flipper  
- [ ] Redux DevTools (if using Redux)  
- [ ] Sentry / Crashlytics account  
- [ ] CI service (GitHub Actions / Expo EAS builds)  

**Team**  
- 1–2 frontend developers (part‑time for 2 months)  
- 1 QA / tester (for validation)  

---

## 📅 Timeline Estimate

| Phase | Duration |
|-------|----------|
| Planning | 1 week |
| Phase 1–4 | 7–10 weeks |
| Testing & Deployment | 1 week |
| **Total** | **8–12 weeks** |

---

*Last updated: 1405/02/14*  
*Next review: after Phase 2 completion*

---

> *“A journey of a thousand lines of code begins with a single refactor.”*  
> *Let’s make MasireKherad faster, safer, and more delightful!*

