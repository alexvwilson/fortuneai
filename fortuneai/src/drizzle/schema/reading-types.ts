import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";

export const readingTypes = pgTable("reading_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull().default("general"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Junction table for user reading type preferences
export const userReadingTypePreferences = pgTable(
  "user_reading_type_preferences",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    readingTypeId: uuid("reading_type_id")
      .notNull()
      .references(() => readingTypes.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  }
);

// Relations
export const readingTypesRelations = relations(readingTypes, ({ many }) => ({
  userPreferences: many(userReadingTypePreferences),
}));

export const userReadingTypePreferencesRelations = relations(
  userReadingTypePreferences,
  ({ one }) => ({
    user: one(users, {
      fields: [userReadingTypePreferences.userId],
      references: [users.id],
    }),
    readingType: one(readingTypes, {
      fields: [userReadingTypePreferences.readingTypeId],
      references: [readingTypes.id],
    }),
  })
);

// Types
export type ReadingType = typeof readingTypes.$inferSelect;
export type NewReadingType = typeof readingTypes.$inferInsert;
export type UserReadingTypePreference =
  typeof userReadingTypePreferences.$inferSelect;
export type NewUserReadingTypePreference =
  typeof userReadingTypePreferences.$inferInsert;
