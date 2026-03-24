# Implementation Plan: Sun* Kudos - Live Board

**Frame**: `2940:13431` — Sun* Kudos - Live board
**Spec**: `spec.md`
**Design Style**: `design-style.md`
**Created**: 2026-03-16
**Reviewed**: 2026-03-22 (5th pass — plan review: 8 issues fixed)
**Route**: `/sun-kudos`

---

## Summary

Build the Sun* Kudos Live Board — the main interactive page for the SAA 2025 recognition system. Features a hero banner, highlight carousel (top 5 Kudos), interactive spotlight word-cloud, paginated Kudos feed (infinite scroll), personal stats sidebar with Secret Box gamification, and Sunner profile search.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS v4, Supabase SDK
**Database**: PostgreSQL via Supabase (schema pending)
**Testing**: Vitest 4.x + Testing Library (React, DOM, User Event, Jest DOM)
**State Management**: Local `useState`/`useReducer` per component (no global store)
**API Style**: REST — Next.js API Route Handlers + Supabase server client
**Hosting**: Cloudflare Workers via @opennextjs/cloudflare

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case routes, PascalCase components, `@/*` imports, strict TS)
- [x] Uses approved libraries and patterns (no new dependencies required)
- [x] Adheres to folder structure guidelines (feature components in `src/components/sun-kudos/`)
- [x] Meets security requirements (Supabase Auth, API session verification, RLS, input validation)
- [x] Follows testing standards (TDD Red-Green-Refactor, co-located `__tests__/`, ≥1 integration test per US)

**Violations**: None

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| *(none)* | — | — |

---

## Architecture Decisions

### Frontend

- **Component pattern**: Feature-scoped components in `src/components/sun-kudos/`. Shared icons in `src/components/icons/`. Page shell in `src/app/sun-kudos/page.tsx` (Server Component).
- **Component naming**: Informed by design-style.md Implementation Mapping table. Key mappings:
  - `<KVBanner />` — Hero content (no background image)
  - `<HighlightKudos />` — Carousel section wrapper (Client)
  - `<HighlightKudoCard />` — Individual highlight card
  - `<FilterDropdown />` — Reusable dropdown for Hashtag/Department filters
  - `<CarouselControls />` — Prev/Next buttons + page indicator
  - `<SpotlightBoard />` — SVG word cloud (Client)
  - `<SpotlightSearch />` — Spotlight search bar
  - `<AllKudosSection />` — Two-column layout manager (Client, manages `selectedHashtag` for FR-012)
  - `<KudosFeed />` — Infinite scroll feed (Client)
  - `<KudoPostCard />` — Feed card
  - `<ImageGallery />` — Image thumbnails row (max 5)
  - `<HashtagList />` — Clickable hashtag tags
  - `<StatsSidebar />` — Sidebar wrapper (sticky)
  - `<StatsOverview />` — 5 stat rows + gift button
  - `<GiftRecipientsList />` — Recent gift recipients
  - `<SunnerSearchBar />` — Profile search with debounced dropdown
  - `<HeartButton />` ✅ exists — Like toggle with optimistic update
  - `<CopyLinkButton />` ✅ exists — Copy URL + toast
  - `<UserInfo />` ✅ exists — Avatar/name/star/dept display
  - `<SectionHeader />` ✅ exists — Section title with gold styling
- **Client vs Server**: Page shell (`page.tsx`) is Server Component. Interactive sections (carousel, heart toggle, spotlight board, sidebar stats, feed) are Client Components with `"use client"`.
- **State management**: No global state store. Each interactive section manages its own local state. API data fetched via custom hooks.
- **Hashtag click-to-filter (FR-012)**: Two independent filter scopes:
  1. **Highlight section**: Internal `<FilterDropdown />` components managed by `<HighlightKudos />`. Refetches via `useHighlightKudos`.
  2. **All Kudos feed**: Clicking a hashtag in `<HashtagList />` sets `selectedHashtag` in `<AllKudosSection />`, passed to `<KudosFeed />` to refetch. Does NOT affect Highlights.
- **Data fetching**: Server Components fetch initial data where possible. Client Components use custom hooks for paginated/interactive data.
- **Carousel**: Custom implementation (no library):
  - **Desktop (≥1024px)**: 3 cards visible, center card featured (larger), side cards at `scale(0.85) opacity-60`. CSS `translateX` (300ms ease-in-out).
  - **Tablet (768px–1023px)**: 1–2 cards visible, center featured.
  - **Mobile (<768px)**: 1 card visible, touch swipe support.
  - Page indicator: `currentPage/5` where `currentPage` = center card index.
  - Keyboard arrow-key support (TR-002).
