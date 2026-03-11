# Tasks: Homepage SAA

**Frame**: `2167-9026-Homepage-SAA`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, etc.)

---

## Phase 1: Setup (Asset Preparation)

**Purpose**: Download assets, add fonts, prepare project infrastructure

- [x] T001 Download all media assets from Figma using `get_media_files` tool and organize in `public/images/homepage/` and `public/images/homepage/awards/` directories
- [x] T002 Create assets-map.md tracking downloaded assets → local paths in `.momorph/specs/2167-9026-Homepage-SAA/assets-map.md`
- [ ] T003 ⏳BLOCKED Add font files (Digital Numbers, SVN-Gotham) to `src/app/fonts/` directory

**Checkpoint**: All assets and fonts available locally

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Types, static data, CSS variables, fonts config, icon components — required by ALL user stories

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 [P] Define TypeScript types (AwardCategory, NavLink, EventConfig) in `src/types/homepage.ts`
- [x] T005 [P] Create static data constants (award categories, header/footer nav links, event config) in `src/utils/homepage-data.ts`
- [x] T006 [P] Add new CSS variables (--color-text-gold, --color-border-gold, --color-btn-secondary-bg, --color-notification-dot, --color-kudos-text, font vars) to `src/app/globals.css`
- [x] T007 Add local fonts (Digital Numbers, SVN-Gotham) and Montserrat weight 400 to `src/app/layout.tsx`
- [x] T008 [P] Create ArrowUpRightIcon component in `src/components/icons/ArrowUpRightIcon.tsx`
- [x] T009 [P] Create NotificationBellIcon component in `src/components/icons/NotificationBellIcon.tsx`
- [x] T010 [P] Create PenIcon component in `src/components/icons/PenIcon.tsx`
- [x] T011 [P] Create SaaMiniIcon component in `src/components/icons/SaaMiniIcon.tsx`

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 — Hero Banner & Countdown (Priority: P1) MVP

**Goal**: Display hero banner with "ROOT FURTHER" title, "Comming soon" label, live countdown (Days/Hours/Minutes), and event info (date, location, livestream note).

**Independent Test**: Load homepage → hero banner shows ROOT FURTHER title, countdown tiles with correct remaining time, event info with "26/12/2025" and "Âu Cơ Art Center".

### Tests (US1)

- [x] T012 [US1] Write failing tests for useCountdown hook (happy path: correct time remaining; edge: past date returns 0/0/0 + isExpired; edge: missing/invalid env var; update: timer ticks every 60s) in `src/hooks/__tests__/useCountdown.test.ts`
- [x] T013 [US1] Write failing tests for CountdownTimer component (renders "Comming soon" label, 3 countdown tiles with zero-padded digits, hides label when expired) in `src/components/__tests__/homepage/CountdownTimer.test.tsx`
- [x] T014 [US1] Write failing tests for HeroBanner component (renders bg image, gradient overlay, ROOT FURTHER title, CountdownTimer, EventInfo with date/location/livestream) in `src/components/__tests__/homepage/HeroBanner.test.tsx`

### Implementation (US1)

- [x] T015 [US1] Implement useCountdown hook (reads NEXT_PUBLIC_EVENT_DATETIME, returns {days, hours, minutes, isExpired}, setInterval 60s) in `src/hooks/useCountdown.ts`
- [x] T016 [P] [US1] Create CountdownTile component (digit display with Digital Numbers font + label) in `src/components/homepage/CountdownTile.tsx`
- [x] T017 [US1] Create CountdownTimer client component ("use client", renders "Comming soon" + 3 CountdownTiles, uses useCountdown hook) in `src/components/homepage/CountdownTimer.tsx`
- [x] T018 [P] [US1] Create EventInfo component (event date, location, livestream note as static text) in `src/components/homepage/EventInfo.tsx`
- [x] T019 [US1] Create HeroBanner component (bg image with next/image, gradient overlay, ROOT FURTHER title, CountdownTimer, EventInfo) in `src/components/homepage/HeroBanner.tsx`
- [x] T020 [US1] Wire HeroBanner into page.tsx — replace placeholder with Header + HeroBanner + Footer layout in `src/app/page.tsx`

