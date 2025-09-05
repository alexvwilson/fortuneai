-- Down migration for readings table
-- WARNING: This will permanently delete all readings data

-- Drop indexes first
DROP INDEX IF EXISTS "idx_readings_user_id";
DROP INDEX IF EXISTS "idx_readings_reading_type_id";
DROP INDEX IF EXISTS "idx_readings_created_at";
DROP INDEX IF EXISTS "idx_readings_is_favorite";

-- Drop the readings table
DROP TABLE IF EXISTS "readings";
