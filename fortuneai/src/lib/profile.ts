import { db } from "@/lib/db";
import { userPreferences } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getUserPreferences(userId: string) {
  const preferences = await db
    .select()
    .from(userPreferences)
    .where(eq(userPreferences.userId, userId))
    .limit(1);

  return preferences[0] || null;
}

export async function createDefaultPreferences(userId: string) {
  const defaultPreferences = {
    userId,
    favoriteReadingTypes: [],
    readingHistoryEnabled: "true",
    notificationsEnabled: "true",
    theme: "dark",
    readingFrequencyPreference: "weekly",
    privacyLevel: "private",
    dataSharingEnabled: "false",
  };

  const [preferences] = await db
    .insert(userPreferences)
    .values(defaultPreferences)
    .returning();

  return preferences;
}

export async function getUserProfileWithPreferences(userId: string) {
  // Get user preferences, create default if none exist
  let preferences = await getUserPreferences(userId);

  if (!preferences) {
    preferences = await createDefaultPreferences(userId);
  }

  return preferences;
}
