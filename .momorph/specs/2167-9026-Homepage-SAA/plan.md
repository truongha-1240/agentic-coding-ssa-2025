# Implementation Plan: Homepage SAA

**Frame**: `2167-9026-Homepage-SAA`
**Date**: 2026-03-10
**Spec**: `specs/2167-9026-Homepage-SAA/spec.md`

---

## Summary

Implement the Homepage SAA — the main landing page for Sun* Annual Awards 2025 ("ROOT FURTHER" theme). The page includes a hero banner with countdown timer, CTA buttons, award categories grid (6 cards), "Root Further" description section, Sun* Kudos promotion, and a floating widget button. All data is static for MVP (no API). Header and Footer components are extended from existing implementations.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS v4, next/image, next/link, next/font/local
**Database**: N/A (static data for MVP)
**Testing**: Vitest + React Testing Library + jsdom
**State Management**: Local state only (useState for countdown timer)
**API Style**: N/A (static data)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case routes, PascalCase components, `@/*` alias)
- [x] Uses approved libraries and patterns (no new dependencies needed)
- [x] Adheres to folder structure guidelines (src/app, src/components, src/types, src/hooks)
- [x] Meets security requirements (no user input, no API calls, env var for countdown only)
- [x] Follows testing standards (Vitest + RTL, TDD red-green-refactor)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| Custom local fonts (Digital Numbers, SVN-Gotham) | Required by design for countdown digits and KUDOS branding; Google Fonts doesn't have them | Using fallback system fonts — would not match design |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based — homepage components co-located in `src/components/homepage/`, shared components remain in `src/components/`
- **Styling Strategy**: TailwindCSS v4 utility classes + CSS custom properties in `globals.css` for design tokens
- **Data Fetching**: No data fetching — all data is static constants defined in `src/utils/homepage-data.ts`
- **Server vs Client**: Server Components by default. Only `CountdownTimer` and `HeaderNav` (for `usePathname()`) require `"use client"`. `WidgetButton` is server-rendered (render only, no interactivity in scope).

### Component Architecture

```
page.tsx (Server Component — composition root)
├── Header (Server, extended with nav links)
│   ├── HeaderNav (Client — usePathname for active state) [src/components/HeaderNav.tsx]
│   ├── NotificationBell (Server — inline in Header, wraps icon + red dot badge)
│   ├── LanguageSelector (Client — existing)
│   └── ProfileDropdown (Client — existing)
├── HeroBanner (Server)
│   ├── CountdownTimer (Client — setInterval)
│   │   └── CountdownTile (Server-compatible, used inside client)
│   ├── EventInfo (Server)
│   └── CTAButton (Server — next/link wrapper)
├── RootFurtherSection (Server)
│   ├── RootFurtherDecoration (Server — image)
│   └── RootFurtherContent (Server — text)
├── AwardsSection (Server)
│   ├── AwardsSectionHeader (Server)
│   └── AwardsGrid (Server)
│       └── AwardCard × 6 (Server — next/link wrapper)
├── KudosPromotion (Server)
├── Footer (Server, extended with logo + nav links)
└── WidgetButton (Server — render only)
```

### Integration Points

