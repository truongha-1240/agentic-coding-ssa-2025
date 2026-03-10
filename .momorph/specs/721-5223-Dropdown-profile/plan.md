# Implementation Plan: Dropdown Profile

**Frame**: `721-5223-Dropdown-profile`
**Date**: 2026-03-09
**Spec**: `specs/721-5223-Dropdown-profile/spec.md`

---

## Summary

Implement a profile dropdown menu component that appears in the Header when the user clicks a trigger button. The dropdown contains two items: "Profile" (navigates to `/profile`) and "Logout" (signs out via Supabase Auth and redirects to `/login`). The component follows the SAA 2025 dark theme with gold accents and glow effects, reusing established patterns from the existing `LanguageSelector` component.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS v4, @supabase/ssr
**Database**: N/A (no schema changes)
**Testing**: Vitest + React Testing Library
**State Management**: Local component state (useState)
**API Style**: Supabase SDK (`auth.signOut()`)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions — PascalCase components, kebab-case routes, `@/*` imports
- [x] Uses approved libraries and patterns — No new dependencies, reuses Supabase client from `src/libs/supabase/client.ts`
- [x] Adheres to folder structure guidelines — Icons in `src/components/icons/`, shared components in `src/components/`
- [x] Meets security requirements — Uses `supabase.auth.signOut()`, no custom token logic
- [x] Follows testing standards — TDD: tests before implementation

**Violations**: None

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based, co-located with shared components
  - `ProfileDropdown` — main dropdown container with trigger, menu panel, and items
  - Reusable `ProfileDropdownItem` — not needed (only 2 items with different behavior, inline is simpler)
  - New icon components: `UserIcon`, `ChevronRightIcon` in `src/components/icons/`
- **Styling Strategy**: Tailwind utilities directly in JSX (per constitution — no `@apply`)
- **State Management**: Local `useState` for `isOpen` and `isLoggingOut`
- **Click-outside detection**: Custom `useEffect` with `mousedown` event listener (same pattern as standard dropdowns, no external lib needed)

### Why NOT extract a reusable dropdown primitive?

The `LanguageSelector` is currently a simple toggle button (no menu panel yet). The `ProfileDropdown` needs:
- `role="menu"` / `role="menuitem"` ARIA pattern
- Arrow key navigation
- signOut async action with loading state
- Click-outside dismissal

These are specific to this dropdown. Extracting a shared primitive is premature — only 2 dropdowns exist, and they have different interaction patterns. If a third dropdown appears, refactor then.

### Integration Points

- **Header component** (`src/components/Header.tsx`): Will be modified to conditionally show `ProfileDropdown` (when authenticated) instead of or alongside `LanguageSelector`
- **Supabase client** (`src/libs/supabase/client.ts`): Used for `auth.signOut()`
- **Next.js Router**: `useRouter().push()` for navigation to `/profile` and `/login`
- **Existing icon pattern**: `src/components/icons/` — follow `ChevronDownIcon` pattern (interface + SVG component with `className` prop)

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/721-5223-Dropdown-profile/
├── spec.md              # Feature specification
├── design-style.md      # Design specifications
├── plan.md              # This file
└── tasks.md             # Task breakdown (next step)
```

### New Files

| File | Purpose |
|------|---------|
| `src/components/ProfileDropdown.tsx` | Main dropdown component (trigger + menu panel) |
| `src/components/icons/UserIcon.tsx` | User/profile SVG icon component |
| `src/components/icons/ChevronRightIcon.tsx` | Chevron right SVG icon component |
| `src/components/__tests__/ProfileDropdown.test.tsx` | Unit/integration tests |

### Modified Files

| File | Changes |
|------|---------|
| `src/components/Header.tsx` | Add right-side flex container with slot for `ProfileDropdown` (passed as children from parent layout); keep as Server Component |
| `src/components/__tests__/Header.test.tsx` | Update tests to verify ProfileDropdown integration |
| `src/app/globals.css` | Add dropdown-specific CSS variables if needed (gold border, glow shadow) |

### Dependencies

No new dependencies required. All needed packages are already installed:
- `@supabase/ssr` — for auth
- `next/navigation` — for `useRouter`
- `vitest` + `@testing-library/react` — for testing

---

## Implementation Strategy

### Phase 1: Foundation (Setup + Assets)
- Add dropdown CSS variables to `globals.css`: `--color-dropdown-bg: #00070C`, `--color-dropdown-border: #998C5F`, `--color-dropdown-item-hover: rgba(255, 234, 158, 0.1)`, `--shadow-text-glow: 0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #FAE287`
- Create `UserIcon` SVG icon component in `src/components/icons/UserIcon.tsx` following `ChevronDownIcon` pattern (interface with `className` prop)
- Create `ChevronRightIcon` SVG icon component in `src/components/icons/ChevronRightIcon.tsx`

### Phase 2: Core Features — US1 + US2 (P1)
- **TDD**: Write tests for `ProfileDropdown` first
  - Test: renders trigger button with `aria-haspopup="true"`
  - Test: opens dropdown on click, shows "Profile" and "Logout" menu items
  - Test: clicking "Profile" navigates to `/profile` via `router.push()` and closes dropdown
  - Test: clicking "Logout" calls `supabase.auth.signOut()` and redirects to `/login` via `router.push()`
  - Test: shows loading state during logout (`isLoggingOut` disables Logout button)
  - Test: logout failure displays inline error message below dropdown items
  - Test: double-clicking trigger toggles correctly (not stuck)
