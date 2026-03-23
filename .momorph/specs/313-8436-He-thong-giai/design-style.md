# Design Style: Hệ thống giải (Awards Information)

**Frame ID**: `313:8436`
**Frame Name**: `Hệ thống giải`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/313:8436
**Extracted At**: 2026-03-11

---

## Design Tokens

### Colors

| Token Name | Hex/RGBA Value | Opacity | Usage |
|------------|----------------|---------|-------|
| --color-bg-primary | #00101A / rgba(0, 16, 26, 1) | 100% | Page background |
| --color-header-bg | rgba(16, 20, 23, 0.8) | 80% | Header background |
| --color-text-primary | #FFEA9E / rgba(255, 234, 158, 1) | 100% | Primary accent text (headings, active nav, award titles, labels) |
| --color-text-white | #FFFFFF / rgba(255, 255, 255, 1) | 100% | Body text, descriptions, values, nav links |
| --color-text-secondary | var(--Details-Text-Secondary-1, #FFF) | 100% | Secondary/content text |
| --color-text-or | #2E3940 / rgba(46, 57, 64, 1) | 100% | "Hoặc" divider text |
| --color-border-separator | #2E3940 / rgba(46, 57, 64, 1) | 100% | Section separators, dividers between award cards |
| --color-btn-primary | #FFEA9E / rgba(255, 234, 158, 1) | 100% | Kudos CTA button background |
| --color-btn-primary-text | #00101A / rgba(0, 16, 26, 1) | 100% | Kudos CTA button text |
| --color-btn-secondary-bg | rgba(255, 234, 158, 0.1) | 10% | Secondary button / hover background |
| --color-notification-dot | rgba(212, 39, 29, 1) | 100% | Notification badge / decorative red |
| --color-kudos-brand | #DBD1C1 / rgba(219, 209, 193, 1) | 100% | "KUDOS" branding text color |
| --color-kudos-card-bg | #0F0F0F | 100% | Kudos card background (with image overlay) |
| --color-gradient-overlay | linear-gradient(0deg, #00101A -4.23%, rgba(0, 19, 32, 0) 52.79%) | - | Gradient overlay on keyvisual |
| --color-nav-active-border | var(--Details-Text-Primary-1, #FFEA9E) | 100% | Active nav link bottom border |
| --color-text-glow | 0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #FAE287 | - | Active nav text shadow glow |
| --color-award-img-shadow | 0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #FAE287 | - | Award image box-shadow |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-section-subtitle | Montserrat | 24px | 700 | 32px | 0px |
| --text-section-title | Montserrat | 57px | 700 | 64px | -0.25px |
| --text-award-title | Montserrat | 24px | 700 | 32px | 0px |
| --text-award-desc | Montserrat | 16px | 700 | 24px | 0.5px |
| --text-prize-value | Montserrat | 36px | 700 | 44px | 0px |
| --text-quantity-number | Montserrat | 36px | 700 | 44px | 0px |
| --text-label | Montserrat | 24px | 700 | 32px | 0px |
| --text-small | Montserrat | 14px | 700 | 20px | 0.1px |
| --text-nav | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-sidebar-nav | Montserrat | 14px | 700 | 20px | 0.25px |
| --text-sidebar-nav-active | Montserrat | 14px | 700 | 20px | 0.25px |
| --text-kudos-brand | SVN-Gotham | 96.16px | 400 | 24px | -13% |
| --text-kudos-title | Montserrat | 57px | 700 | 64px | -0.25px |
| --text-kudos-subtitle | Montserrat | 24px | 700 | 32px | 0px |
| --text-kudos-body | Montserrat | 16px | 700 | 24px | 0.5px |
| --text-footer-copyright | Montserrat Alternates | 16px | 700 | 24px | 0% |
| --text-footer-nav | Montserrat | 16px | 700 | 24px | 0px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Page horizontal padding (desktop) |
| --spacing-page-y | 96px | Page vertical padding (desktop) |
| --spacing-header-x | 144px | Header horizontal padding |
| --spacing-header-y | 12px | Header vertical padding |
| --spacing-header-gap | 238px | Gap between header left/right groups |
| --spacing-bia-gap | 120px | Gap between major sections inside "Bia" container |
| --spacing-section-title-gap | 16px | Gap within section title area (subtitle -> separator -> title) |
| --spacing-awards-layout-gap | 80px | Gap between sidebar and awards list (flex row, space-between) |
| --spacing-award-cards-gap | 80px | Vertical gap between award cards |
| --spacing-award-card-inner-gap | 40px | Gap between image and content within award card (flex row) |
| --spacing-award-content-gap | 32px | Gap between content sections within award card |
| --spacing-award-detail-gap | 24px | Gap within content sub-sections |
| --spacing-award-label-gap | 16px | Gap between icon and label in award info rows |
| --spacing-sidebar-gap | 16px | Gap between sidebar nav items |
| --spacing-sidebar-padding | 16px | Padding inside sidebar nav items |
| --spacing-kudos-content-gap | 32px | Gap between Kudos content sections |
| --spacing-kudos-inner-gap | 16px | Gap within Kudos text frame |
| --spacing-btn-padding | 16px | CTA button internal padding |
| --spacing-footer | 40px 90px | Footer padding |
| --spacing-footer-left-gap | 80px | Gap between footer logo and nav links |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-award-content | 16px | Award card content area, Kudos card |
| --radius-sidebar-nav | 4px | Sidebar nav items (inactive), header nav links |
| --radius-btn-cta | 4px | Kudos "Chi tiết" CTA button |
| --radius-pill | 100px | Widget button (pill shape) |
| --border-separator | 1px solid #2E3940 | Horizontal dividers between award sections |
| --border-nav-active | 1px solid var(--Details-Text-Primary-1, #FFEA9E) | Active nav link bottom border |
| --border-footer | 1px solid var(--Details-Divider, #2E3940) | Footer top divider |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-text-glow | 0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #FAE287 | Active nav text glow effect |
| --shadow-award-img | 0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #FAE287 | Award image box-shadow (mix-blend-mode: screen) |
| --shadow-btn-hover | 0 4px 12px rgba(255, 234, 158, 0.3) | Button hover shadow |

---

## Layout Specifications

### Page Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px | Design frame width |
| height | 6410px | Full page height |
| background | #00101A | Dark background |
| position | relative | Contains absolute-positioned background layers |

### 3_Keyvisual Background (Node 313:8437)

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px (100%) | Full page width |
| height | 547px | Fixed height background image |
| position | absolute | Behind content, z-index: 1 |
| **NOTE** | Background image layer, NOT a content container. Use as absolute positioned background with `object-fit: cover`. |

### Gradient Overlay "Cover" (Node 313:8439)

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px (100%) | Full page width |
| height | 627px | Covers keyvisual area |
| position | absolute | z-index: 1 |
| background | linear-gradient(0deg, #00101A -4.23%, rgba(0, 19, 32, 0) 52.79%) | Bottom-to-top gradient overlay |

### Content Container "Bia" (Node 313:8449)

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Vertical stack |
| flex-direction | column | Top to bottom |
| gap | **120px** | Between ALL major sections |
| padding | **96px 144px** | top/bottom: 96px, left/right: 144px |
| align-items | flex-start | Left-aligned children |
| width | 1440px | Full frame width |
| height | 6164px | Content-driven |
| effective-content-width | 1152px | 1440 - 2*144 |
| z-index | 1 | Above background layers |
| **children** | KV (logo) -> A_Title -> B_Awards layout -> D1_Sunkudos | All major content sections |

### Layout Structure (ASCII)

```
+-------------------------------------------------------------------------+
|  Page (bg: #00101A, w: 1440px, h: 6410px)                              |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  |  3_Keyvisual BG (1440x547, absolute, z:1)                        |  |
|  |  Cover/Gradient (1440x627, absolute, z:1)                        |  |
|  +-------------------------------------------------------------------+  |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  |  Header (h:80px, px:144px, bg:rgba(16,20,23,0.8), absolute, z:1) |  |
|  |  [Logo+Nav]---gap:238px---[Lang|Notif|Profile]                    |  |
|  +-------------------------------------------------------------------+  |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  |  "Bia" (p:96px 144px, flex-col, gap:120px, z:1)                  |  |
|  |                                                                    |  |
|  |  +--------------------------------------------------------------+ |  |
|  |  |  KV -- Root Further Logo (1152x150, flex-col, gap:40px)      | |  |
|  |  |  +- MM_MEDIA_Root Further Logo (338x150, image)              | |  |
|  |  +--------------------------------------------------------------+ |  |
|  |                        gap: 120px                                  |  |
|  |  +--------------------------------------------------------------+ |  |
|  |  |  A_Title (1152x129, flex-col, gap:16px)                      | |  |
|  |  |  +- "Sun* Annual Awards 2025" (24px/700, white, center)      | |  |
|  |  |  +- Separator line (1152x1px, #2E3940)                       | |  |
|  |  |  +- "Hệ thống giải thưởng SAA 2025" (57px/700, gold)         | |  |
|  |  +--------------------------------------------------------------+ |  |
|  |                        gap: 120px                                  |  |
|  |  +--------------------------------------------------------------+ |  |
|  |  |  B_Awards Layout (1152x4833, flex-row, space-between,        | |  |
|  |  |                    gap:80px)                                   | |  |
|  |  |                                                                | |  |
|  |  |  +----------+  +------------------------------------------+   | |  |
|  |  |  | C_Menu   |  | D.Awards List (853x4833, flex-col,       |   | |  |
|  |  |  | (178px)  |  |               gap:80px)                   |   | |  |
|  |  |  | sticky   |  |                                          |   | |  |
|  |  |  |          |  | +--------------------------------------+ |   | |  |
|  |  |  | Top      |  | | D.1_Top Talent (856x631)             | |   | |  |
|  |  |  | Talent*  |  | | [Image 336x336] [Content ~480px]     | |   | |  |
|  |  |  | Top      |  | | ------------------------------------ | |   | |  |
|  |  |  | Project  |  | +--------------------------------------+ |   | |  |
|  |  |  | Top PL   |  |             gap: 80px                     |   | |  |
|  |  |  | Best Mgr |  | +--------------------------------------+ |   | |  |
|  |  |  | Sig 2025 |  | | D.2_Top Project (856x679)            | |   | |  |
|  |  |  | MVP      |  | | [Content] [Image 336x336]            | |   | |  |
|  |  |  +----------+  | +--------------------------------------+ |   | |  |
|  |  |                 |             gap: 80px                     |   | |  |
|  |  |                 | +--------------------------------------+ |   | |  |
|  |  |                 | | D.3 - D.6 (alternating layout)       | |   | |  |
|  |  |                 | +--------------------------------------+ |   | |  |
|  |  |                 +------------------------------------------+   | |  |
|  |  +--------------------------------------------------------------+ |  |
|  |                        gap: 120px                                  |  |
|  |  +--------------------------------------------------------------+ |  |
|  |  |  D1_Sunkudos (1152x500, rounded-16px)                        | |  |
|  |  |  [D2_Content 470px]           [Graphic + KUDOS branding]      | |  |
|  |  +--------------------------------------------------------------+ |  |
|  +-------------------------------------------------------------------+  |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  |  Footer (p:40px 90px, border-top:#2E3940, space-between)          |  |
|  |  [Logo]--gap:80px--[Nav Links]              [Copyright]            |  |
|  +-------------------------------------------------------------------+  |
+---------------------------------------------------------------------------+
```

---

## Component Style Details

### Header (Node 313:8440)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8440 | - |
| width | 100% (1440px) | `width: 100%` |
| height | 80px | `h-20` |
| display | flex | `flex` |
| flex-direction | row | `flex-row` |
| align-items | center | `items-center` |
| justify-content | space-between | `justify-between` |
| padding | 12px 144px | `py-3 px-36` (lg) |
| gap | 238px | `gap-[238px]` |
| background | rgba(16, 20, 23, 0.8) | `bg-[rgba(16,20,23,0.8)]` |
| position | absolute (sticky in impl) | `sticky top-0 z-10` |

#### Header Left Group (Node I313:8440;186:2166 -- "Frame 488")

| Property | Value |
|----------|-------|
| display | flex row |
| gap | 64px |
| width | 643px |
| height | 56px |
| align-items | center |
| children | LOGO (52x48) + Frame 476 (nav links) |

#### Header Nav Link States

| State | Property | Value |
|-------|----------|-------|
| Normal | color | #FFFFFF |
| Normal | font | Montserrat 16px/700, lh: 24px, ls: 0.15px |
| Normal | padding | 16px |
| Normal | border-radius | 4px |
| Active/Selected | color | var(--Details-Text-Primary-1, #FFEA9E) |
| Active/Selected | font-weight | 700 |
| Active/Selected | border-bottom | 1px solid var(--Details-Text-Primary-1, #FFEA9E) |
| Active/Selected | text-shadow | 0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #FAE287 |
| Hover | background | rgba(255, 234, 158, 0.1) |
| Hover | border-radius | 4px |

#### Header Right Group (Node I313:8440;186:1601 -- "Frame 482")

| Property | Value |
|----------|-------|
| display | flex row |
| width | 220px |
| height | 56px |
| children | Language (108x56) + Notification (40x40) + Profile Button (40x40) |

---

### 3_Keyvisual Background Layer (Node 313:8437)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8437 | - |
| width | 1440px (100%) | `w-full` |
| height | 547px | `h-[547px]` |
| position | absolute | `absolute top-0 left-0 z-[1]` |
| content | image 20 (1440x547, background image) | `bg-cover bg-center` |
| **note** | Background image layer only. The gradient overlay (Cover, Node 313:8439) sits on top. |

#### Gradient Overlay (Cover, Node 313:8439)

| Property | Value |
|----------|-------|
| **Node ID** | 313:8439 |
| width | 1440px (100%) |
| height | 627px |
| background | linear-gradient(0deg, #00101A -4.23%, rgba(0, 19, 32, 0.00) 52.79%) |
| position | absolute, z-index: 1 |

---

### KV -- Root Further Logo (Node 313:8450)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8450 | - |
| display | flex column | `flex flex-col` |
| gap | 40px | `gap-10` |
| width | 1152px | `w-full` |
| height | 150px | content-driven |
| align-items | flex-start | `items-start` |

#### Root Further Logo Image (Node 2789:12915)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2789:12915 | - |
| width | 338px | `w-[338px]` |
| height | 150px | `h-[150px]` |
| type | MM_MEDIA_Root Further Logo | Decorative image, use `next/image` with `alt=""` |

---

### A_Title Section (Node 313:8453)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8453 | - |
| display | flex column | `flex flex-col` |
| gap | 16px | `gap-4` |
| width | 1152px | `w-full` |
| height | 129px | content-driven |

#### Subtitle "Sun* Annual Awards 2025" (Node 313:8454)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8454 | - |
| font | Montserrat 24px/700 | `text-2xl font-bold` |
| line-height | 32px | `leading-8` |
| color | #FFFFFF | `text-white` |
| text-align | center | `text-center` |
| width | 1152px | `w-full` |

#### Separator Line (Node 313:8455)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8455 | - |
| width | 1152px | `w-full` |
| height | 1px | `h-px` |
| background | rgba(46, 57, 64, 1) / #2E3940 | `bg-[#2E3940]` |

#### Title Container (Node 313:8456 -- "Frame 488")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8456 | - |
| display | flex row | `flex flex-row` |
| gap | 32px | `gap-8` |
| align-items | center | `items-center` |
| justify-content | center | `justify-center` |
| width | 1152px | `w-full` |

#### Title "Hệ thống giải thưởng SAA 2025" (Node 313:8457)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8457 | - |
| font | Montserrat 57px/700 | `text-[57px] font-bold` |
| line-height | 64px | `leading-[64px]` |
| letter-spacing | -0.25px | `tracking-[-0.25px]` |
| color | #FFEA9E | `text-[var(--color-text-primary)]` |
| text-align | left | `text-left` |

---

### B_Awards Layout (Node 313:8458)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8458 | - |
| display | flex row | `flex flex-row` |
| gap | 80px | `gap-20` |
| width | 1152px | `w-full` |
| height | 4833px | content-driven |
| align-items | flex-start | `items-start` |
| justify-content | space-between | `justify-between` |
| **children** | C_Menu list (178px sidebar) + D.Awards list (853px content) |

---

### C_Menu List -- Sidebar Navigation (Node 313:8459)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8459 | - |
| display | flex column | `flex flex-col` |
| gap | 16px | `gap-4` |
| width | 178px | `w-[178px]` |
| height | 448px | content-driven |
| position | sticky (implementation) | `sticky top-[96px]` |
| **children** | 6 nav items: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025, MVP |

#### Sidebar Nav Item -- Active State (Node 313:8460 -- "C.1_Top talent")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8460 | - |
| display | flex | `flex` |
| gap | 4px | `gap-1` |
| padding | 16px | `p-4` |
| align-items | center | `items-center` |
| border-bottom | 1px solid var(--Details-Text-Primary-1, #FFEA9E) | `border-b border-[#FFEA9E]` |
| font | Montserrat 14px/700, lh: 20px, ls: 0.25px | `text-sm font-bold` |
| color | var(--Details-Text-Primary-1, #FFEA9E) | `text-[#FFEA9E]` |
| text-shadow | 0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #FAE287 | Glow effect on active |
| icon | MM_MEDIA_Target (24x24) before text | Award-specific icon |

#### Sidebar Nav Item -- Normal State (Node 313:8461 -- "C.2_Top project")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8461 | - |
| display | flex | `flex` |
| gap | 4px | `gap-1` |
| width | 146px | content-driven |
| height | 56px | content-driven |
| padding | 16px | `p-4` |
| align-items | center | `items-center` |
| border-radius | 4px | `rounded` |
| font | Montserrat 14px/700, lh: 20px, ls: 0.25px | `text-sm font-bold` |
| color | #FFFFFF | `text-white` |
| icon | MM_MEDIA_Target (24x24) before text | Award-specific icon |

#### Sidebar Nav States

| State | Changes |
|-------|---------|
| Normal | color: white, no border, border-radius: 4px |
| Active | color: #FFEA9E, border-bottom: 1px solid #FFEA9E, text-shadow glow |
| Hover | background: rgba(255, 234, 158, 0.1), border-radius: 4px |

---

### D_Awards List (Node 313:8466)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8466 | - |
| display | flex column | `flex flex-col` |
| gap | 80px | `gap-20` |
| width | 853px | `w-[853px]` |
| height | 4833px | content-driven |
| align-items | flex-start | `items-start` |

---

### Award Card -- Layout A: Image Left (Node 313:8467 -- "D.1_Top talent")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8467 | - |
| display | flex column | `flex flex-col` |
| gap | 80px | `gap-20` |
| width | 856px | `w-full` |
| height | 631px | content-driven |

#### Award Card Inner Frame (Node I313:8467;214:2803 -- "Frame 506")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8467;214:2803 | - |
| display | flex row | `flex flex-row` |
| gap | 40px | `gap-10` |
| width | 856px | `w-full` |
| height | 550px | content-driven |
| align-items | flex-start | `items-start` |
| **note** | Image on left, content on right. Alternating cards (D.2, D.4, D.6) use "Frame 507" with reversed order (content left, image right). |

#### Award Image (Node I313:8467;214:2525 -- "D.1.1_Picture-Award")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8467;214:2525 | - |
| width | 336px | `w-[336px]` |
| height | 336px | `h-[336px]` |
| box-shadow | 0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #FAE287 | `shadow-[0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` |
| mix-blend-mode | screen | `mix-blend-screen` |
| padding | 149.864px 53.455px | Decorative inner padding |
| display | flex | `flex items-center justify-center` |

#### Award Content Area (Node I313:8467;214:2526 -- "D.1.2_Content")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8467;214:2526 | - |
| display | flex column | `flex flex-col` |
| gap | 32px | `gap-8` |
| align-items | flex-start | `items-start` |
| border-radius | 16px | `rounded-2xl` |
| backdrop-filter | blur(32px) | `backdrop-blur-[32px]` |
| **children** | Content top section -> Separator -> Quantity section -> Separator -> Prize section |

#### Award Title Row (Node I313:8467;214:2528 -- "Frame 442")

| Property | Value | CSS |
|----------|-------|-----|
| display | flex row | `flex flex-row` |
| gap | 16px | `gap-4` |
| align-items | center | `items-center` |
| children | Icon (MM_MEDIA_Target, 24x24) + Title text |

#### Award Title Text (Node I313:8467;214:2530)

| Property | Value | CSS |
|----------|-------|-----|
| font | Montserrat 24px/700, lh: 32px | `text-2xl font-bold` |
| color | #FFEA9E | `text-[var(--color-text-primary)]` |

#### Award Description (Node I313:8467;214:2531)

| Property | Value | CSS |
|----------|-------|-----|
| width | 480px | `w-[480px]` |
| font | Montserrat 16px/700, lh: 24px, ls: 0.5px | `text-base font-bold` |
| color | #FFFFFF | `text-white` |
| text-align | justified | `text-justify` |

#### Content Separator (Node I313:8467;214:2532 -- "Rectangle 8")

| Property | Value | CSS |
|----------|-------|-----|
| width | 480px | `w-full` |
| height | 1px | `h-px` |
| background | #2E3940 | `bg-[#2E3940]` |

#### Quantity Section (Node I313:8467;214:2533)

| Property | Value | CSS |
|----------|-------|-----|
| display | flex column | `flex flex-col` |
| gap | 24px | `gap-6` |
| border-radius | 16px | `rounded-2xl` |

##### Quantity Row (Node I313:8467;214:2534 -- "Frame 443")

| Property | Value | CSS |
|----------|-------|-----|
| display | flex row | `flex flex-row` |
| gap | 16px | `gap-4` |
| align-items | center | `items-center` |
| children | Quantity value frame + Diamond icon (24x24) + Label text |

##### Quantity Number (Node I313:8467;214:2538)

| Property | Value |
|----------|-------|
| text | "10" |
| font | Montserrat 36px/700, lh: 44px |
| color | #FFFFFF |

##### Quantity Unit (Node I313:8467;214:3532)

| Property | Value |
|----------|-------|
| text | "Đơn vị" |
| **note** | Text varies per card. See spec.md FR-008 for each card's actual unit value. |
| font | Montserrat 14px/700, lh: 20px, ls: 0.1px |
| color | #FFFFFF |

##### Quantity Label (Node I313:8467;214:2536)

| Property | Value |
|----------|-------|
| text | "Số lượng giải thưởng:" |
| font | Montserrat 24px/700, lh: 32px |
| color | #FFEA9E |

#### Prize Section (Node I313:8467;214:2540 -- "Frame 444")

| Property | Value | CSS |
|----------|-------|-----|
| display | flex column | `flex flex-col` |
| gap | 24px | `gap-6` |
| width | 480px | `w-[480px]` |
| border-radius | 16px | `rounded-2xl` |

##### Prize Label Row (Node I313:8467;214:2542 -- "Frame 497")

| Property | Value |
|----------|-------|
| display | flex row |
| gap | 16px |
| align-items | center |
| children | License icon (24x24) + "Giá trị giải thưởng:" text |

##### Prize Label (Node I313:8467;214:2544)

| Property | Value |
|----------|-------|
| text | "Giá trị giải thưởng:" |
| font | Montserrat 24px/700, lh: 32px |
| color | #FFEA9E |

##### Prize Value (Node I313:8467;214:2546)

| Property | Value |
|----------|-------|
| text | "7.000.000 VNĐ" |
| font | Montserrat 36px/700, lh: 44px |
| color | #FFFFFF |

##### Prize Note (Node I313:8467;214:2547)

| Property | Value |
|----------|-------|
| text | "cho mỗi giải thưởng" |
| font | Montserrat 14px/700, lh: 20px, ls: 0.1px |
| color | #FFFFFF |

#### Card Bottom Separator (Node I313:8467;214:2771 -- "Rectangle 14")

| Property | Value |
|----------|-------|
| width | 853px |
| height | 1px |
| background | #2E3940 |
| **note** | Full-width separator at the bottom of each award card |

---

### Signature 2025 Dual-Prize Layout (Node 313:8471 -- "D.5_Signature 2025")

The Signature 2025 card has a **unique layout** with TWO prize sections separated by an "Hoặc" (Or) divider. This is the only card with this pattern.

#### "Hoặc" Divider Text (Node 313:8499)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8499 | - |
| text | "Hoặc" | - |
| font | Montserrat 14px/700, lh: 20px | `text-sm font-bold` |
| color | #2E3940 | `text-[#2E3940]` |
| width | 38px | auto |
| **note** | Displayed between first prize section (5.000.000 VNĐ cho giải cá nhân) and second prize section (8.000.000 VNĐ cho giải tập thể) |

#### Structure:
```
D.5_Signature 2025
├── Frame 506 (flex-row, gap:40px) — image-left layout
│   ├── Picture-Award (336x336)
│   └── Content (flex-col, gap:32px)
│       ├── Title: "Signature 2025 - Creator"
│       ├── Description
│       ├── Separator (480x1px)
│       ├── Quantity: "01" "Cá nhân hoặc tập thể"
│       ├── Separator (480x1px)
│       ├── Prize 1: "Giá trị giải thưởng:" → "5.000.000 VNĐ" → "cho giải cá nhân"
│       ├── "Hoặc" (14px, #2E3940)
│       └── Prize 2: "Giá trị giải thưởng:" → "8.000.000 VNĐ" → "cho giải tập thể"
└── Rectangle 14 (853x1px separator)
```

---

### Award Card -- Layout B: Image Right (Node 313:8468 -- "D.2_Top Project")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8468 | - |
| display | flex column | `flex flex-col` |
| gap | 80px | `gap-20` |
| width | 856px | `w-full` |
| height | 679px | content-driven |

#### Inner Frame (Node I313:8468;214:2928 -- "Frame 507")

| Property | Value |
|----------|-------|
| display | flex row |
| gap | 40px |
| width | 856px |
| **note** | Content on LEFT, image on RIGHT (reversed from Layout A). Cards alternate: D.1 (img-left), D.2 (img-right), D.3 (img-left), D.4 (img-right), D.5 (img-left), D.6 (img-right). |

---

### D1_Sunkudos Section (Node 335:12023)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 335:12023 | - |
| width | 1152px | `w-full max-w-[1152px]` |
| height | 500px | `h-[500px]` |
| display | flex | `flex` |
| align-items | center | `items-center` |
| justify-content | center | `justify-center` |

#### SunKudos Background Card (Node I335:12023;313:8416)

| Property | Value | CSS |
|----------|-------|-----|
| width | 1152px | `w-full` |
| height | 500px | `h-[500px]` |
| border-radius | 16px | `rounded-2xl` |
| background | url(image) + #0F0F0F | Dark background with image |

#### D2_Content (Node I335:12023;313:8419)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I335:12023;313:8419 | - |
| display | flex column | `flex flex-col` |
| gap | 32px | `gap-8` |
| width | 470px | `w-[470px]` |
| height | 408px | content-driven |
| align-items | flex-start | `items-start` |
| justify-content | center | `justify-center` |

#### "Phong trào ghi nhận" (Node I335:12023;313:8421)

| Property | Value |
|----------|-------|
| font | Montserrat 24px/700, lh: 32px |
| color | #FFFFFF |

#### "Sun* Kudos" Title (Node I335:12023;313:8422)

| Property | Value |
|----------|-------|
| font | Montserrat 57px/700, lh: 64px, ls: -0.25px |
| color | #FFEA9E |

#### Description Text (Node I335:12023;313:8423)

| Property | Value |
|----------|-------|
| width | 457px |
| font | Montserrat 16px/700, lh: 24px, ls: 0.5px |
| color | #FFFFFF |
| text-align | justified |
| content | "ĐIỂM MỚI CỦA SAA 2025 Hoạt động ghi nhận và cảm ơn..." (multi-line paragraph) |

#### CTA Button Frame (Node I335:12023;313:8424 -- "Frame 495")

| Property | Value |
|----------|-------|
| display | flex column |
| gap | 24px |
| width | 470px |
| height | 56px |

#### "Chi tiết" CTA Button (Node I335:12023;313:8426 -- "D2.1_Button-IC")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I335:12023;313:8426 | - |
| width | 127px | `w-[127px]` |
| height | 56px | `h-14` |
| display | flex row | `flex flex-row` |
| gap | 8px | `gap-2` |
| padding | 16px | `p-4` |
| align-items | center | `items-center` |
| background | #FFEA9E | `bg-[var(--color-btn-primary)]` |
| border-radius | 4px | `rounded` |
| font | Montserrat 16px/700 | `text-base font-bold` |
| color | #00101A | `text-[var(--color-btn-primary-text)]` |

**"Chi tiết" CTA Button States:**

| State | Changes |
|-------|---------|
| Normal | background: #FFEA9E, color: #00101A, border-radius: 4px |
| Hover | background: #00101A, color: #FFEA9E, border: 1px solid #FFEA9E, box-shadow: 0 4px 12px rgba(255, 234, 158, 0.3) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| Disabled | opacity: 0.5, cursor: not-allowed |

---

#### "KUDOS" Branding Text (Node I335:12023;329:2949)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I335:12023;329:2949 | - |
| font-family | SVN-Gotham | Custom font |
| font-size | 96.16px | `text-[96px]` |
| font-weight | 400 | `font-normal` |
| line-height | 24px | `leading-6` |
| letter-spacing | -13% | `tracking-[-13%]` |
| color | #DBD1C1 | `text-[#DBD1C1]` |
| **note** | Font file: `SVN-Gotham` must be added to project and loaded via `@font-face` or `next/font/local` |

---

### Footer (Node 354:4323)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 354:4323 | - |
| width | 1440px | `w-full` |
| padding | 40px 90px | `py-10 px-[90px]` |
| border-top | 1px solid var(--Details-Divider, #2E3940) | `border-t border-[#2E3940]` |
| display | flex | `flex` |
| align-items | center | `items-center` |
| justify-content | space-between | `justify-between` |

#### Footer Left Group (Node I354:4323;342:1407 -- "Frame 488")

| Property | Value |
|----------|-------|
| display | flex row |
| gap | 80px |
| width | 971px |
| height | 64px |
| align-items | center |
| children | LOGO (69x64) + Frame 476 (nav links, 4 items) |

#### Footer Copyright (Node I354:4323;342:1413)

| Property | Value |
|----------|-------|
| font | Montserrat Alternates 16px/700, lh: 24px |
| color | #FFFFFF |
| text-align | center |
| text | "Bản quyền thuộc về Sun* (c) 2025" |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A, 1440x6410)
+-- 3_Keyvisual BG (1440x547, absolute, z:1)
|   +-- image 20 (1440x547, background image)
+-- Cover/Gradient (1440x627, absolute, z:1, linear-gradient)
+-- Header (h:80, px:144, bg:rgba(16,20,23,0.8), absolute, z:1)
|   +-- Frame 488 (flex-row, gap:64px)
|   |   +-- LOGO (52x48)
|   |   +-- Frame 476 (nav links, flex-row)
|   |       +-- Button-IC (normal: white, 16px/700, rounded-4)
|   |       +-- Button-IC (active: gold, border-bottom, text-glow)
|   |       +-- Button-IC (normal)
|   +-- Frame 482 (flex-row, 220x56)
|       +-- Language (108x56)
|       +-- Notification (40x40)
|       +-- Profile Button (40x40)
+-- "Bia" Content (p:96px 144px, flex-col, gap:120px, z:1)
|   +-- KV (1152x150, flex-col, gap:40px)
|   |   +-- Frame 482
|   |       +-- MM_MEDIA_Root Further Logo (338x150, image)
|   |
|   +-- A_Title (1152x129, flex-col, gap:16px)
|   |   +-- "Sun* Annual Awards 2025" (24px/700, white, center)
|   |   +-- Rectangle 26 (1152x1px, #2E3940)
|   |   +-- Frame 488 (flex-row, gap:32px, center)
|   |       +-- "Hệ thống giải thưởng SAA 2025" (57px/700, gold)
|   |
|   +-- B_Awards Layout (1152x4833, flex-row, space-between, gap:80px)
|   |   +-- C_Menu List (178px, flex-col, gap:16px, sticky)
|   |   |   +-- C.1_Top Talent (active: gold, border-bottom, glow)
|   |   |   +-- C.2_Top Project (normal: white, rounded-4)
|   |   |   +-- C.3_Top Project Leader (normal)
|   |   |   +-- C.4_Best Manager (normal)
|   |   |   +-- C.5_Signature 2025 (normal)
|   |   |   +-- C.6_MVP (normal)
|   |   |
|   |   +-- D_Awards List (853px, flex-col, gap:80px)
|   |       +-- D.1_Top Talent (856px, Layout A: img-left)
|   |       |   +-- Frame 506 (flex-row, gap:40px)
|   |       |   |   +-- Picture-Award (336x336, shadow, mix-blend-screen)
|   |       |   |   +-- D.1.2_Content (flex-col, gap:32px, rounded-16, blur-32)
|   |       |   |       +-- content (flex-col, gap:24px)
|   |       |   |       |   +-- Title row: icon + "Top Talent" (24px/700, gold)
|   |       |   |       |   +-- Description (16px/700, white, justified)
|   |       |   |       +-- Separator (480x1px, #2E3940)
|   |       |   |       +-- Quantity section (flex-col, gap:24px)
|   |       |   |       |   +-- Row: "10" (36px) + "Đơn vị" + diamond + "Số lượng:" (24px, gold)
|   |       |   |       +-- Separator (480x1px, #2E3940)
|   |       |   |       +-- Prize section (flex-col, gap:24px)
|   |       |   |           +-- Label: license + "Giá trị:" (24px, gold)
|   |       |   |           +-- Value: "7.000.000 VNĐ" (36px, white)
|   |       |   |           +-- Note: "cho mỗi giải thưởng" (14px, white)
|   |       |   +-- Rectangle 14 (853x1px, #2E3940, full-width separator)
|   |       |
|   |       +-- D.2_Top Project (856px, Layout B: img-right)
|   |       +-- D.3_Top Project Leader (856px, Layout A: img-left)
|   |       +-- D.4_Best Manager (856px, Layout B: img-right)
|   |       +-- D.5_Signature 2025 (856px, Layout A: img-left)
|   |       +-- D.6_MVP (856px, Layout B: img-right)
|   |
|   +-- D1_Sunkudos (1152x500, rounded-16px)
|       +-- Rectangle 12 (bg image + #0F0F0F, rounded-16)
|       +-- D2_Content (470x408, flex-col, gap:32px)
|       |   +-- Frame 494 (flex-col, gap:16px)
|       |   |   +-- "Phong trào ghi nhận" (24px/700, white)
|       |   |   +-- "Sun* Kudos" (57px/700, gold)
|       |   |   +-- Description (16px/700, white, justified)
|       |   +-- Frame 495 (flex-col, gap:24px)
|       |       +-- D2.1_Button-IC "Chi tiết" (127x56, bg:gold, text:dark, r:4)
|       +-- Frame 367 (272x219, decorative graphic)
|       +-- Group 380 (374x72)
|           +-- Group (82x65, decorative)
|           +-- "KUDOS" (SVN-Gotham 96px, #DBD1C1)
|
+-- Footer (p:40px 90px, border-top:#2E3940, space-between)
    +-- Frame 488 (flex-row, gap:80px)
    |   +-- LOGO (69x64)
    |   +-- Frame 476 (nav links, 4 items, 16px/700, white)
    +-- "Bản quyền thuộc về Sun*" (Montserrat Alt 16px/700, white)
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
| KV Logo | Scale down to ~200px width |
| Section title | font-size: 32px, line-height: 40px |
| Sidebar (C_Menu) | Hidden or collapsed into horizontal scroll / dropdown |
| Awards layout | Single column (sidebar above content) |
| Award cards | Stack vertically -- image on top, content below (full width) |
| Award content width | 100% (no fixed 480px) |
| Kudos section | Stack vertically, content full width, graphic below |
| Footer | Stack vertically, px: 24px |
| Content padding | px: 24px |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Header | px: 48px, nav links visible |
| Content padding | px: 48px |
| Section title | font-size: 40px |
| Sidebar (C_Menu) | Collapse to horizontal nav or hide |
| Award cards | Single column, image-content side by side at reduced widths |
| Award image | Scale to 250px |
| Kudos section | Reduce padding, graphic may be hidden |
| Footer | px: 48px |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| All | Use full design specs as documented above |
| Awards layout | 2-column (178px sidebar + 853px content), space-between |
| Content width | max: 1152px (1440 - 2*144px padding) |

---

## Icon Specifications

| Icon Name | Size | Color | Usage | Node ID |
|-----------|------|-------|-------|---------|
| SAA Logo | 52x48 (header) / 69x64 (footer) | Original colors | Branding | I313:8440;178:1033, I354:4323;342:1408 |
| MM_MEDIA_Target | 24x24 | currentColor | Award card title icon, sidebar nav icon | I313:8467;214:2529, I313:8460;186:1745 |
| MM_MEDIA_Diamond | 24x24 | currentColor | Quantity section icon | I313:8467;214:2535 |
| MM_MEDIA_License | 24x24 | currentColor | Prize value section icon | I313:8467;214:2543 |
| Notification Bell | 20x20 (in 40x40 btn) | #FFFFFF | Header notification | I313:8440;186:2101 |
| User Profile | 20x20 (in 40x40 btn) | #FFFFFF | Header profile | I313:8440;186:1597 |
| Chevron Down | 16x16 | #FFFFFF | Language selector | In Language instance |
| ArrowUpRight | 16x16 | currentColor | CTA button detail link | In D2.1_Button-IC |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Header Nav Link | background-color, color | 150ms | ease-in-out | Hover |
| Sidebar Nav Item | background-color, color, border | 150ms | ease-in-out | Hover / Click (scroll) |
| Award Card | opacity, transform | 200ms | ease-out | Scroll into view |
| Award Image | box-shadow intensity | 200ms | ease-in-out | Hover |
| Kudos CTA Button | background-color, transform | 150ms | ease-in-out | Hover |
| Sidebar scroll tracking | border-bottom, color, text-shadow | 200ms | ease-in-out | Scroll spy active section change |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS | React Component |
|----------------|---------------|----------------|-----------------|
| Header | 313:8440 | existing `Header.tsx` + extend | `<Header>` (reuse shared) |
| Keyvisual BG | 313:8437 | `absolute top-0 left-0 w-full h-[547px] z-[1] bg-cover bg-center` | Background layer in page |
| Gradient Overlay | 313:8439 | `absolute top-0 left-0 w-full h-[627px] z-[1]` with gradient | Overlay layer in page |
| "Bia" Container | 313:8449 | `relative z-[1] flex flex-col items-start gap-[120px] py-24 px-36` | `<main>` wrapper |
| KV Logo | 313:8450 / 2789:12915 | `w-[338px] h-[150px]` | Image in page header area |
| Section Title Area | 313:8453 | `flex flex-col gap-4 w-full` | `<SectionTitle>` |
| Section Subtitle | 313:8454 | `text-2xl font-bold text-white text-center w-full` | Text in `<SectionTitle>` |
| Section Separator | 313:8455 | `w-full h-px bg-[#2E3940]` | Divider in `<SectionTitle>` |
| Section Main Title | 313:8457 | `text-[57px] font-bold leading-[64px] tracking-[-0.25px] text-[#FFEA9E]` | Text in `<SectionTitle>` |
| Awards Layout | 313:8458 | `flex flex-row justify-between gap-20 w-full` | `<AwardsLayout>` |
| Sidebar Nav | 313:8459 | `w-[178px] flex flex-col gap-4 sticky top-24` | `<AwardsSidebar>` |
| Sidebar Nav Item | 313:8460-8465 | `flex items-center gap-1 p-4 text-sm font-bold rounded` | `<SidebarNavItem>` |
| Awards List | 313:8466 | `flex flex-col gap-20 w-[853px]` | `<AwardsList>` |
| Award Card (Layout A) | 313:8467 | `flex flex-col gap-20 w-full` | `<AwardCard variant="image-left">` |
| Award Card (Layout B) | 313:8468 | `flex flex-col gap-20 w-full` | `<AwardCard variant="image-right">` |
| Award Image | I313:8467;214:2525 | `w-[336px] h-[336px] shadow-[...] mix-blend-screen` | Image in `<AwardCard>` |
| Award Content | I313:8467;214:2526 | `flex flex-col gap-8 rounded-2xl backdrop-blur-[32px]` | Content in `<AwardCard>` |
| Award Title | I313:8467;214:2530 | `text-2xl font-bold text-[#FFEA9E]` | Text in `<AwardCard>` |
| Award Description | I313:8467;214:2531 | `text-base font-bold text-white text-justify w-[480px]` | Text in `<AwardCard>` |
| Quantity Value | I313:8467;214:2538 | `text-[36px] font-bold leading-[44px] text-white` | Text in `<AwardCard>` |
| Quantity Label | I313:8467;214:2536 | `text-2xl font-bold text-[#FFEA9E]` | Text in `<AwardCard>` |
| Prize Value | I313:8467;214:2546 | `text-[36px] font-bold leading-[44px] text-white` | Text in `<AwardCard>` |
| Prize Label | I313:8467;214:2544 | `text-2xl font-bold text-[#FFEA9E]` | Text in `<AwardCard>` |
| Card Separator (full) | I313:8467;214:2771 | `w-full h-px bg-[#2E3940]` | Divider in `<AwardCard>` |
| SunKudos Section | 335:12023 | `w-full max-w-[1152px] h-[500px] rounded-2xl overflow-hidden` | `<KudosPromotion>` |
| Kudos Content | I335:12023;313:8419 | `flex flex-col gap-8 w-[470px] justify-center` | Content in `<KudosPromotion>` |
| Kudos Title | I335:12023;313:8422 | `text-[57px] font-bold leading-[64px] text-[#FFEA9E]` | Text in `<KudosPromotion>` |
| Kudos CTA | I335:12023;313:8426 | `flex items-center gap-2 p-4 bg-[#FFEA9E] rounded text-base font-bold text-[#00101A]` | `<Button>` in `<KudosPromotion>` |
| KUDOS Branding | I335:12023;329:2949 | `font-[SVN-Gotham] text-[96px] font-normal text-[#DBD1C1] tracking-[-13%]` | Text in `<KudosPromotion>` |
| Footer | 354:4323 | existing `Footer.tsx` + extend | `<Footer>` (reuse shared) |

---

## Notes

- All colors should use CSS variables defined in `globals.css` for consistency with existing pages (Homepage SAA, Login, etc.).
- The "SVN-Gotham" font for "KUDOS" branding must be added to the project and loaded via `@font-face` or `next/font/local`.
- Award cards alternate between two layouts: **Layout A** (image left, content right) for D.1, D.3, D.5 and **Layout B** (content left, image right) for D.2, D.4, D.6. Use a single `<AwardCard>` component with a `variant` prop.
- The sidebar navigation (C_Menu list) should implement **scroll spy** behavior -- highlighting the active award section as the user scrolls through the content.
- The sidebar should be **sticky** (`position: sticky`) so it remains visible while scrolling through the awards list.
- Award images use `mix-blend-mode: screen` and have a gold glow box-shadow. Ensure the parent container supports blend mode rendering.
- Award content areas use `backdrop-filter: blur(32px)` for a frosted glass effect.
- Content separators within award cards (480px wide) are distinct from the full-width card separators (853px wide) at the bottom of each card.
- The "Bia" container uses `align-items: flex-start` (unlike the Homepage which uses `center`), keeping content left-aligned within the 1152px effective width.
- All text in this design uses **Montserrat weight 700 (bold)** except for the KUDOS branding (SVN-Gotham 400) and footer copyright (Montserrat Alternates).
- The Header and Footer are shared components reused from other pages. Ensure the "Hệ thống giải" nav link shows as active state in the header.
- Existing CSS variables (`--color-bg-primary`, `--color-btn-login`, etc.) should be reused where values match.
- All icons MUST be implemented as React Icon Components (not img tags or SVG files) per project conventions.
- Ensure color contrast meets WCAG AA (4.5:1 for normal text) -- gold (#FFEA9E) on dark (#00101A) passes AA.
