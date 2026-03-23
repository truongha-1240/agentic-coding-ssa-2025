# Tasks: Sun* Kudos - Live Board

**Frame**: `2940:13431` — Sun* Kudos - Live board
**Prerequisites**: plan.md (5th pass), spec.md (7th pass), design-style.md (7th pass)
**Generated**: 2026-03-22

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3...)
- **|**: File path affected by this task

---

## Phase 1: Setup (Shared Utilities)

**Purpose**: Create shared utilities needed across multiple user stories. Foundation (types, page shell, icons, shared components) already exists ✅.

- [x] T001 [P] Create formatHeartCount and formatTimestamp utilities | src/utils/format-kudos.ts
- [x] T002 [P] Create unit tests for formatHeartCount and formatTimestamp | src/utils/__tests__/format-kudos.test.ts
- [x] T003 [P] Create PenIcon SVG component (24px, white) for input bar prefix | src/components/icons/PenIcon.tsx
- [x] T004 [P] Create PanZoomIcon SVG component (24px, white) for Spotlight toggle | src/components/icons/PanZoomIcon.tsx
- [x] T005 [P] Create PlayIcon SVG component (32px, white) for video thumbnail overlay | src/components/icons/PlayIcon.tsx

**Checkpoint**: Shared utilities and remaining icons ready — user story implementation can begin in parallel

---

## Phase 2: Foundational — Fix Existing Components

**Purpose**: Fix issues in already-implemented components that affect multiple user stories

**⚠️ CRITICAL**: These fixes affect HeartButton and CopyLinkButton which are used in US1, US2, and US3. Complete before or alongside user story phases.

- [x] T006 Update HeartButton to format count with formatHeartCount (comma separator e.g. "1,000") | src/components/sun-kudos/HeartButton.tsx
- [x] T007 Update CopyLinkButton to add "Copy Link" text label next to icon per design-style.md | src/components/sun-kudos/CopyLinkButton.tsx
- [x] T008 Update CopyLinkButton toast to fixed bottom-right positioning per design-style.md Toast spec (position: fixed; bottom: 24px; right: 24px; z-index: 50; gold border; auto-dismiss 3s) | src/components/sun-kudos/CopyLinkButton.tsx
- [x] T009 Update HeartButton and CopyLinkButton tests to verify new formatting and toast positioning | src/components/sun-kudos/__tests__/HeartButton.test.tsx, src/components/sun-kudos/__tests__/CopyLinkButton.test.tsx

**Checkpoint**: Existing shared components fixed — all user stories will use correct formatting and styling

---

## Phase 3: User Story 6 — Open Kudos Write Dialog (Priority: P3) + User Story 7 base — KV Banner

**Goal**: Hero section with KUDOS branding, pill-shaped input bar (click → write dialog stub), and search bar base

**Independent Test**: Render KVBanner component, verify KUDOS logo text renders, input bar click triggers onWriteKudo callback, search bar renders with placeholder text and SearchIcon

### Frontend (US6 + US7 base)

- [x] T010 [P] [US6] Create KudosInputBar client component — pill-shaped button (72px height, rounded-[68px], border gold, bg yellow-subtle) with PenIcon + placeholder text, onClick triggers onWriteKudo callback | src/components/sun-kudos/KudosInputBar.tsx
- [x] T011 [P] [US7] Create SunnerSearchBar client component — pill-shaped input (72px height, rounded-[68px], border gold, bg yellow-subtle) with SearchIcon + placeholder "Tìm kiếm profile Sunner", basic input state | src/components/sun-kudos/SunnerSearchBar.tsx
- [x] T012 [US6] Create KVBanner server component — title "Hệ thống ghi nhận và cảm ơn" (24px Bold white), SaaMiniIcon + "KUDOS" logo (Montserrat Alternates 139.78px Bold, color-kudos-text, shadow-text-glow), input/search row (flex-col md:flex-row gap-4 md:gap-6), w-full max-w-[1152px] | src/components/sun-kudos/KVBanner.tsx
- [x] T013 [US6] Wire up KVBanner into page.tsx — import and render in "Bìa" content container, replace placeholder | src/app/sun-kudos/page.tsx

### Tests (US6 + US7 base)

- [x] T014 [US6] Create KVBanner tests — verify KUDOS logo renders, input bar click fires callback, search bar renders with placeholder | src/components/sun-kudos/__tests__/KVBanner.test.tsx

**Checkpoint**: KV Banner section complete — hero area visible with KUDOS branding, input bar, and search bar

---

