# Design Style: Dropdown Ngôn Ngữ (Language Selector)

**Frame ID**: `721:4942`
**Frame Name**: `Dropdown-ngôn ngữ`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/721:4942
**Extracted At**: 2026-03-23

---

## Design Tokens

### Colors

| Token | Hex Value | Opacity | Usage | Existing CSS Var |
|-------|-----------|---------|-------|------------------|
| --color-dropdown-bg | #00070C | 100% | Dropdown panel background | `var(--color-dropdown-bg)` ✅ |
| --color-dropdown-border | #998C5F | 100% | Dropdown border (gold) | `var(--color-dropdown-border)` ✅ |
| --color-dropdown-selected | rgba(255, 234, 158, 0.2) | 20% | Selected option background | — (new, darker than hover) |
| --color-dropdown-hover | rgba(255, 234, 158, 0.1) | 10% | Hover option background | `var(--color-dropdown-item-hover)` ✅ |
| --color-text-white | #FFFFFF | 100% | Option text | — |

### Typography

| Token | Font Family | Size | Weight | Line Height | Letter Spacing |
|-------|-------------|------|--------|-------------|----------------|
| --text-lang-label | Montserrat | 16px | 700 | 24px | 0.15px |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| --spacing-dropdown-padding | 6px | Dropdown container internal padding |
| --spacing-option-padding | 16px | Option item internal padding |
| --spacing-icon-text-gap | 4px | Gap between flag icon and text |

### Border & Radius

| Token | Value | Usage |
|-------|-------|-------|
| --radius-dropdown | 8px | Dropdown container border-radius |
| --radius-option | 4px | Option item border-radius (on hover/selected) |
| --border-dropdown | 1px solid #998C5F | Dropdown border |

---

## Component Style Details

### Dropdown Container (ID: 525:11713)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 525:11713 | - |
| display | flex column | `display: flex; flex-direction: column` |
| padding | 6px | `padding: 6px` |
| background | #00070C | `background: var(--color-dropdown-bg)` |
| border | 1px solid #998C5F | `border: 1px solid var(--color-dropdown-border)` |
| border-radius | 8px | `border-radius: 8px` |
| position | absolute | Below trigger, aligned right |
| z-index | 20 | Above page content |
| width | auto (fit-content) | Hugs children |

---

### Option Item — Tiếng Việt / Selected (ID: I525:11713;362:6085)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I525:11713;362:6085 | - |
| width | 110px | `width: 110px` (standardized) |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| background | rgba(255, 234, 158, 0.2) | **Selected state** — `background: rgba(255, 234, 158, 0.2)` |
| border-radius | 4px | `border-radius: 4px` |
| display | flex row | `display: flex; align-items: center; gap: 4px` |
| cursor | pointer | `cursor: pointer` |

**Children (left-aligned):**
- Flag icon: 24x24px container → 20x15px flag image (Vietnam flag)
- Text "VN": Montserrat 16px Bold, white, letter-spacing 0.15px

---

### Option Item — Tiếng Anh / Unselected (ID: I525:11713;362:6128)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I525:11713;362:6128 | - |
| width | 110px | `width: 110px` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| background | transparent | **Unselected state** — `background: transparent` |
| border-radius | 4px | `border-radius: 4px` |
| display | flex row | `display: flex; align-items: center; gap: 4px` |
| cursor | pointer | `cursor: pointer` |

**Children (left-aligned):**
- Flag icon: 24x24px container → 20x15px flag image (UK/GB flag)
- Text "EN": Montserrat 16px Bold, white, letter-spacing 0.15px

**States:**
| State | Changes |
|-------|---------|
| Default (unselected) | background: transparent |
| Hover | background: rgba(255, 234, 158, 0.1) |
| Selected | background: rgba(255, 234, 158, 0.2) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Trigger Button (in Header — existing LanguageSelector)

| Property | Value | CSS |
|----------|-------|-----|
| display | flex row | `display: flex; align-items: center; gap: 2px` |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| cursor | pointer | `cursor: pointer` |

**Children:**
- Flag icon: 24x24px (VnFlagIcon or EnFlagIcon based on selection)
- Text: Montserrat 16px Bold, white, "VN" or "EN"
- ChevronDownIcon: 24x24px

**States:**
| State | Changes |
|-------|---------|
| Hover | background: rgba(255, 255, 255, 0.1) |
| Focus | outline: 2px solid rgba(255, 255, 255, 0.5), outline-offset: 2px |
| Open | ChevronDown rotates 180deg (optional) |

---

## Layout Structure (ASCII)

```
┌──────────────── Header ─────────────────────────────────┐
│  ... [Avatar] [🔔] [🇻🇳 VN ▼]  ← Trigger Button       │
│                          │                               │
│                    ┌─────┴────────┐                      │
│                    │ Dropdown     │ ← absolute, z-20     │
│                    │ ┌──────────┐ │                      │
│                    │ │ 🇻🇳 VN   │ │ ← Selected (bg gold) │
│                    │ └──────────┘ │                      │
│                    │ ┌──────────┐ │                      │
│                    │ │ 🇬🇧 EN   │ │ ← Unselected         │
│                    │ └──────────┘ │                      │
│                    └──────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

---

## Icon Specifications

| Icon Name | Size | Color | Component |
|-----------|------|-------|-----------|
| VnFlagIcon | 24x24px (flag 20x15) | Natural colors | `<VnFlagIcon />` ✅ exists |
| EnFlagIcon | 24x24px (flag 20x15) | Natural colors | `<EnFlagIcon />` — **needs creation** (UK Union Jack) |
| ChevronDownIcon | 24x24px | white | `<ChevronDownIcon />` ✅ exists |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Trigger Button | (in Header) | `flex items-center gap-0.5 p-4 rounded cursor-pointer` | `<LanguageSelector />` (update existing) |
| Dropdown Panel | 525:11713 | `absolute right-0 top-full mt-1 flex flex-col p-1.5 bg-[var(--color-dropdown-bg)] border border-[var(--color-dropdown-border)] rounded-lg z-20` | Part of `<LanguageSelector />` |
| Option VN | I525:11713;362:6085 | `flex items-center gap-1 px-4 py-4 rounded cursor-pointer` | `<LanguageOption />` or inline |
| Option EN | I525:11713;362:6128 | Same as VN | `<LanguageOption />` or inline |
| VN Flag | flag component | `w-6 h-6` | `<VnFlagIcon />` |
| EN Flag | flag component | `w-6 h-6` | `<EnFlagIcon />` (new) |

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Behavior |
|------|-----------|----------|
| Mobile | 320px | Dropdown unchanged — same position and size |
| Tablet | 768px | Same |
| Desktop | 1024px | Same |

> Dropdown ngôn ngữ không thay đổi layout theo responsive — kích thước cố định trên mọi breakpoint.

---

## Notes

- Component hiện tại (`LanguageSelector.tsx`) chỉ là trigger button — cần thêm dropdown panel
- Follow pattern của `ProfileDropdown.tsx` cho click-outside detection và keyboard navigation
- Flag icons sử dụng SVG component giống `VnFlagIcon` — cần tạo `EnFlagIcon` mới
- Dropdown position: `absolute right-0 top-full mt-1` (dưới trigger, aligned right)
