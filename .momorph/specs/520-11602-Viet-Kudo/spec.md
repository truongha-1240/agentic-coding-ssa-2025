# Feature Specification: Viết Kudo

**Frame ID**: `520:11602`
**Frame Name**: `Viết Kudo`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-23
**Status**: Draft

---

## Overview

Modal dialog cho phép Sunner gửi lời cảm ơn (Kudo) đến đồng nghiệp. Modal mở từ thanh "Bạn muốn gửi kudos cho ai?" trên trang Sun* Kudos. Bao gồm: chọn người nhận (search), nhập danh hiệu, soạn thảo nội dung rich-text, chọn hashtag, đính kèm ảnh, và tùy chọn gửi ẩn danh.

**Database**: Tables `kudos`, `kudo_media`, `kudo_hashtags`, `profiles`, `hashtags`

---

## User Scenarios & Testing

### US1: Gửi Kudo cơ bản [P1]

**As a** Sunner đã đăng nhập
**I want to** gửi lời cảm ơn đến đồng nghiệp
**So that** tôi thể hiện sự ghi nhận

#### Acceptance Scenarios

**Scenario 1: Happy Path**
- Given: User đã login, modal Viết Kudo đang mở
- When: Điền người nhận, danh hiệu, nội dung, chọn ≥1 hashtag, click "Gửi"
- Then: Kudo được lưu vào DB, modal đóng, feed refresh hiển thị kudo mới, toast "Gửi thành công!"

**Scenario 2: Missing required fields**
- Given: Modal mở, một số trường bắt buộc chưa điền
- When: Click "Gửi"
- Then: Nút "Gửi" disabled (vì validation real-time), không gửi được

**Scenario 3: Cancel**
- Given: Modal mở, user đã nhập dữ liệu
- When: Click "Hủy"
- Then: Modal đóng, mọi dữ liệu bị hủy

### US2: Rich Text Editor [P1]

**As a** Sunner
**I want to** format nội dung kudo (bold, italic, gạch ngang, list, link, quote)
**So that** nội dung sinh động và rõ ràng hơn

#### Acceptance Scenarios

**Scenario 1: Format text**
- Given: Đang soạn nội dung
- When: Chọn text → click Bold/Italic/Strikethrough/List/Link/Quote
- Then: Text được format tương ứng, toolbar buttons toggle active state

**Scenario 2: @ mention**
- Given: Đang soạn nội dung
- When: Gõ "@" + tên
- Then: Dropdown gợi ý danh sách đồng nghiệp, chọn để insert mention

### US3: Chọn Hashtag [P1]

**As a** Sunner
**I want to** chọn hashtag cho kudo
**So that** kudo được phân loại đúng

#### Acceptance Scenarios

**Scenario 1: Add hashtag**
- Given: Trường hashtag trống
- When: Click "+ Hashtag", chọn từ dropdown
- Then: Hashtag hiển thị dạng chip, button vẫn hiển thị nếu <5

**Scenario 2: Max 5 hashtags**
- Given: Đã có 5 hashtag
- Then: Button "+ Hashtag" ẩn, không thêm được nữa

**Scenario 3: Remove hashtag**
- Given: Có hashtag chips
- When: Click "x" trên chip
- Then: Chip bị xóa, button "+ Hashtag" hiện lại nếu <5

### US4: Đính kèm ảnh [P2]

**As a** Sunner
**I want to** đính kèm ảnh minh họa
**So that** kudo sinh động hơn

#### Acceptance Scenarios

**Scenario 1: Add images**
- Given: Chưa có ảnh
- When: Click "+ Image", chọn files
- Then: Thumbnails hiển thị (80×80px) với nút "x" xóa, tối đa 5 ảnh

**Scenario 2: Max 5 images**
- Given: Đã có 5 ảnh
- Then: Button "+ Image" ẩn

**Scenario 3: Remove image**
- When: Click "x" trên thumbnail
- Then: Ảnh bị xóa, button hiện lại

### US5: Gửi ẩn danh [P2]

**As a** Sunner
**I want to** gửi kudo ẩn danh
**So that** tôi có thể ghi nhận mà không lộ danh tính

#### Acceptance Scenarios

**Scenario 1: Toggle anonymous**
- Given: Checkbox "Gửi lời cám ơn và ghi nhận ẩn danh" unchecked
- When: Check checkbox
- Then: Kudo sẽ được gửi với `is_anonymous = true`, tên người gửi không hiển thị trên feed

