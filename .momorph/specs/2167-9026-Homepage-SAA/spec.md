# Feature Specification: Homepage SAA

**Frame ID**: `2167:9026`
**Frame Name**: `Homepage SAA`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-10
**Status**: Draft

---

## Overview

The Homepage SAA is the main landing page for the Sun* Annual Awards 2025 application ("ROOT FURTHER" theme). It introduces the event with a hero banner, countdown timer, event information, award categories, and a Sun* Kudos promotion section. The page serves as the central navigation hub, directing users to Award Information, Sun* Kudos, and their profile.

---

## User Scenarios & Testing

### User Story 1 - View Hero Banner & Event Countdown (Priority: P1)

As a Sun* employee, I want to see the event hero banner with a live countdown timer so that I know when the SAA 2025 event takes place and how much time remains.

**Why this priority**: The hero section is the first thing users see — it conveys the event theme, date/location, and urgency via countdown. It's the core identity of the page.

**Independent Test**: Load the homepage → hero banner displays "ROOT FURTHER" title, "Comming soon" subtitle, countdown (Days/Hours/Minutes), event time/location info, and two CTA buttons.

**Acceptance Scenarios**:

1. **Given** the event date is in the future, **When** the user loads the homepage, **Then** the hero banner displays "ROOT FURTHER" title, "Comming soon" label, and a countdown showing days, hours, and minutes remaining (zero-padded, 2 digits each).
2. **Given** the countdown is running, **When** one minute passes, **Then** the countdown updates in real-time (at least every minute).
3. **Given** the event date has passed (countdown reaches 00:00:00), **When** the user loads the page, **Then** the "Comming soon" label is hidden, and the countdown shows 00/00/00.
4. **Given** the user views the hero section, **When** they see event info, **Then** the event time ("26/12/2025") and location ("Âu Cơ Art Center") are displayed as static text, along with a note about livestream ("Tường thuật trực tiếp qua sóng Livestream").

---

### User Story 2 - Navigate via CTA Buttons (Priority: P1)

As a Sun* employee, I want to click "ABOUT AWARDS" or "ABOUT KUDOS" buttons so that I can navigate to the respective sections/pages.

**Why this priority**: CTA buttons are the primary navigation mechanism from the hero section, directing users to core content.

**Independent Test**: Click "ABOUT AWARDS" → navigates to Awards Information page. Click "ABOUT KUDOS" → navigates to Sun* Kudos page.

**Acceptance Scenarios**:

1. **Given** the homepage is loaded, **When** the user clicks "ABOUT AWARDS", **Then** the app navigates to the Awards Information page/tab.
2. **Given** the homepage is loaded, **When** the user clicks "ABOUT KUDOS", **Then** the app navigates to the Sun* Kudos page/tab.
3. **Given** the user hovers over either CTA button, **Then** the button transitions: normal state = outlined (border + translucent bg, white text) → hover state = filled (solid gold bg, dark text). **Both buttons share the SAME state patterns — they are identical in behavior.** (Note: the Figma design shows "ABOUT AWARDS" in its hover state and "ABOUT KUDOS" in its normal state for demonstration purposes only. They must NOT be implemented as different variants.)

---

### User Story 3 - Browse Award Categories (Priority: P1)

As a Sun* employee, I want to browse the award categories grid so that I can learn about each award and navigate to its details.

**Why this priority**: Award categories are the core informational content of the homepage, directly serving the business purpose of promoting SAA 2025.

**Independent Test**: Scroll to "Hệ thống giải thưởng" section → 6 award cards visible in a 3-column grid → click any card → navigates to Awards Information with hash anchor.

**Acceptance Scenarios**:

1. **Given** the homepage is loaded, **When** the user scrolls to the awards section, **Then** a section header ("Sun* annual awards 2025" caption + "Hệ thống giải thưởng" title) is displayed.
2. **Given** the awards section is visible, **When** the user views it, **Then** 6 award cards are displayed in a 3-column grid (Desktop), each with: thumbnail image, title, short description (max 2 lines with ellipsis), and "Chi tiết" link.
3. **Given** an award card is visible, **When** the user clicks the thumbnail, title, or "Chi tiết" link, **Then** the app navigates to the Awards Information page with a hash anchor (`#slug`) so the browser scrolls to that award's detail section.
4. **Given** a card is hovered, **When** the user hovers, **Then** the card shows a lift effect and border/glow highlight.
5. **Given** a mobile/tablet viewport, **When** the user views the awards grid, **Then** it renders as a 2-column grid.

