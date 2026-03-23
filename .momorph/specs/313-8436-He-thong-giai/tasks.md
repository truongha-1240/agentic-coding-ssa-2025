# Tasks: Hệ thống giải (Awards Information)

**Frame**: `313-8436-He-thong-giai`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [x]T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1–US7)
- **|**: File path affected by this task

---

## Phase 1: Setup (Assets & Project Structure)

**Purpose**: Download assets from Figma, create icon components, establish directory structure

- [x]T001 Create directory structure for awards-information feature: `src/app/awards-information/`, `src/components/awards-information/`, `public/images/awards-information/`
- [x]T002 Download keyvisual banner image (1440x547px) from Figma using `get_media_files` | `public/images/awards-information/keyvisual.png`
- [x]T003 [P] Download Root Further logo (338x150px) from Figma | `public/images/awards-information/root-further-logo.png`
- [x]T004 [P] Download 6 award thumbnail images (336x336px, golden ring/glow baked in) from Figma | `public/images/awards-information/{slug}.png`
- [x]T005 [P] Download Kudos section background image from Figma | `public/images/awards-information/kudos-bg.png`
- [x]T006 [P] Download icon SVGs (Target, Diamond, License — 24x24) from Figma and create TargetIcon component following existing ArrowUpRightIcon pattern | `src/components/icons/TargetIcon.tsx`
- [x]T007 [P] Create DiamondIcon component following existing ArrowUpRightIcon pattern | `src/components/icons/DiamondIcon.tsx`
- [x]T008 [P] Create LicenseIcon component following existing ArrowUpRightIcon pattern | `src/components/icons/LicenseIcon.tsx`
- [x]T009 Verify all downloaded images render correctly at expected dimensions

**Checkpoint**: All assets in place, 3 icon components created — ready for foundation phase

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Core types, static data, and scroll-spy hook required by ALL user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Types

- [x]T010 Write test for AwardDetailCategory and AwardPrize type definitions — verify type exports and structure | `src/utils/__tests__/awards-data.test.ts`
- [x]T011 Create AwardPrize and AwardDetailCategory type interfaces | `src/types/awards.ts`

### Static Data

- [x]T012 Write test for AWARD_DETAIL_CATEGORIES — verify 6 categories, all required fields present, correct slugs, Signature 2025 has 2 prizes | `src/utils/__tests__/awards-data.test.ts`
- [x]T013 Create AWARD_DETAIL_CATEGORIES typed constant array with FULL descriptions from Figma (6 entries) | `src/utils/awards-data.ts`

### Scroll-Spy Hook

- [x]T014 Write tests for useScrollSpy hook — IntersectionObserver mock, active section detection, initial hash handling, invalid hash fallback, cleanup on unmount | `src/hooks/__tests__/useScrollSpy.test.ts`
- [x]T015 Implement useScrollSpy hook with IntersectionObserver (threshold: [0, 0.25, 0.5], rootMargin: "-96px 0px 0px 0px"), returns activeId, handles URL hash on mount | `src/hooks/useScrollSpy.ts`

**Checkpoint**: Foundation ready — types, data, hook all tested and passing. User story implementation can begin.

---

## Phase 3: User Story 2 — Section Title & Award Cards (Priority: P1) 🎯 MVP

**Goal**: Display the "Hệ thống giải thưởng SAA 2025" section title and all 6 award detail cards with alternating layout, thumbnails, descriptions, quantities, and prizes.

**Independent Test**: Render page → section title visible → 6 award cards displayed with correct data, alternating image-left/image-right layout.

### Tests (US2)

- [x]T016 [P] [US2] Write tests for SectionTitle — renders caption "Sun* Annual Awards 2025", heading "Hệ thống giải thưởng SAA 2025" in gold, separator line | `src/components/__tests__/awards-information/SectionTitle.test.tsx`
- [x]T017 [P] [US2] Write tests for AwardCard — renders thumbnail, title, description, quantity, unit, prize value, note; alternating variant (image-left/image-right); Signature 2025 dual-prize with "Hoặc" divider; section id attribute; separator omitted on last card | `src/components/__tests__/awards-information/AwardCard.test.tsx`
- [x]T018 [P] [US2] Write tests for AwardsList — renders 6 AwardCard components, alternating variant based on index | `src/components/__tests__/awards-information/AwardsList.test.tsx`

