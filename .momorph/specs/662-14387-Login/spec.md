# Feature Specification: Login

**Frame ID**: `662:14387`
**Frame Name**: `Login`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-09
**Status**: Draft

---

## Overview

The Login page is the entry point for the **Sun Annual Awards (SAA) 2025** application. It presents a visually rich hero section with the "ROOT FURTHER" branding and a single Google OAuth login button. The page uses a dark theme with a full-screen key visual background, gradient overlays, and a prominent call-to-action. A header provides branding (logo) and language selection, while a footer displays copyright information.

**Target Users**: Sun* employees participating in or viewing the Sun Annual Awards 2025.

**Business Context**: Gate access to the SAA 2025 platform behind Google authentication, ensuring only authorized users (with company Google accounts) can access the application.

---

## User Scenarios & Testing

### US1: Google OAuth Login (Priority: P1)

**As a** Sun* employee
**I want to** log in using my Google account
**So that** I can access the SAA 2025 platform securely

**Why this priority**: This is the sole authentication mechanism — without it, no user can access the application.

**Independent Test**: Verify the complete Google OAuth flow from button click to successful redirect.

**Acceptance Scenarios**:

**Scenario 1: Successful Login**
- Given: User is on the Login page and not authenticated
- When: User clicks the "LOGIN With Google" button
- Then: Google OAuth consent screen opens, user authorizes, and is redirected to the Homepage SAA (`2167:9026`)

**Scenario 2: Login Cancelled**
- Given: User is on the Login page
- When: User clicks "LOGIN With Google" but cancels the Google consent screen
- Then: User remains on the Login page with no error; button returns to default state

