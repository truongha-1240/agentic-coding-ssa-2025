# Tasks: Dropdown Profile

**Frame**: `721-5223-Dropdown-profile`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3)

---

## Phase 1: Setup (Foundation + Assets)

**Purpose**: CSS tokens and icon components needed by all user stories

- [x] T001 Add dropdown CSS variables (`--color-dropdown-bg`, `--color-dropdown-border`, `--color-dropdown-item-hover`, `--shadow-text-glow`) in `src/app/globals.css`
- [x] T002 [P] Create `UserIcon` SVG icon component following `ChevronDownIcon` pattern in `src/components/icons/UserIcon.tsx`
- [x] T003 [P] Create `ChevronRightIcon` SVG icon component following `ChevronDownIcon` pattern in `src/components/icons/ChevronRightIcon.tsx`

**Checkpoint**: Foundation assets ready — user story implementation can begin

---

## Phase 2: User Story 1 + 2 — Profile Navigation & Logout (Priority: P1) 🎯 MVP

**Goal**: Dropdown opens on click, "Profile" navigates to `/profile`, "Logout" signs out via Supabase and redirects to `/login`

**Independent Test**: Click trigger → dropdown appears → click "Profile" → navigates to `/profile`. Click "Logout" → `auth.signOut()` called → redirects to `/login`.

### Tests (US1+US2) — TDD: Write FIRST, expect FAIL

- [x] T004 [US1] Write test: renders trigger button with `aria-haspopup="true"` in `src/components/__tests__/ProfileDropdown.test.tsx`
- [x] T005 [US1] Write test: clicking trigger opens dropdown showing "Profile" and "Logout" menu items in `src/components/__tests__/ProfileDropdown.test.tsx`
- [x] T006 [US1] Write test: clicking "Profile" navigates to `/profile` via `router.push()` and closes dropdown in `src/components/__tests__/ProfileDropdown.test.tsx`
- [x] T007 [US2] Write test: clicking "Logout" calls `supabase.auth.signOut()` and redirects to `/login` in `src/components/__tests__/ProfileDropdown.test.tsx`
- [x] T008 [US2] Write test: shows loading state during logout (`isLoggingOut` disables Logout button) in `src/components/__tests__/ProfileDropdown.test.tsx`
- [x] T009 [US2] Write test: logout failure displays inline error message in `src/components/__tests__/ProfileDropdown.test.tsx`
- [x] T010 [US1] Write test: double-clicking trigger toggles correctly (not stuck) in `src/components/__tests__/ProfileDropdown.test.tsx`

### Implementation (US1+US2)

- [x] T011 [US1] Create `ProfileDropdown` component with `"use client"`, trigger button (`UserIcon`, `aria-expanded`, `aria-haspopup`), and `isOpen` state toggle in `src/components/ProfileDropdown.tsx`
- [x] T012 [US1] Implement dropdown panel with absolute positioning, `role="menu"`, Profile item (`UserIcon` + "Profile" text + glow), Logout item (`ChevronRightIcon` + "Logout" text) in `src/components/ProfileDropdown.tsx`
- [x] T013 [US1] Implement Profile item click handler: `router.push("/profile")` + close dropdown in `src/components/ProfileDropdown.tsx`
- [x] T014 [US2] Implement Logout item click handler: `createClient().auth.signOut()` → `router.push("/login")` with `isLoggingOut` state and error handling in `src/components/ProfileDropdown.tsx`

**Checkpoint**: US1+US2 tests pass — core dropdown functionality complete

---

## Phase 3: User Story 3 — Dropdown Interaction & Accessibility (Priority: P2)

**Goal**: Dropdown closes on outside click / Escape, supports full keyboard navigation (Arrow keys, Tab, Enter/Space)

**Independent Test**: Open dropdown → click outside → closes. Press Escape → closes + focus returns to trigger. Arrow keys navigate items.

### Tests (US3) — TDD: Write FIRST, expect FAIL

