-- Down migration for user tables creation
-- This migration safely removes the user_preferences and users tables

-- Drop tables in reverse order (child tables first due to foreign key constraints)
DROP TABLE IF EXISTS "user_preferences";
DROP TABLE IF EXISTS "users";

-- Note: This will permanently delete all user data and preferences
-- Only use this migration in development or when you're certain about data loss