**Scenario 3: Login Failure (unauthorized domain)**
- Given: User is on the Login page
- When: User tries to login with a non-authorized Google account
- Then: An error message is displayed below the login button in red text (#EF4444, 14px); user remains on the Login page

**Scenario 4: Loading State**
- Given: User clicked "LOGIN With Google"
- When: OAuth flow is in progress (redirect-based, not popup)
- Then: Button text changes to "Logging in..." with a 16px spinner, button opacity reduces to 0.7, and button is disabled to prevent double-clicks

**Scenario 5: Already Authenticated**
- Given: User already has a valid session
- When: User navigates to the Login page
- Then: User is automatically redirected to the Homepage SAA

---

### US2: Language Selection (Priority: P2)

**As a** user
**I want to** switch the display language
**So that** I can use the application in my preferred language

**Why this priority**: Enhances usability for multilingual teams but is not required for core functionality.

**Independent Test**: Verify language dropdown opens and language can be switched.

**Acceptance Scenarios**:

**Scenario 1: Open Language Dropdown**
- Given: User is on the Login page
- When: User clicks the language selector ("VN" with flag icon)
- Then: A dropdown menu appears showing available languages (linked to frame `721:4942`)

**Scenario 2: Switch Language**
- Given: Language dropdown is open
- When: User selects a different language
- Then: Page content updates to the selected language; dropdown closes; selector shows new language

**Scenario 3: Close Dropdown Without Selection**
- Given: Language dropdown is open
- When: User clicks outside the dropdown or presses Escape key
- Then: Dropdown closes; language remains unchanged

**Scenario 4: Keyboard Navigation**
- Given: Language selector is focused
- When: User presses Enter or Space
- Then: Dropdown opens; arrow keys navigate options; Enter selects; Escape closes

---

### US3: View Login Page (Priority: P1)

**As a** visitor
**I want to** see a well-designed login page with SAA 2025 branding
**So that** I understand what the platform is about before logging in

**Why this priority**: First impression and branding are critical for user engagement.

**Independent Test**: Verify all visual elements render correctly matching the Figma design.

**Acceptance Scenarios**:

**Scenario 1: Page Load**
- Given: User navigates to the Login page URL
- When: The page finishes loading
- Then: Background image, gradients, header (logo + language selector), hero section (ROOT FURTHER logo + description + login button), and footer (copyright) are all visible and match the design specifications in `design-style.md`

**Scenario 2: Responsive Display**
- Given: User accesses the Login page on different devices
- When: Viewport width changes (mobile, tablet, desktop)
- Then: Layout adapts responsively per the breakpoints defined in `design-style.md`

---

### Edge Cases

- What happens when the background image fails to load? Display the solid `#00101A` background color as fallback.
- What happens if Supabase Auth is unavailable? Show a user-friendly error message below the login button indicating the service is temporarily unavailable.
- What happens on very slow connections? The login button MUST remain interactive; background image loads progressively.
- What happens if user has popup blockers? OAuth uses redirect flow (not popup), so popup blockers are not a concern.
- What happens if the OAuth callback returns an error query param? Parse `error` and `error_description` from the URL and display below the login button.
- What happens if the user's session expires while on the page? No impact — user is not authenticated yet; login flow works as normal.

---

## UI/UX Requirements

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Header | `662:14391` | Top bar with logo and language selector | Fixed at top |
| Logo | `I662:14391;186:2166` | SAA 2025 logo (52x48px) | None (static) |
| Language Selector | `I662:14391;186:1601` | "VN" + flag + chevron | Click: opens dropdown |
| Background Image | `662:14389` | Full-screen key visual artwork | None (decorative) |
| Left Gradient | `662:14392` | Left-to-right gradient overlay | None (decorative) |
| Bottom Gradient | `662:14390` | Bottom-to-top gradient overlay | None (decorative) |
| Key Visual | `2939:9548` | ROOT FURTHER logo (451x200px) | None (static) |
| Hero Text | `662:14753` | Description text encouraging login | None (static) |
| Login Button | `662:14426` | "LOGIN With Google" + Google icon | Click: trigger OAuth |
| Error Message | N/A (runtime) | Auth error text below login button | Conditional: visible on error |
| Footer | `662:14447` | Copyright text with top border | None (static) |

**Visual specs**: See [design-style.md](./design-style.md) for all colors, typography, spacing, and component details.

### Navigation Flow

- **Route**: `/login` (or `/` if login is the root page)
- **From**: Direct URL access, redirect from protected routes, or deep link with `?redirectTo=` param
- **To**: Homepage SAA (`2167:9026`, route: `/`) after successful authentication, or `redirectTo` URL if provided
- **Triggers**: Successful Google OAuth login (redirect-based flow via Supabase)

### Visual Requirements

- **Responsive breakpoints**: Mobile (<768px), Tablet (768-1023px), Desktop (>=1024px) — see `design-style.md`
- **Animations**: Button hover/press transitions (150ms ease-in-out)
- **Accessibility**:
  - Login button MUST have `aria-label="Login with Google"`
  - Language selector MUST have `aria-label="Select language"` and `aria-expanded` state
  - Background image MUST have `alt=""` (decorative)
  - Focus states MUST be visible on all interactive elements
  - Color contrast: white text on dark background exceeds WCAG AA 4.5:1 ratio
  - Page MUST be navigable via keyboard (Tab through header → login button)
  - Error message MUST use `role="alert"` for live region announcement to screen readers
  - Language dropdown MUST support keyboard: Enter/Space to open, Arrow keys to navigate, Escape to close

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST authenticate users via Google OAuth using Supabase Auth
- **FR-002**: System MUST redirect authenticated users to Homepage SAA after login
- **FR-003**: System MUST redirect already-authenticated users away from the Login page
- **FR-004**: Login button MUST show a loading state during OAuth flow
- **FR-005**: Login button MUST be disabled during OAuth processing to prevent double-submit
- **FR-006**: Language selector MUST open a dropdown for language switching (linked to frame `721:4942`)
- **FR-007**: System MUST display an error message if authentication fails
- **FR-008**: Page MUST render all visual elements matching the Figma design
- **FR-009**: Error message MUST dismiss when user clicks the login button again (new attempt)
- **FR-010**: Error message MUST have `role="alert"` for screen reader announcement

### Technical Requirements

- **TR-001**: Use Supabase Auth with Google OAuth provider (per constitution Principle IV)
- **TR-002**: Use Next.js App Router with Server Components where possible (per constitution Principle II)
- **TR-003**: Page MUST load within 3 seconds on a 3G connection (critical path: HTML + CSS + JS)
- **TR-004**: Background image MUST use `next/image` with `priority` for LCP optimization
- **TR-005**: Fonts (Montserrat, Montserrat Alternates) MUST be loaded via `next/font/google`
- **TR-006**: All media assets MUST be downloaded from MoMorph media files and stored in `public/`

### Key Entities

- **User Session**: Supabase Auth session with Google provider tokens
- **Language Preference**: Currently selected UI language (stored in cookie or localStorage)

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Supabase Auth (`signInWithOAuth`) | POST | Initiate Google OAuth flow | Exists (Supabase SDK) |
| Supabase Auth (callback) | GET | Handle OAuth redirect callback | Exists (Supabase SDK) |
| `/api/auth/callback` | GET | Server-side auth callback handler (predicted) | New |

---

## State Management

### Local Component State

| State | Type | Default | Purpose |
|-------|------|---------|---------|
| `isLoading` | boolean | false | Login button loading state |
| `error` | string \| null | null | Authentication error message (displayed below login button) |
| `isLangDropdownOpen` | boolean | false | Language dropdown visibility |
| `selectedLang` | string | "VN" | Currently displayed language code |

### Global State

- **Auth Session**: Managed by Supabase client; checked via middleware on protected routes
- **Language**: Stored in cookie for SSR compatibility

### Cache Requirements

- Background image: immutable cache (versioned filename)
- Auth session: managed by Supabase SDK refresh mechanism

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: 100% of login attempts via Google OAuth complete within 5 seconds
- **SC-002**: Login page renders pixel-perfect match to Figma design on desktop (1440px)
- **SC-003**: All interactive elements are keyboard-accessible and pass WCAG AA
- **SC-004**: Page achieves Lighthouse performance score >= 90

---

## Out of Scope

- Email/password login (Google OAuth only)
- User registration flow (handled by Google)
- Password reset functionality
- Multi-factor authentication beyond Google's built-in MFA
- Language dropdown implementation details (covered in frame `721:4942` spec)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`) — not yet created
- [ ] Database design completed (`.momorph/database.sql`) — not yet created
- [ ] Screen flow documented (`.momorph/SCREENFLOW.md`) — not yet created

---

## Media Assets

The following media files MUST be downloaded and placed in `public/images/login/`:

| Asset | Node ID | Format | Description |
|-------|---------|--------|-------------|
| SAA Logo | `I662:14391;178:1033;178:1030` | PNG | Header logo |
| VN Flag | `I662:14391;186:1696;186:1821;186:1709` | SVG | Language selector flag |
| Chevron Down | `I662:14391;186:1696;186:1821;186:1441` | SVG | Language selector arrow |
| ROOT FURTHER | `2939:9548` | PNG | Hero key visual logo |
| Google Icon | `I662:14426;186:1766` | SVG | Login button icon |
| Background | `662:14389` | PNG/WebP | Full-screen hero background (use `get_frame_image` on the C_Keyvisual group `662:14388` or extract from Figma fills) |

---

## Notes

- The Login page is the **only entry point** for unauthenticated users
- Google OAuth MUST use Supabase's `signInWithOAuth({ provider: 'google' })` per constitution Principle IV (Security-First)
- The background key visual image is large — consider WebP format and `next/image` optimization
- Footer copyright text uses **Montserrat Alternates** (different from the main Montserrat used elsewhere)
- The language selector component will be reused across other pages (Header is a shared component instance `186:1602`)
