ALTER TABLE "user_preferences" ADD COLUMN "reading_frequency_preference" text DEFAULT 'weekly' NOT NULL;--> statement-breakpoint
ALTER TABLE "user_preferences" ADD COLUMN "privacy_level" text DEFAULT 'private' NOT NULL;--> statement-breakpoint
ALTER TABLE "user_preferences" ADD COLUMN "data_sharing_enabled" text DEFAULT 'false' NOT NULL;