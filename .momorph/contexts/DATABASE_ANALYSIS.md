# Database Analysis

## Screen Analysis

### Screen: Login (662:14387)

**Entities Identified**: User (via Supabase Auth)
**Fields**:
- Supabase Auth handles: id, email, name, avatar_url, provider (Google OAuth)
- No custom tables needed — authentication is fully managed by Supabase Auth

**Notes**: Session management handled by Supabase SDK. No DB-level session table.

---

### Screen: Homepage SAA (2167:9026)

**Entities Identified**: AwardCategory (static for MVP), EventConfig (env var)
**Fields**:
- award_categories: name, slug, description, thumbnail_url, display_order
- Event config: from `NEXT_PUBLIC_EVENT_DATETIME` env var (no DB)

**Notes**: Award categories are static data for MVP. May move to DB in future for CMS management. Countdown reads from env var, not DB.

---

### Screen: Dropdown-profile (721:5223) & Dropdown-profile Admin (721:5277)

**Entities Identified**: User, Role
**Fields**:
- User profile: name, avatar_url (from Supabase Auth `auth.users`)
- Role differentiation: admin vs regular user (determines dropdown options)

**Notes**: Admin dropdown has additional menu items. Role stored in `profiles` table or Supabase Auth metadata.

---

### Screen: Hệ thống giải (313:8436) — Awards Information

**Entities Identified**: AwardCategory
**Fields**:
- name (VARCHAR, required) — e.g., "Top Talent", "Top Project"
- slug (VARCHAR, unique) — URL-friendly identifier
- description (TEXT) — detailed explanation of criteria and purpose
- thumbnail_url (VARCHAR) — award illustration image
- quantity (VARCHAR) — e.g., "10", "02", "01"
- quantity_unit (VARCHAR) — e.g., "Đơn vị", "Tập thể", "Cá nhân"
- prize_value (VARCHAR) — e.g., "7.000.000 VNĐ"
- display_order (INTEGER) — sorting order

**Award Categories** (6 total):
1. Top Talent — 10 awards, 7.000.000 VNĐ each
2. Top Project — 02 awards (team), 15.000.000 VNĐ each
3. Top Project Leader — 03 awards (individual), 7.000.000 VNĐ each
4. Best Manager — 01 award (individual), 10.000.000 VNĐ each
5. Signature 2025 - Creator — 01 award, 5.000.000 VNĐ (individual) / 8.000.000 VNĐ (team)
6. MVP (Most Valuable Person) — 01 award, 15.000.000 VNĐ

**Notes**: Static content for MVP. Left navigation + card detail layout. All read-only display.

---

### Screen: Sun* Kudos - Live board (2940:13431)

**Entities Identified**: Kudo, User (sender/recipient), Hashtag, KudoImage, KudoReaction, Department, Badge, UserBadge, SecretBox
**Fields**:

**Kudo**:
- sender_id (FK to profiles) — who sent the kudo
- recipient_id (FK to profiles) — who received the kudo
- content (TEXT, required) — rich text message with @mentions
- is_anonymous (BOOLEAN) — whether sender is hidden
- anonymous_name (VARCHAR) — display name when anonymous
- is_highlighted (BOOLEAN) — whether shown in highlight section
- reaction_count (INTEGER) — cached count of reactions

**KudoImage** (max 5 per kudo):
- kudo_id (FK to kudos)
- image_url (VARCHAR) — stored in object storage
- display_order (INTEGER)

**Hashtag**:
- name (VARCHAR, unique) — e.g., "#teamwork", "#innovation"

**KudoHashtag** (junction):
- kudo_id (FK)
- hashtag_id (FK)

**KudoReaction**:
- kudo_id (FK)
- user_id (FK to profiles)
- (unique constraint: one reaction per user per kudo)

**Notes**: Live board shows highlighted kudos at top, then all kudos in reverse chronological order. Filterable by department and hashtag. Each kudo card shows sender avatar/name, recipient, content, hashtags, images, and reaction count.

---

### Screen: Viết Kudo (520:11602) — Write Kudo Modal

**Entities Identified**: Kudo, KudoImage, Hashtag, KudoHashtag
**Fields**:
- recipient_id (FK, required) — selected via search dropdown
- content (TEXT, required) — rich text with @mentions, bold, italic, strikethrough, numbered list, link, quote
- hashtags (1-5 required) — selected from predefined list
- images (0-5 optional) — uploaded files
- is_anonymous (BOOLEAN) — toggle
- anonymous_name (VARCHAR) — shown when anonymous is enabled

**Notes**: Form fields map directly to `kudos` table + junction tables. Rich text stored as HTML or markdown.

---

### Screen: Open Secret Box (1466:7676)

**Entities Identified**: SecretBox, Badge, UserBadge
**Fields**:

