-- ==========================================
-- SAA 2025 — Database Schema for Supabase
-- Generated: 2026-03-23
-- Run this in Supabase SQL Editor
-- ==========================================

-- ==========================================
-- 1. DEPARTMENTS
-- ==========================================
CREATE TABLE departments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    name_en VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. HERO TITLES (New Hero, Rising Hero, etc.)
-- ==========================================
CREATE TABLE hero_titles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    color VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 3. PROFILES (extends auth.users)
-- ==========================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    avatar_url VARCHAR,
    department_id UUID REFERENCES departments(id),
    hero_title_id UUID REFERENCES hero_titles(id),
    star_count INT DEFAULT 0,
    role VARCHAR DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_department ON profiles(department_id);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_name ON profiles(name);

-- ==========================================
-- 4. CATEGORIES (Kudo categories: "IDOL GIỚI TRẺ", "SẾP QUỐC DÂN")
-- ==========================================
CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    name_en VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 5. HASHTAGS
-- ==========================================
CREATE TABLE hashtags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 6. KUDOS (core entity)
-- ==========================================
CREATE TABLE kudos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID NOT NULL REFERENCES profiles(id),
    recipient_id UUID NOT NULL REFERENCES profiles(id),
    content TEXT NOT NULL,
    category_id UUID REFERENCES categories(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_kudos_sender ON kudos(sender_id);
CREATE INDEX idx_kudos_recipient ON kudos(recipient_id);
CREATE INDEX idx_kudos_category ON kudos(category_id);
CREATE INDEX idx_kudos_created_at ON kudos(created_at DESC);

-- ==========================================
-- 7. KUDO MEDIA (images/videos attached to kudos)
-- ==========================================
CREATE TABLE kudo_media (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    kudo_id UUID NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    url VARCHAR NOT NULL,
    type VARCHAR NOT NULL CHECK (type IN ('image', 'video')),
    thumbnail_url VARCHAR,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_kudo_media_kudo ON kudo_media(kudo_id);

-- ==========================================
-- 8. KUDO HASHTAGS (many-to-many)
-- ==========================================
CREATE TABLE kudo_hashtags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    kudo_id UUID NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    hashtag_id UUID NOT NULL REFERENCES hashtags(id) ON DELETE CASCADE,
    UNIQUE(kudo_id, hashtag_id)
);

CREATE INDEX idx_kudo_hashtags_kudo ON kudo_hashtags(kudo_id);
CREATE INDEX idx_kudo_hashtags_hashtag ON kudo_hashtags(hashtag_id);

-- ==========================================
-- 9. KUDO LIKES (hearts)
-- ==========================================
CREATE TABLE kudo_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    kudo_id UUID NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(kudo_id, user_id)
);

CREATE INDEX idx_kudo_likes_kudo ON kudo_likes(kudo_id);
CREATE INDEX idx_kudo_likes_user ON kudo_likes(user_id);

-- ==========================================
-- 10. SECRET BOXES
-- ==========================================
CREATE TABLE secret_boxes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    opened_at TIMESTAMPTZ,
    reward_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_secret_boxes_user ON secret_boxes(user_id);

-- ==========================================
-- 11. GIFTS (recent gift recipients in sidebar)
-- ==========================================
CREATE TABLE gifts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    description VARCHAR NOT NULL,
    description_en VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_gifts_recipient ON gifts(recipient_id);
CREATE INDEX idx_gifts_created_at ON gifts(created_at DESC);

-- ==========================================
-- 12. AWARD CATEGORIES (Awards Information page)
-- ==========================================
CREATE TABLE award_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL,
    slug VARCHAR NOT NULL UNIQUE,
    description_vi TEXT NOT NULL,
    description_en TEXT NOT NULL,
    thumbnail_path VARCHAR,
    quantity VARCHAR NOT NULL,
    unit_vi VARCHAR NOT NULL,
    unit_en VARCHAR NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 13. AWARD PRIZES
-- ==========================================
CREATE TABLE award_prizes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    award_category_id UUID NOT NULL REFERENCES award_categories(id) ON DELETE CASCADE,
    value VARCHAR NOT NULL,
    note_vi VARCHAR,
    note_en VARCHAR,
    sort_order INT DEFAULT 0
);

