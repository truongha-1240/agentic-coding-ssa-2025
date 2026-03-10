# Feature Specification: Dropdown Profile

**Frame ID**: `721:5223`
**Frame Name**: `Dropdown-profile`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-09
**Status**: Draft

---

## Overview

A dropdown menu that appears when the user clicks their profile avatar/trigger in the header. It provides two actions: navigating to the user's profile page and logging out. The dropdown follows the SAA 2025 dark theme with gold accents and a glow effect on the active/hovered item.

---

## User Scenarios & Testing

### User Story 1 - View and Navigate to Profile (Priority: P1)

As an authenticated user, I want to click my avatar to see a dropdown with a "Profile" option, so that I can navigate to my profile page.

**Why this priority**: Core navigation — users need to access their profile settings.

**Independent Test**: Click avatar trigger, verify dropdown appears with "Profile" item, click it, verify navigation to profile page.

**Acceptance Scenarios**:

1. **Given** the user is logged in and on any page, **When** the user clicks the profile avatar/trigger in the header, **Then** a dropdown menu appears with "Profile" and "Logout" options.
2. **Given** the dropdown is open, **When** the user clicks "Profile", **Then** the user is navigated to the profile page and the dropdown closes.
3. **Given** the dropdown is open, **When** the user hovers over "Profile", **Then** the item shows a highlighted background with glow text effect.

---

### User Story 2 - Logout (Priority: P1)

As an authenticated user, I want to click "Logout" in the dropdown to sign out of the application, so that I can securely end my session.

**Why this priority**: Critical security feature — users must be able to sign out.

**Independent Test**: Open dropdown, click "Logout", verify user is signed out and redirected to login page.

**Acceptance Scenarios**:

1. **Given** the dropdown is open, **When** the user clicks "Logout", **Then** the user's session is terminated via Supabase Auth, the user is redirected to `/login`, and the dropdown closes.
2. **Given** the dropdown is open, **When** the user hovers over "Logout", **Then** the item shows a highlighted background.
3. **Given** the logout action fails (network error), **When** the user clicks "Logout", **Then** an error feedback is shown and the user remains logged in.

---

### User Story 3 - Dropdown Interaction & Accessibility (Priority: P2)

As a user, I want the dropdown to close when I click outside of it or press Escape, so that it doesn't block the UI.

**Why this priority**: Essential UX — dropdowns must be dismissible.

**Independent Test**: Open dropdown, click outside, verify it closes. Open dropdown, press Escape, verify it closes.

**Acceptance Scenarios**:

1. **Given** the dropdown is open, **When** the user clicks anywhere outside the dropdown, **Then** the dropdown closes.
2. **Given** the dropdown is open, **When** the user presses the Escape key, **Then** the dropdown closes and focus returns to the trigger.
3. **Given** the dropdown is closed, **When** the user presses Enter or Space on the focused trigger, **Then** the dropdown opens.
4. **Given** the dropdown is open, **When** the user presses Tab, **Then** focus moves between menu items in order. Pressing Tab on the last item closes the dropdown.
5. **Given** the dropdown is open, **When** the user presses ArrowDown/ArrowUp, **Then** focus moves between menu items.

---

### Edge Cases

- What happens when the user's session expires while the dropdown is open? -> Logout action should still work; Profile navigation should redirect to login.
- What happens on mobile with limited screen space? -> Dropdown should not overflow the viewport; reposition if needed.
- What happens if the user double-clicks the trigger rapidly? -> Dropdown should toggle, not get stuck in an intermediate state.

---

## UI/UX Requirements

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Profile Trigger | Avatar or icon button in the header that opens the dropdown | Click to toggle dropdown, focus/keyboard support |
| Dropdown Container | Dark floating panel with gold border | Appears below trigger, closes on outside click/Escape |
| Profile Item | Menu item with "Profile" text + user icon | Click navigates to profile, hover shows glow effect |
| Logout Item | Menu item with "Logout" text + chevron right icon | Click signs out user, hover highlights |

### Navigation Flow