- **Implement**: `ProfileDropdown` component (`"use client"`)
  - Trigger button (simple `UserIcon` button, `aria-expanded`, `aria-haspopup`)
  - Dropdown panel with **absolute positioning** relative to a `relative` wrapper div
  - Profile item: flex row, UserIcon (24x24), "Profile" text with hover glow effect
  - Logout item: flex row, ChevronRightIcon (24x24), "Logout" text
  - `isLoggingOut` state: disables Logout button, shows visual loading indicator
  - Error state: inline error text below menu items (reuse `--color-error` from globals.css)
  - signOut flow: `createClient().auth.signOut()` → `router.push("/login")` on success

### Phase 3: Extended Features — US3 (P2)
- **TDD**: Write accessibility/interaction tests
  - Test: closes on click outside
  - Test: closes on Escape key, returns focus to trigger
  - Test: Enter/Space opens dropdown
  - Test: ArrowDown/ArrowUp moves focus between items
- **Implement**: Accessibility features
  - Click-outside detection via `mousedown` event listener
  - Keyboard navigation (Escape, Arrow keys, Enter/Space)
  - ARIA attributes (`role="menu"`, `role="menuitem"`, `aria-expanded`, `aria-haspopup`)

### Phase 4: Integration + Polish
- **Header integration strategy**: `Header.tsx` is currently a Server Component. Two options:
  - **Option A (recommended)**: Keep Header as Server Component, add a `rightSection` area where `ProfileDropdown` (Client Component) is passed as children from the layout/page that knows auth state.
  - **Option B**: Convert Header to Client Component with `"use client"` — simpler but loses Server Component benefits.
  - Decision: **Option A** — Header accepts optional `children` or renders a right-side slot. The parent layout passes `<ProfileDropdown />` when user is authenticated.
- Modify `Header.tsx`: Add a right-side flex container that renders `LanguageSelector` + optional `ProfileDropdown`
- Update Header tests for new structure
- Hover/focus visual effects: glow text-shadow on hover, `rgba(255,234,158,0.1)` background highlight
- Fade-in/out animation: CSS transition `opacity` + `transform: translateY(-4px)` → `translateY(0)`, 150ms ease-out
- Mobile viewport: ensure dropdown doesn't overflow right edge (add `right-0` positioning)
- Verify responsive behavior across breakpoints

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Profile Trigger design not specified | High | Low | Use simple icon button; update when trigger frame specs are available |
| Click-outside detection edge cases with portals | Low | Medium | Use `mousedown` instead of `click` to avoid race conditions; test thoroughly |
| Header layout shift when adding dropdown | Low | Low | Use absolute positioning for dropdown panel; trigger has fixed dimensions |

### Estimated Complexity

- **Frontend**: Low-Medium (dropdown pattern is well-known, existing patterns to follow)
- **Backend**: None (only Supabase SDK calls)
- **Testing**: Medium (keyboard accessibility tests require careful setup)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: ProfileDropdown trigger ↔ menu panel ↔ items
- [x] **External dependencies**: Supabase Auth `signOut()` (mocked)
- [x] **User workflows**: Open dropdown → click Profile → navigate; Open dropdown → click Logout → sign out → redirect

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Toggle dropdown, navigate on click, signOut on click |
| App ↔ External API | Yes | Supabase `auth.signOut()` success/failure |
| Cross-platform | No | Dropdown is consistent across breakpoints |

### Test Environment

- **Environment type**: Local (Vitest + jsdom)
- **Test data strategy**: Mocked Supabase client, mocked router
- **Isolation approach**: Fresh state per test (`vi.clearAllMocks()`)

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase client (`@/libs/supabase/client`) | Mock | No real auth needed in unit tests |
| Next.js router (`next/navigation`) | Mock | No real navigation in test env |
| DOM events (mousedown for click-outside) | Real | Test actual DOM behavior |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Clicking trigger opens dropdown with Profile and Logout items
   - [x] Clicking Profile navigates to `/profile` and closes dropdown
   - [x] Clicking Logout signs out and redirects to `/login`

2. **Error Handling**
   - [x] Logout failure shows error and keeps user logged in
   - [x] Logout button disabled during loading (prevents double-click)

3. **Accessibility / Edge Cases**
   - [x] Escape closes dropdown, returns focus to trigger
   - [x] Click outside closes dropdown
   - [x] Arrow keys navigate between menu items
   - [x] ARIA attributes are correctly set

### Tooling & Framework

- **Test framework**: Vitest + React Testing Library
- **Supporting tools**: `@testing-library/user-event` for interaction simulation
- **CI integration**: `yarn test` in CI pipeline

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Core user flows (open/close, navigate, logout) | 90%+ | High |
| Keyboard accessibility | 85%+ | High |
| Error scenarios | 80%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved
- [x] Design-style.md complete with visual specs
- [ ] N/A — API contracts (uses Supabase SDK directly)
- [ ] N/A — Database migrations

### External Dependencies

- Supabase Auth SDK (already installed)
- Next.js navigation (built-in)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following TDD task order

---

## Notes

- The `ProfileDropdown` trigger button design is NOT specified in the Figma frame (`721:5223`). The plan uses a simple icon button as placeholder. When the authenticated Header frame is designed, the trigger should be updated.
- The existing `LanguageSelector` follows a similar toggle pattern but without a menu panel — it can serve as a reference but should not be abstracted into a shared component yet.
- CSS variables for dropdown colors (`--color-dropdown-bg: #00070C`, `--color-dropdown-border: #998C5F`) will be added to `globals.css` to maintain consistency with the existing token system.
- The `ChevronRightIcon` is different from `ChevronDownIcon` — it needs a separate component with a rightward-pointing path.
