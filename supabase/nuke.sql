-- ==========================================
-- NUKE: Drop ALL project tables to start fresh
-- Run BEFORE database-schema.sql
-- ⚠️ Deletes ALL data!
-- ==========================================
DROP VIEW IF EXISTS kudos_with_stats CASCADE;
DROP FUNCTION IF EXISTS get_kudos_feed CASCADE;
DROP FUNCTION IF EXISTS get_highlight_kudos CASCADE;
DROP FUNCTION IF EXISTS get_user_stats CASCADE;
DROP FUNCTION IF EXISTS toggle_kudo_like CASCADE;
DROP FUNCTION IF EXISTS get_spotlight_data CASCADE;
DROP FUNCTION IF EXISTS handle_new_user CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TABLE IF EXISTS award_prizes CASCADE;
DROP TABLE IF EXISTS award_categories CASCADE;
DROP TABLE IF EXISTS gifts CASCADE;
DROP TABLE IF EXISTS secret_boxes CASCADE;
DROP TABLE IF EXISTS kudo_likes CASCADE;
DROP TABLE IF EXISTS kudo_hashtags CASCADE;
DROP TABLE IF EXISTS kudo_media CASCADE;
DROP TABLE IF EXISTS kudos CASCADE;
DROP TABLE IF EXISTS hashtags CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS hero_titles CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS event_settings CASCADE;
DELETE FROM auth.users WHERE email LIKE '%@sun-asterisk.com';