## Phase 4: User Story 2 — Highlight Kudos Carousel (Priority: P1) 🎯 MVP

**Goal**: Top 5 most-liked Kudos in an interactive carousel with hashtag/department filter dropdowns

**Independent Test**: Render HighlightKudos with 5 mock Kudos, verify carousel displays 3 cards on desktop (center featured), prev/next navigation works, page indicator shows currentPage/5, filter dropdowns open/close with keyboard nav

### Frontend (US2)

- [x] T015 [P] [US2] Create FilterDropdown client component — reusable dropdown following ProfileDropdown pattern: click-outside close, keyboard nav (Arrow keys, Enter, Escape), ARIA listbox/option/expanded/selected, ChevronDownIcon indicator | src/components/sun-kudos/FilterDropdown.tsx
- [x] T016 [P] [US2] Create CarouselControls component — prev/next circular buttons (48px, border gold, disabled opacity 0.3 cursor-not-allowed), page indicator (current: 36px Bold gold, total: 20px Bold white, separator "/") | src/components/sun-kudos/CarouselControls.tsx
- [x] T017 [US2] Create HighlightKudoCard component — sender/receiver UserInfo size="small" with ArrowRightIcon, timestamp (14px white/50%) + category label (14px Bold gold), content line-clamp-3, hashtags, HeartButton + CopyLinkButton + "Xem chi tiết" link with ArrowUpRightIcon (hover: gold), card bg rgba(0,16,26,0.9) rounded-2xl border-divider p-6 | src/components/sun-kudos/HighlightKudoCard.tsx
- [x] T018 [US2] Create HighlightKudos client component — SectionHeader "HIGHLIGHT KUDOS", filter row (Hashtag + Department FilterDropdowns), responsive carousel (desktop: 3 cards visible center featured scale(1) sides scale(0.85) opacity-60 translateX 300ms ease-in-out, mobile: 1 card swipe), arrow key support, ARIA region/slide/roledescription | src/components/sun-kudos/HighlightKudos.tsx

### Backend (US2)

- [x] T019 [P] [US2] Create useHighlightKudos hook — fetch top 5 highlights from /api/kudos/highlights, refetch on hashtag/department filter change | src/hooks/useHighlightKudos.ts
- [ ] T020 [P] [US2] Create GET /api/kudos/highlights route — query Supabase for top 5 by heart count, optional hashtag/department filter params, auth session verification | src/app/api/kudos/highlights/route.ts
- [ ] T021 [P] [US2] Create GET /api/hashtags route — return available hashtags list from Supabase, auth session verification | src/app/api/hashtags/route.ts
- [ ] T022 [P] [US2] Create GET /api/departments route — return departments list from Supabase, auth session verification | src/app/api/departments/route.ts

### Integration (US2)

- [x] T023 [US2] Wire up HighlightKudos into page.tsx — import and render in "Bìa" content container after KVBanner, replace placeholder | src/app/sun-kudos/page.tsx

### Tests (US2)

- [ ] T024 [P] [US2] Create FilterDropdown tests — open on click, close on click-outside/Escape, keyboard nav (arrows + Enter), ARIA attributes | src/components/sun-kudos/__tests__/FilterDropdown.test.tsx
- [ ] T025 [P] [US2] Create HighlightKudos tests — carousel renders 5 slides, prev/next navigate, disabled at bounds, 3 cards desktop / 1 card mobile, arrow key nav, filter select triggers refetch | src/components/sun-kudos/__tests__/HighlightKudos.test.tsx
- [ ] T026 [P] [US2] Create useHighlightKudos tests — initial fetch returns 5 items, filter change triggers refetch with params | src/hooks/__tests__/useHighlightKudos.test.ts

**Checkpoint**: Highlight Kudos carousel complete — top 5 Kudos displayed with navigation, filters, and responsive layout

---

## Phase 5: User Story 1 — View All Kudos Feed (Priority: P1) + User Story 3 — Like & Copy Link (Priority: P2) 🎯 MVP

**Goal**: Full paginated Kudos feed with infinite scroll, Kudo post cards with all fields, like/unlike mutation hook, and two-column layout container

**Independent Test**: Render feed with mock Kudos data, verify cards show all fields (sender, receiver, timestamp, category, content 5-line truncation, images, hashtags, heart comma-formatted, copy link), infinite scroll loads next page, empty state shown, hashtag click filters feed

### Shared (US1 + US3)

