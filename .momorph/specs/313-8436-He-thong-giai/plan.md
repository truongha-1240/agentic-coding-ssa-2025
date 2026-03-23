# Implementation Plan: Hệ thống giải (Awards Information)

**Frame**: `313-8436-He-thong-giai`
**Date**: 2026-03-16
**Spec**: `specs/313-8436-He-thong-giai/spec.md`
**Reviewed**: 2026-03-16

---

## Summary

Build the Awards Information page (`/awards-information`) — a full-page, read-only detail screen displaying the SAA 2025 awards system. The page features a keyvisual banner, a two-column layout with a sticky sidebar navigation (scroll-spy) and 6 award detail cards with alternating image-left/image-right layouts, plus a Sun* Kudos promotion section. All award data is static (no API). Reuses shared Header and Footer components.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS v4, next/image, next/link
**Database**: N/A (static data for MVP)
**Testing**: Vitest 4.x + React Testing Library 16.x + @testing-library/jest-dom (JSDOM environment, `@` alias configured in `vitest.config.ts`)
**State Management**: Local `useState` for active sidebar item
**API Style**: N/A (static constants)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

### Principle I — Clean Code & Source Organization

- [x] Route segment: `src/app/awards-information/` (kebab-case) ✅
- [x] Components: PascalCase (`AwardCard.tsx`, `AwardsSidebar.tsx`, etc.) ✅
- [x] Single responsibility per file ✅
- [x] Functions < 30 lines — AwardCard render may approach limit; extract sub-sections (QuantitySection, PrizeSection) if needed ✅
- [x] No code duplication — reuse shared Header/Footer/data constants ✅
- [x] TypeScript strict — no `any` types ✅
- [x] Import paths use `@/*` alias ✅
- [x] ESLint pass with zero warnings ✅

### Principle II — Framework Best Practices

- [x] Server Components by default; `"use client"` only for `AwardsSidebar.tsx` (scroll-spy hooks) ✅
- [x] `loading.tsx` for route segment ✅ (added to file list)
- [x] `next/image` for all images with `sizes` attribute ✅
- [x] `next/link` for page navigation, `<a href="#slug">` for in-page anchors ✅
- [x] TailwindCSS utility classes only — no `@apply` ✅
- [x] No Supabase usage on this page (read-only static content) ✅

### Principle III — Responsive Design

- [x] Mobile (>=320px), Tablet (>=768px), Desktop (>=1024px) breakpoints ✅
- [x] Tailwind responsive utilities (`md:`, `lg:`) ✅
- [x] Touch targets >= 44x44px for sidebar links and CTA buttons ✅
- [x] Flexible containers (flex/grid), no fixed widths on mobile ✅
- [x] `next/image` with responsive `sizes` ✅

### Principle IV — Security-First

- [x] Read-only page, no user input — minimal attack surface ✅
- [x] No API routes, no Supabase queries, no sensitive data ✅
- [x] Static data only — no injection vectors ✅

### Principle V — Test-First Development

- [x] TDD cycle: RED → GREEN → REFACTOR ✅
- [x] Every user story has at least one integration test ✅
- [x] Unit tests for business logic (`useScrollSpy` hook, data constants) ✅
- [x] Test files in `__tests__/` directories (matching project convention) ✅
- [x] Tests independently runnable ✅

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | — | — |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based — page-specific components in `src/components/awards-information/`, reuse shared Header/Footer
- **Styling Strategy**: TailwindCSS utility classes, existing CSS variables from `globals.css` (`--color-text-gold`, `--color-bg-primary`, `--shadow-text-glow`, etc.). New tokens use direct Tailwind values (e.g., `bg-[#2E3940]`) since they are page-specific.
- **Data Fetching**: None — static data defined as typed constants in `src/utils/awards-data.ts`
- **Rendering**: Server Component by default. Only `AwardsSidebar.tsx` requires `"use client"` (scroll-spy via `IntersectionObserver`, `useState`, `scrollIntoView`)

### Component Architecture

```
Page (Server Component) — src/app/awards-information/page.tsx
├── Header (shared, reused)
├── <main> wrapper
│   ├── Keyvisual background image (absolute positioned, next/image priority)
│   ├── Gradient overlay div (absolute positioned)
│   └── "Bia" content container (relative z-[3], flex-col, gap-[120px])
│       ├── Root Further Logo (inline next/image — 338x150)
│       ├── SectionTitle (Server Component)
│       ├── AwardsLayout (Server Component — wrapper)
│       │   ├── AwardsSidebar (Client Component — scroll-spy)
│       │   └── AwardsList (Server Component)
│       │       └── AwardCard x6 (Server Component — alternating variant)
│       └── AwardsKudosPromotion (Server Component)
└── Footer (shared, reused)
```