CREATE INDEX idx_award_prizes_category ON award_prizes(award_category_id);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE kudos ENABLE ROW LEVEL SECURITY;
ALTER TABLE kudo_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE kudo_hashtags ENABLE ROW LEVEL SECURITY;
ALTER TABLE kudo_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE secret_boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_titles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE hashtags ENABLE ROW LEVEL SECURITY;
ALTER TABLE award_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE award_prizes ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Profiles viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Kudos
CREATE POLICY "Kudos viewable by everyone" ON kudos FOR SELECT USING (true);
CREATE POLICY "Authenticated can create kudos" ON kudos FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Kudo media
CREATE POLICY "Kudo media viewable by everyone" ON kudo_media FOR SELECT USING (true);
CREATE POLICY "Media created with kudo" ON kudo_media FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM kudos WHERE kudos.id = kudo_id AND kudos.sender_id = auth.uid())
);

-- Kudo hashtags
CREATE POLICY "Kudo hashtags viewable by everyone" ON kudo_hashtags FOR SELECT USING (true);
CREATE POLICY "Hashtags added with kudo" ON kudo_hashtags FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM kudos WHERE kudos.id = kudo_id AND kudos.sender_id = auth.uid())
);

-- Likes
CREATE POLICY "Likes viewable by everyone" ON kudo_likes FOR SELECT USING (true);
CREATE POLICY "Users can like" ON kudo_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike own" ON kudo_likes FOR DELETE USING (auth.uid() = user_id);

-- Secret boxes
CREATE POLICY "Users see own secret boxes" ON secret_boxes FOR SELECT USING (auth.uid() = user_id);

-- Gifts
CREATE POLICY "Gifts viewable by everyone" ON gifts FOR SELECT USING (true);

-- Reference tables (read-only for all)
CREATE POLICY "Departments viewable" ON departments FOR SELECT USING (true);
CREATE POLICY "Hero titles viewable" ON hero_titles FOR SELECT USING (true);
CREATE POLICY "Categories viewable" ON categories FOR SELECT USING (true);
CREATE POLICY "Hashtags viewable" ON hashtags FOR SELECT USING (true);
CREATE POLICY "Award categories viewable" ON award_categories FOR SELECT USING (true);
CREATE POLICY "Award prizes viewable" ON award_prizes FOR SELECT USING (true);

-- ==========================================
-- TRIGGER: Auto-create profile on signup
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name, email, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.email,
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- VIEW: Kudos with aggregated stats
-- ==========================================
CREATE OR REPLACE VIEW kudos_with_stats AS
SELECT
    k.*,
    c.name AS category_name,
    c.name_en AS category_name_en,
    COUNT(DISTINCT kl.id) AS heart_count,
    ARRAY_AGG(DISTINCT h.name) FILTER (WHERE h.name IS NOT NULL) AS hashtag_names
FROM kudos k
LEFT JOIN categories c ON c.id = k.category_id
LEFT JOIN kudo_likes kl ON kl.kudo_id = k.id
LEFT JOIN kudo_hashtags kh ON kh.kudo_id = k.id
LEFT JOIN hashtags h ON h.id = kh.hashtag_id
WHERE k.deleted_at IS NULL
GROUP BY k.id, c.name, c.name_en;