- [x] T027 [P] [US3] Create useLikeKudo hook — POST /api/kudos/{id}/like (like) and DELETE (unlike) with optimistic update + revert on error | src/hooks/useLikeKudo.ts
- [ ] T028 [P] [US3] Create POST/DELETE /api/kudos/[id]/like route — like/unlike with auth session verification, toggle behavior | src/app/api/kudos/[id]/like/route.ts

### Frontend (US1)

- [x] T029 [P] [US1] Create ImageGallery component — horizontal flex row of square thumbnails (max 5, gap-2, rounded-lg, aspect-ratio 1), click opens full-size, video thumbnails show PlayIcon overlay with dark semi-transparent bg (rgba(0,0,0,0.3)), hidden when no images | src/components/sun-kudos/ImageGallery.tsx
- [x] T030 [P] [US1] Create HashtagList component — flex wrap of clickable hashtag badge tags (bg btn-secondary-bg, rounded, px-2 py-1, 14px Bold gold), max 5 with "..." truncation, onHashtagClick(tag) callback for FR-012, hidden when no hashtags | src/components/sun-kudos/HashtagList.tsx
- [x] T031 [US1] Create KudoPostCard component — sender/receiver UserInfo (48px) with ArrowRightIcon, timestamp formatTimestamp + category label (bold gold), content line-clamp-5, ImageGallery, HashtagList with onHashtagClick, HeartButton (formatHeartCount) + CopyLinkButton, ARIA role="article", border-bottom divider, py-6 | src/components/sun-kudos/KudoPostCard.tsx
- [x] T032 [P] [US1] Create useKudosFeed hook — cursor-based pagination (10 items/page), supports hashtag/department filter params, IntersectionObserver callback to trigger next page, isFetching guard against concurrent requests | src/hooks/useKudosFeed.ts
- [x] T033 [US1] Create KudosFeed client component — infinite scroll with IntersectionObserver sentinel element, loading spinner at bottom while fetching, accepts selectedHashtag prop, empty state "Hãy là người đầu tiên gửi lời cảm ơn!", ARIA role="feed" | src/components/sun-kudos/KudosFeed.tsx
- [x] T034 [US1] Create AllKudosSection client component — SectionHeader "ALL KUDOS", two-column layout (flex-col lg:flex-row gap-8 lg:gap-10 w-full max-w-[1152px]), manages selectedHashtag state for FR-012, left: KudosFeed (flex-1), right: StatsSidebar placeholder (w-full lg:w-80) | src/components/sun-kudos/AllKudosSection.tsx

### Backend (US1)

- [ ] T035 [P] [US1] Create GET /api/kudos route — paginated Kudos feed with cursor/limit/hashtag/department query params, auth session verification, sorted by most recent | src/app/api/kudos/route.ts

### Integration (US1)

- [x] T036 [US1] Wire up AllKudosSection into page.tsx — import and render in "Bìa" content container after SpotlightBoard placeholder, replace placeholder | src/app/sun-kudos/page.tsx

### Tests (US1 + US3)

- [ ] T037 [P] [US1] Create KudoPostCard tests — renders all fields (sender, receiver, timestamp formatted, category label, content, images, hashtags, heart count comma-formatted, copy link), content >5 lines shows ellipsis, no images hides gallery, no hashtags hides row, video thumbnail shows play overlay | src/components/sun-kudos/__tests__/KudoPostCard.test.tsx
- [ ] T038 [P] [US1] Create KudosFeed tests — renders feed with mock data sorted by recent, infinite scroll sentinel triggers next page, loading spinner shown, empty state message, hashtag filter refetches | src/components/sun-kudos/__tests__/KudosFeed.test.tsx
- [ ] T039 [P] [US1] Create AllKudosSection tests — two-column layout desktop/stacked mobile, hashtag click in feed card sets selectedHashtag state, passes to KudosFeed | src/components/sun-kudos/__tests__/AllKudosSection.test.tsx
- [ ] T040 [P] [US3] Create useLikeKudo tests — optimistic update increments count, API error reverts to original count, POST called for like, DELETE for unlike | src/hooks/__tests__/useLikeKudo.test.ts
- [ ] T041 [P] [US1] Create useKudosFeed tests — initial fetch with cursor, filter params change triggers refetch, IntersectionObserver triggers next page | src/hooks/__tests__/useKudosFeed.test.ts
- [ ] T042 [P] [US1] Create GET /api/kudos route tests — pagination with cursor/limit, hashtag/department filtering, auth required | src/app/api/kudos/__tests__/route.test.ts
- [ ] T043 [P] [US3] Create POST/DELETE /api/kudos/[id]/like route tests — like creates record, unlike deletes, auth required | src/app/api/kudos/[id]/like/__tests__/route.test.ts

