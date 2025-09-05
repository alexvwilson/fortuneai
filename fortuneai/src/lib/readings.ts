import { db } from "@/lib/db";
import { readings, readingTypes } from "@/drizzle/schema";
import { eq, and, desc, count, sql } from "drizzle-orm";
import type { Reading } from "@/drizzle/schema";

export type ReadingWithType = {
  id: string;
  userId: string;
  readingTypeId: string;
  prompt: string;
  aiResponse: string;
  title: string | null;
  tags: string[] | null;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  readingType: {
    name: string;
    icon: string;
    category: string;
  };
};

// Analytics types for dashboard insights
export interface ReadingStats {
  totalReadings: number;
  favoriteType: string | null;
  readingFrequency: number; // readings per week
  recentActivity: Date | null;
}

export interface ReadingPatterns {
  typeDistribution: Array<{
    typeName: string;
    count: number;
    percentage: number;
  }>;
  weeklyActivity: Array<{
    week: string;
    count: number;
  }>;
  favoriteTypes: Array<{
    typeName: string;
    isFavorite: boolean;
  }>;
}

export async function getUserReadings(
  userId: string
): Promise<ReadingWithType[]> {
  return await db
    .select({
      id: readings.id,
      userId: readings.userId,
      readingTypeId: readings.readingTypeId,
      prompt: readings.prompt,
      aiResponse: readings.aiResponse,
      title: readings.title,
      tags: readings.tags,
      isFavorite: readings.isFavorite,
      createdAt: readings.createdAt,
      updatedAt: readings.updatedAt,
      readingType: {
        name: readingTypes.name,
        icon: readingTypes.icon,
        category: readingTypes.category,
      },
    })
    .from(readings)
    .innerJoin(readingTypes, eq(readings.readingTypeId, readingTypes.id))
    .where(eq(readings.userId, userId))
    .orderBy(desc(readings.createdAt));
}

export async function getReadingById(
  readingId: string,
  userId: string
): Promise<Reading | null> {
  const result = await db
    .select()
    .from(readings)
    .where(and(eq(readings.id, readingId), eq(readings.userId, userId)))
    .limit(1);

  return result[0] || null;
}

export async function getReadingsByType(
  userId: string,
  readingTypeId: string
): Promise<Reading[]> {
  return await db
    .select()
    .from(readings)
    .where(
      and(
        eq(readings.userId, userId),
        eq(readings.readingTypeId, readingTypeId)
      )
    )
    .orderBy(desc(readings.createdAt));
}

// Analytics functions for dashboard insights
export async function getReadingStats(userId: string): Promise<ReadingStats> {
  // Optimized single query approach for better performance
  const [totalResult, favoriteResult, recentResult] = await Promise.all([
    // Total readings count - uses idx_readings_user_created index
    db
      .select({ count: count() })
      .from(readings)
      .where(eq(readings.userId, userId)),

    // Most used reading type - uses idx_readings_user_type_created index
    db
      .select({
        typeName: readingTypes.name,
        count: count(),
      })
      .from(readings)
      .innerJoin(readingTypes, eq(readings.readingTypeId, readingTypes.id))
      .where(eq(readings.userId, userId))
      .groupBy(readingTypes.name)
      .orderBy(desc(count()))
      .limit(1),

    // Most recent reading - uses idx_readings_user_created index
    db
      .select({ createdAt: readings.createdAt })
      .from(readings)
      .where(eq(readings.userId, userId))
      .orderBy(desc(readings.createdAt))
      .limit(1),
  ]);

  const totalReadings = totalResult[0]?.count || 0;
  const favoriteType = favoriteResult[0]?.typeName || null;
  const recentActivity = recentResult[0]?.createdAt || null;

  // Calculate reading frequency based on actual time span
  let readingFrequency = 0;
  if (totalReadings > 0 && recentActivity) {
    const daysSinceFirstReading = Math.max(
      1,
      Math.ceil((Date.now() - recentActivity.getTime()) / (1000 * 60 * 60 * 24))
    );
    readingFrequency = totalReadings / (daysSinceFirstReading / 7); // Readings per week
  }

  return {
    totalReadings,
    favoriteType,
    readingFrequency,
    recentActivity,
  };
}

