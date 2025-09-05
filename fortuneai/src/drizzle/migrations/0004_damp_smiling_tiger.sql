ALTER TABLE "readings" ADD COLUMN "is_shareable" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "readings" ADD COLUMN "share_token" text;--> statement-breakpoint
ALTER TABLE "readings" ADD COLUMN "share_expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "readings" ADD CONSTRAINT "readings_share_token_unique" UNIQUE("share_token");