### Implementation (US2)

- [x]T019 [P] [US2] Implement SectionTitle component — "Sun* Annual Awards 2025" subtitle (24px white), 1px #2E3940 separator, "Hệ thống giải thưởng SAA 2025" heading (57px/700 gold) | `src/components/awards-information/SectionTitle.tsx`
- [x]T020 [US2] Implement AwardCard component — section id={slug}, alternating flex-row/flex-row-reverse, thumbnail with mix-blend-screen and golden glow shadow, content area with backdrop-blur-[32px], quantity section with DiamondIcon, prize section with LicenseIcon, Signature 2025 dual-prize "Hoặc" layout, bottom separator (omit on last), hover shadow animation (200ms) | `src/components/awards-information/AwardCard.tsx`
- [x]T021 [US2] Implement AwardsList component — maps AWARD_DETAIL_CATEGORIES, renders AwardCard with variant based on index parity, flex-col gap-20 | `src/components/awards-information/AwardsList.tsx`

**Checkpoint**: Section title and 6 award cards render correctly with all data — US2 independently testable

---

## Phase 4: User Story 3 — Sidebar Navigation (Priority: P1)

**Goal**: Sticky sidebar with 6 award category links, scroll-spy active state, smooth scroll on click, hash anchor support.

**Independent Test**: Click "Top Project" in sidebar → page scrolls to Top Project card → sidebar item shows gold underline active state.

### Tests (US3)

- [x]T022 [P] [US3] Write tests for AwardsSidebar — renders 6 nav links with TargetIcon, active state gold underline + aria-current, click calls scrollIntoView, initial hash sets active | `src/components/__tests__/awards-information/AwardsSidebar.test.tsx`
- [x]T023 [P] [US3] Write tests for AwardsLayout — renders sidebar and awards list in two-column layout | `src/components/__tests__/awards-information/AwardsLayout.test.tsx` (optional, can be included in page test)

### Implementation (US3)

- [x]T024 [US3] Implement AwardsSidebar client component ("use client") — uses useScrollSpy, renders <nav aria-label="Award categories">, 6 anchor links with TargetIcon, active state (gold underline, text-shadow, aria-current="true"), onClick scrollIntoView smooth, sticky top-24, transition-all duration-150 ease-in-out, touch targets p-4 (48px+) | `src/components/awards-information/AwardsSidebar.tsx`
- [x]T025 [US3] Implement AwardsLayout component — desktop: flex-row gap-20 max-w-[1152px], mobile: flex-col, renders AwardsSidebar + AwardsList | `src/components/awards-information/AwardsLayout.tsx`

**Checkpoint**: Sidebar navigation works — click scrolls, scroll-spy updates active state, hash anchors supported

---

## Phase 5: User Story 4 & 1 & 6 — Page Assembly (Priority: P1/P2/P3)

**Goal**: Assemble the full page with Header (active state), keyvisual banner, gradient overlay, content container, and Footer.

**Independent Test**: Load /awards-information → header shows "Awards Information" active → keyvisual banner visible → all content sections rendered → footer visible.

### Tests (US1, US4, US6)

- [x]T026 [US4] Write page integration test — renders Header with "Awards Information" active, Footer with nav links, keyvisual banner, gradient overlay, Root Further logo, SectionTitle, AwardsLayout, AwardsKudosPromotion | `src/app/awards-information/__tests__/page.test.tsx`

### Implementation (US1, US4, US6)

- [x]T027 [US1] [US4] [US6] Implement page.tsx (Server Component) — imports shared Header/Footer, keyvisual <Image> absolute priority sizes="100vw", gradient overlay div, "Bia" content container relative z-[3] flex-col gap-[120px] pt-[120px] lg:pt-[176px] px-6 lg:px-36, Root Further logo inline Image, SectionTitle, AwardsLayout, AwardsKudosPromotion | `src/app/awards-information/page.tsx`
- [x]T028 [P] [US1] Create loading.tsx skeleton matching page layout structure | `src/app/awards-information/loading.tsx`