export async function getReadingPatterns(
  userId: string
): Promise<ReadingPatterns> {
  const [typeDistribution, weeklyActivity, favoriteTypes] = await Promise.all([
    // Type distribution with percentages - uses idx_readings_user_type_created index
    db
      .select({
        typeName: readingTypes.name,
        count: count(),
      })
      .from(readings)
      .innerJoin(readingTypes, eq(readings.readingTypeId, readingTypes.id))
      .where(eq(readings.userId, userId))
      .groupBy(readingTypes.name)
      .orderBy(desc(count())),

    // Weekly activity (last 4 weeks) - uses idx_readings_user_created index
    db
      .select({
        week: sql<string>`DATE_TRUNC('week', ${readings.createdAt})`,
        count: count(),
      })
      .from(readings)
      .where(eq(readings.userId, userId))
      .groupBy(sql`DATE_TRUNC('week', ${readings.createdAt})`)
      .orderBy(sql`DATE_TRUNC('week', ${readings.createdAt})`)
      .limit(4),

    // Favorite types - uses idx_readings_user_favorite index
    db
      .select({
        typeName: readingTypes.name,
        isFavorite: sql<boolean>`${readings.isFavorite}`,
      })
      .from(readings)
      .innerJoin(readingTypes, eq(readings.readingTypeId, readingTypes.id))
      .where(and(eq(readings.userId, userId), eq(readings.isFavorite, true)))
      .groupBy(readingTypes.name, readings.isFavorite),
  ]);

  // Calculate percentages for type distribution
  const totalReadings = typeDistribution.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const typeDistributionWithPercentages = typeDistribution.map((item) => ({
    ...item,
    percentage:
      totalReadings > 0 ? Math.round((item.count / totalReadings) * 100) : 0,
  }));

  return {
    typeDistribution: typeDistributionWithPercentages,
    weeklyActivity,
    favoriteTypes,
  };
}

export async function getRecentReadings(
  userId: string,
  limit: number = 5
): Promise<ReadingWithType[]> {
  // Optimized query using idx_readings_user_created index
  return await db
    .select({
      id: readings.id,
      userId: readings.userId,
      readingTypeId: readings.readingTypeId,
      prompt: readings.prompt,
      aiResponse: readings.aiResponse,
      title: readings.title,
      tags: readings.tags,
      isFavorite: readings.isFavorite,
      createdAt: readings.createdAt,
      updatedAt: readings.updatedAt,
      readingType: {
        name: readingTypes.name,
        icon: readingTypes.icon,
        category: readingTypes.category,
      },
    })
    .from(readings)
    .innerJoin(readingTypes, eq(readings.readingTypeId, readingTypes.id))
    .where(eq(readings.userId, userId))
    .orderBy(desc(readings.createdAt))
    .limit(limit);
}

// Get reading by share token for public access
export async function getReadingByShareToken(
  shareToken: string
): Promise<Reading | null> {
  // Optimized query using idx_readings_share_token index
  const result = await db
    .select()
    .from(readings)
    .where(
      and(
        eq(readings.shareToken, shareToken),
        eq(readings.isShareable, true),
        sql`${readings.shareExpiresAt} > NOW()`
      )
    )
    .limit(1);

  return result[0] || null;
}

// Get all user readings for bulk export
export async function getUserReadingsForExport(
  userId: string
): Promise<ReadingWithType[]> {
  return await db
    .select({
      id: readings.id,
      userId: readings.userId,
      readingTypeId: readings.readingTypeId,
      prompt: readings.prompt,
      aiResponse: readings.aiResponse,
      title: readings.title,
      tags: readings.tags,
      isFavorite: readings.isFavorite,
      createdAt: readings.createdAt,
      updatedAt: readings.updatedAt,
      readingType: {
        name: readingTypes.name,
        icon: readingTypes.icon,
        category: readingTypes.category,
      },
    })
    .from(readings)
    .innerJoin(readingTypes, eq(readings.readingTypeId, readingTypes.id))
    .where(eq(readings.userId, userId))
    .orderBy(desc(readings.createdAt));
}
