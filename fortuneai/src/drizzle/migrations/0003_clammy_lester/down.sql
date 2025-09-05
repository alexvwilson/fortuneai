-- Down migration for 0003_clammy_lester
-- WARNING: This will remove profile management fields from user_preferences table
-- This operation will result in data loss for the following fields:
-- - reading_frequency_preference
-- - privacy_level  
-- - data_sharing_enabled

-- Remove the new profile management columns
ALTER TABLE "user_preferences" DROP COLUMN IF EXISTS "data_sharing_enabled";
ALTER TABLE "user_preferences" DROP COLUMN IF EXISTS "privacy_level";
ALTER TABLE "user_preferences" DROP COLUMN IF EXISTS "reading_frequency_preference";
