"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, userPreferences, type User } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type CreateUserResult =
  | { success: true; userId: string }
  | { success: false; error: string };

export type GetUserResult =
  | { success: true; user: User }
  | { success: false; error: string };

export type UpdateUserPreferencesResult =
  | { success: true }
  | { success: false; error: string };

export async function createUser(): Promise<CreateUserResult> {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return { success: false, error: "User not authenticated" };
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, clerkUser.id))
      .limit(1);

    if (existingUser.length > 0) {
      return { success: true, userId: clerkUser.id };
    }

    // Create new user
    const newUser = {
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress || "",
      firstName: clerkUser.firstName || null,
      lastName: clerkUser.lastName || null,
      imageUrl: clerkUser.imageUrl || null,
    };

    await db.insert(users).values(newUser);

    // Create default user preferences
    await db.insert(userPreferences).values({
      userId: clerkUser.id,
      favoriteReadingTypes: [],
      readingHistoryEnabled: "true",
      notificationsEnabled: "true",
      theme: "dark",
      readingFrequencyPreference: "weekly",
      privacyLevel: "private",
      dataSharingEnabled: "false",
    });

    revalidatePath("/dashboard");
    return { success: true, userId: clerkUser.id };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create user",
    };
  }
}

export async function getCurrentUser(): Promise<GetUserResult> {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return { success: false, error: "User not authenticated" };
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, clerkUser.id))
      .limit(1);

    if (user.length === 0) {
      // User doesn't exist in our database yet, create them
      const createResult = await createUser();
      if (!createResult.success) {
        return createResult;
      }

      // Fetch the newly created user
      const newUser = await db
        .select()
        .from(users)
        .where(eq(users.id, clerkUser.id))
        .limit(1);

      return { success: true, user: newUser[0]! };
    }

    return { success: true, user: user[0]! };
  } catch (error) {
    console.error("Error getting current user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get user",
    };
  }
}

export async function updateUserPreferences(preferences: {
  favoriteReadingTypes?: string[];
  readingHistoryEnabled?: string;
  notificationsEnabled?: string;
  theme?: string;
}): Promise<UpdateUserPreferencesResult> {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return { success: false, error: "User not authenticated" };
    }

    await db
      .update(userPreferences)
      .set({
        ...preferences,
        updatedAt: new Date(),
      })
      .where(eq(userPreferences.userId, clerkUser.id));

    revalidatePath("/profile");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating user preferences:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update preferences",
    };
  }
}