**Checkpoint**: All Kudos feed + like/copy interactions complete — core browsing experience working

---

## Phase 6: User Story 4 — Personal Stats Sidebar (Priority: P2)

**Goal**: Personal Kudos stats, Secret Box gamification, and recent gift recipients list in right sidebar

**Independent Test**: Render sidebar with mock stats, verify 5 stat rows display correct values (comma-formatted), heart multiplier "x2" badge visible, Secret Box button disabled when 0 unopened, gift recipients show 5 initially with "Xem thêm" loading next 5

### Frontend (US4)

- [x] T044 [P] [US4] Create StatsOverview component — 5 stat rows (flex justify-between, label 16px Bold white, value 24px Bold gold comma-formatted), hearts row with static "x2" multiplier badge (inline-flex, heart icon 16px + "x2" text 14px Bold gold), separator 1px divider, "Mở Secret Box" button (full-width, border gold, bg yellow-subtle, GiftBoxIcon, disabled at 0 unopened: opacity-0.3 cursor-not-allowed) | src/components/sun-kudos/StatsOverview.tsx
- [x] T045 [P] [US4] Create GiftRecipientsList component — title "10 SUNNER NHẬN QUÀ MỚI NHẤT" (16px Bold gold), recipient rows (avatar 40px circle, red dot 8px, name 14px Bold, description 14px Regular, gap-3), shows 5 initially + "Xem thêm" button (transparent bg, border divider, 14px Bold gold, hover bg yellow-subtle) loading next 5 appended | src/components/sun-kudos/GiftRecipientsList.tsx
- [x] T046 [US4] Create StatsSidebar client component — wrapper with StatsOverview + GiftRecipientsList, sticky lg:sticky lg:top-[100px], ARIA role="complementary" aria-label="Your Kudos statistics", w-full lg:w-80 | src/components/sun-kudos/StatsSidebar.tsx

### Backend (US4)

- [x] T047 [P] [US4] Create useUserStats hook — fetch from /api/users/me/stats (consolidated: Kudos received/sent, hearts received, Secret Boxes opened/unopened) | src/hooks/useUserStats.ts
- [x] T048 [P] [US4] Create useGiftRecipients hook — fetch from /api/gifts/recent with cursor-based load-more (5 per batch) | src/hooks/useGiftRecipients.ts
- [ ] T049 [P] [US4] Create GET /api/users/me/stats route — return UserStats (consolidated Kudos + Secret Box counts), auth session verification | src/app/api/users/me/stats/route.ts
- [ ] T050 [P] [US4] Create GET /api/gifts/recent route — return paginated gift recipients (cursor, limit=5), auth session verification | src/app/api/gifts/recent/route.ts

### Integration (US4)

- [x] T051 [US4] Wire StatsSidebar into AllKudosSection — replace sidebar placeholder with StatsSidebar in the right column | src/components/sun-kudos/AllKudosSection.tsx

### Tests (US4)

- [ ] T052 [P] [US4] Create StatsSidebar tests — 5 stat rows display correct comma-formatted values, heart "x2" badge visible, Secret Box button enabled when >0 unopened, disabled when 0, gift recipients show 5, "Xem thêm" loads next 5 appended, sticky class applied on desktop | src/components/sun-kudos/__tests__/StatsSidebar.test.tsx
- [ ] T053 [P] [US4] Create useUserStats tests — fetches consolidated stats, returns all fields | src/hooks/__tests__/useUserStats.test.ts
- [ ] T054 [P] [US4] Create useGiftRecipients tests — initial fetch returns 5, load-more appends next 5 | src/hooks/__tests__/useGiftRecipients.test.ts

**Checkpoint**: Stats sidebar complete — personal stats, Secret Box, and gift recipients visible in right column

---

## Phase 7: User Story 5 — Spotlight Board (Priority: P2)

**Goal**: Interactive SVG word cloud visualization of Kudos recipients with search and pan/zoom

**Independent Test**: Render SpotlightBoard with mock data, verify SVG renders text elements for each name, total count displays (e.g., "388 KUDOS"), search highlights matching name, pan/zoom toggle changes board mode

### Frontend (US5)