**Badge** (6 types with fixed drop rates):
- name (VARCHAR, unique) — badge name
- image_url (VARCHAR) — badge illustration
- drop_rate (DECIMAL) — probability of receiving

**Badge Drop Rates**:
- Stay Gold: 30%
- Flow to Horizon: 25%
- Touch of Light: 20%
- Beyond the Boundary: 10%
- Revival: 10%
- Root Further: 5%

**SecretBox**:
- user_id (FK to profiles)
- badge_id (FK to badges, nullable) — null if unopened
- opened_at (TIMESTAMPTZ, nullable)

**UserBadge** (collection view):
- user_id (FK)
- badge_id (FK)
- obtained_at (TIMESTAMPTZ)

**Notes**: Each box opening yields exactly 1 random badge. Unopened count displayed. Badge collection ("Bộ sưu tập") shown on Kudos Live board.

---

### Screen: Dropdown Phòng ban (721:5684) — Department Filter

**Entities Identified**: Department
**Fields**:
- name (VARCHAR, unique) — e.g., "CEVC2", "CTO", "SPD"
- parent_department (VARCHAR, nullable) — for hierarchical display (e.g., "CEVC2 - CySS")

**Notes**: ~50 departments listed. Used to filter kudos on live board. Department is associated with users (user belongs to a department).

---

### Screen: Dropdown Hashtag filter (721:5580) & Dropdown list hashtag (1002:13013)

**Entities Identified**: Hashtag
**Fields**:
- name (VARCHAR, unique) — predefined hashtag values

**Notes**: Hashtags are predefined (not user-created). Used both in kudo creation (max 5) and in filtering on live board.

---

### Screen: Countdown - Prelaunch page (2268:35127)

**Entities Identified**: None (reads from env var)
**Fields**: N/A — countdown driven by `NEXT_PUBLIC_EVENT_DATETIME`

---

### Screen: Thể lệ UPDATE (3204:6051) — Rules/Regulations

**Entities Identified**: None (static content)
**Fields**: N/A — static informational content displayed in a modal

---

### Screen: Floating Action Button (313:9137, 313:9139)

**Entities Identified**: None
**Fields**: N/A — UI component only

---

### Screen: Addlink Box (1002:12917)

**Entities Identified**: None
**Fields**: N/A — part of rich text editor in Kudo form, no separate DB entity

---

### Screen: Dropdown-ngôn ngữ (721:4942) — Language Selector

**Entities Identified**: None
**Fields**: N/A — language preference stored in cookie, not DB

---

## Entity Mapping

| Screen | Entities | Key Fields | Relationships |
|--------|----------|------------|---------------|
| Login | User (Supabase Auth) | email, name, avatar | — |
| Homepage SAA | AwardCategory | name, slug, description, thumbnail | — |
| Dropdown-profile | Profile | name, avatar, role | Profile → Department |
| Hệ thống giải | AwardCategory | name, description, quantity, prize_value | — |
| Sun* Kudos - Live board | Kudo, KudoImage, KudoReaction, Badge, UserBadge | content, sender, recipient, hashtags | Kudo → Profile (sender/recipient), Kudo → Hashtag, Kudo → KudoImage |
| Viết Kudo | Kudo, KudoImage, KudoHashtag | recipient, content, hashtags, images, anonymous | Kudo → Hashtag (M:N), Kudo → KudoImage (1:N) |
| Open Secret Box | SecretBox, Badge, UserBadge | badge_id, user_id, drop_rate | SecretBox → Badge, UserBadge → Badge |
| Dropdown Phòng ban | Department | name | Profile → Department |
| Dropdown Hashtag | Hashtag | name | Kudo ↔ Hashtag (M:N) |

## Data Flow

1. **Authentication**: User logs in via Google OAuth → Supabase Auth creates `auth.users` entry → App creates/updates `profiles` record with department and role.

2. **Kudos Flow**: User writes a kudo (selects recipient, writes content, picks hashtags, optionally adds images and anonymous flag) → Creates `kudos` record + `kudo_hashtags` junction records + `kudo_images` records → Appears on Live board.

3. **Reactions Flow**: User reacts to a kudo on Live board → Creates `kudo_reactions` record → Updates `kudos.reaction_count` (cached counter).

4. **Secret Box Flow**: User receives secret boxes (triggered by kudo interactions) → `secret_boxes` records created → User opens a box → Random badge assigned based on drop rates → `user_badges` record created → Badge collection updated.

5. **Filtering Flow**: User selects department or hashtag filter on Live board → Query filters `kudos` by recipient's department or associated hashtags.

6. **Awards Info Flow**: Static data displayed from `award_categories` table (or hardcoded constants for MVP) → Read-only, no user interaction with DB.
