# Design Style: Sun* Kudos - Live Board

**Frame ID**: `2940:13431`
**Frame Name**: `Sun* Kudos - Live board`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/2940:13431
**Extracted At**: 2026-03-16
**Reviewed At**: 2026-03-22 (7th pass — completeness & consistency audit)

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage | Existing CSS Var |
|------------|-----------|---------|-------|------------------|
| --color-bg-primary | #00101A | 100% | Main page background | `var(--color-bg-primary)` ✅ |
| --color-bg-header | #0B0F12 | 80% | Header background (semi-transparent) | `var(--color-header-bg)` ✅ |
| --color-bg-yellow-subtle | rgba(255,234,158,0.1) | 10% | Subtle yellow background (buttons, input) | `var(--color-btn-secondary-bg)` ✅ |
| --color-text-gold | #FFEA9E | 100% | Primary accent: section titles, headings, icons | `var(--color-text-gold)` ✅ |
| --color-text-white | #FFFFFF | 100% | Body text, secondary text, icons | — |
| --color-text-beige | #DBD1C1 | 100% | Display text (KUDOS logo) | `var(--color-kudos-text)` ✅ |
| --color-border-gold | #998C5F | 100% | Borders on buttons, input fields | `var(--color-border-gold)` ✅ |
| --color-divider | #2E3940 | 100% | Section dividers, separators | `var(--color-border-footer)` ✅ |
| --color-heart-red | #D4271D | 100% | Active heart, notification badge | `var(--color-notification-dot)` ✅ |
| --color-heart-gray | #6B7280 | 100% | Inactive heart | `var(--color-heart-gray)` ✅ |
| --color-shadow-gold | #FAE287 | - | Gold glow effect on text shadows | `var(--shadow-text-glow)` ✅ |
| --color-overlay-dark | #000000 | 70% | Dark overlays | `var(--color-overlay-dark)` ✅ |
| --color-btn-hover | #FFE070 | 100% | Button hover gold | `var(--color-btn-login-hover)` ✅ |
| --color-focus-ring | #FFEA9E | 100% | Focus outline for keyboard nav | `var(--color-text-gold)` ✅ |

> **Note**: All colors already exist as CSS variables in `globals.css`. Always use existing variables instead of hardcoding hex values. `--color-heart-gray` and `--color-overlay-dark` were added in a prior pass and are now available.

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-display | ~~SVN-Gotham~~ → **Montserrat Alternates** | 139.78px | 700 | auto | -13% |
| --text-heading-hero | Montserrat | 57px | 700 | 64px | -0.25px |
| --text-heading-section | Montserrat | 36px | 700 | auto | 0 |
| --text-heading-3 | Montserrat | 24px | 700 | 32px | 0 |
| --text-heading-4 | Montserrat | 20px | 700 | 28px | 0 |
| --text-body | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-body-regular | Montserrat | 16px | 400 | 24px | 0.15px |
| --text-caption | Montserrat | 14px | 700 | 20px | 0.15px |
| --text-caption-regular | Montserrat | 14px | 400 | 20px | 0.15px |
| --text-small | Montserrat | 6.66px | 700 | auto | 0 |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Page horizontal padding (desktop) |
| --spacing-section-gap | 120px | Gap between major sections |
| --spacing-content-gap | 40px | Gap within sections |
| --spacing-card-gap | 24px | Gap between cards/elements |
| --spacing-element-gap | 16px | Gap between small elements |
| --spacing-inner-gap | 8px | Inner element gaps |
| --spacing-xs | 4px | Minimal gaps |
| --spacing-button-padding | 16px | Button internal padding |
| --spacing-button-lg-padding | 24px 16px | Large button padding |
| --spacing-main-top | 120px (mobile) / 176px (desktop) | Main content top padding (accounts for fixed 80px header) |
| --spacing-main-bottom | 64px (mobile) / 96px (desktop) | Main content bottom padding |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-none | 0px | Default flat elements |
| --radius-sm | 4px | Buttons, small containers |
| --radius-md | 16px | Medium rounded elements |
| --radius-lg | 24px | Cards, large containers |
| --radius-pill | 68px | Pill-shaped buttons, input bars |
| --radius-full | 100px | Circular elements, avatars, badges |
| --border-default | 1px solid #998C5F | Gold border for interactive elements |
| --border-divider | 1px solid #2E3940 | Section dividers |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-text-gold | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Gold glow text shadow for headings |
| --shadow-element | 0 0.386px 1.543px #000 | Subtle element shadow |
| --shadow-white-glow | 0 0 1.3px #FFF | White glow effect |

---

## Layout Specifications

### Page Wrapper Pattern (MUST follow existing convention)

The page uses the same background-layering pattern as Homepage and Awards Information pages. **Do NOT use inline `background-image` on sections** — instead use absolute-positioned `<Image>` layers:

```tsx
{/* Pattern from existing pages (page.tsx, awards-information/page.tsx) */}
<main className="relative bg-[var(--color-bg-primary)]">
  {/* Layer 1: Keyvisual background image (absolute) */}
  <Image src="/images/sun-kudos/keyvisual.png" alt="" ...
    className="absolute top-0 left-0 w-full h-[...] object-cover z-[1]" aria-hidden="true" />

  {/* Layer 2: Gradient overlay (absolute) */}
  <div className="absolute top-0 left-0 w-full h-[...] z-[2]"
    style={{ background: "linear-gradient(25deg, #00101A 14.74%, transparent 47.8%)" }} aria-hidden="true" />

  {/* Layer 3: Dark transition overlay (absolute) */}
  <div className="absolute left-0 w-full bottom-0 z-[2]"
    style={{ top: "...", background: "linear-gradient(to bottom, transparent 0%, ... #00101A 65%)" }} aria-hidden="true" />

  {/* "Bìa" Content Container (relative, above backgrounds) */}
  <div className="relative z-[3] flex flex-col items-center gap-16 lg:gap-[120px] pt-[120px] lg:pt-[176px] pb-16 lg:pb-24 px-6 md:px-12 lg:px-36">
    <KudosBanner />           {/* KV Banner content only (no bg-image) */}
    <HighlightKudos />        {/* Highlight section */}
    <SpotlightSection />      {/* Spotlight Board section */}
    <AllKudosSection />        {/* All Kudos (2-col: feed + sidebar) */}
  </div>
</main>
```

