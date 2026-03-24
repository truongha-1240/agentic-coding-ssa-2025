# Design Style: Viết Kudo

**Frame ID**: `520:11602`
**Frame Name**: `Viết Kudo`
**Extracted At**: 2026-03-23

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-modal-bg | #FFF8E1 | 100% | Modal background (cream) |
| --color-bg-primary | #00101A | 100% | Page bg, text dark |
| --color-backdrop | rgba(0,16,26,0.8) | 80% | Modal backdrop overlay |
| --color-text-dark | #00101A | 100% | Title, labels |
| --color-text-placeholder | #999999 | 100% | Input placeholder text |
| --color-required | #CF1322 | 100% | Required asterisk (*) |
| --color-border-input | #998C5F | 100% | Input borders (gold) |
| --color-btn-submit | #FFEA9E | 100% | "Gửi" button background |
| --color-btn-delete | #D4271D | 100% | Image delete "x" button |
| --color-input-bg | #FFFFFF | 100% | Input field backgrounds |

### Typography

| Element | Font Family | Size | Weight | Line Height | Color |
|---------|-------------|------|--------|-------------|-------|
| Modal title | Montserrat | 32px | 700 | 40px | #00101A |
| Field labels (Người nhận, Danh hiệu, Hashtag) | Montserrat | 22px | 700 | 28px | #00101A |
| Required asterisk | Noto Sans JP | 16px | 700 | 20px | #CF1322 |
| Input placeholder | Montserrat | 16px | 700 | 24px | #999999 |
| Helper text | Montserrat | 16px | 700 | 24px | #999999 |
| Mention hint ("Bạn có thể...") | Montserrat | 16px | 700 | 24px | #00101A |
| "Hủy" button | Montserrat | 16px | 700 | 24px | #00101A |
| "Gửi" button | Montserrat | 22px | 700 | 28px | #00101A |
| Anonymous checkbox label | Montserrat | 22px | 700 | 28px | #999999 |
| Community standards link | Montserrat | 16px | 700 | 24px | #FFEA9E (gold) |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| --modal-padding | 40px | Modal internal padding |
| --modal-gap | 32px | Gap between major sections |
| --field-label-gap | 16px | Gap between label and input |
| --content-gap | 24px | Gap within content area (editor, hashtag, image) |
| --action-gap | 24px | Gap between Hủy and Gửi buttons |
| --hashtag-chip-gap | 8px | Gap between hashtag chips |
| --image-gap | 16px | Gap between image thumbnails |

---

## Component Style Details

### Modal Container (`520:11647` "Viết KUDO")
- **Width**: 752px
- **Height**: auto (content-driven, design shows ~1012px)
- **Background**: `#FFF8E1` (cream)
- **Border Radius**: 24px
- **Padding**: 40px
- **Gap**: 32px (between sections)
- **Position**: Centered on viewport

### Backdrop
- **Background**: `rgba(0, 16, 26, 0.8)`
- **Position**: Fixed, full viewport

### Title (A)
- **Font**: Montserrat 32px Bold, line-height 40px
- **Color**: #00101A
- **Text-align**: Center
- **Width**: 672px (modal width - 2×padding)

### Search Input (B.2)
- **Background**: #FFFFFF
- **Border**: 1px solid #998C5F
- **Padding**: 16px 24px
- **Width**: 514px
- **Height**: 56px (with padding)
- **Placeholder**: "Tìm kiếm", Montserrat 16px 700, #999999
- **Dropdown icon**: 24×24px, right side

### Title/Danh hiệu Input (Frame 552)
- **Background**: #FFFFFF
- **Border**: 1px solid #998C5F
- **Padding**: 16px 24px
- **Width**: 514px
- **Placeholder**: "Dành tặng một danh hiệu cho đồng đội"
- **Helper text**: "Ví dụ: Người truyền động lực cho tôi.\nDanh hiệu sẽ hiển thị làm tiêu đề Kudos của bạn."

### Rich Text Editor
- **Toolbar**: Row of 6 toggle buttons (B, I, S, List, Link, Quote) + "Tiêu chuẩn cộng đồng" link
- **Toolbar button**: ~40×40px each
- **Textarea**: White bg, border 1px solid #998C5F, height 200px
- **Placeholder**: "Hãy gửi gắm lời cám ơn và ghi nhận đến đồng đội tại đây nhé!"

### Hashtag Section (E)
- **Label**: "Hashtag" + "*", Montserrat 22px Bold
- **Button**: "+ Hashtag" with "Tối đa 5" note, border 1px solid #998C5F, padding 4px 8px
- **Chips**: gap 8px between chips

