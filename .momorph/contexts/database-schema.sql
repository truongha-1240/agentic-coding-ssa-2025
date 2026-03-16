-- ==========================================
-- Sun* Annual Awards 2025 — Database Schema
-- Generated from Figma designs
-- Stack: Supabase (PostgreSQL) with RLS
-- ==========================================

-- Note: Supabase Auth manages `auth.users` automatically.
-- The `profiles` table extends auth.users with app-specific data.

-- ==========================================
-- Departments (must be created before profiles due to FK)
-- ==========================================
CREATE TABLE departments (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    parent_name VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for department name lookups
CREATE INDEX idx_departments_name ON departments(name);

-- ==========================================
-- Profiles (extends Supabase Auth)
-- ==========================================
CREATE TABLE profiles (
    id BIGSERIAL PRIMARY KEY,
    auth_user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR NOT NULL UNIQUE,
    name VARCHAR NOT NULL,
    avatar_url VARCHAR,
    role VARCHAR NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    department_id BIGINT REFERENCES departments(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Indexes for profiles
CREATE INDEX idx_profiles_auth_user_id ON profiles(auth_user_id);
CREATE INDEX idx_profiles_department_id ON profiles(department_id);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);

-- ==========================================
-- Award Categories
-- ==========================================
CREATE TABLE award_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    slug VARCHAR NOT NULL UNIQUE,
    description TEXT,
    thumbnail_url VARCHAR,
    quantity VARCHAR,
    quantity_unit VARCHAR,
    prize_value VARCHAR,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for display ordering
CREATE INDEX idx_award_categories_display_order ON award_categories(display_order);

-- ==========================================
-- Hashtags (predefined tags for kudos)
-- ==========================================
CREATE TABLE hashtags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for hashtag name lookups
CREATE INDEX idx_hashtags_name ON hashtags(name);

-- ==========================================
-- Kudos (core entity — recognition messages)
-- ==========================================
CREATE TABLE kudos (
    id BIGSERIAL PRIMARY KEY,
    sender_id BIGINT NOT NULL REFERENCES profiles(id),
    recipient_id BIGINT NOT NULL REFERENCES profiles(id),
    content TEXT NOT NULL,
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    anonymous_name VARCHAR,
    is_highlighted BOOLEAN NOT NULL DEFAULT FALSE,
    reaction_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Indexes for kudos
CREATE INDEX idx_kudos_sender_id ON kudos(sender_id);
CREATE INDEX idx_kudos_recipient_id ON kudos(recipient_id);
CREATE INDEX idx_kudos_created_at ON kudos(created_at DESC);
CREATE INDEX idx_kudos_is_highlighted ON kudos(is_highlighted) WHERE is_highlighted = TRUE;

-- Composite index for live board: recent kudos with highlight priority
CREATE INDEX idx_kudos_highlight_created
    ON kudos(is_highlighted DESC, created_at DESC);

-- ==========================================
-- Kudo Images (max 5 per kudo)
-- ==========================================
CREATE TABLE kudo_images (
    id BIGSERIAL PRIMARY KEY,
    kudo_id BIGINT NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    image_url VARCHAR NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for kudo image lookups
CREATE INDEX idx_kudo_images_kudo_id ON kudo_images(kudo_id);

-- ==========================================
-- Kudo Hashtags (M:N junction — max 5 per kudo)
-- ==========================================
CREATE TABLE kudo_hashtags (
    kudo_id BIGINT NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    hashtag_id BIGINT NOT NULL REFERENCES hashtags(id) ON DELETE CASCADE,
    PRIMARY KEY (kudo_id, hashtag_id)
);

-- Index for hashtag-based filtering
CREATE INDEX idx_kudo_hashtags_hashtag_id ON kudo_hashtags(hashtag_id);

-- ==========================================
-- Kudo Reactions (one per user per kudo)
-- ==========================================
CREATE TABLE kudo_reactions (
    id BIGSERIAL PRIMARY KEY,
    kudo_id BIGINT NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (kudo_id, user_id)
);

-- Indexes for kudo reactions
CREATE INDEX idx_kudo_reactions_kudo_id ON kudo_reactions(kudo_id);
CREATE INDEX idx_kudo_reactions_user_id ON kudo_reactions(user_id);

-- ==========================================
-- Badges (6 fixed badge types for secret box)
-- ==========================================
CREATE TABLE badges (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    image_url VARCHAR,
    drop_rate DECIMAL(5, 4) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Secret Boxes (earned by users, opened for badges)
-- ==========================================
CREATE TABLE secret_boxes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    badge_id BIGINT REFERENCES badges(id),
    opened_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for secret boxes
CREATE INDEX idx_secret_boxes_user_id ON secret_boxes(user_id);
CREATE INDEX idx_secret_boxes_user_unopened
    ON secret_boxes(user_id) WHERE opened_at IS NULL;

-- ==========================================
-- User Badges (badge collection per user)
-- ==========================================
CREATE TABLE user_badges (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    badge_id BIGINT NOT NULL REFERENCES badges(id),
    obtained_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for user badges
CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge_id ON user_badges(badge_id);

-- ==========================================
-- Seed Data: Award Categories
-- ==========================================
INSERT INTO award_categories (name, slug, description, quantity, quantity_unit, prize_value, display_order) VALUES
    ('Top Talent', 'top-talent', 'Giải thưởng vinh danh những cá nhân xuất sắc nhất, nỗ lực trở thành tinh anh trong lĩnh vực của mình.', '10', 'Đơn vị', '7.000.000 VNĐ', 1),
    ('Top Project', 'top-project', 'Giải thưởng vinh danh những dự án xuất sắc nhất trong năm.', '02', 'Tập thể', '15.000.000 VNĐ', 2),
    ('Top Project Leader', 'top-project-leader', 'Giải thưởng vinh danh những người dẫn dắt dự án xuất sắc nhất.', '03', 'Cá nhân', '7.000.000 VNĐ', 3),
    ('Best Manager', 'best-manager', 'Giải thưởng vinh danh quản lý xuất sắc nhất trong năm.', '01', 'Cá nhân', '10.000.000 VNĐ', 4),
    ('Signature 2025 - Creator', 'signature-2025-creator', 'Giải thưởng đặc biệt cho cá nhân/tập thể sáng tạo đột phá.', '01', 'Cá nhân/Tập thể', '5.000.000 - 8.000.000 VNĐ', 5),
    ('MVP (Most Valuable Person)', 'mvp', 'Giải thưởng cao nhất vinh danh cá nhân có giá trị nhất trong năm.', '01', 'Cá nhân', '15.000.000 VNĐ', 6);

-- ==========================================
-- Seed Data: Badges
-- ==========================================
INSERT INTO badges (name, image_url, drop_rate) VALUES
    ('Stay Gold', '/images/badges/stay-gold.png', 0.3000),
    ('Flow to Horizon', '/images/badges/flow-to-horizon.png', 0.2500),
    ('Touch of Light', '/images/badges/touch-of-light.png', 0.2000),
    ('Beyond the Boundary', '/images/badges/beyond-the-boundary.png', 0.1000),
    ('Revival', '/images/badges/revival.png', 0.1000),
    ('Root Further', '/images/badges/root-further.png', 0.0500);

-- ==========================================
-- Seed Data: Departments (partial — full list from HR system)
-- ==========================================
INSERT INTO departments (name, parent_name) VALUES
    ('CTO', NULL),
    ('SPD', NULL),
    ('FCOV', NULL),
    ('CEVC1', NULL),
    ('CEVC2', NULL),
    ('CEVC3', NULL),
    ('CEVC4', NULL),
    ('STVC', NULL),
    ('OPDC', NULL),
    ('GEU', NULL),
    ('PAO', NULL),
    ('IAV', NULL),
    ('CPV', NULL),
    ('BDV', NULL),
    ('CEVEC', NULL),
    ('STVC - R&D', 'STVC'),
    ('CEVC2 - CySS', 'CEVC2'),
    ('FCOV - LRM', 'FCOV'),
    ('CEVC2 - System', 'CEVC2'),
    ('OPDC - HRF', 'OPDC'),
    ('CEVC1 - DSV - UI/UX 1', 'CEVC1'),
    ('CEVC1 - DSV', 'CEVC1'),
    ('OPDC - HRD - C&C', 'OPDC'),
    ('FCOV - F&A', 'FCOV'),
    ('CEVC1 - AIE', 'CEVC1'),
    ('OPDC - HRF - C&B', 'OPDC'),
    ('FCOV - GA', 'FCOV'),
    ('FCOV - ISO', 'FCOV'),
    ('STVC - EE', 'STVC'),
    ('GEU - HUST', 'GEU'),
    ('CEVEC - SAPD', 'CEVEC'),
    ('OPDC - HRF - OD', 'OPDC'),
    ('CEVEC - GSD', 'CEVEC'),
    ('GEU - TM', 'GEU'),
    ('STVC - R&D - DTR', 'STVC'),
    ('STVC - R&D - DPS', 'STVC'),
    ('STVC - R&D - AIR', 'STVC'),
    ('PAO - PEC', 'PAO'),
    ('GEU - DUT', 'GEU'),
    ('OPDC - HRD - L&D', 'OPDC'),
    ('OPDC - HRD - TI', 'OPDC'),
    ('OPDC - HRF - TA', 'OPDC'),
    ('GEU - UET', 'GEU'),
    ('STVC - R&D - SDX', 'STVC'),
    ('OPDC - HRD - HRBP', 'OPDC'),
    ('CEVC1 - DSV - UI/UX 2', 'CEVC1'),
    ('STVC - Infra', 'STVC'),
    ('CPV - CGP', 'CPV'),
    ('GEU - UIT', 'GEU'),
    ('OPDC - HRD', 'OPDC'),
    ('PAO - PAO', 'PAO');