- **Existing Services**: None — static data MVP
- **Shared Components**: `Header.tsx` (extend), `Footer.tsx` (extend), `LanguageSelector.tsx` (reuse), `ProfileDropdown.tsx` (reuse)
- **Existing Icons**: `UserIcon`, `ChevronDownIcon`, `ChevronRightIcon`, `VnFlagIcon` (reuse)
- **Existing CSS Variables**: `--color-bg-primary`, `--color-btn-login` (#FFEA9E), `--color-dropdown-bg`, `--color-dropdown-border`, `--shadow-text-glow`, `--shadow-btn-hover` — reuse where values match
- **Existing Assets**: `public/images/login/saa-logo.png`, `public/images/login/bg-keyvisual.png`, `public/images/login/root-further.png` — verify if reusable for homepage

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/2167-9026-Homepage-SAA/
├── spec.md              # Feature specification
├── design-style.md      # Design style document
├── plan.md              # This file
├── tasks.md             # Task breakdown (next step)
└── assets/
    └── frame.png        # Figma frame screenshot
```

### Source Code (affected areas)

```text
src/
├── app/
│   ├── page.tsx                    # MODIFY — Homepage composition
│   ├── layout.tsx                  # MODIFY — Add Digital Numbers + SVN-Gotham fonts
│   └── globals.css                 # MODIFY — Add new CSS variables
├── components/
│   ├── Header.tsx                  # MODIFY — Add nav links slot, notification bell (inline)
│   ├── HeaderNav.tsx               # NEW — Client component: nav links with active state
│   ├── Footer.tsx                  # MODIFY — Add logo, nav links
│   ├── homepage/                   # NEW — Homepage-specific components
│   │   ├── HeroBanner.tsx
│   │   ├── CountdownTimer.tsx      # "use client"
│   │   ├── CountdownTile.tsx
│   │   ├── EventInfo.tsx
│   │   ├── CTAButton.tsx
│   │   ├── RootFurtherSection.tsx
│   │   ├── AwardsSectionHeader.tsx
│   │   ├── AwardCard.tsx
│   │   ├── AwardsGrid.tsx
│   │   ├── KudosPromotion.tsx
│   │   └── WidgetButton.tsx
│   └── icons/                      # NEW icons
│       ├── ArrowUpRightIcon.tsx
│       ├── NotificationBellIcon.tsx
│       ├── PenIcon.tsx
│       └── SaaMiniIcon.tsx
├── components/__tests__/
│   ├── Header.test.tsx             # MODIFY — Add nav link tests
│   ├── HeaderNav.test.tsx          # NEW — Active state, navigation tests
│   ├── Footer.test.tsx             # MODIFY — Add nav link + logo tests
│   └── homepage/                   # NEW — Homepage component tests
│       ├── HeroBanner.test.tsx     # Includes EventInfo rendering tests
│       ├── CountdownTimer.test.tsx
│       ├── AwardCard.test.tsx
│       ├── AwardsGrid.test.tsx     # Includes AwardsSectionHeader tests
│       ├── KudosPromotion.test.tsx
│       ├── RootFurtherSection.test.tsx
│       ├── CTAButton.test.tsx
│       └── WidgetButton.test.tsx
├── types/
│   └── homepage.ts                 # NEW — TypeScript types
├── hooks/
│   └── useCountdown.ts             # NEW — Countdown logic hook
└── utils/
    └── homepage-data.ts            # NEW — Static data constants (award categories, nav links, event config)
```

### New Files

| File | Purpose |
|------|---------|
| `src/components/homepage/HeroBanner.tsx` | Hero section with bg image, gradient overlay, content |
| `src/components/homepage/CountdownTimer.tsx` | Client component: countdown display with "Comming soon" |
| `src/components/homepage/CountdownTile.tsx` | Single countdown unit (digit + label) |
| `src/components/homepage/EventInfo.tsx` | Event date, location, livestream note |
| `src/components/homepage/CTAButton.tsx` | CTA button with outlined/filled variant |
| `src/components/homepage/RootFurtherSection.tsx` | Decorative illustration + text content |
| `src/components/homepage/AwardsSectionHeader.tsx` | "Hệ thống giải thưởng" heading block |
| `src/components/homepage/AwardCard.tsx` | Individual award card (image, title, desc, link) |
| `src/components/homepage/AwardsGrid.tsx` | Responsive 3-col/2-col grid of award cards |
| `src/components/homepage/KudosPromotion.tsx` | Sun* Kudos promotion section |
| `src/components/homepage/WidgetButton.tsx` | Fixed floating pill button |
| `src/components/HeaderNav.tsx` | Client component: nav links with usePathname for active state |
| `src/components/icons/ArrowUpRightIcon.tsx` | Diagonal arrow icon for "Chi tiết" links |
| `src/components/icons/NotificationBellIcon.tsx` | Bell icon for header notification |
| `src/components/icons/PenIcon.tsx` | Pen icon for widget button |
| `src/components/icons/SaaMiniIcon.tsx` | Mini SAA icon for widget button |
| `src/utils/homepage-data.ts` | Award categories, nav links, event config static data |
| `src/types/homepage.ts` | AwardCategory, NavLink, EventConfig types |
| `src/hooks/useCountdown.ts` | Custom hook: countdown calculation + setInterval |
| `src/hooks/__tests__/useCountdown.test.ts` | Tests for countdown hook |
| `src/components/__tests__/HeaderNav.test.tsx` | Tests for HeaderNav active state, navigation |
| `src/components/__tests__/homepage/RootFurtherSection.test.tsx` | Tests for decorative + content rendering |

### Modified Files

| File | Changes |
|------|---------|
| `src/app/page.tsx` | Replace placeholder with full homepage composition |
| `src/app/layout.tsx` | Add `Digital Numbers` and `SVN-Gotham` local fonts, add weight "400" to Montserrat |
| `src/app/globals.css` | Add new CSS variables for homepage design tokens |
| `src/components/Header.tsx` | Add `navLinks` prop, notification bell, restructure layout for nav |
| `src/components/Footer.tsx` | Add SAA logo, nav links, restructure layout |
| `src/components/__tests__/Header.test.tsx` | Update tests for new nav links |
| `src/components/__tests__/Footer.test.tsx` | Update tests for new layout |

### Assets to Download from Figma

| Media Item | Node ID | Target Path | Purpose |
|------------|---------|-------------|---------|
| Keyvisual BG | 2167:9028 | `public/images/homepage/bg-keyvisual.png` | Hero background |
| Root Further Logo | 2788:12911 | `public/images/homepage/root-further-logo.png` | Decorative section |
| Root Text | 3204:10155 | `public/images/homepage/root-text.png` | Decorative text image |
| Further Text | 3204:10154 | `public/images/homepage/further-text.png` | Decorative text image |
| Award BG | I2167:9075;214:1019;81:2442 | `public/images/homepage/award-bg.png` | Award card background ring |
| Top Talent | I2167:9075;214:1019;214:666;10:951 | `public/images/homepage/awards/top-talent.png` | Award thumbnail |
| Top Project | I2167:9076;214:1019;214:666;214:654 | `public/images/homepage/awards/top-project.png` | Award thumbnail |
| Top Project Leader | I2167:9077;214:1019;214:666;214:655 | `public/images/homepage/awards/top-project-leader.png` | Award thumbnail |
| Best Manager | I2167:9079;214:1019;214:666;214:656 | `public/images/homepage/awards/best-manager.png` | Award thumbnail |
| Signature 2025 Creator | I2167:9080;214:1019;214:666;214:657 | `public/images/homepage/awards/signature-2025-creator.png` | Award thumbnail |
| MVP | I2167:9081;214:1019;214:666;214:653 | `public/images/homepage/awards/mvp.png` | Award thumbnail |
| Kudos Background | I3390:10349;313:8416 | `public/images/homepage/kudos-bg.png` | Kudos section background |
| Logo/Kudos | I3390:10349;329:2948 | `public/images/homepage/kudos-logo.png` | KUDOS branding graphic |
| Pen Icon | I5022:15169;214:3839;186:1763 | Icon component | Widget pen icon |
| Kudos Mini Logo | I5022:15169;214:3839;186:1766;214:3762 | Icon component | Widget SAA icon |
| Up Arrow (CTA) | I2167:9063;186:1766 | Icon component | ArrowUpRight for CTAs |
| Notification Bell | I2167:9091;186:2101;186:2020;186:1420 | Icon component | Header bell icon |
| SAA Logo (footer) | I5001:14800;342:1408;178:1030 | Reuse existing | Footer logo |

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| None | - | No new dependencies required |

### Fonts to Add

| Font | File Source | Load Method | Usage |
|------|-----------|-------------|-------|
| Digital Numbers | Font file (to be provided) | `next/font/local` in `layout.tsx` | Countdown digits (49.15px) |
| SVN-Gotham | Font file (to be provided) | `next/font/local` in `layout.tsx` | "KUDOS" branding text (96.16px) |
| Montserrat weight 400 | Google Fonts (add to existing) | Update `Montserrat()` config | Body text, descriptions |

---

## Implementation Strategy

### Phase Breakdown

#### Phase 0: Asset Preparation
- Download all media assets from Figma using `get_media_files`
- Organize in `public/images/homepage/` and `public/images/homepage/awards/` directories
- Create `assets-map.md` in `.momorph/specs/2167-9026-Homepage-SAA/` to track downloaded assets → local paths
- Add font files for Digital Numbers and SVN-Gotham to `src/app/fonts/`
- Verify asset quality and naming conventions

#### Phase 1: Foundation (Setup)
- Define TypeScript types (`src/types/homepage.ts`)
- Create static data constants (`src/utils/homepage-data.ts`)
- Add new CSS variables to `globals.css`
- Add local fonts to `layout.tsx` (Digital Numbers, SVN-Gotham, Montserrat 400)
- Create new icon components (ArrowUpRightIcon, NotificationBellIcon, PenIcon, SaaMiniIcon)

**Page Composition Strategy**: From Phase 2 onward, `page.tsx` incrementally assembles sections. During Phases 2–5, Header/Footer use their current (un-extended) versions — just logo + LanguageSelector for Header, copyright-only for Footer. Phase 6 extends them with nav links. This ensures backward compatibility with the login page.

#### Phase 2: Core Features — US1 (P1): Hero Banner & Countdown
- Create `useCountdown` hook with tests
- Create `CountdownTile` component
- Create `CountdownTimer` client component
- Create `EventInfo` component
- Create `HeroBanner` component (bg image + gradient + content)
- Wire into `page.tsx`

#### Phase 3: Core Features — US2 (P1): CTA Buttons
- Create `CTAButton` component with outlined/filled variants and hover states
- Add CTA buttons to `HeroBanner`
- Verify navigation to correct pages

#### Phase 4: Core Features — US3 (P1): Award Categories
- Create `AwardCard` component with hover effects
- Create `AwardsGrid` component (responsive 3-col/2-col)
- Create `AwardsSectionHeader` component
- Wire awards section into `page.tsx`

#### Phase 5: Extended Features — US4 + US5 (P2)
- Create `RootFurtherSection` (decorative + content)
- Create `KudosPromotion` section
- Wire sections into `page.tsx`

#### Phase 6: Extended Features — US6 (P2): Header & Footer
- Create `HeaderNav.tsx` client component (`"use client"`, uses `usePathname()` for active state)
- Extend `Header.tsx`: add `navLinks` + `showNotification` props, render `HeaderNav`, inline notification bell with red dot badge
- Extend `Footer.tsx`: add `showLogo` + `navLinks` props, render SAA logo + 4 nav links
- Update existing Header/Footer tests + add new `HeaderNav.test.tsx`
- Update `page.tsx` to pass navLinks and showNotification to Header, navLinks + showLogo to Footer

#### Phase 7: US7 (P3) + Polish
- Create `WidgetButton` component (fixed position, render only)
- Full page composition in `page.tsx`
- Responsive verification across breakpoints
- Accessibility pass (ARIA, keyboard nav, focus indicators)
- Final visual check against design

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Custom fonts (Digital Numbers, SVN-Gotham) not available as files | Medium | High | Use placeholder system fonts initially; add actual fonts when provided. Track as blocker in tasks.md. |
| Hero background image too large (performance) | Medium | Medium | Use `next/image` with quality/size optimization, responsive `sizes` attribute, and WebP format if possible |
| Header restructuring breaks login page layout | Low | High | Header accepts optional `navLinks` prop — if not provided, renders as before (backward compatible) |
| Footer restructuring breaks login page layout | Low | High | Footer accepts optional props — default behavior unchanged |
| Countdown timer flicker on hydration (SSR → client) | Medium | Low | Use `suppressHydrationWarning` on countdown digits, or render placeholder "00" on server |

### Estimated Complexity

- **Frontend**: Medium-High (many components, responsive layout, animation states)
- **Backend**: None
- **Testing**: Medium (countdown hook logic, component rendering, responsive behavior)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: Homepage section composition, Header nav ↔ active state, AwardsGrid ↔ AwardCard rendering
- [ ] ~~**External dependencies**: N/A (static data)~~
- [ ] ~~**Data layer**: N/A (no database)~~
- [x] **User workflows**: Navigation from CTA → Awards page, Award card click → hash anchor navigation

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Countdown timer updates, CTA navigation, award card click |
| Service ↔ Service | No | N/A |
| App ↔ External API | No | N/A |
| App ↔ Data Layer | No | N/A |
| Cross-platform | Yes | Responsive grid (3-col → 2-col), mobile header collapse |

### Test Environment

- **Environment type**: Local (jsdom via Vitest)
- **Test data strategy**: Static fixtures matching `src/utils/homepage-data.ts`
- **Isolation approach**: Fresh render per test, vi.useFakeTimers() for countdown

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| `next/image` | Mock (return `<img>`) | jsdom doesn't support Next.js Image optimization |
| `next/link` | Mock (return `<a>`) | Verify href values without Next.js router |
| `next/navigation` | Mock (`usePathname`) | Control active nav state in tests |
| `NEXT_PUBLIC_EVENT_DATETIME` | Env override | Set specific dates for countdown testing |
| `setInterval` / `Date.now` | `vi.useFakeTimers()` | Deterministic countdown testing |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Homepage renders all sections (hero, awards, kudos, footer)
   - [x] Countdown displays correct remaining time
   - [x] Countdown updates every 60 seconds
   - [x] Award grid shows 6 cards with correct data
   - [x] CTA buttons have correct hrefs
   - [x] Header shows nav links with correct active state
   - [x] Footer shows logo, nav links, copyright

2. **Error Handling**
   - [x] Missing `NEXT_PUBLIC_EVENT_DATETIME` → shows 00/00/00
   - [x] Invalid date format → shows 00/00/00
   - [x] Past event date → shows 00/00/00, hides "Comming soon"

3. **Edge Cases**
   - [x] Countdown reaches zero during viewing
   - [x] Award description exceeds 2 lines (ellipsis)
   - [x] Very narrow viewport (320px)

### Tooling & Framework

- **Test framework**: Vitest 4.x + React Testing Library
- **Supporting tools**: @testing-library/user-event for interactions
- **CI integration**: `yarn test:run` in CI pipeline

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| useCountdown hook | 95%+ | High |
| Component rendering | 85%+ | High |
| Navigation/links | 90%+ | High |
| Responsive behavior | 70%+ | Medium |
| Accessibility attributes | 85%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved
- [x] `design-style.md` reviewed
- [ ] Font files available (Digital Numbers, SVN-Gotham)
- [ ] Figma media assets downloaded

### External Dependencies

- Font files: "Digital Numbers" and "SVN-Gotham" — must be provided as `.woff2` / `.ttf` / `.otf` files
- Figma media assets: 12+ images to download via `get_media_files` tool

---

## Key Implementation Details

### Countdown Timer Logic (`useCountdown` hook)

```typescript
// src/hooks/useCountdown.ts
// Reads NEXT_PUBLIC_EVENT_DATETIME env var
// Returns { days, hours, minutes, isExpired }
// Updates every 60 seconds via setInterval
// Returns 0/0/0 + isExpired=true if date is past or invalid
```

### Header Extension Strategy

Current Header accepts `children` prop (right side). New approach:
- Extract nav links to a separate `HeaderNav` client component (`"use client"` — uses `usePathname()`)
- Header remains a Server Component, renders `HeaderNav` as a child
- NotificationBell is **inline JSX** in Header (button wrapping `NotificationBellIcon` + red dot `<span>`), controlled by `showNotification` prop — too simple for a separate file
- Keep backward compatibility — login page uses Header without navLinks/notification

```tsx
// Extended Header interface
interface HeaderProps {
  children?: React.ReactNode;
  navLinks?: Array<{ label: string; href: string }>;
  showNotification?: boolean;
}
// When navLinks is provided: [Logo] — [HeaderNav] — [Bell][children][LangSelector]
// When navLinks is omitted: [Logo] — [children][LangSelector] (current login behavior)
```

### Footer Extension Strategy

Current Footer is minimal (copyright only). New approach:
- Add optional `showLogo` prop
- Add optional `navLinks` prop
- Keep backward compatibility — login page uses simple Footer

```tsx
// Extended Footer interface
interface FooterProps {
  navLinks?: Array<{ label: string; href: string }>;
  showLogo?: boolean;
}
```

### CTA Button Variants

Both buttons share the same state machine:
- **Normal**: Outlined (translucent bg, gold border, white text)
- **Hover**: Filled (solid gold bg, dark text)
- **Active**: Darker gold (#FFD740)
- **Focus**: Gold outline offset

The "ABOUT AWARDS" button appears filled in the Figma screenshot (captured in hover state), but its normal state is outlined — same as "ABOUT KUDOS".

### Award Card Click → Hash Navigation

Each card wraps its content in `next/link` with `href="/awards-information#slug"`. The slug maps to each award category (e.g., `top-talent`, `top-project`).

### CSS Variables Strategy

New variables added to `globals.css` under `:root`:
- `--color-text-gold: #FFEA9E` (alias for --color-btn-login, semantic name)
- `--color-border-gold: #998C5F`
- `--color-btn-secondary-bg: rgba(255, 234, 158, 0.1)`
- `--color-notification-dot: rgba(212, 39, 29, 1)`
- `--color-kudos-text: #DBD1C1`
- `--font-digital-numbers: var(--font-digital-numbers)` (from next/font/local)
- `--font-svn-gotham: var(--font-svn-gotham)` (from next/font/local)

Reuse existing: `--color-bg-primary`, `--color-btn-login`, `--color-btn-login-hover`, `--color-btn-login-active`, `--shadow-btn-hover`, `--shadow-text-glow`, `--color-border-footer`.

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order (Phase 0 → assets first)

---

## Notes

- No new npm dependencies needed — everything uses Next.js built-in features, TailwindCSS, and React
- Montserrat weight 400 needs to be added to the existing Google Fonts config in `layout.tsx` (currently only 500 and 700)
- The hero section height (1392px) is the Figma design height — in implementation, use `min-height` with responsive values, not a fixed height
- "Comming soon" spelling is intentional per Figma design — do not "fix" it
- Award card thumbnails combine a background ring image (`award-bg.png`) with an individual award icon overlay — implementation may use a single composite image per card (downloaded from Figma) or layer two images
- Widget button is render-only for this spec — no click handler needed
- The `HeaderNav` component needs `"use client"` because it uses `usePathname()` from `next/navigation`
- Font files go in `src/app/fonts/` directory (e.g., `src/app/fonts/DigitalNumbers.woff2`, `src/app/fonts/SVNGotham.woff2`)
- Static data constants go in `src/utils/homepage-data.ts` (not a new `src/data/` directory) to comply with constitution's folder structure
- NotificationBell is inline JSX in Header (not a separate component) — wraps `NotificationBellIcon` + a positioned red dot `<span>`. Simple enough to not warrant its own file.
- Simple static components (EventInfo, AwardsSectionHeader) are tested within their parent component's test files (HeroBanner.test.tsx, AwardsGrid.test.tsx respectively) rather than having dedicated test files
