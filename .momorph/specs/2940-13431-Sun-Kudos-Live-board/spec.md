# Feature Specification: Sun* Kudos - Live Board

**Frame ID**: `2940:13431`
**Frame Name**: `Sun* Kudos - Live board`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-16
**Status**: Reviewed (8th pass — Highlight Kudo Card UI correction from Figma)

---

## Overview

The Sun* Kudos Live Board is the main interactive page for the Sun* Annual Awards 2025 recognition system. It enables employees ("Sunners") to send, view, and interact with appreciation messages (Kudos). The page features a hero banner, a highlight carousel of top Kudos, an interactive Spotlight word-cloud board, a full feed of all Kudos, and a personal stats sidebar with Secret Box gamification.

**Target Users**: All Sun* employees (Sunners) participating in SAA 2025
**Business Context**: Drives employee engagement and peer-to-peer recognition during the Sun* Annual Awards 2025 campaign

---

## User Scenarios & Testing

### User Story 1 - View All Kudos Feed (Priority: P1)

A Sunner visits the Kudos Live Board to browse all appreciation messages posted by colleagues in a scrollable feed.

**Why this priority**: The core value of the page — displaying all Kudos — is the foundation for every other interaction. Without this, nothing else works.

**Independent Test**: Render the page with mock Kudos data and verify the feed displays cards with sender info, recipient info, timestamp, content, hashtags, image gallery, heart count, and copy link button.

**Acceptance Scenarios**:

1. **Given** the user is authenticated and navigates to `/sun-kudos`, **When** the page loads, **Then** the ALL KUDOS section displays a list of Kudo cards sorted by most recent, each showing sender avatar/name, recipient avatar/name, timestamp (`HH:mm - MM/DD/YYYY`), category label (e.g., "IDOL GIỚI TRẺ" — bold gold text next to timestamp), message content (max 5 lines with ellipsis), attached images (max 5 thumbnails), hashtags (max 5 with ellipsis), heart count (formatted with comma separator, e.g., "1,000"), and a "Copy Link" button.
2. **Given** a Kudo has more than 5 lines of content, **When** displayed in the feed, **Then** the text is truncated with "..." after 5 lines.
3. **Given** a Kudo has attached images, **When** displayed, **Then** up to 5 square thumbnails are shown in a horizontal row. Clicking an image opens it full-size. If an attachment is a video, a play icon (▶) overlay is shown on the thumbnail.
4. **Given** the user clicks a sender/recipient avatar or name, **When** hovering, **Then** a profile preview appears. Clicking navigates to the user's profile.

---

### User Story 2 - Highlight Kudos Carousel (Priority: P1)

A Sunner views the top 5 most-liked Kudos in an interactive carousel at the top of the page.

**Why this priority**: Highlights drive engagement by showcasing the best appreciation messages and encouraging more participation.

**Independent Test**: Render the Highlight section with 5 mock Kudos and verify carousel navigation (prev/next buttons, page indicator), card content display, and filter dropdowns.

**Acceptance Scenarios**:

1. **Given** the page loads, **When** the Highlight Kudos section renders, **Then** it displays a carousel of the top 5 Kudos by heart count with navigation arrows and a page indicator showing `currentPage/5`.
2. **Given** the carousel is on page 1, **When** the user clicks the "previous" button, **Then** the button is disabled.
3. **Given** the carousel is on page 5, **When** the user clicks the "next" button, **Then** the button is disabled.
4. **Given** the user clicks the "Hashtag" filter button, **When** the dropdown opens, **Then** it shows a list of available hashtags from the database. Selecting a hashtag filters the highlighted Kudos.
5. **Given** the user clicks the "Phong ban" (Department) filter button, **When** the dropdown opens, **Then** it shows a list of departments. Selecting a department filters the highlighted Kudos.
6. **Given** a Highlight Kudo card is displayed, **When** viewed, **Then** it shows on a **light cream background** (#FFF8E1): sender avatar (64px circle) and recipient avatar (64px circle) **centered side by side** with arrow icon between them, each with name, department, and colored Hero title badge below; timestamp (`HH:mm - MM/DD/YYYY`); category label (bold uppercase, e.g., "IDOL GIỚI TRẺ"); content in a **cream inner box** (max 3 lines with ellipsis); hashtags in red/coral text; and an actions bar with heart count (comma-formatted), "Sao chép link" button, and "Xem chi tiết" (View detail) link. The **center/featured card** has a gold border (2px #FFEA9E), side cards have muted border and reduced opacity.

---

### User Story 3 - Like and Copy Link on Kudos (Priority: P2)

A Sunner interacts with Kudos by liking them or copying their share links.

**Why this priority**: Core social interaction features that drive engagement and viral sharing.

**Independent Test**: Render a Kudo card and verify heart toggle and copy link functionality.

**Acceptance Scenarios**:

1. **Given** the user has not liked a Kudo, **When** they click the heart icon, **Then** the heart turns red, the count increments by 1, and the like is persisted to the database.
2. **Given** the user has already liked a Kudo, **When** they click the heart icon again, **Then** the heart turns gray, the count decrements by 1, and the unlike is persisted.
3. **Given** the user clicks "Copy Link" on a Kudo, **When** the action completes, **Then** the Kudo URL is copied to clipboard and a toast notification appears: "Link copied — ready to share!"

---

### User Story 4 - Personal Stats Sidebar (Priority: P2)

A Sunner views their personal Kudos statistics and Secret Box status in the right sidebar.

**Why this priority**: Personal stats motivate continued participation and Secret Box gamification drives engagement.

**Independent Test**: Render the sidebar with mock user stats and verify all 5 stat rows (with heart multiplier badge on the hearts row) and the "Mo qua" (Open gift) button.

**Acceptance Scenarios**:

1. **Given** the user is authenticated, **When** the sidebar loads, **Then** it displays: "So Kudos ban nhan duoc" (received count), "So Kudos ban da gui" (sent count), "So tim ban nhan duoc" (hearts received — with a fixed "x2" heart multiplier badge), a separator, "So Secret Box ban da mo" (opened boxes), "So Secret Box chua mo" (unopened boxes).
2. **Given** the user has unopened Secret Boxes, **When** they click "Mo Secret Box" button, **Then** the Secret Box dialog opens (links to frame `1466:7676`).
3. **Given** the sidebar loads, **When** the "10 SUNNER NHAN QUA MOI NHAT" section renders, **Then** it shows 5 most recent gift recipients with avatar, red dot indicator, name, and gift description, plus a "Xem thêm" (Load more) button to reveal the next batch.
4. **Given** the user clicks "Xem thêm" on the gift recipients list, **When** the action completes, **Then** the next 5 recipients are appended below the existing ones.

---

### User Story 5 - Spotlight Board (Priority: P2)

A Sunner explores the Spotlight Board — an interactive word-cloud/diagram visualization of Kudos recipients.

**Why this priority**: Provides a unique, engaging visualization that differentiates the platform and shows community-wide recognition patterns.

**Independent Test**: Render the Spotlight Board section with mock data and verify the total count, search, pan/zoom controls, and interactive name labels.

**Acceptance Scenarios**:

1. **Given** the page loads, **When** the Spotlight Board section renders, **Then** it displays a canvas/diagram with recipient names arranged as an interactive word cloud, a header showing total Kudos count (e.g., "388 KUDOS"), and a search bar.
2. **Given** the user types a name in the search bar, **When** searching, **Then** the matching Sunner is highlighted on the board.
3. **Given** the user clicks the pan/zoom icon, **When** toggled, **Then** the board enters pan/zoom mode allowing drag-to-pan and scroll-to-zoom. Hovering shows tooltip "Pan/Zoom".

---

### User Story 6 - Open Kudos Write Dialog (Priority: P3)

A Sunner initiates sending a new Kudo by clicking the input bar in the hero section.

**Why this priority**: Writing Kudos is essential but the dialog itself is a separate frame/feature (`520:11602` - "Viet Kudo").

**Independent Test**: Render the hero section and verify that clicking the input bar triggers the dialog open action.

**Acceptance Scenarios**:

1. **Given** the page is loaded, **When** the user clicks the pill-shaped input bar with placeholder "Hom nay, ban muon gui loi cam on va ghi nhan den ai?", **Then** the Kudo write dialog opens.

---

### User Story 7 - Search Sunner Profile (Priority: P3)

A Sunner searches for another Sunner's profile using the search bar in the hero section.

**Why this priority**: Secondary discovery feature that enhances the browsing experience.

**Independent Test**: Render the hero section and verify the search input with magnifying glass icon.

**Acceptance Scenarios**:

1. **Given** the user types a name in the search bar ("Tim kiem profile Sunner"), **When** results match, **Then** a dropdown of matching Sunner profiles appears.

---

### Edge Cases

- What happens when there are no Kudos yet? → Display empty state with encouragement message (e.g., "Hãy là người đầu tiên gửi lời cảm ơn!").
- What happens when a Kudo has no images? → Image gallery section is hidden; no empty placeholder.
- What happens when a Kudo has video attachments? → Display thumbnail with a play icon (▶) overlay. Clicking opens the video player (inline or modal — implementation decision).
- What happens when a Kudo has no hashtags? → Hashtag row is hidden.
- What happens when hashtag list exceeds 5 items? → Truncate with "..." after 5 tags.
- What happens when the user is not authenticated? → Redirect to login via middleware (existing pattern).
- What happens when API fails to load Kudos? → Show error state with "Thử lại" (retry) button.
- What happens when Spotlight Board has too many names? → Pan/zoom controls allow navigation; names scale by Kudos count.
- What happens when the user scrolls past the sidebar? → Sidebar is sticky (`position: sticky; top: 100px`) and stays visible.
- What happens when user clicks their own heart on a Kudo they sent? → Allowed — no self-like restriction visible in design.
- What happens when a new user has 0 Secret Boxes (none opened, none unopened)? → Show "0" for both counts; "Mở Secret Box" button is disabled with `opacity: 0.3` and `cursor: not-allowed`.
- What happens when heart count exceeds 999? → Display with comma separator (e.g., "1,000", "10,000"). Use `toLocaleString()` or equivalent formatting.
- What happens on slow network? → Skeleton loading states for feed cards, sidebar stats, and carousel.

---

## UI/UX Requirements

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| KV Banner | 2940:13437 | Hero banner with title, KUDOS logo, input bar, search | Click input → open dialog |
| Button Ghi Nhan | 2940:13449 | Pill-shaped input placeholder | Click → open write dialog |
| Highlight Section | 2940:13451 | Carousel of top 5 Kudos | Filter by hashtag/department |
| Hashtag Filter | 2940:13459 | Dropdown button for hashtag filtering | Click → dropdown |
| Department Filter | 2940:13460 | Dropdown button for department filtering | Click → dropdown |
| Carousel Controls | 2940:13468, 2940:13470 | Prev/Next buttons | Click → slide |
| Page Indicator | 2940:13471 | Shows current/total slides | Auto-update |
| Highlight Kudo Card | 2940:13465 | Card with sender/receiver, content, actions | Like, copy, view detail |
| Spotlight Board | 2940:14174 | Interactive word cloud visualization | Pan, zoom, search, click name |
| Spotlight Search | 2940:14833 | Search bar on Spotlight | Type → filter names |
| Pan/Zoom Control | 3007:17479 | Toggle pan/zoom mode | Click → toggle |
| Kudos Counter | 3007:17482 | Total kudos display (e.g., "388 KUDOS") | Read-only |
| All Kudos Section | 2940:13475 | Full feed of Kudo cards | Scroll, interact |
| Kudo Post Card | 3127:21871 | Individual Kudo in feed | Like, copy, click images |
| Stats Sidebar | 2940:13488 | Personal stats + gift recipients | View stats, open Secret Box |
| Stats Overview | 2940:13489 | 5 stat rows (hearts row has x2 multiplier badge) + open gift button | Click "Mo qua" |
| Open Gift Button | 2940:13497 | "Mo Secret Box" CTA | Click → open dialog |
| Gift Recipients List | 2940:13510 | 5 recent gift recipients + "Xem thêm" load more button | Click "Xem thêm" → load next 5 |
| Heart Multiplier Badge | 3241:14931 | "x2" heart multiplier on hearts stat row | Read-only |
| Hashtag Tag | 3127:21871;2234:33038 | Clickable hashtag label | Click → filter |
| Heart Button | 3127:21871;256:5175 | Like toggle (gray/red) | Click → toggle |
| Copy Link Button | 3127:21871;256:5194 | Copy Kudo URL | Click → clipboard |
| Search Bar | 2940:13450 | Pill-shaped search input for Sunner profiles | Type → search dropdown |
| Video Play Overlay | — | Play icon (▶) overlay on video thumbnails in image gallery | Click → play video |

### Navigation Flow

- **From**: Header nav → "Sun* Kudos" link
- **From**: Awards Information page → "Chi tiet" (Kudos promotion section)
- **To**: Write Kudo dialog (frame `520:11602`) → via input bar click
- **To**: Hashtag filter dropdown (frame `1002:13013`) → via Hashtag button
- **To**: Department filter dropdown (frame `721:5684`) → via Phong ban button
- **To**: Secret Box dialog (frame `1466:7676`) → via "Mo Secret Box" button
- **To**: User profile → via avatar/name click

### Visual Requirements

- **Responsive breakpoints**: Mobile (>=320px), Tablet (>=768px), Desktop (>=1024px)
- **Dark theme**: Primary background #00101A
- **Gold accent**: #FFEA9E for headings and highlights
- **Animations/Transitions**: Carousel slide transitions, heart toggle animation, toast notification
- **Accessibility**: Alt text for avatars, keyboard navigation for carousel, ARIA labels for interactive elements
- **Focus states**: All interactive elements (buttons, links, cards) MUST have visible focus indicators using `outline: 2px solid #FFEA9E` with `outline-offset: 2px`
- **ARIA roles**:
  - Carousel: `role="region"` with `aria-label="Highlight Kudos"`, slides use `aria-roledescription="slide"`, prev/next buttons use `aria-label="Previous slide"` / `"Next slide"`
  - Heart button: `role="button"` with `aria-pressed="true|false"` and `aria-label="Like this Kudo"`
  - Filter dropdowns: `role="listbox"` with `aria-expanded`, options use `role="option"` with `aria-selected`
  - Spotlight Board: `role="img"` with `aria-label="Spotlight Board — interactive word cloud of Kudos recipients"`
  - Stats sidebar: `role="complementary"` with `aria-label="Your Kudos statistics"`
  - Kudo feed: `role="feed"` with each card as `role="article"`

---

## State Management

### Local Component State
- **Carousel state**: `currentSlide` (0–4), managed by `<HighlightKudos />` or `<KudosCarousel />`
- **Heart toggle**: Per-card liked state with optimistic update, managed by `<HeartButton />`
- **Filter state**: Selected hashtag and department, managed by `<HighlightKudos />`
- **Spotlight pan/zoom**: Toggle state, managed by `<SpotlightBoard />`
- **Toast visibility**: Show/hide copy-link toast, auto-dismiss after 3s

### Server/API State
- **Kudos feed**: Paginated list from `/api/kudos` — use cursor-based pagination with infinite scroll (fetch next page when user scrolls near bottom of feed)
- **Highlight Kudos**: Top 5 from `/api/kudos/highlights` — fetched once on mount, refetched when filters change
- **User stats**: From `/api/users/me/stats` — fetched once on mount
- **Spotlight data**: From `/api/kudos/spotlight` — fetched once on mount
- **Gift recipients**: From `/api/gifts/recent` — fetched once on mount

### Loading States
- **Initial page load**: Skeleton placeholders for all sections
- **Feed pagination**: Loading spinner at bottom of feed while fetching next page
- **Heart toggle**: Optimistic UI — immediately toggle, revert on API error
- **Filter change**: Loading state on carousel while refetching highlights

### Error States
- **API failure**: Show error message with retry button per section (not full-page error)
- **Network offline**: Show offline banner at top of page

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST display a paginated feed of all Kudos sorted by most recent (cursor-based pagination, ~10 items per page, loaded via infinite scroll — no visible "Load more" button on the feed).
- **FR-002**: System MUST display a carousel of the top 5 most-liked Kudos with navigation controls.
- **FR-003**: Users MUST be able to like/unlike a Kudo with heart toggle (persisted to database).
- **FR-004**: Users MUST be able to copy a Kudo's shareable link to clipboard.
- **FR-005**: System MUST display personal stats (Kudos received/sent, hearts received, Secret Boxes opened/unopened).
- **FR-006**: System MUST display the Spotlight Board with an interactive word cloud of Kudos recipients.
- **FR-007**: Users MUST be able to filter Highlight Kudos by hashtag and department.
- **FR-008**: System MUST display 5 most recent gift recipients in the sidebar with a "Xem thêm" (Load more) button to load the next batch.
- **FR-009**: Users MUST be able to open the Kudo write dialog by clicking the hero input bar.
- **FR-010**: Users MUST be able to search for Sunner profiles via the search bar.
- **FR-011**: System MUST truncate Kudo content at 5 lines (feed) or 3 lines (highlight) with ellipsis.
- **FR-012**: Clicking a hashtag MUST filter the Kudos feed/highlights by that hashtag.

### Technical Requirements

- **TR-001**: Page MUST load within 3 seconds on desktop (LCP < 2.5s).
- **TR-002**: Carousel MUST support keyboard navigation (arrow keys).
- **TR-003**: Spotlight Board MUST render efficiently with 300+ names (canvas/SVG).
- **TR-004**: Heart toggle MUST use optimistic UI updates with server reconciliation.
- **TR-005**: All API calls MUST use authenticated Supabase client.

### Key Entities

- **Kudo**: Core entity — sender, recipient, content, title (free text, e.g., "IDOL GIỚI TRẺ"), is_anonymous, hashtags, images, hearts, timestamp.
- **User (Sunner)**: Name, avatar (from Gmail), department, star count, title.
- **Hashtag**: Tag label linked to Kudos.
- **SecretBox**: Gamification entity — opened/unopened status per user.
- **Heart/Like**: Many-to-many relationship between User and Kudo.

---

## API Dependencies — Supabase Integration

> **Database schema deployed**: `.momorph/contexts/database-schema.sql`
> **Seed data deployed**: `.momorph/contexts/database-seed.sql`

### Supabase RPC Functions (replace API routes)

| RPC Function | Purpose | Replaces | Status |
|-------------|---------|----------|--------|
| `get_kudos_feed(p_cursor, p_limit, p_hashtag, p_department_id)` | Paginated feed with filters | `/api/kudos` | ✅ Deployed |
| `get_highlight_kudos(p_hashtag, p_department_id)` | Top 5 by likes with filters | `/api/kudos/highlights` | ✅ Deployed |
| `toggle_kudo_like(p_kudo_id)` | Like/unlike toggle (uses auth.uid()) | `/api/kudos/{id}/like` | ✅ Deployed |
| `get_user_stats(p_user_id)` | Kudos received/sent, hearts, secret boxes | `/api/users/me/stats` | ✅ Deployed |
| `get_spotlight_data()` | Aggregated recipients for word cloud | `/api/kudos/spotlight` | ✅ Deployed |

### Direct Supabase Queries (no RPC needed)

| Query | Purpose | Replaces | Status |
|-------|---------|----------|--------|
| `supabase.from('gifts').select('*, recipient:profiles(*)').order('created_at', {ascending: false}).limit(10)` | Recent gifts | `/api/gifts/recent` | ✅ Ready |
| `supabase.from('hashtags').select('*')` | Available hashtags | `/api/hashtags` | ✅ Ready |
| `supabase.from('departments').select('*')` | Departments list | `/api/departments` | ✅ Ready |
| `supabase.from('profiles').select('*').ilike('name', '%query%').limit(10)` | Search profiles | `/api/users/search` | ✅ Ready |
| `supabase.from('kudo_media').select('*').eq('kudo_id', id)` | Media per kudo | N/A | ✅ Ready |

### Database Tables Used

| Table | Role | RLS |
|-------|------|-----|
| `profiles` | User profiles (extends auth.users) | Read: everyone, Update: own |
| `kudos` | Core kudo entity | Read: everyone, Insert: authenticated |
| `kudo_media` | Images/videos | Read: everyone |
| `kudo_hashtags` | M2M kudos↔hashtags | Read: everyone |
| `kudo_likes` | Heart/likes | Read: everyone, Insert/Delete: own |
| `hashtags` | Reference data | Read: everyone |
| `departments` | Reference data | Read: everyone |
| `categories` | Kudo categories | Read: everyone |
| `hero_titles` | User badges | Read: everyone |
| `secret_boxes` | Gamification | Read: own only |
| `gifts` | Gift recipients | Read: everyone |

### Hook → Supabase Mapping (IMPLEMENTED)

All hooks have been migrated from mock data to real Supabase queries:

| Hook | Supabase Call | Status |
|------|--------------|--------|
| `useKudosFeed` | `supabase.rpc('get_kudos_feed')` + profiles/media/likes joins | ✅ Done |
| `useHighlightKudos` | `supabase.rpc('get_highlight_kudos')` + profiles/media/likes joins | ✅ Done |
| `useLikeKudo` | `supabase.rpc('toggle_kudo_like')` with auth check | ✅ Done |
| `useUserStats` | `supabase.rpc('get_user_stats')` with auth.uid() | ✅ Done |
| `useSpotlightData` | `supabase.rpc('get_spotlight_data')` | ✅ Done |
| `useGiftRecipients` | `supabase.from('gifts').select('*, recipient:profiles(...)')` | ✅ Done |

> **NOTE**: Filter dropdowns (hashtags, departments) still use mock data in `HighlightKudos.tsx`. These should be migrated to direct Supabase queries when connecting filters to real data.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: All Kudos are displayed correctly with full sender/recipient info, content, hashtags, images, and actions.
- **SC-002**: Carousel navigates smoothly between 5 highlighted Kudos with correct disable states.
- **SC-003**: Heart like/unlike persists correctly and updates count in real-time.
- **SC-004**: Copy link copies correct URL and shows toast notification.
- **SC-005**: Personal stats sidebar displays accurate counts from the database.
- **SC-006**: Spotlight Board renders all names interactively with search and pan/zoom.

---

## Out of Scope

- Kudo creation/write dialog (separate frame `520:11602` - "Viet Kudo")
- Secret Box opening dialog (separate frame `1466:7676`)
- Hashtag dropdown detail (separate frame `1002:13013`)
- Department dropdown detail (separate frame `721:5684`)
- User profile page
- Admin features
- Real-time WebSocket updates (can be added later)
- ~~Internationalization~~ — **DONE**: i18n system deployed with VN/EN support

---

## Dependencies

- [x] Constitution document (`.momorph/constitution.md`) — includes i18n + DB rules
- [x] Database schema deployed (`.momorph/contexts/database-schema.sql`) — 13 tables + 5 RPC functions
- [x] Seed data deployed (`.momorph/contexts/database-seed.sql`) — 10 profiles, 15 kudos, media, hashtags, likes, boxes, gifts
- [x] i18n system (`src/i18n/`) — VN/EN translations with TranslationProvider
- [ ] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- **CRITICAL — Page Layout Pattern**: This page MUST follow the same background-layering pattern as `src/app/page.tsx` and `src/app/awards-information/page.tsx`: absolute-positioned `<Image>` for keyvisual background + gradient overlay divs (z-[1], z-[2]), with a "Bìa" content container (`relative z-[3] flex flex-col items-center gap-16 lg:gap-[120px] pt-[120px] lg:pt-[176px] pb-16 lg:pb-24 px-6 md:px-12 lg:px-36`). The KV Banner component renders content only — NO `background-image` on the component itself.
- **CRITICAL — Two-Column Layout**: The All Kudos section uses `flex flex-col lg:flex-row gap-8 lg:gap-10 w-full max-w-[1152px]` for the feed + sidebar layout, following the same pattern as `AwardsLayout.tsx`. Sidebar is `w-full lg:w-80 lg:sticky lg:top-[100px]`.
- **Responsive Padding**: Use `px-6 md:px-12 lg:px-36` (NOT hardcoded 144px). This is the established responsive pattern across all pages.
- **Section Max-Width**: Each section (Highlight, Spotlight, All Kudos) must use `max-w-[1152px] w-full` to constrain content within the centered container.
- The Spotlight Board is the most complex component — consider using a canvas-based library or custom SVG. No carousel/visualization libraries are currently in `package.json`; any new dependency MUST be justified per constitution.
- The carousel in the Highlight section shows 1 card at a time on mobile and 3 visible on desktop with the center card featured (larger/elevated). Must be implemented as a custom component (no existing carousel library).
- The header/footer are shared components already implemented in the awards-information page. Reuse `<Header />`, `<HeaderNav />`, `<Footer />` from `src/components/`. Footer is rendered OUTSIDE `<main>`.
- Hashtag and Department filter dropdowns are separate Figma frames (`1002:13013`, `721:5684`) — implement as reusable dropdown components following `<ProfileDropdown />` pattern (click-outside, keyboard nav).
- The "Mở Secret Box" button navigates to a separate dialog/modal experience (frame `1466:7676`).
- **Font note**: SVN-Gotham is NOT configured in the project. Use `Montserrat Alternates` (`var(--font-montserrat-alternates)`) as the display font for "KUDOS" logo text.
- **Existing CSS variables**: Most color tokens already exist in `globals.css` — reuse `var(--color-text-gold)`, `var(--color-bg-primary)`, `var(--color-border-gold)`, `var(--color-btn-secondary-bg)`, `var(--color-notification-dot)`, `var(--color-kudos-text)`, `var(--color-border-footer)`, `var(--shadow-text-glow)`.
- **Route**: The page route is `/sun-kudos` (confirmed by `KUDOS_CONTENT.ctaHref` in `homepage-data.ts`).