**Award Categories**:
- Top Talent
- Top Project
- Top Project Leader
- Best Manager
- Signature 2025 - Creator
- MVP (Most Valuable Person)

---

### User Story 4 - View "Root Further" Description (Priority: P2)

As a Sun* employee, I want to read the "Root Further" description section so that I understand the theme and philosophy of SAA 2025.

**Why this priority**: Content section provides context but is static and non-interactive — lower priority than navigational elements.

**Independent Test**: Scroll below hero → decorative "ROOT FURTHER" illustration visible → long-form text describing "Root Further" theme is visible with proper typography.

**Acceptance Scenarios**:

1. **Given** the homepage is loaded, **When** the user scrolls past the hero, **Then** a decorative section with the "ROOT FURTHER" logo/illustration and artistic background is displayed (static image asset).
2. **Given** the user continues scrolling, **When** they reach the description area, **Then** a multi-paragraph text explaining the "Root Further" philosophy is displayed, including an English quote ("A tree with deep roots fears no storm") with proper formatting.
3. **Given** the content section is visible, **When** viewed on mobile, **Then** the text wraps responsively without overflow and the decorative illustration scales proportionally.

---

### User Story 5 - View Sun* Kudos Promotion (Priority: P2)

As a Sun* employee, I want to see the Sun* Kudos promotion section so that I learn about the recognition movement and can navigate to its detail page.

**Why this priority**: Kudos is a secondary feature being promoted alongside the main awards — important but not the primary purpose of the page.

**Independent Test**: Scroll to Kudos section → displays "Phong trào ghi nhận" label, "Sun* Kudos" title, description, and "Chi tiết" button → click button → navigates to Sun* Kudos page.

**Acceptance Scenarios**:

1. **Given** the homepage is loaded, **When** the user scrolls to the Sun* Kudos section, **Then** a promotion card shows: "Phong trào ghi nhận" label, "Sun* Kudos" title (large), "ĐIỂM MỚI CỦA SAA 2025" sub-label, a brief description paragraph, the "KUDOS" branding graphic (right side), and a "Chi tiết" CTA button.
2. **Given** the Kudos section is visible, **When** the user clicks "Chi tiết", **Then** the app navigates to the Sun* Kudos page/tab.

---

### User Story 6 - Header Navigation & Footer (Priority: P2)

As a Sun* employee, I want to use the header navigation to move between pages and see the footer with links and copyright.

**Why this priority**: Header/Footer are shared components already partially implemented. Integration is important but not new functionality.

**Independent Test**: Header shows logo + nav links (About SAA 2025, Awards Information, Sun* Kudos) + notification bell + language selector + profile dropdown. Footer shows logo + nav links + copyright.

**Acceptance Scenarios**:

1. **Given** the homepage is loaded, **When** the user views the header, **Then** it displays: SAA logo (left), navigation links ("About SAA 2025" as active/selected, "Awards Information", "Sun* Kudos"), notification bell, language selector ("VN"), and user profile icon (right).
2. **Given** a nav link is clicked, **When** the user clicks "Awards Information", **Then** the app navigates to that page and the link becomes the active/selected state.
3. **Given** a nav link is hovered, **When** the user hovers over a non-active link, **Then** it shows a highlight background (rounded 4px).
4. **Given** the active link is clicked, **When** the user clicks the already-active link, **Then** the page scrolls to the top.
5. **Given** the user views the footer, **Then** it displays: SAA logo, nav links ("About SAA 2025", "Awards Information", "Sun* Kudos", "Tiêu chuẩn chung"), and copyright text "Bản quyền thuộc về Sun* (C) 2025".

---

### User Story 7 - Widget Quick Action Button (Priority: P3)

As a Sun* employee, I want to see a floating widget button at the bottom-right so that I can access quick actions.

**Why this priority**: Widget is a convenience feature that enhances UX but is not essential for core functionality.

**Independent Test**: Widget button visible at bottom-right, fixed position → click opens quick action menu.

**Acceptance Scenarios**:

1. **Given** the homepage is loaded, **When** the user scrolls, **Then** a floating pill-shaped button (pen icon + "/" + SAA icon) stays fixed at the bottom-right of the viewport.
2. **Given** the widget button is visible, **Then** it remains fixed during scroll and does not overlap with footer content.

> **Note**: Widget button click functionality (quick action menu) is **out of scope** for this spec. Only the button rendering and positioning are implemented.

---

### Edge Cases

