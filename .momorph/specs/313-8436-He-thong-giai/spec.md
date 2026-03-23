# Feature Specification: Hệ thống giải (Awards Information)

**Frame ID**: `313:8436`
**Frame Name**: `Hệ thống giải`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-11
**Status**: Draft

---

## Overview

The "Hệ thống giải" (Awards Information) page is a full-page, read-only detail screen for the Sun* Annual Awards 2025 application. It presents the complete awards system with six award categories (Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP), each displayed as a detailed card with thumbnail, title, description, quantity, and prize value. The page features a keyvisual banner at the top, a two-column layout with a left sidebar navigation for jumping between award sections, and a Sun* Kudos promotion section at the bottom. It reuses the shared Header and Footer components.

---

## User Scenarios & Testing

### User Story 1 - View Keyvisual Banner (Priority: P2)

As a Sun* employee, I want to see the ROOT FURTHER keyvisual banner at the top of the Awards Information page so that I recognise I am in the SAA 2025 context.

**Why this priority**: The banner is a static decorative element that provides visual branding but has no interactive functionality.

**Independent Test**: Load the Awards Information page -> keyvisual banner (1440x547px) is displayed at the top with a bottom-to-top gradient overlay.

**Acceptance Scenarios**:

1. **Given** the Awards Information page is loaded, **When** the user views the top of the page, **Then** a keyvisual banner image (1440x547px) showing the "ROOT FURTHER" artwork is displayed.
2. **Given** the keyvisual banner is visible, **When** the user views it, **Then** a gradient overlay (from #00101A at the bottom to transparent at the top) is rendered on top of the banner image.
3. **Given** a mobile viewport, **When** the user views the banner, **Then** the banner scales proportionally to the viewport width while maintaining its aspect ratio.

---

### User Story 2 - View Section Title & Award Categories (Priority: P1)

As a Sun* employee, I want to see the "Sun* Annual Awards 2025" section title and all six award detail cards so that I can learn about each award category, its description, quantity, and prize value.

**Why this priority**: Award category details are the primary content and purpose of this page — users come here specifically to understand the awards system.

**Independent Test**: Scroll below the keyvisual banner -> section title visible -> 6 award detail cards displayed, each with thumbnail, title, description, quantity, and prize value.

**Acceptance Scenarios**:

1. **Given** the page is loaded, **When** the user scrolls to the content container, **Then** a section title is displayed with "Sun* Annual Awards 2025" as the caption and "Hệ thống giải thưởng SAA 2025" as the heading (gold text).
2. **Given** the awards content is visible, **When** the user views the right content area, **Then** 6 award detail cards are displayed vertically, each containing:
   - A thumbnail image (336x336px with golden ring/glow decoration)
   - Award title in gold text (#FFEA9E)
   - Description paragraph in white text
   - "Số lượng giải thưởng:" label (gold) with quantity number and unit
   - "Giá trị giải thưởng:" label (gold) with prize value in VNĐ
   - Additional note text (where applicable)
3. **Given** the award cards are visible, **When** the user views the "Top Talent" card, **Then** it shows: 10 awards, Đơn vị, 7.000.000 VNĐ cho mỗi giải thưởng.
4. **Given** the award cards are visible, **When** the user views the "Top Project" card, **Then** it shows: 02 awards, Tập thể, 15.000.000 VNĐ cho mỗi giải thưởng.
5. **Given** the award cards are visible, **When** the user views the "Top Project Leader" card, **Then** it shows: 03 awards, Cá nhân, 7.000.000 VNĐ cho mỗi giải thưởng.
6. **Given** the award cards are visible, **When** the user views the "Best Manager" card, **Then** it shows: 01 award, Cá nhân, 10.000.000 VNĐ.
7. **Given** the award cards are visible, **When** the user views the "Signature 2025 - Creator" card, **Then** it shows: 01 award, Cá nhân hoặc tập thể, with TWO prize tiers separated by "Hoặc" text: 5.000.000 VNĐ cho giải cá nhân / 8.000.000 VNĐ cho giải tập thể.
8. **Given** the award cards are visible, **When** the user views the "MVP (Most Valuable Person)" card, **Then** it shows: 01 award, Cá nhân, 15.000.000 VNĐ.

---

### User Story 3 - Navigate via Sidebar (Priority: P1)

As a Sun* employee, I want to click an award category in the left sidebar navigation so that the page scrolls to the corresponding award detail section.

**Why this priority**: The sidebar is the primary in-page navigation mechanism, enabling users to quickly jump to specific award categories without scrolling through all content.

**Independent Test**: Click "Top Project" in the sidebar -> page scrolls to the Top Project award card -> sidebar item shows active state (gold underline).

**Acceptance Scenarios**:

1. **Given** the page is loaded, **When** the user views the left sidebar, **Then** 6 award category links are displayed: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP.
2. **Given** the sidebar is visible, **When** the user clicks a category link (e.g., "Best Manager"), **Then** the page smoothly scrolls to the corresponding award detail card in the right content area.
3. **Given** a sidebar link has been clicked, **When** the target section is scrolled into view, **Then** the clicked sidebar item shows an active state with a gold underline, and all other items lose their active state.
4. **Given** the user scrolls manually through the content, **When** a new award section enters the viewport, **Then** the corresponding sidebar link updates to the active state (scroll-spy behavior).
5. **Given** the page is loaded via a URL with a hash anchor (e.g., `/awards#top-project`), **When** the page finishes loading, **Then** the page scrolls to the corresponding award section and the matching sidebar link is active.

---

### User Story 4 - Header Navigation with Active State (Priority: P1)

As a Sun* employee, I want the header to show "Awards Information" as the active navigation link so that I know which page I am on, and I want to navigate to other pages via header links.

**Why this priority**: Header navigation is essential for orienting the user and enabling cross-page navigation.

**Independent Test**: Load the Awards Information page -> header shows "Awards Information" link in active state -> click "About SAA 2025" -> navigates to homepage.

**Acceptance Scenarios**:

1. **Given** the Awards Information page is loaded, **When** the user views the header, **Then** it displays: SAA logo (left), navigation links ("About SAA 2025", "Awards Information" as active/selected, "Sun* Kudos"), notification bell, language selector ("VN"), and user profile icon (right).
2. **Given** the header is visible, **When** the user clicks "About SAA 2025", **Then** the app navigates to the homepage.
3. **Given** the header is visible, **When** the user clicks "Sun* Kudos", **Then** the app navigates to the Sun* Kudos page.
4. **Given** the header is visible, **When** the user hovers over a non-active nav link, **Then** it shows a highlight background (rounded 4px).

---

### User Story 5 - View Sun* Kudos Promotion Section (Priority: P2)

As a Sun* employee, I want to see the Sun* Kudos promotion section at the bottom of the awards page so that I can learn about the Kudos movement and navigate to its detail page.

**Why this priority**: The Kudos section is a secondary promotional element — important for cross-feature discovery but not the primary purpose of the page.

**Independent Test**: Scroll to bottom of content area -> Kudos promotion section (1152x500px) visible with title, description, KUDOS branding, and "Chi tiết" CTA -> click CTA -> navigates to Sun* Kudos page.

**Acceptance Scenarios**:

1. **Given** the Awards Information page is loaded, **When** the user scrolls past all award cards, **Then** a Sun* Kudos promotion section (1152x500px) is displayed with: title, description text, KUDOS branding graphic on the right, and a "Chi tiết" CTA button.
2. **Given** the Kudos section is visible, **When** the user clicks "Chi tiết", **Then** the app navigates to the Sun* Kudos page.
3. **Given** the Kudos CTA is visible, **When** the user hovers over it, **Then** the button transitions: normal state = filled (solid gold bg #FFEA9E, dark text #00101A) -> hover state = inverted (dark bg #00101A, gold text #FFEA9E, gold border).

---

### User Story 6 - Footer Display (Priority: P3)

As a Sun* employee, I want to see the footer with navigation links and copyright so that I can access other pages from the bottom of the page.

**Why this priority**: Footer is a shared component with standard links — low priority as it is not unique to this page.

**Independent Test**: Scroll to the very bottom -> footer displays logo, nav links, and copyright text.

**Acceptance Scenarios**:

1. **Given** the Awards Information page is loaded, **When** the user scrolls to the bottom, **Then** the footer displays: SAA logo, navigation links ("About SAA 2025", "Awards Information", "Sun* Kudos", "Tiêu chuẩn chung"), and copyright text "Bản quyền thuộc về Sun* © 2025".
2. **Given** a footer nav link is clicked, **When** the user clicks a link, **Then** the app navigates to the corresponding page.

---

### User Story 7 - Responsive Layout (Priority: P2)

As a Sun* employee using a mobile or tablet device, I want the Awards Information page to adapt to my screen size so that I can read all content comfortably.

**Why this priority**: Responsive design is required by the constitution but the page is primarily designed for desktop; mobile adaptation is important for accessibility.

**Independent Test**: Resize viewport to 768px -> sidebar collapses or stacks above content -> award cards reflow -> all text remains readable.

**Acceptance Scenarios**:

1. **Given** a desktop viewport (>=1024px), **When** the user views the awards content, **Then** the two-column layout is displayed: left sidebar (178px) and right content area (853px) within a 1152px container.
2. **Given** a tablet viewport (>=768px and <1024px), **When** the user views the awards content, **Then** the sidebar either collapses into a horizontal scrollable nav or stacks above the content area, and award cards reflow to fit the available width.
3. **Given** a mobile viewport (<768px), **When** the user views the awards content, **Then** the layout becomes single-column, the sidebar becomes a horizontal scrollable strip or accordion, and award card thumbnails scale proportionally.
4. **Given** any viewport, **When** the user views the page, **Then** no horizontal scrollbar appears and all text is readable without zooming.

---

### Edge Cases

- What happens when the page is accessed with an invalid hash anchor (e.g., `#nonexistent`)? -> Page loads normally, no scroll occurs, first sidebar item is active by default.
- What happens when award card thumbnail images fail to load? -> Show a placeholder/skeleton matching the 336x336px area.
- What happens on very narrow screens (320px)? -> Single-column layout, sidebar becomes horizontal strip, thumbnails and text scale down proportionally.
- What happens when the user navigates to this page from a homepage award card with a hash anchor? -> Page scrolls to the matching award section and the sidebar reflects the active category.
- What happens with the "Signature 2025 - Creator" card that has two prize tiers? -> The card displays two separate prize sections with an "Hoặc" (Or) text divider between them, styled in #2E3940 color. This is a unique layout only for this card.

---

## UI/UX Requirements

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Header (shared) | Top nav bar with logo, links, notification, language, profile. "Awards Information" is the active link. | Click links -> navigate, hover -> highlight |
| Keyvisual Banner | Full-width banner image (1440x547px) with gradient overlay (#00101A to transparent, bottom-to-top) | Static display |
| Content Container ("Bia") | 1152px wide container with padding 96px 144px | Static layout |
| Section Title | "Sun* Annual Awards 2025" caption + "Hệ thống giải thưởng SAA 2025" heading | Static display |
| Sidebar Navigation | Left column (178px) with 6 award category links, active state with gold underline | Click -> scroll to section, scroll-spy active state |
| Award Detail Card (x6) | Thumbnail (336x336px with golden ring/glow), gold title, white description, quantity, prize value, note | Scroll target for sidebar clicks |
| Sun* Kudos Promotion | 1152x500px section with title, description, KUDOS branding graphic, "Chi tiết" CTA | Click CTA -> navigate to Kudos page |
| Footer (shared) | Logo, nav links, copyright | Click links -> navigate |

### Navigation Flow

- From: Homepage "Awards Information" nav link, Homepage award card clicks (with hash anchors), Homepage "ABOUT AWARDS" CTA button
- To: Sun* Kudos page (via "Chi tiết" CTA in Kudos section, or header nav)
- To: Homepage (via "About SAA 2025" header nav link)
- To: Profile page (via header profile dropdown)
- Internal: Sidebar links scroll to corresponding award sections within the page

### Visual Requirements

- Responsive breakpoints: mobile (>=320px), tablet (>=768px), desktop (>=1024px)
- Content container: 1152px wide, centered, with padding 96px 144px
- Sidebar width: 178px (desktop), collapses/stacks on smaller viewports
- Right content area: 853px (desktop)
- Award thumbnails: 336x336px with golden ring/glow decoration (static image assets)
- Color scheme: Dark background (#00101A), gold accent text for award titles, white text for descriptions
- Gradient overlay on keyvisual: bottom-to-top from #00101A to transparent
- Active sidebar item: gold underline indicator
- Animations/Transitions: Smooth scroll for sidebar navigation, button hover 150ms
- See `design-style.md` for detailed visual specifications

### Accessibility Requirements

- **Keyboard Navigation**: All interactive elements (sidebar links, CTA buttons, header nav) MUST be keyboard-accessible via Tab.
- **Sidebar Navigation**: Each sidebar link MUST use `<a>` with proper `href` pointing to the corresponding section `id` (e.g., `#top-talent`).
- **Award Sections**: Each award card section MUST have an `id` attribute matching its slug for hash anchor navigation.
- **Award Thumbnails**: Decorative images — use `aria-hidden="true"` or empty `alt=""`, rely on award title text for accessibility.
- **Keyvisual Banner**: Decorative — use `aria-hidden="true"` or empty `alt=""`.
- **Focus Indicators**: All focusable elements MUST have visible focus outlines (2px solid #FFEA9E, offset 2px).
- **Scroll-spy**: Active sidebar state changes MUST be communicated to screen readers via `aria-current="true"` on the active link.
- **Landmark Regions**: Use `<nav>` for sidebar, `<main>` for content area, `<header>` and `<footer>` for shared components.

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST display a keyvisual banner image (1440x547px) at the top of the page with a bottom-to-top gradient overlay (from #00101A to transparent).
- **FR-002**: System MUST display a content container ("Bia") that is 1152px wide with padding 96px 144px, containing the section title, sidebar navigation, award cards, and Kudos promotion section.
- **FR-003**: System MUST display a section title with "Sun* Annual Awards 2025" caption (white, centered) and "Hệ thống giải thưởng SAA 2025" heading (gold, 57px), separated by a 1px #2E3940 divider line.
- **FR-004**: System MUST display a left sidebar navigation (178px wide on desktop) with 6 award category links: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP.
- **FR-005**: System MUST highlight the active sidebar link with a gold underline indicator. The active state MUST update based on scroll position (scroll-spy) and sidebar click.
- **FR-006**: System MUST smooth-scroll to the corresponding award section when a sidebar link is clicked.
- **FR-007**: System MUST display 6 award detail cards with alternating layout (odd cards: image-left, even cards: image-right), each containing: thumbnail image (336x336px with golden ring/glow, mix-blend-mode: screen), award title (gold text), description paragraph (white text, justified), "Số lượng giải thưởng:" with quantity and unit, "Giá trị giải thưởng:" with prize value in VNĐ, and optional additional note text. Cards are separated by full-width 1px #2E3940 dividers.
- **FR-008**: System MUST display the following award data:
  - Top Talent: 10 awards, Đơn vị, 7.000.000 VNĐ cho mỗi giải thưởng
  - Top Project: 02 awards, Tập thể, 15.000.000 VNĐ cho mỗi giải thưởng
  - Top Project Leader: 03 awards, Cá nhân, 7.000.000 VNĐ cho mỗi giải thưởng
  - Best Manager: 01 award, Cá nhân, 10.000.000 VNĐ
  - Signature 2025 - Creator: 01 award, Cá nhân hoặc tập thể, 5.000.000 VNĐ (cho giải cá nhân) **"Hoặc"** 8.000.000 VNĐ (cho giải tập thể) — uses dual-prize layout with "Hoặc" divider
  - MVP (Most Valuable Person): 01 award, Cá nhân, 15.000.000 VNĐ
- **FR-009**: System MUST display a Sun* Kudos promotion section (1152x500px) with title, description, KUDOS branding graphic, and "Chi tiết" CTA button that navigates to the Sun* Kudos page.
- **FR-010**: System MUST support hash anchor navigation — when the page is loaded with a hash (e.g., `#top-project`), it scrolls to the corresponding award section.
- **FR-011**: System MUST display the shared Header with "Awards Information" as the active navigation link.
- **FR-012**: System MUST display the shared Footer with logo, navigation links, and copyright.
- **FR-013**: System MUST be responsive across mobile (>=320px), tablet (>=768px), and desktop (>=1024px) breakpoints. The two-column layout collapses to single-column on smaller viewports.

### Technical Requirements

- **TR-001**: Page MUST be implemented as a Server Component by default. Client components MUST only be used for interactive features (sidebar scroll-spy, smooth scrolling).
- **TR-002**: Keyvisual banner and award thumbnail images MUST be optimized with `next/image` using responsive `sizes` and lazy loading (except keyvisual which should be eager/priority).
- **TR-003**: All navigation MUST use `next/link` for client-side page transitions and standard `<a>` with hash `href` for in-page anchor navigation.
- **TR-004**: Award data MUST be defined as a typed constant array (static data, no API needed for MVP).
- **TR-005**: Sidebar scroll-spy MUST use `IntersectionObserver` API to detect which award section is in the viewport.
- **TR-006**: Page MUST load within 3 seconds on a 3G connection (Lighthouse performance > 80).
- **TR-007**: Each award section MUST have a unique `id` attribute matching its slug (e.g., `id="top-talent"`) for hash anchor navigation.
- **TR-008**: Smooth scrolling MUST use native CSS `scroll-behavior: smooth` or the `scrollIntoView({ behavior: 'smooth' })` API.

### Key Entities

- **Award Category**: name (string), slug (string), description (string), thumbnailPath (string), quantity (string), unit (string), prizeValue (string), note (string | null). 6 static categories.
- **Sidebar Nav Item**: label (string), href (string — hash anchor), isActive (boolean).

---

## API / Database Dependencies

> **Database deployed**: Award categories and prizes are now in Supabase tables `award_categories` and `award_prizes` (bilingual VN/EN).

| Source | Method | Purpose | Status |
|--------|--------|---------|--------|
| `award_categories` table | `supabase.from('award_categories').select('*, award_prizes(*)').order('sort_order')` | Fetch all awards with prizes | ✅ DB Ready |
| `awards-data.ts` | `getAwardCategories(language)` | Bilingual data helper (currently uses static data, can switch to DB) | ✅ Implemented |
| i18n | `t("awards.pageTitle")`, `t("awards.quantityLabel")`, etc. | UI labels translation | ✅ Implemented |

**Current**: Uses `getAwardCategories(language)` from `src/utils/awards-data.ts` (bilingual static data).
**Future**: Can replace with Supabase query on `award_categories` + `award_prizes` tables for dynamic content.

---

## State Management

- **Active Sidebar Item** (Client Component): Tracks which award section is currently in the viewport. Updated via `IntersectionObserver` (scroll-spy) or sidebar click. Local state (`useState`).
- **Header Active Link**: Determined by current route via `usePathname()`. No explicit state needed.
- **Hash Anchor Scroll**: On page mount, check `window.location.hash` and scroll to the corresponding section. One-time effect (`useEffect`).
- **Image Loading States**: Award thumbnails and keyvisual use `next/image` with built-in loading behavior (blur placeholder or skeleton). No explicit loading state needed.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: All 6 award detail cards are visible with correct data (title, description, quantity, prize value).
- **SC-002**: Sidebar navigation click scrolls to the correct award section and updates the active indicator.
- **SC-003**: Scroll-spy correctly highlights the sidebar link corresponding to the visible award section.
- **SC-004**: Hash anchor navigation works when arriving from the homepage (e.g., `/awards#top-project` scrolls to Top Project).
- **SC-005**: "Chi tiết" CTA in the Kudos section navigates to the Sun* Kudos page.
- **SC-006**: Page is fully responsive across mobile (320px), tablet (768px), and desktop (1024px+).
- **SC-007**: Lighthouse performance score >= 80 on desktop.
- **SC-008**: All interactive elements are keyboard-accessible.

---

## Out of Scope

- Dynamic award data from API (future enhancement — currently static)
- Notification bell functionality (bell icon displayed but panel not implemented)
- Widget button / floating action button (not present in this screen's design)
- Voting or nomination functionality for awards
- Admin dashboard or content management for award categories
- Internationalization content (i18n structure exists via LanguageSelector but translations not in scope)
- Search functionality
- Award detail sub-pages (all details are shown inline on this single page)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Homepage SAA spec exists (`.momorph/specs/2167-9026-Homepage-SAA/spec.md`) — provides navigation context and award category data
- [ ] Shared Header component implemented (`src/components/Header.tsx`) — required for active nav state
- [ ] Shared Footer component implemented (`src/components/Footer.tsx`) — required for footer rendering
- [ ] Award thumbnail image assets downloaded from Figma — 6 images (336x336px with golden ring/glow)
- [ ] Keyvisual banner image asset downloaded from Figma (1440x547px)
- [ ] KUDOS branding graphic asset downloaded from Figma
- [x] Database schema deployed — `award_categories` + `award_prizes` tables with bilingual data
- [x] Seed data deployed — 6 award categories + 7 prize entries
- [x] i18n system — UI labels translated (VN/EN)

---

## Notes

- The page route should follow Next.js App Router convention, e.g., `src/app/awards/page.tsx` or similar — align with the navigation links defined in the Homepage spec.
- Header and Footer components are shared with the Homepage and other pages. They should be imported and configured with the correct active link state.
- Award data is static for MVP. Define a typed constant array (e.g., `AWARD_CATEGORIES`) in a co-located data file or `src/utils/` for reuse between the homepage award cards and this detail page.
- Award thumbnails use the same golden ring/glow decoration seen on the homepage cards but at a larger size (336x336px). These are static image assets to be exported from Figma.
- The sidebar navigation should use standard HTML anchor links (`<a href="#slug">`) for accessibility and progressive enhancement. The scroll-spy client component enhances this with active state tracking.
- The "Bia" content container uses the same styling pattern as the homepage — 1152px wide with 96px/144px padding. Consider extracting a shared `ContentContainer` component if not already done.
- Vietnamese text in the design uses diacritics (e.g., "Hệ thống giải thưởng", "Số lượng giải thưởng", "Giá trị giải thưởng"). The actual rendered text MUST include proper Vietnamese diacritics as shown in the Figma design.
- The Kudos promotion section at the bottom of this page is visually similar to the one on the homepage. Consider reusing the same component with minor layout adjustments.
- Hash anchors for award sections should use kebab-case slugs: `top-talent`, `top-project`, `top-project-leader`, `best-manager`, `signature-2025-creator`, `mvp`.
