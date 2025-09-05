-- Custom migration for reading types schema
-- This migration creates the reading types table and updates user_preferences safely

-- Step 1: Create reading_types table
CREATE TABLE "reading_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"icon" text NOT NULL,
	"category" text DEFAULT 'general' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "reading_types_name_unique" UNIQUE("name")
);

-- Step 2: Create a junction table for user reading type preferences
CREATE TABLE "user_reading_type_preferences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
	"reading_type_id" uuid NOT NULL REFERENCES "reading_types"("id") ON DELETE CASCADE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	UNIQUE("user_id", "reading_type_id")
);

-- Step 3: Add a temporary column for the new UUID array
ALTER TABLE "user_preferences" ADD COLUMN "favorite_reading_types_new" uuid[];

-- Step 4: Initialize the new column as empty array (since we can't convert text to UUID automatically)
UPDATE "user_preferences" SET "favorite_reading_types_new" = '{}';

-- Step 5: Drop the old column
ALTER TABLE "user_preferences" DROP COLUMN "favorite_reading_types";

-- Step 6: Rename the new column to the original name
ALTER TABLE "user_preferences" RENAME COLUMN "favorite_reading_types_new" TO "favorite_reading_types";

-- Step 7: Create indexes for performance
CREATE INDEX "idx_reading_types_active" ON "reading_types"("is_active", "category");
CREATE INDEX "idx_user_reading_type_preferences_user" ON "user_reading_type_preferences"("user_id");
CREATE INDEX "idx_user_reading_type_preferences_type" ON "user_reading_type_preferences"("reading_type_id");
