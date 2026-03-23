-- ==========================================
-- SAA 2025 — Seed Data for Supabase
-- Run AFTER database-schema.sql
-- ==========================================

-- ==========================================
-- DEPARTMENTS
-- ==========================================
INSERT INTO departments (name, name_en) VALUES
    ('STVC', 'STVC'),
    ('CEVC10', 'CEVC10'),
    ('Engineering', 'Engineering'),
    ('Design', 'Design'),
    ('Product', 'Product'),
    ('QA', 'QA'),
    ('HR', 'HR'),
    ('Marketing', 'Marketing'),
    ('Sales', 'Sales'),
    ('Finance', 'Finance');

-- ==========================================
-- HERO TITLES
-- ==========================================
INSERT INTO hero_titles (name, color) VALUES
    ('New Hero', '#4CAF50'),
    ('Rising Hero', '#FF9800'),
    ('Super Hero', '#2196F3'),
    ('Legend Hero', '#9C27B0');

-- ==========================================
-- CATEGORIES (Kudo categories)
-- ==========================================
INSERT INTO categories (name, name_en) VALUES
    ('IDOL GIỚI TRẺ', 'YOUNG IDOL'),
    ('SẾP QUỐC DÂN', 'NATIONAL BOSS'),
    ('TECH LEAD XUẤT SẮC', 'OUTSTANDING TECH LEAD'),
    ('CULTURE CHAMPION', 'CULTURE CHAMPION'),
    ('MENTOR CỦA NĂM', 'MENTOR OF THE YEAR'),
    ('NGÔI SAO MỚI', 'RISING STAR');

-- ==========================================
-- HASHTAGS
-- ==========================================
INSERT INTO hashtags (name) VALUES
    ('#Dedicated'),
    ('#Inspiring'),
    ('#Leadership'),
    ('#TechExcellence'),
    ('#Caring'),
    ('#Culture'),
    ('#Mentor'),
    ('#Creative'),
    ('#TeamPlayer'),
    ('#Hiệu suất cao'),
    ('#Giỏi chuyên môn'),
    ('#Quản lý xuất sắc');

-- ==========================================
-- AWARD CATEGORIES (Awards Information page)
-- ==========================================
INSERT INTO award_categories (name, slug, description_vi, description_en, thumbnail_path, quantity, unit_vi, unit_en, sort_order) VALUES
(
    'Signature 2025 - Creator',
    'signature-2025-creator',
    'Giải thưởng đặc biệt năm 2025, vinh danh những người sáng tạo đột phá, mang đến những ý tưởng và sản phẩm mới mẻ cho tổ chức. Creator là những cá nhân hoặc tập thể dám nghĩ dám làm, biến ý tưởng thành hiện thực và tạo nên giá trị khác biệt trong kỷ nguyên AI.',
    'Special award for 2025, honoring breakthrough creators who bring innovative ideas and fresh products to the organization. Creators are individuals or teams who dare to think and act, turning ideas into reality and creating distinctive value in the AI era.',
    '/images/awards-information/signature-2025-creator.png',
    '01', 'Cá nhân hoặc tập thể', 'Individual or team', 1
),
(
    'Top Talent',
    'top-talent',
    'Giải thưởng vinh danh những cá nhân xuất sắc nhất, có đóng góp nổi bật và tạo ra tác động tích cực đến sự phát triển chung của tổ chức trong suốt một năm qua.',
    'Award honoring the most outstanding individuals who have made remarkable contributions and created positive impact on the organization''s overall development throughout the past year.',
    '/images/awards-information/top-talent.png',
    '10', 'Đơn vị', 'Units', 2
),
(
    'Top Project Leader',
    'top-project-leader',
    'Vinh danh những người dẫn dắt dự án xuất sắc, truyền cảm hứng và tạo nên thành công cho đội nhóm.',
    'Honoring outstanding project leaders who inspire and create success for their teams.',
    '/images/awards-information/top-project-leader.png',
    '03', 'Cá nhân', 'Individuals', 3
),
(
    'Best Manager',
    'best-manager',
    'Giải thưởng dành cho những nhà quản lý xuất sắc, xây dựng đội ngũ mạnh mẽ và tạo môi trường làm việc tích cực.',
    'Award for outstanding managers who build strong teams and create a positive work environment.',
    '/images/awards-information/best-manager.png',
    '01', 'Cá nhân', 'Individual', 4
),
(
    'Top Project',
    'top-project',
    'Giải thưởng dành cho những dự án xuất sắc, mang lại giá trị vượt trội cho khách hàng và công ty.',
    'Award for outstanding projects that deliver exceptional value to clients and the company.',
    '/images/awards-information/top-project.png',
    '02', 'Tập thể', 'Teams', 5
),
(
    'MVP',
    'mvp',
    'Most Valuable Person — giải thưởng dành cho cá nhân có giá trị nhất trong năm.',
    'Most Valuable Person — award for the most valuable individual of the year.',
    '/images/awards-information/mvp.png',
    '01', 'Cá nhân', 'Individual', 6
);

