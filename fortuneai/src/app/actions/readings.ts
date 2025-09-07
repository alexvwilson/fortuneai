"use server";

import { db } from "@/lib/db";
import { readings } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { createUser } from "@/app/actions/users";

export async function createReading(data: {
  readingTypeId: string;
  prompt: string;
  aiResponse: string;
  title?: string;
  tags?: string[];
}): Promise<{
  success: boolean;
  readingId?: string | undefined;
  error?: string;
}> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        error: "Unauthorized - Please sign in to save readings",
      };
    }

    // Ensure user exists in database
    const userResult = await createUser();
    if (!userResult.success) {
      return {
        success: false,
        error: "Failed to create user profile",
      };
    }

    const result = await db
      .insert(readings)
      .values({
        userId,
        readingTypeId: data.readingTypeId,
        prompt: data.prompt,
        aiResponse: data.aiResponse,
        title: data.title,
        tags: data.tags,
      })
      .returning({ id: readings.id });

    revalidatePath("/readings");
    return { success: true, readingId: result[0]?.id ?? undefined };
  } catch (error) {
    console.error("Error creating reading:", error);

    // Enhanced error handling for database connection issues
    if (error instanceof Error && error.message.includes("DATABASE_URL")) {
      return {
        success: false,
        error:
          "Database not configured. Please check your environment variables and see ENVIRONMENT_SETUP.md for instructions.",
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save reading",
    };
  }
}

export async function updateReading(
  readingId: string,
  data: {
    title?: string;
    tags?: string[];
    isFavorite?: boolean;
    isShareable?: boolean;
    shareExpiresAt?: Date;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await db
      .update(readings)
      .set(data)
      .where(and(eq(readings.id, readingId), eq(readings.userId, userId)));

    revalidatePath("/readings");
    revalidatePath(`/readings/${readingId}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating reading:", error);

    // Enhanced error handling for database connection issues
    if (error instanceof Error && error.message.includes("DATABASE_URL")) {
      return {
        success: false,
        error:
          "Database not configured. Please check your environment variables and see ENVIRONMENT_SETUP.md for instructions.",
      };
    }

    return { success: false, error: "Failed to update reading" };
  }
}

export async function deleteReading(
  readingId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await db
      .delete(readings)
      .where(and(eq(readings.id, readingId), eq(readings.userId, userId)));

    revalidatePath("/readings");
    return { success: true };
  } catch (error) {
    console.error("Error deleting reading:", error);

    // Enhanced error handling for database connection issues
    if (error instanceof Error && error.message.includes("DATABASE_URL")) {
      return {
        success: false,
        error:
          "Database not configured. Please check your environment variables and see ENVIRONMENT_SETUP.md for instructions.",
      };
    }

    return { success: false, error: "Failed to delete reading" };
  }
}

// Generate shareable link for reading
export async function generateShareLink(
  readingId: string
): Promise<{ success: boolean; shareUrl?: string; error?: string }> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // Generate unique share token
    const shareToken = randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days expiration

    await db
      .update(readings)
      .set({
        isShareable: true,
        shareToken,
        shareExpiresAt: expiresAt,
      })
      .where(and(eq(readings.id, readingId), eq(readings.userId, userId)));

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/share/${shareToken}`;

    revalidatePath(`/readings/${readingId}`);
    return { success: true, shareUrl };
  } catch (error) {
    console.error("Error generating share link:", error);
    return { success: false, error: "Failed to generate share link" };
  }
}

// Update sharing settings for reading
export async function updateShareSettings(
  readingId: string,
  isShareable: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const updateData: {
      isShareable: boolean;
      shareToken?: string | null;
      shareExpiresAt?: Date | null;
    } = { isShareable };

    // If disabling sharing, clear share token and expiration
    if (!isShareable) {
      updateData.shareToken = null;
      updateData.shareExpiresAt = null;
    }

    await db
      .update(readings)
      .set(updateData)
      .where(and(eq(readings.id, readingId), eq(readings.userId, userId)));

    revalidatePath(`/readings/${readingId}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating share settings:", error);
    return { success: false, error: "Failed to update share settings" };
  }
}

// Export reading in multiple formats
export async function exportReading(
  readingId: string,
  format: "pdf" | "text" | "json"
): Promise<{ success: boolean; downloadUrl?: string; error?: string }> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // Verify reading exists and belongs to user
    const reading = await db
      .select()
      .from(readings)
      .where(and(eq(readings.id, readingId), eq(readings.userId, userId)))
      .limit(1);

    if (reading.length === 0) {
      return { success: false, error: "Reading not found" };
    }

    // Generate export file and return download URL
    const downloadUrl = `/api/readings/${readingId}/export?format=${format}`;
    return { success: true, downloadUrl };
  } catch (error) {
    console.error("Error exporting reading:", error);
    return { success: false, error: "Failed to export reading" };
  }
}
