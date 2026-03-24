# Implementation Plan: Dropdown Ngôn Ngữ + i18n System

**Frame**: `721:4942` — Dropdown-ngôn ngữ
**Spec**: `spec.md` (3rd pass — i18n added)
**Design Style**: `design-style.md`
**Created**: 2026-03-23
**Updated**: 2026-03-23 (i18n plan added)
**Route**: Global (Header + all pages)

---

## Summary

Phase 1 (dropdown UI) is already complete. This plan covers **Phase 2: i18n system** — create translation infrastructure (`TranslationProvider`, `useTranslation` hook, VN/EN translation files) and migrate all hardcoded strings to use `t()`.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 15 (App Router)
**State Management**: React Context (`TranslationProvider`) + localStorage
**Pattern**: Custom hook `useTranslation()` returning `{ t, language, setLanguage }`
**No external i18n library** — lightweight custom solution (~100 lines)

---

## Constitution Compliance Check

- [x] TypeScript strict mode
- [x] `@/*` import alias
- [x] `"use client"` — TranslationProvider uses context + localStorage
- [x] **i18n rule (NEW)**: All user-facing text via `t()` hook
- [x] No new dependencies

---

## Architecture Decisions

### i18n System Design

```
src/i18n/
├── vi.ts              — Vietnamese translations (default, ~80 keys)
├── en.ts              — English translations (same structure)
├── types.ts           — TranslationKeys type (auto-derived from vi.ts)
└── index.ts           — TranslationProvider + useTranslation hook
```

**How it works**:
1. `TranslationProvider` wraps `{children}` in `layout.tsx` (Client Component boundary)
2. Reads `localStorage.getItem("lang")` on mount → sets initial language
3. Provides `{ t, language, setLanguage }` via React Context
4. `t("kudos.sidebar.kudosReceived")` → returns VN or EN string
5. `setLanguage("EN")` → updates context + writes to localStorage → all `t()` calls re-render

**LanguageSelector integration**:
- Current: `LanguageSelector` manages its own `selectedLanguage` + `localStorage`
- New: `LanguageSelector` calls `setLanguage()` from `useTranslation()` instead
- Remove duplicate localStorage logic from `LanguageSelector`

**Key design choice**: Flat dot-path keys (e.g., `"kudos.sidebar.kudosReceived"`) with nested object structure. Type-safe — TypeScript infers all valid keys from `vi.ts`.

### Migration Strategy

`SUN_KUDOS_TEXTS` in `src/utils/sun-kudos-data.ts` currently holds all Vietnamese strings. Migration:
1. Copy all keys from `SUN_KUDOS_TEXTS` → `src/i18n/vi.ts`
2. Create English translations in `src/i18n/en.ts`
3. Replace `SUN_KUDOS_TEXTS.x.y` → `t("x.y")` in all 17 component files
4. Delete `src/utils/sun-kudos-data.ts` after migration

---

## Project Structure

### New Files

| File | Purpose |
|------|---------|
| `src/i18n/types.ts` | `TranslationKeys` type derived from vi.ts structure |
| `src/i18n/vi.ts` | Vietnamese translations (~80 keys) |
| `src/i18n/en.ts` | English translations (same structure) |
| `src/i18n/index.ts` | `TranslationProvider`, `useTranslation()` hook |

### Modified Files