### Key Design Decisions

1. **Single AwardCard component with `variant` prop** — `"image-left"` (odd: D.1, D.3, D.5) and `"image-right"` (even: D.2, D.4, D.6) controlled by index parity. If the card render function exceeds 30 lines, extract `QuantitySection` and `PrizeSection` as internal sub-components within the same file.
2. **AwardsSidebar as the only Client Component** — uses `IntersectionObserver` via `useScrollSpy` hook for scroll-spy, `scrollIntoView` for smooth scrolling, `useState` for active item. Receives section IDs as props from the server component.
3. **New `AwardDetailCategory` type** — extends concept of `AwardCategory` from `src/types/homepage.ts` with additional fields: `quantity`, `unit`, `prizeValue`, `prizeNote`, and optional `secondPrize` for the Signature 2025 dual-prize layout. Defined in `src/types/awards.ts`.
4. **Separate `awards-data.ts` with FULL descriptions** — The homepage `AWARD_CATEGORIES` has short descriptions. The awards-information page needs full-length descriptions from the Figma design. Create `AWARD_DETAIL_CATEGORIES` in `src/utils/awards-data.ts` with complete text. Same slugs as homepage for cross-page consistency.
5. **Sticky sidebar** — `position: sticky; top: 96px` (header is `fixed h-20` = 80px, plus 16px gap). The sidebar sticks below the header while the user scrolls through award cards.
6. **Hash anchor navigation** — each award section gets `id={slug}`, sidebar uses `<a href="#slug">`, page-level `useEffect` checks `window.location.hash` on mount and scrolls to the target section. This supports incoming links from homepage award cards (`/awards-information#top-project`).
7. **Page top padding** — `pt-[120px] lg:pt-[176px]` to account for the fixed header (matching homepage pattern from `src/app/page.tsx:52`).
8. **Root Further Logo as inline image** — Simple decorative `next/image` rendered directly in the page component, not extracted to a separate component (single use, no logic).
9. **Award thumbnails: new assets at higher resolution** — Homepage uses award thumbnails in `public/images/homepage/awards/` at card size. The awards-information page needs 336x336px images with golden ring/glow decoration baked in (mix-blend-mode: screen). Export new assets from Figma to `public/images/awards-information/`. If the existing homepage images are identical (same resolution + glow), reuse them to avoid duplication.

### Integration Points

- **Shared Components**: `Header.tsx`, `Footer.tsx`, `HeaderNav.tsx`, `ProfileDropdown.tsx`, `LanguageSelector.tsx`
- **Shared Data**: `HEADER_NAV_LINKS`, `FOOTER_NAV_LINKS` from `src/utils/homepage-data.ts`
- **Shared Types**: `NavLink` from `src/types/homepage.ts`
- **Existing Icons**: `ArrowUpRightIcon` (for Kudos CTA)
- **New Icons Needed**: `TargetIcon` (24x24, award title + sidebar), `DiamondIcon` (24x24, quantity section), `LicenseIcon` (24x24, prize section)
- **Homepage AwardCard links**: Already point to `/awards-information#${slug}` — our page must support these hash anchors
- **Active header nav**: `HeaderNav.tsx` uses `usePathname()` matching `/awards-information` — works automatically, no modification needed

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/313-8436-He-thong-giai/
├── spec.md              # Feature specification
├── design-style.md      # Design specifications
├── plan.md              # This file
├── tasks.md             # Task breakdown (next step)
└── assets/
    └── frame.png        # Design reference
```

### Source Code — New Files

```text
src/
├── app/awards-information/
│   ├── page.tsx                          # Awards Information page (Server Component)
│   └── loading.tsx                       # Loading skeleton (Constitution Principle II)
├── components/awards-information/
│   ├── SectionTitle.tsx                  # "Sun* Annual Awards 2025" title block
│   ├── AwardsLayout.tsx                  # Two-column layout wrapper (sidebar + cards)
│   ├── AwardsSidebar.tsx                 # Sticky sidebar nav with scroll-spy (Client)
│   ├── AwardsList.tsx                    # Awards list container
│   ├── AwardCard.tsx                     # Individual award detail card (alternating)
│   └── AwardsKudosPromotion.tsx          # Sun* Kudos promotion section (adapted)
├── components/icons/
│   ├── TargetIcon.tsx                    # Target icon (award titles, sidebar)
│   ├── DiamondIcon.tsx                   # Diamond icon (quantity section)
│   └── LicenseIcon.tsx                   # License icon (prize section)
├── hooks/
│   └── useScrollSpy.ts                  # IntersectionObserver hook for scroll-spy
├── types/
│   └── awards.ts                         # AwardDetailCategory type definition
└── utils/
    └── awards-data.ts                    # Static award detail data (6 categories, FULL descriptions)
