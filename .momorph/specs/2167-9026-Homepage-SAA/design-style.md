# Design Style: Homepage SAA

**Frame ID**: `2167:9026`
**Frame Name**: `Homepage SAA`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/2167:9026
**Extracted At**: 2026-03-10

---

## Design Tokens

### Colors

| Token Name | Hex/RGBA Value | Opacity | Usage |
|------------|----------------|---------|-------|
| --color-bg-primary | #00101A / rgba(0, 16, 26, 1) | 100% | Page background |
| --color-header-bg | rgba(16, 20, 23, 0.8) | 80% | Header background |
| --color-text-primary | #FFEA9E / rgba(255, 234, 158, 1) | 100% | Primary accent text (headings, active nav, titles) |
| --color-text-white | #FFFFFF / rgba(255, 255, 255, 1) | 100% | Body text, descriptions, labels |
| --color-text-secondary | var(--Details-Text-Secondary-1, #FFF) | 100% | Secondary/content text |
| --color-border-gold | #998C5F / var(--Details-Border) | 100% | Borders (buttons, profile icon) |
| --color-border-footer | #2E3940 / rgba(46, 57, 64, 1) | 100% | Footer top border |
| --color-btn-primary | #FFEA9E / rgba(255, 234, 158, 1) | 100% | Primary CTA button background |
| --color-btn-primary-text | #00101A | 100% | Primary CTA button text |
| --color-btn-secondary-bg | rgba(255, 234, 158, 0.1) | 10% | Secondary button background / hover |
| --color-award-title | #FFEA9E / rgba(255, 234, 158, 1) | 100% | Award card title text |
| --color-award-desc | #FFFFFF / rgba(255, 255, 255, 1) | 100% | Award card description text |
| --color-notification-dot | rgba(212, 39, 29, 1) | 100% | Notification badge red dot |
| --color-kudos-bg | #DBD1C1 / rgba(219, 209, 193, 1) | 100% | "KUDOS" branding text color |
| --color-hero-gradient-start | #00101A | 100% | Hero overlay gradient (bottom) |
| --color-hero-gradient-mid | rgba(0, 18, 29, 0.46) | 46% | Hero overlay gradient (middle) |
| --color-hero-gradient-end | rgba(0, 19, 32, 0) | 0% | Hero overlay gradient (top) |
| --color-award-border | var(--Details-Text-Primary-1, #FFEA9E) | 100% | Award card image border (0.955px) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-heading-hero | Montserrat | 57px | 700 | 64px | -0.25px |
| --text-heading-section | Montserrat | 57px | 700 | 64px | -0.25px |
| --text-body-lg | Montserrat | 24px | 700 | 32px | 0px |
| --text-body-md | Montserrat | 24px | 400 | 32px | 0px |
| --text-body | Montserrat | 16px | 400 | 24px | 0.5px |
| --text-body-bold | Montserrat | 16px | 700 | 24px | 0.5px |
| --text-nav | Montserrat | 16px | 500 | 24px | 0.15px |
| --text-nav-bold | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-cta | Montserrat | 22px | 700 | 28px | 0px |
| --text-caption | Montserrat | 14px | 700 | 20px | 0.1px |
| --text-countdown-digit | Digital Numbers | 49.15px | 400 | auto | 0 |
| --text-countdown-label | Montserrat | 24px | 700 | 32px | 0px |
| --text-kudos-brand | SVN-Gotham | 96.16px | 400 | 24px | -13% |
| --text-footer | Montserrat Alternates | 16px | 700 | 24px | 0 |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Page horizontal padding (desktop) |
| --spacing-page-y | 96px | Page vertical padding (desktop) |
| --spacing-header-x | 144px | Header horizontal padding |
| --spacing-header-y | 12px | Header vertical padding |
| --spacing-footer | 40px 90px | Footer padding |
| --spacing-section-gap | 120px | Gap between major page sections inside "Bia" |
| --spacing-award-section-gap | 80px | Gap between awards header and grid |
| --spacing-countdown-gap | 40px | Gap between countdown tiles |
| --spacing-cta-gap | 40px | Gap between CTA buttons |
| --spacing-card-gap | 24px | Gap inside award card (image -> text -> link) |
| --spacing-header-link-gap | 64px | Gap between header logo group and nav links |
| --spacing-btn-padding | 16px 24px | CTA button internal padding |
| --spacing-nav-padding | 16px | Nav link internal padding |
| --spacing-award-row-gap | 80px | Vertical gap between award card rows |
| --spacing-award-row-layout | space-between | Horizontal distribution of cards within a row (3 x 336px in 1224px = ~108px effective gap) |
| --spacing-kudos-content-gap | 32px | Gap between elements in Kudos section |
| --spacing-hero-content-gap | 40px | Gap between hero children (logo, sub-container, CTA) |
| --spacing-hero-sub-gap | 16px | Gap between countdown and event info inside Frame 523 |
| --spacing-description-gap | 32px | Gap inside Frame 486 between decorative title and text |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-btn-cta | 8px | CTA buttons (ABOUT AWARDS, etc.) |
| --radius-btn-nav | 4px | Nav link hover/active state |
| --radius-btn-detail | 4px | "Chi tiet" / detail buttons |
| --radius-pill | 100px | Widget button, badge, dot |
| --radius-award-card-section | 8px | Award section container |
| --border-award-img | 0.955px solid var(--Details-Text-Primary-1, #FFEA9E) | Award thumbnail border |
| --border-gold | 1px solid var(--Details-Border, #998C5F) | Button/icon borders |
| --border-footer | 1px solid #2E3940 | Footer top divider |
| --border-gradient-line | 0.5px solid var(--Details-Text-Primary-1, #FFEA9E) | Decorative gradient line |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-text-glow | 0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #FAE287 | Text glow on hover (from existing CSS vars) |
| --shadow-btn-hover | 0 4px 12px rgba(255, 234, 158, 0.3) | Button hover shadow (from existing CSS vars) |

---

## Layout Specifications

### Page Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1512px | Design frame width |
| height | 4480px | Full page height |
| background | #00101A | Dark background |
| position | relative | Contains absolute-positioned background layers |

### 3.5_Keyvisual Background (Node 2167:9027)

| Property | Value | Notes |
|----------|-------|-------|
| width | 1512px (100%) | Full page width |
| height | 1392px | Fixed height background image |
| position | absolute | Behind content, z-index: 1 |
| **NOTE** | Background image layer, NOT a content container. Covers hero + part of Frame 486. Use as absolute positioned background with `object-fit: cover`. |

### Gradient Overlay "Cover" (Node 2167:9029)

| Property | Value | Notes |
|----------|-------|-------|
| width | 1512px (100%) | Full page width |
| height | 1480px | Slightly taller than keyvisual |
| position | absolute | z-index: 2 |
| background | linear-gradient(12deg, #00101A 23.7%, rgba(0, 18, 29, 0.46) 38.34%, rgba(0, 19, 32, 0) 48.92%) | Gradient overlay |

### Content Container ("Bia") (Node 2167:9030)

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Vertical stack |
| flex-direction | column | Top to bottom |
| gap | **120px** | Between ALL major sections |
| padding | **96px 144px** | top/bottom: 96px, left/right: 144px |
| align-items | center | Center children horizontally |
| justify-content | center | Center content vertically |
| effective-content-width | 1224px | 1512 - 2*144 |
| z-index | 3 | Above background layers |
| **children** | Frame 487 (hero) -> Frame 486 (root further desc) -> Awards section -> Kudos section | All major content sections are children of this single container |

### Hero Content (Frame 487, Node 2167:9031)

| Property | Value | Notes |
|----------|-------|-------|
| width | 1224px | Matches effective content width |
| height | 596px (content-driven) | NOT viewport height |
| display | flex column | `flex flex-col` |
| gap | **40px** | Between logo, sub-container, and CTA |
| align-items | flex-start | Left-aligned content |
| padding | 0px | No padding on this container |
| **NOTE** | NOT min-h-screen. Hero is NOT a full viewport section — it is just one child of the "Bia" container, sitting alongside Frame 486, Awards, and Kudos with 120px gaps between them. |

### Layout Structure (ASCII)

```
+---------------------------------------------------------------------------+
|  Page (bg: #00101A, w: 1512px, h: 4480px)                                |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  3.5_Keyvisual BG (1512x1392, absolute, z:1)                        | |
|  |  Cover/Gradient (1512x1480, absolute, z:2)                           | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  A1_Header (h:80px, px:144px, bg:rgba(16,20,23,0.8), z:10)         | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  "Bia" (p:96px 144px, flex-col, center, gap:120px, z:3)            | |
|  |                                                                      | |
|  |  +----------------------------------------------------------------+ | |
|  |  |  Frame 487 -- Hero Content (1224x596, flex-col, gap:40px)      | | |
|  |  |  +- ROOT FURTHER Logo (451x200px, image)                       | | |
|  |  |  +- Frame 523 (flex-col, gap:16px)                             | | |
|  |  |  |   +- B1_Countdown (gap:16px)                                | | |
|  |  |  |   |   +- "Comming soon" (24px/700)                          | | |
|  |  |  |   |   +- Tiles (flex-row, gap:40px)                         | | |
|  |  |  |   |       +- Digit box: 51x82, glass-morphism               | | |
|  |  |  |   +- B2_Event Info (gap:8px, 16px/700)                      | | |
|  |  |  +- B3_CTA (flex-row, gap:40px)                                | | |
|  |  |      +- ABOUT AWARDS (276x60, r:8)                             | | |
|  |  |      +- ABOUT KUDOS (same)                                     | | |
|  |  +----------------------------------------------------------------+ | |
|  |                         gap: 120px                                   | |
|  |  +----------------------------------------------------------------+ | |
|  |  |  Frame 486 (1152px, r:8, p:120px 104px, gap:32px)             | | |
|  |  |  +- Group 434 (290x134, decorative ROOT/FURTHER)               | | |
|  |  |  +- B4_content (text, 16px/400, white)                         | | |
|  |  +----------------------------------------------------------------+ | |
|  |                         gap: 120px                                   | |
|  |  +----------------------------------------------------------------+ | |
|  |  |  Awards (1224px, flex-col, gap:80px)                           | | |
|  |  |  +- C1_Header (gap:16px)                                       | | |
|  |  |  +- C2_Grid (2 rows, flex space-between, gap:80px)             | | |
|  |  |      +- Row 1: 3 cards x 336px (gap ~108px auto)               | | |
|  |  |      +- Row 2: 3 cards x 336px                                 | | |
|  |  +----------------------------------------------------------------+ | |
|  |                         gap: 120px                                   | |
|  |  +----------------------------------------------------------------+ | |
|  |  |  D1_Sunkudos (1224px outer, 1120px inner card)                 | | |
|  |  +----------------------------------------------------------------+ | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  7_Footer (p:40px 90px, border-top:#2E3940, space-between)          | |
|  |  [Logo]--gap:80px--[Nav Links]          [Copyright]                  | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|  [Widget Button] (fixed, bottom-right, 106x64, pill)                     |
+---------------------------------------------------------------------------+
```

---

## Component Style Details

### A1_Header

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9091 | - |
| width | 100% (1512px) | `width: 100%` |
| height | 80px | `h-20` |
| display | flex | `flex` |
| flex-direction | row | `flex-row` |
| align-items | center | `items-center` |
| justify-content | space-between | `justify-between` |
| padding | 12px 144px | `py-3 px-36` (lg) |
| background | rgba(16, 20, 23, 0.8) | `bg-[rgba(16,20,23,0.8)]` |
| position | sticky/fixed | `sticky top-0 z-10` |

#### Nav Link States

| State | Property | Value |
|-------|----------|-------|
| Normal | color | #FFFFFF |
| Normal | font | 16px/500 Montserrat |
| Normal | padding | 16px |
| Hover | background | rgba(255, 234, 158, 0.1) |
| Hover | border-radius | 4px |
| Selected/Active | color | #FFEA9E |
| Selected/Active | font-weight | 700 |
| Selected/Active | text-decoration | underline |

---

### 3.5_Keyvisual Background Layer (Node 2167:9027)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9027 | - |
| width | 1512px (100%) | `w-full` |
| height | 1392px | `h-[1392px]` |
| position | absolute | `absolute top-0 left-0 z-[1]` |
| background-image | url(keyvisual-bg.png) | `bg-cover bg-center` |
| **note** | This is a background image layer, NOT a content container. It sits behind the "Bia" content. Do NOT use `min-h-screen`. The gradient overlay (Cover, Node 2167:9029) sits on top at z:2 with height 1480px. |

#### Gradient Overlay (Cover, Node 2167:9029)

| Property | Value |
|----------|-------|
| **Node ID** | 2167:9029 |
| width | 1512px (100%) |
| height | 1480px |
| background | linear-gradient(12deg, #00101A 23.7%, rgba(0, 18, 29, 0.46) 38.34%, rgba(0, 19, 32, 0.00) 48.92%) |
| position | absolute, z-index: 2 |

---

### Hero Content Container (Node 2167:9031 — "Frame 487")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9031 | - |
| display | flex column | `flex flex-col` |
| gap | **40px** | `gap-10` |
| width | 1224px | `w-[1224px]` |
| height | 596px (content-driven) | auto |
| align-items | flex-start | `items-start` |
| padding | 0px | No padding |
| **children** | ROOT FURTHER logo -> Frame 523 (countdown+event) -> CTA buttons |
| **note** | This is a child of "Bia" container, NOT a standalone viewport section. No min-h-screen. |

#### ROOT FURTHER Logo (Node 2788:12911)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2788:12911 | - |
| width | 451px | `w-[451px]` |
| height | 200px | `h-[200px]` |
| aspect-ratio | 115/51 | `aspect-[115/51]` |
| background | image cover | Hero logo image |

#### Hero Sub-container: Countdown + Event Info (Node 2167:9034 — "Frame 523")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9034 | - |
| display | flex column | `flex flex-col` |
| gap | **16px** | `gap-4` |
| width | 1224px | `w-full` |
| height | 256px | content-driven |
| **children** | B1_Countdown -> B2_Event Info |
| **note** | Countdown and Event Info are grouped in a sub-container with 16px gap, while the outer container (Frame 487) uses 40px gap between ROOT FURTHER logo, this group, and CTA buttons. |

---

### B1_Countdown Time

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9035 | - |
| display | flex | `flex` |
| flex-direction | column | `flex-col` |
| gap | 16px | `gap-4` |
| width | 1224px | `w-full max-w-[1224px]` |

#### "Comming soon" Label

| Property | Value |
|----------|-------|
| **Node ID** | 2167:9036 |
| font | Montserrat 24px/700, line-height: 32px |
| color | #FFFFFF |
| note | Spelling is "Comming soon" (intentional, per Figma design) |

#### Countdown Tiles Container

| Property | Value |
|----------|-------|
| **Node ID** | 2167:9037 |
| display | flex row |
| gap | 40px |
| align-items | center |

#### Single Countdown Tile (e.g., Days)

| Property | Value |
|----------|-------|
| **Node ID** | 2167:9038 (Days), 2167:9043 (Hours), 2167:9048 (Minutes) |
| display | flex column |
| gap | 14px |
| align-items | flex-start |

#### Single Countdown Digit Box (Rectangle 1 — each digit has its own background)

| Property | Value | CSS |
|----------|-------|-----|
| width | 51.2px | `w-[52px]` |
| height | 81.92px | `h-[82px]` |
| border-radius | 8px | `rounded-lg` |
| border | 0.5px solid var(--Details-Text-Primary-1, #FFEA9E) | `border border-[#FFEA9E]/50` |
| opacity | 0.5 (on the border/background) | Applied to glass-morphism effect |
| background | linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%) | Glass-morphism gradient |
| backdrop-filter | blur(16.64px) | `backdrop-blur-[17px]` |
| display | flex, center content | `flex items-center justify-center` |
| **note** | Each digit ("2" and "0") is rendered in its OWN individual box. A 2-digit value like "20" has TWO separate boxes side by side. The boxes have a glass-morphism effect with gradient background, gold border, and backdrop blur. |

#### Countdown Digit Text

| Property | Value |
|----------|-------|
| font-family | "Digital Numbers" (custom font — file to be added to project) |
| font-size | 49.15px |
| font-weight | 400 |
| color | #FFFFFF |
| display | Each digit rendered individually; 2 digits per unit, zero-padded |
| note | Font file: `Digital Numbers` — must be added to `src/app/fonts/` or `public/fonts/` and loaded via `@font-face` or `next/font/local`. Use `font-mono` as fallback until font is added. |

#### Countdown Unit Label

| Property | Value |
|----------|-------|
| font | Montserrat 24px/700 |
| line-height | 32px |
| color | #FFFFFF |

---

### B2_Event Info

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9053 | - |
| display | flex column | `flex flex-col` |
| gap | 8px | `gap-2` |
| font | Montserrat 16px/700, lh: 24px, ls: 0.15px | `text-base font-bold` |
| color | #FFFFFF | `text-white` |

---

### B3_CTA Buttons (Node 2167:9062)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9062 | - |
| width | 570px | `w-[570px]` |
| height | 60px | `h-[60px]` |
| display | flex row | `flex flex-row` |
| gap | 40px | `gap-10` |

#### Button "ABOUT AWARDS" (shown in Figma as HOVER state — gold filled)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9063 | - |
| width | 276px | `w-[276px]` |
| height | 60px | `h-[60px]` |
| padding | 16px 24px | `px-6 py-4` |
| background | rgba(255,234,158,1) (this is the HOVER state) | `bg-[var(--color-btn-primary)]` |
| border-radius | 8px | `rounded-lg` |
| font | Montserrat 22px/700 | `text-[22px] font-bold` |
| line-height | 28px | `leading-7` |
| color | #00101A (this is the HOVER state) | `text-[#00101A]` |
| display | flex row | `flex items-center` |
| gap | 8px | `gap-2` |
| **note** | **IMPORTANT**: The Figma screenshot shows this button in its HOVER state (filled gold). In NORMAL state, it looks identical to "ABOUT KUDOS" (outlined). Both buttons share the SAME state patterns. |

#### Button "ABOUT KUDOS" (shown in Figma as NORMAL state — outlined)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9064 | - |
| width | 276px | `w-[276px]` |
| height | 60px | `h-[60px]` |
| padding | 16px 24px | `px-6 py-4` |
| background | rgba(255, 234, 158, 0.1) | `bg-[rgba(255,234,158,0.1)]` |
| border | 1px solid #998C5F | `border border-[#998C5F]` |
| border-radius | 8px | `rounded-lg` |
| font | Montserrat 22px/700 | `text-[22px] font-bold` |
| line-height | 28px | `leading-7` |
| color | #FFFFFF | `text-white` |
| gap | 8px | `gap-2` |

**CTA Button States** (BOTH buttons share these SAME states):
| State | Changes |
|-------|---------|
| Normal (outlined) | bg: rgba(255,234,158,0.1), border: 1px solid #998C5F, text: white |
| Hover (filled) | bg: #FFEA9E, border: transparent, text: #00101A |
| Active | bg: #FFD740 (darker gold) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| **note** | Both buttons are IDENTICAL in behavior. The Figma shows ABOUT AWARDS in hover state and ABOUT KUDOS in normal state for demonstration purposes only. In implementation, both start as outlined (normal) and become filled on hover. Do NOT make them different variants. |

---

### B4_Root Further Decorative + Content (Frame 486, Node 3204:10152)

#### Frame 486 Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3204:10152 | - |
| width | 1152px (fixed) | `max-w-[1152px] w-full` |
| height | ~1219px (content-driven) | - |
| display | flex column | `flex flex-col` |
| gap | **32px** | `gap-8` |
| padding | **120px 104px** (top/bottom: 120px, left/right: 104px) | `py-[120px] px-[104px]` |
| border-radius | 8px | `rounded-lg` |
| align-items | center | `items-center` |
| **note** | This is a child of the "Bia" container, separated from the hero (Frame 487) by a 120px gap. It holds the decorative "ROOT FURTHER" title (Group 434) and the B4_content text block. |

#### Group 434 — Decorative "ROOT FURTHER" Title

| Property | Value |
|----------|-------|
| width | 290px |
| height | 134px |
| Content | "ROOT" text image + "FURTHER" text image stacked vertically |
| Type | Static image composition — use `next/image` with decorative alt="" and aria-hidden="true" |
| Children | MM_MEDIA_Root Text (root-text.png) + MM_MEDIA_Further Text (further-text.png) |
| gap | 8px (between root and further text images) |

#### B4_Content — Text Block

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 5001:14827 | - |
| width | 1152px (fills Frame 486 content area) | `w-full` |
| font | Montserrat 16px/400, lh: 24px, ls: 0.5px | `text-base font-normal` |
| color | #FFFFFF | `text-white` |
| content | Multi-paragraph Vietnamese text + English quote: "A tree with deep roots fears no storm" |
| **note** | The text block sits below the decorative title with a 32px gap (from Frame 486 container). |

---

### Awards Section — "He thong giai thuong" (Node 2167:9068)

#### Awards Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9068 | - |
| width | 1224px | `w-[1224px]` |
| height | 1353px | content-driven |
| display | flex column | `flex flex-col` |
| gap | **80px** | `gap-20` (between header and grid) |

### C1_Awards Section Header

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9069 | - |
| width | 1224px | `w-full` |
| height | 129px | content-driven |
| display | flex column | `flex flex-col` |
| gap | 16px | `gap-4` |

#### Caption ("Sun* annual awards 2025")

| Property | Value |
|----------|-------|
| font | Montserrat 24px/700 |
| color | #FFEA9E |

#### Title ("He thong giai thuong")

| Property | Value |
|----------|-------|
| font | Montserrat 57px/700, lh: 64px, ls: -0.25px |
| color | #FFEA9E |

---

### C2_Award Grid (Node 5005:14974)

| Property | Value | CSS |
|----------|-------|-----|
| width | 1224px | `w-full` |
| height | 1144px | content-driven |
| display | flex column | `flex flex-col` |
| gap | **80px** | `gap-20` (vertical gap between rows) |

#### Award Row (Frame 491 / Frame 493)

| Property | Value | CSS |
|----------|-------|-----|
| width | 1224px | `w-full` |
| display | flex row | `flex flex-row` |
| justify-content | space-between | `justify-between` |
| gap | **80px** (minimum) | Effective gap with space-between: (1224 - 3*336) / 2 = ~108px |
| **note** | Each row contains 3 award cards of 336px width. With `justify-content: space-between` in a 1224px container, the effective gap between cards is approximately 108px. |

### C2_Award Card (repeated x6)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9075 (Top Talent) | - |
| width | **336px** | `w-[336px]` |
| height | ~504px (varies) | `auto` |
| display | flex column | `flex flex-col` |
| gap | **24px** | `gap-6` |
| cursor | pointer | `cursor-pointer` |

#### Card Thumbnail

| Property | Value |
|----------|-------|
| **Node ID** | I2167:9075;214:1019 |
| width | **336px** |
| height | **336px** |
| border | 0.955px solid #FFEA9E |
| border-radius | 0 (square) |
| background-image | Award-specific decorative image |

#### Card Title

| Property | Value |
|----------|-------|
| **Node ID** | I2167:9075;214:1021 |
| font | Montserrat 24px/400 |
| color | #FFEA9E |

#### Card Description

| Property | Value |
|----------|-------|
| **Node ID** | I2167:9075;214:1022 |
| font | Montserrat 16px/400, lh: 24px, ls: 0.5px |
| color | #FFFFFF |
| max-lines | 2 (overflow: ellipsis) |

#### Card "Chi tiet" Link

| Property | Value |
|----------|-------|
| **Node ID** | I2167:9075;214:1023 |
| display | flex row |
| gap | 4px |
| padding | 16px 0 |
| font | Montserrat 16px/700, lh: 24px, ls: 0.5px |
| color | #FFFFFF |
| icon | Diagonal arrow icon — `ArrowUpRightIcon` component, 16x16, currentColor |

**Card States**:
| State | Changes |
|-------|---------|
| Default | Normal display |
| Hover | transform: translateY(-4px); box-shadow: 0 8px 24px rgba(255, 234, 158, 0.15); border-color brightness increase on thumbnail |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### D1_Sun*Kudos Section (Node 3390:10349)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3390:10349 | - |
| width | **1224px** (outer container) | `w-[1224px]` |
| height | 500px | content-driven |
| **note** | Outer container is 1224px wide, matching the effective content width of "Bia". |

#### Inner SunKudos Card

| Property | Value | CSS |
|----------|-------|-----|
| width | **1120px** | `w-[1120px]` |
| height | 500px | `h-[500px]` |
| display | flex (2-column) | Layout with content left, graphic right |
| border-radius | 8px | `rounded-lg` |
| background | Image-based dark background |

#### D2_Content (Left Side)

| Property | Value |
|----------|-------|
| **Node ID** | I3390:10349;313:8419 |
| display | flex column |
| gap | 32px |

#### "Phong trao ghi nhan" Label

| Property | Value |
|----------|-------|
| font | Montserrat 24px/700, lh: 32px |
| color | #FFFFFF |

#### "Sun* Kudos" Title

| Property | Value |
|----------|-------|
| font | Montserrat 57px/700, lh: 64px, ls: -0.25px |
| color | #FFEA9E |

#### "DIEM MOI CUA SAA 2025" Sub-label

| Property | Value |
|----------|-------|
| font | Montserrat 16px/700, lh: 24px, ls: 0.5px |
| color | #FFFFFF |
| text-transform | uppercase |

#### Description Paragraph

| Property | Value |
|----------|-------|
| font | Montserrat 16px/700, lh: 24px, ls: 0.5px |
| color | #FFFFFF |

#### "Chi tiet" Button (D2.1)

| Property | Value |
|----------|-------|
| **Node ID** | I3390:10349;313:8426 |
| background | #FFEA9E |
| border-radius | 4px |
| padding | 16px |
| font | Montserrat 16px/700 |
| color | #00101A |
| gap | 8px |

#### "KUDOS" Branding Text

| Property | Value |
|----------|-------|
| font-family | SVN-Gotham |
| font-size | 96.16px |
| font-weight | 400 |
| color | #DBD1C1 |
| letter-spacing | -13% |
| note | Font file: `SVN-Gotham` — must be added to project and loaded via `@font-face` or `next/font/local` |

---

### 7_Footer (Node 5001:14800)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 5001:14800 | - |
| width | 1512px | `w-full` |
| padding | **40px 90px** | `py-10 px-[90px]` |
| border-top | 1px solid #2E3940 | `border-t border-[#2E3940]` |
| display | flex row | `flex justify-between items-center` |
| align-items | center | `items-center` |
| justify-content | space-between | `justify-between` |

#### Frame 488 (Logo + Nav Group)

| Property | Value |
|----------|-------|
| width | 971px |
| height | 64px |
| display | flex row |
| align-items | center |
| gap | **80px** |

#### Footer Logo

| Property | Value |
|----------|-------|
| **Node ID** | I5001:14800;342:1408 |
| width | 69px, height: 64px |

#### Footer Nav Links

| Property | Value |
|----------|-------|
| font | Montserrat 16px/700, lh: 24px |
| color | #FFFFFF |
| padding | 16px |
| gap | 4px per link |

#### Footer Copyright

| Property | Value |
|----------|-------|
| font | Montserrat Alternates 16px/700, lh: 24px |
| color | #FFFFFF |

---

### 6_Widget Button (Floating)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 5022:15169 | - |
| width | 106px | `w-[106px]` |
| height | 64px | `h-16` |
| display | flex row | `flex items-center` |
| gap | 8px | `gap-2` |
| padding | 16px | `p-4` |
| background | #FFEA9E | `bg-[var(--color-btn-login)]` |
| border-radius | 100px | `rounded-full` |
| position | fixed | `fixed bottom-8 right-8` |
| z-index | high | `z-50` |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A)
+-- Keyvisual BG (1512x1392, absolute, z:1)
+-- Cover/Gradient (1512x1480, absolute, z:2)
+-- Header (h:80, px:144, bg:rgba(16,20,23,0.8), fixed, z:10)
+-- "Bia" Content (p:96px 144px, flex-col, center, gap:120px, z:3)
|   +-- Frame 487 -- Hero (1224x596, flex-col, gap:40px, items-start)
|   |   +-- ROOT FURTHER Logo (451x200, image)
|   |   +-- Sub-container Frame 523 (flex-col, gap:16px)
|   |   |   +-- Countdown (flex-col, gap:16px)
|   |   |   |   +-- "Comming soon" (24px/700, white)
|   |   |   |   +-- Tiles (flex-row, gap:40px)
|   |   |   |       +-- Digit: 51x82, glass-morphism, Digital Numbers 49px
|   |   |   +-- Event Info (flex-col, gap:8px, 16px/700, white)
|   |   +-- CTA Buttons (flex-row, gap:40px)
|   |       +-- ABOUT AWARDS (276x60, outlined->filled on hover)
|   |       +-- ABOUT KUDOS (same as above)
|   |
|   +-- Frame 486 (1152px, r:8, p:120px 104px, gap:32px, center)
|   |   +-- Group 434: ROOT+FURTHER decorative images (290x134)
|   |   +-- B4_Content: Description text (16px/400, white)
|   |
|   +-- Awards Section (1224px, flex-col, gap:80px)
|   |   +-- Header (gap:16px)
|   |   |   +-- "Sun* annual awards 2025" (24px/700, gold)
|   |   |   +-- "He thong giai thuong" (57px/700, gold)
|   |   +-- Grid: 2 rows x 3 cards (space-between, gap-y:80px)
|   |       +-- Card (336px, flex-col, gap:24px)
|   |           +-- Thumbnail (336x336, border:0.955px gold)
|   |           +-- Title (24px/400, gold)
|   |           +-- Description (16px/400, white, 2 lines max)
|   |           +-- "Chi tiet" (16px/700, white, gap:4px)
|   |
|   +-- Kudos (1224px outer, 1120px inner card)
|       +-- Content (flex-col, gap:32px)
|       +-- Branding Graphic (KUDOS, SVN-Gotham 96px)
|
+-- Footer (p:40px 90px, border-top:#2E3940, space-between)
|   +-- Left (flex-row, gap:80px): Logo + Nav Links
|   +-- Right: Copyright (Montserrat Alt 16px/700)
|
+-- Widget Button (fixed, bottom-right, 106x64, pill)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 320px | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | --- |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Header | px: 24px, nav links hidden -> hamburger menu |
| Hero | Height: auto, content stacks vertically |
| Countdown tiles | gap: 16px, digit font smaller |
| CTA Buttons | Stack vertically, full width |
| Content padding | px: 24px |
| Section title | font-size: 32px |
| Award Grid | 1-2 columns |
| Kudos Section | Stack vertically (content above graphic) |
| Footer | Stack vertically, px: 24px |
| Widget Button | Smaller, bottom-right margin reduced |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Header | px: 48px, nav links visible |
| Content padding | px: 48px |
| Section title | font-size: 40px |
| Award Grid | 2 columns |
| Kudos Section | Reduce padding |
| Footer | px: 48px |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| All | Use full design specs as documented above |
| Award Grid | 3 columns, space-between rows |
| Content width | max: 1224px centered within "Bia" |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| SAA Logo | 52x48 (header) / 69x64 (footer) | Original colors | Branding |
| Notification Bell | 20x20 (inside 40x40 btn) | #FFFFFF | Header notification |
| Notification Dot | 8x8 | rgba(212, 39, 29, 1) | Unread badge |
| User Profile | 20x20 (inside 40x40 btn) | #FFFFFF | Header profile |
| Chevron Down | 16x16 | #FFFFFF | Language selector |
| ArrowUpRight | 16x16 | currentColor | CTA buttons, "Chi tiet" links |
| Pen Icon | ~20x20 | currentColor | Widget button (left) |
| SAA Mini Icon | ~20x18 | currentColor | Widget button (right) |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Nav Link | background-color | 150ms | ease-in-out | Hover |
| CTA Button | background-color, color, border | 150ms | ease-in-out | Hover |
| Award Card | transform (translateY), box-shadow | 200ms | ease-out | Hover |
| Widget Button | transform (scale) | 150ms | ease-in-out | Hover/Click |
| Countdown Digit | opacity | 300ms | ease-in-out | Value change |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS | React Component |
|----------------|---------------|----------------|-----------------|
| Header | 2167:9091 | existing `Header.tsx` + extend | `<Header>` (extend with nav links) |
| Keyvisual BG | 2167:9027 | `absolute top-0 left-0 w-full h-[1392px] z-[1] bg-cover bg-center` | Background layer in page |
| Gradient Overlay | 2167:9029 | `absolute top-0 left-0 w-full h-[1480px] z-[2]` with gradient | Overlay layer in page |
| "Bia" Container | 2167:9030 | `relative z-[3] flex flex-col items-center justify-center gap-[120px] py-24 px-36` | `<main>` wrapper |
| Hero Content | 2167:9031 | `relative w-full max-w-[1224px] flex flex-col gap-10 items-start` | `<HeroBanner>` |
| ROOT FURTHER Logo | 2788:12911 | `w-[451px] h-[200px] bg-cover` | Image in `<HeroBanner>` |
| Frame 523 | 2167:9034 | `flex flex-col gap-4 w-full` | Sub-container in `<HeroBanner>` |
| Countdown | 2167:9035 | `flex flex-col gap-4` | `<CountdownTimer>` (client) |
| Countdown Tile | 2167:9038 | `flex flex-col gap-3.5` | `<CountdownTile>` |
| Event Info | 2167:9053 | `flex flex-col gap-2` | Inside `<HeroBanner>` |
| CTA Buttons | 2167:9062 | `flex flex-row gap-10` | Container in `<HeroBanner>` |
| CTA Button | 2167:9063/9064 | `rounded-lg px-6 py-4 text-[22px] font-bold` (both same states: outlined->filled on hover) | `<CTAButton>` (NO variant -- both identical) |
| Root Further Frame 486 | 3204:10152 | `max-w-[1152px] rounded-lg py-[120px] px-[104px] gap-8 flex flex-col items-center` | Wrapper in `<RootFurtherDecorative>` + `<RootFurtherSection>` |
| Root Further Decorative | Group 434 | `w-[290px] h-[134px] flex flex-col items-center gap-2` (image composition) | `<RootFurtherDecorative>` |
| Content Section | 5001:14827 | `text-base text-white w-full` | `<RootFurtherSection>` |
| Awards Container | 2167:9068 | `w-full max-w-[1224px] flex flex-col gap-20` | `<AwardsSection>` |
| Awards Header | 2167:9069 | `flex flex-col gap-4` | `<AwardsSectionHeader>` |
| Award Grid | 5005:14974 | `flex flex-col gap-20` (rows use `flex flex-row justify-between`) | `<AwardsGrid>` |
| Award Card | 2167:9075 | `w-[336px] flex flex-col gap-6 cursor-pointer` | `<AwardCard>` |
| Kudos Outer | 3390:10349 | `w-full max-w-[1224px]` | `<KudosPromotion>` wrapper |
| Kudos Inner | SunKudos | `w-[1120px] h-[500px] rounded-lg` | `<KudosPromotion>` inner card |
| Footer | 5001:14800 | existing `Footer.tsx` + extend | `<Footer>` (extend with nav links) |
| Footer Frame 488 | Frame 488 | `flex flex-row items-center gap-20` | Left group in `<Footer>` |
| Widget Button | 5022:15169 | `fixed bottom-8 right-8 rounded-full` | `<WidgetButton>` (client) |

---

## Notes

- All colors should use CSS variables defined in `globals.css` for consistency
- The "Digital Numbers" font will be added to the project as a local font file, loaded via `next/font/local`
- The "SVN-Gotham" font for "KUDOS" branding will be added to the project as a local font file, loaded via `next/font/local`
- Spelling "Comming soon" is intentional per Figma design -- keep as-is
- Award card thumbnails are decorative images -- use `aria-hidden="true"` on the img and provide text alternatives via card title
- Ensure color contrast meets WCAG AA (4.5:1 for normal text) -- gold (#FFEA9E) on dark (#00101A) passes AA
- All icons MUST be implemented as React Icon Components (not img tags or SVG files) per constitution
- Existing CSS variables (`--color-bg-primary`, `--color-btn-login`, etc.) should be reused where values match
- The page is NOT structured as viewport-height sections. ALL content sits inside a single "Bia" container with 120px gaps. The keyvisual and gradient overlay are absolute-positioned background layers behind this content.
- Award grid rows use `justify-content: space-between` with 3 cards of 336px in a 1224px container, producing ~108px effective gaps. Do NOT use a fixed gap value like `gap-8` (32px).