-- ==========================================
-- RPC: Get paginated kudos feed
-- ==========================================
CREATE OR REPLACE FUNCTION get_kudos_feed(
    p_cursor TIMESTAMPTZ DEFAULT NULL,
    p_limit INT DEFAULT 10,
    p_hashtag VARCHAR DEFAULT NULL,
    p_department_id UUID DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    sender_id UUID,
    recipient_id UUID,
    content TEXT,
    category_name VARCHAR,
    heart_count BIGINT,
    hashtag_names VARCHAR[],
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        ks.id,
        ks.sender_id,
        ks.recipient_id,
        ks.content,
        ks.category_name,
        ks.heart_count,
        ks.hashtag_names,
        ks.created_at
    FROM kudos_with_stats ks
    JOIN profiles ps ON ps.id = ks.sender_id
    JOIN profiles pr ON pr.id = ks.recipient_id
    WHERE (p_cursor IS NULL OR ks.created_at < p_cursor)
      AND (p_hashtag IS NULL OR p_hashtag = ANY(ks.hashtag_names))
      AND (p_department_id IS NULL OR ps.department_id = p_department_id OR pr.department_id = p_department_id)
    ORDER BY ks.created_at DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql STABLE;

-- ==========================================
-- RPC: Get top 5 highlighted kudos
-- ==========================================
CREATE OR REPLACE FUNCTION get_highlight_kudos(
    p_hashtag VARCHAR DEFAULT NULL,
    p_department_id UUID DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    sender_id UUID,
    recipient_id UUID,
    content TEXT,
    category_name VARCHAR,
    heart_count BIGINT,
    hashtag_names VARCHAR[],
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        ks.id,
        ks.sender_id,
        ks.recipient_id,
        ks.content,
        ks.category_name,
        ks.heart_count,
        ks.hashtag_names,
        ks.created_at
    FROM kudos_with_stats ks
    JOIN profiles ps ON ps.id = ks.sender_id
    JOIN profiles pr ON pr.id = ks.recipient_id
    WHERE (p_hashtag IS NULL OR p_hashtag = ANY(ks.hashtag_names))
      AND (p_department_id IS NULL OR ps.department_id = p_department_id OR pr.department_id = p_department_id)
    ORDER BY ks.heart_count DESC
    LIMIT 5;
END;
$$ LANGUAGE plpgsql STABLE;

-- ==========================================
-- RPC: Get user stats
-- ==========================================
CREATE OR REPLACE FUNCTION get_user_stats(p_user_id UUID)
RETURNS TABLE (
    kudos_received BIGINT,
    kudos_sent BIGINT,
    hearts_received BIGINT,
    secret_boxes_opened BIGINT,
    secret_boxes_unopened BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        (SELECT COUNT(*) FROM kudos WHERE recipient_id = p_user_id AND deleted_at IS NULL),
        (SELECT COUNT(*) FROM kudos WHERE sender_id = p_user_id AND deleted_at IS NULL),
        (SELECT COUNT(*) FROM kudo_likes kl JOIN kudos k ON k.id = kl.kudo_id WHERE k.recipient_id = p_user_id AND k.deleted_at IS NULL),
        (SELECT COUNT(*) FROM secret_boxes WHERE user_id = p_user_id AND opened_at IS NOT NULL),
        (SELECT COUNT(*) FROM secret_boxes WHERE user_id = p_user_id AND opened_at IS NULL);
END;
$$ LANGUAGE plpgsql STABLE;

-- ==========================================
-- RPC: Toggle like on a kudo
-- ==========================================
CREATE OR REPLACE FUNCTION toggle_kudo_like(p_kudo_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_exists BOOLEAN;
BEGIN
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    SELECT EXISTS(
        SELECT 1 FROM kudo_likes WHERE kudo_id = p_kudo_id AND user_id = v_user_id
    ) INTO v_exists;

    IF v_exists THEN
        DELETE FROM kudo_likes WHERE kudo_id = p_kudo_id AND user_id = v_user_id;
        RETURN FALSE; -- unliked
    ELSE
        INSERT INTO kudo_likes (kudo_id, user_id) VALUES (p_kudo_id, v_user_id);
        RETURN TRUE; -- liked
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================
-- RPC: Get spotlight data (aggregated recipients)
-- ==========================================
CREATE OR REPLACE FUNCTION get_spotlight_data()
RETURNS TABLE (
    user_id UUID,
    name VARCHAR,
    kudos_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        k.recipient_id,
        p.name,
        COUNT(*) AS kudos_count
    FROM kudos k
    JOIN profiles p ON p.id = k.recipient_id
    WHERE k.deleted_at IS NULL
    GROUP BY k.recipient_id, p.name
    ORDER BY kudos_count DESC;
END;
$$ LANGUAGE plpgsql STABLE;
