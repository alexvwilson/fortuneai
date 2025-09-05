import { db } from "@/lib/db";
import { readingTypes, userReadingTypePreferences } from "@/drizzle/schema";
import { eq, and, inArray } from "drizzle-orm";

export interface ReadingTypeWithUserPreference {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  isActive: boolean;
  isUserFavorite: boolean;
}

export async function getReadingTypesWithUserPreferences(
  userId: string
): Promise<ReadingTypeWithUserPreference[]> {
  try {
    // Get all active reading types
    const types = await db
      .select()
      .from(readingTypes)
      .where(eq(readingTypes.isActive, true))
      .orderBy(readingTypes.category, readingTypes.name);

    // Get user's favorite types
    const userPrefs = await db
      .select({ readingTypeId: userReadingTypePreferences.readingTypeId })
      .from(userReadingTypePreferences)
      .where(eq(userReadingTypePreferences.userId, userId));

    const favoriteTypeIds = userPrefs.map((p) => p.readingTypeId);

    // Combine data with user preference status
    return types.map((type) => ({
      id: type.id,
      name: type.name,
      description: type.description,
      icon: type.icon,
      category: type.category,
      isActive: type.isActive,
      isUserFavorite: favoriteTypeIds.includes(type.id),
    }));
  } catch (error) {
    console.error("Error fetching reading types:", error);
    throw new Error("Failed to fetch reading types");
  }
}

export async function getFavoriteTypesForUser(
  userId: string
): Promise<ReadingTypeWithUserPreference[]> {
  try {
    const userPrefs = await db
      .select({ readingTypeId: userReadingTypePreferences.readingTypeId })
      .from(userReadingTypePreferences)
      .where(eq(userReadingTypePreferences.userId, userId));

    const favoriteTypeIds = userPrefs.map((p) => p.readingTypeId);

    if (favoriteTypeIds.length === 0) {
      return [];
    }

    const favoriteTypes = await db
      .select()
      .from(readingTypes)
      .where(
        and(
          eq(readingTypes.isActive, true),
          inArray(readingTypes.id, favoriteTypeIds)
        )
      );

    return favoriteTypes.map((type) => ({
      id: type.id,
      name: type.name,
      description: type.description,
      icon: type.icon,
      category: type.category,
      isActive: type.isActive,
      isUserFavorite: true,
    }));
  } catch (error) {
    console.error("Error fetching favorite types:", error);
    throw new Error("Failed to fetch favorite types");
  }
}

export async function getAllReadingTypes(): Promise<
  ReadingTypeWithUserPreference[]
> {
  try {
    const types = await db
      .select()
      .from(readingTypes)
      .where(eq(readingTypes.isActive, true))
      .orderBy(readingTypes.category, readingTypes.name);

    return types.map((type) => ({
      id: type.id,
      name: type.name,
      description: type.description,
      icon: type.icon,
      category: type.category,
      isActive: type.isActive,
      isUserFavorite: false, // Default to false when no user context
    }));
  } catch (error) {
    console.error("Error fetching all reading types:", error);
    throw new Error("Failed to fetch reading types");
  }
}

export async function getReadingTypeById(readingTypeId: string): Promise<{
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
} | null> {
  try {
    const result = await db
      .select()
      .from(readingTypes)
      .where(eq(readingTypes.id, readingTypeId))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const type = result[0];
    return {
      id: type.id,
      name: type.name,
      description: type.description,
      icon: type.icon,
      category: type.category,
    };
  } catch (error) {
    console.error("Error fetching reading type by ID:", error);
    throw new Error("Failed to fetch reading type");
  }
}