| File | Changes |
|------|---------|
| `src/app/layout.tsx` | Wrap `{children}` with `<TranslationProvider>` (needs Client Component wrapper) |
| `src/components/LanguageSelector.tsx` | Replace local `selectedLanguage` state → use `useTranslation().setLanguage()` |
| `src/components/sun-kudos/KVBanner.tsx` | `SUN_KUDOS_TEXTS.kvBanner.x` → `t("kvBanner.x")` |
| `src/components/sun-kudos/SectionHeader.tsx` | `SUN_KUDOS_TEXTS.sections.x` → `t("sections.x")` |
| `src/components/sun-kudos/HeartButton.tsx` | `SUN_KUDOS_TEXTS.aria.x` → `t("aria.x")` |
| `src/components/sun-kudos/CopyLinkButton.tsx` | `SUN_KUDOS_TEXTS.toast.x` → `t("toast.x")` |
| `src/components/sun-kudos/KudosInputBar.tsx` | `SUN_KUDOS_TEXTS.kvBanner.x` → `t("kvBanner.x")` |
| `src/components/sun-kudos/SunnerSearchBar.tsx` | `SUN_KUDOS_TEXTS.kvBanner.x` → `t("kvBanner.x")` |
| `src/components/sun-kudos/HighlightKudos.tsx` | `SUN_KUDOS_TEXTS.sections/highlight/aria.x` → `t()` |
| `src/components/sun-kudos/HighlightKudoCard.tsx` | `SUN_KUDOS_TEXTS.highlight.x` → `t("highlight.x")` |
| `src/components/sun-kudos/AllKudosSection.tsx` | `SUN_KUDOS_TEXTS.sections.x` → `t("sections.x")` |
| `src/components/sun-kudos/KudosFeed.tsx` | `SUN_KUDOS_TEXTS.feed.x` → `t("feed.x")` |
| `src/components/sun-kudos/StatsSidebar.tsx` | `SUN_KUDOS_TEXTS.aria.x` → `t("aria.x")` |
| `src/components/sun-kudos/StatsOverview.tsx` | `SUN_KUDOS_TEXTS.sidebar.x` → `t("sidebar.x")` |
| `src/components/sun-kudos/GiftRecipientsList.tsx` | `SUN_KUDOS_TEXTS.sidebar.x` → `t("sidebar.x")` |
| `src/components/sun-kudos/SpotlightBoard.tsx` | `SUN_KUDOS_TEXTS.sections/spotlight.x` → `t()` |
| `src/components/sun-kudos/SpotlightSearch.tsx` | `SUN_KUDOS_TEXTS.spotlight.x` → `t("spotlight.x")` |
| `src/components/sun-kudos/CarouselControls.tsx` | `SUN_KUDOS_TEXTS.aria.x` → `t("aria.x")` |
| `src/app/sun-kudos/error.tsx` | `SUN_KUDOS_TEXTS.errors.x` → `t("errors.x")` |

### Deleted Files

| File | Reason |
|------|--------|
| `src/utils/sun-kudos-data.ts` | Replaced by `src/i18n/vi.ts` + `src/i18n/en.ts` |

### Dependencies

No new dependencies.

---

## Implementation Approach

### Phase 1: i18n Foundation (4 files)

1. **Create `src/i18n/vi.ts`** — Copy all keys from `SUN_KUDOS_TEXTS` + add header/footer keys
2. **Create `src/i18n/en.ts`** — Translate all keys to English
3. **Create `src/i18n/types.ts`** — Type helper for dot-path keys
4. **Create `src/i18n/index.ts`** — `TranslationProvider` (React Context) + `useTranslation()` hook

### Phase 2: Layout Integration

5. **Create Client Component wrapper** in `src/app/Providers.tsx` — wraps `TranslationProvider` around children (layout.tsx is Server Component, can't use context directly)
6. **Update `src/app/layout.tsx`** — wrap `{children}` with `<Providers>`

### Phase 3: LanguageSelector Integration

7. **Update `LanguageSelector.tsx`** — use `useTranslation().setLanguage()` instead of local state + localStorage

### Phase 4: Migrate Components (17 files)

8. **Migrate all components** — replace `SUN_KUDOS_TEXTS.x.y` → `t("x.y")` in all 17 files. Components that are Server Components will need `"use client"` if they now use the hook, or receive `t()` values as props.

### Phase 5: Cleanup

9. **Delete `src/utils/sun-kudos-data.ts`** — no longer needed
10. **Update tests** — mock `useTranslation` or `TranslationProvider` in test setup

---

## Testing Strategy

| Type | Focus | Coverage |
|------|-------|----------|
| Unit | `useTranslation` hook — returns correct VN/EN strings | 80% |
| Unit | `t()` returns fallback for missing keys | Edge case |
| Integration | Switch language → all visible text updates | Key flow |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Server Components can't use hooks | Medium | Medium | Use `"use client"` or pass translated strings as props from parent Client Component |
| Large number of files to migrate (17+) | Low | Low | Mechanical replacement — `SUN_KUDOS_TEXTS.x.y` → `t("x.y")` — low error risk |
| Missing English translations | Medium | Low | Use Vietnamese as fallback for any missing key |

### Estimated Complexity

- **i18n system**: Low (custom Context + hook, ~100 lines)
- **Migration**: Medium (17 files, mechanical but tedious)
- **Testing**: Low

---

## Open Questions

None — architecture decisions are straightforward for a 2-language client-side system.