-- ==========================================
-- AWARD PRIZES
-- ==========================================
INSERT INTO award_prizes (award_category_id, value, note_vi, note_en, sort_order)
SELECT id, '5.000.000 VNĐ', 'cho giải cá nhân', 'for individual award', 1 FROM award_categories WHERE slug = 'signature-2025-creator'
UNION ALL
SELECT id, '8.000.000 VNĐ', 'cho giải tập thể', 'for team award', 2 FROM award_categories WHERE slug = 'signature-2025-creator'
UNION ALL
SELECT id, '7.000.000 VNĐ', 'cho mỗi giải thưởng', 'per award', 1 FROM award_categories WHERE slug = 'top-talent'
UNION ALL
SELECT id, '7.000.000 VNĐ', 'cho mỗi giải thưởng', 'per award', 1 FROM award_categories WHERE slug = 'top-project-leader'
UNION ALL
SELECT id, '10.000.000 VNĐ', NULL, NULL, 1 FROM award_categories WHERE slug = 'best-manager'
UNION ALL
SELECT id, '15.000.000 VNĐ', 'cho mỗi giải thưởng', 'per award', 1 FROM award_categories WHERE slug = 'top-project'
UNION ALL
SELECT id, '15.000.000 VNĐ', NULL, NULL, 1 FROM award_categories WHERE slug = 'mvp';

-- ==========================================
-- SAMPLE DATA (profiles, kudos, likes, etc.)
-- Uses DO block with gen_random_uuid() and variables
-- NOTE: profiles.id REFERENCES auth.users(id).
-- We first insert into auth.users, then profiles.
-- ==========================================

DO $$
DECLARE
    u1 UUID; u2 UUID; u3 UUID; u4 UUID; u5 UUID;
    u6 UUID; u7 UUID; u8 UUID; u9 UUID; u10 UUID;
    k1 UUID; k2 UUID; k3 UUID; k4 UUID; k5 UUID;
    k6 UUID; k7 UUID; k8 UUID; k9 UUID; k10 UUID;
    k11 UUID; k12 UUID; k13 UUID; k14 UUID; k15 UUID;
    emails TEXT[] := ARRAY['toan.pham','thang.tran','cuong.ha','tuan.nguyen','nhat.huynh','hoang.le','mai.tran','bao.nguyen','duc.pham','lan.dang'];
    names TEXT[] := ARRAY['Phạm Văn Toàn','Trần Đức Thắng','Hà Tiến Cường','Nguyễn Minh Tuấn','Huỳnh Dương Xuân Nhật','Lê Văn Hoàng','Trần Thị Mai','Nguyễn Quốc Bảo','Phạm Minh Đức','Đặng Thị Lan'];
    depts TEXT[] := ARRAY['STVC','STVC','STVC','STVC','CEVC10','Engineering','Design','Product','QA','HR'];
    titles TEXT[] := ARRAY['Rising Hero','Super Hero','Legend Hero','Super Hero','New Hero','New Hero','Rising Hero','Rising Hero','Legend Hero','Super Hero'];
    stars INT[] := ARRAY[120,95,200,150,80,45,110,75,130,160];
    uids UUID[];
    i INT;
