# Tasks: Dropdown Ngôn Ngữ + i18n System

**Frame**: `721:4942` — Dropdown-ngôn ngữ
**Prerequisites**: plan.md (i18n update), spec.md (3rd pass), design-style.md
**Generated**: 2026-03-23

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

---

## Phase 1: Setup — Already Complete ✅

- [x] T001 Create EnFlagIcon SVG component | src/components/icons/EnFlagIcon.tsx

---

## Phase 2: US1 — Dropdown UI — Already Complete ✅

- [x] T002–T009 LanguageSelector dropdown + tests (all done)

---

## Phase 3: i18n Foundation (US2 — Priority: P1)

**Goal**: Create translation system (TranslationProvider + useTranslation hook + VN/EN files)

**Independent Test**: Import `useTranslation()`, call `t("kvBanner.subtitle")` → returns Vietnamese. Call `setLanguage("EN")` → `t("kvBanner.subtitle")` returns English.

- [x] T010 [P] [US2] Create Vietnamese translation file with all keys from SUN_KUDOS_TEXTS + header/footer/common keys | src/i18n/vi.ts
- [x] T011 [P] [US2] Create English translation file with same structure, all values translated to English | src/i18n/en.ts
- [x] T012 [US2] Create translation types — derive TranslationKeys type from vi.ts for type-safe dot-path keys | src/i18n/types.ts
- [x] T013 [US2] Create TranslationProvider (React Context) + useTranslation hook — reads localStorage "lang" on mount, provides { t, language, setLanguage }, t() resolves dot-path keys from current language file, setLanguage updates context + localStorage | src/i18n/index.ts

**Checkpoint**: i18n system works standalone — `useTranslation()` returns correct strings for VN and EN

---

## Phase 4: Layout Integration (US2)

**Goal**: Wrap app with TranslationProvider so all components can use `t()`

- [x] T014 [US2] Create Providers client component wrapper — wraps children with TranslationProvider (needed because layout.tsx is Server Component) | src/app/Providers.tsx
- [x] T015 [US2] Update root layout to wrap {children} with Providers | src/app/layout.tsx

**Checkpoint**: Any component in the app can now call `useTranslation()`

---

## Phase 5: LanguageSelector Integration (US2)

**Goal**: Connect LanguageSelector to i18n system instead of local state

- [x] T016 [US2] Update LanguageSelector — replace local selectedLanguage state and localStorage logic with useTranslation().language and useTranslation().setLanguage(). Remove duplicate localStorage reads/writes. Keep dropdown UI, click-outside, keyboard nav unchanged | src/components/LanguageSelector.tsx

**Checkpoint**: Clicking VN/EN in dropdown changes language globally via context

---

## Phase 6: Migrate Components (US2) — 17 files

**Goal**: Replace all `SUN_KUDOS_TEXTS.x.y` with `t("x.y")` in every component

### KV Banner components
- [x] T017 [P] [US2] Migrate KVBanner — replace SUN_KUDOS_TEXTS imports with useTranslation, use t() for subtitle and logo text | src/components/sun-kudos/KVBanner.tsx
- [x] T018 [P] [US2] Migrate KudosInputBar — replace SUN_KUDOS_TEXTS.kvBanner.inputPlaceholder with t("kvBanner.inputPlaceholder") | src/components/sun-kudos/KudosInputBar.tsx
- [x] T019 [P] [US2] Migrate SunnerSearchBar — replace SUN_KUDOS_TEXTS.kvBanner.searchPlaceholder with t("kvBanner.searchPlaceholder") | src/components/sun-kudos/SunnerSearchBar.tsx

### Highlight Kudos components
- [x] T020 [P] [US2] Migrate HighlightKudos — replace SUN_KUDOS_TEXTS.sections/highlight/aria keys with t() | src/components/sun-kudos/HighlightKudos.tsx
- [x] T021 [P] [US2] Migrate HighlightKudoCard — replace SUN_KUDOS_TEXTS.highlight.viewDetail with t("highlight.viewDetail") | src/components/sun-kudos/HighlightKudoCard.tsx
- [x] T022 [P] [US2] Migrate CarouselControls — replace SUN_KUDOS_TEXTS.aria carousel keys with t() | src/components/sun-kudos/CarouselControls.tsx