- [x] T015 [US3] Write test: clicking outside dropdown closes it in `src/components/__tests__/ProfileDropdown.test.tsx`
- [x] T016 [US3] Write test: pressing Escape closes dropdown and returns focus to trigger in `src/components/__tests__/ProfileDropdown.test.tsx`
- [x] T017 [US3] Write test: pressing Enter/Space on focused trigger opens dropdown in `src/components/__tests__/ProfileDropdown.test.tsx`
- [x] T018 [US3] Write test: ArrowDown/ArrowUp moves focus between menu items in `src/components/__tests__/ProfileDropdown.test.tsx`

### Implementation (US3)

- [x] T019 [US3] Implement click-outside detection via `useEffect` + `mousedown` event listener in `src/components/ProfileDropdown.tsx`
- [x] T020 [US3] Implement keyboard navigation: Escape (close + focus trigger), ArrowDown/ArrowUp (move focus between items), Enter/Space (activate item) in `src/components/ProfileDropdown.tsx`
- [x] T021 [US3] Add ARIA attributes: `role="menu"` on panel, `role="menuitem"` on items, `aria-expanded` on trigger, `tabIndex` management in `src/components/ProfileDropdown.tsx`

**Checkpoint**: US3 tests pass — full accessibility complete

---

## Phase 4: Integration + Polish

**Purpose**: Wire into Header, add visual polish, verify responsive

### Header Integration

- [x] T022 Write test: Header renders ProfileDropdown in right-side slot when passed as children in `src/components/__tests__/Header.test.tsx`
- [x] T023 Modify `Header` component to accept optional `children` prop for right-side slot (keep as Server Component) in `src/components/Header.tsx`
- [x] T024 Verify Header tests pass with new structure in `src/components/__tests__/Header.test.tsx`

### Visual Polish

- [x] T025 [P] Add hover/focus visual effects: glow `text-shadow` on hover, `rgba(255,234,158,0.1)` background highlight, `transition` 150ms in `src/components/ProfileDropdown.tsx`
- [x] T026 [P] Add fade-in/out animation: CSS transition `opacity` + `translateY(-4px)` → `translateY(0)`, 150ms ease-out in `src/components/ProfileDropdown.tsx`
- [x] T027 Ensure dropdown doesn't overflow right edge on mobile (`right-0` positioning) in `src/components/ProfileDropdown.tsx`

**Checkpoint**: All tasks complete — feature ready

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
  - T002 and T003 can run in parallel (different files)
- **Phase 2 (US1+US2)**: Depends on Phase 1 (needs icons + CSS vars)
  - Tests T004-T010 written first (TDD RED phase)
  - Implementation T011-T014 makes tests pass (TDD GREEN phase)
- **Phase 3 (US3)**: Depends on Phase 2 (extends existing component)
  - Tests T015-T018 written first
  - Implementation T019-T021 makes tests pass
- **Phase 4 (Polish)**: Depends on Phase 3
  - T025 and T026 can run in parallel (different concerns, same file but different sections)

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- TDD cycle: RED (write test) → GREEN (implement) → REFACTOR
- All tests for a phase written together, then all implementation done together

### Parallel Opportunities

| Tasks | Can Parallel? | Reason |
|-------|--------------|--------|
| T002 + T003 | Yes | Different files (`UserIcon` vs `ChevronRightIcon`) |
| T025 + T026 | Yes | Different visual concerns (hover effects vs animation) |
| T004-T010 | Sequential | Same test file, building on each other |

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (Setup) — 3 tasks
2. Complete Phase 2 (US1+US2) — 11 tasks
3. **STOP and VALIDATE**: Trigger → open → Profile nav → Logout sign-out all working
4. Continue to Phase 3 (Accessibility) + Phase 4 (Integration)

### Incremental Delivery

1. Phase 1 → Icons + CSS tokens ready
2. Phase 2 → Core dropdown works (Profile + Logout) → Test
3. Phase 3 → Accessibility (keyboard, click-outside) → Test
4. Phase 4 → Header integration + polish → Test → Done

---

## Notes

- Constitution mandates TDD — tests MUST be written before implementation (RED → GREEN → REFACTOR)
- Supabase client: use `createClient()` from `src/libs/supabase/client.ts` — do NOT instantiate elsewhere
- Header remains Server Component — `ProfileDropdown` is Client Component passed as children
- Profile Trigger button uses `UserIcon` as placeholder — update when authenticated Header frame is designed
- All 27 tasks, commit after each logical group (per phase)