> **CRITICAL**: The KV Banner component renders ONLY the content (title, KUDOS logo, input bar, search bar). The background image and gradient overlays are handled by the page-level absolute layers above. This is the established pattern across all pages.

### Container

| Property | Value | Notes |
|----------|-------|-------|
| max-width | 1440px | Frame width (design reference) |
| content-width | 1152px | Individual sections use `max-w-[1152px]` |
| padding-x | `px-6 md:px-12 lg:px-36` | Responsive: 24px → 48px → 144px |
| background | #00101A | Dark navy background (on `<main>`) |
| top padding | `pt-[120px] lg:pt-[176px]` | Accounts for fixed 80px header |
| bottom padding | `pb-16 lg:pb-24` | 64px → 96px |

### Grid/Flex Layout

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Main "Bìa" content container |
| flex-direction | column | Vertical sections |
| gap | `gap-16 lg:gap-[120px]` | 64px mobile / 120px desktop |
| align-items | center | Center content horizontally |

### Two-Column Layout (All Kudos Section)

| Property | Value | Notes |
|----------|-------|-------|
| display | `flex flex-col lg:flex-row` | Stack on mobile, side-by-side on desktop |
| gap | `gap-8 lg:gap-10` | 32px mobile / 40px desktop |
| width | `w-full max-w-[1152px]` | Constrained to content width |
| feed column | `flex-1` | Takes remaining space |
| sidebar column | `w-full lg:w-80` | Full on mobile, 320px on desktop |
| sidebar position | `lg:sticky lg:top-[100px]` | Sticky only on desktop |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────────┐
│  HEADER (h: 80px, bg: var(--color-header-bg), fixed, z-10)          │
│  ┌──────┐ ┌────────────────────────────────┐ ┌──────┐ ┌──┐ ┌──────┐│
│  │ Logo │ │ Nav: About | Awards | Kudos    │ │Avatar│ │🔔│ │ Lang │││
│  └──────┘ └────────────────────────────────┘ └──────┘ └──┘ └──────┘│
├──────────────────────────────────────────────────────────────────────┤
│<main> (relative, bg: var(--color-bg-primary))                        │
│                                                                      │
│  ┌── ABSOLUTE LAYERS (z-[1], z-[2]) ──────────────────────────┐     │
│  │  Layer 1: <Image> keyvisual.png (object-cover, full width)  │     │
│  │  Layer 2: Gradient overlay (25deg, #00101A → transparent)   │     │
│  │  Layer 3: Dark transition overlay (to solid #00101A)        │     │
│  └─────────────────────────────────────────────────────────────┘     │
│                                                                      │
│  ┌── "BÌA" CONTENT CONTAINER (relative z-[3]) ──────────────────┐   │
│  │  flex col | items-center | gap-16 lg:gap-[120px]              │   │
│  │  pt-[120px] lg:pt-[176px] | pb-16 lg:pb-24                   │   │
│  │  px-6 md:px-12 lg:px-36                                      │   │
│  │                                                                │   │
│  │  KV BANNER CONTENT (no bg — bg is from absolute layers above) │   │
│  │  ┌──────────────────────────────────────────────────────────┐ │   │
│  │  │  "He thong ghi nhan va cam on"                           │ │   │
│  │  │  ★ K U D O S  (Montserrat Alternates 139.78px)          │ │   │
│  │  │                                                           │ │   │
│  │  │  ┌──────────────────────────┐  ┌──────────────────────┐  │ │   │
│  │  │  │ 🖊 Hom nay ban muon... │  │ 🔍 Tim kiem profile  │  │ │   │
│  │  │  └──────────────────────────┘  └──────────────────────┘  │ │   │
│  │  └──────────────────────────────────────────────────────────┘ │   │
│  │                                                                │   │
│  │  gap: 120px (lg) / 64px (mobile)                              │   │
│  │                                                                │   │
│  │  HIGHLIGHT KUDOS (max-w-[1152px])                             │   │
│  │  ┌──────────────────────────────────────────────────────────┐ │   │
│  │  │  Sun* Annual Awards 2025                                  │ │   │
│  │  │  HIGHLIGHT KUDOS (57px)      [Hashtag ▼] [Phong ban ▼]   │ │   │
│  │  │  ─────────────────────────────────────────────────────    │ │   │
│  │  │  ◀  ┌─────────┐ ┌─────────────┐ ┌─────────┐  ▶         │ │   │
│  │  │     │ Card    │ │ FEATURED    │ │ Card    │              │ │   │
│  │  │     │ (prev)  │ │ KUDO CARD   │ │ (next)  │              │ │   │
│  │  │     └─────────┘ └─────────────┘ └─────────┘              │ │   │
│  │  │            < 2/5 >  (page indicator)                      │ │   │
│  │  └──────────────────────────────────────────────────────────┘ │   │
│  │                                                                │   │
│  │  gap: 120px (lg) / 64px (mobile)                              │   │
│  │                                                                │   │
│  │  SPOTLIGHT BOARD (max-w-[1152px])                             │   │
│  │  ┌──────────────────────────────────────────────────────────┐ │   │
│  │  │  Sun* Annual Awards 2025                                  │ │   │
│  │  │  SPOTLIGHT BOARD (57px)                                   │ │   │
│  │  │  ─────────────────────────────────────────────────────    │ │   │
│  │  │  ┌────────────────────────────────────────────────────┐  │ │   │
│  │  │  │  388 KUDOS      [🔍 Tim kiem]      [Pan/Zoom]     │  │ │   │
│  │  │  │      Word Cloud / Interactive Diagram              │  │ │   │
│  │  │  └────────────────────────────────────────────────────┘  │ │   │
│  │  └──────────────────────────────────────────────────────────┘ │   │
│  │                                                                │   │
│  │  gap: 120px (lg) / 64px (mobile)                              │   │
│  │                                                                │   │
│  │  ALL KUDOS (max-w-[1152px])                                   │   │
│  │  ┌──────────────────────────────────────────────────────────┐ │   │
│  │  │  Sun* Annual Awards 2025                                  │ │   │
│  │  │  ALL KUDOS (57px)                                         │ │   │
│  │  │  ─────────────────────────────────────────────────────    │ │   │
│  │  │  flex flex-col lg:flex-row gap-8 lg:gap-10                │ │   │
│  │  │  ┌────────────────────┐  ┌─────────────────────────────┐ │ │   │
│  │  │  │ KUDO FEED (flex-1) │  │ SIDEBAR (lg:w-80, sticky)  │ │ │   │
│  │  │  │                    │  │                              │ │ │   │
│  │  │  │ ┌────────────────┐ │  │ Kudos nhan duoc: 25        │ │ │   │
│  │  │  │ │ Kudo Card 1    │ │  │ Kudos da gui:    25        │ │ │   │
│  │  │  │ │ Sender→Receiver│ │  │ Tim nhan duoc:   25 ❤x2   │ │ │   │
│  │  │  │ │ Time | Hashtag │ │  │ ─────────────────────       │ │ │   │
│  │  │  │ │ Content(5 line)│ │  │ Secret Box da mo: 25       │ │ │   │
│  │  │  │ │ [Images]       │ │  │ Secret Box chua mo: 25     │ │ │   │
│  │  │  │ │ #tags          │ │  │ [Mo Secret Box 🎁]         │ │ │   │
│  │  │  │ │ ♥1000|CopyLink│ │  │                              │ │ │   │
│  │  │  │ └────────────────┘ │  │ 10 SUNNER NHAN QUA          │ │ │   │
│  │  │  │ ┌────────────────┐ │  │ MOI NHAT                    │ │ │   │
│  │  │  │ │ Kudo Card 2... │ │  │ 🔴 Name - Desc (x5 vis.)  │ │ │   │
│  │  │  │ └────────────────┘ │  │                              │ │ │   │
│  │  │  │ ... more cards     │  │                              │ │ │   │
│  │  │  └────────────────────┘  └─────────────────────────────┘ │ │   │
│  │  └──────────────────────────────────────────────────────────┘ │   │
│  │                                                                │   │
│  └── END "BÌA" CONTENT CONTAINER ────────────────────────────────┘   │
│                                                                      │
│</main>                                                               │
│                                                                      │
│  FOOTER (shared component, outside <main>)                           │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  Logo | About SAA | Awards | Kudos | The le | Ban quyen     │    │
│  └──────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Header (ID: 2940:13433)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13433 | - |
| width | 1440px | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px (y) / responsive (x) | `py-3 px-6 md:px-12 lg:px-36` |
| background | rgba(11, 15, 18, 0.8) | `background-color: var(--color-header-bg)` |
| backdrop-filter | blur | `backdrop-filter: blur(8px)` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| justify-content | space-between | `justify-content: space-between` |
| align-items | center | `align-items: center` |
| position | fixed | `position: fixed; z-index: 1` |

---

### KV Banner — Content Only (ID: 2940:13437)

> **NOTE**: This component renders ONLY the banner content (title, KUDOS logo, input/search bars). The keyvisual background image and gradient overlays are absolute-positioned at the page level — see "Page Wrapper Pattern" above. Do NOT add `background-image` to this component.

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13437 | - |
| width | 100% | `w-full max-w-[1152px]` |
| display | flex column | `flex flex-col items-center` |
| gap | 40px | `gap-10` |
| text-align | center | `text-center` |

**Banner Content:**
- Title "Hệ thống ghi nhận và cảm ơn": Montserrat 24px Bold, white
- Star icon (★): Decorative Sun* star/asterisk icon before "KUDOS" text, same color as KUDOS text (#DBD1C1). Implemented as `<SaaMiniIcon />` or similar SVG component.
- "KUDOS" logo: Montserrat Alternates (`var(--font-montserrat-alternates)`) 139.78px Bold, #DBD1C1 (`var(--color-kudos-text)`), letter-spacing: -13%, text-shadow: `var(--shadow-text-glow)`

**Input/Search Row:**
- Layout: `flex flex-col md:flex-row gap-4 md:gap-6 w-full justify-center`
- Input bar and search bar are flex row children, side by side on desktop, stacked on mobile

---

### Input Bar - "Button Ghi Nhan" (ID: 2940:13449)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13449 | - |
| width | ~738px | `width: 100%; max-width: 738px` |
| height | 72px | `height: 72px` |
| padding | 24px 16px | `padding: 24px 16px` |
| background | rgba(255, 234, 158, 0.1) | `background-color: var(--color-bg-yellow-subtle)` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-border-gold)` |
| border-radius | 68px | `border-radius: 68px` |
| display | flex | `display: flex; align-items: center; gap: 8px` |
| font | Montserrat 16px 400 | `font: 400 16px Montserrat` |
| color | white | `color: white` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Hover | background: rgba(255, 234, 158, 0.15); border-color: #FFEA9E |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Search Bar - "Tim kiem profile Sunner" (ID: 2940:13450)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13450 | - |
| width | ~500px | `width: 100%; max-width: 500px` |
| height | 72px | `height: 72px` |
| padding | 24px 16px | `padding: 24px 16px` |
| background | rgba(255, 234, 158, 0.1) | `background-color: var(--color-btn-secondary-bg)` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-border-gold)` |
| border-radius | 68px | `border-radius: 68px` |
| display | flex | `display: flex; align-items: center; gap: 8px` |
| font | Montserrat 16px 400 | `font: 400 16px Montserrat` |
| color | white | `color: white` |
| placeholder color | rgba(255, 255, 255, 0.5) | `color: rgba(255, 255, 255, 0.5)` |
| icon | magnifying glass, 24px, white | `<SearchIcon />` |

**States:**
| State | Changes |
|-------|---------|
| Hover | background: rgba(255, 234, 158, 0.15); border-color: #FFEA9E |
| Focus | border-color: #FFEA9E; outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Highlight Section Header (ID: 2940:13452)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13452 | - |
| subtitle | "Sun* Annual Awards 2025" | Montserrat 20px Bold, #FFEA9E |
| title | "HIGHLIGHT KUDOS" | Montserrat 57px Bold, #FFEA9E, letter-spacing: -0.25px, text-shadow: `var(--shadow-text-glow)` |
| divider | below subtitle | `1px solid #2E3940` |

> **Note**: All section titles (HIGHLIGHT KUDOS, SPOTLIGHT BOARD, ALL KUDOS) use the same pattern: `--text-heading-hero` (57px Bold #FFEA9E) with `text-shadow: var(--shadow-text-glow)` for the gold glow effect.

---

### Filter Buttons (ID: 2940:13459, 2940:13460)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13459 / 2940:13460 | - |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| background | transparent | `background: transparent` |
| display | flex | `display: flex; align-items: center; gap: 4px` |
| font | Montserrat 16px Bold | `font: 700 16px Montserrat` |
| color | white | `color: white` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Hover | background: rgba(255, 234, 158, 0.1) |
| Active | border-bottom: 2px solid #FFEA9E |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Carousel Navigation Buttons (ID: 2940:13468, 2940:13470)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13468 / 2940:13470 | - |
| size | 48px × 48px | `width: 48px; height: 48px` |
| border-radius | 100px | `border-radius: 100%` |
| background | transparent | `background: transparent` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-border-gold)` |
| color | #FFEA9E | `color: var(--color-text-gold)` |

**States:**
| State | Changes |
|-------|---------|
| Hover | background: rgba(255, 234, 158, 0.1) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| Disabled | opacity: 0.3, cursor: not-allowed |

---

### Page Indicator (ID: 2940:13471)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13471 | - |
| display | flex | `display: flex; align-items: center; gap: 16px` |
| current page | Montserrat 36px Bold, #FFEA9E | `font: 700 36px Montserrat; color: var(--color-text-gold)` |
| total pages | Montserrat 20px Bold, white | `font: 700 20px Montserrat; color: white` |
| separator | "/" | Montserrat 20px Bold white, between current and total |
| prev/next arrows | 24px, #FFEA9E | chevron icons, `cursor: pointer` |

**Page Indicator Arrow States:**
| State | Changes |
|-------|---------|
| Hover | opacity: 0.7 |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| Disabled (first/last page) | opacity: 0.3, cursor: not-allowed |

---

### Highlight Kudo Card (ID: 2940:13465)

> **CORRECTED** (8th pass): Updated from Figma design item image. Card uses a **light/cream background** (#FFF8E1), NOT dark background. Sender/receiver avatars are **large (64px)**, centered side by side with arrow between them. Content is in a **cream/beige inner box**.

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13465 | - |
| width | ~530px (center featured) | Varies by carousel position |
| background | #FFF8E1 (light cream/yellow) | `background: #FFF8E1` |
| border | 2px solid #FFEA9E (gold) for featured card; 1px solid #2E3940 for side cards | `border: 2px solid var(--color-text-gold)` / `1px solid var(--color-divider)` |
| border-radius | 16px | `border-radius: 16px` |
| padding | 24px | `padding: 24px` |
| overflow | hidden | `overflow: hidden` |

**States:**
| State | Changes |
|-------|---------|
| Featured (center) | border: 2px solid #FFEA9E; full opacity; scale(1) |
| Side card | border: 1px solid #2E3940; opacity: 0.7; scale(0.9) |
| Hover | box-shadow: 0 4px 12px rgba(0,0,0,0.3) |

**Card Layout (top to bottom):**

1. **Sender/Receiver row** (centered, flex row, gap 24px, justify-center):
   - **Sender column** (flex col, items-center, gap 6px):
     - Avatar: 64px circle (`border-radius: 100%`), from Gmail
     - Name: Montserrat 14px Bold, #1A1A1A (dark text on light bg)
     - Info row: Department text (10px, #666) + "·" + Title badge (10px Bold, colored pill bg)
   - **Arrow icon**: 24px, #666, centered vertically at avatar level
   - **Receiver column**: same structure as Sender

2. **Separator**: 1px solid #E0D5C0, full width (horizontal line)

3. **Timestamp**: Montserrat 14px Regular, #999 (gray), left-aligned
   - Format: `HH:mm - MM/DD/YYYY` (e.g., "10:00 - 10/30/2025")

4. **Category label**: Montserrat 14px Bold, #1A1A1A, center-aligned, uppercase
   - e.g., "IDOL GIỚI TRẺ", "SẾP QUỐC DÂN"

5. **Content box** (inner cream box):
   - Background: #FFF3D0 (slightly darker cream than card bg)
   - Border-radius: 12px
   - Padding: 16px
   - Text: Montserrat 16px Bold, #1A1A1A, line-clamp-3
   - Overflow: "..." shown at end

6. **Hashtags row**: flex wrap, gap 8px
   - Text: Montserrat 14px Bold, #D4271D (red/coral color from Figma — NOT gold)
   - Max 5 visible, overflow shows "..."

7. **Separator**: 1px solid #E0D5C0

8. **Actions bar**: flex row, justify-between, items-center
   - **Heart count**: Montserrat 16px Bold, #1A1A1A + HeartIcon 24px (red if liked, gray if not)
   - **"Copy Link"**: Montserrat 14px Bold, #1A1A1A + CopyLinkIcon 20px
   - **"Xem chi tiết"**: Montserrat 14px Bold, #1A1A1A + ArrowUpRightIcon 16px

**Title Badge (Hero badge):**
| Badge | Background | Text Color |
|-------|-----------|------------|
| New Hero | #4CAF50 (green) | white |
| Rising Hero | #FF9800 (orange) | white |
| Super Hero | #2196F3 (blue) | white |
| Legend Hero | #9C27B0 (purple) | white |

**"Xem chi tiết" Link:**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 14px Bold #1A1A1A | - |
| display | flex row | `display: flex; align-items: center; gap: 4px` |
| icon | ArrowUpRightIcon, 16px | - |
| cursor | pointer | - |

**States:**
| State | Changes |
|-------|---------|
| Hover | color: #B8860B (dark gold) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Spotlight Board (ID: 2940:14174)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:14174 | - |
| width | 100% | `width: 100%` |
| background | dark with overlay | `background: rgba(0, 16, 26, 0.9)` |
| border-radius | 16px | `border-radius: 16px` |
| overflow | hidden | `overflow: hidden` |

**Header bar:**
- "388 KUDOS": Montserrat 24px Bold, white
- Search input: Montserrat 16px Regular, white, placeholder rgba(255,255,255,0.5), magnifying glass icon, border: 1px solid #2E3940, border-radius: 8px, padding: 8px 12px
  - **States:** Hover: border-color: #998C5F | Focus: border-color: #FFEA9E, outline: 2px solid #FFEA9E
- Pan/Zoom button: icon toggle, 32px, hover: bg rgba(255,234,158,0.1), focus: outline 2px solid #FFEA9E

**Canvas area:**
- Names rendered at various sizes (12px–36px) based on Kudos count
- Colors: white, gold, with varying opacity
- Interactive: click name to view profile, hover to highlight

---

### Kudo Post Card (ID: 3127:21871)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3127:21871 | - |
| width | 100% | `width: 100%` |
| background | rgba(0,16,26,0.9) (dark) | `background: rgba(0,16,26,0.9)` |
| border | 1px solid #2E3940 | `border: 1px solid #2E3940` |
| border-radius | 16px | `border-radius: 16px` |
| padding | 24px | `padding: 24px` |
| gap | 16px between sections | `gap: 16px` |
| sender/recipient | 60px avatars, centered with PlayIcon between, names below | vertical card layout |
| title | centered, bold, uppercase, white | separate row |
| content-box | bg #FFF8E1 (cream), rounded-xl, p-4, dark text | content in cream box |
| hashtags | gold text on dark bg | `color: var(--color-text-gold)` |
| actions | border-top white/10, heart + copy link | white text on dark |

**Subcomponents:**

**Sender/Receiver Info (ID: I3127:21871;256:4858 / ;256:4860):**
| Property | Value | CSS |
|----------|-------|-----|
| avatar | 48px circle | `width: 48px; height: 48px; border-radius: 100%` |
| name | Montserrat 16px Bold white | `font: 700 16px Montserrat` |
| department | Montserrat 14px Regular white | `font: 400 14px Montserrat` |
| star count | badge, small | gold star icon + count |
| arrow icon | "sent" indicator | between sender/receiver |

**Timestamp + Category Label (TimeHashtag row):**
| Property | Value | CSS |
|----------|-------|-----|
| layout | flex row | `display: flex; align-items: center; gap: 8px` |
| timestamp | Montserrat 14px Regular, white/50% | `font: 400 14px Montserrat; color: rgba(255,255,255,0.5)` |
| separator | " - " | between time and date |
| format | `HH:mm - MM/DD/YYYY` | e.g., "16:00 - 10/30/2025" |
| category label | Montserrat 14px Bold, #FFEA9E | `font: 700 14px Montserrat; color: var(--color-text-gold)` |

**Content (ID: I3127:21871;256:5155):**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 16px Regular white | `font: 400 16px Montserrat; color: white` |
| max-lines | 5 | `display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 5; overflow: hidden` |
| text-overflow | ellipsis | `text-overflow: ellipsis` |

**Image Gallery (ID: I3127:21871;256:5176):**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex row | `display: flex; gap: 8px` |
| max-items | 5 | Show up to 5 thumbnails |
| thumbnail | square, rounded | `border-radius: 8px; aspect-ratio: 1` |

**Video Play Overlay (on video thumbnails):**
| Property | Value | CSS |
|----------|-------|-----|
| position | absolute, centered | `position: absolute; inset: 0; display: flex; align-items: center; justify-content: center` |
| icon | play triangle (▶) | white, 32px, with slight drop shadow |
| background | rgba(0, 0, 0, 0.3) | Semi-transparent dark overlay on thumbnail |
| cursor | pointer | `cursor: pointer` |

**Hashtags (ID: I3127:21871;256:5158):**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 14px Bold | `font: 700 14px Montserrat` |
| color | #FFEA9E | `color: var(--color-text-gold)` |
| max-tags | 5 per line | Truncate with "..." |

**Hashtag Tag Badge (ID: I3127:21871;2234:33038):**
| Property | Value | CSS |
|----------|-------|-----|
| background | rgba(255, 234, 158, 0.1) | `background: var(--color-bg-yellow-subtle)` |
| border-radius | 4px | `border-radius: 4px` |
| padding | 4px 8px | `padding: 4px 8px` |
| font | Montserrat 14px Bold #FFEA9E | - |
| cursor | pointer | Click to filter |

**States:**
| State | Changes |
|-------|---------|
| Hover | background: rgba(255, 234, 158, 0.2) |

**Heart Button (ID: I3127:21871;256:5175):**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex row | `display: flex; align-items: center; gap: 4px` |
| icon | 24px heart | `width: 24px; height: 24px` |
| count | Montserrat 16px Bold | - |

**States:**
| State | Changes |
|-------|---------|
| Not liked | heart color: #6B7280 (gray), outline style |
| Liked | heart color: #D4271D (red), filled, scale(1.1) briefly on click |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

**Copy Link Button (ID: I3127:21871;256:5216):**
| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 16px Bold white | - |
| display | flex row | `display: flex; align-items: center; gap: 4px` |
| icon | link/copy icon, 20px | - |
| cursor | pointer | - |

**States:**
| State | Changes |
|-------|---------|
| Hover | opacity: 0.8 |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Stats Sidebar (ID: 2940:13488)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13488 | - |
| width | ~320px | `width: 320px; flex-shrink: 0` |
| position | sticky | `position: sticky; top: 100px` |

**Stat Row:**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex row | `display: flex; justify-content: space-between; align-items: center` |
| label | Montserrat 16px Bold white | `font: 700 16px Montserrat` |
| value | Montserrat 24px Bold #FFEA9E | `font: 700 24px Montserrat; color: var(--color-text-gold)` |
| gap | 16px between rows | `gap: 16px` |

**Heart Multiplier Badge (on "Số tim bạn nhận được" row only, ID: 3241:14882):**
| Property | Value | CSS |
|----------|-------|-----|
| layout | inline-flex, next to value | `display: inline-flex; align-items: center; gap: 4px; margin-left: 8px` |
| icon | heart image, ~16px | `width: 16px; height: 16px` |
| multiplier text | "x2", Montserrat 14px Bold #FFEA9E | `font: 700 14px Montserrat; color: var(--color-text-gold)` |
| purpose | Static decorative badge (fixed "x2" value, not dynamic) | — |

**Separator:**
| Property | Value | CSS |
|----------|-------|-----|
| height | 1px | `height: 1px` |
| background | #2E3940 | `background: var(--color-divider)` |

**"Mo Secret Box" Button (ID: 2940:13497):**
| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `width: 100%` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | rgba(255, 234, 158, 0.1) | `background: var(--color-bg-yellow-subtle)` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-border-gold)` |
| border-radius | 4px | `border-radius: 4px` |
| font | Montserrat 16px Bold white | - |
| display | flex | `display: flex; align-items: center; justify-content: center; gap: 8px` |
| icon | gift box 24px | - |

**States:**
| State | Changes |
|-------|---------|
| Hover | background: rgba(255, 234, 158, 0.2) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Gift Recipients List (ID: 2940:13510)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13510 | - |
| title | "10 SUNNER NHAN QUA MOI NHAT" | Montserrat 16px Bold #FFEA9E |

**Recipient Row (ID: 2940:13516):**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex row | `display: flex; align-items: center; gap: 12px` |
| avatar | 40px circle | `width: 40px; height: 40px; border-radius: 100%` |
| indicator | 8px red circle | `width: 8px; height: 8px; border-radius: 100%; background: #D4271D` |
| name | Montserrat 14px Bold white | - |
| description | Montserrat 14px Regular white | - |
| gap | 12px between rows | - |

**"Xem thêm" (Load More) Button:**
| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `width: 100%` |
| padding | 12px 16px | `padding: 12px 16px` |
| background | transparent | `background: transparent` |
| border | 1px solid #2E3940 | `border: 1px solid var(--color-divider)` |
| border-radius | 4px | `border-radius: 4px` |
| font | Montserrat 14px Bold #FFEA9E | `font: 700 14px Montserrat; color: var(--color-text-gold)` |
| text-align | center | `text-align: center` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Hover | background: rgba(255, 234, 158, 0.1) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

## Component Hierarchy with Styles

```
<> (Fragment)
├── Header (fixed, h: 80px, bg: var(--color-header-bg), backdrop-blur, z-10)
│   ├── Logo (SAA 2025)
│   ├── Navigation (flex, gap: 24px)
│   │   ├── NavItem "Gioi thieu SAA 2025" (16px Bold white)
│   │   ├── NavItem "Thong tin giai thuong" (16px Bold white)
│   │   └── NavItem "Sun* Kudos" (16px Bold #FFEA9E, active)
│   └── Actions (flex, gap: 16px)
│       ├── Avatar (32px circle)
│       ├── NotificationBell (24px, red badge 8px)
│       └── LanguageSwitch (16px Bold)
│
├── <main> (relative, bg: var(--color-bg-primary))
│   │
│   ├── [ABSOLUTE] Keyvisual <Image> (z-[1], object-cover, full width)
│   ├── [ABSOLUTE] Gradient Overlay (z-[2], 25deg #00101A → transparent)
│   ├── [ABSOLUTE] Dark Transition Overlay (z-[2], vertical fade to #00101A)
│   │
│   └── "Bìa" Content (relative z-[3], flex col, items-center, gap-16 lg:gap-[120px])
│       │   (pt-[120px] lg:pt-[176px], pb-16 lg:pb-24, px-6 md:px-12 lg:px-36)
│       │
│       ├── KV Banner Content (NO background — bg from absolute layers)
│       │   ├── Title "He thong ghi nhan va cam on" (24px Bold white)
│       │   ├── KUDOS Logo
│       │   │   ├── StarIcon (★ decorative, #DBD1C1)
│       │   │   └── "KUDOS" (Montserrat Alternates 139.78px Bold, #DBD1C1, shadow: gold glow)
│       │   ├── InputBar (pill: 68px radius, border: var(--color-border-gold), bg: var(--color-btn-secondary-bg))
│       │   │   ├── PenIcon (24px, white)
│       │   │   └── Placeholder (16px Regular white)
│       │   └── SearchBar (pill: 68px radius, border: var(--color-border-gold), bg: var(--color-btn-secondary-bg))
│       │       ├── SearchIcon (24px, white)
│       │       └── Placeholder (16px Regular white)
│       │
│       ├── Highlight Section (gap: 40px, max-w-[1152px])
│       │   ├── SectionHeader
│       │   │   ├── Subtitle "Sun* Annual Awards 2025" (20px Bold #FFEA9E)
│       │   │   ├── Divider (1px #2E3940)
│       │   │   ├── Title "HIGHLIGHT KUDOS" (57px Bold #FFEA9E)
│       │   │   └── Filters (flex, gap: 16px)
│       │   │       ├── HashtagButton (16px Bold white, dropdown)
│       │   │       └── DepartmentButton (16px Bold white, dropdown)
│       │   ├── Carousel (flex, gap: 24px, overflow: hidden)
│       │   │   ├── PrevButton (48px circle, border: #998C5F)
│       │   │   ├── Cards (3 visible, center featured)
│       │   │   │   └── HighlightKudoCard (border: #2E3940, radius: 16px, p: 24px)
│       │   │   └── NextButton (48px circle, border: #998C5F)
│       │   └── PageIndicator (flex, gap: 16px)
│       │       ├── PrevArrow
│       │       ├── CurrentPage (36px Bold #FFEA9E) / TotalPages (20px Bold white)
│       │       └── NextArrow
│       │
│       ├── Spotlight Section (gap: 40px, max-w-[1152px])
│       │   ├── SectionHeader (same pattern as Highlight)
│       │   │   ├── Subtitle "Sun* Annual Awards 2025" (20px Bold #FFEA9E)
│       │   │   ├── Divider (1px #2E3940)
│       │   │   └── Title "SPOTLIGHT BOARD" (57px Bold #FFEA9E)
│       │   └── SpotlightBoard (radius: 16px, bg: dark, overflow: hidden)
│       │       ├── Toolbar (flex, justify-between)
│       │       │   ├── TotalCount "388 KUDOS" (24px Bold white)
│       │       │   ├── SearchInput (16px, magnifying glass)
│       │       │   └── PanZoomToggle (icon button)
│       │       └── Canvas (interactive word cloud area)
│       │
│       └── All Kudos Section (gap: 40px, max-w-[1152px])
│           ├── SectionHeader (same pattern)
│           │   ├── Subtitle "Sun* Annual Awards 2025"
│           │   ├── Divider
│           │   └── Title "ALL KUDOS" (57px Bold #FFEA9E)
│           └── Content (flex flex-col lg:flex-row, gap-8 lg:gap-10, w-full)
│               ├── KudoFeed (flex-1, flex-col, gap: 0)
│               │   └── KudoCard (border-bottom: #2E3940, py: 24px)
│               │       ├── UserRow (flex, gap: 8px)
│               │       │   ├── SenderInfo (avatar 48px, name, dept, stars)
│               │       │   ├── ArrowIcon (24px)
│               │       │   └── ReceiverInfo (avatar 48px, name, dept, stars)
│               │       ├── TimeHashtag (14px, white/50% opacity / #FFEA9E)
│               │       ├── Content (16px Regular white, max 5 lines)
│               │       ├── ImageGallery (flex, gap: 8px, max 5)
│               │       ├── Hashtags (14px Bold #FFEA9E)
│               │       └── Actions (flex, justify-between)
│               │           ├── HeartButton (icon + count)
│               │           └── CopyLinkButton (text + icon)
│               └── Sidebar (w-full lg:w-80, lg:sticky lg:top-[100px])
│                   ├── StatsOverview (flex-col, gap: 16px)
│                   │   ├── StatRow "Kudos nhan duoc" (label + value)
│                   │   ├── StatRow "Kudos da gui"
│                   │   ├── StatRow "Tim nhan duoc" (+ heart x2 multiplier badge)
│                   │   ├── Separator (1px #2E3940)
│                   │   ├── StatRow "Secret Box da mo"
│                   │   ├── StatRow "Secret Box chua mo"
│                   │   └── OpenGiftButton (100%, radius: 4px, border: #998C5F)
│                   └── GiftRecipients
│                       ├── Title "10 SUNNER NHAN QUA MOI NHAT" (16px Bold #FFEA9E)
│                       └── List (flex-col, gap: 12px)
│                           └── RecipientRow (avatar 40px, red dot 8px, name, desc)
│
└── Footer (shared component, OUTSIDE <main>)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 320px | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | infinity |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Header | px-6 py-3; hamburger menu replaces nav |
| KV Banner | Stacked input/search bars; smaller KUDOS text |
| Highlight Carousel | 1 card visible, swipe gesture |
| Spotlight Board | Full width, reduced name sizes |
| All Kudos | Single column, sidebar moves below feed |
| Sidebar | Full width, horizontal stat layout |
| Input Bar | Full width |
| Filter Buttons | Stacked or scrollable horizontal |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Header | md:px-12 py-3 |
| Content width | 90% of viewport |
| Highlight Carousel | 1-2 cards visible |
| All Kudos | Feed takes full width, sidebar below |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| Header | lg:px-36 py-3 |
| Content width | max-w-[1152px] per section |
| Highlight Carousel | 3 cards visible, center featured |
| All Kudos | 2-column layout (feed + sidebar) |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| icon-pen | 24px | white | Input bar prefix |
| icon-search | 24px | white | Search bar prefix |
| icon-chevron-left | 24px | #FFEA9E | Carousel prev button |
| icon-chevron-right | 24px | #FFEA9E | Carousel next button |
| icon-chevron-down | 16px | white | Filter dropdown indicator |
| icon-heart-outline | 24px | #6B7280 | Unliked state |
| icon-heart-filled | 24px | #D4271D | Liked state |
| icon-link | 20px | white | Copy link button |
| icon-arrow-right | 24px | white | Sender → Receiver indicator |
| icon-pan-zoom | 24px | white | Spotlight pan/zoom toggle |
| icon-gift | 24px | white | Secret Box button |
| icon-bell | 24px | white | Notification bell |
| icon-star | 12px | #FFEA9E | User star count badge |
| icon-external-link | 16px | white | "Xem chi tiet" link |

---

### Toast Notification (Copy Link feedback)

| Property | Value | CSS |
|----------|-------|-----|
| position | fixed, bottom-right | `position: fixed; bottom: 24px; right: 24px; z-index: 50` |
| background | rgba(0, 16, 26, 0.95) | `background: rgba(0, 16, 26, 0.95)` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-border-gold)` |
| border-radius | 8px | `border-radius: 8px` |
| padding | 12px 16px | `padding: 12px 16px` |
| font | Montserrat 14px Bold white | `font: 700 14px Montserrat; color: white` |
| text | "Link copied — ready to share!" | — |
| auto-dismiss | 3 seconds | JS: `setTimeout(() => setVisible(false), 3000)` |
| animation | fade-in slide-up on show, fade-out on dismiss | `opacity 0→1, translateY(8px)→0` |

---

### Skeleton Loading Placeholders

| Property | Value | CSS |
|----------|-------|-----|
| background | rgba(255, 234, 158, 0.05) | `background: rgba(255, 234, 158, 0.05)` |
| border-radius | matches target component | Same radius as the component it replaces |
| animation | pulse | `animate-pulse` (Tailwind built-in) |
| height | matches target component | Same height as the component it replaces |

**Skeleton variants:**
- **Kudo Card skeleton**: Full-width, `h-[280px]`, with inner blocks for avatar (48px circle), text lines (h-4), and image row (h-20)
- **Sidebar stat skeleton**: `h-6 w-full` per row, 5 rows with `gap-4`
- **Carousel card skeleton**: `h-[400px] w-[400px]`, `rounded-2xl`
- **Spotlight Board skeleton**: `h-[400px] w-full`, `rounded-2xl`

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Carousel | transform (translateX) | 300ms | ease-in-out | Prev/Next click |
| Heart | color, transform (scale) | 200ms | ease-out | Click |
| Filter Dropdown | opacity, transform (translateY) | 150ms | ease-out | Toggle |
| Toast Notification | opacity, transform (translateY) | 200ms | ease-out | Copy link |
| Spotlight name | opacity, transform (scale) | 150ms | ease-out | Hover |
| Button hover | background-color | 150ms | ease-in-out | Hover |
| Card hover | box-shadow | 200ms | ease-out | Hover |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Page `<main>` | 2940:13431 | `relative bg-[var(--color-bg-primary)]` | `page.tsx` (route) |
| BG Keyvisual | — | `absolute top-0 left-0 w-full h-[...] object-cover z-[1]` | `<Image>` (absolute) |
| BG Gradient | — | `absolute top-0 left-0 w-full h-[...] z-[2]` | `<div>` (absolute) |
| BG Dark Overlay | — | `absolute left-0 w-full bottom-0 z-[2]` | `<div>` (absolute) |
| "Bìa" Container | — | `relative z-[3] flex flex-col items-center gap-16 lg:gap-[120px] pt-[120px] lg:pt-[176px] pb-16 lg:pb-24 px-6 md:px-12 lg:px-36` | wrapper `<div>` |
| Header | 2940:13433 | `fixed w-full h-20 bg-[var(--color-header-bg)] backdrop-blur-lg z-10` | `<Header />` (shared) |
| KV Banner Content | 2940:13437 | `w-full max-w-[1152px] flex flex-col items-center gap-10 text-center` | `<KudosBanner />` |
| Input Bar | 2940:13449 | `rounded-[68px] border border-[var(--color-border-gold)] bg-[var(--color-btn-secondary-bg)] px-4 py-6 h-[72px]` | `<KudosInputBar />` |
| Search Bar | 2940:13450 | `rounded-[68px] border border-[var(--color-border-gold)] bg-[var(--color-btn-secondary-bg)] px-4 py-6 h-[72px]` | `<KudosSearchBar />` |
| Section Header | 2940:13452 | `flex flex-col gap-4` | `<SectionHeader />` |
| Highlight Section | 2940:13451 | `w-full max-w-[1152px] flex flex-col gap-10` | `<HighlightKudos />` |
| Filter Button | 2940:13459 | `flex items-center gap-1 p-4 rounded text-white font-bold` | `<FilterButton />` |
| Carousel | 2940:13461 | `flex overflow-hidden gap-6` | `<KudosCarousel />` |
| Carousel Btn | 2940:13468 | `w-12 h-12 rounded-full border border-[var(--color-border-gold)]` | `<CarouselButton />` |
| Page Indicator | 2940:13471 | `flex items-center gap-4` | `<PageIndicator />` |
| Highlight Card | 2940:13465 | `rounded-2xl border border-[var(--color-border-footer)] p-6` | `<HighlightKudoCard />` |
| View Detail Link | — | `flex items-center gap-1 text-white font-bold cursor-pointer hover:text-[var(--color-text-gold)]` | `<ViewDetailLink />` |
| Spotlight Board | 2940:14174 | `rounded-2xl overflow-hidden` | `<SpotlightBoard />` |
| All Kudos Section | 2940:13475 | `w-full max-w-[1152px] flex flex-col gap-10` | `<AllKudos />` |
| All Kudos Content | 2940:13481 | `flex flex-col lg:flex-row gap-8 lg:gap-10 w-full` | wrapper `<div>` |
| Kudo Feed | 2940:13482 | `flex-1 flex flex-col` | `<KudoFeed />` |
| Kudo Post Card | 3127:21871 | `border-b border-[var(--color-border-footer)] py-6` | `<KudoCard />` |
| Heart Button | ;256:5175 | `flex items-center gap-1 cursor-pointer` | `<HeartButton />` |
| Copy Link | ;256:5216 | `flex items-center gap-1 text-white font-bold cursor-pointer` | `<CopyLinkButton />` |
| Stats Sidebar | 2940:13488 | `w-full lg:w-80 lg:sticky lg:top-[100px] flex flex-col gap-6` | `<KudosSidebar />` |
| Stat Row | 2940:13491 | `flex justify-between items-center` | `<StatRow />` |
| Heart Multiplier Badge | 3241:14931 | `inline-flex items-center gap-1 ml-2` | `<HeartMultiplierBadge />` |
| Open Gift Btn | 2940:13497 | `w-full rounded border border-[var(--color-border-gold)] bg-[var(--color-btn-secondary-bg)] p-4 font-bold` | `<OpenGiftButton />` |
| Gift List | 2940:13510 | `flex flex-col gap-3` | `<GiftRecipientsList />` |
| Recipient Row | 2940:13516 | `flex items-center gap-3` | `<RecipientRow />` |
| Hashtag Badge | ;2234:33038 | `rounded bg-[var(--color-btn-secondary-bg)] px-2 py-1 text-sm font-bold text-[var(--color-text-gold)]` | `<HashtagBadge />` |
| Toast Notification | — | `fixed bottom-6 right-6 z-50 rounded-lg border border-[var(--color-border-gold)] bg-[rgba(0,16,26,0.95)] px-4 py-3` | `<Toast />` |
| Skeleton Placeholder | — | `animate-pulse bg-[rgba(255,234,158,0.05)] rounded` | `<Skeleton />` |

---

## Notes

- **Reuse existing CSS variables**: Most color tokens already exist in `globals.css`. Always use `var(--color-*)` references instead of hardcoded hex values. See the "Existing CSS Var" column in the Colors table above.
- Prefer Tailwind utility classes following the project's TailwindCSS v4 setup.
- Icons MUST be implemented as Icon Components (React SVG components in `src/components/icons/`), not img tags or inline SVG.
- **CRITICAL — Font fallback**: SVN-Gotham is NOT available in the project. Use `Montserrat Alternates` (`var(--font-montserrat-alternates)`, weight 700) for the "KUDOS" display text. This font is already configured in `layout.tsx`.
- Montserrat (weights 400, 500, 700) is configured via `next/font/google` as `var(--font-montserrat)`.
- Ensure color contrast meets WCAG AA (4.5:1 for normal text) — gold (#FFEA9E) on dark (#00101A) passes.
- **All interactive elements MUST have visible focus states** (`outline: 2px solid var(--color-text-gold)`) for keyboard navigation, following the `<ProfileDropdown />` pattern.
- The Spotlight Board is the most visually complex component — consider canvas or SVG-based rendering for performance with many names. No visualization library is currently installed; adding one requires justification per constitution.
- **Existing shared components**: Header, HeaderNav, Footer, ProfileDropdown, LanguageSelector are already implemented and should be reused.
