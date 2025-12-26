DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM users WHERE email = 'admin@example.com') THEN
        UPDATE users 
        SET password = '$2a$10$16kctBzhs2Uj2xyPXeBo2ezfZmAJU..hW2uBl0HwiRisPY49CaYpa',
            role = 'admin',
            name = 'Admin User'
        WHERE email = 'admin@example.com';
        RAISE NOTICE 'Admin user updated successfully';
    ELSE
        INSERT INTO users (email, password, name, role) 
        VALUES ('admin@example.com', '$2a$10$16kctBzhs2Uj2xyPXeBo2ezfZmAJU..hW2uBl0HwiRisPY49CaYpa', 'Admin User', 'admin');
        RAISE NOTICE 'Admin user created successfully';
    END IF;
    
    IF EXISTS (SELECT 1 FROM users WHERE email = 'user@example.com') THEN
        UPDATE users 
        SET password = '$2a$10$iwL.6jL7pRD0.jxxaNRmaek2nmyUoiwombk/BZhXCVp7gwArC7F6e',
            role = 'user',
            name = 'Test User'
        WHERE email = 'user@example.com';
        RAISE NOTICE 'User updated successfully';
    ELSE
        INSERT INTO users (email, password, name, role) 
        VALUES ('user@example.com', '$2a$10$iwL.6jL7pRD0.jxxaNRmaek2nmyUoiwombk/BZhXCVp7gwArC7F6e', 'Test User', 'user');
        RAISE NOTICE 'User created successfully';
    END IF;
END $$;

SELECT email, name, role FROM users WHERE email IN ('admin@example.com', 'user@example.com');

