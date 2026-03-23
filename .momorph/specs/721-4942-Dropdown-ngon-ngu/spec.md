# Feature Specification: Dropdown Ngôn Ngữ (Language Selector)

**Frame ID**: `721:4942`
**Frame Name**: `Dropdown-ngôn ngữ`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-23
**Status**: Reviewed (3rd pass — i18n added)

---

## Overview

Dropdown chọn ngôn ngữ cho phép người dùng chuyển đổi giữa Tiếng Việt (VN) và Tiếng Anh (EN) trên toàn bộ giao diện. Component nằm trong Header, bên phải cạnh nút notification và avatar.

**Target Users**: Tất cả người dùng SAA 2025 (Sunners)
**Business Context**: Hỗ trợ đa ngôn ngữ cho sự kiện Sun* Annual Awards 2025

---

## User Scenarios & Testing

### User Story 1 — Chuyển đổi ngôn ngữ (Priority: P2)

Một Sunner muốn chuyển ngôn ngữ giao diện từ Tiếng Việt sang Tiếng Anh (hoặc ngược lại).

**Independent Test**: Render LanguageSelector, click trigger button → dropdown mở hiển thị 2 option (VN, EN), click option → dropdown đóng và ngôn ngữ được cập nhật.

**Acceptance Scenarios**:

1. **Given** người dùng đang ở bất kỳ trang nào, **When** nhìn vào Header, **Then** thấy trigger button hiển thị cờ quốc gia + mã ngôn ngữ hiện tại (VN hoặc EN) + ChevronDownIcon.
2. **Given** dropdown đang đóng, **When** người dùng click vào trigger button, **Then** dropdown mở ra hiển thị 2 options: cờ Việt Nam + "VN" và cờ Anh + "EN". Option đang được chọn có nền highlight (`rgba(255, 234, 158, 0.2)`).
3. **Given** dropdown đang mở, **When** người dùng click vào option "EN", **Then** dropdown đóng lại, trigger button cập nhật hiển thị cờ Anh + "EN", và giao diện chuyển sang Tiếng Anh.
4. **Given** dropdown đang mở, **When** người dùng click ra ngoài dropdown, **Then** dropdown đóng lại mà không thay đổi ngôn ngữ.
5. **Given** dropdown đang mở, **When** người dùng nhấn phím Escape, **Then** dropdown đóng lại.
6. **Given** dropdown đang mở, **When** người dùng nhấn ArrowDown/ArrowUp, **Then** focus di chuyển giữa các options. Nhấn Enter chọn option đang focus.

---

### Edge Cases

- Ngôn ngữ mặc định khi chưa có lựa chọn → Tiếng Việt (VN)
- Giá trị ngôn ngữ được lưu ở đâu? → `localStorage` key `"lang"` (client-side only, không cần cookie vì chưa có server-side i18n)
- Click cùng ngôn ngữ đang chọn → Dropdown đóng, không có thay đổi
- Nhiều tab mở cùng lúc → Mỗi tab độc lập (hoặc sync qua localStorage event)

---

## UI/UX Requirements

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Dropdown Container | 525:11713 | Container chứa danh sách ngôn ngữ, border gold, bg dark | Hiển thị khi trigger được click |
| Option VN | I525:11713;362:6085 | Cờ Việt Nam + text "VN", bg highlight khi selected | Click → chọn VN |
| Option EN | I525:11713;362:6128 | Cờ Anh + text "EN", bg dark khi chưa selected | Click → chọn EN |
| Trigger Button | (trong Header) | Cờ + mã ngôn ngữ + ChevronDown | Click → toggle dropdown |

### Navigation Flow

- **From**: Header trên mọi trang (Homepage, Awards Information, Sun* Kudos, Login)
- **To**: Không điều hướng — chỉ thay đổi ngôn ngữ tại chỗ

### Visual Requirements

- **Position**: Dropdown xuất hiện phía dưới trigger button, aligned right
- **Dark theme**: Background `#00070C`, border `#998C5F` (gold)
- **Selected state**: Background `rgba(255, 234, 158, 0.2)` trên option đang được chọn
- **Hover state**: Background `rgba(255, 234, 158, 0.1)` trên option đang hover
- **Border radius**: 8px cho container
- **Accessibility**: `role="listbox"` trên container, `role="option"` trên mỗi item, `aria-selected` cho item được chọn, `aria-expanded` trên trigger, `aria-activedescendant` để track keyboard focus
- **Animation**: Dropdown mở/đóng với `opacity 0→1` + `translateY(-4px)→0` trong 150ms ease-out (consistent với ProfileDropdown pattern)

---

## State Management

### Local Component State
- `isOpen`: boolean — dropdown đang mở hay đóng
- `selectedLanguage`: `"VN"` | `"EN"` — ngôn ngữ đang chọn
- `focusedIndex`: number — index option đang focus (cho keyboard nav)

### Persistence
- Lưu `selectedLanguage` vào `localStorage` key `"lang"` để giữ lựa chọn khi reload
- Đọc `localStorage` on mount để restore ngôn ngữ đã chọn

---

### User Story 2 — i18n: Chuyển ngôn ngữ thực sự translate nội dung (Priority: P1)

Khi Sunner chuyển ngôn ngữ, toàn bộ text trên giao diện MUST được translate sang ngôn ngữ được chọn.

**Independent Test**: Chọn EN → tất cả text trên page chuyển sang tiếng Anh. Chọn VN → chuyển về tiếng Việt.

**Acceptance Scenarios**:

