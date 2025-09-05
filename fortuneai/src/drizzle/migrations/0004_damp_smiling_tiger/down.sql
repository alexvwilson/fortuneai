-- Down migration for adding sharing fields to readings table
-- WARNING: This will remove sharing functionality and any existing share tokens
-- WARNING: This operation will permanently delete share tokens and sharing metadata

-- Remove unique constraint on share_token
ALTER TABLE "readings" DROP CONSTRAINT IF EXISTS "readings_share_token_unique";

-- Remove sharing metadata columns
ALTER TABLE "readings" DROP COLUMN IF EXISTS "share_expires_at";
ALTER TABLE "readings" DROP COLUMN IF EXISTS "share_token";
ALTER TABLE "readings" DROP COLUMN IF EXISTS "is_shareable";