- [x] T055 [P] [US5] Create SpotlightSearch client component — search input (16px, magnifying glass SearchIcon, border divider, rounded-lg, padding 8px 12px), type triggers name highlight on board, hover/focus states per design-style | src/components/sun-kudos/SpotlightSearch.tsx
- [x] T056 [US5] Create SpotlightBoard client component — SectionHeader "SPOTLIGHT BOARD", board container (rounded-2xl overflow-hidden bg-rgba(0,16,26,0.9)), toolbar (total count "388 KUDOS" 24px Bold white + SpotlightSearch + PanZoomIcon toggle), SVG canvas with text elements (sizes 12px-36px based on kudosCount, white/gold colors, varying opacity), pan/zoom via CSS transform scale/translate + pointer events, click name navigates to profile, ARIA role="img" | src/components/sun-kudos/SpotlightBoard.tsx

### Backend (US5)

- [x] T057 [P] [US5] Create useSpotlightData hook — fetch from /api/kudos/spotlight, returns names + counts + positions | src/hooks/useSpotlightData.ts
- [ ] T058 [P] [US5] Create GET /api/kudos/spotlight route — aggregate recipient names + kudos counts, auth session verification | src/app/api/kudos/spotlight/route.ts

### Integration (US5)

- [x] T059 [US5] Wire up SpotlightBoard into page.tsx — import and render in "Bìa" content container between HighlightKudos and AllKudosSection, replace placeholder | src/app/sun-kudos/page.tsx

### Tests (US5)

- [ ] T060 [P] [US5] Create SpotlightBoard tests — SVG renders expected number of text elements, search type highlights matching name, pan/zoom toggle enables drag/zoom mode, total count displays | src/components/sun-kudos/__tests__/SpotlightBoard.test.tsx
- [ ] T061 [P] [US5] Create useSpotlightData tests — fetches spotlight data, returns array of SpotlightNode | src/hooks/__tests__/useSpotlightData.test.ts

**Checkpoint**: Spotlight Board complete — interactive word cloud with search and pan/zoom

---

## Phase 8: User Story 7 — Search Sunner Profile (Priority: P3)

**Goal**: Debounced Sunner profile search with dropdown results showing avatar, name, and department

**Independent Test**: Type name in search bar, verify debounced API call after 300ms pause, dropdown shows matching profiles with avatar/name/department, keyboard navigation (arrows + Enter) works in dropdown

### Backend (US7)

- [ ] T062 [P] [US7] Create GET /api/users/search route — search Sunner profiles by name (query: q string, limit number 1-20), input validation, auth session verification | src/app/api/users/search/route.ts

### Frontend (US7)

- [ ] T063 [US7] Enhance SunnerSearchBar with debounced search (300ms), dropdown results panel (avatar + name + department per result), keyboard navigation (arrow keys cycle, Enter selects, Escape closes), click-outside closes dropdown | src/components/sun-kudos/SunnerSearchBar.tsx

### Tests (US7)

- [ ] T064 [P] [US7] Create SunnerSearchBar tests — debounce: type fast → only one API call after 300ms, results dropdown shows matching profiles, keyboard nav (arrows/Enter/Escape), click-outside closes | src/components/sun-kudos/__tests__/SunnerSearchBar.test.tsx

**Checkpoint**: Sunner search complete — profile search with debounced dropdown

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Loading states, error handling, accessibility, responsive tuning, and performance optimization

### Loading States

- [ ] T065 [P] Add skeleton loading placeholder for Kudo feed cards (h-[280px], animate-pulse, bg-rgba(255,234,158,0.05)) inside KudosFeed | src/components/sun-kudos/KudosFeed.tsx
- [ ] T066 [P] Add skeleton loading placeholder for sidebar stats (h-6 per row, 5 rows gap-4, animate-pulse) inside StatsSidebar | src/components/sun-kudos/StatsSidebar.tsx
- [ ] T067 [P] Add skeleton loading placeholder for carousel cards (h-[400px] w-[400px] rounded-2xl, animate-pulse) inside HighlightKudos | src/components/sun-kudos/HighlightKudos.tsx
- [ ] T068 [P] Add skeleton loading placeholder for Spotlight Board (h-[400px] w-full rounded-2xl, animate-pulse) inside SpotlightBoard | src/components/sun-kudos/SpotlightBoard.tsx

### Error & Empty States

- [ ] T069 [P] Add per-section error state with "Thử lại" retry button to KudosFeed, HighlightKudos, StatsSidebar, SpotlightBoard | src/components/sun-kudos/
- [ ] T070 Create OfflineBanner component — detect navigator.onLine + online/offline events, show dismissible gold-bordered banner at page top when offline | src/components/sun-kudos/OfflineBanner.tsx
- [ ] T071 Wire OfflineBanner into page.tsx at top of "Bìa" content container | src/app/sun-kudos/page.tsx