1. **Given** ngôn ngữ hiện tại là VN, **When** người dùng chọn EN trong dropdown, **Then** tất cả user-facing text trên page hiện tại MUST chuyển sang tiếng Anh ngay lập tức (không cần reload).
2. **Given** ngôn ngữ là EN, **When** người dùng navigate sang page khác, **Then** page mới MUST hiển thị tiếng Anh (ngôn ngữ được giữ).
3. **Given** ngôn ngữ EN đã được lưu trong localStorage, **When** người dùng reload page, **Then** page MUST hiển thị tiếng Anh.

---

## i18n Architecture

### Translation System

- **Provider**: `TranslationProvider` wraps the app in `layout.tsx` — provides `useTranslation()` hook
- **Hook**: `useTranslation()` returns `{ t, language, setLanguage }`
  - `t("key")` — returns translated string for current language
  - `language` — current language code ("VN" | "EN")
  - `setLanguage(lang)` — switches language and persists to localStorage
- **Translation files**:
  - `src/i18n/vi.ts` — Vietnamese (default)
  - `src/i18n/en.ts` — English
  - `src/i18n/index.ts` — hook, provider, types

### Translation Keys Structure

```typescript
// src/i18n/vi.ts
export const vi = {
  header: {
    aboutSaa: "Giới thiệu SAA 2025",
    awardsInfo: "Thông tin giải thưởng",
    sunKudos: "Sun* Kudos",
    selectLanguage: "Chọn ngôn ngữ",
  },
  kudos: {
    kvBanner: {
      subtitle: "Hệ thống ghi nhận và cảm ơn",
      inputPlaceholder: "Bạn muốn gửi kudos cho ai?",
      searchPlaceholder: "Tìm kiếm profile Sunner",
    },
    sections: {
      highlightKudos: "HIGHLIGHT KUDOS",
      spotlightBoard: "SPOTLIGHT BOARD",
      allKudos: "ALL KUDOS",
      sectionSubtitle: "Sun* Annual Awards 2025",
    },
    feed: {
      emptyState: "Hãy là người đầu tiên gửi lời cảm ơn!",
      loadMore: "Xem thêm",
    },
    sidebar: {
      kudosReceived: "Kudos nhận được",
      kudosSent: "Kudos đã gửi",
      heartsReceived: "Hearts nhận được",
      secretBoxesOpened: "Secret Boxes đã mở",
      secretBoxesUnopened: "Secret Boxes chưa mở",
      openSecretBox: "Mở Secret Box",
      giftRecipientsTitle: "10 SUNNER NHẬN QUÀ MỚI NHẤT",
      viewMore: "Xem thêm",
    },
    actions: {
      copyLink: "Sao chép link",
      viewDetail: "Xem chi tiết",
      like: "Thích",
      unlike: "Bỏ thích",
    },
    toast: {
      linkCopied: "Đã sao chép link!",
    },
    errors: {
      loadFailed: "Không thể tải dữ liệu. Vui lòng thử lại.",
      retry: "Thử lại",
    },
  },
  footer: {
    copyright: "Bản quyền thuộc về Sun* © 2025",
  },
} as const;

// src/i18n/en.ts — same structure with English values
```

### Integration with LanguageSelector

The `LanguageSelector` dropdown triggers `setLanguage()` from the i18n hook, which:
1. Updates React context → re-renders all components using `t()`
2. Persists to `localStorage` key `"lang"`

---

## Requirements

### Functional Requirements

- **FR-001**: Trigger button MUST hiển thị cờ quốc gia + mã ngôn ngữ hiện tại
- **FR-002**: Click trigger MUST toggle dropdown open/close
- **FR-003**: Click option MUST cập nhật ngôn ngữ và đóng dropdown
- **FR-004**: Click outside MUST đóng dropdown
- **FR-005**: Keyboard nav (Escape, ArrowUp/Down, Enter) MUST hoạt động
- **FR-006**: Selected option MUST có visual highlight khác biệt
- **FR-007**: Chuyển ngôn ngữ MUST translate tất cả user-facing text ngay lập tức (no reload)
- **FR-008**: Ngôn ngữ MUST persist qua page navigation và reload (localStorage)
- **FR-009**: Tất cả user-facing text trong project MUST sử dụng `t()` hook — NEVER hardcode

### Technical Requirements

- **TR-001**: Component hiện tại (`LanguageSelector.tsx`) đã được implement — cần tích hợp với i18n system
- **TR-002**: Tạo `TranslationProvider` wrap trong `layout.tsx`
- **TR-003**: Tạo `useTranslation()` hook với React Context
- **TR-004**: Tạo translation files `src/i18n/vi.ts` và `src/i18n/en.ts`
- **TR-005**: Migrate `SUN_KUDOS_TEXTS` từ hardcoded → dùng `t()` hook

---

## API Dependencies

Không có API dependency — i18n hoàn toàn client-side.

---

## Out of Scope

- Server-side i18n rendering (SSR translation)
- Thêm ngôn ngữ mới (chỉ VN và EN)
- Dịch nội dung dynamic từ database (chỉ dịch UI labels/texts)

---

## Dependencies

- [x] Constitution document (`.momorph/constitution.md`) — **updated with i18n rule**
- [x] `LanguageSelector.tsx` — already implemented with dropdown
- [x] `EnFlagIcon.tsx` — already created
- [ ] `src/i18n/` directory — translation system (new)
- [ ] `TranslationProvider` in `layout.tsx` — wrap app (new)
- [ ] Migrate `SUN_KUDOS_TEXTS` → use `t()` hook
