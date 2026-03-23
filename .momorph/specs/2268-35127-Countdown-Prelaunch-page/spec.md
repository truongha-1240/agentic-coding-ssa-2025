# Feature Specification: Countdown - Prelaunch Page

**Frame ID**: `2268:35127`
**Frame Name**: `Countdown - Prelaunch page`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-23
**Status**: Draft

---

## Overview

Full-screen prelaunch page hiển thị countdown timer đến thời điểm bắt đầu sự kiện Sun* Annual Awards 2025. Trang này hiển thị trước khi sự kiện chính diễn ra, đếm ngược DAYS / HOURS / MINUTES trên nền keyvisual với gradient overlay. Khi countdown kết thúc, tự động redirect đến homepage.

**Database**: Table `event_settings` — column `event_start_at` (TIMESTAMPTZ) = `2026-12-12 19:00:00+07`

---

## User Scenarios & Testing

### US1: View Countdown Timer [P1]

**As a** Sunner truy cập website trước sự kiện
**I want to** thấy countdown timer hiển thị thời gian còn lại
**So that** tôi biết khi nào sự kiện bắt đầu

#### Acceptance Scenarios

**Scenario 1: Happy Path — Countdown active**
- Given: Thời gian hiện tại trước `event_start_at`
- When: User truy cập trang `/countdown`
- Then: Hiển thị "Sự kiện sẽ bắt đầu sau" / "Event starts in" (i18n) với countdown DAYS / HOURS / MINUTES

**Scenario 2: Timer updates in real-time**
- Given: Countdown đang hiển thị
- When: Mỗi phút trôi qua
- Then: MINUTES giảm 1, HOURS/DAYS cập nhật tương ứng

**Scenario 3: Countdown reaches zero**
- Given: Countdown đang chạy
- When: Thời gian đạt `event_start_at`
- Then: Hiển thị "00 00 00" rồi redirect đến homepage `/` sau 3 giây

**Scenario 4: Event already started**
- Given: Thời gian hiện tại sau `event_start_at`
- When: User truy cập `/countdown`
- Then: Redirect ngay đến homepage `/`

### US2: i18n Support [P2]

**As a** Sunner
**I want to** thấy countdown labels theo ngôn ngữ đã chọn
**So that** tôi hiểu nội dung

#### Acceptance Scenarios

**Scenario 1: Vietnamese (default)**
- Given: Language = VN
- Then: Title = "Sự kiện sẽ bắt đầu sau", Labels giữ nguyên tiếng Anh = "DAYS", "HOURS", "MINUTES" (theo design)

**Scenario 2: English**
- Given: Language = EN
- Then: Title = "Event starts in", Labels = "DAYS", "HOURS", "MINUTES"

> **Note**: Labels DAYS/HOURS/MINUTES giữ tiếng Anh cho cả 2 ngôn ngữ (design decision từ Figma). Chỉ title thay đổi.

---

## UI/UX Requirements

### Components

| Component | Description |
|-----------|-------------|
| CountdownPage | Full-screen wrapper — KV background + gradient + countdown center |
| CountdownTimer | Container cho 3 digit groups (Days, Hours, Minutes) |
| DigitPair | 2 digit cards hiển thị số kiểu LED (font "Digital Numbers") |

### Layout
- Full viewport height (`100vh`)
- Background: KV image + gradient overlay (same as homepage)
- Content vertically + horizontally centered
- See [design-style.md](design-style.md) for exact values

### Responsive
- Desktop: digit cards 77×123px, gap 60px between groups
- Tablet: scale down proportionally
- Mobile: digit cards ~50×80px, gap 24px, font-size reduced

### Accessibility
- `role="timer"` + `aria-live="polite"` on countdown container
- `aria-label` on each digit group ("X days remaining")
- Prefers-reduced-motion: disable flip animation

---

## Data Requirements

### From Database

| Field | Table | Column | Type |
|-------|-------|--------|------|
| Event start time | event_settings | event_start_at | TIMESTAMPTZ |

### Computed (client-side)

| Field | Calculation |
|-------|-------------|
| days | `Math.floor(diff / 86400000)` |
| hours | `Math.floor((diff % 86400000) / 3600000)` |
| minutes | `Math.floor((diff % 3600000) / 60000)` |

---

## API Requirements (Predicted)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| Supabase `event_settings` table | SELECT | Get `event_start_at` |

---

## State Management

### Local State
- `timeLeft`: `{ days: number, hours: number, minutes: number }`
- `isExpired`: boolean — countdown đã kết thúc

### Hooks
- `useCountdown(targetDate)` — returns `{ days, hours, minutes, isExpired }`
  - Uses `setInterval` (1s interval) for accurate countdown — recalculates from `Date.now()` each tick
  - Cleanup on unmount
  - Returns `isExpired: true` when diff ≤ 0

---

## Edge Cases

| Case | Behavior |
|------|----------|
| DB query fails | Fallback: hardcoded target date from env `NEXT_PUBLIC_EVENT_DATE` |
| User offline | Timer continues with last known target |
| Very far future (>99 days) | Display 2-digit max for days (99) |
| Negative time | Redirect to homepage |
| Browser tab inactive | Timer catches up on focus (recalculate from Date.now) |

---

## Navigation

| From | To | Trigger |
|------|----|---------|
| `/countdown` | `/` | Countdown reaches 0 (auto-redirect after 3s) |
| Any page | `/countdown` | Before event start (middleware redirect) |