- What happens when the countdown event date environment variable is missing or invalid? → Display 00/00/00 and hide "Comming soon".
- What happens when award card description exceeds 2 lines? → Truncate with ellipsis (`...`).
- What happens on very narrow screens (320px)? → Award grid becomes 1-2 columns, hero content stacks vertically, countdown tiles shrink.
- What happens when network is slow and images haven't loaded? → Show placeholder/skeleton for award thumbnails and hero background.

---

## UI/UX Requirements

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Header (A1) | Top nav bar with logo, links, notification, language, profile | Click links → navigate, hover → highlight |
| Hero/Keyvisual (3.5) | Background image layer (1512x1392px absolute) with gradient overlay. Hero content (Frame 487, 1224x596px) sits inside "Bìa" container — NOT viewport height | Static display |
| Countdown (B1) | Days/Hours/Minutes countdown tiles | Auto-update every minute |
| Event Info (B2) | Date, location, livestream note | Static display |
| CTA Buttons (B3) | "ABOUT AWARDS" + "ABOUT KUDOS" | Click → navigate, hover state |
| Root Further Decorative (B4-visual) | Decorative "ROOT FURTHER" logo with artistic illustration between hero and content | Static image/decoration |
| Root Further Content (B4) | Long-form description text with English quote | Static display |
| Awards Section Header (C1) | "Hệ thống giải thưởng" heading | Static display |
| Award Cards Grid (C2) | 6 cards (336px each) in 2 rows of 3, space-between with ~80px row gap | Click → navigate with hash, hover → lift + glow |
| Sun* Kudos Section (D1) | Promotion card with title, desc, CTA | Click CTA → navigate |
| Widget Button (6) | Floating pill button | Click → open menu |
| Footer (7) | Logo, nav links, copyright | Click links → navigate |

### Navigation Flow

- From: Login page (after authentication)
- To: Awards Information page (via header nav, CTA button, or award card click)
- To: Sun* Kudos page (via header nav, CTA button, or Kudos CTA)
- To: Profile page (via header profile dropdown)
- Triggers: Click on navigation links, CTA buttons, award cards, widget button

### Visual Requirements

- Responsive breakpoints: mobile (>=320px), tablet (>=768px), desktop (>=1024px)
- Animations/Transitions: Button hover 150ms, card hover lift, countdown digit transitions
- Accessibility: WCAG AA compliant, keyboard navigation for all interactive elements
- See `design-style.md` for detailed visual specifications

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST display hero content (ROOT FURTHER logo 451x200px, countdown, event info, CTA buttons) within a "Bìa" content container (padding: 96px 144px, gap: 120px). Keyvisual background (1512x1392px) and gradient overlay (1512x1480px) are absolute-positioned layers — hero is NOT a viewport-height section.
- **FR-002**: System MUST display a live countdown timer (Days/Hours/Minutes) that updates at least every minute, using a configurable event datetime from an environment variable (ISO-8601 format).
- **FR-003**: System MUST display event info (date, location, livestream note) as static text.
- **FR-004**: System MUST render 2 CTA buttons ("ABOUT AWARDS", "ABOUT KUDOS") that navigate to their respective pages.
- **FR-005**: System MUST display 6 award category cards (336px each) in 2 rows of 3, using flex space-between layout with ~80px vertical gap between rows. Desktop: 3 cards per row; Tablet: 2 columns; Mobile: 1 column. Each card has thumbnail (336x336), title, description (max 2 lines), and "Chi tiết" link.
- **FR-006**: System MUST navigate to Awards Information page with hash anchor when an award card is clicked (image, title, or link).
- **FR-007**: System MUST display a Sun* Kudos promotion section with title, description, branding graphic, and "Chi tiết" CTA.
- **FR-008**: System MUST display the "Root Further" description content section.
- **FR-009**: System MUST display a fixed-position floating widget button at bottom-right (render only — menu functionality out of scope).
- **FR-010**: System MUST display header with navigation (active state for current page), notification bell, language selector, and profile dropdown.
- **FR-011**: System MUST display footer with logo, navigation links, and copyright.

### Technical Requirements

- **TR-001**: Countdown timer MUST read target datetime from an environment variable (`NEXT_PUBLIC_EVENT_DATETIME`), in ISO-8601 format.
- **TR-002**: Hero background image MUST be optimized with `next/image` and responsive `sizes`.
- **TR-003**: Award card images MUST be loaded with proper alt text and lazy loading.
- **TR-004**: Page MUST be server-rendered (Server Component by default) with client components only for countdown timer and interactive elements.
- **TR-005**: All navigation MUST use `next/link` for client-side navigation.
- **TR-006**: Page MUST load within 3 seconds on a 3G connection (Lighthouse performance > 80).

