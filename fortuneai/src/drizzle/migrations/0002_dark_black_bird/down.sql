-- Down migration for readings table and user_reading_type_preferences table
-- WARNING: This will permanently delete all readings and user reading type preferences data

-- Drop foreign key constraints first
ALTER TABLE IF EXISTS "readings" DROP CONSTRAINT IF EXISTS "readings_user_id_users_id_fk";
ALTER TABLE IF EXISTS "readings" DROP CONSTRAINT IF EXISTS "readings_reading_type_id_reading_types_id_fk";
ALTER TABLE IF EXISTS "user_reading_type_preferences" DROP CONSTRAINT IF EXISTS "user_reading_type_preferences_user_id_users_id_fk";
ALTER TABLE IF EXISTS "user_reading_type_preferences" DROP CONSTRAINT IF EXISTS "user_reading_type_preferences_reading_type_id_reading_types_id_fk";

-- Drop the tables
DROP TABLE IF EXISTS "readings";
DROP TABLE IF EXISTS "user_reading_type_preferences";

-- Restore user_preferences table to previous state
-- Note: This assumes the previous state had a different constraint
-- You may need to adjust this based on your previous migration
ALTER TABLE IF EXISTS "user_preferences" ALTER COLUMN "favorite_reading_types" SET DEFAULT NULL;
