import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { readings } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";
import { createUser } from "@/app/actions/users";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized - Please sign in to save readings",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { readingTypeId, prompt, aiResponse, title, tags } = body;

    // Validate required fields
    if (!readingTypeId || !prompt || !aiResponse) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure user exists in database
    const userResult = await createUser();
    if (!userResult.success) {
      return NextResponse.json(
        { success: false, error: "Failed to create user profile" },
        { status: 500 }
      );
    }

    const result = await db
      .insert(readings)
      .values({
        userId,
        readingTypeId,
        prompt,
        aiResponse,
        title,
        tags,
      })
      .returning({ id: readings.id });

    // Revalidate the readings page
    revalidatePath("/readings");

    return NextResponse.json({
      success: true,
      readingId: result[0]?.id,
    });
  } catch (error) {
    console.error("Error creating reading:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to save reading",
      },
      { status: 500 }
    );
  }
}