**Checkpoint**: User Story 1 complete — hero banner with live countdown visible on homepage

---

## Phase 4: User Story 2 — CTA Buttons (Priority: P1)

**Goal**: Two CTA buttons ("ABOUT AWARDS", "ABOUT KUDOS") in hero section that navigate to respective pages with outlined→filled hover states.

**Independent Test**: Click "ABOUT AWARDS" → navigates to Awards Information. Click "ABOUT KUDOS" → navigates to Sun* Kudos. Hover shows filled gold state.

### Tests (US2)

- [x] T021 [US2] Write failing tests for CTAButton component (renders correct text + href, has ArrowUpRightIcon, correct variant styles for outlined/filled, accessible link) in `src/components/__tests__/homepage/CTAButton.test.tsx`

### Implementation (US2)

- [x] T022 [US2] Create CTAButton component (next/link wrapper, outlined/filled variants, hover transition 150ms, 276x60 size, 22px/700 font, ArrowUpRightIcon) in `src/components/homepage/CTAButton.tsx`
- [x] T023 [US2] Add CTA buttons ("ABOUT AWARDS" + "ABOUT KUDOS") to HeroBanner component with gap-10 layout in `src/components/homepage/HeroBanner.tsx`

**Checkpoint**: User Stories 1 & 2 complete — hero section fully functional

---

## Phase 5: User Story 3 — Award Categories Grid (Priority: P1)

**Goal**: Display 6 award cards in a responsive 3-col (desktop) / 2-col (mobile) grid, each with thumbnail, title, description (max 2 lines), and "Chi tiết" link navigating to Awards Information with hash anchor.

**Independent Test**: Scroll to awards section → 6 cards visible → click card → navigates to `/awards-information#slug`.

### Tests (US3)

- [x] T024 [P] [US3] Write failing tests for AwardCard component (renders thumbnail, title, description with 2-line clamp, "Chi tiết" link with ArrowUpRightIcon, correct href with hash anchor, hover state classes) in `src/components/__tests__/homepage/AwardCard.test.tsx`
- [x] T025 [P] [US3] Write failing tests for AwardsGrid component (renders section header with caption + title, renders 6 AwardCard components, 3-col grid layout) in `src/components/__tests__/homepage/AwardsGrid.test.tsx`

### Implementation (US3)

- [x] T026 [US3] Create AwardCard component (next/link wrapper, thumbnail 336x336 with gold border, title 24px gold, description 16px white max 2 lines ellipsis, "Chi tiết" link with ArrowUpRightIcon, hover: translateY(-4px) + box-shadow) in `src/components/homepage/AwardCard.tsx`
- [x] T027 [P] [US3] Create AwardsSectionHeader component ("Sun* annual awards 2025" caption 24px/700 gold + "Hệ thống giải thưởng" title 57px/700 gold, gap-4) in `src/components/homepage/AwardsSectionHeader.tsx`
- [x] T028 [US3] Create AwardsGrid component (renders AwardsSectionHeader + responsive grid of 6 AwardCards from static data, grid-cols-3 desktop / grid-cols-2 mobile, gap ~32px) in `src/components/homepage/AwardsGrid.tsx`
- [x] T029 [US3] Wire AwardsGrid into page.tsx below HeroBanner in `src/app/page.tsx`

**Checkpoint**: All P1 user stories complete — hero + CTA + awards grid functional

---

## Phase 6: User Story 4 + 5 — Root Further Description & Sun* Kudos (Priority: P2)

**Goal**: US4: Display "Root Further" decorative illustration and multi-paragraph description with English quote. US5: Display Sun* Kudos promotion section with title, description, "ĐIỂM MỚI CỦA SAA 2025" sub-label, KUDOS branding graphic, and "Chi tiết" CTA.

**Independent Test (US4)**: Scroll below hero → decorative ROOT FURTHER illustration visible → text content with "A tree with deep roots fears no storm" quote displayed.
**Independent Test (US5)**: Scroll to Kudos section → shows "Phong trào ghi nhận", "Sun* Kudos", description, KUDOS graphic → click "Chi tiết" → navigates to Kudos page.

### Tests (US4 + US5)

