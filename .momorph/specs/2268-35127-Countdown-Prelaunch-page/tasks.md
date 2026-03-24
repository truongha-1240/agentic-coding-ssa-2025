# Tasks: Countdown - Prelaunch Page

**Feature**: Countdown - Prelaunch Page
**Spec**: `spec.md` | **Plan**: `plan.md` | **Design**: `design-style.md`
**Generated**: 2026-03-23

---

## Phase 1: Setup

- [x] T001 [P] Add i18n keys for countdown in `src/i18n/vi.ts` — add `countdown.title` ("Sự kiện sẽ bắt đầu sau"), `countdown.days` ("DAYS"), `countdown.hours` ("HOURS"), `countdown.minutes` ("MINUTES")
- [x] T002 [P] Add i18n keys for countdown in `src/i18n/en.ts` — add `countdown.title` ("Event starts in"), `countdown.days` ("DAYS"), `countdown.hours` ("HOURS"), `countdown.minutes` ("MINUTES")
- [x] T003 Add countdown keys to `src/i18n/types.ts` — extend TranslationKeys type with `countdown.title`, `countdown.days`, `countdown.hours`, `countdown.minutes`
- [x] T004 Add "Digital Numbers" font file to `public/fonts/DigitalNumbers-Regular.ttf` and configure in `src/app/layout.tsx` or via `@font-face` in global CSS

## Phase 2: Foundational (hooks)

- [x] T005 [P] Create `src/hooks/useEventDate.ts` — query Supabase `event_settings` table for key='event_start_at', parse as Date, fallback to `process.env.NEXT_PUBLIC_EVENT_DATE`, return `{ eventDate: Date | null, isLoading: boolean, error: string | null }`
- [x] T006 [P] Create `src/hooks/useCountdown.ts` — accept `targetDate: Date | null`, use 1s `setInterval` recalculating from `Date.now()`, return `{ days: number, hours: number, minutes: number, isExpired: boolean }`, no-op when targetDate is null

## Phase 3: US1 — View Countdown Timer [P1]

**Goal**: Full-screen countdown page showing DAYS/HOURS/MINUTES with KV background
**Test criteria**: Page renders at `/countdown`, shows correct time diff, updates every second

- [x] T007 [P] [US1] Create `src/components/countdown/DigitCard.tsx` — single glassmorphism card (77×123px, border-radius 12px, 0.75px solid #FFEA9E, opacity 0.5, backdrop-blur 25px, gradient bg), displays one digit in "Digital Numbers" font 74px white centered
- [x] T008 [P] [US1] Create `src/components/countdown/DigitGroup.tsx` — accepts `value: number` and `label: string`, renders 2 DigitCards (tens + units, gap 21px) + label text (Montserrat 36px Bold white), flex column center, gap 21px
- [x] T009 [US1] Create `src/components/countdown/CountdownTimer.tsx` — accepts `days`, `hours`, `minutes` props, renders 3 DigitGroups in flex row with gap 60px, labels from i18n keys
- [x] T010 [US1] Create `src/app/countdown/page.tsx` — "use client", full viewport (h-screen), KV background image + gradient overlay (same as sun-kudos page), centered content with title (Montserrat 36px Bold white) + CountdownTimer, wire useEventDate + useCountdown hooks
- [x] T011 [US1] Add redirect logic in `src/app/countdown/page.tsx` — when `isExpired` is true, show "00 00 00" for 3 seconds then `router.push("/")`. When event already started on mount, redirect immediately

## Phase 4: US2 — i18n Support [P2]

**Goal**: Title translates based on language selection
**Test criteria**: Switch language → title changes, labels stay English

- [x] T012 [US2] Wire `useTranslation` in `src/app/countdown/page.tsx` — title uses `t("countdown.title")`, labels use `t("countdown.days")` etc.

## Phase 5: Polish & Accessibility

- [x] T013 Add `role="timer"` and `aria-live="polite"` to CountdownTimer container in `src/components/countdown/CountdownTimer.tsx`
- [x] T014 Add `aria-label` to each DigitGroup in `src/components/countdown/DigitGroup.tsx` — dynamic label like "X days remaining"
- [x] T015 Add responsive styles in `src/components/countdown/DigitCard.tsx` and `src/components/countdown/DigitGroup.tsx` — tablet (60×96px, font 56px, gap 40px), mobile (50×80px, font 44px, gap 24px, label 20px)

---

## Dependencies

```
T001, T002 → T003 (types must include new keys)
T003 → T012 (i18n keys must exist before wiring)
T004 → T007 (font must exist before DigitCard uses it)
T005, T006 → T010 (hooks must exist before page wires them)
T007, T008 → T009 (sub-components before container)
T009 → T010 (timer before page)
T010 → T011 (page before redirect logic)
T010 → T012 (page before i18n wiring)
```

## Parallel Execution

**Round 1** (independent): T001, T002, T004, T005, T006, T007, T008
**Round 2** (after Round 1): T003, T009
**Round 3** (after Round 2): T010
**Round 4** (after Round 3): T011, T012, T013, T014, T015

## Implementation Strategy

- **MVP**: T001-T011 → functional countdown page with redirect
- **Full**: + T012-T015 → i18n + accessibility + responsive
- Estimated: 15 tasks total, ~7 parallelizable in Round 1