- **Spotlight Board**: SVG `<text>` elements positioned algorithmically. Pan/zoom via CSS `transform` + pointer events. No external library for MVP; canvas migration if performance requires it.
- **Optimistic UI**: Heart toggle updates local state immediately, syncs to server, reverts on error.
- **Profile hover preview (US1-S4)**: Deferred. `<UserInfo />` renders avatar + name as `<Link>`. Hover popover is a follow-up enhancement.
- **Number formatting**: Heart counts and stat values use `formatHeartCount()` from `src/utils/format-kudos.ts` (wraps `toLocaleString('en-US')` for consistent comma separation, e.g., "1,000"). **NOTE**: Existing `HeartButton.tsx` displays raw `optimisticCount` — must be updated to use `formatHeartCount()`.
- **Timestamp formatting**: Kudo timestamps use `formatTimestamp()` from `src/utils/format-kudos.ts` — formats `Date` to `HH:mm - MM/DD/YYYY` (e.g., "16:00 - 10/30/2025"). Used in both `KudoPostCard` and `HighlightKudoCard`.
- **Feed pagination**: Infinite scroll with `IntersectionObserver` (NOT a "Load more" button) — sentinel element at bottom of feed triggers next page fetch.

### Backend (API Routes)

- **Pattern**: Next.js API Route Handlers in `src/app/api/` using Supabase server client.
- **Auth**: All API routes verify session via Supabase middleware.
- **Pagination**: Cursor-based for Kudos feed (`/api/kudos?cursor=<id>&limit=10`).
- **API consolidation**: `/api/users/me/stats` returns both Kudos stats AND Secret Box counts in a single response (consolidated from spec's separate endpoints).

### Reusable Components from Existing Codebase

| Existing Component | Reuse |
|---|---|
| `<Header />` + `<HeaderNav />` | Page header with nav links — reuse as-is |
| `<Footer />` | Page footer — reuse as-is |
| `<ProfileDropdown />` | User dropdown — reuse as-is |
| `<ChevronDownIcon />` | Filter dropdown indicator — reuse as-is |
| `<ArrowUpRightIcon />` | "Xem chi tiết" link icon — reuse as-is |
| `<SaaMiniIcon />` | Star/asterisk before KUDOS text — reuse as-is |
| `HEADER_NAV_LINKS`, `FOOTER_NAV_LINKS` | Nav link data from `homepage-data.ts` |
| All CSS variables in `globals.css` | Color tokens, shadows, fonts — reuse |

### Integration Points

- **Existing Services**: Supabase Auth (session verification), Supabase PostgreSQL (data queries)
- **Shared Components**: Header, Footer, ProfileDropdown, 18 icon components
- **API Contracts**: Predicted — all API routes return mock data until database schema is available

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/2940-13431-Sun-Kudos-Live-board/
├── spec.md              # Feature specification (7th pass)
├── design-style.md      # Design specifications (7th pass)
├── plan.md              # This file (4th pass)
└── tasks.md             # Task breakdown (next step)
```

### Already Implemented ✅

These files already exist and are functional:

| File | Status |
|---|---|
| `src/app/sun-kudos/page.tsx` | ✅ Scaffolded with full layout pattern |
| `src/app/sun-kudos/loading.tsx` | ✅ Full-page skeleton |
| `src/app/sun-kudos/error.tsx` | ✅ Error boundary with retry |
| `src/app/sun-kudos/not-found.tsx` | ✅ 404 page |
| `src/types/kudos.ts` | ✅ All TypeScript interfaces defined |
| `src/utils/sun-kudos-data.ts` | ✅ All Vietnamese text constants |
| `src/components/sun-kudos/SectionHeader.tsx` | ✅ With tests |
| `src/components/sun-kudos/UserInfo.tsx` | ✅ With tests |
| `src/components/sun-kudos/HeartButton.tsx` | ✅ With tests |
| `src/components/sun-kudos/CopyLinkButton.tsx` | ✅ With tests |
| `src/components/icons/HeartIcon.tsx` | ✅ Filled/outline variants |
| `src/components/icons/CopyLinkIcon.tsx` | ✅ |
| `src/components/icons/SearchIcon.tsx` | ✅ |
| `src/components/icons/StarIcon.tsx` | ✅ |
| `src/components/icons/ArrowRightIcon.tsx` | ✅ |
| `src/components/icons/GiftBoxIcon.tsx` | ✅ |
| `public/images/sun-kudos/keyvisual.png` | ✅ Asset placed |
| `public/images/sun-kudos/kudos-logo.svg` | ✅ Asset placed |
| `src/app/globals.css` — `--color-heart-gray`, `--color-overlay-dark` | ✅ Already added |

### Remaining New Files

| File | Purpose |
|---|---|
| **Components — KV Banner** | |
| `src/components/sun-kudos/KVBanner.tsx` | Hero content: title, KUDOS logo, input bar, search bar (Server Component) |
| `src/components/sun-kudos/KudosInputBar.tsx` | Pill-shaped input placeholder → opens write dialog (Client) |
| `src/components/sun-kudos/SunnerSearchBar.tsx` | Search bar for Sunner profiles with debounced dropdown (Client) |
| **Components — Highlight Kudos** | |
| `src/components/sun-kudos/HighlightKudos.tsx` | Section wrapper: header, filters, carousel (Client) |
| `src/components/sun-kudos/HighlightKudoCard.tsx` | Individual highlight card |
| `src/components/sun-kudos/FilterDropdown.tsx` | Reusable dropdown for Hashtag/Department filters (Client) |
| `src/components/sun-kudos/CarouselControls.tsx` | Prev/Next buttons + page indicator |
| **Components — Spotlight Board** | |
| `src/components/sun-kudos/SpotlightBoard.tsx` | Interactive SVG word cloud (Client) |
| `src/components/sun-kudos/SpotlightSearch.tsx` | Spotlight search bar (Client) |
| **Components — All Kudos Feed** | |
| `src/components/sun-kudos/AllKudosSection.tsx` | Section header + two-column layout: feed + sidebar (Client — manages `selectedHashtag`) |
| `src/components/sun-kudos/KudosFeed.tsx` | Infinite scroll feed with `IntersectionObserver` (Client) |
| `src/components/sun-kudos/KudoPostCard.tsx` | Individual Kudo card in feed |
| `src/components/sun-kudos/ImageGallery.tsx` | Image thumbnails row (max 5) with lightbox |
| `src/components/sun-kudos/HashtagList.tsx` | Clickable hashtag tags (max 5 with ellipsis); `onHashtagClick` prop |
| **Components — Sidebar** | |
| `src/components/sun-kudos/StatsSidebar.tsx` | Personal stats + gift recipients (Client) |
| `src/components/sun-kudos/StatsOverview.tsx` | 5 stat rows + heart multiplier badge |
| `src/components/sun-kudos/GiftRecipientsList.tsx` | 5 recent recipients + "Xem thêm" button |
| **Icons** | |
| `src/components/icons/PenIcon.tsx` | Pen/write SVG (24px) — input bar prefix |
| `src/components/icons/PanZoomIcon.tsx` | Pan/zoom toggle SVG (24px) |
| `src/components/icons/PlayIcon.tsx` | Video play overlay SVG (32px) |
| **Hooks** | |
| `src/hooks/useKudosFeed.ts` | Fetch paginated Kudos feed (cursor-based, infinite scroll, supports hashtag/department filter) |
| `src/hooks/useHighlightKudos.ts` | Fetch top 5 highlights with filter support |
| `src/hooks/useUserStats.ts` | Fetch current user stats + secret box counts (merged endpoint) |
| `src/hooks/useGiftRecipients.ts` | Fetch recent gift recipients with load-more |
| `src/hooks/useSpotlightData.ts` | Fetch spotlight board data |
| `src/hooks/useLikeKudo.ts` | Like/unlike mutation with optimistic update |
| `src/utils/format-kudos.ts` | Utility: `formatHeartCount` (toLocaleString), `formatTimestamp` (HH:mm - MM/DD/YYYY) |
| **API Routes** | |
| `src/app/api/kudos/route.ts` | GET — paginated Kudos feed (query: cursor, limit, hashtag?, department?) |
| `src/app/api/kudos/highlights/route.ts` | GET — top 5 highlighted Kudos (query: hashtag?, department?) |
| `src/app/api/kudos/[id]/like/route.ts` | POST/DELETE — like/unlike |
| `src/app/api/kudos/spotlight/route.ts` | GET — spotlight board data (names + counts) |
| `src/app/api/users/me/stats/route.ts` | GET — user Kudos stats + Secret Box counts (consolidated) |
| `src/app/api/gifts/recent/route.ts` | GET — recent gift recipients (query: cursor?, limit=5) |
| `src/app/api/hashtags/route.ts` | GET — available hashtags for filter |
| `src/app/api/departments/route.ts` | GET — departments list for filter |
| `src/app/api/users/search/route.ts` | GET — search Sunner profiles by name (query: q, limit?) |

### Test Files

Tests co-located in `__tests__/` subdirectories:

| Test File | Tests For |
|---|---|
| **Already exist ✅** | |
| `src/components/sun-kudos/__tests__/SectionHeader.test.tsx` | ✅ Section header rendering |
| `src/components/sun-kudos/__tests__/UserInfo.test.tsx` | ✅ User info display |
| `src/components/sun-kudos/__tests__/HeartButton.test.tsx` | ✅ Heart toggle, optimistic update |
| `src/components/sun-kudos/__tests__/CopyLinkButton.test.tsx` | ✅ Clipboard copy, toast |
| **Remaining** | |
| `src/components/sun-kudos/__tests__/KVBanner.test.tsx` | Banner rendering, input bar click, search bar |
| `src/components/sun-kudos/__tests__/HighlightKudos.test.tsx` | Carousel navigation, filter interaction, keyboard nav |
| `src/components/sun-kudos/__tests__/KudoPostCard.test.tsx` | Card rendering, image gallery, hashtag truncation |
| `src/components/sun-kudos/__tests__/KudosFeed.test.tsx` | Feed infinite scroll, empty state, hashtag filter |
| `src/components/sun-kudos/__tests__/StatsSidebar.test.tsx` | Stats display, Secret Box button, gift recipients, load-more |
| `src/components/sun-kudos/__tests__/SpotlightBoard.test.tsx` | SVG rendering, search highlight, pan/zoom toggle |
| `src/components/sun-kudos/__tests__/FilterDropdown.test.tsx` | Dropdown open/close, keyboard nav, ARIA |
| `src/components/sun-kudos/__tests__/AllKudosSection.test.tsx` | Two-column layout, hashtag filter state propagation |
| `src/components/sun-kudos/__tests__/SunnerSearchBar.test.tsx` | Debounce, dropdown results, keyboard nav |
| `src/hooks/__tests__/useKudosFeed.test.ts` | Cursor pagination, infinite scroll trigger, filter params |
| `src/hooks/__tests__/useLikeKudo.test.ts` | Optimistic update, error revert |
| `src/hooks/__tests__/useHighlightKudos.test.ts` | Highlight fetch, filter refetch |
| `src/hooks/__tests__/useUserStats.test.ts` | Stats fetch, consolidated response |
| `src/hooks/__tests__/useGiftRecipients.test.ts` | Load-more pagination |
| `src/hooks/__tests__/useSpotlightData.test.ts` | Spotlight data fetch |
| `src/utils/__tests__/format-kudos.test.ts` | formatHeartCount (comma separation), formatTimestamp (HH:mm - MM/DD/YYYY) |
| `src/app/api/kudos/__tests__/route.test.ts` | GET Kudos feed API, auth, pagination |
| `src/app/api/kudos/[id]/like/__tests__/route.test.ts` | POST/DELETE like API, auth |

### Modified Files

| File | Changes |
|---|---|
| `src/app/globals.css` | ✅ Already done — `--color-heart-gray` and `--color-overlay-dark` added |
| `src/app/sun-kudos/page.tsx` | Wire up section components incrementally per phase (KVBanner → Phase 1, HighlightKudos → Phase 2, AllKudosSection → Phase 3, SpotlightBoard → Phase 5) |
| `src/components/sun-kudos/CopyLinkButton.tsx` | **Fix**: (1) Add "Copy Link" text label next to icon (design shows text + icon, current is icon-only), (2) Change toast to fixed bottom-right positioning per design-style.md Toast spec (current is tooltip above button) |
| `src/components/sun-kudos/HeartButton.tsx` | **Fix**: Format `optimisticCount` with `toLocaleString()` for comma separation (e.g., "1,000") |

### Dependencies

No new dependencies required. All functionality achievable with:
- React 19 (useState, useReducer, useEffect, useCallback, useRef)
- Next.js 15 (App Router, Image, Link, API routes)
- Supabase SDK (existing)
- TailwindCSS v4 (existing)
- Vitest + Testing Library (existing, for tests)

**Spotlight Board justification**: Using native SVG `<text>` elements instead of a canvas library. SVG provides accessibility (screen readers can read text elements), simpler event handling (click/hover per element), and no bundle size increase. If performance degrades with 300+ names, migrate to `<canvas>` as follow-up.

---

## Implementation Approach

### Phase 1: KV Banner Section (US6, US7)

**Goal**: Hero section with KUDOS branding, input bar, and search bar.

> **Prereqs**: Foundation already complete (page.tsx scaffolded, types defined, icons created).

1. **Create `KVBanner.tsx`** — Content-only component (NO background-image):
   - Title "Hệ thống ghi nhận và cảm ơn" (24px Bold white)
   - `<SaaMiniIcon />` star + "KUDOS" logo (Montserrat Alternates 139.78px Bold, `var(--color-kudos-text)`, `text-shadow: var(--shadow-text-glow)`)
   - Input/Search row: `flex flex-col md:flex-row gap-4 md:gap-6 w-full justify-center`

2. **Create `KudosInputBar.tsx`** — Pill-shaped placeholder (click → opens write dialog stub)

3. **Create `SunnerSearchBar.tsx`** — Search input with `<SearchIcon />`, debounced (300ms)

4. **Create `PenIcon.tsx`** icon

5. **Wire up `page.tsx`**: Import and render `<KVBanner />` in the page shell (replace placeholder)

6. **Tests (US6, US7)**:
   - Render KVBanner, verify KUDOS logo text renders
   - Input bar click triggers callback
   - Search input renders with placeholder

### Phase 2: Highlight Kudos Carousel (US2)

**Goal**: Top 5 Kudos carousel with filter dropdowns.

> **Prereqs**: `<HeartButton />`, `<CopyLinkButton />`, `<UserInfo />`, `<SectionHeader />` already exist.

1. **Create `FilterDropdown.tsx`** — Reusable dropdown (follows `<ProfileDropdown />` pattern):
   - Click-outside to close, keyboard nav (arrow keys, Enter, Escape)
   - ARIA: `role="listbox"`, `aria-expanded`, `role="option"`, `aria-selected`
   - Reuses `<ChevronDownIcon />`

2. **Create `HighlightKudoCard.tsx`** — Card showing:
   - Sender/receiver `<UserInfo size="small" />` (32px avatar), arrow icon between them
   - Timestamp (14px, white 50% opacity) + title label (14px Bold gold, e.g., "IDOL GIỚI TRẺ")
   - Content (16px Regular white, max 3 lines via `line-clamp-3`)
   - Hashtags, `<HeartButton />`, `<CopyLinkButton />`
   - "Xem chi tiết" link with `<ArrowUpRightIcon />` (hover: gold)
   - Heart count formatted with comma separator (`toLocaleString()`)

3. **Create `CarouselControls.tsx`** — Prev/Next buttons (48px circle, border gold) with disabled states (opacity 0.3) + page indicator (`currentPage/5`)

4. **Create `HighlightKudos.tsx`** — Section wrapper:
   - `<SectionHeader title="HIGHLIGHT KUDOS" />`
   - Filter row: Hashtag + Department `<FilterDropdown />`
   - Responsive carousel:
     - **Desktop (≥1024px)**: 3 cards visible, center featured (`scale(1)`), side cards `scale(0.85) opacity-60`. CSS `translateX` (300ms ease-in-out).
     - **Mobile (<1024px)**: 1 card visible, touch swipe support.
   - Arrow key support (left/right)
   - ARIA: `role="region"`, `aria-label="Highlight Kudos"`, slides with `aria-roledescription="slide"`

5. **Create `useHighlightKudos.ts`** hook — Fetch top 5, refetch on filter change

6. **Create API routes**:
   - `src/app/api/kudos/highlights/route.ts`
   - `src/app/api/hashtags/route.ts`
   - `src/app/api/departments/route.ts`

7. **Wire up `page.tsx`**: Import and render `<HighlightKudos />` in the page shell (replace placeholder)

8. **Tests (US2)**: Carousel navigation, disabled states, keyboard nav, filter dropdown open/close/select, responsive layout

### Phase 3: All Kudos Feed + Two-Column Layout (US1, US3, FR-012)

**Goal**: Full paginated feed with Kudo post cards, two-column layout, and shared interaction hooks.

> **NOTE**: This phase also creates `useLikeKudo` hook and the like API route (US3), which are shared by Phase 2 (HighlightKudoCard) and Phase 3 (KudoPostCard). If Phase 2 is built before Phase 3, HighlightKudoCard should use a no-op `onToggle` stub until this hook is available.

0. **Create `src/utils/format-kudos.ts`** — Shared utilities:
   - `formatHeartCount(count: number): string` — `count.toLocaleString('en-US')` (e.g., 1000 → "1,000")
   - `formatTimestamp(date: Date | string): string` — formats to `HH:mm - MM/DD/YYYY` (e.g., "16:00 - 10/30/2025")

1. **Create `AllKudosSection.tsx`** — Section wrapper + two-column layout:
   - `<SectionHeader title="ALL KUDOS" />`
   - `flex flex-col lg:flex-row gap-8 lg:gap-10 w-full max-w-[1152px]`
   - Manages `selectedHashtag` state for FR-012
   - Left: `<KudosFeed />` (flex-1), Right: `<StatsSidebar />` (w-full lg:w-80)

2. **Create `KudoPostCard.tsx`** — Feed card:
   - Sender/receiver `<UserInfo />` (48px avatar) with `<ArrowRightIcon />` between
   - Timestamp (formatted `HH:mm - MM/DD/YYYY`) + title label (bold gold)
   - Content with 5-line truncation (CSS `line-clamp-5`)
   - `<ImageGallery />` (hidden when no images)
   - `<HashtagList />` (hidden when no hashtags), `onHashtagClick` prop
   - `<HeartButton />` + `<CopyLinkButton />` — heart count comma-formatted
   - ARIA: `role="article"`, bottom border `var(--color-border-footer)`

3. **Create `ImageGallery.tsx`** — Horizontal row of square thumbnails (max 5, gap 8px, border-radius 8px). Click → full-size view. Video thumbnail → `<PlayIcon />` overlay with dark semi-transparent background.

4. **Create `HashtagList.tsx`** — Clickable hashtag badge tags (bg: `var(--color-btn-secondary-bg)`, rounded, 14px Bold gold). Max 5 with "..." truncation. `onHashtagClick(tag: string)` callback for FR-012.

5. **Create `KudosFeed.tsx`** — **Infinite scroll** feed:
   - Uses `IntersectionObserver` on a sentinel element at the bottom
   - When sentinel enters viewport → fetch next page
   - Shows loading spinner at bottom while fetching
   - Accepts `selectedHashtag` prop to filter
   - ARIA: `role="feed"`

6. **Create `useKudosFeed.ts`** hook — Cursor-based pagination, 10 items per page, supports `hashtag` and `department` query params. Uses `IntersectionObserver` callback to trigger next page.

7. **Create API route `src/app/api/kudos/route.ts`** — GET with cursor, limit, optional hashtag/department filters.

8. **Create `PlayIcon.tsx`** icon

9. **Create `useLikeKudo.ts`** hook — POST/DELETE `/api/kudos/{id}/like` with optimistic update + revert

10. **Create API route `src/app/api/kudos/[id]/like/route.ts`** — POST (like) / DELETE (unlike)

11. **Fix existing `HeartButton.tsx`** — Update `{optimisticCount}` → `{formatHeartCount(optimisticCount)}` using the new utility

12. **Fix existing `CopyLinkButton.tsx`** — (a) Add "Copy Link" text label next to icon, (b) Move toast to fixed bottom-right per design-style.md Toast spec

13. **Wire up `page.tsx`**: Import and render `<AllKudosSection />` in the page shell (replace placeholder)

14. **Tests (US1, US3, FR-012)**: Card rendering, content truncation, image gallery, video overlay, hashtags truncation, infinite scroll pagination, empty state, hashtag click → filter, formatHeartCount/formatTimestamp utility tests

### Phase 4: Stats Sidebar (US4)

**Goal**: Personal stats, Secret Box, and gift recipients.

> **Prereqs**: `StatsSidebar` component can be developed independently. Integration into `<AllKudosSection />` requires Phase 3's container to exist. If developing in parallel with Phase 3, create StatsSidebar as standalone; wire into AllKudosSection when both are ready.

1. **Create `StatsOverview.tsx`** — 5 stat rows:
   - Label: 16px Bold white; Value: 24px Bold gold (comma-formatted via `toLocaleString()`)
   - Rows: Kudos received, Kudos sent, Hearts received (with static "x2" heart multiplier badge), separator, Secret Boxes opened, Secret Boxes unopened
   - "Mở Secret Box" button (full-width, border gold, bg yellow-subtle, `<GiftBoxIcon />`)
   - **Edge case**: When user has 0 unopened Secret Boxes → button disabled (`opacity: 0.3`, `cursor: not-allowed`)

2. **Create `GiftRecipientsList.tsx`** — Recent gift recipients:
   - Title: "10 SUNNER NHẬN QUÀ MỚI NHẤT" (16px Bold gold)
   - Shows 5 visible + "Xem thêm" button → loads next 5 (appends)
   - Recipient row: avatar 40px, red dot 8px, name (14px Bold), description (14px Regular)

3. **Create `StatsSidebar.tsx`** — Wrapper:
   - `<StatsOverview />` + `<GiftRecipientsList />`
   - Sticky: `lg:sticky lg:top-[100px]`
   - ARIA: `role="complementary"`, `aria-label="Your Kudos statistics"`

4. **Create hooks**:
   - `useUserStats.ts` — Fetch from `/api/users/me/stats` (consolidated: Kudos stats + Secret Box counts)
   - `useGiftRecipients.ts` — Fetch from `/api/gifts/recent` with cursor-based load-more

5. **Create API routes**:
   - `src/app/api/users/me/stats/route.ts`
   - `src/app/api/gifts/recent/route.ts`

6. **Tests (US4)**: Stat values display, heart multiplier badge, Secret Box button states (enabled/disabled), gift recipients rendering, load-more

### Phase 5: Spotlight Board (US5)

**Goal**: Interactive SVG word cloud visualization.

1. **Create `SpotlightBoard.tsx`** — SVG word cloud:
   - `<SectionHeader title="SPOTLIGHT BOARD" />`
   - Board container: `rounded-2xl overflow-hidden bg-[rgba(0,16,26,0.9)]`
   - Toolbar: total Kudos count (24px Bold white), `<SpotlightSearch />`, pan/zoom toggle
   - SVG canvas with `<text>` elements: sizes 12px–36px based on Kudos count, white/gold colors
   - Pan/zoom: CSS `transform: scale() translate()` with pointer events
   - ARIA: `role="img"`, `aria-label="Spotlight Board — interactive word cloud of Kudos recipients"`

2. **Create `SpotlightSearch.tsx`** — Search input (type → matching name highlighted)

3. **Create `useSpotlightData.ts`** hook

4. **Create API route `src/app/api/kudos/spotlight/route.ts`**

5. **Create `PanZoomIcon.tsx`** icon

6. **Wire up `page.tsx`**: Import and render `<SpotlightBoard />` in the page shell (replace placeholder)

7. **Tests (US5)**: SVG renders text elements, search highlights match, pan/zoom toggle

### Phase 6: Search & Remaining API (US7)

1. **Create `src/app/api/users/search/route.ts`** — Search Sunner profiles by name. Input validation: `q` must be string, `limit` must be number 1-20.

2. **Enhance `SunnerSearchBar.tsx`** — Debounced search input (300ms), dropdown results with avatar + name + department. Keyboard navigation: arrow keys in dropdown, Enter to select.

3. **Tests (US7)**: Debounce behavior, results display, keyboard navigation

### Phase 7: Polish & Accessibility

1. **Loading states**: Skeleton placeholders for each section (per design-style.md Skeleton Loading specs):
   - Kudo Card: `h-[280px]`, `animate-pulse`, `bg-[rgba(255,234,158,0.05)]`
   - Sidebar stat: `h-6 w-full` per row
   - Carousel card: `h-[400px] w-[400px] rounded-2xl`
   - Spotlight Board: `h-[400px] w-full rounded-2xl`

2. **Error states**: Per-section error with "Thử lại" (retry) button — not full-page error.

3. **Offline banner**: Detect `navigator.onLine` / online/offline events → dismissible banner.

4. **Empty states**: "Hãy là người đầu tiên gửi lời cảm ơn!" when no Kudos.

5. **Toast notification**: Per design-style.md Toast specs — fixed bottom-right, gold border, auto-dismiss 3s.

6. **Focus indicators**: `outline: 2px solid #FFEA9E` with `outline-offset: 2px` on all interactive elements.

7. **Responsive fine-tuning**: Test at 320px, 768px, 1024px. Verify touch targets ≥ 44×44px.

8. **ESLint**: Zero warnings across all new files.

9. **Performance**: LCP < 2.5s (TR-001). Keyvisual image uses `priority` + `sizes="100vw"`.

> **NOTE**: Page wiring is handled incrementally per phase (Phases 1–5 each wire up their section). No bulk wiring needed here.

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: Carousel ↔ Filter, Feed ↔ Hashtag filter, Sidebar ↔ Load-more
- [x] **External dependencies**: Supabase client for all API routes
- [x] **Data layer**: Supabase PostgreSQL via API routes (mock until schema ready)
- [x] **User workflows**: Heart toggle end-to-end, Copy link → clipboard → toast, Hashtag click → feed filter

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Heart toggle, carousel navigation, infinite scroll, filter → refetch |
| App ↔ External API | Yes | All hooks ↔ API routes (mocked Supabase) |
| App ↔ Data Layer | Yes | API routes ↔ Supabase queries |
| Cross-platform | Yes | Responsive carousel (1 vs 3 cards), sidebar stacking |

### Test Environment

- **Environment type**: Local (jsdom via Vitest)
- **Test data strategy**: Mock data objects matching `src/types/kudos.ts` interfaces
- **Isolation approach**: Fresh state per test (no shared mutable state per constitution)

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase client | Mock | No database schema yet; all APIs predicted |
| Clipboard API | Mock | jsdom doesn't support `navigator.clipboard` |
| IntersectionObserver | Mock | jsdom doesn't support IntersectionObserver |
| `next/navigation` | Mock | Standard for Next.js component testing |
| `next/image` | Pass-through | Testing Library renders as `<img>` |

### User Story → Integration Test Mapping

| User Story | Integration Test |
|---|---|
| US1 — View All Kudos Feed | Feed renders with mock data; infinite scroll loads next page; empty state shown; hashtag filter works |
| US2 — Highlight Carousel | 5 cards in carousel; filter changes refetch; nav disabled at bounds; keyboard nav |
| US3 — Like and Copy Link | HeartButton → useLikeKudo → API mock → count updates/reverts (comma-formatted); CopyLink → clipboard + fixed toast |
| US4 — Personal Stats | 5 stat rows display; gift recipients load-more; Secret Box button disabled at 0 |
| US5 — Spotlight Board | SVG renders names; search highlights match; pan/zoom toggle |
| US6 — Open Write Dialog | Input bar click fires callback |
| US7 — Search Sunner | Type name → debounced → dropdown shows results |

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Component rendering & interaction | 80%+ | High |
| Custom hooks (data fetching, mutations) | 80%+ | High |
| Utility functions (format-kudos.ts: formatHeartCount, formatTimestamp) | 100% | High |
| API routes | 70%+ | Medium |
| Accessibility (ARIA, keyboard) | Manual + aXe | Medium |

### Tooling & Framework

- **Test framework**: Vitest 4.x (jsdom environment)
- **Supporting tools**: @testing-library/react, @testing-library/user-event, @testing-library/jest-dom
- **CI integration**: Tests run via `vitest run` in CI pipeline; merge blocked on failure

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Spotlight Board performance with 300+ names | Medium | Medium | Start with SVG; profile at 300 names. Fall back to `<canvas>` if FPS < 30. Lazy-load (render when scrolled into view) |
| No database schema yet (APIs are "Predicted") | High | High | All hooks use mock data. API routes return mock JSON initially. Replace with real Supabase queries when schema available. Types designed to match expected schema |
| Carousel custom implementation (3-card desktop) | Medium | Medium | 3-visible layout with center-featured card (scale/opacity transitions). CSS `translateX` + `scale()`. More complex than single-card but avoids external library |
| Missing Figma frames for dialogs | Low | Low | Implement as placeholder callbacks/stubs. "Out of Scope" per spec |
| Large number of remaining components (~20) | Medium | Medium | Phase-based approach: each section independently testable and deployable |
| Infinite scroll edge cases (race conditions, duplicate items) | Medium | Medium | Cursor-based pagination avoids duplicates. Debounce `IntersectionObserver` callback. Guard against concurrent fetches with `isFetching` flag |
| Heart count formatting across locales | Low | Low | Use `toLocaleString('en-US')` for consistent comma separation regardless of browser locale |

### Estimated Complexity

- **Frontend**: High (carousel, spotlight SVG, infinite scroll, optimistic UI)
- **Backend**: Low (straightforward API routes, mock data initially)
- **Testing**: Medium (mock IntersectionObserver, Supabase client, clipboard API)

---

## Open Questions

- [x] Heart multiplier badge "x2" — static or dynamic? → **Static** (confirmed)
- [x] Gift recipients — scrollable or load more? → **"Xem thêm" load more button** (confirmed)
- [x] Feed pagination — infinite scroll or "Load more" button? → **Infinite scroll** (confirmed in spec 7th pass)
- [x] Heart count formatting — plain number or comma-separated? → **Comma-separated** (confirmed in spec 7th pass, Figma shows "1,000")
- [x] 0 Secret Boxes edge case? → **Button disabled** (confirmed in spec 7th pass)
- [ ] Database schema — tables for `kudos`, `users`, `likes`, `hashtags`, `secret_boxes`, `gifts` not yet defined. API routes will use mock data until schema is available.
- [ ] Secret Box dialog (frame `1466:7676`) — separate implementation. Button triggers navigation/modal open only.
- [ ] Write Kudo dialog (frame `520:11602`) — separate implementation. Input bar triggers callback only.
- [ ] Profile hover preview (US1-S4) — deferred. Initial implementation uses `<Link>`. Hover popover is follow-up.

---

## Dependency Graph

```
[Already Complete] ✅
  Foundation: types, utils, page shell, icons, shared components
  (SectionHeader, UserInfo, HeartButton, CopyLinkButton, all icons)
    │
    ├─→ Phase 1 (KV Banner — US6, US7) — independent
    │
    ├─→ Phase 2 (Highlight Carousel — US2) — independent
    │     └─ NOTE: HeartButton onToggle uses stub until useLikeKudo (Phase 3) is ready
    │
    ├─→ Phase 3 (All Kudos Feed — US1, US3, FR-012) — independent; creates useLikeKudo shared hook
    │
    ├─→ Phase 4 (Stats Sidebar — US4) — component dev is independent; integration wiring needs Phase 3
    │
    ├─→ Phase 5 (Spotlight Board — US5) — independent
    │
    └─→ Phase 6 (Search API — US7 enhancement) — needs SunnerSearchBar from Phase 1
          │
          └─→ Phase 7 (Polish) — after all phases
```

**Parallelizable immediately** (all foundation work is done):
- Phase 1, Phase 2, Phase 3, Phase 4 (component dev only), Phase 5 — can all start in parallel
- Phase 4 integration wiring — requires Phase 3's `<AllKudosSection />` container
- Phase 2 heart toggle — fully functional after Phase 3 creates `useLikeKudo` (use stub `onToggle` until then)
- Phase 6 — depends on Phase 1 (SunnerSearchBar base)
- Phase 7 — after all other phases

**Recommended execution order**: [1 ∥ 2 ∥ 3 ∥ 4 ∥ 5] → [6 + wire Phase 4 into Phase 3] → 7

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order (start with Phase 1 + 3 for MVP)
