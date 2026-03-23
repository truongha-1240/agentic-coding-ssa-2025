# Implementation Plan: Countdown - Prelaunch Page

**Frame**: `2268-35127-Countdown-Prelaunch-page`
**Spec**: `spec.md`
**Created**: 2026-03-23

---

## Constitution Compliance

| Requirement | Constitution Rule | Status |
|-------------|-------------------|--------|
| TypeScript strict | No `any` types | ✅ Compliant |
| Server Components default | Add `"use client"` only when hooks needed | ✅ CountdownPage is client (uses useCountdown) |
| `@/*` import alias | Mapped to `./src/*` | ✅ Compliant |
| Supabase integration | Use `@/libs/supabase/client` | ✅ Compliant |
| i18n | All user-facing text via `useTranslation` | ✅ Compliant |
| Database | Always include DB for new features | ✅ `event_settings` table via migration |
| Tailwind CSS | No inline styles except dynamic values | ✅ Compliant |

---

## Architecture Decisions

### Frontend
- **Component pattern**: Single page component `CountdownPage` with extracted `DigitCard` + `DigitGroup` sub-components
- **State management**: `useCountdown` custom hook — 1s interval, recalculates from `Date.now()` each tick
- **Data fetching**: Supabase query for `event_start_at` on mount, fallback to `NEXT_PUBLIC_EVENT_DATE` env var
- **Font**: "Digital Numbers" — Google Font or local file in `public/fonts/`

### Database
- **New table**: `event_settings` (key-value) — migration file already created at `.momorph/contexts/migration-event-settings.sql`
- **Seed**: `event_start_at` = `2026-12-12T19:00:00+07:00`

---

## Project Structure

### New Files

| File | Purpose |
|------|---------|
| `src/app/countdown/page.tsx` | Countdown route page |
| `src/components/countdown/CountdownTimer.tsx` | Timer display (3 digit groups) |
| `src/components/countdown/DigitCard.tsx` | Single LED digit card (glassmorphism) |
| `src/components/countdown/DigitGroup.tsx` | Pair of DigitCards + label (DAYS/HOURS/MINUTES) |
| `src/hooks/useCountdown.ts` | Countdown logic hook |
| `src/hooks/useEventDate.ts` | Fetch event_start_at from Supabase |

### Modified Files

| File | Changes |
|------|---------|
| `src/i18n/vi.ts` | Add `countdown.title`, `countdown.days`, `countdown.hours`, `countdown.minutes` keys |
| `src/i18n/en.ts` | Add same keys with English values |
| `src/i18n/types.ts` | Add countdown keys to TranslationKeys type |

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| None | — | No new dependencies needed. "Digital Numbers" font loaded via `@font-face` or `next/font/local` |

---

## Implementation Approach

### Phase 1: Foundation
1. Add i18n keys for countdown (vi.ts, en.ts, types.ts)
2. Create `useEventDate` hook — query `event_settings` table, returns `{ eventDate, isLoading, error }`, fallback to `NEXT_PUBLIC_EVENT_DATE` env on error
3. Create `useCountdown(targetDate)` hook — 1s interval, returns `{ days, hours, minutes, isExpired }`. No-op when `targetDate` is null (loading state)

### Phase 2: Core UI (US1)
4. Create `DigitCard` — glassmorphism card with LED digit font
5. Create `DigitGroup` — pair of DigitCards + label
6. Create `CountdownTimer` — 3 DigitGroups in a row
7. Create `src/app/countdown/page.tsx` — full-screen layout with KV background + gradient + centered timer
8. Wire up hooks: fetch event date → countdown → display

### Phase 3: i18n + Edge Cases (US2)
9. Wire `useTranslation` for title text
10. Handle expired state: redirect to `/` after 3s
11. Handle already-started: immediate redirect
12. Handle >99 days: cap display at 99

### Phase 4: Polish
13. Add accessibility: `role="timer"`, `aria-live="polite"`, `aria-label`
14. Add responsive styles (tablet/mobile breakpoints)
15. Add `prefers-reduced-motion` support

---

## Testing Strategy

| Type | Focus | Coverage |
|------|-------|----------|
| Unit | `useCountdown` hook — tick, expired, boundary | 90% |
| Unit | `DigitCard`, `DigitGroup` — rendering | 80% |
| Unit | `CountdownTimer` — displays correct values | 80% |
| Integration | Page renders with mock date, redirects on expired | Key flows |

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| "Digital Numbers" font not available | Medium | Bundle locally in `public/fonts/`, use `next/font/local` |
| Supabase query fails | Low | Fallback to `NEXT_PUBLIC_EVENT_DATE` env var |
| Timer drift on inactive tab | Low | Recalculate from `Date.now()` each tick (not incremental) |
| Glassmorphism not supported (old browsers) | Low | Graceful degradation — card still visible without blur |

---

## Open Questions
- [x] Event start date → `2026-12-12 19:00:00+07` (confirmed)
- [x] Labels stay English for both languages (confirmed from Figma)
