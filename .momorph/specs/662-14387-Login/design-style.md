# Design Style: Login

**Frame ID**: `662:14387`
**Frame Name**: `Login`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/662:14387
**Extracted At**: 2026-03-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background, gradient base |
| --color-header-bg | #0B0F12 | 80% | Header background (semi-transparent) |
| --color-btn-login | #FFEA9E | 100% | Login button background |
| --color-btn-login-text | #00101A | 100% | Login button text |
| --color-text-white | #FFFFFF | 100% | Body text, labels, language text |
| --color-border-footer | #2E3940 | 100% | Footer top border |
| --color-gradient-left | #00101A | 100% | Left-side gradient overlay |
| --color-gradient-bottom | #00101A | 100% | Bottom gradient overlay |
| --color-error | #EF4444 | 100% | Authentication error messages |
| --color-btn-login-hover | #FFE070 | 100% | Login button hover state |
| --color-btn-login-active | #FFD740 | 100% | Login button active/pressed state |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Color |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-lang-label | Montserrat | 16px | 700 | 24px | 0.15px | #FFFFFF |
| --text-hero-body | Montserrat | 20px | 700 | 40px | 0.5px | #FFFFFF |
| --text-btn-login | Montserrat | 22px | 700 | 28px | 0px | #00101A |
| --text-footer | Montserrat Alternates | 16px | 700 | 24px | 0% | #FFFFFF |
| --text-error | Montserrat | 14px | 500 | 20px | 0px | #EF4444 |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-header-px | 144px | Header horizontal padding |
| --spacing-header-py | 12px | Header vertical padding |
| --spacing-hero-px | 144px | Hero section horizontal padding |
| --spacing-hero-py | 96px | Hero section vertical padding |
| --spacing-hero-gap | 80px | Gap between key visual and content |
| --spacing-content-gap | 24px | Gap between text and login button |
| --spacing-content-pl | 16px | Content left padding offset |
| --spacing-btn-px | 24px | Login button horizontal padding |
| --spacing-btn-py | 16px | Login button vertical padding |
| --spacing-btn-icon-gap | 8px | Gap between button text and icon |
| --spacing-footer-px | 90px | Footer horizontal padding |
| --spacing-footer-py | 40px | Footer vertical padding |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-btn-login | 8px | Login button border radius |
| --radius-lang-btn | 4px | Language selector border radius |
| --border-footer | 1px solid #2E3940 | Footer top border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-btn-hover | 0 4px 12px rgba(255, 234, 158, 0.3) | Login button hover state |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px | Desktop design width |
| height | 1024px | Desktop design height |
| background | #00101A | Dark navy background |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Login Page (1440 x 1024, bg: #00101A)                               │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  A_Header (1440 x 80, bg: #0B0F12 @ 80%, px: 144, py: 12)      ││
│  │  ┌──────────┐                                    ┌─────────────┐││
│  │  │ A.1 Logo │                                    │ A.2 Lang VN │││
│  │  │ 52x48    │                                    │ 108x56      │││
│  │  └──────────┘                                    └─────────────┘││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  C_Keyvisual (full-screen background image, z-index: 1)         ││
│  │  + Gradient overlay left→right (#00101A → transparent)           ││
│  │  + Gradient overlay bottom→top (#00101A → transparent)           ││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  B_Bìa (1440 x 845, px: 144, py: 96)                           ││
│  │                                                                  ││
│  │  ┌─────────────────────────────────────────┐                     ││
│  │  │  B.1 Key Visual (ROOT FURTHER logo)     │                     ││
│  │  │  451 x 200                              │                     ││
│  │  └─────────────────────────────────────────┘                     ││
│  │                       ↕ gap: 80px                                ││
│  │  ┌──────────────────────────────────┐                            ││
│  │  │  B.2 Content (pl: 16px)          │                            ││
│  │  │  "Bắt đầu hành trình..."        │                            ││
│  │  │  480 x 80, Montserrat 20/40 bold │                            ││
│  │  └──────────────────────────────────┘                            ││
│  │                       ↕ gap: 24px                                ││
│  │  ┌──────────────────────────────────┐                            ││
│  │  │  B.3 Login Button                │                            ││
│  │  │  305 x 60, bg: #FFEA9E          │                            ││
│  │  │  radius: 8px, px: 24, py: 16    │                            ││
│  │  │  ┌────────────────────┐ ┌────┐  │                            ││
│  │  │  │ "LOGIN With Google"│ │ G  │  │                            ││
│  │  │  │ Montserrat 22/28   │ │icon│  │                            ││
│  │  │  └────────────────────┘ └────┘  │                            ││
│  │  └──────────────────────────────────┘                            ││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  D_Footer (px: 90, py: 40, border-top: 1px solid #2E3940)       ││
│  │  "Bản quyền thuộc về Sun* © 2025" (centered)                    ││
│  │  Montserrat Alternates 16/24 bold, white                        ││
│  └──────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A_Header — Navigation Bar

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `662:14391` | - |
| width | 1440px | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(11, 15, 18, 0.8) | `background-color: rgba(11, 15, 18, 0.8)` |
| display | flex | `display: flex` |
| justify-content | space-between | `justify-content: space-between` |
| align-items | center | `align-items: center` |
| position | fixed / absolute | `position: fixed; top: 0; z-index: 10` |

---

### A.1_Logo — Sun Annual Awards Logo

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I662:14391;186:2166` | - |
| width | 52px | `width: 52px` |
| height | 48px | `height: 48px` |
| content | Image (MM_MEDIA_Logo) | `<Image>` component |

**Media file**: `I662:14391;178:1033;178:1030` — Logo PNG

---

### A.2_Language — Language Selector Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I662:14391;186:1601` | - |
| width | 108px | `width: auto` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| display | flex | `display: flex; flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 2px (inner) | `gap: 2px` |

**Children**:
- Flag icon (24x24px) — VN flag SVG (`I662:14391;186:1696;186:1821;186:1709`)
- Text "VN" — Montserrat 16px/24px bold, white, letter-spacing 0.15px
- Chevron down icon (24x24px) — SVG (`I662:14391;186:1696;186:1821;186:1441`)

**States:**

| State | Changes |
|-------|---------|
| Default | background: transparent, color: white, cursor: pointer |
| Hover | background: rgba(255, 255, 255, 0.1), cursor: pointer |
| Focus | outline: 2px solid rgba(255, 255, 255, 0.5), outline-offset: 2px |
| Active/Open | Opens language dropdown (linked frame: `721:4942`), aria-expanded: true |

**Media files**:
- VN flag: `I662:14391;186:1696;186:1821;186:1709` — SVG
- Chevron: `I662:14391;186:1696;186:1821;186:1441` — SVG

---

### B.1_Key Visual — ROOT FURTHER Logo

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2939:9548` | - |
| width | 451px | `width: 451px` |
| height | 200px | `height: auto` |
| aspect-ratio | 115/51 | `aspect-ratio: 115/51` |
| content | Image (ROOT FURTHER logo) | `<Image>` component |

**Media file**: `2939:9548` — ROOT FURTHER logo PNG

---

### B.2_Content — Hero Description Text

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `662:14753` | - |
| width | 480px | `max-width: 480px` |
| padding-left | 16px | `padding-left: 16px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 20px | `font-size: 20px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 40px | `line-height: 40px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #FFFFFF | `color: white` |
| text-align | left | `text-align: left` |

**Content**: "Bắt đầu hành trình của bạn cùng SAA 2025.\nĐăng nhập để khám phá!"

---

### B.3_Login — Google Login Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `662:14425` / `662:14426` | - |
| width | 305px | `width: auto; min-width: 305px` |
| height | 60px | `height: 60px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border | none | `border: none` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex; flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` |
| cursor | pointer | `cursor: pointer` |

**Text "LOGIN With Google"**:

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I662:14426;186:1568` | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #00101A | `color: #00101A` |
| text-align | center | `text-align: center` |

**Google Icon** (Node: `I662:14426;186:1766`): 24x24px SVG

**States:**

| State | Changes |
|-------|---------|
| Default | background: #FFEA9E, cursor: pointer |
| Hover | background: #FFE070, box-shadow: 0 4px 12px rgba(255, 234, 158, 0.3), transform: translateY(-1px) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| Active | background: #FFD740, transform: translateY(0) |
| Disabled | background: #FFEA9E, opacity: 0.5, cursor: not-allowed, pointer-events: none |
| Loading | background: #FFEA9E, opacity: 0.7, cursor: wait; text replaced with spinner (16px) + "Logging in..." |

**Media file**: `I662:14426;186:1766` — Google icon SVG

---

### Error Message (not in Figma — runtime-only state)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | N/A (dynamic element) | - |
| position | Below login button | `margin-top: 12px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 500 | `font-weight: 500` |
| line-height | 20px | `line-height: 20px` |
| color | #EF4444 | `color: #EF4444` |
| max-width | 305px | `max-width: 305px` (same as button width) |

---

### D_Footer — Copyright Footer

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `662:14447` | - |
| width | 1440px | `width: 100%` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid #2E3940` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` (single child appears centered) |

**Copyright Text** (Node: `I662:14447;342:1413`):

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat Alternates | `font-family: 'Montserrat Alternates', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| color | #FFFFFF | `color: white` |
| text-align | center | `text-align: center` |

**Content**: "Bản quyền thuộc về Sun* © 2025"

---

### Background Layers

#### C_Keyvisual — Background Image

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `662:14388` / `662:14389` | - |
| width | 1441px | `width: 100%; object-fit: cover` |
| height | 1022px | `height: 100%` |
| position | absolute | `position: absolute; inset: 0` |
| z-index | 1 | `z-index: 0` |

#### Left Gradient Overlay

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `662:14392` | - |
| background | linear-gradient(90deg, #00101A 0%, #00101A 25.41%, transparent 100%) | same |
| position | absolute | `position: absolute; inset: 0` |

#### Bottom Gradient Overlay

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `662:14390` | - |
| background | linear-gradient(0deg, #00101A 22.48%, rgba(0,19,32,0) 51.74%) | same |
| position | absolute | `position: absolute; inset: 0` |

---

## Component Hierarchy with Styles

```
Login Page (1440x1024, bg: #00101A, position: relative, overflow: hidden)
├── C_Keyvisual (absolute, inset: 0, z-index: 0)
│   └── Background Image (object-fit: cover, 100% x 100%)
├── Left Gradient (absolute, inset: 0, z-index: 1)
│   └── linear-gradient(90deg, #00101A 0%, #00101A 25.41%, transparent)
├── Bottom Gradient (absolute, inset: 0, z-index: 2)
│   └── linear-gradient(0deg, #00101A 22.48%, transparent 51.74%)
│
├── A_Header (relative, z-index: 10, flex, justify-between, items-center)
│   │  h: 80px, px: 144, py: 12, bg: rgba(11,15,18,0.8)
│   ├── A.1_Logo (52x48px, image)
│   └── A.2_Language (flex, items-center, gap: 2px, p: 16, radius: 4px)
│       ├── VN Flag Icon (24x24, SVG)
│       ├── "VN" (Montserrat 16/24 bold, white)
│       └── Chevron Down (24x24, SVG)
│
├── B_Bìa (relative, z-index: 5, flex-col, px: 144, py: 96)
│   ├── B.1_Key Visual (451x200, image — ROOT FURTHER logo)
│   │         ↕ gap: 80px
│   └── Frame 550 (flex-col, gap: 24px, pl: 16px)
│       ├── B.2_Content (480x80, Montserrat 20/40 bold, white)
│       │   "Bắt đầu hành trình của bạn cùng SAA 2025."
│       │   "Đăng nhập để khám phá!"
│       └── B.3_Login Button (305x60, bg: #FFEA9E, radius: 8, px: 24, py: 16)
│           ├── "LOGIN With Google" (Montserrat 22/28 bold, #00101A)
│           └── Google Icon (24x24, SVG)
│
└── D_Footer (relative, z-index: 5, flex, items-center, justify-between)
    │  px: 90, py: 40, border-top: 1px solid #2E3940
    └── "Bản quyền thuộc về Sun* © 2025"
        (Montserrat Alternates 16/24 bold, white)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | infinity |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| A_Header | padding: 12px 24px; height: auto |
| A.1_Logo | width: 40px; height: auto |
| B_Bìa | padding: 48px 24px |
| B.1_Key Visual | width: 280px; height: auto |
| B.2_Content | font-size: 16px; line-height: 28px; max-width: 100% |
| B.3_Login Button | width: 100%; max-width: 305px |
| D_Footer | padding: 24px; font-size: 14px |
| Gap (B.1 → content) | 40px |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| A_Header | padding: 12px 48px |
| B_Bìa | padding: 64px 48px |
| B.1_Key Visual | width: 360px; height: auto |
| Gap (B.1 → content) | 60px |
| D_Footer | padding: 32px 48px |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| All | Use Figma values as-is (designed at 1440px) |
| Container | max-width: 1440px; margin: 0 auto |

---

## Icon Specifications

| Icon Name | Node ID | Size | Format | Usage |
|-----------|---------|------|--------|-------|
| Logo (SAA) | I662:14391;178:1033;178:1030 | 52x48 | PNG | Header logo |
| VN Flag | I662:14391;186:1696;186:1821;186:1709 | 24x24 | SVG | Language selector flag |
| Chevron Down | I662:14391;186:1696;186:1821;186:1441 | 24x24 | SVG | Language selector arrow |
| ROOT FURTHER | 2939:9548 | 451x200 | PNG | Hero key visual |
| Google | I662:14426;186:1766 | 24x24 | SVG | Login button icon |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Login Button | background-color, box-shadow, transform | 150ms | ease-in-out | Hover/Active |
| Login Button | opacity | 150ms | ease-in-out | Disabled/Loading |
| Language Btn | background-color | 150ms | ease-in-out | Hover |
| Error Message | opacity | 200ms | ease-in | Appear/Disappear |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Page Container | 662:14387 | `relative min-h-screen bg-[#00101A] overflow-hidden` | `<LoginPage>` |
| Background Image | 662:14389 | `absolute inset-0 object-cover w-full h-full` | `<Image>` (next/image) |
| Left Gradient | 662:14392 | `absolute inset-0` + inline gradient | `<div>` |
| Bottom Gradient | 662:14390 | `absolute inset-0` + inline gradient | `<div>` |
| Header | 662:14391 | `relative z-10 flex justify-between items-center h-20 px-36 py-3 bg-[#0B0F12]/80` | `<Header>` |
| Logo | I662:14391;186:2166 | `w-[52px] h-12` | `<Image>` |
| Language Button | I662:14391;186:1601 | `flex items-center gap-0.5 p-4 rounded cursor-pointer` | `<LanguageSelector>` |
| Hero Section | 662:14393 | `relative z-[5] flex flex-col px-36 py-24` | `<section>` |
| Key Visual | 2939:9548 | `w-[451px] h-[200px]` | `<Image>` |
| Hero Text | 662:14753 | `max-w-[480px] pl-4 text-xl font-bold leading-10 text-white tracking-[0.5px] font-montserrat` | `<p>` |
| Login Button | 662:14426 | `flex items-center gap-2 px-6 py-4 bg-[#FFEA9E] rounded-lg cursor-pointer hover:shadow-lg` | `<LoginButton>` |
| Button Text | I662:14426;186:1568 | `text-[22px] font-bold leading-7 text-[#00101A] font-montserrat` | `<span>` |
| Google Icon | I662:14426;186:1766 | `w-6 h-6` | `<Image>` or SVG component |
| Footer | 662:14447 | `relative z-[5] flex items-center justify-between px-[90px] py-10 border-t border-[#2E3940]` | `<Footer>` |
| Footer Text | I662:14447;342:1413 | `text-base font-bold leading-6 text-white font-montserrat-alternates` | `<p>` |
| Error Message | N/A (runtime) | `mt-3 text-sm font-medium text-red-500 max-w-[305px] font-montserrat` | `<p role="alert">` |

---

## Notes

- Fonts: Load **Montserrat** (weight 700) and **Montserrat Alternates** (weight 700) via Google Fonts or `next/font`
- Background image should use `next/image` with `fill` prop and `object-cover` for performance
- Gradient overlays MUST be separate `<div>` layers positioned absolutely to allow content to sit on top
- The Language selector links to the Dropdown language frame (`721:4942`) — implement as a dropdown/popover
- All icons MUST be in Icon Components (SVG inline or React SVG components), not `<img>` tags
- The login button Google icon should be an inline SVG component for crisp rendering at all sizes
