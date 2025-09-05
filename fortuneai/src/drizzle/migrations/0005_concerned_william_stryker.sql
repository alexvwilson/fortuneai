CREATE INDEX "idx_readings_user_created" ON "readings" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_readings_user_type_created" ON "readings" USING btree ("user_id","reading_type_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_readings_user_favorite" ON "readings" USING btree ("user_id","is_favorite");--> statement-breakpoint
CREATE INDEX "idx_readings_share_token" ON "readings" USING btree ("share_token");--> statement-breakpoint
CREATE INDEX "idx_readings_type_created" ON "readings" USING btree ("reading_type_id","created_at");