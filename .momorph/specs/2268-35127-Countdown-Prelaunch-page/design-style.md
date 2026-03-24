# Design Style: Countdown - Prelaunch Page

**Frame ID**: `2268:35127`
**Frame Name**: `Countdown - Prelaunch page`
**Extracted At**: 2026-03-23

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background |
| --color-text-white | #FFFFFF | 100% | Title text, digit text, labels |
| --color-gold-border | #FFEA9E | 100% | Digit card border |
| --color-card-bg-start | #FFFFFF | 100% | Gradient start (top of digit card) |
| --color-card-bg-end | rgba(255,255,255,0.10) | 10% | Gradient end (bottom of digit card) |

### Typography

| Element | Font Family | Size | Weight | Line Height | Letter Spacing | Color |
|---------|-------------|------|--------|-------------|----------------|-------|
| Title ("Sự kiện sẽ bắt đầu sau") | Montserrat | 36px | 700 | 48px | 0px | #FFFFFF |
| Digit number | Digital Numbers | 73.73px | 400 | auto | 0% | #FFFFFF |
| Unit label (DAYS/HOURS/MINUTES) | Montserrat | 36px | 700 | 48px | 0px | #FFFFFF |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| --countdown-section-padding | 96px 144px | Bìa container padding |
| --countdown-gap-groups | 60px | Gap between Days/Hours/Minutes groups |
| --countdown-gap-digits | 21px | Gap between two digit cards within a group |
| --countdown-gap-digit-label | 21px | Gap between digit pair and label |
| --countdown-title-to-timer | 24px | Gap between title text and timer row |

---

## Component Style Details

### Page Container (2268:35127)
- **Dimensions**: 1512×1077px (full viewport)
- **Background**: `#00101A`
- **Background Image**: KV image (same as homepage), covers full viewport
- **Gradient Overlay**: `linear-gradient(18deg, #00101A 15.48%, rgba(0, 18, 29, 0.46) 52.13%, rgba(0, 19, 32, 0) 63.41%)`

### Content Area (2268:35131 "Bìa")
- **Layout**: Flex, column, center/center
- **Padding**: 96px 144px
- **Gap**: 120px (internal sections)
- **Position**: Centered over background

### Countdown Container (2268:35136 "Countdown time")
- **Layout**: Flex, column, center
- **Gap**: 24px (title → timer row)

### Timer Row (2268:35138 "Time")
- **Layout**: Flex, row, center
- **Gap**: 60px between groups
- **Width**: 644px (hug content)

### Digit Group (2268:35139 "1_Days" / 2268:35144 "2_Hours" / 2268:35149 "3_Minutes")
- **Layout**: Flex, column, center
- **Width**: 175px
- **Height**: 192px
- **Gap**: 21px (digits → label)

### Digit Card (Instance of component `186:2619`)
- **Width**: 77px (76.8px actual)
- **Height**: 123px (122.88px actual)
- **Border**: 0.75px solid `#FFEA9E`
- **Border Radius**: 12px
- **Background**: `linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%)`
- **Opacity**: 0.5
- **Backdrop Filter**: `blur(24.96px)`
- **Digit Text**: "Digital Numbers" font, 73.73px, white, centered

### Unit Label (TEXT)
- **Font**: Montserrat 36px Bold
- **Color**: White (#FFFFFF)
- **Alignment**: Left (within group, visually centered)

---

## Layout Structure (ASCII)

```
┌─────────────────────────────────── 1512×1077 (viewport) ───────────────────────────────────┐
│ BG Image (full cover) + Gradient Overlay                                                    │
│                                                                                             │
│                    ┌─────────────── Bìa (centered, py=96 px=144) ───────────────┐          │
│                    │                                                              │          │
│                    │   "Sự kiện sẽ bắt đầu sau" (Montserrat 36px Bold, white)    │          │
│                    │                    ↕ 24px                                    │          │
│                    │   ┌──── Time Row (gap=60px) ────────────────────────┐       │          │
│                    │   │                                                  │       │          │
│                    │   │  ┌─ Days ──┐    ┌─ Hours ─┐    ┌─ Minutes ┐   │       │          │
│                    │   │  │ [0][0]  │    │ [0][5]  │    │ [2][0]   │   │       │          │
│                    │   │  │  77×123 │    │  77×123 │    │  77×123  │   │       │          │
│                    │   │  │ gap=21  │    │ gap=21  │    │ gap=21   │   │       │          │
│                    │   │  │  DAYS   │    │ HOURS   │    │ MINUTES  │   │       │          │
│                    │   │  └─────────┘    └─────────┘    └──────────┘   │       │          │
│                    │   └──────────────────────────────────────────────────┘       │          │
│                    └──────────────────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Mapping

| Figma Node | CSS/Tailwind | React Component |
|------------|-------------|-----------------|
| `2268:35127` Page | `relative w-full h-screen bg-[#00101A]` | `CountdownPage` |
| `2268:35129` BG Image | `absolute inset-0 object-cover` | `<Image>` |
| `2268:35130` Gradient | `absolute inset-0` + inline gradient | `<div>` |
| `2268:35131` Bìa | `relative z-10 flex flex-col items-center justify-center h-full` | content wrapper |
| `2268:35137` Title | `text-[36px] font-bold text-white text-center` Montserrat | `<h1>` |
| `2268:35138` Time Row | `flex items-center gap-[60px]` | `CountdownTimer` |
| `2268:35139` Days Group | `flex flex-col items-center gap-[21px]` | `DigitGroup` |
| `186:2619` Digit Card | `w-[77px] h-[123px] rounded-xl border border-[#FFEA9E]/50 backdrop-blur-[25px]` | `DigitCard` |
| Digit Text | `font-['Digital_Numbers'] text-[74px] text-white` | `<span>` |
| Label Text | `text-[36px] font-bold text-white` Montserrat | `<span>` |

---

## Responsive Breakpoints

| Breakpoint | Digit Card Size | Font Size (digit) | Group Gap | Label Size |
|------------|----------------|-------------------|-----------|------------|
| Desktop ≥1024px | 77×123px | 74px | 60px | 36px |
| Tablet 768-1023px | 60×96px | 56px | 40px | 28px |
| Mobile <768px | 50×80px | 44px | 24px | 20px |

---

## States

### Digit Card
| State | Property | Value |
|-------|----------|-------|
| Default | opacity | 0.5 |
| Default | border | 0.75px solid #FFEA9E |
| Default | background | linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%) |
| Default | backdrop-filter | blur(24.96px) |

### Page (countdown expired)
| State | Behavior |
|-------|----------|
| Expired | All digits show "00", redirect after 3s |