```

### Source Code — Test Files

Following the project convention of `__tests__/` directories:

```text
src/
├── components/__tests__/awards-information/
│   ├── SectionTitle.test.tsx             # Section title rendering
│   ├── AwardsSidebar.test.tsx            # Sidebar navigation, scroll-spy, active state
│   ├── AwardsList.test.tsx               # Awards list rendering, alternating layout
│   ├── AwardCard.test.tsx                # Card rendering, data display, dual-prize variant
│   └── AwardsKudosPromotion.test.tsx     # Kudos section rendering, CTA link
├── hooks/__tests__/
│   └── useScrollSpy.test.ts             # IntersectionObserver mock, active section detection
├── app/awards-information/__tests__/
│   └── page.test.tsx                     # Page integration test (full render, hash nav)
└── utils/__tests__/
    └── awards-data.test.ts              # Data completeness, type validation
```

### Source Code — New Assets

```text
public/images/awards-information/
├── keyvisual.png                         # Keyvisual banner (1440x547, priority load)
├── root-further-logo.png                 # Root Further logo (338x150)
├── top-talent.png                        # Award thumbnails (336x336 each, with golden glow)
├── top-project.png
├── top-project-leader.png
├── best-manager.png
├── signature-2025-creator.png
├── mvp.png
└── kudos-bg.png                          # Kudos section background
```

**Note on image assets**: Check if homepage images at `/images/homepage/awards/*.png` are already 336x336 with golden glow. If identical, symlink or reuse the same paths. If different resolution or without glow effect, export new assets from Figma.

### Source Code — Modified Files

| File | Changes |
|------|---------|
| None | Shared Header/Footer already support active nav state via `usePathname()` matching `/awards-information`. No CSS variable additions needed — page-specific tokens use direct Tailwind values. |

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| None | — | No new dependencies required. All tools already in package.json. |

---

## Implementation Strategy

### Phase 0: Asset Preparation

- Download required UI assets from Figma using `get_media_files` tool:
  - Keyvisual banner image (1440x547px) → `public/images/awards-information/keyvisual.png`
  - Root Further logo (338x150px) → `public/images/awards-information/root-further-logo.png`
  - 6 award thumbnail images (336x336px with golden ring/glow baked in) → `public/images/awards-information/{slug}.png`
  - Kudos section background image → `public/images/awards-information/kudos-bg.png`
- Download icon SVGs from Figma: Target (24x24), Diamond (24x24), License (24x24)
- Create icon React components in `src/components/icons/` (following existing pattern: `ArrowUpRightIcon.tsx`)
- Verify all images render correctly at expected dimensions

**Deliverables**: 9 image files in `public/images/awards-information/`, 3 icon components in `src/components/icons/`

### Phase 1: Foundation (Types, Data, Hook)

- **Types**: Create `src/types/awards.ts`:
  ```typescript
  export interface AwardPrize {
    value: string;    // e.g., "7.000.000 VNĐ"
    note?: string;    // e.g., "cho mỗi giải thưởng"
  }
  // Note: The prize label "Giá trị giải thưởng:" is static UI text,
  // hardcoded in AwardCard — NOT stored per prize entry.

  export interface AwardDetailCategory {
    name: string;              // "Top Talent"
    slug: string;              // "top-talent"
    description: string;       // FULL description from Figma (not homepage short text)
    thumbnailPath: string;     // "/images/awards-information/top-talent.png"
    quantity: string;           // "10"
    unit: string;              // "Đơn vị"
    prizes: AwardPrize[];      // Array — 1 item for most cards, 2 for Signature 2025
  }
  ```
- **Data**: Create `src/utils/awards-data.ts` with `AWARD_DETAIL_CATEGORIES` typed constant array (6 entries). Each entry must use the FULL description text from Figma design, NOT the abbreviated homepage descriptions. Signature 2025 has `prizes: [{ value: "5.000.000 VNĐ", note: "cho giải cá nhân" }, { value: "8.000.000 VNĐ", note: "cho giải tập thể" }]` with "Hoặc" divider between them. Static labels ("Số lượng giải thưởng:", "Giá trị giải thưởng:") are hardcoded in AwardCard component, not in data.
- **Hook**: Create `src/hooks/useScrollSpy.ts`:
  - Accepts array of section IDs (slugs)
  - Uses `IntersectionObserver` with `threshold: [0, 0.25, 0.5]` and `rootMargin: "-96px 0px 0px 0px"` (offset for fixed header)
  - Returns `activeId: string`
  - Handles cleanup on unmount
  - Handles initial hash from URL (`window.location.hash`)

**Deliverables**: `awards.ts`, `awards-data.ts`, `useScrollSpy.ts` + corresponding test files (TDD: write tests first)

### Phase 2: Core Page Structure (US1-P2, US2-P1, US4-P1, US6-P3)

- Create `src/app/awards-information/page.tsx` (Server Component):
  - Import shared Header with `HEADER_NAV_LINKS`, `showNotification`, ProfileDropdown
  - Import shared Footer with `FOOTER_NAV_LINKS`, `showLogo`
  - `<main>` wrapper with:
    - Keyvisual background: `<Image>` absolute positioned, `priority`, `sizes="100vw"`, `w-full h-[547px] object-cover z-[1]`
    - Gradient overlay: `<div>` absolute positioned with `linear-gradient(0deg, #00101A -4.23%, rgba(0, 19, 32, 0) 52.79%)`, `h-[627px] z-[2]`
    - "Bia" content container: `relative z-[3] flex flex-col items-start gap-16 lg:gap-[120px] pt-[120px] lg:pt-[176px] pb-16 lg:pb-24 px-6 lg:px-36`
  - Root Further Logo: inline `<Image src="/images/awards-information/root-further-logo.png" alt="" width={338} height={150} aria-hidden="true" />`
  - `<SectionTitle />`
  - `<AwardsLayout />` (contains sidebar + cards)
  - `<AwardsKudosPromotion />`
- Create `src/app/awards-information/loading.tsx` — skeleton matching page layout
- Create `src/components/awards-information/SectionTitle.tsx`:
  - "Sun* Annual Awards 2025" subtitle (24px, white, center)
  - 1px #2E3940 separator line
  - "Hệ thống giải thưởng SAA 2025" title (57px/700, gold `text-[var(--color-text-gold)]`, tracking-[-0.25px])

**Deliverables**: `page.tsx`, `loading.tsx`, `SectionTitle.tsx` + tests

### Phase 3: Awards Content (US2-P1, US3-P1)

- Create `src/components/awards-information/AwardsLayout.tsx` (Server Component):
  - Desktop: `flex flex-row justify-between gap-20 w-full max-w-[1152px]`
  - Mobile/Tablet: `flex flex-col`
  - Renders `<AwardsSidebar />` and `<AwardsList />`

- Create `src/components/awards-information/AwardsSidebar.tsx` (Client Component — `"use client"`):
  - Props: `categories: AwardDetailCategory[]`
  - Uses `useScrollSpy` hook with category slugs
  - Desktop: `w-[178px] sticky top-24 flex flex-col gap-4` (top-24 = 96px)
  - Mobile: horizontal scrollable strip `flex flex-row overflow-x-auto gap-2`
  - Each nav item: `<a href="#${slug}">` with TargetIcon + label
  - Active state: `text-[var(--color-text-gold)] border-b border-[#FFEA9E]` + text-shadow glow
  - Normal state: `text-white rounded hover:bg-[rgba(255,234,158,0.1)]`
  - Transition: `transition-all duration-150 ease-in-out` on all nav items (per design-style: 150ms for bg-color, color, border changes)
  - `aria-current="true"` on active link
  - `onClick`: calls `scrollIntoView({ behavior: 'smooth' })` + `preventDefault()`
  - Touch targets: `p-4` = 48px+ height (meets 44px minimum)

- Create `src/components/awards-information/AwardsList.tsx` (Server Component):
  - Props: `categories: AwardDetailCategory[]`
  - Maps categories, renders `<AwardCard>` for each with `variant` based on index
  - `flex flex-col gap-20 w-full lg:w-[853px]`

- Create `src/components/awards-information/AwardCard.tsx` (Server Component):
  - Props: `category: AwardDetailCategory`, `variant: "image-left" | "image-right"`, `isLast?: boolean`
  - **Outer wrapper**: `<section id={slug} className="flex flex-col gap-20">` — contains inner frame + bottom separator. The `gap-20` (80px) matches design-style node layout (card is `flex-col gap:80px` between content frame and separator).
  - **Inner frame**: `flex flex-col lg:flex-row gap-10 items-start` (reversed with `lg:flex-row-reverse` for image-right variant)
  - Award thumbnail: `<Image width={336} height={336} sizes="(max-width: 768px) 100vw, 336px" />` with `mix-blend-screen` and golden glow shadow `shadow-[0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]`. Hover: `hover:shadow-[0_4px_8px_rgba(0,0,0,0.3),0_0_12px_#FAE287] transition-shadow duration-200 ease-in-out` (per design-style animation spec).
  - Content area: `flex flex-col gap-8 rounded-2xl backdrop-blur-[32px]`
  - Title row: TargetIcon + title in gold
  - Description: `text-base font-bold text-white text-justify lg:w-[480px]` (480px max on desktop, full-width on mobile)
  - Quantity section: number (36px) + unit (14px) + DiamondIcon + "Số lượng giải thưởng:" label (24px gold) — label hardcoded
  - Prize section(s): LicenseIcon + "Giá trị giải thưởng:" label (24px gold, hardcoded) + value (36px) + note (14px)
  - Signature 2025 special: renders TWO prize sections with "Hoặc" text (`text-sm font-bold text-[#2E3940]`) between them
  - Bottom separator: `w-full h-px bg-[#2E3940]` (omit on last card)
  - Mobile: stack image on top, content below, full-width

- Hash anchor navigation:
  - Each `<section id={slug}>` enables browser-native hash linking
  - `AwardsSidebar` handles initial hash scroll via `useScrollSpy` hook's mount effect

**Deliverables**: `AwardsLayout.tsx`, `AwardsSidebar.tsx`, `AwardsList.tsx`, `AwardCard.tsx` + tests

### Phase 4: Kudos Promotion & Polish (US5-P2)

- Create `src/components/awards-information/AwardsKudosPromotion.tsx` (Server Component):
  - Adapts from homepage `KudosPromotion.tsx` but with awards-page specific layout:
    - Container: `w-full max-w-[1152px] h-auto lg:h-[500px] rounded-2xl overflow-hidden relative`
    - Background: `<Image fill>` with kudos-bg.png
    - Content left (470px on desktop): "Phong trào ghi nhận" (24px white) + "Sun* Kudos" (57px gold) + "ĐIỂM MỚI CỦA SAA 2025" + description + "Chi tiết" CTA
    - Right: KUDOS branding graphic + decorative elements
  - "Chi tiết" CTA button states:
    - Normal: `bg-[var(--color-text-gold)] text-[#00101A] rounded px-4 py-4`
    - Hover: `hover:bg-[#00101A] hover:text-[var(--color-text-gold)] hover:border hover:border-[var(--color-text-gold)] hover:shadow-[0_4px_12px_rgba(255,234,158,0.3)]`
    - Focus: `focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2`
  - CTA links to `/sun-kudos` via `next/link`
  - Mobile: stack vertically, hide KUDOS branding graphic

**Deliverables**: `AwardsKudosPromotion.tsx` + test

### Phase 5: Responsive Design (US7-P2)

Apply responsive breakpoints to all components created in Phases 2-4:

- **Mobile (<768px)**:
  - Content padding: `px-6` (24px)
  - Sidebar: horizontal scrollable strip above content (`flex-row overflow-x-auto`)
  - Award cards: single column, image stacked on top (`flex-col`), thumbnails scale to full width
  - Award content width: `w-full` (no fixed 480px)
  - Section title: `text-[32px] leading-[40px]`
  - Kudos: stack vertically, KUDOS branding hidden
  - Root Further logo: scaled to ~200px width

- **Tablet (768px-1023px)**:
  - Content padding: `px-12` (48px)
  - Sidebar: horizontal nav or collapsed
  - Award cards: side-by-side at reduced widths, image scaled to 250px
  - Section title: `text-[40px]`

- **Desktop (>=1024px)**:
  - Full design specs as documented in design-style.md
  - Two-column layout: 178px sidebar + 853px content within 1152px effective width
  - Content padding: `px-36` (144px)

- **All viewports**: No horizontal scrollbar, text readable without zooming

**Deliverables**: Responsive Tailwind classes on all components, visual verification at 320px/768px/1024px/1440px

### Phase 6: Accessibility & Edge Cases (US6-P3, Edge Cases)

- **Semantic HTML**:
  - `<nav aria-label="Award categories">` for sidebar
  - `<main>` for content area
  - `<section id={slug} aria-labelledby={slug + "-title"}>` for each award card
  - Shared `<header>` and `<footer>` landmarks (already in shared components)

- **Keyboard Navigation**:
  - Tab order: header nav → sidebar links → award sections (implicit) → Kudos CTA → footer
  - All interactive elements (sidebar `<a>`, CTA `<Link>`) natively keyboard-accessible

- **ARIA attributes**:
  - `aria-current="true"` on active sidebar link (updated by scroll-spy)
  - `aria-hidden="true"` + `alt=""` on decorative images (keyvisual, thumbnails, Root Further logo)
  - `aria-label` on sidebar `<nav>`

- **Focus Indicators**:
  - All focusable elements: `focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2`

- **Scroll-into-view Entrance Animation** (per design-style Animation & Transitions table):
  - Award cards: `opacity: 0 → 1`, `translateY(20px) → 0`, `200ms ease-out`, triggered when card enters viewport
  - Implementation: CSS class with `@keyframes` in Tailwind `animate-` utility, triggered by an IntersectionObserver in a lightweight Client wrapper OR via CSS `animation-timeline: view()` if browser support allows. Alternatively, add `data-animate` attribute and apply via a single scroll-triggered observer in `AwardsSidebar.tsx` (already has IntersectionObserver).
  - Fallback: If performance is a concern on mobile, disable via `motion-safe:` Tailwind modifier

- **Edge Cases**:
  - Invalid hash anchor (`#nonexistent`): page loads normally, no scroll, first sidebar item active (handled by `useScrollSpy` defaulting to first item)
  - Image load failure: `next/image` handles gracefully; add `placeholder="blur"` with blurDataURL for thumbnails
  - Very narrow screens (320px): single-column, horizontal sidebar strip, proportional scaling
  - Homepage hash navigation (`/awards-information#top-project`): handled by `useScrollSpy` mount effect

**Deliverables**: ARIA attributes, focus styles, entrance animations, edge case handling + tests

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: Sidebar click → scroll to section, scroll-spy → sidebar active state
- [ ] **External dependencies**: N/A (no API calls)
- [ ] **Data layer**: N/A (static data)
- [x] **User workflows**: Page load → view awards → sidebar navigation → Kudos CTA click

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Sidebar scroll-spy, hash anchor navigation, smooth scroll |
| Service ↔ Service | No | — |
| App ↔ External API | No | — |
| App ↔ Data Layer | No | — |
| Cross-platform | Yes | Responsive layout across breakpoints |

### Test Environment

- **Environment type**: Local (JSDOM via Vitest + React Testing Library)
- **Config**: `vitest.config.ts` already configured with JSDOM, React plugin, `@` alias, `vitest.setup.ts`
- **Test data strategy**: Import static fixtures directly from `src/utils/awards-data.ts`
- **Isolation approach**: Fresh render per test, mock IntersectionObserver

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| IntersectionObserver | Mock (vi.fn) | Not available in JSDOM |
| next/image | Default (auto-mocked by Next.js test setup) | Standard approach |
| next/link | Default | Standard approach |
| next/navigation (usePathname) | Mock | Required for HeaderNav active state |
| window.scrollIntoView | Mock (vi.fn) | Not available in JSDOM |
| window.location.hash | Mock | For hash anchor navigation tests |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Page renders all 6 award cards with correct data (title, quantity, prize) — `page.test.tsx`
   - [x] Sidebar displays 6 navigation links with correct labels — `AwardsSidebar.test.tsx`
   - [x] Award cards alternate between image-left and image-right layout — `AwardsList.test.tsx`
   - [x] Section title displays "Hệ thống giải thưởng SAA 2025" in gold — `SectionTitle.test.tsx`
   - [x] Kudos section displays with "Chi tiết" CTA linking to `/sun-kudos` — `AwardsKudosPromotion.test.tsx`
   - [x] Signature 2025 card renders dual-prize layout with "Hoặc" divider — `AwardCard.test.tsx`
   - [x] Award data contains all 6 categories with complete fields — `awards-data.test.ts`

2. **Interactions**
   - [x] Clicking sidebar link calls scrollIntoView on target section — `AwardsSidebar.test.tsx`
   - [x] Scroll-spy updates active sidebar item based on IntersectionObserver — `useScrollSpy.test.ts`
   - [x] "Chi tiết" CTA has correct href to `/sun-kudos` — `AwardsKudosPromotion.test.tsx`
   - [x] Hash anchor on page load sets correct initial active section — `useScrollSpy.test.ts`

3. **Edge Cases**
   - [x] Invalid hash anchor — page loads normally, no error — `useScrollSpy.test.ts`
   - [x] All award images have empty alt text (decorative) — `AwardCard.test.tsx`
   - [x] Sidebar active state defaults to first item when no section is in view — `useScrollSpy.test.ts`
   - [x] Each award section has correct `id` attribute for hash targeting — `AwardCard.test.tsx`

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Award data rendering (6 cards, all fields) | 90%+ | High |
| Sidebar navigation logic (scroll-spy, click) | 85%+ | High |
| useScrollSpy hook (IntersectionObserver, hash) | 90%+ | High |
| Responsive layout (breakpoint behavior) | 75%+ | Medium |
| Accessibility attributes (ARIA, semantic HTML) | 80%+ | Medium |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Figma asset export quality (golden glow on thumbnails) | Medium | Medium | Export with glow baked into PNG at 2x resolution, use `mix-blend-mode: screen` in CSS. Verify visual output before proceeding. |
| SVN-Gotham font not available in project | High | Low | Only used for "KUDOS" branding text in Kudos section. Use fallback `font-sans` or load via `next/font/local` if font file is available. Not a blocker. |
| IntersectionObserver scroll-spy accuracy with variable card heights | Medium | Medium | Use `threshold: [0, 0.25, 0.5]` and `rootMargin: "-96px 0px 0px 0px"` (header offset). Test with all 6 cards at different scroll positions. Adjust thresholds if needed during implementation. |
| Sticky sidebar overlap with fixed header | Low | Low | `top: 96px` (header 80px + 16px gap) verified against Header's `h-20` (80px). |
| Award thumbnail images large file size impacting Lighthouse (TR-006) | Medium | Medium | Use `next/image` with responsive `sizes` attribute (`sizes="(max-width: 768px) 100vw, 336px"`), lazy loading for below-fold images. Keyvisual uses `priority` for LCP. Target WebP via Next.js automatic format optimization. |
| `backdrop-filter: blur(32px)` on award content causes jank | Medium | Low | Test on low-end devices. If performance issues, reduce blur value or remove on mobile via `lg:backdrop-blur-[32px]`. Add `will-change: transform` if needed. |
| Page load time exceeds 3s on 3G (TR-006) | Low | High | Keyvisual `priority` for LCP, all other images lazy-loaded. Static data (no API calls). Lighthouse audit during Phase 5 — adjust if score < 80. |
| Scroll-into-view animation jank on low-end devices | Low | Low | Use CSS animations (not JS-driven) with `motion-safe:` Tailwind modifier. Disable on `prefers-reduced-motion`. Keep animation lightweight (opacity + translateY only, 200ms). |

### Estimated Complexity

- **Frontend**: Medium (scroll-spy logic, alternating card layouts, dual-prize special case, responsive 3-breakpoint design)
- **Backend**: None
- **Testing**: Medium (IntersectionObserver mocking, scroll behavior verification, 6 card data validation)

---

## Spec → Plan Traceability Matrix

| Spec Requirement | Plan Phase | Component(s) | Test File(s) |
|------------------|-----------|---------------|-------------|
| US1 — Keyvisual Banner (P2) | Phase 2 | `page.tsx` (inline) | `page.test.tsx` |
| US2 — Section Title & Awards (P1) | Phase 2, 3 | `SectionTitle.tsx`, `AwardsList.tsx`, `AwardCard.tsx` | `SectionTitle.test.tsx`, `AwardsList.test.tsx`, `AwardCard.test.tsx` |
| US3 — Sidebar Navigation (P1) | Phase 3 | `AwardsSidebar.tsx`, `useScrollSpy.ts` | `AwardsSidebar.test.tsx`, `useScrollSpy.test.ts` |
| US4 — Header Active State (P1) | Phase 2 | `page.tsx` (shared Header) | `page.test.tsx` |
| US5 — Kudos Promotion (P2) | Phase 4 | `AwardsKudosPromotion.tsx` | `AwardsKudosPromotion.test.tsx` |
| US6 — Footer (P3) | Phase 2 | `page.tsx` (shared Footer) | `page.test.tsx` |
| US7 — Responsive Layout (P2) | Phase 5 | All components | Visual testing |
| FR-001 — Keyvisual + gradient | Phase 2 | `page.tsx` | `page.test.tsx` |
| FR-002 — Bia container 1152px | Phase 2 | `page.tsx` | `page.test.tsx` |
| FR-003 — Section title | Phase 2 | `SectionTitle.tsx` | `SectionTitle.test.tsx` |
| FR-004 — Sidebar 178px, 6 links | Phase 3 | `AwardsSidebar.tsx` | `AwardsSidebar.test.tsx` |
| FR-005 — Scroll-spy active state | Phase 3 | `AwardsSidebar.tsx`, `useScrollSpy.ts` | `useScrollSpy.test.ts` |
| FR-006 — Smooth scroll | Phase 3 | `AwardsSidebar.tsx` | `AwardsSidebar.test.tsx` |
| FR-007 — Alternating card layout | Phase 3 | `AwardCard.tsx` | `AwardCard.test.tsx` |
| FR-008 — Award data (6 categories) | Phase 1 | `awards-data.ts` | `awards-data.test.ts` |
| FR-009 — Kudos section + CTA | Phase 4 | `AwardsKudosPromotion.tsx` | `AwardsKudosPromotion.test.tsx` |
| FR-010 — Hash anchor navigation | Phase 3 | `AwardsSidebar.tsx`, `useScrollSpy.ts` | `useScrollSpy.test.ts` |
| FR-011 — Header active nav | Phase 2 | Shared `Header.tsx` (automatic) | `page.test.tsx` |
| FR-012 — Footer | Phase 2 | Shared `Footer.tsx` | `page.test.tsx` |
| FR-013 — Responsive breakpoints | Phase 5 | All components | Visual testing |
| TR-001 — Server Component default | Phase 2 | `page.tsx` (no "use client") | — |
| TR-002 — next/image optimization | Phase 2, 3, 4 | All image components | — |
| TR-003 — next/link + <a> hash | Phase 3, 4 | `AwardsSidebar.tsx`, `AwardsKudosPromotion.tsx` | Tests |
| TR-004 — Typed constant array | Phase 1 | `awards-data.ts` | `awards-data.test.ts` |
| TR-005 — IntersectionObserver | Phase 1, 3 | `useScrollSpy.ts` | `useScrollSpy.test.ts` |
| TR-006 — Lighthouse >80 | Phase 5 | Image optimization, lazy loading | Lighthouse audit |
| TR-007 — Section id attributes | Phase 3 | `AwardCard.tsx` | `AwardCard.test.tsx` |
| TR-008 — Smooth scrolling | Phase 3 | `AwardsSidebar.tsx` | `AwardsSidebar.test.tsx` |
| Edge: Invalid hash | Phase 6 | `useScrollSpy.ts` | `useScrollSpy.test.ts` |
| Edge: Image load failure | Phase 6 | `AwardCard.tsx` (placeholder) | `AwardCard.test.tsx` |
| Edge: 320px viewport | Phase 5 | All components | Visual testing |
| Edge: Homepage hash nav | Phase 3 | `useScrollSpy.ts` | `useScrollSpy.test.ts` |
| Edge: Signature 2025 dual-prize | Phase 3 | `AwardCard.tsx` | `AwardCard.test.tsx` |
| Animation: Card entrance (200ms fade+slide) | Phase 6 | `AwardCard.tsx` / CSS | Visual testing |
| Animation: Image hover shadow (200ms) | Phase 3 | `AwardCard.tsx` | Visual testing |
| Animation: Sidebar transitions (150ms) | Phase 3 | `AwardsSidebar.tsx` | Visual testing |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [x] `design-style.md` extracted with full component specs
- [x] Vitest configured with JSDOM + React Testing Library (verified: `vitest.config.ts`, `package.json`)
- [x] Shared Header/Footer components implemented and tested
- [ ] Asset images exported from Figma (keyvisual, thumbnails, icons, Kudos bg) — Phase 0
- [ ] SVN-Gotham font file obtained (for KUDOS branding — optional, can use fallback)

### External Dependencies

- Figma file access for asset export via MoMorph tools (`get_media_files`)
- Award thumbnail images with golden ring/glow decoration (must be exported from Figma as static PNGs)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following TDD cycle (Red → Green → Refactor)

---

## Notes

- The page route is `/awards-information` (matching `HEADER_NAV_LINKS` in `homepage-data.ts`), so the active header nav state will be handled automatically by `HeaderNav.tsx` which uses `usePathname()`.
- The existing `AWARD_CATEGORIES` in `homepage-data.ts` can be kept for the homepage grid. The new `AWARD_DETAIL_CATEGORIES` in `awards-data.ts` will contain the FULL descriptions and additional fields (quantity, unit, prizes). Same slugs for cross-page consistency.
- The homepage `AwardCard` component already links to `/awards-information#${slug}` — our page must support these hash anchors.
- The Kudos promotion section on this page has a slightly different layout from the homepage version (1152x500px, fixed height, rounded-2xl). Create a separate `AwardsKudosPromotion.tsx` rather than complicating the shared component.
- The "Bia" container on this page uses `align-items: flex-start` (left-aligned) unlike the homepage which uses `center`. This is a key difference reflected in the Tailwind classes.
- All text in the design uses Montserrat weight 700 (bold) — already loaded in the root layout with Vietnamese subset support.
- The project has no `src/app/awards-information/` directory yet — this is a greenfield page implementation.
