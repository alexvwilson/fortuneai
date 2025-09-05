-- Custom migration for readings table
-- This migration creates the readings table for storing fortune reading sessions

-- Create readings table
CREATE TABLE "readings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
	"reading_type_id" uuid NOT NULL REFERENCES "reading_types"("id") ON DELETE CASCADE,
	"prompt" text NOT NULL,
	"ai_response" text NOT NULL,
	"title" text,
	"tags" text[],
	"is_favorite" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create indexes for efficient querying
CREATE INDEX "idx_readings_user_id" ON "readings"("user_id");
CREATE INDEX "idx_readings_reading_type_id" ON "readings"("reading_type_id");
CREATE INDEX "idx_readings_created_at" ON "readings"("created_at");
CREATE INDEX "idx_readings_is_favorite" ON "readings"("is_favorite");