### Key Entities

- **Award Category**: name (string), slug (string), description (string), thumbnail image (URL/path). Currently 6 static categories — no API needed for MVP.
- **Event Config**: eventDateTime (ISO-8601 string from env var), eventLocation (string), eventNote (string). Static for MVP.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| N/A (MVP) | - | Award categories are static data | Static |
| N/A (MVP) | - | Event config from environment variable | Static |

---

## Data Requirements

### Static Data

- **Award Categories** (6 items): Each has `name`, `slug`, `description`, `thumbnailPath`. Defined as a constant array.
- **Event Configuration**: `eventDateTime` from `NEXT_PUBLIC_EVENT_DATETIME` env var, `eventLocation`, `eventNote` as static strings.
- **Header Navigation Links** (3 items): "About SAA 2025", "Awards Information", "Sun* Kudos".
- **Footer Navigation Links** (4 items): "About SAA 2025", "Awards Information", "Sun* Kudos", "Tiêu chuẩn chung".

### State Management

- **Countdown State** (Client Component): `days`, `hours`, `minutes` — updated via `setInterval` every 60 seconds. Local state only.
- **Header Active Link**: Determined by current route via `usePathname()`. No explicit state needed.
- **Image Loading States**: Hero background and award card thumbnails should use `next/image` with built-in loading behavior (blur placeholder or skeleton). No explicit loading state needed.

### Accessibility Requirements

- **Keyboard Navigation**: All interactive elements (CTA buttons, award cards, nav links, widget button) MUST be keyboard-accessible via Tab.
- **Award Cards**: Each card MUST be wrapped in an `<a>` or use `role="link"` with proper `href` for the Awards Information page with hash anchor.
- **Countdown Timer**: Use `aria-live="polite"` on the countdown container so screen readers announce updates. Use `aria-label` for each tile (e.g., "20 days remaining").
- **CTA Buttons**: Use `<a>` styled as buttons (since they navigate) or `next/link` components. Provide clear link text.
- **Hero Background Image**: Decorative — use `aria-hidden="true"` or empty `alt=""`.
- **Award Thumbnails**: Decorative — use `aria-hidden="true"`, rely on card title for accessibility.
- **Focus Indicators**: All focusable elements MUST have visible focus outlines (2px solid #FFEA9E, offset 2px).

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: All 6 award cards are visible and clickable, navigating to correct anchored pages.
- **SC-002**: Countdown timer displays correct remaining time and updates every minute.
- **SC-003**: Page is fully responsive across mobile (320px), tablet (768px), and desktop (1024px+).
- **SC-004**: All CTA buttons and navigation links work correctly.
- **SC-005**: Lighthouse performance score >= 80 on desktop.

---

## Out of Scope

- Dynamic award data from API (future enhancement — currently static)
- Notification bell functionality (bell icon displayed but panel not implemented in this spec)
- Widget button quick action menu content (button displayed but menu options TBD)
- Admin dashboard or content management
- Search functionality
- Internationalization content (i18n structure exists via LanguageSelector but translations not in scope)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/contexts/api-docs.yaml`) — N/A for MVP (static data)
- [ ] Database design completed — N/A for MVP (no DB queries)
- [ ] Screen flow documented (`.momorph/contexts/SCREENFLOW.md`) — To be created

---

## Notes

- The event datetime MUST be configurable via `NEXT_PUBLIC_EVENT_DATETIME` environment variable. Default to a future date if not set.
- Header and Footer components already exist (`src/components/Header.tsx`, `src/components/Footer.tsx`) — they need to be extended for the homepage (header nav links, footer nav links).
- ProfileDropdown already implemented and can be passed as Header children.
- LanguageSelector already implemented in Header.
- The "ROOT FURTHER" title in the hero uses a decorative image asset (not text) — the image files `root-further.png` and `root-text` already exist in the project.
- Between the hero and the text content there's a decorative illustration zone with the "ROOT FURTHER" logo overlaid on artistic imagery — this is a static image composition.
- Award card thumbnails are decorative images with golden ring/glow effects — these are static assets to be downloaded from Figma.
- **Fonts to add**: "Digital Numbers" font for countdown digits and "SVN-Gotham" font for "KUDOS" branding — font files will be provided and added to the project.
- **Spelling**: "Comming soon" uses double 'm' as per Figma design (intentional, keep as-is).
- **"Chi tiết" icon**: Uses a diagonal arrow (↗) icon to the right of the text — implement as ArrowUpRightIcon component.
- **Widget button**: Render only for this spec — click/menu functionality is out of scope.