- [x] T030 [P] [US4] Write failing tests for RootFurtherSection (renders decorative image with aria-hidden, multi-paragraph text content, English quote) in `src/components/__tests__/homepage/RootFurtherSection.test.tsx`
- [x] T031 [P] [US5] Write failing tests for KudosPromotion (renders "Phong trào ghi nhận" label, "Sun* Kudos" title, "ĐIỂM MỚI CỦA SAA 2025" sub-label, description, "Chi tiết" button with correct href, KUDOS branding text) in `src/components/__tests__/homepage/KudosPromotion.test.tsx`

### Implementation (US4 + US5)

- [x] T032 [P] [US4] Create RootFurtherSection component (decorative illustration with next/image aria-hidden + multi-paragraph text block 16px/400 white + English quote, max-w-1224px) in `src/components/homepage/RootFurtherSection.tsx`
- [x] T033 [P] [US5] Create KudosPromotion component (2-column layout: left content with labels/title/description/"Chi tiết" button, right KUDOS branding text SVN-Gotham 96px, bg image, rounded-lg, p-120px-104px) in `src/components/homepage/KudosPromotion.tsx`
- [x] T034 [US4] [US5] Wire RootFurtherSection and KudosPromotion into page.tsx — insert between HeroBanner and AwardsGrid (RootFurther), and after AwardsGrid (Kudos), with section gap 120px in `src/app/page.tsx`

**Checkpoint**: P2 content sections complete — full page content visible

---

## Phase 7: User Story 6 — Header Navigation & Footer (Priority: P2)

**Goal**: Extend Header with navigation links (active state), notification bell (red dot), and extend Footer with SAA logo + 4 nav links. Maintain backward compatibility with login page.

**Independent Test**: Header shows 3 nav links ("About SAA 2025" active, "Awards Information", "Sun* Kudos") + bell + language selector + profile dropdown. Footer shows logo + 4 nav links + copyright.

### Tests (US6)

- [x] T035 [P] [US6] Write failing tests for HeaderNav component (renders 3 nav links, active link has gold color + underline, non-active links white, hover state background, uses usePathname) in `src/components/__tests__/HeaderNav.test.tsx`
- [x] T036 [P] [US6] Write failing tests for extended Header (renders nav links when navLinks prop provided, renders notification bell with red dot when showNotification=true, backward compatible: no navLinks → renders like before) in `src/components/__tests__/Header.test.tsx`
- [x] T037 [P] [US6] Write failing tests for extended Footer (renders SAA logo when showLogo=true, renders nav links when navLinks prop provided, backward compatible: no props → renders copyright only) in `src/components/__tests__/Footer.test.tsx`

### Implementation (US6)

- [x] T038 [US6] Create HeaderNav client component ("use client", usePathname for active state, renders nav links with active: gold+underline / normal: white / hover: bg highlight, gap-4px per link, 16px/500 font) in `src/components/HeaderNav.tsx`
- [x] T039 [US6] Extend Header.tsx — add navLinks + showNotification props, render HeaderNav between logo and right group, inline notification bell (NotificationBellIcon + red dot span), maintain backward compatibility in `src/components/Header.tsx`
- [x] T040 [US6] Extend Footer.tsx — add showLogo + navLinks props, render SAA logo (69x64) + nav links (16px/700 white) + copyright, maintain backward compatibility in `src/components/Footer.tsx`
- [x] T041 [US6] Update page.tsx — pass navLinks (3 items) + showNotification to Header, pass navLinks (4 items) + showLogo to Footer, pass ProfileDropdown as children in `src/app/page.tsx`

**Checkpoint**: Header/Footer fully extended — complete page layout with navigation

---

## Phase 8: User Story 7 + Polish (Priority: P3)

**Goal**: Add floating widget button (render only). Final accessibility pass, responsive verification, visual check.

**Independent Test**: Widget button visible at bottom-right, fixed position, pill shape with pen + SAA icons.

### Tests (US7)

- [x] T042 [US7] Write failing tests for WidgetButton (renders pill-shaped button, has PenIcon + SaaMiniIcon, fixed position classes, correct dimensions 106x64) in `src/components/__tests__/homepage/WidgetButton.test.tsx`

### Implementation (US7)