**Checkpoint**: Full page renders with header, keyvisual, content, footer — US1, US4, US6 complete

---

## Phase 6: User Story 5 — Sun* Kudos Promotion (Priority: P2)

**Goal**: Display Kudos promotion section (1152x500px) with title, description, KUDOS branding, and "Chi tiết" CTA linking to /sun-kudos.

**Independent Test**: Scroll past award cards → Kudos section visible → click "Chi tiết" → navigates to /sun-kudos.

### Tests (US5)

- [x]T029 [US5] Write tests for AwardsKudosPromotion — renders title, description, CTA with href="/sun-kudos", CTA hover states | `src/components/__tests__/awards-information/AwardsKudosPromotion.test.tsx`

### Implementation (US5)

- [x]T030 [US5] Implement AwardsKudosPromotion component — 1152x500 rounded-2xl, background Image fill, content left (470px): "Phong trào ghi nhận" (24px white) + "Sun* Kudos" (57px gold) + description + "Chi tiết" CTA (gold bg, dark text, hover invert, focus outline), mobile: stack vertically | `src/components/awards-information/AwardsKudosPromotion.tsx`

**Checkpoint**: Kudos section complete with working CTA — US5 testable

---

## Phase 7: User Story 7 — Responsive Design (Priority: P2)

**Goal**: Ensure all components adapt correctly across mobile (>=320px), tablet (>=768px), and desktop (>=1024px).

**Independent Test**: Resize viewport to 320px/768px/1024px/1440px → no horizontal scrollbar, text readable, layout adapts correctly.

- [x]T031 [US7] Apply responsive Tailwind classes to AwardsSidebar — mobile: horizontal scrollable strip (flex-row overflow-x-auto gap-2), desktop: sticky vertical (w-[178px] flex-col) | `src/components/awards-information/AwardsSidebar.tsx`
- [x]T032 [P] [US7] Apply responsive classes to AwardCard — mobile: flex-col image on top full-width, tablet: image 250px, desktop: flex-row 336px image + 480px content | `src/components/awards-information/AwardCard.tsx`
- [x]T033 [P] [US7] Apply responsive classes to AwardsKudosPromotion — mobile: stack vertically, hide KUDOS branding, desktop: side-by-side 470px + graphic | `src/components/awards-information/AwardsKudosPromotion.tsx`
- [x]T034 [P] [US7] Apply responsive classes to SectionTitle — mobile: text-[32px], tablet: text-[40px], desktop: text-[57px] | `src/components/awards-information/SectionTitle.tsx`
- [x]T035 [US7] Apply responsive classes to page.tsx — mobile: px-6 pt-[120px], desktop: px-36 pt-[176px], Root Further logo scaled ~200px on mobile | `src/app/awards-information/page.tsx`
- [x]T036 [US7] Visual verification at 320px, 768px, 1024px, 1440px — no horizontal scrollbar, all text readable | manual verification

**Checkpoint**: Page fully responsive across all breakpoints — US7 complete

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, animations, edge cases, and final quality checks

### Accessibility

- [x]T037 [P] Add semantic HTML landmarks — <nav aria-label> on sidebar, <main> wrapper, <section id aria-labelledby> on award cards | all components
- [x]T038 [P] Add ARIA attributes — aria-current="true" on active sidebar link, aria-hidden="true" on decorative images (keyvisual, Root Further logo, thumbnails) | `AwardsSidebar.tsx`, `AwardCard.tsx`, `page.tsx`
- [x]T039 [P] Add focus indicators — focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2 on all interactive elements | `AwardsSidebar.tsx`, `AwardsKudosPromotion.tsx`

### Animations

- [x]T040 Implement scroll-into-view entrance animation for award cards — CSS keyframe opacity:0→1 + translateY(20px)→0, 200ms ease-out, triggered by IntersectionObserver, disabled via motion-safe: modifier | `src/components/awards-information/AwardCard.tsx`

### Edge Cases

- [x]T041 [P] Handle invalid hash anchor — useScrollSpy defaults to first item when hash doesn't match any section | verify in `src/hooks/useScrollSpy.ts`
- [x]T042 [P] Handle homepage hash navigation — /awards-information#top-project scrolls to correct section on mount | verify in `src/hooks/useScrollSpy.ts`
- [x]T043 [P] Add image placeholder/blur for award thumbnails — placeholder="blur" with blurDataURL | `src/components/awards-information/AwardCard.tsx`

