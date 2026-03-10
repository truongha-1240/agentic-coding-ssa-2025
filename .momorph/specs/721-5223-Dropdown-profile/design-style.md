# Design Style: Dropdown Profile

**Frame ID**: `721:5223`
**Frame Name**: `Dropdown-profile`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/721:5223
**Extracted At**: 2026-03-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-dropdown-bg | #00070C | 100% | Dropdown container background |
| --color-dropdown-border | #998C5F | 100% | Dropdown container border (gold) |
| --color-profile-bg | #FFEA9E | 10% | Profile item background (active state) |
| --color-text-white | #FFFFFF | 100% | Menu item text |
| --color-text-glow | #FAE287 | 100% | Profile text glow effect |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-menu-item | Montserrat | 16px | 700 | 24px (150%) | 0.15px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-dropdown-padding | 6px | Dropdown container inner padding |
| --spacing-item-padding | 16px | Menu item inner padding |
| --spacing-item-icon-gap | 4px | Gap between text and icon |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-dropdown | 8px | Dropdown container |
| --radius-item | 4px | Menu item |
| --border-dropdown | 1px solid #998C5F | Dropdown container border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-text-glow | 0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #FAE287 | Profile text glow |

---

## Layout Specifications

### Container (Dropdown)

| Property | Value | Notes |
|----------|-------|-------|
| width | auto (hug content) | Fits content width |
| padding | 6px | All sides |
| border | 1px solid #998C5F | Gold border |
| border-radius | 8px | Rounded corners |
| background | #00070C | Dark background |
| display | flex | Flex container |
| flex-direction | column | Vertical stack |

### Layout Structure (ASCII)

```
┌─────────────────────────────────────────┐
│  Dropdown Container (p: 6px, r: 8px)    │
│  border: 1px solid #998C5F              │
│  bg: #00070C                            │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  Profile Item (p: 16px, r: 4px)  │  │
│  │  bg: rgba(255,234,158, 0.1)      │  │
│  │  ┌──────────┐  ┌──────┐         │  │
│  │  │ "Profile"│  │ Icon │ 24x24   │  │
│  │  │ 16px/700 │  │ user │         │  │
│  │  └──────────┘  └──────┘         │  │
│  │  gap: 4px                        │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  Logout Item (p: 16px, r: 4px)   │  │
│  │  bg: transparent                  │  │
│  │  ┌──────────┐  ┌──────┐         │  │
│  │  │ "Logout" │  │ Icon │ 24x24   │  │
│  │  │ 16px/700 │  │ chevr│         │  │
│  │  └──────────┘  └──────┘         │  │
│  │  gap: 4px                        │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

---

## Component Style Details

### Dropdown Container - `A_Dropdown-List`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `666:9601` | - |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| padding | 6px | `padding: 6px` |
| background | #00070C | `background-color: #00070C` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| position | absolute | `position: absolute` (positioned relative to trigger) |

---

