import { NextRequest, NextResponse } from "next/server";
import { getReadingByShareToken } from "@/lib/readings";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    const reading = await getReadingByShareToken(token);

    if (!reading) {
      return NextResponse.json(
        { error: "Reading not found or link expired" },
        { status: 404 }
      );
    }

    // Return reading data for public access
    return NextResponse.json({
      id: reading.id,
      title: reading.title,
      prompt: reading.prompt,
      aiResponse: reading.aiResponse,
      tags: reading.tags,
      createdAt: reading.createdAt,
      isShared: true,
    });
  } catch (error) {
    console.error("Share API error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve shared reading" },
      { status: 500 }
    );
  }
}