### Final Validation

- [x]T044 Run full test suite — `yarn test:run` — all tests pass with zero failures
- [x]T045 Run ESLint — `yarn lint` — zero warnings (Constitution Principle I)
- [x]T046 Build verification — `yarn build` — no TypeScript or build errors

**Checkpoint**: All phases complete, tests green, lint clean, build passing

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup/Assets)**: No dependencies — start immediately
- **Phase 2 (Foundation)**: Depends on Phase 1 for icon components only; types/data/hook can start immediately
- **Phase 3 (US2 — Awards)**: Depends on Phase 2 (types, data)
- **Phase 4 (US3 — Sidebar)**: Depends on Phase 2 (useScrollSpy hook) and Phase 3 (AwardsList for layout integration)
- **Phase 5 (US1/4/6 — Page)**: Depends on Phase 3 + Phase 4 (all content components ready)
- **Phase 6 (US5 — Kudos)**: Depends on Phase 2 only; can run in parallel with Phase 3-5
- **Phase 7 (US7 — Responsive)**: Depends on Phase 3-6 (all components exist)
- **Phase 8 (Polish)**: Depends on Phase 7 (all features implemented)

### Within Each Phase

- Tests MUST be written and FAIL before implementation (TDD: RED → GREEN → REFACTOR)
- Component tests before component implementation
- Foundational components before composite components
- Story complete before moving to next priority

### Parallel Opportunities

- **Phase 1**: T003, T004, T005 can run in parallel (different asset downloads)
- **Phase 1**: T006, T007, T008 can run in parallel (different icon files)
- **Phase 2**: T010+T011 (types), T012+T013 (data), T014+T015 (hook) can run in parallel after types are done
- **Phase 3**: T016, T017, T018 tests can run in parallel (different test files)
- **Phase 3**: T019 can run in parallel with T020 (different component files)
- **Phase 6**: T029+T030 (Kudos) can run in parallel with Phase 3-5 work
- **Phase 7**: T031, T032, T033, T034 can run in parallel (different component files)
- **Phase 8**: T037, T038, T039, T041, T042, T043 can all run in parallel

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (Assets) + Phase 2 (Foundation)
2. Complete Phase 3 (US2 — Award Cards) — **this is the core content**
3. **STOP and VALIDATE**: 6 award cards render with correct data
4. Continue with Phase 4 (US3 — Sidebar) for navigation
5. Assemble full page in Phase 5

### Incremental Delivery

1. Phase 1 + 2 → Foundation ready
2. Phase 3 (US2) → Award cards testable → Commit
3. Phase 4 (US3) → Sidebar navigation works → Commit
4. Phase 5 (US1/4/6) → Full page assembled → Commit
5. Phase 6 (US5) → Kudos section → Commit
6. Phase 7 (US7) → Responsive → Commit
7. Phase 8 (Polish) → Accessibility, animations, edge cases → Commit

---

## Summary

| Metric | Value |
|--------|-------|
| **Total tasks** | 46 |
| **Phase 1 (Setup)** | 9 tasks |
| **Phase 2 (Foundation)** | 6 tasks |
| **Phase 3 (US2 — Awards)** | 6 tasks |
| **Phase 4 (US3 — Sidebar)** | 4 tasks |
| **Phase 5 (US1/4/6 — Page)** | 3 tasks |
| **Phase 6 (US5 — Kudos)** | 2 tasks |
| **Phase 7 (US7 — Responsive)** | 6 tasks |
| **Phase 8 (Polish)** | 10 tasks |
| **Parallel opportunities** | 8 groups identified |
| **Suggested MVP scope** | Phase 1-3 (US2 only: Award Cards) |

---

## Notes

- Commit after each completed phase or logical group
- Run tests before moving to next phase
- Update spec.md if requirements change during implementation
- Mark tasks complete as you go: `[x]`
- TDD is mandatory (Constitution Principle V): write failing tests FIRST, then implement
- All Vietnamese text must include proper diacritics as shown in Figma design
