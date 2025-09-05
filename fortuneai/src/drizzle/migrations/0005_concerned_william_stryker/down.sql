-- Down Migration for Performance Indexes
-- This migration safely removes the performance optimization indexes
-- WARNING: This will remove performance optimizations and may slow down queries

-- Drop performance optimization indexes
DROP INDEX IF EXISTS "idx_readings_type_created";
DROP INDEX IF EXISTS "idx_readings_share_token";
DROP INDEX IF EXISTS "idx_readings_user_favorite";
DROP INDEX IF EXISTS "idx_readings_user_type_created";
DROP INDEX IF EXISTS "idx_readings_user_created";

-- Migration completed successfully
-- Note: Query performance may be reduced after removing these indexes