- [x] T043 [US7] Create WidgetButton component (fixed bottom-8 right-8, 106x64px, pill shape rounded-full, bg #FFEA9E, flex row gap-2, PenIcon + "/" + SaaMiniIcon, z-50) in `src/components/homepage/WidgetButton.tsx`
- [x] T044 [US7] Add WidgetButton to page.tsx in `src/app/page.tsx`

### Polish

- [x] T045 [P] Add ARIA attributes across all components: aria-live="polite" on countdown, aria-hidden on decorative images, aria-label on interactive elements, role="link" on award cards
- [x] T046 [P] Add focus indicators (outline: 2px solid #FFEA9E, offset 2px) to all focusable elements: CTA buttons, award cards, nav links, widget button
- [x] T047 [P] Verify responsive behavior: mobile (320px) — stacked CTA, 1-2 col awards grid, collapsed header nav; tablet (768px) — 2-col grid; desktop (1024px+) — full design specs
- [x] T048 Run full test suite (`yarn test:run`) and fix any failing tests
- [x] T049 Run ESLint (`yarn lint`) and fix any warnings/errors

**Checkpoint**: All user stories complete — homepage fully implemented and polished

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) → Phase 2 (Foundation) → Phase 3-7 (User Stories) → Phase 8 (Polish)
                                           │
                                           ├── Phase 3 (US1: Hero) ──────┐
                                           │                              │
                                           ├── Phase 4 (US2: CTA) ───────┤ P1 complete
                                           │   └── depends on Phase 3     │
                                           │                              │
                                           ├── Phase 5 (US3: Awards) ─────┘
                                           │
                                           ├── Phase 6 (US4+US5: Content) ── P2 content
                                           │   └── can parallel with Phase 5
                                           │
                                           ├── Phase 7 (US6: Header/Footer) ── P2 layout
                                           │   └── can parallel with Phase 5+6
                                           │
                                           └── Phase 8 (US7 + Polish) ── P3
                                               └── depends on ALL above
```

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD: Red → Green → Refactor)
- Components before page integration
- Simple/leaf components before composite containers
- Story complete before moving to next priority

### Parallel Opportunities

**Phase 2** (all [P] tasks can run in parallel):
- T004 + T005 + T006 (types, data, CSS) — different files
- T008 + T009 + T010 + T011 (icon components) — different files

**Phase 3** (within US1):
- T016 (CountdownTile) + T018 (EventInfo) — different files, no dependencies

**Phase 5** (within US3):
- T024 + T025 (test files) — different test files
- T026 (AwardCard) + T027 (AwardsSectionHeader) — different files

**Phase 6** (US4 + US5 fully parallel):
- T030 + T031 (tests) — different test files
- T032 (RootFurtherSection) + T033 (KudosPromotion) — different files, independent stories

**Phase 7** (within US6):
- T035 + T036 + T037 (test files) — different test files

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (US1: Hero Banner & Countdown)
3. **STOP and VALIDATE**: Hero banner renders with live countdown
4. Continue Phase 4 (US2: CTA Buttons) — minimal addition
5. Continue Phase 5 (US3: Awards Grid) — core content

### Incremental Delivery

1. Setup + Foundation → **Commit**
2. US1 (Hero) → Test → **Commit** (feat: add hero banner with countdown)
3. US2 (CTA) → Test → **Commit** (feat: add CTA buttons to hero)
4. US3 (Awards) → Test → **Commit** (feat: add award categories grid)
5. US4+US5 (Content) → Test → **Commit** (feat: add root further description and kudos promotion)
6. US6 (Header/Footer) → Test → **Commit** (feat: extend header with nav links and footer with logo)
7. US7 + Polish → Test → **Commit** (feat: add widget button and accessibility polish)

---

## Notes

- Constitution mandates TDD — test tasks precede implementation tasks in every phase
- Commit after each completed phase using conventional commits (`feat:`, `test:`, `chore:`)
- Font files (Digital Numbers, SVN-Gotham) must be available before Phase 2 T007
- "Comming soon" spelling is intentional — do not change
- Award card thumbnails downloaded from Figma as composite images (bg ring + icon)
- Header/Footer extensions MUST be backward compatible — login page must not break
- Static data in `src/utils/homepage-data.ts` (not `src/data/`) per constitution folder structure