BEGIN
    -- Create 10 auth users
    FOR i IN 1..10 LOOP
        uids[i] := gen_random_uuid();
        INSERT INTO auth.users (id, email, raw_user_meta_data, created_at, updated_at, email_confirmed_at, instance_id, aud, role)
        VALUES (uids[i], emails[i] || '@sun-asterisk.com',
            jsonb_build_object('full_name', names[i], 'avatar_url', 'https://picsum.photos/seed/u' || i || '/200'),
            NOW(), NOW(), NOW(), gen_random_uuid(), 'authenticated', 'authenticated');
    END LOOP;

    u1:=uids[1]; u2:=uids[2]; u3:=uids[3]; u4:=uids[4]; u5:=uids[5];
    u6:=uids[6]; u7:=uids[7]; u8:=uids[8]; u9:=uids[9]; u10:=uids[10];

    -- Update profiles with extra fields
    FOR i IN 1..10 LOOP
        UPDATE profiles SET
            department_id = (SELECT id FROM departments WHERE name = depts[i]),
            hero_title_id = (SELECT id FROM hero_titles WHERE name = titles[i]),
            star_count = stars[i],
            role = CASE WHEN i = 1 THEN 'admin' ELSE 'user' END
        WHERE id = uids[i];
    END LOOP;

    -- 15 Kudos
    INSERT INTO kudos (sender_id,recipient_id,content,category_id,created_at) VALUES
        (u1,u2,'Gửi anh - một người sếp tận tâm, một người anh mẫu mực.',(SELECT id FROM categories WHERE name='SẾP QUỐC DÂN'),'2025-11-24 15:49+07') RETURNING id INTO k1;
    INSERT INTO kudos (sender_id,recipient_id,content,category_id,created_at) VALUES
        (u3,u4,'Cơ trưởng mới nhận đã chỉ dẫn e rất tận tâm.',(SELECT id FROM categories WHERE name='SẾP QUỐC DÂN'),'2025-11-24 15:53+07') RETURNING id INTO k2;
    INSERT INTO kudos (sender_id,recipient_id,content,category_id,created_at) VALUES
        (u5,u6,'Cảm ơn người em bình thường nhưng phi thường :D',(SELECT id FROM categories WHERE name='IDOL GIỚI TRẺ'),'2025-11-23 10:30+07') RETURNING id INTO k3;
    INSERT INTO kudos (sender_id,recipient_id,content,category_id,created_at) VALUES
        (u7,u8,'Cảm ơn chị đã luôn hỗ trợ team trong mọi giai đoạn khó khăn.',(SELECT id FROM categories WHERE name='MENTOR CỦA NĂM'),'2025-11-22 14:00+07') RETURNING id INTO k4;
    INSERT INTO kudos (sender_id,recipient_id,content,category_id,created_at) VALUES
        (u9,u10,'Anh luôn có những ý tưởng sáng tạo và biết cách truyền cảm hứng!',(SELECT id FROM categories WHERE name='CULTURE CHAMPION'),'2025-11-21 09:15+07') RETURNING id INTO k5;
    INSERT INTO kudos (sender_id,recipient_id,content,category_id,created_at) VALUES
        (u2,u1,'Cảm ơn anh rất nhiều vì đã dành thời gian review code.',(SELECT id FROM categories WHERE name='MENTOR CỦA NĂM'),'2025-11-20 16:30+07') RETURNING id INTO k6;
    INSERT INTO kudos (sender_id,recipient_id,content,category_id,created_at) VALUES
        (u4,u3,'Chúc mừng anh đã hoàn thành xuất sắc dự án ABC!',(SELECT id FROM categories WHERE name='TECH LEAD XUẤT SẮC'),'2025-11-20 10:00+07') RETURNING id INTO k7;
    INSERT INTO kudos (sender_id,recipient_id,content,category_id,created_at) VALUES
        (u6,u5,'Em luôn ngưỡng mộ tinh thần học hỏi không ngừng của anh.',(SELECT id FROM categories WHERE name='NGÔI SAO MỚI'),'2025-11-19 14:20+07') RETURNING id INTO k8;
    INSERT INTO kudos (sender_id,recipient_id,content,category_id,created_at) VALUES
        (u8,u7,'Cảm ơn chị đã thiết kế UI tuyệt đẹp cho dự án.',(SELECT id FROM categories WHERE name='IDOL GIỚI TRẺ'),'2025-11-19 09:00+07') RETURNING id INTO k9;
    INSERT INTO kudos (sender_id,recipient_id,content,category_id,created_at) VALUES
        (u10,u9,'Anh QA siêu cẩn thận! Bug production giảm 80%.',(SELECT id FROM categories WHERE name='CULTURE CHAMPION'),'2025-11-18 15:45+07') RETURNING id INTO k10;
    INSERT INTO kudos (sender_id,recipient_id,content,category_id,created_at) VALUES
        (u1,u4,'Cảm ơn em đã hỗ trợ onboard thành viên mới rất tận tình.',(SELECT id FROM categories WHERE name='MENTOR CỦA NĂM'),'2025-11-18 10:30+07') RETURNING id INTO k11;
    INSERT INTO kudos (sender_id,recipient_id,content,category_id,created_at) VALUES
        (u3,u6,'Bạn mới vào team nhưng đã đóng góp rất nhiều. Keep it up!',(SELECT id FROM categories WHERE name='NGÔI SAO MỚI'),'2025-11-17 16:00+07') RETURNING id INTO k12;
    INSERT INTO kudos (sender_id,recipient_id,content,category_id,created_at) VALUES
        (u5,u10,'Chị HR luôn biết cách làm cho mọi người cảm thấy welcome.',(SELECT id FROM categories WHERE name='CULTURE CHAMPION'),'2025-11-17 11:00+07') RETURNING id INTO k13;
    INSERT INTO kudos (sender_id,recipient_id,content,category_id,created_at) VALUES
        (u7,u2,'Anh sếp tuyệt vời nhất! Luôn lắng nghe và support team.',(SELECT id FROM categories WHERE name='SẾP QUỐC DÂN'),'2025-11-16 09:30+07') RETURNING id INTO k14;
    INSERT INTO kudos (sender_id,recipient_id,content,category_id,created_at) VALUES
        (u9,u8,'Product owner giỏi nhất! Hiểu rõ customer needs.',(SELECT id FROM categories WHERE name='TECH LEAD XUẤT SẮC'),'2025-11-15 14:00+07') RETURNING id INTO k15;

    -- Media
    INSERT INTO kudo_media (kudo_id,url,type,thumbnail_url,sort_order) VALUES
        (k1,'https://picsum.photos/seed/m1/400/300','image',NULL,1),
        (k1,'https://picsum.photos/seed/m2/400/300','image',NULL,2),
        (k3,'https://picsum.photos/seed/m3/400/300','video','https://picsum.photos/seed/t3/400/300',1),
        (k7,'https://picsum.photos/seed/m4/400/300','image',NULL,1),
        (k9,'https://picsum.photos/seed/m5/400/300','video','https://picsum.photos/seed/t5/400/300',1),
        (k12,'https://picsum.photos/seed/m6/400/300','image',NULL,1),
        (k14,'https://picsum.photos/seed/m7/400/300','image',NULL,1);

    -- Hashtags
    INSERT INTO kudo_hashtags (kudo_id,hashtag_id)
    SELECT k1,id FROM hashtags WHERE name IN ('#Hiệu suất cao','#Giỏi chuyên môn','#Quản lý xuất sắc')
    UNION ALL SELECT k2,id FROM hashtags WHERE name IN ('#Hiệu suất cao','#Giỏi chuyên môn')
    UNION ALL SELECT k3,id FROM hashtags WHERE name IN ('#Dedicated','#Inspiring','#TeamPlayer')
    UNION ALL SELECT k4,id FROM hashtags WHERE name IN ('#Mentor','#Caring')
    UNION ALL SELECT k5,id FROM hashtags WHERE name IN ('#Creative','#Culture','#Inspiring')
    UNION ALL SELECT k6,id FROM hashtags WHERE name IN ('#Mentor','#Dedicated')
    UNION ALL SELECT k7,id FROM hashtags WHERE name IN ('#Leadership','#TechExcellence')
    UNION ALL SELECT k8,id FROM hashtags WHERE name IN ('#Inspiring','#Creative')
    UNION ALL SELECT k9,id FROM hashtags WHERE name IN ('#Creative','#Dedicated')
    UNION ALL SELECT k10,id FROM hashtags WHERE name IN ('#Dedicated','#TechExcellence')
    UNION ALL SELECT k11,id FROM hashtags WHERE name IN ('#Mentor','#Caring')
    UNION ALL SELECT k12,id FROM hashtags WHERE name IN ('#Inspiring','#Creative')
    UNION ALL SELECT k13,id FROM hashtags WHERE name IN ('#Culture','#Caring')
    UNION ALL SELECT k14,id FROM hashtags WHERE name IN ('#Leadership','#Hiệu suất cao')
    UNION ALL SELECT k15,id FROM hashtags WHERE name IN ('#TechExcellence','#Giỏi chuyên môn');

    -- Likes (use individual inserts to avoid UNION+LIMIT issue)
    INSERT INTO kudo_likes (kudo_id,user_id) SELECT k1,id FROM profiles WHERE id!=u1 ORDER BY random() LIMIT 8;
    INSERT INTO kudo_likes (kudo_id,user_id) SELECT k2,id FROM profiles WHERE id!=u3 ORDER BY random() LIMIT 6;
    INSERT INTO kudo_likes (kudo_id,user_id) SELECT k3,id FROM profiles WHERE id!=u5 ORDER BY random() LIMIT 5;
    INSERT INTO kudo_likes (kudo_id,user_id) SELECT k4,id FROM profiles WHERE id!=u7 ORDER BY random() LIMIT 4;
    INSERT INTO kudo_likes (kudo_id,user_id) SELECT k5,id FROM profiles WHERE id!=u9 ORDER BY random() LIMIT 7;
    INSERT INTO kudo_likes (kudo_id,user_id) SELECT k6,id FROM profiles WHERE id!=u2 ORDER BY random() LIMIT 3;
    INSERT INTO kudo_likes (kudo_id,user_id) SELECT k7,id FROM profiles WHERE id!=u4 ORDER BY random() LIMIT 9;
    INSERT INTO kudo_likes (kudo_id,user_id) SELECT k8,id FROM profiles WHERE id!=u6 ORDER BY random() LIMIT 2;
    INSERT INTO kudo_likes (kudo_id,user_id) SELECT k9,id FROM profiles WHERE id!=u8 ORDER BY random() LIMIT 6;
    INSERT INTO kudo_likes (kudo_id,user_id) SELECT k14,id FROM profiles WHERE id!=u7 ORDER BY random() LIMIT 8;

    -- Secret boxes
    INSERT INTO secret_boxes (user_id,opened_at,reward_description) VALUES
        (u1,'2025-11-20 10:00+07','Voucher Grab 50K'),
        (u1,'2025-11-22 14:00+07','Sticker pack SAA 2025'),
        (u1,NULL,NULL),(u1,NULL,NULL),(u1,NULL,NULL),
        (u2,'2025-11-21 09:00+07','Voucher coffee 30K'),
        (u2,NULL,NULL),(u2,NULL,NULL),
        (u3,'2025-11-18 11:00+07','Áo SAA 2025'),
        (u3,'2025-11-19 15:00+07','Voucher Grab 100K'),
        (u3,'2025-11-23 10:00+07','Pin SAA limited edition'),
        (u3,NULL,NULL),
        (u10,'2025-11-24 08:00+07','Voucher Shopee 200K');

    -- Gifts
    INSERT INTO gifts (recipient_id,description,description_en,created_at) VALUES
        (u1,'Nhận được 1 ấn phẩm SAA','Received 1 SAA publication','2025-11-24 16:00+07'),
        (u2,'Nhận được 1 ấn phẩm SAA','Received 1 SAA publication','2025-11-24 15:30+07'),
        (u3,'Nhận được 1 ấn phẩm SAA','Received 1 SAA publication','2025-11-24 15:00+07'),
        (u4,'Nhận được 1 ấn phẩm SAA','Received 1 SAA publication','2025-11-23 12:00+07'),
        (u5,'Nhận được 1 ấn phẩm SAA','Received 1 SAA publication','2025-11-23 10:00+07'),
        (u6,'Nhận được 1 ấn phẩm SAA','Received 1 SAA publication','2025-11-22 16:00+07'),
        (u7,'Nhận được 1 ấn phẩm SAA','Received 1 SAA publication','2025-11-22 14:00+07'),
        (u8,'Nhận được 1 ấn phẩm SAA','Received 1 SAA publication','2025-11-21 11:00+07'),
        (u9,'Nhận được 1 ấn phẩm SAA','Received 1 SAA publication','2025-11-20 09:00+07'),
        (u10,'Nhận được 1 ấn phẩm SAA','Received 1 SAA publication','2025-11-19 15:00+07');

    RAISE NOTICE 'Seed complete: 10 users, 15 kudos, media, hashtags, likes, boxes, gifts';
END $$;