### Image Section (F)
- **Label**: "Image"
- **Thumbnail**: 80×80px, border 1px solid #FFEA9E
- **Delete button**: 20×20px red circle (#D4271D), border-radius full, positioned top-right
- **"+ Image" button**: border 1px solid #998C5F, label + "Tối đa 5"
- **Gap**: 16px between thumbnails

### Anonymous Checkbox (G)
- **Checkbox**: 24×24px, border 1px solid, white bg
- **Label**: "Gửi lời cám ơn và ghi nhận ẩn danh", Montserrat 22px 700, #999999
- **Gap**: 16px between checkbox and label

### Action Buttons (H)
- **Container**: gap 24px, width 672px
- **"Hủy" button**: border 1px solid #998C5F, padding 16px 40px, text "Hủy" + close icon
- **"Gửi" button**: bg #FFEA9E, border-radius 8px, padding 16px, width ~502px, text "Gửi" 22px Bold + send icon

---

## Layout Structure (ASCII)

```
┌──────── Backdrop (rgba(0,16,26,0.8), full viewport) ────────┐
│                                                               │
│   ┌────────── Modal (752px, #FFF8E1, r=24, p=40) ────────┐  │
│   │                                                        │  │
│   │  "Gửi lời cám ơn và ghi nhận đến đồng đội" (32px)    │  │
│   │                    ↕ 32px                              │  │
│   │  [Người nhận *]  [ Tìm kiếm          ▾ ]  (16px gap)  │  │
│   │                    ↕ 32px                              │  │
│   │  [Danh hiệu *]  [ Dành tặng...       ▾ ]              │  │
│   │                  Ví dụ: Người truyền...                │  │
│   │                    ↕ 32px                              │  │
│   │  [ B | I | S | ≡ | 🔗 | " ]  Tiêu chuẩn cộng đồng   │  │
│   │  ┌─────────────────────────────────────────┐          │  │
│   │  │ Placeholder text...                      │ 200px   │  │
│   │  └─────────────────────────────────────────┘          │  │
│   │  Bạn có thể "@ + tên" để nhắc tới...                  │  │
│   │                    ↕ 24px                              │  │
│   │  [Hashtag *]  [+ Hashtag | Tối đa 5]                  │  │
│   │                    ↕ 24px                              │  │
│   │  [Image]  [📷][📷][📷][📷][📷] [+ Image | Tối đa 5]  │  │
│   │            80px each, gap 16px                         │  │
│   │                    ↕ 32px                              │  │
│   │  ☐ Gửi lời cám ơn và ghi nhận ẩn danh                │  │
│   │                    ↕ 32px                              │  │
│   │  [ Hủy ✕ ]          [        Gửi ▷        ]           │  │
│   │                                                        │  │
│   └────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

---

## Implementation Mapping

| Figma Node | CSS/Tailwind | React Component |
|------------|-------------|-----------------|
| Backdrop | `fixed inset-0 bg-[rgba(0,16,26,0.8)] z-50` | `<div>` overlay |
| `520:11647` Modal | `bg-[#FFF8E1] rounded-3xl p-10 w-[752px] max-h-[90vh] overflow-y-auto` | `WriteKudoModal` |
| A Title | `text-[32px] font-bold text-center text-[#00101A]` Montserrat | `<h2>` |
| B.1 Label | `text-[22px] font-bold text-[#00101A]` + `<span class="text-[#CF1322]">*</span>` | `FieldLabel` |
| B.2 Search | `bg-white border border-[#998C5F] px-6 py-4` | `RecipientSearch` |
| D Textarea | `bg-white border border-[#998C5F] h-[200px]` | `RichTextEditor` |
| E.2 Tag Group | `flex flex-wrap gap-2` | `HashtagPicker` |
| F Thumbnails | `w-20 h-20 border border-[#FFEA9E]` | `ImageUploader` |
| F delete btn | `w-5 h-5 rounded-full bg-[#D4271D] absolute -top-1 -right-1` | delete button |
| G Checkbox | `w-6 h-6 border bg-white` + label | `AnonymousCheckbox` |
| H.1 Hủy | `border border-[#998C5F] px-10 py-4` | `<button>` |
| H.2 Gửi | `bg-[#FFEA9E] rounded-lg px-4 py-4 flex-1 text-[22px] font-bold` | `<button>` |

---

## Responsive Breakpoints

| Breakpoint | Modal Width | Padding | Title Size |
|------------|------------|---------|------------|
| Desktop ≥1024px | 752px | 40px | 32px |
| Tablet 768-1023px | 90vw | 32px | 28px |
| Mobile <768px | 100vw | 24px | 24px (full-screen) |

---

## States

### "Gửi" Button
| State | Property | Value |
|-------|----------|-------|
| Default (disabled) | opacity | 0.5, cursor not-allowed |
| Enabled | background | #FFEA9E |
| Hover | background | #FFE070 |
| Loading | content | spinner + "Đang gửi..." |

### Input Fields
| State | Property | Value |
|-------|----------|-------|
| Default | border | 1px solid #998C5F |
| Focus | border | 2px solid #FFEA9E, outline ring |
| Error | border | 2px solid #CF1322 |

### Toolbar Buttons
| State | Property | Value |
|-------|----------|-------|
| Default | background | transparent |
| Active (toggled) | background | rgba(0,0,0,0.1) |
| Hover | background | rgba(0,0,0,0.05) |
