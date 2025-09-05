-- Down Migration for Reading Types Schema
-- This migration safely rolls back the reading types table creation and user preferences updates
-- WARNING: This will permanently delete all reading types data and reset user preferences

-- Step 1: Drop indexes
DROP INDEX IF EXISTS "idx_user_reading_type_preferences_type";
DROP INDEX IF EXISTS "idx_user_reading_type_preferences_user";
DROP INDEX IF EXISTS "idx_reading_types_active";

-- Step 2: Drop the junction table
DROP TABLE IF EXISTS "user_reading_type_preferences";

-- Step 3: Add a temporary column for the old text array type
ALTER TABLE "user_preferences" ADD COLUMN "favorite_reading_types_old" text[];

-- Step 4: Initialize the old column as empty array (since we can't restore the original data)
UPDATE "user_preferences" SET "favorite_reading_types_old" = '{}';

-- Step 5: Drop the new UUID column
ALTER TABLE "user_preferences" DROP COLUMN "favorite_reading_types";

-- Step 6: Rename the old column back to the original name
ALTER TABLE "user_preferences" RENAME COLUMN "favorite_reading_types_old" TO "favorite_reading_types";

-- Step 7: Drop the reading_types table (this will cascade to any dependent objects)
DROP TABLE IF EXISTS "reading_types";

-- Migration completed successfully
-- Note: Any user preferences that referenced reading types will now contain empty arrays
