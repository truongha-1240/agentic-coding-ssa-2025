-- ==========================================
-- Migration: Add event_settings table
-- Run this in Supabase SQL Editor
-- ==========================================

CREATE TABLE IF NOT EXISTS event_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key VARCHAR NOT NULL UNIQUE,
    value VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE event_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Event settings are publicly readable" ON event_settings FOR SELECT USING (true);

-- Seed
INSERT INTO event_settings (key, value) VALUES
    ('event_start_at', '2026-12-12T19:00:00+07:00');
