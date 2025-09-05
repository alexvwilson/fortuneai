import { NextRequest, NextResponse } from "next/server";
import { generateFortuneResponse } from "@/lib/ai/chatgpt";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { readingType, userQuestion } = await request.json();

    if (!readingType || !userQuestion) {
      return NextResponse.json(
        { error: "Reading type and user question are required" },
        { status: 400 }
      );
    }

    const stream = await generateFortuneResponse({
      readingType,
      userQuestion,
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("ChatGPT API error:", error);
    return NextResponse.json(
      { error: "Failed to generate fortune reading" },
      { status: 500 }
    );
  }
}