### US6: i18n [P2]

**As a** Sunner
**I want to** thấy modal theo ngôn ngữ đã chọn
**So that** tôi hiểu nội dung

#### Acceptance Scenarios

**Scenario 1: Vietnamese**
- Given: Language = VN
- Then: All labels, placeholders, buttons in Vietnamese

**Scenario 2: English**
- Given: Language = EN
- Then: Title = "Send appreciation to your teammate", labels/buttons in English

---

## UI/UX Requirements

### Components

| Component | Description |
|-----------|-------------|
| WriteKudoModal | Modal overlay + container (752px, cream bg, rounded-24px) |
| RecipientSearch | Search dropdown (autocomplete) cho người nhận |
| TitleInput | Text input cho danh hiệu |
| RichTextEditor | Toolbar (B/I/S/List/Link/Quote) + textarea |
| HashtagPicker | "+ Hashtag" button + chip list (max 5) |
| ImageUploader | "+ Image" button + thumbnail grid (80×80, max 5) |
| AnonymousCheckbox | Checkbox "Gửi ẩn danh" |
| ActionButtons | "Hủy" + "Gửi" buttons |

### Layout
- Modal: 752×auto, padding 40px, gap 32px, centered on viewport
- Backdrop: `rgba(0, 16, 26, 0.8)` overlay
- See [design-style.md](design-style.md) for exact values

### Responsive
- Desktop: 752px fixed width
- Tablet: 90vw max
- Mobile: full-screen bottom sheet

### Accessibility
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby`
- Focus trap within modal
- Escape to close
- Tab order: recipient → title → editor → hashtag → image → anonymous → cancel → submit

---

## Data Requirements

### Input Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Người nhận (recipient_id) | UUID | Yes | Must select from dropdown |
| Danh hiệu (title) | String | Yes | Max 100 chars, free text |
| Nội dung (content) | Rich text (HTML) | Yes | Min 10 chars, max 5000 chars |
| Hashtag (hashtag_ids) | UUID[] | Yes | 1-5 hashtags |
| Ảnh (media) | File[] | No | Max 5 files, each ≤5MB, jpg/png/gif |
| Ẩn danh (is_anonymous) | Boolean | No | Default: false |

### Database Mapping

| UI Field | Table | Column |
|----------|-------|--------|
| recipient_id | kudos | recipient_id |
| content | kudos | content |
| title | kudos | title (free text) |
| is_anonymous | kudos | is_anonymous |
| media files | kudo_media | url, type |
| hashtags | kudo_hashtags | kudo_id + hashtag_id |

---

## API Requirements (Predicted)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `profiles` table | SELECT | Search recipients (autocomplete) |
| `categories` table | SELECT | List available categories |
| `hashtags` table | SELECT | List available hashtags |
| `kudos` table | INSERT | Create new kudo |
| `kudo_hashtags` table | INSERT | Link hashtags to kudo |
| `kudo_media` table | INSERT | Link uploaded media to kudo |
| Supabase Storage | UPLOAD | Upload image files |

---

## State Management

### Local State
- `recipientId`: UUID | null
- `title`: string (danh hiệu)
- `content`: string (HTML from rich editor)
- `selectedHashtags`: string[] (max 5)
- `images`: File[] (max 5)
- `isAnonymous`: boolean
- `isSubmitting`: boolean
- `errors`: Record<string, string>

### Validation (real-time)
- "Gửi" button disabled when: recipientId null OR content empty OR hashtags empty
- Error messages shown inline on blur

---

## Edge Cases

| Case | Behavior |
|------|----------|
| User not logged in | Redirect to login |
| Recipient search returns 0 | Show "Không tìm thấy" message |
| Image upload fails | Toast error, keep other images |
| Network error on submit | Toast error, keep form data, allow retry |
| Very long content | Truncate at 5000 chars with counter |
| Duplicate submit (double click) | Disable button after first click |
| Browser refresh during form | Data lost (no draft save) |

---

## Navigation

| From | To | Trigger |
|------|----|---------|
| Sun* Kudos page | WriteKudoModal | Click "Bạn muốn gửi kudos cho ai?" input bar |
| WriteKudoModal | Sun* Kudos page | Click "Hủy" or "Gửi" success or Escape |
