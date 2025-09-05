import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  getReadingTypesWithUserPreferences,
  getFavoriteTypesForUser,
} from "@/lib/reading-types";

export async function GET(): Promise<NextResponse> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch reading types with user preferences
    const types = await getReadingTypesWithUserPreferences(userId);
    const favorites = await getFavoriteTypesForUser(userId);

    return NextResponse.json({
      types,
      favorites,
    });
  } catch (error) {
    console.error("Error fetching reading types:", error);
    return NextResponse.json(
      { error: "Failed to fetch reading types" },
      { status: 500 }
    );
  }
}