### All Kudos Feed components
- [x] T023 [P] [US2] Migrate AllKudosSection — replace SUN_KUDOS_TEXTS.sections.allKudos with t("sections.allKudos") | src/components/sun-kudos/AllKudosSection.tsx
- [x] T024 [P] [US2] Migrate KudosFeed — replace SUN_KUDOS_TEXTS.feed empty state and aria with t() | src/components/sun-kudos/KudosFeed.tsx

### Shared interaction components
- [x] T025 [P] [US2] Migrate HeartButton — replace SUN_KUDOS_TEXTS.aria heart labels with t() | src/components/sun-kudos/HeartButton.tsx
- [x] T026 [P] [US2] Migrate CopyLinkButton — replace SUN_KUDOS_TEXTS.toast/aria keys with t() | src/components/sun-kudos/CopyLinkButton.tsx
- [x] T027 [P] [US2] Migrate SectionHeader — replace SUN_KUDOS_TEXTS.sections.sectionSubtitle with t("sections.sectionSubtitle") | src/components/sun-kudos/SectionHeader.tsx

### Sidebar components
- [x] T028 [P] [US2] Migrate StatsSidebar — replace SUN_KUDOS_TEXTS.aria.statsSidebar with t() | src/components/sun-kudos/StatsSidebar.tsx
- [x] T029 [P] [US2] Migrate StatsOverview — replace SUN_KUDOS_TEXTS.sidebar stat labels with t() | src/components/sun-kudos/StatsOverview.tsx
- [x] T030 [P] [US2] Migrate GiftRecipientsList — replace SUN_KUDOS_TEXTS.sidebar gift/viewMore keys with t() | src/components/sun-kudos/GiftRecipientsList.tsx

### Spotlight components
- [x] T031 [P] [US2] Migrate SpotlightBoard — replace SUN_KUDOS_TEXTS.sections/spotlight/aria keys with t() | src/components/sun-kudos/SpotlightBoard.tsx
- [x] T032 [P] [US2] Migrate SpotlightSearch — replace SUN_KUDOS_TEXTS.spotlight.searchPlaceholder with t() | src/components/sun-kudos/SpotlightSearch.tsx

### Error page
- [x] T033 [P] [US2] Migrate error page — replace SUN_KUDOS_TEXTS.errors keys with t() | src/app/sun-kudos/error.tsx

**Checkpoint**: All 17 components use t() — switching language in dropdown translates all visible text

---

## Phase 7: Cleanup & Tests

- [x] T034 [US2] Delete sun-kudos-data.ts — no longer needed after migration | src/utils/sun-kudos-data.ts
- [x] T035 [US2] Update existing tests — mock useTranslation or wrap renders with TranslationProvider. Fix any broken tests from SUN_KUDOS_TEXTS removal | src/components/sun-kudos/__tests__/*.test.tsx, src/components/__tests__/LanguageSelector.test.tsx

**Checkpoint**: All tests pass, no references to SUN_KUDOS_TEXTS remain

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 3 (i18n Foundation)**: No dependencies — start immediately
- **Phase 4 (Layout)**: Depends on Phase 3 (TranslationProvider must exist)
- **Phase 5 (LanguageSelector)**: Depends on Phase 4 (Provider must be in layout)
- **Phase 6 (Migration)**: Depends on Phase 4 (Provider must be in layout). All T017–T033 are [P] parallelizable (different files)
- **Phase 7 (Cleanup)**: Depends on Phase 6 (all migrations complete before deleting data file)

### Parallel Opportunities

**T010 + T011** can run in parallel (different files)
**T017–T033** (17 migration tasks) are ALL parallelizable — each touches a different file

---

## Implementation Strategy

### MVP First

1. T010–T013 (i18n foundation)
2. T014–T015 (layout integration)
3. T016 (LanguageSelector hookup)
4. **VALIDATE**: Switch language → confirm it works
5. T017–T033 (migrate all components — can batch)
6. T034–T035 (cleanup)

---

## Notes

- KVBanner is a Server Component — it will need to become a Client Component (add "use client") to use useTranslation(), OR receive translated strings as props from a parent Client Component
- Components already marked "use client" (HeartButton, CopyLinkButton, KudosFeed, etc.) can directly use useTranslation()
- SectionHeader is a Server Component — same consideration as KVBanner
