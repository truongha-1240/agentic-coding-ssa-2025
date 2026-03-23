# Database Analysis — SAA 2025

## Screen Analysis

### Screen: Login (662:14387)
**Entities**: profiles (extends auth.users)
**Notes**: Google OAuth via Supabase Auth. Profile auto-created on first login.

### Screen: Sun* Kudos - Live Board (2940:13431)
**Entities**: profiles, departments, kudos, kudo_media, hashtags, kudo_hashtags, kudo_likes, secret_boxes, gifts, hero_titles, categories
**Data Operations**:
- READ: Paginated kudos feed (cursor-based), top 5 highlights by likes, user stats, gift recipients, spotlight aggregation
- WRITE: Like/unlike kudo, create kudo (future)

### Screen: Awards Information (313:8436)
**Entities**: award_categories, award_prizes
**Notes**: Static seed data for 6 award categories with bilingual descriptions

### Screen: Homepage (2167:9026)
**Notes**: Display-only — no unique entities

### Screen: Language Dropdown (721:4942)
**Notes**: Client-side only (localStorage) — no DB

### Screen: Profile Dropdown Admin (721:5277)
**Notes**: Uses `profiles.role` field

---

## Entity Mapping

| Screen | Entities | Relationships |
|--------|----------|---------------|
| Login | profiles | profiles.id = auth.users.id |
| Kudos Board | kudos, kudo_media, kudo_likes | kudos → profiles (sender/recipient) |
| Kudos Board | kudo_hashtags, hashtags | kudos ↔ hashtags (M2M) |
| Kudos Board | secret_boxes, gifts | → profiles |
| Awards Info | award_categories, award_prizes | award_prizes → award_categories |

## Data Flow

1. Google OAuth → Supabase Auth → trigger creates `profiles` row
2. User creates Kudo → `kudos` + `kudo_media` + `kudo_hashtags`
3. User likes → `kudo_likes` toggle (insert/delete)
4. Feed query → `kudos` JOIN profiles, media, hashtags, likes COUNT
5. Highlights → `kudos` ORDER BY likes count DESC LIMIT 5
6. Stats → COUNT queries on kudos, likes, secret_boxes
7. Spotlight → GROUP BY recipient, COUNT kudos
