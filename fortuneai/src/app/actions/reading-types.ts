"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { userReadingTypePreferences, readingTypes } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

export type ToggleFavoriteTypeResult =
  | { success: true; message: string }
  | { success: false; error: string };

export async function toggleFavoriteType(
  readingTypeId: string
): Promise<ToggleFavoriteTypeResult> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // Check if reading type exists and is active
    const readingType = await db
      .select()
      .from(readingTypes)
      .where(
        and(eq(readingTypes.id, readingTypeId), eq(readingTypes.isActive, true))
      )
      .limit(1);

    if (readingType.length === 0) {
      return { success: false, error: "Reading type not found or inactive" };
    }

    // Check if user already has this preference
    const existingPreference = await db
      .select()
      .from(userReadingTypePreferences)
      .where(
        and(
          eq(userReadingTypePreferences.userId, userId),
          eq(userReadingTypePreferences.readingTypeId, readingTypeId)
        )
      )
      .limit(1);

    if (existingPreference.length > 0) {
      // Remove from favorites
      await db
        .delete(userReadingTypePreferences)
        .where(
          and(
            eq(userReadingTypePreferences.userId, userId),
            eq(userReadingTypePreferences.readingTypeId, readingTypeId)
          )
        );

      revalidatePath("/types");
      revalidatePath("/dashboard");

      return { success: true, message: "Removed from favorites" };
    } else {
      // Add to favorites
      await db.insert(userReadingTypePreferences).values({
        userId,
        readingTypeId,
      });

      revalidatePath("/types");
      revalidatePath("/dashboard");

      return { success: true, message: "Added to favorites" };
    }
  } catch (error) {
    console.error("Error toggling favorite type:", error);
    return {
      success: false,
      error: "Failed to update favorites",
    };
  }
}

export type GetUserFavoriteTypesResult =
  | { success: true; favoriteTypeIds: string[] }
  | { success: false; error: string };

export async function getUserFavoriteTypes(
  userId: string
): Promise<GetUserFavoriteTypesResult> {
  try {
    const preferences = await db
      .select({ readingTypeId: userReadingTypePreferences.readingTypeId })
      .from(userReadingTypePreferences)
      .where(eq(userReadingTypePreferences.userId, userId));

    const favoriteTypeIds = preferences.map((p) => p.readingTypeId);

    return { success: true, favoriteTypeIds };
  } catch (error) {
    console.error("Error fetching user favorite types:", error);
    return {
      success: false,
      error: "Failed to fetch favorite types",
    };
  }
}
