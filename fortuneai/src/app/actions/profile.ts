"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { userPreferences } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateProfile() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Note: Profile updates would typically go through Clerk
  // This is a placeholder for any additional profile data we might store
  revalidatePath("/profile");
  return { success: true };
}

export async function updatePreferences(data: {
  readingFrequencyPreference?: string;
  notificationsEnabled?: string;
  theme?: string;
  privacyLevel?: string;
  dataSharingEnabled?: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db
    .update(userPreferences)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(userPreferences.userId, userId));

  revalidatePath("/profile");
  return { success: true };
}

export async function exportUserData() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Implementation for data export
  // This would generate a ZIP file with user's readings and preferences
  return { success: true, downloadUrl: "/api/export/user-data" };
}