### Accessibility & Focus

- [ ] T072 Audit and add focus indicators (outline: 2px solid #FFEA9E, outline-offset: 2px) to all interactive elements across all sun-kudos components | src/components/sun-kudos/
- [ ] T073 Verify all ARIA attributes match spec: carousel region/slide, heart aria-pressed, filter listbox/option, spotlight role="img", sidebar complementary, feed/article roles | src/components/sun-kudos/

### Responsive & Performance

- [ ] T074 Test responsive layout at 320px, 768px, 1024px breakpoints — verify carousel 1/3 cards, feed stacking, sidebar below feed on mobile, touch targets ≥ 44×44px | src/components/sun-kudos/
- [ ] T075 Verify keyvisual image uses priority + sizes="100vw" for LCP < 2.5s (TR-001) | src/app/sun-kudos/page.tsx
- [ ] T076 Run ESLint across all new files — ensure zero warnings | src/components/sun-kudos/, src/hooks/, src/app/api/

**Checkpoint**: All polish complete — production-ready with loading, error, accessibility, and responsive polish

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Fix Components)**: Depends on Phase 1 (format-kudos.ts utility)
- **Phase 3 (KV Banner — US6/US7)**: Depends on Phase 1 (PenIcon)
- **Phase 4 (Highlight — US2)**: Depends on Phase 2 (fixed HeartButton/CopyLinkButton)
- **Phase 5 (Feed — US1/US3)**: Depends on Phase 1 + Phase 2
- **Phase 6 (Sidebar — US4)**: Component dev independent; integration wiring depends on Phase 5 (AllKudosSection)
- **Phase 7 (Spotlight — US5)**: Depends on Phase 1 (PanZoomIcon) only — otherwise independent
- **Phase 8 (Search — US7)**: Depends on Phase 3 (SunnerSearchBar base)
- **Phase 9 (Polish)**: Depends on all user story phases (3–8)

### Within Each User Story

- Tests marked [P] can be written in parallel with implementation (TDD: write test → implement → verify)
- API routes marked [P] can be built in parallel with frontend components
- Integration/wiring tasks MUST run after their component dependencies

### Parallel Opportunities

**After Phase 1 + 2 complete, these can ALL run in parallel:**

```
Developer A: Phase 3 (KV Banner — US6) ─────────→ Phase 8 (Search — US7)
Developer B: Phase 4 (Highlight — US2) ──────────→ done
Developer C: Phase 5 (Feed — US1/US3) ──────────→ Phase 6 (Sidebar — US4)
Developer D: Phase 7 (Spotlight — US5) ──────────→ done
                                                    ↓
                                              Phase 9 (Polish)
```

**Within each phase, tasks marked [P] can run in parallel:**
- Phase 4: T015, T016 (FilterDropdown, CarouselControls) in parallel
- Phase 5: T027–T030 (useLikeKudo, like API, ImageGallery, HashtagList) all in parallel
- Phase 6: T044, T045 (StatsOverview, GiftRecipientsList) in parallel
- Phase 7: T055, T057, T058 (SpotlightSearch, hook, API) in parallel

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (setup + fix existing components)
2. Complete Phase 5 (User Story 1 — All Kudos Feed) ← **core browsing experience**
3. Complete Phase 3 (User Story 6 — KV Banner) ← **hero section**
4. **STOP and VALIDATE**: The page now has a hero banner and a working Kudos feed with infinite scroll
5. Deploy if ready

### Incremental Delivery

1. Phase 1 + 2 → Setup + Fixes
2. Phase 3 (KV Banner) → Phase 5 (Feed + Like) → **Test → Deploy MVP**
3. Phase 4 (Highlight Carousel) → **Test → Deploy**
4. Phase 6 (Sidebar) → **Test → Deploy**
5. Phase 7 (Spotlight) → **Test → Deploy**
6. Phase 8 (Search) → **Test → Deploy**
7. Phase 9 (Polish) → **Final Test → Deploy**

---

## Notes

- All API routes return mock JSON data initially — replace with real Supabase queries when database schema is available
- HeartButton uses onToggle callback prop — until useLikeKudo hook (Phase 5) is ready, parent components should pass a no-op stub
- Commit after each completed task or logical group — use conventional commits (feat:, fix:, test:, refactor:)
- Run vitest after each phase to ensure no regressions
- Mark tasks complete as you go: `[x]`
