import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user ID
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userPreferences = pgTable("user_preferences", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  // Note: favoriteReadingTypes is now handled through the user_reading_type_preferences junction table
  // This field is kept for backward compatibility but will be empty
  favoriteReadingTypes: text("favorite_reading_types").array().default([]),
  readingHistoryEnabled: text("reading_history_enabled")
    .default("true")
    .notNull(),
  notificationsEnabled: text("notifications_enabled").default("true").notNull(),
  theme: text("theme").default("dark").notNull(), // 'light' | 'dark' | 'auto'
  // New profile management fields
  readingFrequencyPreference: text("reading_frequency_preference")
    .default("weekly")
    .notNull(), // 'daily' | 'weekly' | 'monthly' | 'never'
  privacyLevel: text("privacy_level").default("private").notNull(), // 'public' | 'private' | 'friends'
  dataSharingEnabled: text("data_sharing_enabled").default("false").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  preferences: many(userPreferences),
}));

export const userPreferencesRelations = relations(
  userPreferences,
  ({ one }) => ({
    user: one(users, {
      fields: [userPreferences.userId],
      references: [users.id],
    }),
  })
);

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserPreferences = typeof userPreferences.$inferSelect;
export type NewUserPreferences = typeof userPreferences.$inferInsert;