- **Trigger Location**: Header component (top-right area, next to language selector)
- **From**: Any authenticated page
- **To (Profile)**: `/profile` page
- **To (Logout)**: `/login` page (after session termination)

### Visual Requirements

- **Design reference**: See `design-style.md` for all visual specifications
- Responsive: Dropdown is a floating overlay — consistent across breakpoints
- Animations: Fade-in/out with 150ms ease-out transition
- Accessibility: WCAG AA compliant
  - `role="menu"` on dropdown container
  - `role="menuitem"` on each item
  - `aria-expanded` on trigger
  - `aria-haspopup="true"` on trigger
  - Keyboard navigation (Arrow keys, Tab, Escape, Enter/Space)

---

## Data Requirements

### Display Fields

| Field | Source | Description |
|-------|--------|-------------|
| "Profile" label | Static text | Menu item label |
| "Logout" label | Static text | Menu item label |
| User icon | Static SVG | Profile menu item icon |
| Chevron right icon | Static SVG | Logout menu item icon |

> **Note**: The dropdown trigger (avatar/button) may need the user's name or avatar URL from `auth.getUser()`. This is out of scope for the dropdown itself but is a dependency of the Header integration.

### State Management

| State | Type | Default | Description |
|-------|------|---------|-------------|
| `isOpen` | boolean | `false` | Whether the dropdown is visible |
| `isLoggingOut` | boolean | `false` | Loading state during sign-out API call |

- **Local state only** — no global/context state needed.
- `isOpen` toggles on trigger click, resets on outside click / Escape / item click.
- `isLoggingOut` prevents double-click on Logout and shows loading indicator.
- Error state for logout failure: show inline error message or toast.

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST display a dropdown menu when the profile trigger is clicked.
- **FR-002**: System MUST navigate to `/profile` when the "Profile" item is clicked.
- **FR-003**: System MUST sign the user out via Supabase Auth and redirect to `/login` when "Logout" is clicked.
- **FR-004**: System MUST close the dropdown when clicking outside or pressing Escape.
- **FR-005**: System MUST support keyboard navigation within the dropdown menu.
- **FR-006**: System MUST show hover/focus visual feedback on menu items.

### Technical Requirements

- **TR-001**: Logout MUST use `supabase.auth.signOut()` from the pre-configured client (`src/libs/supabase/client.ts`).
- **TR-002**: Dropdown state MUST be managed with local component state (no global state needed).
- **TR-003**: Dropdown MUST use a portal or absolute positioning to avoid z-index/overflow issues.
- **TR-004**: Click-outside detection MUST handle edge cases (portals, nested elements).

### Key Entities

- **User Session**: Supabase Auth session — used to determine authenticated state and for sign-out.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Supabase `auth.signOut()` | POST | Terminate user session | Exists (Supabase SDK) |
| Supabase `auth.getUser()` | GET | Get current user info (for trigger display) | Exists (Supabase SDK) |

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Dropdown opens/closes within 150ms with no visual glitch.
- **SC-002**: Logout successfully terminates session and redirects to login 100% of the time.
- **SC-003**: All keyboard interactions work per WCAG menu pattern.
- **SC-004**: Visual appearance matches Figma design pixel-perfectly (per design-style.md).

---

## Out of Scope

- User avatar image display (requires user profile data — separate feature)
- Profile page implementation (this spec covers only the dropdown itself)
- Dropdown animation micro-interactions beyond basic fade-in/out

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Login screen implemented (authentication flow)
- [ ] Header component exists with a trigger area for the dropdown
- [ ] Profile page route exists (`/profile`) for navigation target

---

## Notes

- The dropdown reuses the SAA 2025 design language: dark background (#00070C), gold border (#998C5F), gold glow text effect (#FAE287).
- Icons come from the same component set (`178:1020`) used across the project — the user icon and chevron-right icon.
- The Profile item's active state (with glow) in the Figma design suggests it indicates the currently active page or the primary action in the dropdown.
- This component will be integrated into the existing `Header` component at `src/components/Header.tsx`.
