import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { readingTypes } from "./reading-types";

export const readings = pgTable(
  "readings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    readingTypeId: uuid("reading_type_id")
      .notNull()
      .references(() => readingTypes.id, { onDelete: "cascade" }),
    prompt: text("prompt").notNull(),
    aiResponse: text("ai_response").notNull(),
    title: text("title"),
    tags: text("tags").array(),
    isFavorite: boolean("is_favorite").default(false).notNull(),
    // Sharing metadata fields
    isShareable: boolean("is_shareable").default(false).notNull(),
    shareToken: text("share_token").unique(),
    shareExpiresAt: timestamp("share_expires_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    // Composite indexes for common query patterns
    index("idx_readings_user_created").on(table.userId, table.createdAt),
    index("idx_readings_user_type_created").on(
      table.userId,
      table.readingTypeId,
      table.createdAt
    ),
    index("idx_readings_user_favorite").on(table.userId, table.isFavorite),
    index("idx_readings_share_token").on(table.shareToken),
    index("idx_readings_type_created").on(table.readingTypeId, table.createdAt),
  ]
);

// Relations
export const readingsRelations = relations(readings, ({ one }) => ({
  user: one(users, {
    fields: [readings.userId],
    references: [users.id],
  }),
  readingType: one(readingTypes, {
    fields: [readings.readingTypeId],
    references: [readingTypes.id],
  }),
}));

// Types
export type Reading = typeof readings.$inferSelect;
export type NewReading = typeof readings.$inferInsert;