### Profile Menu Item - `A.1_Profile`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I666:9601;563:7844` | - |
| width | 119px | `width: auto` (hug) |
| height | 56px | `height: 56px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| background | rgba(255, 234, 158, 0.1) | `background-color: rgba(255, 234, 158, 0.1)` |
| gap | 4px | `gap: 4px` |
| cursor | pointer | `cursor: pointer` |

**Text Style:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | `text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` |
| text-align | center | `text-align: center` |

**Icon (User):**

| Property | Value |
|----------|-------|
| Node ID | `I666:9601;563:7844;186:1498` |
| Component ID | `186:1611` (from set `178:1020`) |
| Size | 24x24px |
| Position | Right of text |

**States:**

| State | Changes |
|-------|---------|
| Default | bg: transparent, text color: #FFFFFF |
| Hover | bg: rgba(255, 234, 158, 0.1), text-shadow glow |
| Active/Selected | bg: rgba(255, 234, 158, 0.1), text-shadow glow (as shown in design) |
| Focus | outline: 2px solid #998C5F, outline-offset: 2px |

---

### Logout Menu Item - `A.2_Logout`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I666:9601;563:7868` | - |
| width | 121px | `width: auto` (hug) |
| height | 56px | `height: 56px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| background | transparent | `background-color: transparent` |
| gap | 4px | `gap: 4px` |
| cursor | pointer | `cursor: pointer` |

**Text Style:**

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | center | `text-align: center` |

**Icon (Chevron Right):**

| Property | Value |
|----------|-------|
| Node ID | `I666:9601;563:7868;186:1441` |
| Component ID | `335:10890` (from set `178:1020`) |
| Size | 24x24px |
| Position | Right of text |

**States:**

| State | Changes |
|-------|---------|
| Default | bg: transparent, text color: #FFFFFF |
| Hover | bg: rgba(255, 234, 158, 0.1), text-shadow glow |
| Active | bg: rgba(255, 234, 158, 0.1) |
| Focus | outline: 2px solid #998C5F, outline-offset: 2px |

---

## Component Hierarchy with Styles

```
Dropdown-profile (frame, bg: #696969 - design canvas only)
└── A_Dropdown-List (flex col, p: 6px, bg: #00070C, border: 1px solid #998C5F, r: 8px)
    ├── A.1_Profile (flex row, p: 16px, r: 4px, bg: rgba(255,234,158,0.1), gap: 4px)
    │   ├── Frame 486 (flex row, gap: 4px, items-center)
    │   │   └── "Profile" (Montserrat 16px/700, #FFF, text-shadow glow)
    │   └── IC - User Icon (24x24, component: 186:1611)
    │
    └── A.2_Logout (flex row, p: 16px, r: 4px, bg: transparent, gap: 4px)
        ├── Frame 485 (flex row, gap: 4px, items-center)
        │   └── "Logout" (Montserrat 16px/700, #FFF)
        └── IC - Chevron Right Icon (24x24, component: 335:10890)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | - |

### Responsive Changes

The dropdown is a floating overlay, so its internal layout remains consistent across breakpoints. Positioning changes:

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Dropdown | May need full-width or adjusted position to fit viewport |

#### Tablet & Desktop (>= 768px)

| Component | Changes |
|-----------|---------|
| Dropdown | Positioned relative to avatar/trigger button (top-right area) |

---

## Icon Specifications

| Icon Name | Size | Color | Usage | Component Set |
|-----------|------|-------|-------|---------------|
| User (Profile) | 24x24 | #FFFFFF (fill), inherits glow from parent text-shadow context | Profile menu item icon | `178:1020` |
| Chevron Right | 24x24 | #FFFFFF (fill) | Logout menu item icon | `178:1020` |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Dropdown | opacity, transform | 150ms | ease-out | Toggle open/close |
| Menu Item | background-color | 150ms | ease-in-out | Hover |
| Menu Item Text | text-shadow | 150ms | ease-in-out | Hover (glow effect) |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Dropdown Container | `666:9601` | `flex flex-col p-1.5 bg-[#00070C] border border-[#998C5F] rounded-lg` | `<ProfileDropdown />` |
| Profile Item | `I666:9601;563:7844` | `flex items-center gap-1 p-4 rounded-sm hover:bg-[rgba(255,234,158,0.1)]` | Inline `<button>` within `<ProfileDropdown />` |
| Logout Item | `I666:9601;563:7868` | `flex items-center gap-1 p-4 rounded-sm hover:bg-[rgba(255,234,158,0.1)]` | Inline `<button>` within `<ProfileDropdown />` |
| Profile Text | `I666:9601;563:7844;186:1497` | `text-base font-bold text-white tracking-[0.15px]` | Text within item |
| Logout Text | `I666:9601;563:7868;186:1439` | `text-base font-bold text-white tracking-[0.15px]` | Text within item |

---

## Notes

- All colors use CSS variables defined in `globals.css` where applicable
- Icons MUST be implemented as React Icon Components (per constitution)
- Font Montserrat is already loaded in the project via `next/font/google`
- The glow text-shadow effect on Profile item indicates active/hover state
- The dropdown background (#00070C) matches the project's dark theme
- Border color #998C5F is a gold accent consistent with the SAA 2025 brand
- **Profile Trigger** (avatar/button that opens this dropdown) is NOT part of this frame — its visual specs must come from the Header/authenticated layout frame. This spec covers only the dropdown panel itself.
- A dropdown elevation shadow (e.g. `0 4px 16px rgba(0,0,0,0.4)`) is NOT present in Figma but may be needed for usability on lighter backgrounds — confirm with design team or add as a subtle enhancement
